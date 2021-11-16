import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AuthorCollectionCoverComponent } from './author-collection-cover.component';

describe('AuthorCollectionCoverComponent', () => {
  let component: AuthorCollectionCoverComponent;
  let fixture: ComponentFixture<AuthorCollectionCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [AuthorCollectionCoverComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorCollectionCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('coverLoadError$', () => {
    it('should emit new value which should lead to rendering default cover box', () => {

      component.coverLoadError$.next(true);

      fixture.detectChanges();

      const authorBoxDebugElement = fixture.debugElement.query(By.css('.author-collection-cover__cover-box'));

      expect(authorBoxDebugElement).not.toBeNull();

    });

    it('should not emit new value and img elemt should be visible', () => {

      const imgDebugElement = fixture.debugElement.query(By.css('.author-collection-cover'));

      expect(imgDebugElement).not.toBeNull();
    })
  })
});
