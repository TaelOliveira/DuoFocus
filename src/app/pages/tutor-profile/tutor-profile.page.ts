import { Component, OnInit } from '@angular/core';

import { NavController, AlertController, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';
import { ProfileService } from '../../services/profile.service';
import { DatabaseService } from 'src/app/services/database.service';
import { UploadPictureService } from 'src/app/services/upload-picture.service';
import { UpdateInformationComponent } from './update-information/update-information.component';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.page.html',
  styleUrls: ['./tutor-profile.page.scss'],
})
export class TutorProfilePage implements OnInit {

  userEmail: string;
  userProfile: any;
  user;
  errorMessage: string = '';
  section: any;
  firstName;
  lastName;
  description;
  subjects;
  tags;
  error: string;
  image: any;

  constructor(
    private navCtrl: NavController,
    public loadingController: LoadingController,
    private authService: AuthenticationService,
    private profileService: ProfileService,
    public db: DatabaseService,
    public uploadPicture: UploadPictureService,
    public toastController: ToastController,
    public modal: ModalController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.presentLoading();
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }
    else{
      this.navCtrl.navigateBack('');
    }

    const userEmail = this.authService.userDetails().email;
    this.user = this.db.collection$('userProfile', ref =>
    ref
      .where('email', '==', userEmail)
    );

    this.profileService
        .getUserProfile()
        .get()
        .then(userProfileSnapshot => {
            this.userProfile = userProfileSnapshot.data();
        });
  }

  async presentUpdateInfoForm(user?: any){
    const modal = await this.modal.create({
      component: UpdateInformationComponent,
      componentProps: {user}
    });
    console.log(this.user.firstName)
    return await modal.present();
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
