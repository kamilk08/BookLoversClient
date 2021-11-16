export class About {
    public content: string
    public webSite: string
    public joinedAt: Date

    constructor(about: string, webSite: string, joinedAt: Date) {
        this.content = about;
        this.webSite = webSite;
        this.joinedAt = joinedAt;
    }
}