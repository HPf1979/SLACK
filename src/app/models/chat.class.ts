export class Chat {
  user: string;
  message: string;
  timestamp: Date;

  constructor(obj?: any) {
    this.user = obj ? obj.user : '';
    this.message = obj ? obj.message : '';
    this.timestamp = obj ? obj.timestamp : '';
  }

  public toJSON() {
    return {
      user: this.user,
      message: this.message,
      timestamp: this.timestamp,
    };
  }
}
