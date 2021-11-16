import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { authorsModuleReducer } from '../../../store';

import { AuthorDescriptionComponent } from './author-description.component';

describe('AuthorDescriptionComponent', () => {
  let component: AuthorDescriptionComponent;
  let fixture: ComponentFixture<AuthorDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('authors', authorsModuleReducer),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [AuthorDescriptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when description is not provided should show no description content', () => {

    component.description = null;
    fixture.detectChanges();

    let debugElement = fixture.debugElement.query(By.css('.author-description__no-description'));

    expect(debugElement).toBeDefined();
  });

  it('when description is not provided then description link should not be defined', () => {

    component.descriptionSource = null;
    fixture.detectChanges();

    let debugElement = fixture.debugElement.query(By.css('.author-description-source'));

    expect(debugElement).toBeNull();

  });

  it('when description length is smaller than maxDescriptionCount author description full should be defined', () => {

    component.description = 'aaabbb';

    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('.author-description--full'));

    expect(debugElement).toBeDefined();
  })
});
