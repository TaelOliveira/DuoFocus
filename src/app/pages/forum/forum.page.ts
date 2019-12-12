import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
  
  section: any;

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.section = "myTopics";    
  }

}
