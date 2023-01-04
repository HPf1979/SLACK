import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  channelArray: any = [];

  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((channels: any) => {
        console.log('Received channels from DB', channels);
        this.channelArray = channels.sort((channel1: any, channel2: any) => {
          // neu nachrichen werden am Ende gezeigt
          return channel1.timestamp - channel2.timestamp;
        });
      });
  }
}
