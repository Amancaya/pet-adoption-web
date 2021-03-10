import { Component, OnInit } from '@angular/core';
import { AdminService, Dog } from '../../admin.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DeleteDogComponent } from '../delete-dog/delete-dog.component';
import { AddDogComponent } from '../add-dog/add-dog.component'

@Component({
  selector: 'app-list-dogs',
  templateUrl: './list-dogs.component.html',
  styleUrls: ['./list-dogs.component.css']
})
export class ListDogsComponent implements OnInit {

  dogs = []

  constructor(private adminService: AdminService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadAllDogs()
  }

  loadAllDogs() {
    this.adminService.getDogs().forEach(actions => {
      let organizations = actions.map( a =>{
        let dog = a.payload.doc.data() as Dog;
        dog.id = a.payload.doc.id
        return dog
      })
      this.dogs = organizations
    });
  }

  getGenre(genre: string) {
    return genre == 'M'? "Macho" : "Hembra"
  }

  editDog(dog) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dog: dog
    }
    this.dialog.open(AddDogComponent, dialogConfig);
  }

  deleteDog(dog) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: dog.id,
      name: dog.name,
      imagePath: dog.imagePath
    }

    this.dialog.open(DeleteDogComponent, dialogConfig);
  }
}
