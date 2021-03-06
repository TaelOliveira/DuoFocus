import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from './services/authentication.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public student = false;
  public tutor = false;
  public admin = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private authService: AuthenticationService,
    private navigationController: NavController,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`/userProfile/${user.uid}`)
          .get()
          .then(userProfileSnapshot => {
            this.student = userProfileSnapshot.data().student;
            this.tutor = userProfileSnapshot.data().tutor;
            this.admin = userProfileSnapshot.data().admin;
          });
      }
    });
  }

  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navigationController.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }

}
