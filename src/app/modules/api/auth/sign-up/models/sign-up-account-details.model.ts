export class SignUpAccountDetails {
  public readonly userName: string
  public readonly email: string

  constructor(username: string, email: string) {
    this.userName = username;
    this.email = email;
  }
}
