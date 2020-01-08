import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { LoadingController, ModalController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { ChatViewComponent } from '../my-tutors/chat-view/chat-view.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})

export class MessagesPage implements OnInit {

  chats;

  constructor(
    public db: DatabaseService,
    public loadingController: LoadingController,
    public modal: ModalController,
    public menu: MenuController,
    public router: Router,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.presentLoading();

    const uid = this.profileService.currentUser.uid;
    this.chats = this.db.collection$('chats', ref => ref
      .where('tutorId', '==', uid)
      .orderBy('createdAt', 'desc'));
  }

  trackById(chat){
    return chat.id;
  }

  async openChat(chat){
    console.log(chat.id);

    const modal = await this.modal.create({
      component: ChatViewComponent,
      componentProps: {chat}
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
  }

}
