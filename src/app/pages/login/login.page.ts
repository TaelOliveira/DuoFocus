import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MenuController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
 
  constructor(
    private authService: AuthenticationService,
    public menu: MenuController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private navCtrl: NavController,
    public router: Router,
    private storage: Storage,
    private formBuilder: FormBuilder
  ) { }
 
  ngOnInit() {
 
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }
 
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
 
  async loginUser(value){
    this.authService.loginUser(value)
    .then(async res => {
      console.log(res);
      await this.presentLoading();
      this.errorMessage = "";
      this.navCtrl.navigateForward('/first-sign-in');
    }, async err => {
      console.log(err);
      await this.presentLoading();
      this.presentToastUnsuccessful(this.errorMessage = err.message);
      //this.errorMessage = err.message;
    })
  }

  // disable the root left menu when leaving this page
  ionViewWillEnter() {
    this.menu.enable(false);
  }

  // toast unsuccessful login
  async presentToastUnsuccessful(message) {
    const toast = await this.toastController.create({
      color: 'dark',
      message: this.errorMessage,
      duration: 3000,
      showCloseButton: true
    });
    toast.present();
  }

  // loading alert
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