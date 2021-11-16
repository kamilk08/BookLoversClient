import { CoverType } from './cover-type'
import { COVER_TYPES } from '../../../books/common/cover-types';

export class Cover {
    coverSource: string
    coverType: CoverType

    constructor(source: string, coverTypeId: number) {
        this.coverSource = source;
        this.coverType = COVER_TYPES.find(p => p.id === coverTypeId);
    }
}
