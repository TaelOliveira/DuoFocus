import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { DetailTopicComponent } from '../detail-topic/detail-topic.component';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-all-topics',
  templateUrl: './all-topics.page.html',
  styleUrls: ['./all-topics.page.scss'],
})
export class AllTopicsPage implements OnInit {

  topics;
  topicId: string;
  userProfile: any;

  constructor(
    public db: DatabaseService,
    public loadingController: LoadingController,
    private profileService: ProfileService,
    public router: Router,
    public modal: ModalController
  ) { }

  ngOnInit() {
    this.profileService
        .getUserProfile()
        .get()
        .then(userProfileSnapshot => {
            this.userProfile = userProfileSnapshot.data();
        });

    this.presentLoading();

    //get all topics
    this.topics = this.db.collection$('topics', ref =>
    ref
      .orderBy('createdAt', 'desc')
    );
  }

  async presentDetailTopic(topic?: any){
    const modal = await this.modal.create({
      component: DetailTopicComponent,
      componentProps: {topic}
    });
    return await modal.present();
  }

  goToForum(){
    this.router.navigate(['forum']);
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