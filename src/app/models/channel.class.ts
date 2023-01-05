export class Channel {
  key: string;
  channelName: string;
  timestamp: Date;

  constructor(obj?: any) {
    this.key = obj ? obj.channel : '';
    this.channelName = obj ? obj.channel : '';
    this.timestamp = obj ? obj.timestamp : '';
  }

  public toJSON() {
    return {
      key: this.key,
      channelName: this.channelName,
      timestamp: this.timestamp,
    };
  }
}
