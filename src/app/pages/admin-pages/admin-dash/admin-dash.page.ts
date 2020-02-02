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
  }

  async getTopicsNumber() {

    await this.afs.collection('topics')
      .get()
      .subscribe(topic => {
        this.topicsNumber = topic.size;
        console.log(this.topicsNumber)
      })
  }

}
