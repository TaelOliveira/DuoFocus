import { Component, OnInit } from '@angular/core';

import { NavController, AlertController, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';
import { ProfileService } from '../../services/profile.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { UploadPictureService } from 'src/app/services/upload-picture.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
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
    private imagePicker: ImagePicker,
    public loadingCtrl: LoadingController,
    private authService: AuthenticationService,
    private profileService: ProfileService,
    public db: DatabaseService,
    public uploadPicture: UploadPictureService,
    public toastController: ToastController,
    private webview: WebView,
    public modal: ModalController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
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

  openImagePicker(){
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
  }

  async uploadImageToFirebase(image){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    const toast = await this.toastController.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    this.presentLoading(loading);
    let image_src = this.webview.convertFileSrc(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.uploadPicture.uploadImage(image_src, randomId)
    .then(photoURL => {
      this.image = photoURL;
      loading.dismiss();
      toast.present();
    }, err =>{
      console.log(err);
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
