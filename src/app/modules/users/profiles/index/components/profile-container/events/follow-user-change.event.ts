import { Reader } from "src/app/modules/api/readers/models/reader.model";

export interface FollowUserChange {
  isFollowed: boolean
  followed: Reader;
  followedBy: Reader
}
