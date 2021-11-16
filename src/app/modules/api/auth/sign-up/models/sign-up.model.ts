import { UUID } from 'angular2-uuid';
import { SignUpAccount } from './sign-up-account.model';

export class SignUpModel {
    userGuid: UUID
    bookcaseGuid: UUID
    profileGuid: UUID
    account: SignUpAccount

    constructor(username: string, email: string, password: string) {
        this.userGuid = UUID.UUID();
        this.bookcaseGuid = UUID.UUID();
        this.profileGuid = UUID.UUID();
        this.account = new SignUpAccount(username, email, password);
    }
}
