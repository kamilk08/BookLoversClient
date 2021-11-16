import { EventEmitter, Output } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { DEFAULT_DEBOUNCE } from 'src/app/modules/shared/common/constants';
import { minLength, noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { SearchEvent } from 'src/app/modules/shared/common/search.event';

@Component({
  selector: 'search-followers',
  templateUrl: './search-followers.component.html',
  styleUrls: ['./search-followers.component.scss']
})
export class SearchFollowersComponent implements OnInit, OnDestroy {

  private _expanded: boolean = true;
  get expanded() {
    return this._expanded;
  }

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  public searchInput: FormControl = new FormControl()

  @Output() searchPhrase: EventEmitter<SearchEvent> = new EventEmitter<SearchEvent>();

  constructor() { }

  ngOnInit() {
    this.searchInput.valueChanges
      .pipe(
        filter(noNullOrUndefined()),
        debounceTime(DEFAULT_DEBOUNCE),
        takeUntil(this.unsubscribe$)
      ).subscribe(phrase => this.searchPhrase.emit({ phrase }))
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  expand() {
    this._expanded = !this._expanded;
  }
}
