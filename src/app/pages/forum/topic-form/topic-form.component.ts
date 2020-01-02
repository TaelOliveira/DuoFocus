import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss'],
})
export class TopicFormComponent implements OnInit {

  topicForm: FormGroup;
  question;
  description;
  descriptionCount = [];
  questionCount = [];

  validation_messages = {
    'question': [
      { type: 'maxLength', message: 'Cannot have more than 100 characters long.' },
      { type: 'minLength', message: 'Cannot have less than 10 characters long.' }
    ],
    'description': [
      { type: 'maxLength', message: 'Cannot have more than 350 characters long.' },
      { type: 'minLength', message: 'Cannot have less than 10 characters long.' }
    ]
  };

  constructor(
    public db: DatabaseService,
    public modal: ModalController,
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const data = {
      question: '',
      description: '',
      ...this.question,
      ...this.description
    };
    this.topicForm = this.formBuilder.group({
      question: new FormControl (data.question, [ Validators.required, Validators.minLength(1), Validators.maxLength(100) ]),
      description: new FormControl (data.description, [ Validators.required, Validators.minLength(10), Validators.maxLength(350) ]),
    });
  }

  async createTopic(){
    const id = this.question ? this.question.id : '';
    const data = {
      createdAt: new Date(),
      createdBy: this.profileService.currentUser.uid,
      userEmail: this.profileService.currentUser.email,
      ...this.question,
      ...this.description,
      ...this.topicForm.value
    };

    this.db.updateAt(`topics/${id}`, data);
    await this.modal.dismiss();
  }

  dismissModal() {
    this.modal.dismiss({
      'dismissed': true
    });
  }

}
