import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzPaginationComponent } from 'ng-zorro-antd';
import { PublisherBooksPaginationComponent } from 'src/app/modules/publisher/index/components/publisher-books-pagination/publisher-books-pagination.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';


describe('SeriesBooksPaginationComponent', () => {
  let component: PublisherBooksPaginationComponent;
  let fixture: ComponentFixture<PublisherBooksPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
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

  describe('TO_NEXT_PAGE', () => {
    it('invoking method toNextPage should emit pageChangeEvent', () => {

      const pageNumber = 1;

      let spy = spyOn(component.pageChange, 'emit');

      const paginationDebugComponent = fixture.debugElement.query(By.directive(NzPaginationComponent));

      paginationDebugComponent.triggerEventHandler('nzPageIndexChange', pageNumber);

      expect(spy).toHaveBeenCalled();
    });
  })
});
