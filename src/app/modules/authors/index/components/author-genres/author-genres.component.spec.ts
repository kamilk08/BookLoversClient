import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AuthorGenresComponent } from './author-genres.component';

describe('AuthorGenresComponent', () => {
  let component: AuthorGenresComponent;
  let fixture: ComponentFixture<AuthorGenresComponent>;

  let genres: Array<string> = ['Fantasy', 'Sci-Fi', 'History', 'Drama']

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [AuthorGenresComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorGenresComponent);
    component = fixture.componentInstance;
    component.genres = genres;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tag elements equal to genres array length', () => {

    let debugElements = fixture.debugElement.queryAll(By.css('.author-genres__item'));

    expect(debugElements.length).toEqual(genres.length);
  })
});
