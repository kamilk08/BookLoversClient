import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AuthorSeriesCoverComponent } from './author-series-cover.component';

describe('AuthorSeriesCoverComponent', () => {
  let component: AuthorSeriesCoverComponent;
  let fixture: ComponentFixture<AuthorSeriesCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [AuthorSeriesCoverComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorSeriesCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show default cover box when there is an error', () => {

    component.coverLoadError$.next(true);

    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('.no-cover'));
    const noCoverBox: HTMLElement = debugElement.nativeElement;

    expect(noCoverBox).toBeDefined();
  });

  it('should show img element when there is no error', () => {

    component.coverLoadError$.next(false);

    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('.cover'));
    const noCoverBox: HTMLElement = debugElement.nativeElement;

    expect(noCoverBox).toBeDefined();

  })
});
