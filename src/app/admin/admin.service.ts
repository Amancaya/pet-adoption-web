import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

export interface Refuge {
  id: string,
  name: string,
  cellphone: string,
  manager: string
}

export interface Dog {
  id: string,
  name: string,
  description: string,
  image: string,
  imagePath: string,
  genre: string,
  age: string,
  refuge: Refuge
}

export const COLLECTIONS_REFUGES = "refuges"
export const COLLECTIONS_DOGS = "doggies"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { 

  }

  getRefuges() {
    return this.afs.collection(COLLECTIONS_REFUGES).snapshotChanges()
  }

  createRefuges(refuge: Refuge) {
    let id = this.afs.createId();
    refuge.id = id
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(COLLECTIONS_REFUGES).doc(id).set(refuge).then(res => {}, err => reject(err));
    })
  }

  updateRefuges(refuge: Refuge, id: string) {
    this.afs.collection(COLLECTIONS_REFUGES).doc(id).update(refuge)
  }

  deleteRefuges(id: string) {
    this.afs.collection(COLLECTIONS_REFUGES).doc(id).delete()
  }

  getDogs() {
    return this.afs.collection(COLLECTIONS_DOGS).snapshotChanges()
  }

  createDog(dog: Dog) {
    let id = this.afs.createId();
    dog.id = id
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(COLLECTIONS_DOGS).doc(id).set(dog).then(res => {}, err => reject(err));
    })
  }

  deleteDog(id: string) {
    this.afs.collection(COLLECTIONS_DOGS).doc(id).delete()
  }

  updateDog(dog: Dog, id: string) {
    this.afs.collection(COLLECTIONS_DOGS).doc(id).update(dog)
  }

  deleteImage(path: string) {
    this.storage.ref('/').child(path).delete();
  }
}
