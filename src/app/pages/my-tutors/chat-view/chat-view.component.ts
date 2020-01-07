import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
})
export class ChatViewComponent implements OnInit {

  userProfile: any;
  messageForm: FormGroup;
  chat;

  constructor(
    private profileService: ProfileService,
    public modal: ModalController,
    public db: DatabaseService,
    private afs: AngularFirestore,
  ) { }

  ngOnInit() {
    this.profileService
        .getUserProfile()
        .get()
        .then(userProfileSnapshot => {
            this.userProfile = userProfileSnapshot.data();
        });

    this.messageForm = new FormGroup({message: new FormControl('', [Validators.required, Validators.maxLength(100)])});
    this.scrollBottom();
  }

  async sendMessage(content) {
    const userId = await this.profileService.currentUser.uid;

    const data = {
      userId,
      content,
      createdAt: new Date(),
    };

    if (userId) {
      const ref = this.afs.collection('chats').doc(this.chat.id);
      return ref.update({
        messages: firestore.FieldValue.arrayUnion(data)
      });
    }
  }

  async submit() {
    const newMsg = this.messageForm.value['message'];
    this.sendMessage(newMsg);
    this.messageForm.reset();
    this.scrollBottom();
  }

  trackByCreated(i, newMsg) {
    return newMsg.createdAt;
  }

  private scrollBottom() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }

  dismissModal() {
    this.modal.dismiss({
      'dismissed': true
    });
  }

}
