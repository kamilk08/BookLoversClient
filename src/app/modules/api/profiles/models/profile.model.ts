import { ProfileSpecification } from './profile-specification.model'
import { Address } from './adress.model'
import { About } from './about.model'
import { Identification } from 'src/app/modules/shared'

export class Profile {
  public identification: Identification
  public userId:number
  public specification: ProfileSpecification
  public address: Address
  public about: About

  public editIdentity(firstName: string, secondName: string, birthDate: Date, sex: number) {
    this.specification = new ProfileSpecification(firstName, secondName, birthDate, sex);
  }

  public editAddress(country: string, city: string) {
    this.address = new Address(country, city);
  }

  public editAbout(aboutUser: string, website: string) {
    this.about = new About(aboutUser, website, this.about.joinedAt);
  }
}
