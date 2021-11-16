export class TicketConcern {
  public readonly value: number;
  public readonly name: string

  constructor(value: number, name: string) {
    this.value = value;
    this.name = name;
  }

  public static book() {
    return new TicketConcern(1, 'Book');
  }

  public static author() {
    return new TicketConcern(2, 'Author');
  }
}

export const TICKET_CONCERNS: TicketConcern[] = [TicketConcern.book(), TicketConcern.author()]
export enum TicketConcernEnum {
  book = TicketConcern.book().value,
  author = TicketConcern.author().value
};
