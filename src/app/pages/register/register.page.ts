import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { NavController, MenuController, ToastController } from '@ionic/angular';

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
 
  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       //this.errorMessage = "";
       //this.successMessage = "Your account has been created. Please log in.";
       //this.presentToastUnsuccessful(this.errorMessage);
       this.presentToastSuccessful();
     }, err => {
       console.log(err);
       this.presentToastUnsuccessful(this.errorMessage = err.message);
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

  async presentToastSuccessful() {
    const toast = await this.toastController.create({
      color: 'dark',
      message: "Your account has been created. Please log in.",
      duration: 3000,
      showCloseButton: true
    });
    toast.present();
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menu.enable(true);
  }

}