import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { BookPublisherComponent } from './book-publisher.component';

describe('BookPublisherComponent', () => {
  let component: BookPublisherComponent;
  let fixture: ComponentFixture<BookPublisherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])],
      declarations: [BookPublisherComponent]
    })
      .overrideComponent(BookPublisherComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('book publisher link should have proper href attribute', () => {

    component.publisherId = 1;
    component.publisherName = 'publisherName';

    fixture.detectChanges();

    const bookPublisherDebugElement = fixture.debugElement.query(By.css('.book-publisher__value'));

    const bookPublisherElement: HTMLElement = bookPublisherDebugElement.nativeElement;

    const attribute = bookPublisherElement.getAttribute('href');

    expect(attribute).toEqual(`${component.publisherLink}/${component.publisherId}`);

  })
});
