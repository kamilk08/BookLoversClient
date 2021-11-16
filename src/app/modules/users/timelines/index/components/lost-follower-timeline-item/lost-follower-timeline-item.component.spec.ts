import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzAvatarComponent } from 'ng-zorro-antd';
import { ReaderDetails } from 'src/app/modules/api/readers/models/reader-details.model';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { LostFollowerTimelineItemComponent } from './lost-follower-timeline-item.component';

describe('LostFollowerTimelineItemComponent', () => {
  let component: LostFollowerTimelineItemComponent;
  let fixture: ComponentFixture<LostFollowerTimelineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),

      ],
      declarations: [ LostFollowerTimelineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostFollowerTimelineItemComponent);
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
