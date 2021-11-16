export class ReviewContent {
  public reviewText: string
  public reviewDate: Date
  public editedDate: Date
  public markedAsSpoiler: boolean
  public markedAsSpoilerByOthers: boolean;

  constructor(review: string, date: Date, markedAsSpoiler: boolean, editDate?: Date) {
    this.reviewText = review;
    this.reviewDate = date;
    this.editedDate = editDate;
    this.markedAsSpoiler = markedAsSpoiler;
    this.markedAsSpoilerByOthers = false;
  }
}
