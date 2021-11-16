export class Language {
    id: number
    name: string

    private constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public static newLanguage(id: number, name: string) {
        return new Language(id, name);
    }
}