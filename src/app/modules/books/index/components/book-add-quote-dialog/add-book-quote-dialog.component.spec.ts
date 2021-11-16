import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CookiesService } from 'src/app/modules/auth/services/cookies.service';
import { TokenService } from 'src/app/modules/auth/services/token.service';
import { QuoteService } from 'src/app/modules/quotes/quote.service';
import { QuotesFacade } from 'src/app/modules/quotes/store/quotes/quote.facade';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AddBookQuoteDialogComponent } from './add-book-quote-dialog.component';

describe('AddBookQuoteDialogComponent', () => {
  let component: AddBookQuoteDialogComponent;
  let fixture: ComponentFixture<AddBookQuoteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        FormsModule, ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      declarations: [AddBookQuoteDialogComponent],
      providers: [AuthService,
        {
          provide: NzModalRef,
          useFactory: (modalSvc: NzModalService) => modalSvc.create({
            nzClosable: false,
            nzContent: AddBookQuoteDialogComponent
          }),
          deps: [NzModalService]
        },
        TokenService, CookiesService,
        QuotesFacade, QuoteService,
        TokenService, CookiesService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookQuoteDialogComponent);
    component = fixture.componentInstance;
    component.pageService.quoteForm.reset();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
