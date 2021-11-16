import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'follower-avatar',
  templateUrl: './follower-avatar.component.html',
  styleUrls: ['./follower-avatar.component.scss']
})
export class FollowerAvatarComponent implements OnInit {

  public readonly avatarUrl = (followerId: number) => `${environment.upload}/avatars/${followerId}`;

  @Input() followerId: number;

  constructor() { }

  ngOnInit() {
  }

}
