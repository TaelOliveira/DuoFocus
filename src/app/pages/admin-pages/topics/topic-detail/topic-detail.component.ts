import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss'],
})
export class TopicDetailComponent implements OnInit {

  replies;
  topic;

  constructor(
    public db: DatabaseService,
    public modal: ModalController,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.presentLoading();

    const topicId = this.topic.id;
    console.log(topicId);
    this.replies = this.db.collection$('replies', ref =>
      ref
        .where('topicId', '==', topicId)
        .orderBy('createdAt', 'desc')
    );
  }

  async deleteReply(reply) {
    if (this.db.delete(`replies/${reply.id}`)) {
      this.presentToast("Reply deleted!", true, 'bottom', 3000);
    }
    else {
      this.presentToast("You are not allowed to delete this reply!", true, 'bottom', 3000);
    }
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

}
