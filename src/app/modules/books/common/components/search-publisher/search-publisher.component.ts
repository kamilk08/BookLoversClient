import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, debounceTime, tap, filter, takeUntil } from 'rxjs/operators';
import { DEFAULT_DEBOUNCE } from 'src/app/modules/shared/common/constants';
import { noEmptyStrings, noNullOrUndefined, removeWhiteSpaces } from 'src/app/modules/shared/common/operator-extensions';
import { SearchEvent } from 'src/app/modules/shared/common/search.event';
import { Publisher } from '../../../../api/publishers/models/publisher.model';

@Component({
  selector: 'search-publisher',
  templateUrl: './search-publisher.component.html',
  styleUrls: ['./search-publisher.component.scss']
})
export class SearchPublisherComponent implements OnInit, OnDestroy, OnChanges {

  private unsubscribe$: Subject<void> = new Subject<void>()

  private searchChanges$ = new BehaviorSubject('');

  @Input() form: FormGroup
  @Input() publishers: Publisher[]
  @Input() isFiltered: boolean;
  @Input() selectedPublisher: Publisher;

  @Output() search: EventEmitter<SearchEvent> = new EventEmitter<SearchEvent>();

  constructor() { }

  ngOnInit() {
    this.searchChanges$.asObservable()
      .pipe(
        debounceTime(DEFAULT_DEBOUNCE),
        map(removeWhiteSpaces()),
        filter(noNullOrUndefined()),
        filter(noEmptyStrings()),
        tap((val: string) => this.search.emit({ phrase: val })),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedPublisher && this.publishers.length === 0) {
      this.publishers = [this.selectedPublisher];
      this.form.get('publisher').setValue(this.selectedPublisher);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  onSearch(value: string) {
    this.selectedPublisher = undefined;
    this.searchChanges$.next(value);
  }

  compare(o1: Publisher, o2: Publisher) {
    if (o1 && o2) {
      return o1.identification.id === o2.identification.id;
    }
    else
      return o1;
  }
}
