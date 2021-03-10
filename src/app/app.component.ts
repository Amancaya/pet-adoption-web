import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'refuges-project';

  isLogIn: boolean = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => { 
      this.isLogIn = auth != null 
    })
  }

  goAdmin(){
    this.router.navigate(['admin'])
  }

  goDoggies() {
    this.router.navigate(['doggies'])
  }

  goHome() {
    this.router.navigate([''])
  }
}