import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { SearchEvent } from 'src/app/modules/shared/common/search.event';


@Component({
  selector: 'search-publisher-book',
  templateUrl: './search-publisher-book.component.html',
  styleUrls: ['./search-publisher-book.component.scss']
})
export class SearchPublisherBookComponent implements OnInit {

  private _expanded: boolean = true;

  get expanded() {
    return this._expanded;
  }

  private unsubscribe$: Subject<void> = new Subject<void>();

  public readonly searchInput: FormControl = new FormControl();
  @Output() phraseChange: EventEmitter<SearchEvent> = new EventEmitter<SearchEvent>();

  constructor() {

  }

  ngOnInit() {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(1500),
        takeUntil(this.unsubscribe$)
      ).subscribe((value: string) => this.phraseChange.emit({ phrase: value }))
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  expand() {
    this._expanded = !this._expanded;
  }
}
