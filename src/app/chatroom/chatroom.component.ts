import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Chat } from '../models/chat.class';
import { ToolbarService } from '../toolbar/toolbar.service';
import { Channel } from '../models/channel.class';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  @Input()
  chat: Chat = new Chat();
  message: string;
  timestamp: Date;

  channel: Channel;

  channelName: string;

  allMessages = [];

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _db: AngularFireDatabase,
    private firestore: AngularFirestore,
    private toolbarService: ToolbarService
  ) {}

  ngOnInit() {
    this.firestore
      .collection('messages')
      .valueChanges()
      .subscribe((messages: any) => {
        console.log('Received messages from DB', messages);
        this.allMessages = messages.sort((mess1: any, mess2: any) => {
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
    this.chat.message = this.message; // message from DB to JSON chat.message
    this.chat.timestamp = new Date();

    this.firestore
      .collection('messages')
      .add(this.chat.toJSON())
      .then(() => {
        this.message = '';
      });
  }
}
