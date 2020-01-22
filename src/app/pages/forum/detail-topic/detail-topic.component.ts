import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-detail-topic',
  templateUrl: './detail-topic.component.html',
  styleUrls: ['./detail-topic.component.scss'],
})
export class DetailTopicComponent implements OnInit {

  userProfile: any;
  replyForm: FormGroup;
  reply;
  topicReport;
  replyReport;
  replies;
  topic;
  reportReplyId;
  numberOfCharacters = 0;

  validation_messages = {
    'reply': [
      { type: 'maxLength', message: 'Cannot have more than 350 characters long.' },
      { type: 'minLength', message: 'Cannot have less than 10 characters long.' }
    ],
  };

  constructor(
    public db: DatabaseService,
    public toastController: ToastController,
    private alertController: AlertController,
    public modal: ModalController,
    private afs: AngularFirestore,
    public loadingController: LoadingController,
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.profileService
      .getUserProfile()
      .get()
      .then(userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
      });
    this.presentLoading();
    console.log(this.topic.id);
    const topicId = this.topic.id;
    this.replies = this.db.collection$('replies', ref =>
      ref
        .where('topicId', '==', topicId)
        .orderBy('createdAt', 'desc')
    );

    const data = {
      reply: '',
      ...this.reply
    };
    this.replyForm = this.formBuilder.group({
      reply: new FormControl(data.reply, [Validators.required, Validators.minLength(10), Validators.maxLength(350)]),
    });
  }

  async createReply() {
    const id = this.reply ? this.reply.id : '';
    const data = {
      topicId: this.topic.id,
      createdAt: new Date(),
      createdBy: this.profileService.currentUser.uid,
      username: this.userProfile.username,
      ...this.reply,
      ...this.replyForm.value,
    };
    this.db.updateAt(`replies/${id}`, data);
    this.replyForm.reset();
    this.numberOfCharacters = 0;
  }

  onKeyUp(event: any): void {
    this.numberOfCharacters = event.target.value.length;
  }

  dismissModal() {
    this.modal.dismiss({
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

  async reportTopic() {
    const alert = await this.alertController.create({
      header: 'Report this Topic',
      cssClass: 'myAlert',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Inappropriate',
          value: 'Inappropriate',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Not useful',
          value: 'Not useful'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Unhelpful',
          value: 'Unhelpful'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Discrimination',
          value: 'Discrimination'
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Hate speech',
          value: 'Hate speech'
        },
        {
          name: 'radio6',
          type: 'radio',
          label: 'Threats',
          value: 'Threats'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.presentToast("Report not sent!", true, 'bottom', 3000);
          }
        },
        {
          text: 'Save',
          handler: (data: string) => {

            const id = this.topicReport ? this.topicReport.id : '';
            const data2 = {
              topicId: this.topic.id,
              sentBy: this.profileService.currentUser.uid,
              reason: data,
              content: this.topic.question,
              createdAt: new Date(),
            };
            if (this.db.updateAt(`reportTopic/${id}`, data2)) {
              this.presentToast("Report sent!", true, 'bottom', 3000);
            }
            else {
              this.presentToast("Please, try again!", true, 'bottom', 3000);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async reportReply(reply) {
    console.log(reply.id);
    const alert = await this.alertController.create({
      header: 'Report thie Reply',
      cssClass: 'myAlert',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Inappropriate',
          value: 'Inappropriate',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Not useful',
          value: 'Not useful'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Unhelpful',
          value: 'Unhelpful'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Discrimination',
          value: 'Discrimination'
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Hate speech',
          value: 'Hate speech'
        },
        {
          name: 'radio6',
          type: 'radio',
          label: 'Threats',
          value: 'Threats'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.presentToast("Report not sent!", true, 'bottom', 3000);
          }
        },
        {
          text: 'Save',
          handler: (data: string) => {

            const id = this.replyReport ? this.replyReport.id : '';
            const data2 = {
              replyId: reply.id,
              sentBy: this.profileService.currentUser.uid,
              reason: data,
              content: reply.reply,
              createdAt: new Date(),
            };
            if(this.db.updateAt(`reportReply/${id}`, data2)){
              this.presentToast("Report sent!", true, 'bottom', 3000);
            }
            else{
              this.presentToast("Please, try again!", true, 'bottom', 3000);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteReply(reply) {
    const userId = await this.profileService.currentUser.uid;
    console.log(reply.id);
    console.log(this.topic.createdBy, userId);

    if (this.topic.createdBy == userId) {
      this.db.delete(`replies/${reply.id}`)
      this.presentToast("Reply deleted!", true, 'bottom', 3000);
    }
    else {
      this.presentToast("You are not allowed to delete this reply!", true, 'bottom', 3000);
    }
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
