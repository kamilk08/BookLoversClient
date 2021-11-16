import { UUID } from 'angular2-uuid';
import { Author } from '../../authors/models/author.model';
import { EditAuthorDto } from './edit-author-dto.model';
import { EditAuthorPicture } from './edit-author-picture.model';

export class EditAuthorModel {
  public authorWriteModel: EditAuthorDto
  public pictureWriteModel: EditAuthorPicture;

  constructor(author: Author, picture: { encodedImage?: string, fileName?: string }, addedByGuid: UUID) {
    this.authorWriteModel = new EditAuthorDto(author, addedByGuid);
    this.pictureWriteModel = new EditAuthorPicture(picture);
  }
}
