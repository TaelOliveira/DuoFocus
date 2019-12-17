import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  userEmail: string;
  userProfile: any;
  user;
  errorMessage: string = '';
  section: any;
  firstName;
  error: string;
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private profileService: ProfileService,
    public db: DatabaseService,
    public toastController: ToastController,
    private fireauth: AngularFireAuth,
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
 
    this.refreshUserProfile();
  }

  refreshUserProfile() {
    this.profileService
        .getUserProfile()
        .get()
        .then(userProfileSnapshot => {
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

}