import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  students;
  tutors;
  users;

  constructor(
    public db: DatabaseService,
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) { }

  ngOnInit() { }

  ionViewWillEnter(){
    this.users = "students";
    this.getAllTutors();
  }

  getAllStudents(){
    this.presentLoading();
    this.students = this.db.collection$('userProfile', ref =>
    ref
      .where('student', '==', 'true')
    );
  }

  getAllTutors(){
    this.presentLoading();
    this.tutors = this.db.collection$('userProfile', ref =>
    ref
      .where('tutor', '==', 'true')
    );
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
