import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-first-sign-in',
  templateUrl: './first-sign-in.page.html',
  styleUrls: ['./first-sign-in.page.scss'],
})
export class FirstSignInPage implements OnInit {

  schools;

  constructor(
    public menu: MenuController,
    public db:DatabaseService,
    private authService: AuthenticationService,
  ) { }

  async ngOnInit() {
    this.schools = this.db.collection$('schools', ref =>
    ref
      .orderBy('createdAt', 'desc')
    );
    console.log(this.schools);
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  // enable the root left menu when leaving this page
  ionViewWillLeave() {
    this.menu.enable(true);
  }

  /* async finish(){
    await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('/');
  } */

}
