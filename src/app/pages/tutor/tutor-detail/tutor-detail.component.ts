import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AngularFirestore } from '@angular/fire/firestore';

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
  rating;
  user;
  chat;
  numberOfCharacters = 0;

  constructor(
    public modal: ModalController,
    public toastController: ToastController,
    public chatModal: ModalController,
    private afs: AngularFirestore,
    public db: DatabaseService,
    private profileService: ProfileService,
    public loadingController: LoadingController,
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

  onKeyUp(event: any): void {
    this.numberOfCharacters = event.target.value.length;
  }

  trackById(idx, tutor){
    return tutor.id;
  }

  async postReview(): Promise<void> {
    const starRating = new Number(this.reviewForm.value['starRating']).toString();
    const id = this.review ? this.review.id : '';
    const data = {
      tutorId: this.tutor.id,
      createdAt: new Date(),
      createdBy: this.profileService.currentUser.uid,
      username: this.userProfile.username,
      starRating,
      ...this.review,
      ...this.reviewForm.value
    };

    this.db.updateAt(`tutorReviews/${id}`, data);
    this.reviewForm.reset();
    this.numberOfCharacters = 0;
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

  async startChat(tutor?: any, chatID?: any){

    const userId = await this.profileService.currentUser.uid;

    const data = {
      createdBy: userId,
      tutorId: this.tutor.id,
      createdAt: new Date(),
      chatName: this.tutor.firstName + " & " + this.userProfile.firstName,
      messages: []
    };

    this.chat = await this.afs.collection('chats').add(data);
    chatID = this.chat;
    console.log(chatID.id);

    this.presentToast("Go to your 'My Tutor' page to see your chat!", false, 'bottom', 4000);
  }

  dismissModal() {
    this.modal.dismiss({
      'dismissed': true
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
