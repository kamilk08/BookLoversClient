import { SubCategory } from './sub-category.model';


export class BookBasics {
    public title: string
    public isbn: string
    public bookCategory: SubCategory

    constructor(title: string, isbn: string, subCategory: SubCategory) {
        this.title = title;
        this.isbn = isbn;
        this.bookCategory = subCategory;
    }
}
