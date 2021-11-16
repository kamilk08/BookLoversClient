import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthorQuotesPaginationComponent } from 'src/app/modules/authors/index/components/author-quotes-pagination/author-quotes-pagination.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { QuotesPaginationComponent } from './quotes-pagination.component';


describe('QuotesPaginationComponent', () => {
  let component: AuthorQuotesPaginationComponent;
  let fixture: ComponentFixture<AuthorQuotesPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      RouterModule.forRoot([]),
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [QuotesPaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
