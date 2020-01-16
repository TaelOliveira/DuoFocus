import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user$: Observable<any>;

  constructor(
    public angularFireAuth: AngularFireAuth,
    public toastController: ToastController,
    public ngZone: NgZone,
    private storage: Storage,
    public loadingController: LoadingController,
    private navCtrl: NavController,
    public router: Router
  ) { }

  emailSent: string = 'Please, validate your email address.';
  emailError: string = 'The email address is already in use by another account.';
  
  SendVerificationMail() {
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        user.sendEmailVerification().then(function() {
          console.log("Email sent")
        }, function(error) {
          console.log("Email not sent")
        })
      }
  });
}

  registerUser(value){
    // Sending email verification notification, when registering new users
    this.SendVerificationMail();
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
    .then(
      res => resolve(res),
      err => reject(err))
    })
    .then((newUserCredential: firebase.auth.UserCredential) => {
      firebase
        .firestore()
        .doc(`/userProfile/${newUserCredential.user.uid}`)
        .set({'email': value.email, 'student': 'true', 'phptoURL': 'https://firebasestorage.googleapis.com/v0/b/duofocus-c5eca.appspot.com/o/avatar.png?alt=media&token=f232e127-8584-4638-ab2c-489a8f6343c5'});
    })
    .catch((error) => {
      console.log(error.message)
      this.presentToast(this.emailError, false, 'bottom', 3000);
    })
    .catch(error => {
      console.error(error);
      throw new Error(error);
    });
   }
   
   loginUser(value): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(
        async res => {
          if (res.user.emailVerified !== true) {
            console.log('Please validate your email address.');
            this.presentToast('Please validate your email address.', false, 'bottom', 3000);
          }
          else{
            await this.presentLoading();
            await this.ngZone.run(async () => {
              //this.router.navigate(['/first-sign-in']);
              if(await this.storage.get('firstSignInComplete') == true){
                this.router.navigate(['/dashboard']);
              }
              else{
                this.router.navigate(['/first-sign-in'])
              }
            });
          }
    })
      .catch(error => {
        console.error(error);
        this.presentToast(error.message, false, 'bottom', 3000);
        throw new Error(error);
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
  
   logoutUser(){
     return firebase.auth().signOut();
   }
  
   userDetails(){
     return firebase.auth().currentUser;
   }

   // loading alert
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