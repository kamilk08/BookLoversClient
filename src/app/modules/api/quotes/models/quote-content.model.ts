export class QuoteContent {
    public quoteText: string
    public date: Date

    constructor(content: string, date: Date) {
        this.quoteText = content;
        this.date = date;
    }
}