import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-refuge',
  templateUrl: './add-refuge.component.html',
  styleUrls: ['./add-refuge.component.css']
})
export class AddRefugeComponent implements OnInit {

  refuge: any = {};
  isEdit: Boolean = false
  name = new FormControl('', [Validators.required, Validators.min(4)]);
  cellphone = new FormControl('', [Validators.required, Validators.min(8)]);
  manager = new FormControl('', [Validators.required, Validators.min(4)]);

  constructor(private service: AdminService, @Inject(MAT_DIALOG_DATA) data) { 
      if(data != null) {
        this.refuge = data.refuge
      }
  }

  ngOnInit(): void { 
    this.isEdit = JSON.stringify(this.refuge) !== '{}'
    if(this.isEdit) {
      this.name.setValue(this.refuge.name)
      this.cellphone.setValue(this.refuge.cellphone)
      this.manager.setValue(this.refuge.manager)
    }
  }

  getErrorNameMessage() {
    if (this.name.hasError('required')) {
      return 'Debe ingresar un nombre valido';
    }
  }

  getErrorCellphoneMessage() {
    if (this.cellphone.hasError('required')) {
      return 'Debe ingresar un telefono valido';
    }
  }

  getErrorManagerMessage() {
    if (this.manager.hasError('required')) {
      return 'Debe ingresar un nombre de encargado valido';
    }
  }

  saveUpdateRefuge() {
    this.refuge.name = this.name.value;
    this.refuge.cellphone = this.cellphone.value;
    this.refuge.manager = this.manager.value;

    if(this.isEdit) {
      this.service.updateRefuges(this.refuge, this.refuge.id)
    } else {
      this.service.createRefuges(this.refuge).then(resp => { }).catch(e => { console.log(e) })
    } 
  }
}
