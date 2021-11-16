import { UUID } from 'angular2-uuid';
import { Profile } from './profile.model';

export class EditProfileModel {
  public readonly profileGuid: UUID;
  public readonly address: any
  public readonly identity: any
  public readonly about: any

  constructor(profile: Profile) {
    this.profileGuid = profile.identification.guid;
    this.address = {
      country: profile.address.country,
      city: profile.address.city
    },
      this.identity = {
        firstName: profile.specification.firstName,
        secondName:profile.specification.secondName,
        birthDate: profile.specification.birthDate,
        sex: profile.specification.sex
      },
      this.about = {
        webSite: profile.about.webSite,
        content: profile.about.content
      }
  }
}
