import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { of } from 'rxjs';
import { BookAdapter } from 'src/app/modules/api/books/book.adapter';
import { Publisher } from 'src/app/modules/api/publishers/models/publisher.model';
import { PublisherAdapter } from 'src/app/modules/api/publishers/publisher.adapter';
import { PublisherApi } from 'src/app/modules/api/publishers/publisher.api';
import { PublisherFacade } from 'src/app/modules/publisher/store/publishers/publisher.facade';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AddPublisherModalComponent } from './add-publisher-modal.component';
import { AddPublisherService } from './services/add-publisher.service';

describe('AddPublisherModalComponent', () => {
  let component: AddPublisherModalComponent;
  let fixture: ComponentFixture<AddPublisherModalComponent>;

  let api: PublisherApi;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [AddPublisherModalComponent],
      providers: [
        {
          provide: NzModalRef,
          useFactory: (modalService: NzModalService) => modalService.create({
            nzClosable: false,
            nzContent: AddPublisherModalComponent
          }),
          deps: [NzModalService]
        },
        AddPublisherService,
        PublisherApi,
        PublisherAdapter,
        BookAdapter,
        PublisherFacade

      ]
    })
      .compileComponents();

    api = TestBed.get(PublisherApi);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPublisherModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit form', () => {
    it('should invoke addPublisher method from facade object when form is valid', fakeAsync(() => {

      spyOn(api, 'getPublisherByName').and.returnValue(of(undefined));

      let spy = spyOn(component.facade, 'addPublisher');

      component.pageService.addPublisherForm.get('name').setValue('publisher');
      component.pageService.addPublisherForm.updateValueAndValidity();

      tick(2000);

      component.submit();

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      flush();
      discardPeriodicTasks();
    }));

    it('should update formValidity and show error when form is invalid', () => {

      component.submit();

      fixture.detectChanges();

      const errors = fixture.debugElement.queryAll(By.css('.add-publisher__form-error'));
      const errorElem: HTMLElement = errors[0].nativeElement;

      expect(errorElem.textContent).toBe('Publisher name is required');
      expect(errors.length).toBe(1);
    });

    it('should update formValidity and show error when publisher already does exist', fakeAsync(() => {

      let publisher = new Publisher('publisher');
      publisher.setPublisherId(1);

      spyOn(api, 'getPublisherByName').and.returnValue(of(publisher));

      component.pageService.addPublisherForm.get('name').setValue('publisher');

      component.submit();

      tick(2500);

      fixture.detectChanges();

      const errorElem = fixture.debugElement.query(By.css('.add-publisher__form-error'));
      const error: HTMLElement = errorElem.nativeElement;

      expect(error.textContent).toBe('Publisher name is not unique');
    }))
  });

});
