import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})

export class ChatComponent implements OnInit {

  messageForm: FormGroup;
  userProfile: any;
  chat;
  tutor;
  newMsg: string;
  chatID;

  constructor(
    public db: DatabaseService,
    private profileService: ProfileService,
    private afs: AngularFirestore,
    public chatModal: ModalController,
  ) { }

  ngOnInit() {
    this.profileService
        .getUserProfile()
        .get()
        .then(userProfileSnapshot => {
            this.userProfile = userProfileSnapshot.data();
        });
    this.messageForm = new FormGroup({message: new FormControl('', [Validators.required, Validators.maxLength(100)])});

    const uid = this.profileService.currentUser.uid;
    this.chat = this.db.collection$('chats', ref =>
    ref
      .where('createdBy', '==', uid)
      .orderBy('createdAt', 'asc')
    );

    console.log(this.tutor.id, uid);
    console.log(this.chatID.id);
  }

  dismissModal() {
    this.chatModal.dismiss({
      'dismissed': true
    });
  }

  trackByCreated(i, newMsg) {
    return newMsg.createdAt;
  }

  private scrollBottom() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }

  async sendMessage(content) {
    const userId = await this.profileService.currentUser.uid;

    const data = {
      userId,
      content,
      createdAt: new Date(),
    };

    if (userId) {
      const ref = this.afs.collection('chats').doc(this.chatID.id);
      return ref.update({
        messages: firestore.FieldValue.arrayUnion(data)
      });
    }
  }

  submit() {
    const newMsg = this.messageForm.value['message'];
    this.sendMessage(newMsg);
    this.scrollBottom();
    this.messageForm.reset();
  }

}
