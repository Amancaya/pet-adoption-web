import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required])
  hide = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un email';
    }
    return this.email.hasError('email') ? 'No es un email valido' : '';
  }

  getErrorPasswordMessage() {
    if (this.password.hasError('required')) {
      return 'Debe ingresar un password';
    }
  }

  login() {
    if (this.email.valid && this.password.valid) {
      console.log(this.email.value)
      console.log(this.password.value)
      
      this.authService.login(this.email.value, this.password.value).then(result => {
        console.log(result)
      });
    }
  }
}
