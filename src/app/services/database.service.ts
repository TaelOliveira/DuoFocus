import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private afs:AngularFirestore
  ) { }

  collection$(path, query?){
    return this.afs
      .collection(path, query)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data:Object = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        })
      );
  }

  doc$(path):Observable<any>{
    return this.afs
      .doc(path)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return {id:doc.payload.id, ...doc.payload.data()};
        })
      );
  }

  
}
