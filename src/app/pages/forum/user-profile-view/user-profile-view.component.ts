import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss'],
})
export class UserProfileViewComponent implements OnInit {

  profile;
  topic;

  constructor(
    public db: DatabaseService,
  ) { }

  ngOnInit() {

    const createdBy = this.topic.createdBy;
    var db = firestore();
    this.profile = db.collection("userProfile").doc(createdBy);

    /* this.user = profile.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    }); */

  }
}
