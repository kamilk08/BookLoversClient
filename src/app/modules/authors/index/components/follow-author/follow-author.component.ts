import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FollowChange } from './events/follow-status-change';

@Component({
  selector: 'follow-author',
  templateUrl: './follow-author.component.html',
  styleUrls: ['./follow-author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowAuthorComponent implements OnInit {

  private readonly followText = 'Follow';
  private readonly unFollowText = 'Unfollow';

  @Input() followed: boolean;

  @Output() followChange: EventEmitter<FollowChange> = new EventEmitter<FollowChange>();

  constructor() { }

  ngOnInit() {
  }

  followAuthor() {
    this.followed = !this.followed;
    this.followChange.emit({ followed: this.followed });
  }

  getTextBasedOnFollowState() {
    return !this.followed ? this.followText : this.unFollowText;
  }
}
