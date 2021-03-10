import { Component, OnInit } from '@angular/core';
import { AdminService, Refuge } from 'src/app/admin/admin.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddRefugeComponent } from '../add-refuge/add-refuge.component';
import { DeleteRefugeComponent } from '../delete-refuge/delete-refuge.component';

@Component({
  selector: 'app-list-refuges',
  templateUrl: './list-refuges.component.html',
  styleUrls: ['./list-refuges.component.css']
})
export class ListRefugesComponent implements OnInit {

  refuges = []

  constructor(private adminService: AdminService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadAllrefuges()
  }

  loadAllrefuges() {
    this.adminService.getRefuges().forEach(actions => {
      let organizations = actions.map( a =>{
        let refuge = a.payload.doc.data() as Refuge;
        refuge.id = a.payload.doc.id
        return refuge
      })
      this.refuges = organizations
    });
  }

  editRefuge(refuge) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      refuge: refuge
    }
    this.dialog.open(AddRefugeComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(_ => {
    //   console.log("cerrado")
    // });
  }

  deleteRefuge(refuge) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: refuge.id,
      name: refuge.name
    }
    this.dialog.open(DeleteRefugeComponent, dialogConfig);
  }
}
