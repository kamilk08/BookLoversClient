import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { EditShelfFacade } from '../../../bookcase-preview/edit-shelf/store/edit-shelf.facade';
import { RemoveShelfFacade } from '../../../bookcase-preview/remove-shelf/store/remove-shelf.facade';
import { BookcasePreviewFacade } from '../../../bookcase-preview/store/bookcase-preview.facade';
import { BookcaseSetttingsPageFacade } from '../../store/page/bookcase-settings-page.facade';

import { CustomShelfComponent } from './custom-shelf.component';

describe('CustomShelfComponent', () => {
  let component: CustomShelfComponent;
  let fixture: ComponentFixture<CustomShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([]),
        BrowserAnimationsModule
      ],
      declarations: [CustomShelfComponent],
      providers: [RemoveShelfFacade, EditShelfFacade,
        BookcasePreviewFacade, BookcaseSetttingsPageFacade]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
