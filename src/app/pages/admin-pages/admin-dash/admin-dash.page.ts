import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.page.html',
  styleUrls: ['./admin-dash.page.scss'],
})
export class AdminDashPage implements OnInit {

  user;
  public admin = false;
  public student = false;
  public tutor = false;
  getDate = new Date();
  usersNumber;
  topicsNumber;
  topicsReportsNumber;
  topicsRepliesNumber;
  tutorEmails;
  feedbackNumber;
  chatsNumber;
  reviewsNumber;

  constructor(
    public menu: MenuController,
    public loadingController: LoadingController,
    private afs: AngularFirestore,
    public db: DatabaseService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.presentLoading();
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
            this.admin = userProfileSnapshot.data().student;
            this.student = userProfileSnapshot.data().student;
            this.tutor = userProfileSnapshot.data().tutor;
          });
      }
    });

    this.getUsersNumber();
    this.getTopicsNumber();
    this.getTopicsreportsNumber();
    this.getTopicsrepliesNumber();
    this.getTutorEmailsNumber();
    this.getFeedbackNumber();
    this.getChatsNumber();
    this.getReviewsNumber();
  }

  async getUsersNumber() {

    await this.afs.collection('userProfile')
      .get()
      .subscribe(usersNumber => {
        this.usersNumber = usersNumber.size;
        console.log(this.usersNumber)
      })
  }

  async getTopicsNumber() {

    await this.afs.collection('topics')
      .get()
      .subscribe(topic => {
        this.topicsNumber = topic.size;
        console.log(this.topicsNumber)
      })
  }

  async getTopicsreportsNumber() {

    await this.afs.collection('reportTopic')
      .get()
      .subscribe(reportTopic => {
        this.topicsReportsNumber = reportTopic.size;
        console.log(this.topicsReportsNumber)
      })
  }

  async getTopicsrepliesNumber() {

    await this.afs.collection('reportReply')
      .get()
      .subscribe(reportReply => {
        this.topicsRepliesNumber = reportReply.size;
        console.log(this.topicsRepliesNumber)
      })
  }

  async getTutorEmailsNumber() {

    await this.afs.collection('beTutor')
      .get()
      .subscribe(beTutor => {
        this.tutorEmails = beTutor.size;
        console.log(this.tutorEmails)
      })
  }

  async getFeedbackNumber() {

    await this.afs.collection('feedback')
      .get()
      .subscribe(feedback => {
        this.feedbackNumber = feedback.size;
        console.log(this.feedbackNumber)
      })
  }

  async getChatsNumber() {

    await this.afs.collection('chats')
      .get()
      .subscribe(chatsNumber => {
        this.chatsNumber = chatsNumber.size;
        console.log(this.chatsNumber)
      })
  }

  async getReviewsNumber() {

    await this.afs.collection('tutorReviews')
      .get()
      .subscribe(reviewsNumber => {
        this.reviewsNumber = reviewsNumber.size;
        console.log(this.reviewsNumber)
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

}
