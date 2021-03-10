import { Component, OnInit } from '@angular/core';
import { DoggiesService } from './doggies.service';
import { Refuge, Dog } from '../admin/admin.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DogViewComponent } from './dog-view/dog-view.component';
import * as moment from 'moment';

@Component({
  selector: 'app-doggies',
  templateUrl: './doggies.component.html',
  styleUrls: ['./doggies.component.css']
})
export class DoggiesComponent implements OnInit {

  selectedOrg = ''
  selectedGenre = ''
  selectedAge = ''
  organizations = []
  dogs = []
  initiLisDogs = []

  constructor(private service: DoggiesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadRefuges()
    this.loadDogs()
  }

  private loadRefuges() {
    this.service.getRefuges().forEach(actions => {
      let organizations = actions.map( a =>{
        let resp = a.payload.doc.data() as Refuge;
        return resp.name
      })
      this.organizations = organizations
    });
  }

  private loadDogs() {
    this.service.getDogs().forEach(actions => {
      let dogs = actions.map( a =>{
        let dog = a.payload.doc.data() as Dog;
        dog.id = a.payload.doc.id
        return dog
      })
      this.initiLisDogs = dogs
      this.dogs = dogs
    });
  }

  getPhone(cellphone: string) {
    return "tel:" + cellphone
  }

  getGenre(genre: string) {
    return genre == 'M'? "Macho" : "Hembra"
  }

  getAge(date: string) {
    if(moment().diff(date, 'years') == 0) {
      return moment().diff(date, 'month') + " meses"
    } else {
      return moment().diff(date, 'years') + " años"
    }
  }

  getWhatsApp(cellphone: string) {
    return "https://wa.me/591" +cellphone
  }

  callDogView(dog) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px'
    dialogConfig.data = {
      dog: dog
    }
    this.dialog.open(DogViewComponent, dialogConfig);
  }
}
