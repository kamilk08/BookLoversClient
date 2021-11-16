import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { map, tap, debounceTime, filter } from 'rxjs/operators';
import { DEFAULT_DEBOUNCE } from 'src/app/modules/shared/common/constants';
import { noEmptyStrings, noNullOrUndefined, removeWhiteSpaces } from 'src/app/modules/shared/common/operator-extensions';
import { SearchEvent } from 'src/app/modules/shared/common/search.event';
import { Series } from '../../../../api/series/models/series.model';

@Component({
  selector: 'search-series',
  templateUrl: './search-series.component.html',
  styleUrls: ['./search-series.component.scss']
})
export class SearchSeriesComponent implements OnInit, OnDestroy, OnChanges {

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly searchChanges$ = new BehaviorSubject('');

  @Input() form: FormGroup
  @Input() series: Series[]
  @Input() isFiltered: boolean;
  @Input() selectedSeries: Series;

  @Output() search: EventEmitter<SearchEvent> = new EventEmitter<SearchEvent>();

  constructor() { }

  ngOnInit() {
    this.searchChanges$.asObservable()
      .pipe(
        debounceTime(DEFAULT_DEBOUNCE),
        map(removeWhiteSpaces()),
        filter(noNullOrUndefined()),
        filter(noEmptyStrings()),
        tap((val: string) => this.search.emit({ phrase: val }))
      ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedSeries && this.series.length === 0) {
      this.series = [this.selectedSeries];
      this.form.get('series').setValue(this.selectedSeries)
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  searchSeries(value: string) {
    this.searchChanges$.next(value);
  }

  compare(o1: Series, o2: Series) {
    if (o1 && o2) {
      return o1.identification.id === o2.identification.id;
    }
    else
      return o1;
  }

}
