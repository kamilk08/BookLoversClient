import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AuthorSeriesItemComponent } from './author-series-item.component';

describe('AuthorSeriesItemComponent', () => {
  let component: AuthorSeriesItemComponent;
  let fixture: ComponentFixture<AuthorSeriesItemComponent>;
  let seriesId = 1;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])],
      declarations: [AuthorSeriesItemComponent]
    })
    .overrideComponent(AuthorSeriesItemComponent,{set:{changeDetection:ChangeDetectionStrategy.Default}})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorSeriesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('link should have valid url attribute', () => {

    component.seriesId = seriesId;
    fixture.detectChanges();

    const linkDebugElement = fixture.debugElement.query(By.css('.series-item'));
    const linkElement: HTMLAnchorElement = linkDebugElement.nativeElement;
    const hrefAttribute = linkElement.getAttribute('href');

    expect(hrefAttribute).toBe(`/series/${seriesId}`);
  });
});
