import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public tutor = false;
  public student = true;

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
