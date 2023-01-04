export class User {
  email: string;
  uid: string;
  photoUrl: string;
  username: string;

  constructor(obj?: any) {
    this.email = obj ? obj.email : '';
    this.uid = obj ? obj.uid : '';
    this.photoUrl = obj ? obj.photoUrl : '';
    this.username = obj ? obj.username : '';
  }

  public toJSON() {
    return {
      email: this.email,
      uid: this.uid,
      photoUrl: this.photoUrl,
      username: this.username,
    };
  }
}
