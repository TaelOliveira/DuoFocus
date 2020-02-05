import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-feedback-emails',
  templateUrl: './feedback-emails.page.html',
  styleUrls: ['./feedback-emails.page.scss'],
})
export class FeedbackEmailsPage implements OnInit {

  feedback;

  constructor(
    public db: DatabaseService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.presentLoading();

    this.feedback = this.db.collection$('feedback');
  }

  async deleteFeedback(feedback){

    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete it?</strong>!!!',
      buttons: [
        {
          text: 'YES',
          role: 'yes',
          handler: data => {
            if(this.db.delete(`feedback/${feedback.id}`)){
              this.presentToast("Feedback deleted!", true, 'bottom', 3000);
            }
            else{
              this.presentToast("Sorry, try again later!", true, 'bottom', 3000);
            }
          }
        }, {
          text: 'NO',
          handler: data => {
            this.presentToast("Feedback not deleted!", true, 'bottom', 3000);
          }
        }
      ]
    });

    await alert.present();
    console.log(feedback.id);
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
