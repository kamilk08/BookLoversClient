import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzAvatarComponent } from 'ng-zorro-antd';
import { ReaderDetails } from 'src/app/modules/api/readers/models/reader-details.model';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { NewFollowerTimelineItemComponent } from './new-follower-timeline-item.component';

describe('NewFollowerTimelineItemComponent', () => {
  let component: NewFollowerTimelineItemComponent;
  let fixture: ComponentFixture<NewFollowerTimelineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, StoreModule.forRoot({}), EffectsModule.forRoot([]), RouterModule.forRoot([])],
      declarations: [NewFollowerTimelineItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFollowerTimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('NAVIGATE_TO_READER', () => {
    it('when user clicks avatar then moveToReader observable should emit new value', () => {

      let spy = spyOn(component.moveToReader, 'emit');

      const reader = new Reader(new ReaderDetails('username', 'role', new Date()), 1);
      reader.identification.id = 1;

      component.follower = reader;

      fixture.detectChanges();

      const avatarComponent = fixture.debugElement.query(By.directive(NzAvatarComponent));

      avatarComponent.triggerEventHandler('click', {});

      expect(spy).toHaveBeenCalled();
    });
  });
});
