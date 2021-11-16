import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, map, tap, filter, takeUntil } from 'rxjs/operators';
import { PublisherCycle } from 'src/app/modules/api/cycles/models/publisher-cycle.model';
import { DEFAULT_DEBOUNCE } from 'src/app/modules/shared/common/constants';
import { removeWhiteSpaces, noNullOrUndefined, noEmptyStrings } from 'src/app/modules/shared/common/operator-extensions';

import { SearchEvent } from 'src/app/modules/shared/common/search.event';

@Component({
  selector: 'search-publisher-cycle',
  templateUrl: './search-publisher-cycle.component.html',
  styleUrls: ['./search-publisher-cycle.component.scss']
})
export class SearchPublisherCycleComponent implements OnInit, OnDestroy, OnChanges {

  private readonly searchChanges$ = new BehaviorSubject('');
  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  @Input() form: FormGroup
  @Input() publisherCycles: PublisherCycle[]
  @Input() isFiltered: boolean;
  @Input() selectedCycles: PublisherCycle[]

  @Output() search: EventEmitter<SearchEvent> = new EventEmitter<SearchEvent>();

  constructor() { }

  ngOnInit() {
    this.searchChanges$.asObservable()
      .pipe(
        debounceTime(DEFAULT_DEBOUNCE),
        map(removeWhiteSpaces()),
        filter(noNullOrUndefined()),
        filter(noEmptyStrings()),
        tap((value: string) => this.search.emit({ phrase: value })),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.publisherCycles && this.publisherCycles.length === 0) {
      this.publisherCycles = this.selectedCycles;
      this.form.get('publisherCycles').setValue(this.selectedCycles);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  onSearch(value: string) {
    this.publisherCycles = undefined;
    this.searchChanges$.next(value);
  }

  compare(o1: PublisherCycle, o2: PublisherCycle) {
    if (o1 && o2) {
      return o1.identification.id === o2.identification.id;
    }
    else
      return o1;
  }

}
