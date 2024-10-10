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
import {FormBuilder} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserUtilsService } from '../../../serv/API/user-utils.service';
import { Router } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';
import { AuthService } from '../../../serv/API/auth.service';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { LSServService } from '../../../serv/logic/lsserv.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const formGroup = control as FormGroup; // Type assertion to treat the control as FormGroup
  const password = formGroup.get('password')?.value;
  const agpassword = formGroup.get('agpassword')?.value;
  return password === agpassword ? null : { 'mismatch': true };
}


@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatStepperModule, ReactiveFormsModule
    ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  constructor(
    public apiUtils: UserUtilsService,
    public apiAuth: AuthService,
    public logC: LoginPageComponent,
    private _formBuilder: FormBuilder,
    private lsserv: LSServService
  ) {}



  isPasswordMismatch(): boolean {
    return this.signUpForm.hasError('mismatch');
  }


  matcher = new MyErrorStateMatcher();

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  userFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required])
  agpasswordFormControl = new FormControl('', [Validators.required])
  
  emailVerificationFormControl = new FormControl('', [Validators.required]);


  verificationForm = new FormGroup({
    emailVerification: this.emailVerificationFormControl,
  });

  signUpForm = new FormGroup({
    email: this.emailFormControl,
    name: this.userFormControl,
    password: this.passwordFormControl,
    agpassword: this.agpasswordFormControl,
  },{validators: passwordMatchValidator});
  
  isAbleToLogin = false

  onVerfSubmit(){
    this.addUserClick(this.verificationForm.value.emailVerification || '');
  }

  onSubmit() {  
    this.buffEmail = this.emailFormControl.value || "";
    this.buffName = this.userFormControl.value || "";
    this.buffPassword = this.passwordFormControl.value || "";
    this.apiAuth.RequestEmailKey(this.buffEmail);

  }

  singInStep: number = 0;
  emailVerification: string = '';
  tryAgain: string = '';

  buffPassword: string = '';
  buffEmail: string = '';
  buffName: string = '';

  status:string ="Login Failed For some reason, contact an admin for help";

  addUserClick(ver: string) {

    this.apiUtils
      .AddUser(
        this.buffName,
        this.buffEmail,
        this.buffPassword,
        ver
      )
      .subscribe(
        (response) => {
          this.status = "Congratulations, User: " + response.name + " was created!";
          this.isAbleToLogin = true;
        },
        (error) => {
          if (error.error.error == 'Email already used') {
            this.status = 'Email already used';
          } else {
            this.status = "Internal Server Error, please try again later";
          }
          this.isAbleToLogin = false; 
        }
      );
  }
  logIn(){
    this.apiAuth
      .RequestSessionToken(this.buffEmail, this.buffPassword)
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
            this.status = "Login Failed For some reason, contact an admin for help";
          } else {
            this.status = "Internal Server Error, please try again later";
            console.error('Error during POST request', error);
          }
        }
      );
  }


  exit(){
    this.logC.exitSingIn();
  }
}

