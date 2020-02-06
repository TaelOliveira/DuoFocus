import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  students;
  tutors;
  users;
  searchTerm;

  constructor(
    public db: DatabaseService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private afs: AngularFirestore,
    public toastController: ToastController,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.users = "students";
    this.getAllStudents();
  }

  getAllStudents() {
    this.presentLoading();
    this.students = this.db.collection$('userProfile', ref =>
      ref
        .where('student', '==', 'true')
    );
  }

  getAllTutors() {
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

  async studentDetail(student) {
    console.log(student.id);

    const alert = await this.alertController.create({
      header: 'Update user role',
      inputs: [
        {
          name: 'student',
          type: 'radio',
          label: 'Student',
          value: 'student',
          checked: true
        },
        {
          name: 'tutor',
          type: 'radio',
          label: 'Tutor',
          value: 'tutor'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.presentToast("User role not updated!", true, 'bottom', 3000);
          }
        },
        {
          text: 'Update',
          handler: (data: string) => {

            if (data == "student") {
              this.presentToast("User is a student!", true, 'bottom', 3000);
            }
            else {
              var userProfile = this.afs.collection('userProfile').doc(student.id);
              // Remove the 'student' field from the document
              var removeStudent = userProfile.update({
                student: firebase.firestore.FieldValue.delete()
              });
              userProfile.update({ "tutor": "true" });
              this.presentToast("User role updated! User is now a Tutor!", true, 'bottom', 3000);
            }

          },
        },
      ],
    });
    await alert.present();
  }

  async tutorDetail(tutor) {
    console.log(tutor.id);

    const alert = await this.alertController.create({
      header: 'Update user role',
      inputs: [
        {
          name: 'student',
          type: 'radio',
          label: 'Student',
          value: 'student',
        },
        {
          name: 'tutor',
          type: 'radio',
          label: 'Tutor',
          value: 'tutor',
          checked: true
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.presentToast("User role not updated!", true, 'bottom', 3000);
          }
        },
        {
          text: 'Update',
          handler: (data: string) => {

            if (data == "tutor") {
              this.presentToast("User is a Tutor!", true, 'bottom', 3000);
            }
            else {
              var userProfile = this.afs.collection('userProfile').doc(tutor.id);
              // Remove the 'tutor' field from the document
              var removeTutor = userProfile.update({
                tutor: firebase.firestore.FieldValue.delete()
              });
              userProfile.update({ "student": "true" });
              this.presentToast("User role updated! User is now a student!", true, 'bottom', 3000);
            }
          },
        },
      ],
    });
    await alert.present();
  }

}
