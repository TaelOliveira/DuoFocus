import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-tutors',
  templateUrl: './my-tutors.page.html',
  styleUrls: ['./my-tutors.page.scss'],
})
export class MyTutorsPage implements OnInit {
  
  section: any;

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.section = "activeTutors";    
  }

}
