
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'add-favourite-book-modal-cover',
  templateUrl: './add-favourite-book-modal-cover.component.html',
  styleUrls: ['./add-favourite-book-modal-cover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFavouriteBookModalCover implements OnInit {

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
