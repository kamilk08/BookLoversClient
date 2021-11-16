import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { SectionHeaderComponent } from './section-header.component';

describe('SectionHeaderComponent', () => {
  let component: SectionHeaderComponent;
  let fixture: ComponentFixture<SectionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([]),
      ],
      declarations: [SectionHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render icon with caret down when expanded is set to false', () => {

    component.expanded = false;
    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('.header__icon-caret-down'));

    expect(debugElement).not.toBeNull();
  });

  it('should render icon with caret right when expanded is set to true', () => {

    component.expanded = true;
    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('.header__icon-caret-right'));

    expect(debugElement).toBeTruthy();
  });

  it('expand method should emit sectionExpand event', () => {

    let spy = spyOn(component.sectionExpand, 'emit');

    let debugElement = fixture.debugElement.query(By.css('.header__icon-box'));

    debugElement.triggerEventHandler('click', {});

    expect(spy).toHaveBeenCalled();
  })
});
