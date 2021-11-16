import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'author-image',
  templateUrl: './author-image.component.html',
  styleUrls: ['./author-image.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorImageComponent implements OnInit {

  public imageLoadError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public authorImageUrl = () => `${environment.upload}/authors/${this.authorId}`;

  @Input() authorId: number;

  constructor() { }

  ngOnInit() {
  }

  onError(event: Event) {
    this.imageLoadError$.next(true);
  }
}
