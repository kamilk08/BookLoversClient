import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuthorStatisticsComponent } from './author-statistics.component';

describe('AuthorStatisticsComponent', () => {
  let component: AuthorStatisticsComponent;
  let fixture: ComponentFixture<AuthorStatisticsComponent>;

  let booksCount: number = 1;
  let followersCount: number = 10;
  let booksAverage: number = 4.55;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorStatisticsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorStatisticsComponent);
    component = fixture.componentInstance;
    component.booksAverage = booksAverage;
    component.booksCount = booksCount;
    component.followersCount = followersCount;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display average properly when statistics are provided', () => {

    const averageDebugElement = fixture.debugElement.queryAll(By.css('.author-statistics__value'));

    const averageElement: HTMLElement = averageDebugElement[2].nativeElement;

    expect(averageElement.textContent).toBe('4.55');
  });
});
