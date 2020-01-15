import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
})
export class ChatViewComponent implements OnInit {

  @ViewChild('content', { static: true }) private content: any;

  userProfile: any;
  messageForm: FormGroup;
  chat;
  chatMessages: any;

  constructor(
    private profileService: ProfileService,
    public toastController: ToastController,
    public modal: ModalController,
    public db: DatabaseService,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {

    this.profileService
        .getUserProfile()
        .get()
        .then(userProfileSnapshot => {
            this.userProfile = userProfileSnapshot.data();
        });
    
    this.presentLoading();

    const chatId = this.chat.id;
    this.chatMessages = this.db.collection$('chatMessages', ref =>
    ref
      .where('chatId', '==', chatId)
      .orderBy('createdAt', 'asc')
    );

    this.messageForm = new FormGroup({message: new FormControl('', [Validators.required, Validators.maxLength(100)])});
    this.ScrollToBottom();
  }

  async submit() {
    const newMsg = this.messageForm.value['message'];
    const id = this.chat ? this.chat.id : '';
    const data = {
      chatId: this.chat.id,
      content: newMsg,
      createdAt: new Date(),
      createdBy: this.profileService.currentUser.uid,
      photoURL: this.userProfile.photoURL,
    };

    this.db.updateAt(`chatMessages/`, data);
    this.messageForm.reset();
    this.ScrollToBottom();
  }

  trackByCreated(i, newMsg) {
    return newMsg.createdAt;
  }

  ScrollToBottom(){
    setTimeout(() => {
      if (this.content.scrollToBottom) {
          this.content.scrollToBottom(400);
      }
  }, 500);
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
