import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MomentModule } from 'ngx-moment';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { TicketsPaginationComponent } from './tickets-pagination.component';

describe('TicketsPaginationComponent', () => {
  let component: TicketsPaginationComponent;
  let fixture: ComponentFixture<TicketsPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, MomentModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [TicketsPaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('TO_NEXT_PAGE', () => {
    it('invoking toNextPage method should trigger pageChangeEvent event', () => {

      let spy = spyOn(component.pageChange, 'emit');

      const pageNumber = 1;

      const paginationDebugElement = fixture.debugElement.query(By.css('.tickets-pagination__paginator'));

      paginationDebugElement.triggerEventHandler('nzPageIndexChange', pageNumber);

      expect(spy).toHaveBeenCalled();
    });
  })
});
