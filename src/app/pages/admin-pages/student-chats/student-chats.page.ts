import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-student-chats',
  templateUrl: './student-chats.page.html',
  styleUrls: ['./student-chats.page.scss'],
})
export class StudentChatsPage implements OnInit {

  chats;

  constructor(
    public db: DatabaseService,
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.presentLoading();

    this.chats = this.db.collection$('chats');
  }

  deleteChat(chat){
    if(this.db.delete(`chats/${chat.id}`)){
      this.presentToast("Chat deleted!", true, 'bottom', 3000);
    }
    else{
      this.presentToast("Sorry, try again later!", true, 'bottom', 3000);
    }
    console.log(chat.id);
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
