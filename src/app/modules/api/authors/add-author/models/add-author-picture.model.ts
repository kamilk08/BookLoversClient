export class AddAuthorPicture {

  public readonly fileName: string;
  public readonly authorImage: string;

  constructor(picture: { encodedImage?: string, fileName?: string }) {
    this.fileName = picture.fileName === null ? '' : picture.fileName;
    this.authorImage = picture.encodedImage === null ? '' : picture.encodedImage.split('data:image/jpeg;base64,')[1]
  }
}
