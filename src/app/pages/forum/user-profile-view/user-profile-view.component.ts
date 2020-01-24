import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { firestore } from 'firebase';
import { ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss'],
})
export class UserProfileViewComponent implements OnInit {

  topic;
  profile;

  constructor(
    public db: DatabaseService,
    public loadingController: LoadingController,
    public userModal: ModalController,
  ) { }

  ngOnInit() {

    this.presentLoading();

    const createdBy = this.topic.email;
    this.profile = this.db.collection$('userProfile', ref =>
    ref
      .where('email', '==', createdBy)
    );
  }

  dismissModal() {
    this.userModal.dismiss({
      'dismissed': true
    });
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
