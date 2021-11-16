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
import { BookcaseFacade } from 'src/app/modules/bookcases/store/bookcases/bookcase.facade';
import { BookFacade } from 'src/app/modules/books/store/book.facade';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FollowersFacade } from 'src/app/modules/users/reader-followers/followers.facade';
import { ReadersFacade } from 'src/app/modules/users/readers/store/readers/reader.facade';
import { ReaderStatisticsFacade } from 'src/app/modules/users/statistics/store/reader-statistics.facade';
import { TimeLineFacade } from 'src/app/modules/users/timelines/store/timeline.facade';
import { FavouritesFacade } from '../../../favourites/store/favourites.facade';
import { profilesStateReducer } from '../../../store';
import { ProfileWebPageEffects } from '../../../store/profile-page/profile-web-page.effects';
import { ProfileWebPageFacade } from '../../../store/profile-page/profile-web-page.facade';
import { ProfileFacade } from '../../../store/profile/profile.facade';
import { ChangeEmailModalComponent } from './change-email-modal.component';

describe('ChangeEmailModalComponent', () => {
  let component: ChangeEmailModalComponent;
  let fixture: ComponentFixture<ChangeEmailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('profiles', profilesStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ProfileWebPageEffects]),
        RouterModule.forRoot([]),
        HttpClientModule
      ],
      declarations: [ChangeEmailModalComponent],
      providers: [ProfileWebPageFacade, SignUpApi,
        {
          provide: NzModalRef,
          useFactory: (modalService: NzModalService) => modalService.create({
            nzClosable: false,
            nzContent: ChangeEmailModalComponent
          }),
          deps: [NzModalService]
        },
        ProfileWebPageEffects,
        ReadersFacade,
        ProfileFacade,
        AuthorFacade,
        BookFacade,
        BookcaseFacade,
        ReaderStatisticsFacade,
        FollowersFacade,
        FavouritesFacade,
        TimeLineFacade,
        AuthService,
        TokenService,
        CookiesService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEmailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

