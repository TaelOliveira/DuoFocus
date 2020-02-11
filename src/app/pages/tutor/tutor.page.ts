import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { DatabaseService } from 'src/app/services/database.service';
import { TutorDetailComponent } from './tutor-detail/tutor-detail.component';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.page.html',
  styleUrls: ['./tutor.page.scss'],
})
export class TutorPage implements OnInit {

  tutor;
  tutorList: any[];
  loadedTutorList: any[];

  constructor(
    public db: DatabaseService,
    private afs: AngularFirestore,
    public loadingController: LoadingController,
    private profileService: ProfileService,
    public modal: ModalController
  ) { }

  ngOnInit() {
    this.presentLoading();

    this.afs.collection(`userProfile`, ref =>
      ref
        .where('tutor', '==', 'true')
        .orderBy('firstName', 'asc'))
      .valueChanges()
      .subscribe(tutorList => {
        this.tutorList = tutorList;
        this.loadedTutorList = tutorList;
      });

    /* this.tutor = this.db.collection$('userProfile', ref =>
      ref
        .where('tutor', '==', 'true')
        .orderBy('firstName', 'asc')
    ); */
  }

  trackById(idx, tutor) {
    return tutor.id;
  }

  async presentTutorDetail(tutor?: any) {
    const modal = await this.modal.create({
      component: TutorDetailComponent,
      componentProps: { tutor }
    });
    return await modal.present();
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

  filter(event) {
    let searchTerm = event.target.value.toLowerCase();
    this.tutorList = this.loadedTutorList.filter((tutor) => {

      if (tutor.description.toLowerCase().indexOf(searchTerm) !== -1 ||
        tutor.subjects.toLowerCase().indexOf(searchTerm) !== -1 ||
        tutor.tags.toLowerCase().indexOf(searchTerm) !== -1) {
        return tutor;
      }
    });
  }

}
