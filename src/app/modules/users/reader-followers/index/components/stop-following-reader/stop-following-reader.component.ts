import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import { StopFollowingChange } from './events/stop-following-change.event';

@Component({
  selector: 'stop-following-reader',
  templateUrl: './stop-following-reader.component.html',
  styleUrls: ['./stop-following-reader.component.scss']
})
export class StopFollowingReaderComponent implements OnInit {

  @Input() followed: Reader;
  @Input() followedBy: Reader;
  @Input() shouldIconBeVisible: boolean

  @Output() unFollowChange: EventEmitter<StopFollowingChange> = new EventEmitter<StopFollowingChange>();

  constructor() { }

  ngOnInit() {
  }

  unFollow() {
    this.unFollowChange.emit({
      followed: this.followed,
      followedBy: this.followedBy
    })
  }
}
