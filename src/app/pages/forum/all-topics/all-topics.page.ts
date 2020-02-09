import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { DetailTopicComponent } from '../detail-topic/detail-topic.component';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { TopicFormComponent } from '../topic-form/topic-form.component';
import { UserProfileViewComponent } from '../user-profile-view/user-profile-view.component';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-all-topics',
  templateUrl: './all-topics.page.html',
  styleUrls: ['./all-topics.page.scss'],
})
export class AllTopicsPage implements OnInit {

  topics;
  topicId: string;
  userProfile: any;

  topicList: any[];
  loadedTopicList: any[];

  constructor(
    public db: DatabaseService,
    public loadingController: LoadingController,
    private profileService: ProfileService,
    public router: Router,
    private afs: AngularFirestore,
    public modal: ModalController,
    public userModal: ModalController
  ) { }

  ngOnInit() {
    this.profileService
      .getUserProfile()
      .get()
      .then(userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
      });

    this.presentLoading();

    this.afs.collection(`topics`).valueChanges()
      .subscribe(topicList => {
        this.topicList = topicList;
        this.loadedTopicList = topicList;
      });

    /* //get all topics
    this.topics = this.db.collection$('topics', ref =>
    ref
      .orderBy('createdAt', 'desc')
    ); */
  }

  async presentTopicForm(topic?: any) {
    const modal = await this.modal.create({
      component: TopicFormComponent,
      componentProps: { topic }
    });
    return await modal.present();
  }

  async presentDetailTopic(topic) {
    const modal = await this.modal.create({
      component: DetailTopicComponent,
      componentProps: { topic }
    });
    return await modal.present();
  }

  goToForum() {
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

  async presentUserProfile(topic?: any) {
    const userModal = await this.userModal.create({
      component: UserProfileViewComponent,
      componentProps: { topic }
    });
    return await userModal.present();
  }

  filter(event) {
    let searchTerm = event.target.value.toLowerCase();
    this.topicList = this.loadedTopicList.filter((topic) => {
      if (topic.question.toLowerCase().indexOf(searchTerm) !== -1) {
        return topic;
      }
    });
  }

}
