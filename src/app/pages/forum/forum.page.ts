import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { TopicFormComponent } from '../forum/topic-form/topic-form.component'
import { ProfileService } from 'src/app/services/profile.service';
import { DetailTopicComponent } from './detail-topic/detail-topic.component';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
  
  topics;
  topicId: string;
  show = true;

  constructor(
    public db: DatabaseService,
    private afs: AngularFirestore,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    private profileService: ProfileService,
    public modal: ModalController
  ) { }

  ngOnInit() {
    this.presentLoading();
    this.checkTopics();
    
    //get all topics of user
    const uid = this.profileService.currentUser.uid;
    this.topics = this.db.collection$('topics', ref =>
    ref
      .where('createdBy', '==', uid)
      .orderBy('createdAt', 'desc')
    );
  }

  trackById(idx, topic){
    return topic.id;
  }

  ionViewWillEnter() {
    this.checkTopics();
  }

  async deleteTopic(topic){

    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete it?</strong>!!!',
      buttons: [
        {
          text: 'YES',
          role: 'yes',
          handler: data => {
            if(this.db.delete(`topics/${topic.id}`)){
              this.presentToast("Topic deleted!", true, 'bottom', 3000);
            }
            else{
              this.presentToast("Sorry, try again later!", true, 'bottom', 3000);
            }
          }
        }, {
          text: 'NO',
          handler: data => {
            this.presentToast("Topic not deleted!", true, 'bottom', 3000);
          }
        }
      ]
    });

    await alert.present();
    console.log(topic.id);
    this.checkTopics();
  }

  async presentTopicForm(topic?: any){
    const modal = await this.modal.create({
      component: TopicFormComponent,
      componentProps: {topic}
    });
    return await modal.present();
  }

  async presentDetailTopic(topic?: any){
    const modal = await this.modal.create({
      component: DetailTopicComponent,
      componentProps: {topic}
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
    this.checkTopics();
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

  async checkTopics() {

    const uid = this.profileService.currentUser.uid;

    await this.afs.collection('topics', (ref) =>
      ref
        .where('createdBy', '==', uid)
        .limit(1))
      .get()
      .subscribe(topic => {
        if(topic.size > 0){
          this.show = false;
        }
        else{
          this.show = true;
        }
      })
  }

}
