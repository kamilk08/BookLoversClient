import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ErrorsFacade } from 'src/app/modules/errors/store/errors.facade';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MesssagesFacade } from 'src/app/modules/shared/store/messages/message.facade';
import { ChangeShelfModule } from '../change-shelf.module';

import { ChangeShelfComponent } from './change-shelf.component';

describe('ChangeShelfComponent', () => {
  let component: ChangeShelfComponent;
  let fixture: ComponentFixture<ChangeShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        ChangeShelfModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([]),
        HttpClientModule
      ],
      declarations: [],
      providers: [
        {
          provide: NzModalRef,
          useFactory: (modalService: NzModalService) => modalService.create({
            nzClosable: false,
            nzContent: ChangeShelfComponent
          }),
          deps: [NzModalService]
        },
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('SUBMIT', () => {
    it('should close modal', () => {

      let spy = spyOn(component.modal, 'close');

      component.submit();

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });
  });

});
