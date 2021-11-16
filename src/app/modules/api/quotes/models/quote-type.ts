export class QuoteType {
    public readonly value: number
    public readonly name: string

    constructor(value: number, name: string) {
        this.value = value;
        this.name = name;
    }

    public static readonly bookQuote = 1;
    public static readonly authorQuote = 2;
}
export const QUOTE_TYPES: QuoteType[] = [new QuoteType(QuoteType.bookQuote, 'book quote'), new QuoteType(QuoteType.authorQuote, 'author quote')]; 