import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
})
export class ChatViewComponent implements OnInit {

  userProfile: any;
  messageForm: FormGroup;
  chat;
  chat$: Observable<any>;

  constructor(
    private profileService: ProfileService,
    public toastController: ToastController,
    public modal: ModalController,
    public db: DatabaseService,
    public loadingController: LoadingController,
    private afs: AngularFirestore,
  ) { }

  ngOnInit() {
    this.profileService
        .getUserProfile()
        .get()
        .then(userProfileSnapshot => {
            this.userProfile = userProfileSnapshot.data();
        });
    
    this.presentLoading();

    this.messageForm = new FormGroup({message: new FormControl('', [Validators.required, Validators.maxLength(100)])});
    this.scrollBottom();
  }

  async sendMessage(content) {
    const userId = await this.profileService.currentUser.uid;

    const data = {
      userId,
      photoURL: this.userProfile.photoURL,
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

  async deleteMessage(chat, msg) {
    const uid = await this.profileService.currentUser.uid;

    const ref = this.afs.collection('chats').doc(this.chat.id);
    console.log(msg);
    if (chat.createdBy === uid || msg.uid === uid) {
      // Allowed to delete
      delete msg.user;
      this.presentToast("Message deleted!", false, 'bottom', 3000);
      return ref.update({
        messages: firestore.FieldValue.arrayRemove(msg)
      });
    }
    else{
      this.presentToast("You are not allowed to delete!", false, 'bottom', 3000);
    }
  }

  private scrollBottom() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }

  dismissModal() {
    this.modal.dismiss({
      'dismissed': true
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }

}
