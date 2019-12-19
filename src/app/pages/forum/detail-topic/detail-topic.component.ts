import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-topic',
  templateUrl: './detail-topic.component.html',
  styleUrls: ['./detail-topic.component.scss'],
})
export class DetailTopicComponent implements OnInit {

  replyForm: FormGroup;
  reply;
  replies;
  topic;

  validation_messages = {
    'reply': [
      { type: 'maxLength', message: 'Cannot have more than 350 characters long.' },
      { type: 'minLength', message: 'Cannot have less than 10 characters long.' }
    ],
  };

  constructor(
    public db: DatabaseService,
    public modal: ModalController,
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    console.log(this.topic.id);
    const topicId = this.topic.id;
    this.replies = this.db.collection$('replies', ref =>
    ref
      .where('topicId', '==', topicId)
      .orderBy('createdAt', 'desc')
    );

    const data = {
      reply: '',
      ...this.reply
    };
    this.replyForm = this.formBuilder.group({
      reply: new FormControl (data.reply, [ Validators.required, Validators.minLength(10), Validators.maxLength(350) ]),
        });
  }

  async createReply(){
    const id = this.reply ? this.reply.id : '';
    const data = {
      topicId: this.topic.id,
      createdAt: new Date(),
      createdBy: this.profileService.currentUser.uid,
      ...this.reply,
      ...this.replyForm.value
    };

    this.db.updateAt(`replies/${id}`, data);
    this.replyForm.reset();
  }

  dismissModal() {
    this.modal.dismiss({
      'dismissed': true
    });
  }

}
