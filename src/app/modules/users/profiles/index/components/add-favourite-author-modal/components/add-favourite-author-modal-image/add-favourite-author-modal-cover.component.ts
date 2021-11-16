
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'add-favourite-author-modal-cover',
  templateUrl: './add-favourite-author-modal-cover.component.html',
  styleUrls: ['./add-favourite-author-modal-cover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFavouriteAuthorModalCover implements OnInit {

  public coverLoadError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public imageUrl = () => `${environment.upload}/authors/${this.authorId}`

  @Input() authorId: number;

  constructor() { }

  ngOnInit() {
  }

  onError(event) {
    this.coverLoadError$.next(true);
  }
}
