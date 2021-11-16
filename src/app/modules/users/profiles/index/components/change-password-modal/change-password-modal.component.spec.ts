import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { SignUpApi } from 'src/app/modules/api/auth/sign-up/sign-up.api';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ProfileWebPageFacade } from '../../../store/profile-page/profile-web-page.facade';
import { ChangePasswordModalComponent } from './change-password-modal.component';

describe('ChangePasswordModalComponent', () => {
  let component: ChangePasswordModalComponent;
  let fixture: ComponentFixture<ChangePasswordModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [ChangePasswordModalComponent],
      providers: [ProfileWebPageFacade, SignUpApi,
        {
          provide: NzModalRef,
          useFactory: (modalService: NzModalService) => modalService.create({
            nzClosable: false,
            nzContent: ChangePasswordModalComponent
          }),
          deps: [NzModalService]
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
