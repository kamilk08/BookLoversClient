import { BookModelApiModel } from '../../add/models/book-api.model';
import { Book } from '../../models';
import { EditBookPicture } from './edit-book-picture.interface';
import { EditBookInterface } from './edit-book.interface';

export class EditBookModel {
  public bookWriteModel: EditBookInterface
  public pictureWriteModel: EditBookPicture

  constructor(book: Book, picture: EditBookPicture) {
    this.bookWriteModel = new BookModelApiModel(book);
    this.pictureWriteModel = {
      fileName: picture === undefined ? '' : picture.fileName,
      cover: picture === undefined ? '' : picture.cover.split('data:image/jpeg;base64,')[1]
    };
  }
}
