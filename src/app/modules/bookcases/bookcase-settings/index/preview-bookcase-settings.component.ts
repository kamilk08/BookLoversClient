import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Bookcase, Shelf } from '../../models';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { BookcasePreviewFacade } from '../../bookcase-preview/store/bookcase-preview.facade';
import { BookcaseSetttingsPageFacade } from '../store/page/bookcase-settings-page.facade';
import { BookcaseSettingsFacade } from '../store/settings/bookcase-settings.facade';
import { PRIVACY_OPTIONS } from 'src/app/modules/shared/models/privacy';
import { SHELF_CAPACITY_OPTIONS } from '../models/shelf-capacity-option';

@Component({
  selector: 'app-preview-bookcase-settings',
  templateUrl: './preview-bookcase-settings.component.html',
  styleUrls: ['./preview-bookcase-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewBookcaseSettingsComponent implements OnInit, OnDestroy {

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  public readonly privacyOptions = PRIVACY_OPTIONS;
  public readonly capacityOptions = SHELF_CAPACITY_OPTIONS;

  constructor(
    public readonly previewFacade: BookcasePreviewFacade,
    public readonly pageFacade: BookcaseSetttingsPageFacade,
    public readonly settingsFacade: BookcaseSettingsFacade,
    public readonly modalRef: NzModalRef) {
  }

  ngOnInit() {
    this.previewFacade.loggedInUserBookcase$
      .pipe(
        filter(noNullOrUndefined()),
        switchMap((bookcase: Bookcase) => this.settingsFacade.bookcaseSettings$(bookcase.identification.id)),
        tap(settigs => this.pageFacade.updateSettingsForm(settigs)),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addShelf() {
    this.pageFacade.openNewShelfModal();
  }

  close() {
    this.modalRef.destroy();
  }

  submit(form: FormGroup) {
    this.pageFacade.submitSettingsForm(form);
    this.modalRef.destroy();
  }

  public readonly coreShelvesCount$: Observable<number> = this.previewFacade.loggedInUserBookcase$
    .pipe(
      filter(noNullOrUndefined()),
      map((b: Bookcase) => b.getCoreShelfs()),
      map(s => s.length)
    );

  public readonly customShelves$: Observable<Shelf[]> = this.previewFacade.loggedInUserBookcase$
    .pipe(
      filter(noNullOrUndefined()),
      map((s: Bookcase) => s.getCustomShelves())
    );

  public readonly customShelvesCount$: Observable<number> = this.customShelves$
    .pipe(
      filter(noNullOrUndefined()),
      map((s: Shelf[]) => s.length))

}
