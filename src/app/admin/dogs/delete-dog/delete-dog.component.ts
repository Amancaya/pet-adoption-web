import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dog',
  templateUrl: './delete-dog.component.html',
  styleUrls: ['./delete-dog.component.css']
})
export class DeleteDogComponent implements OnInit {

  id: string
  name: string
  imagePath: string

  constructor(private adminService: AdminService, @Inject(MAT_DIALOG_DATA) data) {
    this.id = data.id
    this.name = data.name
    this.imagePath = data.imagePath
  }

  ngOnInit(): void {
  }

  delete() {
    this.adminService.deleteDog(this.id)
    this.adminService.deleteImage(this.imagePath)
  }
}
