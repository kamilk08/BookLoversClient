import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorCollectionBookStatisticsComponent } from './author-collection-book-statistics.component';

describe('AuthorCollectionBookStatisticsComponent', () => {
  let component: AuthorCollectionBookStatisticsComponent;
  let fixture: ComponentFixture<AuthorCollectionBookStatisticsComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorCollectionBookStatisticsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorCollectionBookStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
