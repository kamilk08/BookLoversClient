import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { FollowersPaginationComponent } from './followers-pagination.component';

describe('FollowersPaginationComponent', () => {
  let component: FollowersPaginationComponent;
  let fixture: ComponentFixture<FollowersPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [FollowersPaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowersPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('triggering nzPageIndexChange should emit new PageChangeEvent', () => {

    let spy = spyOn(component.changePage, 'emit');

    const paginationComponent = fixture.debugElement.query(By.css('.followers-pagination__paginator'));

    const pageNumber = 0;

    paginationComponent.triggerEventHandler('nzPageIndexChange', pageNumber);

    expect(spy).toHaveBeenCalled();

  });
});
