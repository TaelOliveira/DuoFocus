import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss'],
})
export class TopicFormComponent implements OnInit {

  topicForm: FormGroup;
  userProfile: any;
  question;
  description;
  numberOfCharacters1 = 0;
  numberOfCharacters2 = 0;

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
    public toastController: ToastController,
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.profileService
      .getUserProfile()
      .get()
      .then(userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
      });
      
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
      username: this.userProfile.username,
      ...this.question,
      ...this.description,
      ...this.topicForm.value
    };

    this.db.updateAt(`topics/${id}`, data);
    await this.modal.dismiss();
    this.presentToast("Topic added!", true, 'bottom', 3000);
    this.numberOfCharacters1 = 0;
    this.numberOfCharacters2 = 0;
  }

  onKeyUp(event: any): void {
    this.numberOfCharacters1 = event.target.value.length;
  }

  onKeyUp2(event: any): void {
    this.numberOfCharacters2 = event.target.value.length;
  }

  dismissModal() {
    this.modal.dismiss({
      'dismissed': true
    });
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

}
