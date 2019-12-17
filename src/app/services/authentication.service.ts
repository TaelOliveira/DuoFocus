import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    public angularFireAuth: AngularFireAuth,
    public toastController: ToastController,
    public ngZone: NgZone,
    private storage: Storage,
    private navCtrl: NavController,
    public router: Router
  ) { 
  }

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
        .set({'email': value.email, 'tutor': 'false', 'student': 'true'});
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
        res => {
          if (res.user.emailVerified !== true) {
            console.log('Please validate your email address.');
            this.presentToast('Please validate your email address.', false, 'bottom', 3000);
          }
          else{
            this.ngZone.run(() => {
              if(this.storage.get('firstSignInComplete')){
                this.router.navigateByUrl('/my-tutors');
                console.log("Cheguei aqui")
              }
              //this.navCtrl.navigateForward('/first-sign-in');
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

 }