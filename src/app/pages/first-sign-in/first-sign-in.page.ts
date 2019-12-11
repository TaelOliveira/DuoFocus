import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ProfileService } from '../../services/profile.service'
import { AuthenticationService } from '../../services/authentication.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-first-sign-in',
  templateUrl: './first-sign-in.page.html',
  styleUrls: ['./first-sign-in.page.scss'],
})
export class FirstSignInPage implements OnInit {

  schools;
  courses;
  nameForm: FormGroup;
  schoolForm: FormGroup;
  courseForm: FormGroup;
  userEmail: string;

  constructor(
    public menu: MenuController,
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    public profileService: ProfileService,
    public loadingController: LoadingController,
    public db: DatabaseService,
    private storage: Storage,
    private router: Router,
    public alertController: AlertController
  ) {  }

  async ngOnInit() {
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }
    else{
      this.navCtrl.navigateBack('');
    }

    this.validateForm();
    this.getSchools();
    this.getCourses();
  }

  validateForm(){
    this.nameForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
    this.schoolForm = new FormGroup({schoolName: new FormControl('', Validators.required)});
    this.courseForm = new FormGroup({courseName: new FormControl('', Validators.required)});
  }

  getSchools(){
    this.schools = this.db.collection$('schools', ref =>
    ref
      .orderBy('name', 'desc')
    );
  }

  getCourses(){
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

  async updateName(): Promise<void> {
    const firstName = this.nameForm.value['firstName'];
    const lastName = this.nameForm.value['lastName'];

    console.log(firstName, lastName);
    this.profileService.updateName(firstName, lastName);
  }

  async updateSchool(): Promise<void> {
    const school = this.schoolForm.value['schoolName'];
    console.log(school);
    this.profileService.updateSchool(school);
  }

  async updateCourse(): Promise<void> {
    const course = this.courseForm.value['courseName'];
    console.log(course);
    this.profileService.updateCourse(course);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Setting up your Profile...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async finish(){
    await this.storage.set('firstSignInComplete', true);
    console.log(this.storage.get('firstSignInComplete'));
    await this.presentLoading();
    this.router.navigateByUrl('/profile');
  }
  

}
