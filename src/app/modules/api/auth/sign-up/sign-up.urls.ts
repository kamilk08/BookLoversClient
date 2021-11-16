import { environment } from 'src/environments/environment';

export const SIGN_UP = `${environment.api}/auth/sign_up`;
export const IS_EMAIL_UNIQUE = (email: string) => `${environment.api}/auth/email/${email}/`;
export const IS_USERNAME_UNIQUE = (username: string) => `${environment.api}/auth/username/${username}/`;
