import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';
import { ProfileService } from '../../services/profile.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { UploadPictureService } from 'src/app/services/upload-picture.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  error: string;
  image: any;
  courses;
  courseForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private imagePicker: ImagePicker,
    public loadingController: LoadingController,
    private authService: AuthenticationService,
    private profileService: ProfileService,
    public db: DatabaseService,
    public uploadPicture: UploadPictureService,
    public toastController: ToastController,
    private webview: WebView,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.presentLoading();
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    }
    else {
      this.navCtrl.navigateBack('');
    }
    this.refreshUserProfile();

    const userEmail = this.authService.userDetails().email;
    this.user = this.db.collection$('userProfile', ref =>
      ref
        .where('email', '==', userEmail)
    );
    this.courseForm = new FormGroup({courseName: new FormControl('', Validators.required)});
  }

  refreshUserProfile() {
    this.profileService
      .getUserProfile()
      .get()
      .then(userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
      });
  }

  async updateName(): Promise<void> {
    const alert = await this.alertController.create({
      subHeader: 'Update first name & last name',
      inputs: [
        {
          type: 'text',
          name: 'firstName',
          placeholder: 'Your first name',
          id: 'firstName'
          //value: this.userProfile.firstName,
        },
        {
          type: 'text',
          name: 'lastName',
          placeholder: 'Your last name',
          id: 'lastName'
          //value: this.userProfile.lastName,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.presentToast("Name and last name not updated!", true, 'bottom', 3000);
          }
        },
        {
          text: 'Save',
          handler: data => {
            const firstName$ = new Subject();
            const lastName$ = new Subject();
            const firstNameInput = document.getElementById('firstName') as HTMLInputElement;
            const lastNameInput = document.getElementById('lastName') as HTMLInputElement;
            firstNameInput.addEventListener('keyup', () => firstName$.next(firstNameInput.value));
            lastNameInput.addEventListener('keyup', () => lastName$.next(lastNameInput.value));
            if (firstNameInput.value && lastNameInput.value) {
              this.profileService.updateName(data.firstName, data.lastName);
              this.presentToast("Name and last name updated!", true, 'bottom', 3000);
            }
            else {
              this.presentToast("Name and last name not updated!", true, 'bottom', 3000);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async updateUsername(): Promise<void> {
    const alert = await this.alertController.create({
      subHeader: 'Update your username',
      inputs: [
        {
          type: 'text',
          name: 'username',
          placeholder: 'Your username',
          id: 'username'
          //value: this.userProfile.username,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.presentToast("Username not updated!", true, 'bottom', 3000);
          }
        },
        {
          text: 'Save',
          handler: data => {
            const username$ = new Subject();
            const usernameInput = document.getElementById('username') as HTMLInputElement;
            usernameInput.addEventListener('keyup', () => username$.next(usernameInput.value));
            if (usernameInput.value) {
              this.profileService.updateUsername(data.username);
              this.presentToast("Username updated!", true, 'bottom', 3000);
            }
            else {
              this.presentToast("Username not updated!", true, 'bottom', 3000);
            }
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

  getCourses(){
    this.courses = this.db.collection$('courses', ref =>
    ref
      .orderBy('name', 'desc')
    );
  }
  
  async updateCourse(): Promise<void> {
    const course = this.courseForm.value['courseName'];
    console.log(course);
    if(this.profileService.updateCourse(course)){
      this.presentToast("Couse updated!", true, 'bottom', 3000);
      this.courseForm.reset();
    }
    else{
      this.presentToast("Course not updated!", true, 'bottom', 3000);
    }
  }

  openImagePicker() {
    this.imagePicker.hasReadPermission()
      .then((result) => {
        if (result == false) {
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if (result == true) {
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

  async uploadImageToFirebase(image) {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    const toast = await this.toastController.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    this.presentLoading();
    let image_src = this.webview.convertFileSrc(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.uploadPicture.uploadImage(image_src, randomId)
      .then(photoURL => {
        this.image = photoURL;
        loading.dismiss();
        toast.present();
      }, err => {
        console.log(err);
      })
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