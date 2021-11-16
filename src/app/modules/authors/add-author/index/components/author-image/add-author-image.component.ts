import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { SelectedImage } from 'src/app/modules/shared/models/selected-image';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { MesssagesFacade } from 'src/app/modules/shared/store/messages/message.facade';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'add-author-image-modal',
  templateUrl: './add-author-image.component.html',
  styleUrls: ['./add-author-image.component.scss'],
  providers: [ImageService, MesssagesFacade],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAuthorImageComponent implements OnInit {

  public authorImageUrl = () => `${environment.upload}/authors/${this.authorId}`;

  @Input() authorId: number;

  constructor(public imageService: ImageService, public readonly messagesFacade: MesssagesFacade) { }

  ngOnInit() {
  }

  @Output() imageSelect: EventEmitter<SelectedImage> = new EventEmitter<SelectedImage>();

  onImageSelect(event: Event) {
    const elem: any = event.currentTarget;

    if (elem.files.length > 0) {
      const file = elem.files[0];
      this.imageService.toEncodedImage(file,
        (error) => this.messagesFacade.showFaliureMessage('Invalid type of image.'),
        () => this.imageSelect.emit({ encodedImage: this.imageService.encodedImage, fileName: file.name }));

    }
  }
}
