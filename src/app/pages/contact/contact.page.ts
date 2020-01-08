import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { FirebaseService } from '../../services/firebase.service';
import { AlertController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';

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

  validation_messages = {
    'question1': [
      { type: 'required', message: 'This answer is required.' },
      { type: 'minLength', message: 'Answer cannot be less than 20 characters long.' }
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
    public firebaseData: FirebaseService
  ) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      question1: new FormControl('', [ Validators.required, Validators.minLength(20), Validators.maxLength(350) ]),
      question2: new FormControl('', [ Validators.required, Validators.minLength(20), Validators.maxLength(350) ]),
      question3: new FormControl('', [ Validators.required, Validators.minLength(20), Validators.maxLength(350) ])
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

  addForm(){
    if (!this.contactForm.valid){
      console.log("Nice try!");
    } else {
      this.firebaseData.saveForm(this.contactForm.value.question1, this.contactForm.value.question2,
        this.contactForm.value.question3, this.profileService.currentUser.email).then( () => {
          this.contactForm.reset();
          this.numberOfCharacters1 = 0;
          this.numberOfCharacters2 = 0;
          this.numberOfCharacters3 = 0;
        });
        this.presentAlert();
        console.log(this.profileService.currentUser.email);
    }
  
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Thanks for applying to be part of our team.',
      subHeader: 'We will revise your application and get in touch.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
