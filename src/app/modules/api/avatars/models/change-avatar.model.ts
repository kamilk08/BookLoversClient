export class ChangeAvatar {
  public readonly avatar: string
  public readonly fileName: string;

  constructor(avatar: string, fileName: string) {
    this.avatar =  avatar === undefined ? '' : avatar.split('data:image/jpeg;base64,')[1]
    this.fileName = fileName;
  }
}
