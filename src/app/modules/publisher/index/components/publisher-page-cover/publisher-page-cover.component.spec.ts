import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PublisherPageCoverComponent } from './publisher-page-cover.component';


describe('PublisherPageCoverComponent', () => {
  let component: PublisherPageCoverComponent;
  let fixture: ComponentFixture<PublisherPageCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [PublisherPageCoverComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherPageCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should default cover box when there was an cover load error', () => {

    const imgElement = fixture.debugElement.query(By.css('.cover__image'));

    expect(imgElement).not.toBeNull();

  });

  it('should should img elment when there was no cover image error', () => {

    component.coverLoadError$.next(true);

    fixture.detectChanges();

    const defaultBoxElement = fixture.debugElement.query(By.css('.cover__box'));

    expect(defaultBoxElement).not.toBeNull();

  });
});
