import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ChatComponent } from '../chat/chat.component';
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
  count = [];

  constructor(
    public modal: ModalController,
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
      userEmail: this.profileService.currentUser.email,
      starRating,
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

  async presentChatModal(tutor?: any, chatID?: any){

    const userId = await this.profileService.currentUser.uid;

    const data = {
      createdBy: userId,
      tutorId: this.tutor.id,
      createdAt: new Date(),
      chatName: this.tutor.firstName,
      messages: []
    };

    this.chat = await this.afs.collection('chats').add(data);
    chatID = this.chat;
    console.log(chatID.id);

    const chatModal = await this.chatModal.create({
      component: ChatComponent,
      componentProps: {tutor, chatID}
    });
    return await chatModal.present();
  }

  dismissModal() {
    this.modal.dismiss({
      'dismissed': true
    });
  }

}
