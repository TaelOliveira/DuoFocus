import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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

  constructor(
    public menu: MenuController,
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
            this.student = userProfileSnapshot.data().student;
            this.tutor = userProfileSnapshot.data().tutor;
          });
      }
    });
  }

  ionViewWillEnter(){
    this.menu.enable(true);   
  }

}
