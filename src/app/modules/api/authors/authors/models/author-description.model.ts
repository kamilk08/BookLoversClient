export class AuthorDescription {
    public about: string
    public source: string
    public website: string

    constructor(about: string, source: string, website: string) {
        this.about = about;
        this.source = source;
        this.website = website;
    }
}