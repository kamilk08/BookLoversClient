import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import { NavigateTo } from 'src/app/modules/shared/common/navigate-to';
import { TimeLineActivity } from '../../../../../api/timelines/models/timeline-activity.interface';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'lost-follower-timeline-item',
  templateUrl: './lost-follower-timeline-item.component.html',
  styleUrls: ['./lost-follower-timeline-item.component.scss']
})
export class LostFollowerTimelineItemComponent implements OnInit {

  public readonly avatarUrl = (readerId: number) => `${environment.upload}/avatars/${readerId}`;

  @Input() follower: Reader;
  @Input() activity: TimeLineActivity

  @Output() moveToReader: EventEmitter<NavigateTo> = new EventEmitter<NavigateTo>();
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  navigateToReader() {
    this.moveToReader.emit({ objectId: this.follower.identification.id });
  }

  toggleActivity(){
    this.toggle.emit(!this.activity.show);
  }


}
