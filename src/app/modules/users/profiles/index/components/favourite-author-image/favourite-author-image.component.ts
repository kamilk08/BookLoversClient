import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'favourite-author-image',
  templateUrl: './favourite-author-image.component.html',
  styleUrls: ['./favourite-author-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouriteAuthorImage implements OnInit {

  public imageLoadError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public authorImageUrl = () => `${environment.upload}/authors/${this.authorId}`;

  @Input() authorId: number;

  constructor() { }

  ngOnInit() {

  }

  onError(event) {
    this.imageLoadError$.next(true);
  }
}
