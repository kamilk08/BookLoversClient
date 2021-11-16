import { Book } from '../../models/book.model';
import { AddBookPicture } from './add-book-picture.interface';
import { AddBookModel } from './add-book.interface';
import { BookModelApiModel } from './book-api.model';

export class AddNewBook {
  bookWriteModel: AddBookModel;
  pictureWriteModel: AddBookPicture;

  constructor(book: Book, picture: AddBookPicture) {
    this.bookWriteModel = new BookModelApiModel(book);
    this.pictureWriteModel = {
      fileName: picture === undefined ? '' : picture.fileName,
      cover: picture === undefined ? '' : picture.cover.split('data:image/jpeg;base64,')[1]
    };
  }

}
