import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-dog-view',
  templateUrl: './dog-view.component.html',
  styleUrls: ['./dog-view.component.css']
})
export class DogViewComponent implements OnInit {

  dog: any

  constructor(@Inject(MAT_DIALOG_DATA) data,) { 
    if (data != null) {
      this.dog = data.dog
    }
  }

 
  ngOnInit(): void {
  }

  getWhatsApp(cellphone: string) {
    return "https://wa.me/591" +cellphone
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
}
