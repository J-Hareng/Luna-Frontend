import {Component} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SignupPageComponent } from '../signup-page/signup-page.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../serv/API/auth.service';
import { ExitOnbackklickComponent } from '../../extra/exit-onbackklick/exit-onbackklick.component';
import { LSServService } from '../../../serv/logic/lsserv.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, SignupPageComponent, ExitOnbackklickComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  status: string = "";
  matcher = new MyErrorStateMatcher();
  singin: boolean = false;
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required])
  
  loginForm = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl,
  });

  constructor(public apiAuth: AuthService, private router: Router, private lsserv: LSServService) {}

  ngOnInit(): void {
    this.apiAuth.ValidateSessionToken('Login');
  }

  enableSingIn() {
    this.singin = true;
  }
  exitSingIn() {
    this.singin = false;
  }
  onSubmit() {
    if( this.loginForm.valid) {
      this.Login(this.emailFormControl.value|| "", this.passwordFormControl.value|| "");
    }
  }

  Login(email: string, passwd: string) {
      this.apiAuth
        .RequestSessionToken(email, passwd)
        .subscribe(
          (response) => {
            if (response.status != 200) {
              this.status = "Login Failed For some reason, contact an admin for help";
              return
            }
            this.lsserv.SetToken(response.body?.body.token || "");
            this.apiAuth.ValidateSessionToken('Login');
          },
          (error) => {
            if (error.error.error == 'Email or password wrong') {
              alert('Email or password wrong');
            } else {
              console.error('Error during POST request', error);
            }
          }
        );
    }
}

