
import { Injectable } from '@angular/core';
import { BookcaseSettings } from 'src/app/modules/bookcases/bookcase-settings/models/bookcase-settings.model';
import { Bookcase } from 'src/app/modules/bookcases/models';
import { Adapter } from 'src/app/modules/shared';
import { ShelfAdatper } from './shelf.adapter';

@Injectable()
export class BookcaseAdapter implements Adapter<Bookcase> {

    constructor(private shelfAdapter: ShelfAdatper) { }

    adapt(item: any): Bookcase {
        if (!item)
            return undefined;

        const bookcase: Bookcase = {
            identification: { id: item.id, guid: item.guid },
            userId: item.readerId,
            shelfs: this.adaptShelfs(item),
            settings: this.adaptSettings(item),
            getCoreShelfs: Bookcase.prototype.getCoreShelfs,
            getCustomShelves: Bookcase.prototype.getCustomShelves,
            getShelf: Bookcase.prototype.getShelf,
            getShelfByCategory: Bookcase.prototype.getShelfByCategory,
            addToShelf: Bookcase.prototype.addToShelf,
            addShelf: Bookcase.prototype.addShelf,
            hasBookOnShelf: Bookcase.prototype.hasBookOnShelf,
            hasBook: Bookcase.prototype.hasBook,
            removeShelf: Bookcase.prototype.removeShelf,
            changeSettings: Bookcase.prototype.changeSettings,
            getShelvesWithBook: Bookcase.prototype.getShelvesWithBook,
            removeFromShelf: Bookcase.prototype.removeFromShelf,
        };

        return bookcase;
    }

    private adaptShelfs(item: any) {
        return Array.from(item.shelves).map(shelf => this.shelfAdapter.adapt(shelf));
    }

    private adaptSettings(item: any) {
        return {
            shelfCapacity: item.bookcaseOptions.capacity,
            privacy: item.bookcaseOptions.privacy,
        } as BookcaseSettings
    }

}
