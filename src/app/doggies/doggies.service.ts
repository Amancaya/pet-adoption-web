import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { COLLECTIONS_REFUGES, COLLECTIONS_DOGS } from '../admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class DoggiesService {

  constructor(private afs: AngularFirestore) { }

  getRefuges() {
    return this.afs.collection(COLLECTIONS_REFUGES).snapshotChanges()
  }

  getDogs() {
    return this.afs.collection(COLLECTIONS_DOGS).snapshotChanges()
  }

  async getDogFilter(refuge: string, genre: string) {
    const ref = this.afs.collection(COLLECTIONS_DOGS).ref

    const refuges = ref.where('refuge.name','==', refuge).get()
    const dogs = ref.where('genre', '==', genre).get()

    const [refugeSnashot, dogSnapshot] = await Promise.all([ refuges, dogs ]);

    const refugesArray = refugeSnashot.docs;
    const dogArray = dogSnapshot.docs;

    return refugesArray.concat(dogArray)
  }
}
