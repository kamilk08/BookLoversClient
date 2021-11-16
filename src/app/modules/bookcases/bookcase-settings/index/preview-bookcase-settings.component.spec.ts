import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AddShelfFacade } from '../../bookcase-preview/add-shelf/store/add-custom-shelf.facade';
import { BookcasePreviewFacade } from '../../bookcase-preview/store/bookcase-preview.facade';
import { bookcaseSettingsModuleReducer } from '../store';
import { BookcaseSetttingsPageFacade } from '../store/page/bookcase-settings-page.facade';
import { BookcaseSettingsFacade } from '../store/settings/bookcase-settings.facade';
import { CustomShelfComponent } from './components/custom-shelf.component';

import { PreviewBookcaseSettingsComponent } from './preview-bookcase-settings.component';

describe('PreviewBookcaseSettingsComponent', () => {
  let component: PreviewBookcaseSettingsComponent;
  let fixture: ComponentFixture<PreviewBookcaseSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('bookcase-settings', bookcaseSettingsModuleReducer),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([]),
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: NzModalRef,
          useFactory: (modalService: NzModalService) => modalService.create({
            nzClosable: false,
            nzContent: PreviewBookcaseSettingsComponent
          }),
          deps: [NzModalService]
        },
        BookcasePreviewFacade,
        BookcaseSettingsFacade,
        BookcaseSetttingsPageFacade,
        AddShelfFacade,
        ModalService
      ],
      declarations: [PreviewBookcaseSettingsComponent, CustomShelfComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewBookcaseSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ADD_SHELF', () => {
    it('openNewShelfModal method from pageFacade should be invoked', () => {

      let spy = spyOn(component.pageFacade, 'openNewShelfModal');

      const addShelfButton: HTMLElement = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;

      addShelfButton.click();

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });
  });
});
