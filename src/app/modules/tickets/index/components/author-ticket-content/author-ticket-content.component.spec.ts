import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MomentModule } from 'ngx-moment';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AuthorTicketContentComponent } from './author-ticket-content.component';
import { SolveTicketChange } from './events/solve-ticket-change';

describe('AuthorTicketContentComponent', () => {
  let component: AuthorTicketContentComponent;
  let fixture: ComponentFixture<AuthorTicketContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, MomentModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [AuthorTicketContentComponent]
    })
      .overrideComponent(AuthorTicketContentComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorTicketContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('MANAGEABLE', () => {
    it('approve or decline button should not be visible if manageable property is set to false', () => {

      component.manageable = false;
      fixture.detectChanges();

      const acceptDebugButton = fixture.debugElement.query(By.css('.author-ticket__approve'));

      expect(acceptDebugButton).toBeNull();

    });
  });

  describe('APPROVE_OR_DECLINE_TICKET', () => {
    it('solveTicket observable should emit SolveChangeEvent where accepted property is set to false', () => {

      component.manageable = true;
      fixture.detectChanges();

      let spy = spyOn(component.solveTicket, 'emit');

      let event: SolveTicketChange = {
        approved: true,
        declined: false
      };

      const approveDebugButton: HTMLElement = fixture.debugElement.query(By.css('.author-ticket__approve')).nativeElement;

      approveDebugButton.click();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(event);
    });

    it('solveTicket observable should emit SolveChangeEvent where accepted property is set to true', () => {

      component.manageable = true;
      fixture.detectChanges();

      let spy = spyOn(component.solveTicket, 'emit');

      let event: SolveTicketChange = {
        approved: false,
        declined: true
      };

      const declineDebugButton: HTMLElement = fixture.debugElement.query(By.css('.author-ticket__decline')).nativeElement;
      declineDebugButton.click();

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(event);
    });

  });

});
