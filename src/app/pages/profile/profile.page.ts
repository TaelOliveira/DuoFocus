import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  userEmail: string;
  public userProfile: any;
  user;
  errorMessage: string = '';
  emailMessage: string = 'Email Changed Successfully';
  section: any;
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private profileService: ProfileService,
    public db: DatabaseService,
    public toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }
 
  ngOnInit(){
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }
    else{
      this.navCtrl.navigateBack('');
    }

    this.profileService
    .getUserProfile()
    .get()
    .then( userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.data();
    });
  }

  ionViewWillEnter(){
    this.section = "profile";    
  }

  async updateName(): Promise<void> {
    const alert = await this.alertController.create({
      subHeader: 'Your first name & last name',
      inputs: [
        {
          type: 'text',
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName,
        },
        {
          type: 'text',
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName,
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updateName(data.firstName, data.lastName);
          },
        },
      ],
    });
    await alert.present();
  }

  async updateEmail(): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'myAlert',
      inputs: [
        { type: 'text', name: 'newEmail', placeholder: 'Your new email' },
        { name: 'password', placeholder: 'Your password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService
              .updateEmail(data.newEmail, data.password)
              .then(() => {
                //console.log('Email Changed Successfully');
                this.presentToastSuccessful(this.emailMessage);
              })
              .catch(error => {
                console.log('ERROR: ' + error.message);
                //this.errorMessage = error.message;
                this.presentToastUnsuccessful(error.message);
              });
          },
        },
      ],
    });
    await alert.present();
  }
  
  async updatePassword(): Promise<void> {
    const alert = await this.alertController.create({
      inputs: [
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          },
        },
      ],
    });
    await alert.present();
  }

  async presentToastUnsuccessful(message) {
    const toast = await this.toastController.create({
      color: 'dark',
      message: message,
      duration: 3000,
      showCloseButton: true
    });
    toast.present();
  }

  async presentToastSuccessful(message) {
    const toast = await this.toastController.create({
      color: 'dark',
      message: message,
      duration: 3000,
      showCloseButton: true
    });
    toast.present();
  }

}