import { AuthApi } from "./auth.api";
import { VerifyAccountApi } from "./complete-registration/verify-account.api";
import { TokenRefreshApi } from "./refreshing-tokens/token-refresh.api";
import { ResetPasswordApi } from "./reset-password/reset-password.api";
import { SignInApi } from "./sign-in/sign-in.api";
import { SignUpApi } from "./sign-up/sign-up.api";
import { UserAdapter } from "./user.adapter";

export const api: any[] = [VerifyAccountApi, TokenRefreshApi,
  ResetPasswordApi, SignInApi, SignUpApi, AuthApi];

export const adapters: any[] = [UserAdapter];
