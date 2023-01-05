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
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { user } from '@angular/fire/auth';
import { User } from '../models/user.class';
import * as firebase from 'firebase/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loginForm: FormGroup;
  createUserForm: FormGroup;
  isNewUser = false;
  username: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private firestore: AngularFirestore,
    private _db: AngularFireDatabase,
    private _router: Router,
    private Auth: AngularFireAuth
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
        username: ['', [Validators.required]],
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
      this._authService.login(value.email, value.password).then((user) => {
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
      this._authService.createUser(value.email, value.password);
      // lets add a user to our firebase db with the key of its userid

      this.user.email = value.email; // message from DB to JSON chat.message
      this.user.username = value.username;

      this.firestore
        .collection('users')
        .add(this.user.toJSON())
        .then(() => this._router.navigate(['/home']));
    } else {
      this.validateAllFormFields(this.createUserForm);
    }
  }
}
