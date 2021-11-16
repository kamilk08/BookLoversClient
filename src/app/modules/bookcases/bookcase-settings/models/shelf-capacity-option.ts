export class ShelfCapacityOption {

  public readonly value: number;
  public readonly name: string;

  constructor(value: number, name: string) {
    this.value = value;
    this.name = name;
  }

  public static Capacity(value: number) {
    return new ShelfCapacityOption(value, value.toString());
  }

}

export const SHELF_CAPACITY_OPTIONS = [ShelfCapacityOption.Capacity(20), ShelfCapacityOption.Capacity(50), ShelfCapacityOption.Capacity(100)]
