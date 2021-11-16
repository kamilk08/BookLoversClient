import { environment } from "src/environments/environment.prod";

export const GENERATE_TOKEN_PASSWORD = `${environment.api}/auth/password/token`;
export const RESET_PASSWORD = `${environment.api}/auth/password/reset`;
