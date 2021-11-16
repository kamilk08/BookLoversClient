export class SelectedOption {
  public readonly value: number
  public readonly optionType: number

  constructor(value: number, optionType: number) {
    this.value = value;
    this.optionType = optionType;
  }
}
