export class EditAuthorPicture {

  public readonly fileName: string;
  public readonly authorImage: string;

  constructor(picture: { encodedImage?: string, fileName?: string }) {
    this.fileName = picture === null ? '' : picture.fileName;
    this.authorImage = picture === null ? '' : picture.encodedImage.split('data:image/jpeg;base64,')[1]
  }
}
