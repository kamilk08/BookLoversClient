import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TimeLineItemsPaginationComponent } from './timeline-items-pagination.component';


describe('TimeLineItemsPaginationComponent', () => {
  let component: TimeLineItemsPaginationComponent;
  let fixture: ComponentFixture<TimeLineItemsPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [TimeLineItemsPaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineItemsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('triggering nzPageIndexChange event should emit new PageChangeEvent', () => {

    const spy = spyOn(component.pageChange, 'emit');

    const paginationComponent = fixture.debugElement.query(By.css('.timeline-pagination__paginator'));

    const page = 1;

    paginationComponent.triggerEventHandler('nzPageIndexChange', page);

    expect(spy).toHaveBeenCalled();
  });
});
