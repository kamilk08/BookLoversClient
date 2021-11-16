export class Decision {
  public readonly value: number;
  public readonly name: string;

  constructor(value: number, name: string) {
    this.value = value;
    this.name = name;
  }

  public static approve() {
    return new Decision(1, 'Approve');
  };

  public static decline() {
    return new Decision(2, 'Decline');
  }

  public static unknown() {
    return new Decision(3, 'Unknown');
  }
}

export const AVALIABLE_DECISIONS: Decision[] = [Decision.approve(), Decision.decline(), Decision.unknown()];
