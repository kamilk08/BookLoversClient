import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AuthorCollectionItemComponent } from './author-collection-item.component';

describe('AuthorCollectionItemComponent', () => {
  let component: AuthorCollectionItemComponent;
  let fixture: ComponentFixture<AuthorCollectionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [AuthorCollectionItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorCollectionItemComponent);
    component = fixture.componentInstance;
    component.bookId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when bookId is provided link should be displayed properly', () => {

    const debugElement = fixture.debugElement.query(By.css('.author-collection-item'));

    const linkElement: HTMLElement = debugElement.nativeElement;

    expect(linkElement.getAttribute('href')).toEqual(`/book/${component.bookId}`);

  })

});
