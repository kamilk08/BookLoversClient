import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { EditShelfFacade } from '../store/edit-shelf.facade';

import { EditShelfComponent } from './edit-shelf.component';
import { EditShelfsNameService } from './services/edit-shelfs-name.service';

describe('EditShelfComponent', () => {
  let component: EditShelfComponent;
  let fixture: ComponentFixture<EditShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([]),
        FormsModule, ReactiveFormsModule],
      declarations: [EditShelfComponent],
      providers: [EditShelfsNameService, EditShelfFacade,
        {
          provide: NzModalRef,
          useFactory: (modalService: NzModalService) => modalService.create({
            nzClosable: false,
            nzContent: EditShelfComponent
          }),
          deps: [NzModalService]
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('EDIT_SHELF_FORM', () => {
    it('should display error when there is no shelf name', () => {

      component.submit();

      fixture.detectChanges();

      const errorBox = fixture.debugElement.query(By.css('.edit-shelf__error'));

      expect(errorBox).not.toBeNull();
    });

    it('should display error when shelf name is not long enough', () => {

      const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      input.value = 'ab';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      component.submit();

      fixture.detectChanges();

      const errorBox = fixture.debugElement.query(By.css('.edit-shelf__error'));

      expect(errorBox).not.toBeNull();

    });

    it('modal should be closed when submited form is valid', () => {

      let spy = spyOn(component.modal, 'close');

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
