import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-my-tutors',
  templateUrl: './my-tutors.page.html',
  styleUrls: ['./my-tutors.page.scss'],
})
export class MyTutorsPage implements OnInit {

  chats;
  show = true;

  constructor(
    public db: DatabaseService,
    private afs: AngularFirestore,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public modal: ModalController,
    public menu: MenuController,
    public router: Router,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {

    this.presentLoading();
    this.checkChats();

    const uid = this.profileService.currentUser.uid;
    this.chats = this.db.collection$('chats', ref => ref
      .where('createdBy', '==', uid)
      .orderBy('createdAt', 'desc'));
  }

  ionViewWillEnter() {
    this.checkChats();
  }

  trackById(chat) {
    return chat.id;
  }

  async deleteChat(chat) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete it?</strong>!!!',
      buttons: [
        {
          text: 'YES',
          role: 'yes',
          handler: data => {
            if (this.db.delete(`chats/${chat.id}`)) {
              this.presentToast("Chat deleted!", true, 'bottom', 3000);
            }
            else {
              this.presentToast("Sorry, couldn't delete. Try again later!!", true, 'bottom', 3000);
            }
          }
        }, {
          text: 'NO',
          handler: data => {
            this.presentToast("Chat not deleted!", true, 'bottom', 3000);
          }
        }
      ]
    });

    await alert.present();
    console.log(chat.id);
    this.checkChats();
  }

  async openChat(chat) {
    console.log(chat.id);

    const modal = await this.modal.create({
      component: ChatViewComponent,
      componentProps: { chat }
    });
    return await modal.present();

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this.checkChats();
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

  async checkChats() {

    const uid = this.profileService.currentUser.uid;

    await this.afs.collection('chats', (ref) =>
      ref
        .where('createdBy', '==', uid)
        .limit(1))
      .get()
      .subscribe(chat => {
        if(chat.size > 0){
          this.show = false;
        }
        else{
          this.show = true;
        }
      })
  }

}
