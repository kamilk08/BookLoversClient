import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SearchEvent } from 'src/app/modules/shared/common/search.event';

@Component({
  selector: 'author-books-search',
  templateUrl: './author-books-search.component.html',
  styleUrls: ['./author-books-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorBooksSearchComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  public expanded: boolean;
  public readonly searchInput: FormControl = new FormControl();

  @Output() phraseChange: EventEmitter<SearchEvent> = new EventEmitter<SearchEvent>();

  constructor() { }

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
    this.expanded = !this.expanded;
  }
}
