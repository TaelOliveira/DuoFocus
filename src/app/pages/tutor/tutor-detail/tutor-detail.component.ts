import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-tutor-detail',
  templateUrl: './tutor-detail.component.html',
  styleUrls: ['./tutor-detail.component.scss'],
})
export class TutorDetailComponent implements OnInit {

  tutor;
  tutorId;
  tutorReviews;
  review;
  userProfile: any;
  reviewForm: FormGroup;
  count = [];

  constructor(
    public modal: ModalController,
    public db: DatabaseService,
    private profileService: ProfileService,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    console.log(this.tutor.id);
    this.profileService
        .getUserProfile()
        .get()
        .then(userProfileSnapshot => {
            this.userProfile = userProfileSnapshot.data();
        });
    
    this.presentLoading();
    const tutorId = this.tutor.id;
    this.tutorReviews = this.db.collection$('tutorReviews', ref =>
    ref
      .where('tutorId', '==', tutorId)
      .orderBy('createdAt', 'desc')
    );

    this.reviewForm = new FormGroup({
      review: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      starRating: new FormControl('', Validators.required),
    });

  }

  dismissModal() {
    this.modal.dismiss({
      'dismissed': true
    });
  }
rating;
  async postReview(): Promise<void> {
    const id = this.review ? this.review.id : '';
    const data = {
      tutorId: this.tutor.id,
      createdAt: new Date(),
      createdBy: this.profileService.currentUser.uid,
      userEmail: this.profileService.currentUser.email,
      //rating: this.logRatingChange(this.rating),
      ...this.review,
      ...this.reviewForm.value
    };

    this.db.updateAt(`tutorReviews/${id}`, data);
    this.reviewForm.reset();
  }

  logRatingChange(rating){
    console.log("changed rating: ", rating);
    // do your stuff
  }

  // loading alert
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
