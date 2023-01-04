export class Channel {
  channelName: string;
  timestamp: Date;

  constructor(obj?: any) {
    this.channelName = obj ? obj.channel : '';
    this.timestamp = obj ? obj.timestamp : '';
  }

  public toJSON() {
    return {
      channelName: this.channelName,
      timestamp: this.timestamp,
    };
  }
}
