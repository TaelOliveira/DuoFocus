import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  contactForm: FormGroup;

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
    public firebaseData: FirebaseService
  ) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      question1: new FormControl('', [Validators.required, Validators.minLength(20)]),
      question2: new FormControl('', [Validators.required, Validators.minLength(20)]),
      question3: new FormControl('', [Validators.required, Validators.minLength(20)])
    });
  }

  addForm(){
    if (!this.contactForm.valid){
      console.log("Nice try!");
    } else {
      this.firebaseData.saveForm(this.contactForm.value.question1, this.contactForm.value.question2,
        this.contactForm.value.question3).then( () => {
          this.contactForm.reset();
        });
    }
  
  }

}
