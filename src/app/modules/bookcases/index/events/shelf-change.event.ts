import { Shelf } from 'src/app/modules/bookcases/models';

export interface ShelfChange {
    shelf: Shelf
    selected: boolean;
}
