import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ProfileService } from '../../services/profile.service'

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-first-sign-in',
  templateUrl: './first-sign-in.page.html',
  styleUrls: ['./first-sign-in.page.scss'],
})
export class FirstSignInPage implements OnInit {

  schools;
  courses;
  nameForm: FormGroup;
  public userProfile: any;

  constructor(
    public menu: MenuController,
    private formBuilder: FormBuilder,
    public profileService: ProfileService,
    public db: DatabaseService,
    //private storage: Storage,
    private router: Router,
    public alertController: AlertController
  ) {  }

  async ngOnInit() {

    this.profileService
    .getUserProfile()
    .get()
    .then( userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.data();
    });

    this.nameForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

    this.schools = this.db.collection$('schools', ref =>
    ref
      .orderBy('name', 'desc')
    );
    
    this.courses = this.db.collection$('courses', ref =>
    ref
      .orderBy('name', 'desc')
    );
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  // enable the root left menu when leaving this page
  ionViewWillLeave() {
    this.menu.enable(true);
  }

  async finish(){
    //await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('/profile');
  }

  async updateName(): Promise<void> {
    const firstName = this.nameForm.value['firstName'];
    const lastName = this.nameForm.value['lastName'];

    console.log(firstName, lastName);
    this.profileService.updateName(firstName, lastName);
  }
  

}
