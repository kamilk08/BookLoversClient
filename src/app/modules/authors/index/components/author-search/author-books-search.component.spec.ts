import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AuthorBooksSearchComponent } from './author-books-search.component';



describe('AuthorBooksSearchComponent', () => {
  let component: AuthorBooksSearchComponent;
  let fixture: ComponentFixture<AuthorBooksSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])],
      declarations: [AuthorBooksSearchComponent]
    })
      .overrideComponent(AuthorBooksSearchComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorBooksSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expanded set to true should add open css class to search box and to seach input', () => {

    component.expanded = true;
    fixture.detectChanges();

    let searchBoxDebugElement = fixture.debugElement.query(By.css('.author-books-search'));
    let searchElem: HTMLElement = searchBoxDebugElement.nativeElement;

    expect(searchElem.classList.contains('open')).toBeTruthy();

    let searchInputDebugElement = fixture.debugElement.query(By.css('.author-books-search__input'));
    let searchInputElement: HTMLElement = searchInputDebugElement.nativeElement;

    expect(searchInputElement.classList.contains('open')).toBeTruthy();

  });

  it('expanded set to false should add close css class to search box and to search input', () => {

    component.expanded = false;
    fixture.detectChanges();

    let searchBoxDebugElement = fixture.debugElement.query(By.css('.author-books-search'));
    let searchElem: HTMLElement = searchBoxDebugElement.nativeElement;

    expect(searchElem.classList.contains('close')).toBeTruthy();

    let searchInputDebugElement = fixture.debugElement.query(By.css('.author-books-search__input'));
    let searchInputElement: HTMLElement = searchInputDebugElement.nativeElement;

    expect(searchInputElement.classList.contains('close')).toBeTruthy();

  });

  it('text provided to search input should trigger SearchEvent', fakeAsync(() => {

    spyOn(component.phraseChange, 'emit');

    let htmlInput: HTMLInputElement = fixture.debugElement.query(By.css('.author-books-search__input')).nativeElement;

    htmlInput.value = 'phrase';
    htmlInput.dispatchEvent(new Event('input'));

    tick(2000);

    fixture.detectChanges();

    fixture.whenStable()
      .then(() => {
        expect(component.phraseChange.emit).toHaveBeenCalled();
      });
  }))

});
