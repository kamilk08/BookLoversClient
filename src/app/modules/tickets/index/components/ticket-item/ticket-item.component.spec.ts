import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { TicketItemComponent } from './ticket-item.component';

describe('TicketItemComponent', () => {
  let component: TicketItemComponent;
  let fixture: ComponentFixture<TicketItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [TicketItemComponent]
    })
      .overrideComponent(TicketItemComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('TOGGLE_SHOW', () => {
    it('content box should have hide text when toggled value is set to true', () => {

      component.toggled = true;
      fixture.detectChanges();

      const contentBoxElement: HTMLElement = fixture.debugElement.query(By.css('.ticket-item__show-content')).nativeElement;

      expect(contentBoxElement.textContent).toEqual('Hide')

    });

    it('content box should have show text when toggled value is set to false', () => {

      component.toggled = false;
      fixture.detectChanges();

      const contentBoxElement: HTMLElement = fixture.debugElement.query(By.css('.ticket-item__show-content')).nativeElement;

      expect(contentBoxElement.textContent).toEqual('Show')

    });

  });


});
