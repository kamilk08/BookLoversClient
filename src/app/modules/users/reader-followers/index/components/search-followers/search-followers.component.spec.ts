import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { SearchFollowersComponent } from './search-followers.component';

describe('SearchFollowersComponent', () => {
  let component: SearchFollowersComponent;
  let fixture: ComponentFixture<SearchFollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([]),
      ],
      declarations: [SearchFollowersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('invoking expand method should close the search input and component should have close css class', () => {

    const component = fixture.debugElement.query(By.css('.search-followers__icon'));

    component.triggerEventHandler('click', {});

    fixture.detectChanges();

    const searchInput: HTMLElement = fixture.debugElement.query(By.css('.search-followers__input')).nativeElement;

    const flag = searchInput.classList.contains('close');

    expect(flag).toBeTruthy();
  });

  it('triggering input change should result in emitting new SearchEvent', fakeAsync(() => {

    const spy = spyOn(component.searchPhrase, 'emit');

    const searchInput: HTMLInputElement = fixture.debugElement.query(By.css('.search-followers__input')).nativeElement;

    searchInput.value = 'abcd';
    fixture.detectChanges();

    searchInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    tick(1500);

    expect(spy).toHaveBeenCalled();

  }))
});
