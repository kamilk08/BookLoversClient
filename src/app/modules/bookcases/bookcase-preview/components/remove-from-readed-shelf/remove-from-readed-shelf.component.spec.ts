import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CookiesService } from 'src/app/modules/auth/services/cookies.service';
import { TokenService } from 'src/app/modules/auth/services/token.service';
import { AuthorFacade } from 'src/app/modules/authors/store/authors/author.facade';
import { BookFacade } from 'src/app/modules/books/store/book.facade';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReviewsFacade } from 'src/app/modules/users/reviews/store/reviews/reviews.facade';

import { RemoveFromReadedShelfComponent } from './remove-from-readed-shelf.component';

describe('RemoveFromReadedShelfComponent', () => {
  let component: RemoveFromReadedShelfComponent;
  let fixture: ComponentFixture<RemoveFromReadedShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [RemoveFromReadedShelfComponent],
      providers: [
        TokenService,
        CookiesService,
        ReviewsFacade,
        BookFacade,
        AuthService,
        AuthorFacade,
        {
          provide: NzModalRef,
          useFactory: (modalSvc: NzModalService) => modalSvc.create({
            nzClosable: false,
            nzContent: RemoveFromReadedShelfComponent
          }),
          deps: [NzModalService]
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveFromReadedShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
