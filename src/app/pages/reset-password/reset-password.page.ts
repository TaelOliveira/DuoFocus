import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  emailForm: FormGroup;
  errorMessage: string = '';
  error: string = '';

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

  constructor(
    private authService: AuthenticationService,
    public menu: MenuController,
    private fireauth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required])
    });
  }

  // disable the root left menu when leaving this page
  ionViewWillEnter() {
    this.menu.enable(false);
  }

  resetPassword() {
    const email = this.emailForm.value['email'];
    this.fireauth.auth.sendPasswordResetEmail(email)
      .then(data => {
        console.log(data);
        this.presentToast('Password reset email sent.', false, 'bottom', 3000);
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }

}
