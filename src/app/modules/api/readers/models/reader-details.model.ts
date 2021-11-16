export class ReaderDetails {
  public userName: string
  public role: string
  public joinedAt: Date

  constructor(userName: string, role: string, joinedAt: Date) {
    this.userName = userName;
    this.role = role;
    this.joinedAt = joinedAt;
  }
}
