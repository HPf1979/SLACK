import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel.class';
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  channelArray: any = [];
  allMessages = [];

  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFirestore,
    private toolbarService: ToolbarService
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

  onChannelClick() {
    this.firestore
      .collection('messages')
      .valueChanges()
      .subscribe((messages: any) => {
        console.log('Received messages from DB for 1 channel', messages);
        this.allMessages = messages.sort((mess1: any, mess2: any) => {
          // neu nachrichen werden am Ende gezeigt
          return mess1.timestamp - mess2.timestamp;
        });
        console.log();
      });
  }
}
