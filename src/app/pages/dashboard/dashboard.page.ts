import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    public menu: MenuController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.menu.enable(true);   
  }

}
