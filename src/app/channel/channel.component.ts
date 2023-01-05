import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel.class';
import { getFirestore } from 'firebase/firestore';
import { firestoreInstance$ } from '@angular/fire/firestore';
import { Chat } from '../models/chat.class';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class Channelcomponent implements OnInit {
  channel: Channel = new Channel();
  channelName: string;
  timestamp: Date;

  chat: Chat = new Chat();
  message: string;

  allMessages = [];

  constructor(
    private router: Router,
    private _db: AngularFireDatabase,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {}

  onCreateChannelButtonClick() {
    this.channel.channelName = this.channelName;
    this.channel.timestamp = new Date();

    this.chat.message = this.message; // message from DB to JSON chat.message
    this.chat.timestamp = new Date();

    this.firestore
      .collection('channels')
      .add(this.channel.toJSON())
      .then((channelId) => {
        console.log('New Channel Id', channelId.id);
        this.router.navigate(['']);
        this.firestore
          .collection('channels')
          .doc(channelId.id)
          .collection('messages')
          .add({ user: '', message: '', timestamp: '' });
      });
  }

  onCancelButtonClick() {
    this.router.navigate(['']);
  }
}
