export class Sex {
    id: number
    name: string

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public static Hidden: Sex = new Sex(1, 'Hidden');
    public static Male: Sex = new Sex(2, 'Male');
    public static Female: Sex = new Sex(3, 'Female');

    static getSex(sexId: number) {
        if (sexId === Sex.Hidden.id)
            return Sex.Hidden;
        else if (sexId === Sex.Male.id)
            return Sex.Male;
        else
            return Sex.Female;
    }
}

export const SEXES: Sex[] = [Sex.Hidden, Sex.Male, Sex.Female];