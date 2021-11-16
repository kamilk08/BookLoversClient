export class Avatar {
  public id: number
  public readerId: number
  public blob: Blob

  constructor(id: number, readerId: number, blob: Blob) {
    this.id = id;
    this.readerId = readerId;
    this.blob = blob;
  }

  public addBlob(blob: Blob) {
    return new Avatar(this.id, this.readerId, blob);
  }
}
