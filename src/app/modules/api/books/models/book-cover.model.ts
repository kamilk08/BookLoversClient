import { CoverType } from './cover-type';
import { COVER_TYPES } from '../../../books/common/cover-types';

export class BookCover {
    public coverType: CoverType
    public source: string
    public isCoverAdded: boolean

    constructor(coverTypeId: number, source: string, isCoverAdded: boolean) {
        this.coverType = COVER_TYPES.find(ct => ct.id === coverTypeId);
        this.source = source;
        this.isCoverAdded = isCoverAdded;
    }
}
