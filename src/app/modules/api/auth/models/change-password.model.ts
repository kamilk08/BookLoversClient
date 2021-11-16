export class ChangePassword {
  public readonly email: string;
  public readonly userName: string;
  public readonly password: string;
  public readonly newPassword: string;

  constructor(email: string, username: string, password: string, newPassword: string) {
    this.email = email;
    this.userName = username;
    this.password = password;
    this.newPassword = newPassword;
  }

}
