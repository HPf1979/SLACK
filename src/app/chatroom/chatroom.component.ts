import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _db: AngularFireDatabase
  ) {}

  ngOnInit() {}
  logout() {
    this._authService.logout().then(() => {
      this._router.navigate(['/login']);
    });
  }

  onAddMessage(message: string) {
    if (message != '') {
      //take the value and send it to firebase
      const messages = this._db.list('/messages');

      messages.push({
        message,
        timestamp: new Date().toISOString(),
      });
      1;
    }
  }
}
