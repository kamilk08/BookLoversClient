export class ProfileSpecification {
  public firstName: string
  public secondName: string
  public birthDate: Date
  public sex: number

  constructor(firstName: string, secondName: string, birthDate: Date, sex: number) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.birthDate = birthDate;
    this.sex = +sex;
  }
}
