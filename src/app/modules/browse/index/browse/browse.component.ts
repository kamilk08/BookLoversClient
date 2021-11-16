import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { SubCategory } from 'src/app/modules/api/books/models/sub-category.model';
import { RatingsOverviewFacade } from 'src/app/modules/classification/ratings-overview/store/ratings-overview.facade';
import { noEmptyArray, noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';
import { BrowseCriteria } from '../../../api/browse/models/browse-criteria.model';
import { BrowseFacade } from '../../store/browse.facade';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(public readonly overviewsFacade: RatingsOverviewFacade,
    public readonly browseFacade: BrowseFacade) { }

  ngOnInit() {

    this.browseFacade.browseBooks(BrowseCriteria.defaultCriteria())

    this.browseFacade.items$
      .pipe(
        filter(noNullOrUndefined()),
        filter(noEmptyArray()),
        map(books => books.map(s => s.id)),
        tap(ids => this.overviewsFacade.selectMultipleOverviews(ids)),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSearch() {
    this.browseFacade.search();
  }

  onChangePage(event: PageChangeEvent) {
    this.browseFacade.changePage(event.currentPage - 1);
  }

  onCategorySelect(subCategory: SubCategory, localIndex: number) {
    this.browseFacade.selectCategory(subCategory, localIndex);
  }
}
