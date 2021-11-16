import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'book-comment-avatar',
  templateUrl: './book-comment-avatar.component.html',
  styleUrls: ['./book-comment-avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCommentAvatarComponent implements OnInit {

  public avatarUrl = () => `${environment.upload}/avatars/${this.userId}`;

  @Input() userId:number

  constructor() { }

  ngOnInit() {
  }

}
