import { Component, OnInit } from '@angular/core';
import { Form, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel.class';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class Channelcomponent implements OnInit {
  createChannelForm: Form;
  name = new FormControl('', [Validators.required]);
  channel: Channel = new Channel();
  channelName: string;
  timestamp: Date;

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {}

  onCreateChannelButtonClick() {
    this.channel.channelName = this.channelName; // channelName from DB to JSON in model channel.channelName
    this.channel.timestamp = new Date();

    this.firestore
      .collection('channels')
      .add(this.channel.toJSON())
      .then(() => {
        this.router.navigate(['']);
      });
  }

  onCancelButtonClick() {
    this.router.navigate(['']);
  }
}
