import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthorApi } from 'src/app/modules/api/authors/authors/author.api';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { booksStateReducer } from '../../../store';

import { SearchAuthorsComponent } from './search-authors.component';

describe('SearchAuthorsComponent', () => {
  let component: SearchAuthorsComponent;
  let fixture: ComponentFixture<SearchAuthorsComponent>;
  let form: FormGroup;
  let author: Author;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('books', booksStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([]),
        RouterModule.forRoot([])
      ],
      providers: [AuthorApi],
      declarations: [SearchAuthorsComponent]
    })
      .compileComponents();

    form = new FormGroup({
      authors: new FormControl(undefined, [Validators.required])
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAuthorsComponent);
    component = fixture.componentInstance;
    component.form = form;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('searchChange', () => {
    it('should emit search event if input is not empty', fakeAsync(() => {

      let emitSpy = spyOn(component.search, 'emit');

      let searchInputDebugElement = fixture.debugElement.query(By.css('.search-authors__input'));
      let searchInput: HTMLInputElement = searchInputDebugElement.nativeElement;

      searchInput.value = 'searchValue';

      fixture.detectChanges();

      searchInputDebugElement.triggerEventHandler('nzOnSearch', searchInput.value);

      tick(2500);

      expect(emitSpy).toHaveBeenCalled();

    }));

    it('should not emit search event if input is empty', fakeAsync(() => {

      let emitSpy = spyOn(component.search, 'emit');

      let searchInputDebugElement = fixture.debugElement.query(By.css('.search-authors__input'));
      let searchInput: HTMLInputElement = searchInputDebugElement.nativeElement;

      searchInput.value = '';

      searchInputDebugElement.triggerEventHandler('nzOnSearch', searchInput.value);

      tick(2500);

      expect(emitSpy).not.toHaveBeenCalled();
    }));

    it('should not emit search event if input is undefined', fakeAsync(() => {
      let emitSpy = spyOn(component.search, 'emit');

      let searchInputDebugElement = fixture.debugElement.query(By.css('.search-authors__input'));
      let searchInput: HTMLInputElement = searchInputDebugElement.nativeElement;

      searchInput.value = undefined;

      searchInputDebugElement.triggerEventHandler('nzOnSearch', searchInput.value);

      tick(2500);

      expect(emitSpy).not.toHaveBeenCalled();
    }));
  });
});
