import { AddBookPicture } from '../models/add-book-picture.interface';
import { BookModelApiModel } from '../models/book-api.model';

export interface AddBookResponse {
  bookDto: BookModelApiModel
  pictureDto: AddBookPicture,
  bookId: number
}
