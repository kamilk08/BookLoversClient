import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectedImage } from 'src/app/modules/shared/models/selected-image';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { MesssagesFacade } from 'src/app/modules/shared/store/messages/message.facade';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'edit-book-cover',
  templateUrl: './edit-book-cover.component.html',
  styleUrls: ['./edit-book-cover.component.scss'],
  providers: [ImageService, MesssagesFacade]
})
export class EditBookCoverComponent implements OnInit {

  public imageLoadError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public bookCoverUrl = () => `${environment.upload}/books/${this.bookId}`;

  @Input() bookId: number;
  @Output() coverChange: EventEmitter<SelectedImage> = new EventEmitter<SelectedImage>();

  constructor(public readonly imageService: ImageService,
    public readonly messagesFacade: MesssagesFacade
  ) { }

  ngOnInit() {
  }


  onCoverSelect(event: Event) {
    const elem: any = event.currentTarget;

    if (elem.files.length > 0) {
      const file = elem.files[0];
      this.imageService.toEncodedImage(file,
        () => this.messagesFacade.showFaliureMessage('Invalid image'),
        () => this.coverChange.emit({ encodedImage: this.imageService.encodedImage, fileName: file.name }));
    }
  }

  onError() {
    this.imageLoadError$.next(true);
  }

}
