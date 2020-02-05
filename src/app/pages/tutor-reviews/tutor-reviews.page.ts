import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ProfileService } from 'src/app/services/profile.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tutor-reviews',
  templateUrl: './tutor-reviews.page.html',
  styleUrls: ['./tutor-reviews.page.scss'],
})
export class TutorReviewsPage implements OnInit {

  reviews;
  tutorProfile;

  constructor(
    private profileService: ProfileService,
    public db: DatabaseService,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.presentLoading();
    const uid = this.profileService.currentUser.uid;
    this.reviews = this.db.collection$('tutorReviews', ref => ref
      .where('tutorId', '==', uid)
      .orderBy('createdAt', 'desc'));

    this.getAvgRating();
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

  getAvgRating() {
    const email = this.profileService.currentUser.email;
    this.tutorProfile = this.db.collection$('userProfile', ref => ref
      .where('email', '==', email));
  }

}
