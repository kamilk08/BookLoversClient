import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { Subject } from 'rxjs';
import { Bookcase, Shelf } from 'src/app/modules/bookcases/models';
import { BookcasePreviewFacade } from '../../../bookcase-preview/store/bookcase-preview.facade';
import { BookcaseSetttingsPageFacade } from '../../store/page/bookcase-settings-page.facade';


@Component({
  selector: 'custom-shelf',
  templateUrl: './custom-shelf.component.html',
  styleUrls: ['./custom-shelf.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ModalService]
})
export class CustomShelfComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  @Input() shelf: Shelf;

  @Output() removeShelf: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public readonly pageFacade: BookcaseSetttingsPageFacade
    ) { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  edit() {
    this.pageFacade.openEditShelfModal(this.shelf);
  }

  remove() {
    this.pageFacade.openRemoveShelfModal(this.shelf);
    this.removeShelf.emit();
  }


}
