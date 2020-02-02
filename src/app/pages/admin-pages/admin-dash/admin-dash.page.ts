import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
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
  topicsNumber;
  topicsReportsNumber;
  topicsRepliesNumber;
  tutorEmails;
  feedbackNumber;

  constructor(
    public menu: MenuController,
    private afs: AngularFirestore,
    public db: DatabaseService,
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
            this.admin = userProfileSnapshot.data().student;
            this.student = userProfileSnapshot.data().student;
            this.tutor = userProfileSnapshot.data().tutor;
          });
      }
    });

    this.getTopicsNumber();
    this.getTopicsreportsNumber();
    this.getTopicsrepliesNumber();
    this.getTutorEmailsNumber();
    this.getFeedbackNumber();
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

}
