import { Adapter } from 'src/app/modules/shared/adapter';
import { Profile } from './models/profile.model';
import { ProfileSpecification } from './models/profile-specification.model';
import { Address } from './models/adress.model';
import { About } from './models/about.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileAdapter implements Adapter<Profile>{
  adapt(item: any): Profile {
    if (!item)
      return undefined;

    let profile: Profile = {
      identification: {
        id: item.id,
        guid: item.guid
      },
      userId: item.readerId,
      specification: this.adaptSpecification(item),
      address: this.adaptAdress(item),
      about: this.adaptAbout(item),
      editIdentity: Profile.prototype.editIdentity,
      editAddress: Profile.prototype.editAddress,
      editAbout: Profile.prototype.editAbout
    };
    return profile;
  }

  private adaptSpecification(item: any): ProfileSpecification {
    return new ProfileSpecification(item.firstName, item.secondName, item.birthDate, item.sex);
  }

  private adaptAdress(item: any): Address {
    return new Address(item.country, item.city);
  }

  private adaptAbout(item: any): About {
    return new About(item.about, item.webSite, item.joinedAt);
  }

}
