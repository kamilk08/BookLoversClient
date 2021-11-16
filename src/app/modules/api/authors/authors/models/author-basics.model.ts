import { Sex } from 'src/app/modules/shared/models/sexes'
import { FullName } from 'src/app/modules/shared/models/fullname';

export class AuthorBasics {
    fullName: FullName
    sex: Sex

    constructor(fullName: FullName, sexId: number) {
        this.fullName = fullName;
        this.sex = Sex.getSex(sexId);
    }
}