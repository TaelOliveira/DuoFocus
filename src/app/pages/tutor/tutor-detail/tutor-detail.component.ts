import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor-detail',
  templateUrl: './tutor-detail.component.html',
  styleUrls: ['./tutor-detail.component.scss'],
})
export class TutorDetailComponent implements OnInit {

  tutor;

  constructor() { }

  ngOnInit() {
    console.log(this.tutor.id);
  }

}
