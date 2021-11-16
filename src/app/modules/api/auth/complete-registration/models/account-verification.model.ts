import { UUID } from 'angular2-uuid';

export class VerifyAccount {

  public readonly email: string;
  public readonly token: string;

  constructor(email: string, token: string) {
    this.email = email;
    this.token = token;
  }
}
