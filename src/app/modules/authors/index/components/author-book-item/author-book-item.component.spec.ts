import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AuthorBookItemComponent } from './author-book-item.component';

describe('AuthorBookItemComponent', () => {
  let component: AuthorBookItemComponent;
  let fixture: ComponentFixture<AuthorBookItemComponent>;
  let bookId: number = 1;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])],
      declarations: [AuthorBookItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorBookItemComponent);
    component = fixture.componentInstance;
    component.bookId = bookId;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('link should have valid url attribute', () => {

    const linkDebugElement = fixture.debugElement.query(By.css('.book-item'));
    const linkElement: HTMLAnchorElement = linkDebugElement.nativeElement;
    const hrefAttribute = linkElement.getAttribute('href');

    expect(hrefAttribute).toBe(`/book/${bookId}`);
  });
});
