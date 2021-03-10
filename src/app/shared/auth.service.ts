import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedin = false

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
  }


  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then( result => {
      this.router.navigate(['admin'])
    }).catch(err => console.log(err.message));
  }

  logout() {
    if(this.afAuth.authState) {
      this.afAuth.auth.signOut().then(() => {
        this.router.navigate([''])
        console.log(this.afAuth.auth.currentUser)
      })
    }
  } 
}