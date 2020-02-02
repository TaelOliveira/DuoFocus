import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.page.html',
  styleUrls: ['./topics.page.scss'],
})
export class TopicsPage implements OnInit {

  topics;

  constructor(
    public db: DatabaseService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public modal: ModalController
  ) { }

  ngOnInit() {
    this.presentLoading();

    this.topics = this.db.collection$('topics');
  }

  deleteTopic(topic){
    if(this.db.delete(`topics/${topic.id}`)){
      this.presentToast("Topic deleted!", true, 'bottom', 3000);
    }
    else{
      this.presentToast("Sorry, try again later!", true, 'bottom', 3000);
    }
    console.log(topic.id);
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

  async presentDetailTopic(topic?: any){
    const modal = await this.modal.create({
      component: TopicDetailComponent,
      componentProps: {topic}
    });
    return await modal.present();
  }

}
