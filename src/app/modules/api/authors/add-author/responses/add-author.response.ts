import { AddAuthorDto } from '../models/add-author-dto.model';
import { AddAuthorPicture } from '../models/add-author-picture.model';

export interface AddAuthorResponse {
  authorWriteModel: AddAuthorDto
  pictureWriteModel: AddAuthorPicture
}
