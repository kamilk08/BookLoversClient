export interface DecodedToken {
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  roles: Array<string>;
  userId: string;
  email: string

}
