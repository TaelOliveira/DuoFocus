import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { NavController, MenuController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  validation_messages = {
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Enter a valid email.' }
   ],
   'password': [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ]
 };
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    public menu: MenuController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder
  ) {}
 
  ngOnInit(){
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

  async tryRegister(value){
    
    this.authService.registerUser(value)
     .then(async res => {
       console.log(res);
       await this.presentLoading();
       //this.errorMessage = "";
       this.successMessage = "Your account has been created. Please validate your email.";
       //this.presentToastUnsuccessful(this.errorMessage);
       this.presentToastSuccessful(this.successMessage);
     }, async err => {
       console.log(err);
       await this.presentLoading();
       //this.presentToastUnsuccessful(err.message);
       //this.errorMessage = err.message;
       //this.successMessage = "";
     })
  }

  async presentToastUnsuccessful(message) {
    const toast = await this.toastController.create({
      color: 'dark',
      message: this.errorMessage,
      duration: 3000,
      showCloseButton: true
    });
    toast.present();
  }

  async presentToastSuccessful(message) {
    const toast = await this.toastController.create({
      color: 'dark',
      message: this.successMessage,
      duration: 3000,
      showCloseButton: true
    });
    toast.present();
  }

  // disable the root left menu when leaving this page
  ionViewWillEnter() {
    this.menu.enable(false);
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