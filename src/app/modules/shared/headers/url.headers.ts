import { HttpHeaders } from "@angular/common/http";
import { CLIENT } from "../../api/auth/refreshing-tokens/models/client.model";

export const DEFAULT_HEADERS = () => {
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
}

export class UrlHeaders {

  public static urlEncoded() {
    return new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    });
  }

  public static urlEncodedWithAuthorization() {
    return new HttpHeaders(
      {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
        "Authorization": "Basic " + btoa(`${CLIENT.client_Id}` + ':' + `${CLIENT.clinet_secret}`)
      });
  }
}
