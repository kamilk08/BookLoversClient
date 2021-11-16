import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { SignUpApi } from 'src/app/modules/api/auth/sign-up/sign-up.api';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CookiesService } from 'src/app/modules/auth/services/cookies.service';
import { TokenService } from 'src/app/modules/auth/services/token.service';
import { AuthorFacade } from 'src/app/modules/authors/store/authors/author.facade';
import { BookFacade } from 'src/app/modules/books/store/book.facade';
import { RatingsOverviewFacade } from 'src/app/modules/classification/ratings-overview/store/ratings-overview.facade';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReadersFacade } from 'src/app/modules/users/readers/store/readers/reader.facade';
import { ReviewsFacade } from 'src/app/modules/users/reviews/store/reviews/reviews.facade';
import { ProfileWebPageFacade } from '../../../store/profile-page/profile-web-page.facade';
import { ProfileFacade } from '../../../store/profile/profile.facade';

import { ManageProfileModalComponent } from './manage-profile-modal.component';

describe('ManageProfileModalComponent', () => {
  let component: ManageProfileModalComponent;
  let fixture: ComponentFixture<ManageProfileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      providers: [
        ReviewsFacade,
        {
          provide: NzModalRef,
          useFactory: (modalService: NzModalService) => modalService.create({
            nzClosable: false,
            nzContent: ManageProfileModalComponent
          }),
          deps: [NzModalService]
        },
        AuthService, TokenService, CookiesService,
        ProfileFacade, ReadersFacade,
        ProfileWebPageFacade, SignUpApi,
        RatingsOverviewFacade,
        BookFacade,
        AuthorFacade
      ],
      declarations: [ManageProfileModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
