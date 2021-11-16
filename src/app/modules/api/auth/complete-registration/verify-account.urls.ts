import { environment } from 'src/environments/environment';
import { VerifyAccount } from './models/account-verification.model';

export const VERIFY_ACCOUNT = (verifyAccount: VerifyAccount) =>
  `${environment.api}/auth/registration/${verifyAccount.email}/${verifyAccount.token}`;
