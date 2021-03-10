import { Component, OnInit, Inject } from '@angular/core';
import { AdminService, Refuge } from '../../admin.service';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { map, finalize } from "rxjs/operators";
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-dog',
  templateUrl: './add-dog.component.html',
  styleUrls: ['./add-dog.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddDogComponent implements OnInit {
  date = new FormControl(moment());

  dog: any = {};
  isEdit: Boolean = false
  isntInStorage: boolean = true;
  isHovering: boolean;
  imageDelete: boolean;
  imagesUploaded: string[] = new Array();
  filesUploaded: string[] = new Array();
  selectedOrg: any = {};
  selectedGenre = '';
  path: string = '';
  refuges = [];
  percentage: Observable<number>;
  snapshot: Observable<any>;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  fb;
  name = new FormControl('', [Validators.required, Validators.min(4)]);
  age = new FormControl('', [Validators.required]);
  description = new FormControl();

  constructor(private adminService: AdminService,
    private storage: AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<AddDogComponent>) {
    if (data != null) {
      this.dog = data.dog
    }
  }

  ngOnInit(): void {
    
    this.loadRefuges()
    this.isEdit = JSON.stringify(this.dog) !== '{}'
    if (this.isEdit) {
      this.initializeDatatoEdit()
    }
  }

  private initializeDatatoEdit() {
    const dateSaved = moment(this.dog.age, "YYYY-MM-DD")
    this.date.value.year(dateSaved.year())
    this.date.value.month(dateSaved.month())

    this.isntInStorage = false;
    this.name.setValue(this.dog.name)
    this.description.setValue(this.dog.description)
    this.path = this.dog.imagePath
    this.fb = this.dog.image
    this.selectedOrg = this.dog.refuge.name
    this.selectedGenre = this.dog.genre
    this.filesUploaded.push(this.dog.image)
  }

  getErrorAgeMessage() {
    if (this.age.hasError('required')) {
      return 'Debe ingresar una edad valido';
    }
  }

  getErrorNameMessage() {
    if (this.name.hasError('required')) {
      return 'Debe ingresar un nombre valido';
    }
  }

  loadRefuges() {
    this.adminService.getRefuges().forEach(actions => {
      let organizations = actions.map(a => {
        let refuge = a.payload.doc.data() as Refuge;
        refuge.id = a.payload.doc.id
        return refuge
      })
      this.refuges = organizations
    });
  }

  startUploadImage(event: FileList) {
    // The File object
    const file = event.item(0);
    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    this.path = `Dogs/${new Date().getTime()}_${file.name}`;
    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };
    // The main task
    const ref = this.storage.ref(this.path);
    this.task = this.storage.upload(this.path, file, { customMetadata });
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    // The file's download URL

    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL()
        this.downloadURL.subscribe(url => {
          if (url) {
            this.fb = url;
            this.filesUploaded.push(url)
            this.isntInStorage = false;
          }
        });
      })
    ).subscribe(url => {
      if (url.downloadURL) { }
    })
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  deleteFileStorage() {
    this.imageDelete = true;
    this.adminService.deleteImage(this.path)
    this.clean();
  }

  clean() {
    this.isntInStorage = true;
    this.imagesUploaded = [];
    this.filesUploaded = [];
    this.snapshot = null;
  }

  deleteFileForEdit() {
    this.imageDelete = true;
    this.clean()
    this.isntInStorage = true;
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  deleteImage(pathImage: string) {
    this.adminService.deleteImage(pathImage)
  }

  saveUpdateDog() {
    if (this.isEdit && this.dog.imagePath != this.path) {
      this.deleteImage(this.dog.imagePath)
    }
    const dateSelected = moment(this.date.value)
    const dateString = dateSelected.year() +"-"+ (dateSelected.month()+1)+"-01"

    this.dog.name = this.name.value
    this.dog.image = this.fb
    this.dog.genre = this.selectedGenre
    this.dog.age = dateString
    this.dog.description = this.description.value
    this.dog.imagePath = this.path
    this.dog.refuge = this.refuges.find(refuge => this.selectedOrg == refuge.name)

    if (this.isEdit) {
      this.adminService.updateDog(this.dog, this.dog.id)
    } else {
      this.adminService.createDog(this.dog)
    }
  }

  close() {
    if (this.isEdit && this.dog.imagePath != this.path) {
      this.deleteImage(this.path)
    }
    this.dialogRef.close()
  }

  chosenYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
}
