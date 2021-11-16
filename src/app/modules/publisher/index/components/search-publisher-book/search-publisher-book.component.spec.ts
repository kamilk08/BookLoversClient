import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { SearchPublisherBookComponent } from './search-publisher-book.component';


describe('SearchPublisherBook', () => {
  let component: SearchPublisherBookComponent;
  let fixture: ComponentFixture<SearchPublisherBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [SearchPublisherBookComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPublisherBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("EXPAND", () => {
    it('when expanded property is set to false then expand icon should have close css class', () => {

      component.expand();

      fixture.detectChanges();

      const iconDebugElement: HTMLElement = fixture.debugElement.query(By.css('.search__icon')).nativeElement;

      const flag = iconDebugElement.classList.contains('close');

      expect(flag).toBeTruthy();
    });

    it('when expanded property is set to true then expand icon should have open css class', () => {

      fixture.detectChanges();

      const iconDebugElement: HTMLElement = fixture.debugElement.query(By.css('.search__icon')).nativeElement;

      const flag = iconDebugElement.classList.contains('open');

      expect(flag).toBeTruthy();

    });
  });

  describe('SEARCH_INPUT', () => {
    it('changing value in search input should emit PhraseChange event', fakeAsync(() => {

      let spy = spyOn(component.phraseChange, 'emit');

      const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('.search__input')).nativeElement;

      inputElement.value = 'foo';
      fixture.detectChanges();

      inputElement.dispatchEvent(new Event('input'));

      tick(1500);

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();

    }));
  })
});
