import { ShelfCategory } from '../models/shlef-category.model';

export const READED_SHELF = new ShelfCategory(1, "Readed");
export const NOW_READING_SHELF = new ShelfCategory(2, "Now reading");
export const WANTS_TO_READ_SHELF = new ShelfCategory(3, "Wants to read");
export const CUSTOM_SHELF = new ShelfCategory(4, "Custom");

export const SHELF_CATEGORIES: ShelfCategory[] = [
    READED_SHELF,
    NOW_READING_SHELF,
    WANTS_TO_READ_SHELF,
    CUSTOM_SHELF
];

