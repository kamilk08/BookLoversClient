import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { NzModalRef } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { StatisticsFacade } from 'src/app/modules/classification/statistics/store/statistics.facade';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { FavouriteAuthor } from '../../../../../api/profiles/favourites/models/favourite-author.model';
import { FavouritesFacade } from '../../../favourites/store/favourites.facade';
import { ProfileWebPageFacade } from '../../../store/profile-page/profile-web-page.facade';
import { AuthorFacade } from 'src/app/modules/authors/store/authors/author.facade';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-add-favourite-author-modal',
  templateUrl: './add-favourite-author-modal.component.html',
  styleUrls: ['./add-favourite-author-modal.component.scss']
})
export class AddFavouriteAuthorModalComponent implements OnInit, OnDestroy {

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  public readonly searchAuthorControl: FormControl = new FormControl();

  constructor(
    private modalRef: NzModalRef,
    public readonly authService: AuthService,
    public readonly pageFacade: ProfileWebPageFacade,
    public readonly authorsFacade: AuthorFacade,
    public readonly statisticsFacade: StatisticsFacade,
    public readonly favoutiesFacade: FavouritesFacade) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.authorsFacade.clearSearchResults();
  }

  ngOnInit() {
    this.authorsFacade.filteredAuthors$
      .pipe(
        filter(noNullOrUndefined()),
        tap((authors: Author[]) => authors.forEach(author => this.statisticsFacade.selectAuthorStatistics(author.identification.id))),
        takeUntil(this.unsubscribe$))
      .subscribe();
  }

  onChange(event: any) {
    this.pageFacade.findFavouriteAuthor(this.searchAuthorControl.value);
  }

  addFavourite(authorGuid: UUID) {
    this.pageFacade.addProfileAuthor(authorGuid);
    this.modalRef.destroy();
  }

  removeFavourite(authorGuid: UUID) {
    this.pageFacade.removeProfileAuthor(authorGuid);
    this.modalRef.destroy();
  }

  close() {
    this.modalRef.destroy();
  }

  public readonly hasFavouriteAuthor$ = (readerId: number, authorGuid: UUID) => this.favoutiesFacade.favouriteAuthors$(readerId)
    .pipe(
      filter(noNullOrUndefined()),
      map((s: FavouriteAuthor[]) => s.find(f => f.authorGuid === authorGuid))
    );
}
