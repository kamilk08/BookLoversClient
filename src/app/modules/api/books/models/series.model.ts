import { UUID } from 'angular2-uuid';

export class BookSeries {
    public seriesId: number
    public seriesGuid: UUID
    public positionInSeries: number

    constructor(seriesId: number, seriesGuid: UUID, position: number) {
        this.seriesId = seriesId;
        this.seriesGuid = seriesGuid;
        this.positionInSeries = position;
    }

    static EmptySeries(){
        return new BookSeries(undefined,undefined,undefined);
    }
}
