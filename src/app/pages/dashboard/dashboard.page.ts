import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ProfileService } from 'src/app/services/profile.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user;
  public student = false;
  public tutor = false;
  getDate = new Date();
  chatsNumber;
  reviewsNumber;

  constructor(
    public menu: MenuController,
    public db: DatabaseService,
    private afs: AngularFirestore,
    private profileService: ProfileService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    const userEmail = this.authService.userDetails().email;
    this.user = this.db.collection$('userProfile', ref =>
      ref
        .where('email', '==', userEmail)
    );

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`/userProfile/${user.uid}`)
          .get()
          .then(userProfileSnapshot => {
            this.student = userProfileSnapshot.data().student;
            this.tutor = userProfileSnapshot.data().tutor;
          });
      }
    });

    this.getChatsNumber();
    this.getReviewsNumber();
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  async getChatsNumber() {

    const uid = this.profileService.currentUser.uid;

    await this.afs.collection('chats', (ref) =>
      ref
        .where('tutorId', '==', uid))
      .get()
      .subscribe(chat => {
        this.chatsNumber = chat.size;
      })
  }

  async getReviewsNumber() {

    const uid = this.profileService.currentUser.uid;

    await this.afs.collection('tutorReviews', (ref) =>
      ref
        .where('tutorId', '==', uid))
      .get()
      .subscribe(reviews => {
        this.reviewsNumber = reviews.size;
      })
  }

}
