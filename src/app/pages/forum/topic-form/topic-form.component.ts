import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { AngularFirestore } from '@angular/fire/firestore';

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
      { type: 'minLength', message: 'Cannot have less than 10 characters long.' },
      { type: 'required', message: 'This answer is required.' },
    ],
    'description': [
      { type: 'minLength', message: 'Cannot have less than 10 characters long.' },
      { type: 'required', message: 'This answer is required.' },
    ]
  };

  constructor(
    public db: DatabaseService,
    public modal: ModalController,
    private afs: AngularFirestore,
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
      question: new FormControl ('', [ Validators.required, Validators.minLength(1), Validators.maxLength(100) ]),
      description: new FormControl ('', [ Validators.required, Validators.minLength(10), Validators.maxLength(350) ]),
    });
  }

  async createTopic(){
    const id = this.afs.createId();
    const data = {
      createdAt: new Date(),
      createdBy: this.profileService.currentUser.uid,
      username: this.userProfile.username,
      id: id,
      email: this.profileService.currentUser.email,
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
