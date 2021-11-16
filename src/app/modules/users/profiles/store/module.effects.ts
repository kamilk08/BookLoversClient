import { ChangeProfileEffects } from "./change-profile/change-profile.effects";
import { ChangeEmailFormEffects } from "./profile-page/change-email/change-email-form.effects";
import { ChangePasswordFormEffects } from "./profile-page/change-password/change-password-form.effects";
import { ChangeProfileFormEffects } from "./profile-page/change-profile/change-profile-form.effects";
import { ProfileWebPageEffects } from "./profile-page/profile-web-page.effects";
import { ProfileEffects } from "./profile/profile.effects";

export const moduleEffects: any[] = [
  ProfileEffects,
  ChangeProfileEffects,
  ProfileWebPageEffects,
  ChangeEmailFormEffects,
  ChangePasswordFormEffects,
  ChangeProfileFormEffects]
