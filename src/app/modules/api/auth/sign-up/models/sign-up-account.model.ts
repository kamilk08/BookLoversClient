import { UUID } from 'angular2-uuid';
import { SignUpAccountDetails } from './sign-up-account-details.model';
import { SignUpAccountSecurity } from './sign-up-account-security.model';

export class SignUpAccount {
    accountDetails: SignUpAccountDetails
    accountSecurity: SignUpAccountSecurity

    constructor(username: string, email: string, password: string) {
        this.accountDetails = new SignUpAccountDetails(username, email);
        this.accountSecurity = new SignUpAccountSecurity(password);
    }
}
