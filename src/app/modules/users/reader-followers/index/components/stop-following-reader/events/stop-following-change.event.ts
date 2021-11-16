import { Reader } from "src/app/modules/api/readers/models/reader.model";

export interface StopFollowingChange {
  followed: Reader,
  followedBy: Reader
}
