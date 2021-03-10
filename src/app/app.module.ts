import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//pipe
import { FileSizePipe } from './admin/file-size-pipe.pipe';

//firebase
export const firebaseConfig = environment.firebaseConfig;
import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

//services
import { AuthService } from './shared/auth.service';

//components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';

import * as firebase from 'firebase';
import { DoggiesComponent } from './doggies/doggies.component';
import { ListRefugesComponent } from './admin/refuges/list-refuges/list-refuges.component';
import { AddRefugeComponent } from './admin/refuges/add-refuge/add-refuge.component';
import { DeleteRefugeComponent } from './admin/refuges/delete-refuge/delete-refuge.component';
import { ListDogsComponent } from './admin/dogs/list-dogs/list-dogs.component';
import { AddDogComponent } from './admin/dogs/add-dog/add-dog.component';
import { DeleteDogComponent } from './admin/dogs/delete-dog/delete-dog.component';
import { FiltersPipe } from './doggies/filters.pipe';
import { DogViewComponent } from './doggies/dog-view/dog-view.component';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    DoggiesComponent,
    ListRefugesComponent,
    AddRefugeComponent,
    DeleteRefugeComponent,
    ListDogsComponent,
    AddDogComponent,
    FileSizePipe,
    DeleteDogComponent,
    FiltersPipe,
    DogViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig, 'doggies-app-4e95b'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    AngularFireAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
