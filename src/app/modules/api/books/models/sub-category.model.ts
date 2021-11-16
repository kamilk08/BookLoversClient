import { Category } from './category.model'

export interface SubCategory {
    id: number
    name: string,
    category: Category
}

export class CategoryChild implements SubCategory {
    id: number
    name: string
    category: Category

    constructor(id: number, name: string, category: Category) {
        this.id = id;
        this.name = name;
        this.category = category;
    }

    public static FictionSubCategory = (id: number, name: string) => new CategoryChild(id, name, Category.Fiction);
    public static NonFictionSubCategory = (id: number, name: string) => new CategoryChild(id, name, Category.NonFiction);
}
