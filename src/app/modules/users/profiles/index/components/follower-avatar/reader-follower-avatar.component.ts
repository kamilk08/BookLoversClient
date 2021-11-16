import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NavigateTo } from 'src/app/modules/shared/common/navigate-to';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'reader-follower-avatar',
  templateUrl: './reader-follower-avatar.component.html',
  styleUrls: ['./reader-follower-avatar.component.scss'],
})
export class ReaderFollowerAvatarComponent implements OnInit {

  public avatarUrl = () => `${environment.upload}/avatars/${this.readerId}`;

  @Input() readerId: number

  constructor() { }

  ngOnInit() {
  }
}
