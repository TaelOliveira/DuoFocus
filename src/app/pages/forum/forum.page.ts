import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { TopicFormComponent } from '../forum/topic-form/topic-form.component'
import { ProfileService } from 'src/app/services/profile.service';
import { DetailTopicComponent } from './detail-topic/detail-topic.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
  
  topics;
  topicId: string;

  constructor(
    public db: DatabaseService,
    private profileService: ProfileService,
    public modal: ModalController
  ) { }

  ngOnInit() {
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

  deleteTopic(topic){
    this.db.delete(`topics/${topic.id}`);
    console.log(topic.id);
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

}
