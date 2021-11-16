import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import { StartFollowingChange } from './events/start-following-change.event';

@Component({
  selector: 'start-following-reader',
  templateUrl: './start-following-reader.component.html',
  styleUrls: ['./start-following-reader.component.scss']
})
export class StartFollowingReaderComponent implements OnInit {

  @Input() followed: Reader;
  @Input() followedBy: Reader;
  @Input() shouldIconBeVisible: boolean;

  @Output() startFollowingChange: EventEmitter<StartFollowingChange> = new EventEmitter<StartFollowingChange>();

  constructor() { }

  ngOnInit() {
  }

  follow() {
    this.startFollowingChange.emit({
      followed: this.followed,
      followedBy: this.followedBy
    })
  }

}
