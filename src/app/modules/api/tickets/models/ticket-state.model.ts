export class TicketState {
  public readonly value: number;
  public readonly name: string;

  constructor(value: number, name: string) {
    this.value = value;
    this.name = name;
  }

  public static solved() {
    return new TicketState(1, 'Solved');
  }

  public static inProgress() {
    return new TicketState(2, 'InProgress');
  }
}

export const TICKET_STATES: TicketState[] = [TicketState.solved(),TicketState.inProgress()];
