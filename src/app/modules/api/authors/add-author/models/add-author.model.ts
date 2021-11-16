import { UUID } from 'angular2-uuid';
import { Author } from '../../authors/models/author.model'
import { AddAuthorPicture } from './add-author-picture.model';
import { AddAuthorDto } from './add-author-dto.model';

export class AddAuthorModel {

  public authorWriteModel: AddAuthorDto
  public pictureWriteModel: AddAuthorPicture;

  constructor(author: Author, picture: { encodedImage?: string, fileName?: string }, addedByGuid: UUID) {
    this.authorWriteModel = new AddAuthorDto(author, addedByGuid);
    this.pictureWriteModel = new AddAuthorPicture(picture);
  }
}



