import { AddFollowerEffects } from "./add-followers/add-follower.effects";
import { FollowersPageEffects } from "./followers-page/followers-page.effects";
import { FollowersPaginationEffects } from "./followers-pagination/followers-pagination.effects";
import { FollowingsPaginationEffects } from "./followings-pagination/followings-pagination.effects";
import { IsFollowingEffects } from "./is-following/is-following.effects";
import { RemoveFollowerEffects } from "./remove-followers/remove-follower.effects";

export const moduleEffects: any[] = [
  AddFollowerEffects,
  RemoveFollowerEffects,
  FollowersPaginationEffects,
  FollowingsPaginationEffects,
  IsFollowingEffects,
  FollowersPageEffects
]
