import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AngularFirestore, fromDocRef } from '@angular/fire/firestore';

import { FireSQL } from 'firesql';
import firebase from 'firebase/app';
import 'firebase/firestore';

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
  chat;
  numberOfCharacters = 0;
  avgRating;

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
    this.getAvgRating();
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

  trackById(idx, tutor) {
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
    this.getAvgRating();
  }

  logRatingChange(rating) {
    console.log("changed rating: ", rating);
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

  async startChat(tutor?: any, chatID?: any) {

    const userId = await this.profileService.currentUser.uid;
    const username = this.userProfile.username;
    const date = new Date();
    const date2 = new Date();
    date2.setDate(date2.getDate() + 2);

    const data = {
      createdBy: userId,
      username: username,
      tutorId: this.tutor.id,
      createdAt: date,
      chatName: "Tutor name: " + this.tutor.firstName,
      finishAt: date2
    };

    this.chat = await this.afs.collection('chats').add(data);
    chatID = this.chat;
    console.log(chatID.id);

    this.presentToast("Go to your 'My Tutor' page to see your chat!", true, 'bottom', 4000);
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

  async checkChats() {

    const uid = this.profileService.currentUser.uid;

    await this.afs.collection('chats', (ref) =>
      ref
        .where('createdBy', '==', uid)
        .where('tutorId', '==', this.tutor.id)
        .limit(1))
      .get()
      .subscribe(chat => {
        if (chat.size > 0) {
          this.presentToast("You cannot start another chat with this tutor!", true, 'bottom', 4000);
        }
        else {
          this.startChat();
          this.dismissModal();
        }
      })
  }

  getAvgRating() {
    const fireSQL = new FireSQL(firebase.firestore());
    const tutorId = this.tutor.id;
    const db = firebase.firestore()
    const tutorProfile = db.collection("userProfile").doc(tutorId);

    const avg = fireSQL.query(`
        SELECT AVG(starRating) as AVG
        FROM tutorReviews
        WHERE tutorId = '${tutorId}'
        `);

    avg.then(rating => {
      for (const avg of rating) {
        console.log(avg);
        tutorProfile.update({avg})
      }
    })
  }

}
