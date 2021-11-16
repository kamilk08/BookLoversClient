
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'favourite-book-cover',
  templateUrl: './favourite-book-cover.component.html',
  styleUrls: ['./favourite-book-cover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouriteBookCover implements OnInit {

  public coverLoadError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public coverUrl = () => `${environment.upload}/books/${this.bookId}`

  @Input() bookId: number;

  constructor() { }

  ngOnInit() {
  }

  onError(event) {
    this.coverLoadError$.next(true);
  }
}
