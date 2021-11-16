import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, map, tap, filter, takeUntil } from 'rxjs/operators';
import { SearchEvent } from 'src/app/modules/shared/common/search.event';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { noEmptyStrings, noNullOrUndefined, removeWhiteSpaces } from 'src/app/modules/shared/common/operator-extensions';
import { DEFAULT_DEBOUNCE } from 'src/app/modules/shared/common/constants';

@Component({
  selector: 'search-authors',
  templateUrl: './search-authors.component.html',
  styleUrls: ['./search-authors.component.scss']
})
export class SearchAuthorsComponent implements OnInit, OnDestroy, OnChanges {

  private searchChanges$ = new BehaviorSubject('');
  private unsubscribe$: Subject<void> = new Subject<void>();

  @Input() form: FormGroup
  @Input() authors: Author[];
  @Input() isFiltering: boolean
  @Input() selectedAuthors: Author[];

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
    if (this.authors && this.authors.length === 0) {
      this.authors = this.selectedAuthors;
      this.form.get('authors').setValue(this.selectedAuthors);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSearchChange(value: string) {
    this.authors = undefined;
    this.searchChanges$.next(value);
  }

  compare(o1: Author, o2: Author) {
    if (o1 && o2)
      return o1.identification.id === o2.identification.id;
    else
      return o1;
  }

}
