import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AuthorSeriesPaginationComponent } from './author-series-pagination.component';

describe('AuthorSeriesPaginationComponent', () => {
  let component: AuthorSeriesPaginationComponent;
  let fixture: ComponentFixture<AuthorSeriesPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[SharedModule,
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),

      ],
      declarations: [ AuthorSeriesPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorSeriesPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
