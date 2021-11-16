export class AuthorDetails {
    public birthDate: Date
    public deathDate: Date
    public birthPlace: string
    public addedById: number

    constructor(birthDate: Date, deathDate: Date, birthPlace: string, addedById: number) {
        this.birthDate = birthDate;
        this.deathDate = deathDate;
        this.birthPlace = birthPlace;
        this.addedById = addedById;
    }
}
