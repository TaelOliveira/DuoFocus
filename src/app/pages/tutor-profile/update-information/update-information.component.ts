import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { ModalController, ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-update-information',
  templateUrl: './update-information.component.html',
  styleUrls: ['./update-information.component.scss'],
})
export class UpdateInformationComponent implements OnInit {

  nameForm: FormGroup;
  descriptionForm: FormGroup;
  subjectsForm: FormGroup;
  tagsForm: FormGroup;
  user;

  constructor(
    private formBuilder: FormBuilder,
    public modal: ModalController,
    public toastController: ToastController,
    public db: DatabaseService,
    private authService: AuthenticationService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.validateForm();

    const userEmail = this.authService.userDetails().email;
    this.user = this.db.collection$('userProfile', ref =>
    ref
      .where('email', '==', userEmail)
    );
  }

  validateForm(){
    this.nameForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
    });
    this.descriptionForm = new FormGroup({description: new FormControl('', [Validators.required, Validators.maxLength(350)])});
    this.subjectsForm = new FormGroup({subjects: new FormControl('', [Validators.required, Validators.maxLength(350)])});
    this.tagsForm = new FormGroup({tags: new FormControl('', [Validators.required, Validators.maxLength(350)])});
  }

  async updateName(): Promise<void> {
    const firstName = this.nameForm.value['firstName'];
    const lastName = this.nameForm.value['lastName'];

    console.log(firstName, lastName);
    if(this.profileService.updateName(firstName, lastName)){
      this.presentToast("Your name has been updated!", true, 'bottom', 3000);
    }
    else{
      this.presentToast("Sorry, try again later!", true, 'bottom', 3000);
    }
    
  }

  async updateDescription(): Promise<void> {
    const description = this.descriptionForm.value['description'];

    console.log(description);
    if(this.profileService.updateDescription(description)){
      this.presentToast("Description has been updated!", true, 'bottom', 3000);
    }
    else{
      this.presentToast("Sorry, try again later!", true, 'bottom', 3000);
    }
  }

  async updateSubjects(): Promise<void> {
    const subjects = this.subjectsForm.value['subjects'];

    console.log(subjects);
    if(this.profileService.updateSubjects(subjects)){
      this.presentToast("Subjects have been updated!", true, 'bottom', 3000);
    }
    else{
      this.presentToast("Sorry, try again later!", true, 'bottom', 3000);
    }
  }

  async updateTags(): Promise<void> {
    const tags = this.tagsForm.value['tags'];

    console.log(tags);
    if(this.profileService.updateTags(tags)){
      this.presentToast("Tags have been updated!", true, 'bottom', 3000);
    }
    else{
      this.presentToast("Sorry, try again later!", true, 'bottom', 3000);
    }
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
