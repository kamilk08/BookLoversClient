import { HttpParams } from "@angular/common/http";
import { CLIENT } from "./models/client.model";

export const refreshTokenParams = (refreshToken: string)=>{

  let params = new HttpParams();
  params = params.append('refresh_token', refreshToken);
  params = params.append('client_Id', CLIENT.client_Id);
  params = params.append('grant_type', 'refresh_token');
  params = params.append('client_secret', CLIENT.clinet_secret);

  return params;
}
