import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AlertController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  feedbackForm: FormGroup;
  numberOfCharacters = 0;
  feedback;

  validation_messages = {
    'feedback': [
      { type: 'required', message: 'This answer is required.' },
      { type: 'minLength', message: 'Answer cannot be less than 10 characters long.' }
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private profileService: ProfileService,
    public db: DatabaseService
  ) { }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      feedback: new FormControl('', [ Validators.required, Validators.minLength(10), Validators.maxLength(500) ])
    });
  }

  onKeyUp(event: any): void {
    this.numberOfCharacters = event.target.value.length;
  }

  async submitForm(){

    const id = this.feedback ? this.feedback.id : '';
    const data = {
      createdAt: new Date(),
      createdBy: this.profileService.currentUser.uid,
      userEmail: this.profileService.currentUser.email,
      content: this.feedbackForm.value.feedback,
    };
    const send = "Thanks for sending us your Feedback!"
    const error = "Please, try again!"
    if(this.db.updateAt(`feedback/${id}`, data)){
      this.feedbackForm.reset();
      this.numberOfCharacters = 0;
      await this.presentAlert(send);
    }
    else{
      await this.presentAlert(error);
    }
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
