import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel.class';
import { ToolbarService } from './toolbar.service';
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getFirestore,
} from 'firebase/firestore';
import { Chat } from '../models/chat.class';
import * as firebase from 'firebase/compat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  [x: string]: any;
  channelArray: any = [];
  allMessages = [];

  chat: Chat = new Chat();
  message: string;
  timestamp: Date;

  channel: Channel;

  constructor(
    private firestore: AngularFirestore,
    private toolbarService: ToolbarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((channels: any) => {
        console.log('Received channels from DB', channels);
        this.channelArray = channels.sort((channel1: any, channel2: any) => {
          // neu nachrichen werden am Ende gezeigt
          return channel1.timestamp - channel2.timestamp;
        });
      });
  }

  onChannelClick(channel: any) {
    console.log(channel.channelName, channel.customIdName);

    this.router.navigate(['/channel', channel.customIdName]);
  }
}
