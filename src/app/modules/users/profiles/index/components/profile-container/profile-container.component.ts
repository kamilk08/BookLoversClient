import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { FollowUserChange } from './events/follow-user-change.event';

@Component({
  selector: 'profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.componet.scss']
})
export class ProfileContainerComponent implements OnInit {

  @Input() loggedInReader: Reader
  @Input() reader: Reader
  @Input() followed: boolean;
  @Input() isProfileOwner: boolean;

  @Output() followUserChange: EventEmitter<FollowUserChange> = new EventEmitter<FollowUserChange>();

  constructor(public readonly authService: AuthService) { }

  ngOnInit() {
  }

  follow() {
    this.followed = !this.followed;
    this.followUserChange.emit({ isFollowed: this.followed, followed: this.reader, followedBy: this.loggedInReader });
  }
}
