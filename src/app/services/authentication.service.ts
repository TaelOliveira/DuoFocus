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
        .set({'email': value.email, 'tutor': 'false'});
    })
    .catch((error) => {
      console.log(error.message)
      this.toast(this.emailError);
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
          }
          else{
            this.ngZone.run(() => {
              this.navCtrl.navigateForward('/first-sign-in');
            });
          }   
    })
      .catch(error => {
        console.error(error);
        throw new Error(error);
   });
  }

   async toast(message) {
    const toast = await this.toastController.create({
      color: 'dark',
      message: message,
      duration: 3000,
      showCloseButton: true
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