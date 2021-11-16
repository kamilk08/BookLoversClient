import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzPaginationComponent } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { PublisherBooksPaginationComponent } from './publisher-books-pagination.component';

describe('PublisherBooksPaginationComponent', () => {
  let component: PublisherBooksPaginationComponent;
  let fixture: ComponentFixture<PublisherBooksPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])],
      declarations: [PublisherBooksPaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherBooksPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changing page index should emit PageChangeEvent', () => {

    let spy = spyOn(component.pageChange, 'emit');

    const pageNumber = 1;

    const debugElement = fixture.debugElement.query(By.directive(NzPaginationComponent));

    debugElement.triggerEventHandler('nzPageIndexChange', pageNumber);

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  })
});
