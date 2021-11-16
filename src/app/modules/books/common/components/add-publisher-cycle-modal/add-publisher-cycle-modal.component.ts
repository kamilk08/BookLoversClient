import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { debounceTime, takeUntil, filter } from 'rxjs/operators';
import { AddPublisherCycleService } from './services/add-publisher-cycle.service';
import { SEARCH_QUERY } from 'src/app/modules/shared/common/query';
import { Subject } from 'rxjs';
import { noNullOrUndefined, noEmptyStrings } from 'src/app/modules/shared/common/operator-extensions';
import { PublisherFacade } from 'src/app/modules/publisher/store/publishers/publisher.facade';
import { PublisherCycleFacade } from 'src/app/modules/publisher-cycle/store/publisher-cycles/publisher-cycle.facade';
import { DEFAULT_DEBOUNCE } from 'src/app/modules/shared/common/constants';


@Component({
  selector: 'app-add-publisher-cycle-modal',
  templateUrl: './add-publisher-cycle-modal.component.html',
  styleUrls: ['./add-publisher-cycle-modal.component.scss']
})
export class AddPublisherCycleModalComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly modalRef: NzModalRef,
    public readonly publisherFacade: PublisherFacade,
    public readonly publisherCycleFacade: PublisherCycleFacade,
    public readonly pageService: AddPublisherCycleService) { }

  ngOnInit() {
    this.pageService.searchChanges$.asObservable()
      .pipe(
        debounceTime(DEFAULT_DEBOUNCE),
        filter(noNullOrUndefined()),
        filter(noEmptyStrings()),
        takeUntil(this.unsubscribe$)
      ).subscribe(val => this.publisherFacade.findPublisher(SEARCH_QUERY(val)))
  }

  ngOnDestroy(): void {
    this.pageService.addPublisherCycleForm.reset();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  close() {
    this.modalRef.destroy();
  }

  submit() {
    if (this.pageService.addPublisherCycleForm.valid) {
      this.publisherCycleFacade.addPublisherCycle(this.pageService.cycleName.value, this.pageService.publisher.value);
      this.modalRef.destroy();
    }
    else
      this.pageService.updateFormValidity(this.pageService.addPublisherCycleForm);
  }

  onSearch(value: string) {
    this.pageService.searchChanges$.next(value);
  }
}
