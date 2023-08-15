import {LoginService} from './../../services/login.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {RegexPattern} from 'src/app/modules/shared-module/Constnats/app-constants';
import {TuiValidationError} from '@taiga-ui/cdk';
import {AuthService} from 'src/app/modules/shared-module/Services/auth.service';
import {Router} from '@angular/router';
import {ButtonComponent} from 'src/app/modules/shared-module/components/button/button.component';
import {InputPasswordComponent} from 'src/app/modules/shared-module/components/input-password/input-password.component';
import {InputTextComponent} from 'src/app/modules/shared-module/components/input-text/input-text.component';
import {NavbarComponent} from 'src/app/modules/shared-module/components/navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports:[ButtonComponent , InputPasswordComponent , InputTextComponent , ReactiveFormsModule , NavbarComponent]

})
export class LoginComponent implements OnInit {
  showLoader:boolean = true;
  btnName:string='Login';
  loginForm: FormGroup;
  btnAppearence:string = "primary" // for the appearence of the login button
  PassName: string = 'Password';
  emailVaule:string = "Email";
  email:FormControl = new FormControl(
  '',
  Validators.compose([
                       Validators.required,
                       Validators.pattern(RegexPattern.Email),
                     ])
);
  password:FormControl =  new FormControl('', [Validators.required]);
  constructor(private login: LoginService , private auth:AuthService , private route:Router) {}
  ngOnInit(): void {
    this.createForm();
  }

  emailError = new TuiValidationError('Your Email Is Invalid!'); // to pass the error message to the email's input
  passwordValidationError  = new TuiValidationError('Your Password Is Invalid!'); // to pass the error message to the password's input
    get computedError(): TuiValidationError | null {
        return this.emailError
    }
    get passwordError():TuiValidationError{
      return this.passwordValidationError
    }
  createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
  // to handle input password shared component
  handlePasswordChange(event){
    this.loginForm.get('password').setValue(event);
    this.loginForm.get('password').markAsDirty();
  }
  handleEmailChange(event){
    this.loginForm.get('email').setValue(event);
    this.loginForm.get('email').markAsDirty();
  }
  submitForm() {

    let formData = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    console.log(this.loginForm)
    if (this.loginForm.valid) {
      this.login.loginFn(formData)
      this.showLoader = true;
    }
  }

}
