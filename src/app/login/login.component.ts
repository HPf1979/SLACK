import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  createUserForm: FormGroup;
  isNewUser = false;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private db: AngularFireDatabase,
    private _router: Router
  ) {}
  ngOnInit() {
    this.createForms();
  }

  createForms() {
    const buildGroup = () => {
      return this._formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    };

    const newUserBuildGroup = () => {
      return this._formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        /*       username: ['', [Validators.required]], */
      });
    };

    this.loginForm = buildGroup();

    this.createUserForm = newUserBuildGroup();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onLoginSubmitButtonClick({ value, valid }: { value: any; valid: boolean }) {
    if (this.loginForm.valid) {
      this.authService.login(value.email, value.password).then((user) => {
        this._router.navigate(['/home']);
      });
    } else {
      this.validateAllFormFields(this.loginForm);
    }
  }

  onCreateUserSubmitButtonClick({
    value,
    valid,
  }: {
    value: any;
    valid: boolean;
  }) {
    if (this.createUserForm.valid) {
      this.authService.createUser(value.email, value.password).then((user) => {
        // lets add a user to our firebase db with the key of its userid
        const usersRef = this.db.list('/users');
        usersRef
          .update(value.uid, {
            email: value.email,
            photoURL: 'https://placekitten.com/40/40?image=1',
            username: value.username,
          })
          .then(() => this._router.navigate(['/home']));
      });
    } else {
      this.validateAllFormFields(this.createUserForm);
    }
  }
}
