import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { LoadingController, ToastController } from '@ionic/angular';

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
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.presentLoading();

    this.feedback = this.db.collection$('feedback');
  }

  deleteFeedback(feedback){
    if(this.db.delete(`feedback/${feedback.id}`)){
      this.presentToast("Feedback deleted!", true, 'bottom', 3000);
    }
    else{
      this.presentToast("Sorry, try again later!", true, 'bottom', 3000);
    }
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
