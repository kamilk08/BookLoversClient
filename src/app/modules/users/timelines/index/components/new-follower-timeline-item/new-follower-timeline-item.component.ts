import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import { NavigateTo } from 'src/app/modules/shared/common/navigate-to';
import { TimeLineActivity } from '../../../../../api/timelines/models/timeline-activity.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'new-follower-timeline-item',
  templateUrl: './new-follower-timeline-item.component.html',
  styleUrls: ['./new-follower-timeline-item.component.scss']
})
export class NewFollowerTimelineItemComponent implements OnInit {

  public readonly avatarUrl = (readerId: number) => `${environment.upload}/avatars/${readerId}`;

  @Input() follower: Reader;
  @Input() activity: TimeLineActivity;

  @Output() moveToReader: EventEmitter<NavigateTo> = new EventEmitter<NavigateTo>();
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  navigateToReader() {
    this.moveToReader.emit({ objectId: this.follower.identification.id });
  }

  toggleActivity(){
    this.toggle.emit();
  }
}
