import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-my-tutors',
  templateUrl: './my-tutors.page.html',
  styleUrls: ['./my-tutors.page.scss'],
})
export class MyTutorsPage implements OnInit {
  
  section: any;

  constructor(
    public menu: MenuController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.section = "activeTutors";
    this.menu.enable(true);   
  }

}
