import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { SearchSeriesBookComponent } from './search-series-book.component';


describe('SearchSeriesBookComponent', () => {
  let component: SearchSeriesBookComponent;
  let fixture: ComponentFixture<SearchSeriesBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [SearchSeriesBookComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSeriesBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('EXPAND', () => {
    it('should switch to true on false expanded property', () => {

      expect(component.expanded).toBeTruthy();

      const expandDebugIcon: HTMLElement = fixture.debugElement.query(By.css('.series-books-search__icon')).nativeElement;

      expandDebugIcon.click();

      expect(component.expanded).toBeFalsy();
    });
  })

  describe('SEARCH_BOX', () => {
    it('books search box should have open css class when expanded property is set to true', () => {

      const searchBoxElement: HTMLElement = fixture.debugElement.query(By.css('.series-books-search')).nativeElement;

      const flag = searchBoxElement.classList.contains('open');

      expect(component.expanded).toBeTruthy();
      expect(flag).toBeTruthy();
    });

    it('books search box should have close css class when expanded property is set to false', () => {

      component.expand();

      fixture.detectChanges();

      const searchBoxElement: HTMLElement = fixture.debugElement.query(By.css('.series-books-search')).nativeElement;

      const flag = searchBoxElement.classList.contains('close');

      expect(component.expanded).toBeFalsy();
      expect(flag).toBeTruthy();
    });
  })
});
