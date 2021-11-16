export class Category {
    id: number
    name: string

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public static Fiction: Category = new Category(2, 'Fiction');
    public static NonFiction: Category = new Category(1, 'Non-Fiction');
}