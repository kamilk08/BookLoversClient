import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AuthorImageComponent } from './author-image.component';

describe('AuthorImageComponent', () => {
  let component: AuthorImageComponent;
  let fixture: ComponentFixture<AuthorImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [AuthorImageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no image element when there is an error', () => {

    component.imageLoadError$.next(true);
    fixture.detectChanges();

    let debugElement = fixture.debugElement.query(By.css('.author-image__no-image'));
    let noImageBox: HTMLElement = debugElement.nativeElement;

    expect(noImageBox).toBeDefined();

  });

  it('should show no image element when there is no error but authorId is not provided', () => {

    component.imageLoadError$.next(false);
    component.authorId = undefined;
    fixture.detectChanges();

    let debugElement = fixture.debugElement.query(By.css('.author-image__no-image'));
    let noImageBox: HTMLElement = debugElement.nativeElement;

    expect(noImageBox).toBeDefined();

  })

  it('should show img element when there is no error', () => {

    component.authorId = 1;
    component.imageLoadError$.next(false);
    fixture.detectChanges();

    let debugElement = fixture.debugElement.query(By.css('.author-image__image'));
    let imgElement: HTMLElement = debugElement.nativeElement;

    expect(imgElement).toBeDefined();
  })
});
