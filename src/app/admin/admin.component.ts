import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AdminService, COLLECTIONS_REFUGES } from './admin.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRefugeComponent } from './refuges/add-refuge/add-refuge.component';
import { AddDogComponent } from './dogs/add-dog/add-dog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  showRefuges = true;

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void { }

  logout(){
    this.authService.logout()
  }

  add() {
    if(this.showRefuges) {
      this.dialog.open(AddRefugeComponent);
    } else {
      this.dialog.open(AddDogComponent);
    }
  }

  onValChange(value) {
    this.showRefuges = value == COLLECTIONS_REFUGES
  }
}
