import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { SearchPublisherComponent } from './search-publisher.component';

describe('SearchPublisherComponent', () => {
  let component: SearchPublisherComponent;
  let fixture: ComponentFixture<SearchPublisherComponent>;
  let form: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [SearchPublisherComponent],
      providers: []
    })
      .compileComponents();

    form = new FormGroup({
      publisher: new FormControl(undefined, [Validators.required])
    });

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPublisherComponent);
    component = fixture.componentInstance;
    component.form = form;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSearch', () => {
    it('should emit search event if input is not empty', fakeAsync(() => {

      let emitSpy = spyOn(component.search, 'emit');

      let searchInputDebugElement = fixture.debugElement.query(By.css('.search-publisher__input'));
      let searchInput: HTMLInputElement = searchInputDebugElement.nativeElement;

      searchInput.value = 'searchValue';

      fixture.detectChanges();

      searchInputDebugElement.triggerEventHandler('nzOnSearch', searchInput.value);

      tick(2500);

      expect(emitSpy).toHaveBeenCalled();

    }));

    it('should not emit search event if input is empty', fakeAsync(() => {

      let emitSpy = spyOn(component.search, 'emit');

      let searchInputDebugElement = fixture.debugElement.query(By.css('.search-publisher__input'));
      let searchInput: HTMLInputElement = searchInputDebugElement.nativeElement;

      searchInput.value = '';

      searchInputDebugElement.triggerEventHandler('nzOnSearch', searchInput.value);

      tick(2500);

      expect(emitSpy).not.toHaveBeenCalled();
    }));

    it('should not emit search event if input is undefined', fakeAsync(() => {
      let emitSpy = spyOn(component.search, 'emit');

      let searchInputDebugElement = fixture.debugElement.query(By.css('.search-publisher__input'));
      let searchInput: HTMLInputElement = searchInputDebugElement.nativeElement;

      searchInput.value = undefined;

      searchInputDebugElement.triggerEventHandler('nzOnSearch', searchInput.value);

      tick(2500);

      expect(emitSpy).not.toHaveBeenCalled();
    }));
  })

});
