import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Channel } from '../models/channel.class';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  currentChannel$ = new BehaviorSubject<Channel>(null);

  constructor() {}
  selectChannel(channel: Channel) {
    this.currentChannel$.next(channel);
  }
}
