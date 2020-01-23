import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AlertController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})

export class ContactPage implements OnInit {

  contactForm: FormGroup;
  numberOfCharacters1 = 0;
  numberOfCharacters2 = 0;
  numberOfCharacters3 = 0;
  beTutor;

  validation_messages = {
    'question1': [
      { type: 'required', message: 'This answer is required.' },
      { type: 'minLength', message: 'Answer cannot be less than 10 characters long.' }
    ],
    'question2': [
      { type: 'required', message: 'This answer is required.' },
      { type: 'minLength', message: 'Answer cannot be less than 20 characters long.' }
    ],
    'question3': [
      { type: 'required', message: 'This answer is required.' },
      { type: 'minLength', message: 'Answer cannot be less than 20 characters long.' }
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private profileService: ProfileService,
    public db: DatabaseService
  ) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      question1: new FormControl('', [ Validators.required, Validators.minLength(10), Validators.maxLength(350) ]),
      question2: new FormControl('', [ Validators.required, Validators.minLength(20), Validators.maxLength(500) ]),
      question3: new FormControl('', [ Validators.required, Validators.minLength(20), Validators.maxLength(500) ])
    });

  }

  onKeyUp1(event: any): void {
    this.numberOfCharacters1 = event.target.value.length;
  }

  onKeyUp2(event: any): void {
    this.numberOfCharacters2 = event.target.value.length;
  }

  onKeyUp3(event: any): void {
    this.numberOfCharacters3 = event.target.value.length;
  }

  async submitForm(){

    const id = this.beTutor ? this.beTutor.id : '';
    const data = {
      createdAt: new Date(),
      createdBy: this.profileService.currentUser.uid,
      userEmail: this.profileService.currentUser.email,
      question1: this.contactForm.value.question1,
      question2: this.contactForm.value.question2,
      question3: this.contactForm.value.question3
    };
    const send = "We have received your application and will get in touch."
    const error = "Please, try again!"
    if(this.db.updateAt(`beTutor/${id}`, data)){
      this.contactForm.reset();
      this.numberOfCharacters1 = 0;
      this.numberOfCharacters2 = 0;
      this.numberOfCharacters3 = 0;
      await this.presentAlert(send);
    }
    else{
      await this.presentAlert(error);
    }
  
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Thanks for applying to be part of our team.',
      subHeader: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
