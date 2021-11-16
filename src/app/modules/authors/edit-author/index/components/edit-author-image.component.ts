import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectedImage } from 'src/app/modules/shared/models/selected-image';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { MesssagesFacade } from 'src/app/modules/shared/store/messages/message.facade';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'edit-author-image',
  templateUrl: './edit-author-image.component.html',
  styleUrls: ['./edit-author-image.component.scss'],
  providers: [ImageService, MesssagesFacade],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAuthorImageComponent implements OnInit {

  public loadImageError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public authorImageUrl = () => `${environment.upload}/authors/${this.authorId}`;

  @Input() authorId: number;

  constructor(public readonly imageService: ImageService,
    public readonly messagesFacade: MesssagesFacade) { }

  ngOnInit() {
  }

  @Output() imageSelect: EventEmitter<SelectedImage> = new EventEmitter<SelectedImage>();

  onImageSelect(event: Event) {
    const elem = event.currentTarget as HTMLInputElement;

    if (elem.files.length > 0) {
      const file = elem.files[0];
      this.imageService.toEncodedImage(file,
        () => this.messagesFacade.showFaliureMessage('Invalid image.'),
        () => this.imageSelect.emit({ encodedImage: this.imageService.encodedImage, fileName: file.name }));
    }
  }

  onLoadError(event: Event) {
    this.loadImageError$.next(true);
  }
}
