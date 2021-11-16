import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AddBookHashtagComponent } from './add-book-hashtag.component';

describe('AddBookHashtagComponent', () => {
  let component: AddBookHashtagComponent;
  let fixture: ComponentFixture<AddBookHashtagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [AddBookHashtagComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookHashtagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show input should focused nz tag element', () => {

    component.showInput();

    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('.add-book-hashtag__input'));
    const elem: HTMLInputElement = debugElement.nativeElement;

    expect(elem).toBeTruthy();
    expect(component.inputVisible).toBeTruthy();
  });

  describe('addHashTag', () => {
    it('should add hashtag to the list and emit hashTagAdded event', () => {

      let spy = spyOn(component.hashTagAdded, 'emit');

      component.showInput();

      fixture.detectChanges();

      const inputDebugElement = fixture.debugElement.query(By.css('.add-book-hashtag__input'));
      const inputElement: HTMLInputElement = inputDebugElement.nativeElement;

      inputElement.value = 'foo';
      fixture.detectChanges();

      inputDebugElement.triggerEventHandler('keydown.enter', {});

      fixture.detectChanges();

      let item = fixture.debugElement.query(By.css('.add-book-hashtag__item'));

      expect(item).toBeTruthy();
      expect(spy).toHaveBeenCalled();

    });

    it('should not an hashtag when hashtag is an empty string', () => {

      component.showInput();

      fixture.detectChanges();

      const inputDebugElement = fixture.debugElement.query(By.css('.add-book-hashtag__input'));
      const inputElement: HTMLInputElement = inputDebugElement.nativeElement;

      inputElement.value = '';
      fixture.detectChanges();

      inputDebugElement.triggerEventHandler('keydown.enter', {});

      expect(component.hashTags.length).toBe(0);
    });

    it('should not add hashtag when is too long', () => {

      const inputValue = 'f'.repeat(100);

      component.showInput();

      fixture.detectChanges();

      const inputDebugElement = fixture.debugElement.query(By.css('.add-book-hashtag__input'));
      const inputElement: HTMLInputElement = inputDebugElement.nativeElement;

      inputElement.value = inputValue;

      fixture.detectChanges();

      inputDebugElement.triggerEventHandler('keydown.enter', {});

      fixture.detectChanges();

      expect(component.hashTags.length).toBe(0);

    });

    it('should not add hashtag when is there is already a hashtag with the same value', () => {

      const inputValue = 'f'.repeat(20);

      component.showInput();

      fixture.detectChanges();

      const inputDebugElement = fixture.debugElement.query(By.css('.add-book-hashtag__input'));
      const inputElement: HTMLInputElement = inputDebugElement.nativeElement;

      inputElement.value = inputValue;

      fixture.detectChanges();

      inputDebugElement.triggerEventHandler('keydown.enter', {});

      fixture.detectChanges();

      inputDebugElement.triggerEventHandler('keydown.enter', {});
      fixture.detectChanges();

      expect(component.hashTags.length).toBe(1);
    });
  });

  describe('close', () => {
    it('should remove hashtag from the hashtag list', () => {
      let spy = spyOn(component.hashTagRemoved, 'emit');

      component.showInput();

      fixture.detectChanges();

      const inputDebugElement = fixture.debugElement.query(By.css('.add-book-hashtag__input'));
      const inputElement: HTMLInputElement = inputDebugElement.nativeElement;

      inputElement.value = 'foo';
      fixture.detectChanges();

      inputDebugElement.triggerEventHandler('keydown.enter', {});

      fixture.detectChanges();

      const hashTagDebugElement = fixture.debugElement.query(By.css('.add-book-hashtag__item'));

      let hashTag = component.hashTags[0];

      hashTagDebugElement.triggerEventHandler('nzOnClose', hashTag);

      expect(component.hashTags.length).toBe(0);
      expect(spy).toHaveBeenCalled();
    })
  })

});
