export class FullName {
    public firstName: string
    public secondName: string
    public readonly value: string

    constructor(firstName: string, secondName: string) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.value = firstName === null ? secondName : firstName.concat(' ', secondName);
    }
}