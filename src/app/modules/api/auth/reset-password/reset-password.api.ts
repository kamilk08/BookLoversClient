import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DEFAULT_HEADERS } from "src/app/modules/shared/headers/url.headers";
import { GeneratePasswordModel } from "./models/generate-password.model";
import { ResetPasswordModel } from "./models/reset-password.model";
import { GENERATE_TOKEN_PASSWORD, RESET_PASSWORD } from "./reset-password.urls";

@Injectable()
export class ResetPasswordApi {

  constructor(private http: HttpClient) {
  }

  generateToken(model: GeneratePasswordModel) {
    return this.http.put(GENERATE_TOKEN_PASSWORD, JSON.stringify(model),
      { headers: DEFAULT_HEADERS() })
  }

  resetPassword(model: ResetPasswordModel) {
    return this.http.put(RESET_PASSWORD, JSON.stringify(model),
      { headers: DEFAULT_HEADERS() });
  }

}
