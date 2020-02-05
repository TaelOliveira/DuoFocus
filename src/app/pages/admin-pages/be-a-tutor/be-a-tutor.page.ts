import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-be-a-tutor',
  templateUrl: './be-a-tutor.page.html',
  styleUrls: ['./be-a-tutor.page.scss'],
})
export class BeATutorPage implements OnInit {

  beTutor;

  constructor(
    public db: DatabaseService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.presentLoading();

    this.beTutor = this.db.collection$('beTutor');
  }

  async deleteEmail(email){
    
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete it?</strong>!!!',
      buttons: [
        {
          text: 'YES',
          role: 'yes',
          handler: data => {
            if(this.db.delete(`beTutor/${email.id}`)){
              this.presentToast("Email deleted!", true, 'bottom', 3000);
            }
            else{
              this.presentToast("Sorry, try again later!", true, 'bottom', 3000);
            }
          }
        }, {
          text: 'NO',
          handler: data => {
            this.presentToast("Email not deleted!", true, 'bottom', 3000);
          }
        }
      ]
    });

    await alert.present();
    console.log(email.id);
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
