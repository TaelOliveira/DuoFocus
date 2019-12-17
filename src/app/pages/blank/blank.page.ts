import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.page.html',
  styleUrls: ['./blank.page.scss'],
})
export class BlankPage implements OnInit {

  userEmail: string;

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if(this.storage.get('firstSignInComplete')){
      this.router.navigateByUrl('/my-tutors');
    }
    else{
      this.router.navigateByUrl('/first-sign-in');
    }
  }

}
