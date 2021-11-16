import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { of } from 'rxjs';
import { BookAdapter } from 'src/app/modules/api/books/book.adapter';
import { Series } from 'src/app/modules/api/series/models/series.model';
import { SeriesAdapter } from 'src/app/modules/api/series/series.adapter';
import { SeriesApi } from 'src/app/modules/api/series/series.api';
import { SeriesFacade } from 'src/app/modules/series/store/series/series.facade';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AddSeriesModalComponent } from './add-series-modal.component';
import { AddSeriesService } from './services/add-series.service';

describe('AddSeriesModalComponent', () => {
  let component: AddSeriesModalComponent;
  let fixture: ComponentFixture<AddSeriesModalComponent>;
  let api: SeriesApi;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      providers: [
        {
          provide: NzModalRef,
          useFactory: (modalService: NzModalService) => modalService.create({
            nzClosable: false,
            nzContent: AddSeriesModalComponent
          }),
          deps: [NzModalService]
        },
        AddSeriesService,
        SeriesApi,
        SeriesAdapter,
        BookAdapter,
        SeriesFacade
      ],
      declarations: [AddSeriesModalComponent]
    })
    .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [AddSeriesModalComponent] } })
      .compileComponents();

    api = TestBed.get(SeriesApi);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSeriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit form', () => {
    it('should invoke addSeries method from facade object when form is valid', fakeAsync(() => {

      spyOn(api, 'getSeriesByName').and.returnValue(of(undefined));

      let spy = spyOn(component.facade, 'addSeries');

      component.pageService.addSeriesForm.get('name').setValue('series');
      component.pageService.addSeriesForm.updateValueAndValidity();

      tick(2000);

      component.submit();

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      flush();
      discardPeriodicTasks();
    }));

    it('should update form validity and show error when form is invalid', () => {

      component.submit();

      fixture.detectChanges();

      let errors = fixture.debugElement.queryAll(By.css('.add-series__form-error'));

      expect(errors.length).toBe(1);
    });

    it('should update form validity and show error when publisher name is already taken', fakeAsync(() => {

      let series = new Series('series');
      series.setSeriesId(1);

      spyOn(api, 'getSeriesByName').and.returnValue(of(series));

      component.pageService.addSeriesForm.get('name').setValue('series');

      component.submit();

      tick(2500);

      fixture.detectChanges();

      const errorDebugElement = fixture.debugElement.query(By.css('.add-series__form-error'));
      const error:HTMLElement = errorDebugElement.nativeElement;

      expect(error.textContent).toBe('Series name is not unique');
    }));
  })
});
