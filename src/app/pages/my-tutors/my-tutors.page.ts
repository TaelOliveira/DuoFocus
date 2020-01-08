import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, LoadingController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { ChatViewComponent } from './chat-view/chat-view.component';

@Component({
  selector: 'app-my-tutors',
  templateUrl: './my-tutors.page.html',
  styleUrls: ['./my-tutors.page.scss'],
})
export class MyTutorsPage implements OnInit {

  chats;

  constructor(
    public db: DatabaseService,
    public loadingController: LoadingController,
    public modal: ModalController,
    public menu: MenuController,
    public router: Router,
    private profileService: ProfileService,
  ) { }

  async ngOnInit() {
    
    this.presentLoading();

    const uid = this.profileService.currentUser.uid;
    this.chats = this.db.collection$('chats', ref => ref
      .where('createdBy', '==', uid)
      .orderBy('createdAt', 'desc'));
  }

  trackById(chat){
    return chat.id;
  }

  deleteChat(chat){
    this.db.delete(`chats/${chat.id}`);
    console.log(chat.id);
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
