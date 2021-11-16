export class ChangeEmail {
  public readonly userName: string
  public readonly password: string;
  public readonly nextEmail: string;
  public readonly email: string;

  constructor(username: string, password: string, email: string, previousEmail: string) {
    this.userName = username;
    this.password = password;
    this.nextEmail = email;
    this.email = previousEmail;
  }

}
