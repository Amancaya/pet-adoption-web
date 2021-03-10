import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-refuge',
  templateUrl: './delete-refuge.component.html',
  styleUrls: ['./delete-refuge.component.css']
})
export class DeleteRefugeComponent implements OnInit {

  id: string
  name: string

  constructor(private service: AdminService, @Inject(MAT_DIALOG_DATA) data) {
    this.id = data.id
    this.name = data.name
  }

  ngOnInit(): void { }

  delete() {
    this.service.deleteRefuges(this.id)
  }
}
