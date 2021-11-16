import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';
import { PhraseChange } from './events/phrase-change.event';
import { DEFAULT_DEBOUNCE } from 'src/app/modules/shared/common/constants';

@Component({
  selector: 'bookcase-search-bar',
  templateUrl: './bookcase-search-bar.component.html',
  styleUrls: ['./bookcase-search-bar.component.scss']
})
export class BookcaseSearchBarComponent implements OnInit, OnDestroy {

  public searchInput: FormControl = new FormControl();
  public unsubscribe$: Subject<void> = new Subject<void>();

  @Input() show: boolean;

  @Output() phraseChange: EventEmitter<PhraseChange> = new EventEmitter<PhraseChange>();

  constructor() { }


  ngOnInit() {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(DEFAULT_DEBOUNCE),
        filter((value: string) => value !== undefined),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((v: string) => this.phraseChange.emit({ phrase: v }));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
