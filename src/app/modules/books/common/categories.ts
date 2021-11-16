import { Category } from '../../api/books/models';
import { SubCategory, CategoryChild } from '../../api/books/models/sub-category.model';


export const CATEGORIES: Category[] = [Category.Fiction, Category.NonFiction]
export const FICTION_SUBCATEGORIES: SubCategory[] = [
    CategoryChild.FictionSubCategory(100, 'Fantasy'),
    CategoryChild.FictionSubCategory(101, 'Sci-Fi'),
    CategoryChild.FictionSubCategory(102, 'Romance'),
    CategoryChild.FictionSubCategory(103, 'Drama'),
    CategoryChild.FictionSubCategory(104, 'Thriller'),
    CategoryChild.FictionSubCategory(105, 'Action')
];
export const NON_FICTION_SUBCATEGORIES: SubCategory[] = [
    CategoryChild.NonFictionSubCategory(0, 'History'),
    CategoryChild.NonFictionSubCategory(1, 'Academic'),
    CategoryChild.NonFictionSubCategory(2, 'Politics'),
    CategoryChild.NonFictionSubCategory(3, 'Design'),
    CategoryChild.NonFictionSubCategory(4, 'Health'),
    CategoryChild.NonFictionSubCategory(5, 'Travel')
]

export const ALL_SUBCATEGORIES: SubCategory[] = FICTION_SUBCATEGORIES.concat(NON_FICTION_SUBCATEGORIES);
