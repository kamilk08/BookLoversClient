import { Reader } from "src/app/modules/api/readers/models/reader.model";

export interface StartFollowingChange {
  followed: Reader
  followedBy: Reader
}
