import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CookiesService } from 'src/app/modules/auth/services/cookies.service';
import { TokenService } from 'src/app/modules/auth/services/token.service';
import { QuoteService } from 'src/app/modules/quotes/quote.service';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AddAuthorQuoteComponent } from './add-author-quote.component';

describe('AddAuthorQuoteComponent', () => {
  let component: AddAuthorQuoteComponent;
  let fixture: ComponentFixture<AddAuthorQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [AddAuthorQuoteComponent],
      providers: [
        {
          provide: NzModalRef,
          useFactory: (modalSvc: NzModalService) => modalSvc.create({
            nzClosable: false,
            nzContent: AddAuthorQuoteComponent
          }),
          deps: [NzModalService]
        },
        QuoteService,
        AuthService,
        TokenService,
        CookiesService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAuthorQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
