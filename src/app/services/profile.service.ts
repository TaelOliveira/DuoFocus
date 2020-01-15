import { Injectable } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase/app';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;

  constructor(
    private authService: AuthenticationService,
    public toastController: ToastController,
  ) { 
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
      }
    });
    this.currentUser = firebase.auth().currentUser;
    this.userProfile = firebase.firestore().doc(`/userProfile/${this.currentUser}`);
  }

  getUserProfile(): firebase.firestore.DocumentReference {
    return this.userProfile;
  }

  updatePhotoURL(photoURL: string){
    return this.userProfile.update({ photoURL });
  }

  updateName(firstName: string, lastName: string): Promise<any> {
    return this.userProfile.update({ firstName, lastName });
  }

  updateUsername(username: string): Promise<any> {
    return this.userProfile.update({ username });
  }

  updateSchool(schoolName: string): Promise<any> {
    return this.userProfile.update({ schoolName });
  }

  updateCourse(courseName: string): Promise<any> {
    return this.userProfile.update({ courseName });
  }

  updateDescription(description: string): Promise<any> {
    return this.userProfile.update({ description });
  }

  updateSubjects(subjects: string): Promise<any> {
    return this.userProfile.update({ subjects });
  }

  updateTags(tags: string): Promise<any> {
    return this.userProfile.update({ tags });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );
  
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.currentUser.updatePassword(newPassword).then(() => {
          console.log('Password Changed');
          this.presentToast('Password updated', true, 'bottom', 3000);
        });
      })
      .catch(error => {
        console.error(error);
        this.presentToast('Password not updated', true, 'bottom', 3000);
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
