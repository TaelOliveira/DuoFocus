import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  saveForm(question1: string, question2: string, question3: string): any {
    return firebase.database().ref('forms').push({ question1, question2, question3 });
  }

}
