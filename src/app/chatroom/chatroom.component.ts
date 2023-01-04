import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Chat } from '../models/chat.class';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  chat: Chat = new Chat();
  message: string;
  timestamp: Date;

  allMessages = [];

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _db: AngularFireDatabase,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.firestore
      .collection('messages')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log('Received changes from DB', changes);
        this.allMessages = changes.sort((mess1: any, mess2: any) => {
          // neu nachrichen werden am Ende gezeigt
          return mess1.timestamp - mess2.timestamp;
        });
        console.log();
      });
  }
  logout() {
    this._authService.logout().then(() => {
      this._router.navigate(['/login']);
    });
  }

  onAddMessage() {
    this.chat.message = this.message;
    this.chat.timestamp = new Date();

    this.firestore
      .collection('messages')
      .add(this.chat.toJSON())
      .then(() => {
        this.message = '';
      });
  }
}
