import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ErrorsFacade } from 'src/app/modules/errors/store/errors.facade';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MesssagesFacade } from 'src/app/modules/shared/store/messages/message.facade';
import { AddShelfModule } from '../add-shelf.module';

import { AddCustomShelfComponent } from './add-custom-shelf.component';
import { AddCustomShelfService } from './services/add-custom-shelf.service';

describe('AddCustomShelfComponent', () => {
  let component: AddCustomShelfComponent;
  let fixture: ComponentFixture<AddCustomShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        BrowserAnimationsModule,
        AddShelfModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([]),
        HttpClientModule
      ],
      providers: [
        {
          provide: NzModalRef,
          useFactory: (modalService: NzModalService) => modalService.create({
            nzClosable: false,
            nzContent: AddCustomShelfComponent
          }),
          deps: [NzModalService]
        },
        AddCustomShelfService,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ],
      declarations: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ADD_CUSTOM_SHELF_FORM', () => {
    it('should display error when there is no shelf name', () => {

      component.submit();

      fixture.detectChanges();

      const errorBox = fixture.debugElement.query(By.css('.add-custom-shelf__error'));

      expect(errorBox).not.toBeNull();
    });

    it('should display error when shelf name is not long enough', () => {

      const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      input.value = 'ab';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      component.submit();

      fixture.detectChanges();

      const errorBox = fixture.debugElement.query(By.css('.add-custom-shelf__error'));

      expect(errorBox).not.toBeNull();

    });

    it('modal should be closed when submited form is valid', () => {

      let spy = spyOn(component.modalRef, 'close');

      const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      input.value = 'abcccc';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      component.submit();

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    })
  });
});
