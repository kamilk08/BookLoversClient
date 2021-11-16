import { GroupedRatingsEffects } from "./grouped-ratings/grouped-ratings.effects";
import { PaginatedRatingsEffects } from "./paginated-ratings/paginated-ratings.effects";
import { RatingsEffects } from "./ratings.effects";

export const moduleEffects: any[] = [RatingsEffects,
  GroupedRatingsEffects, PaginatedRatingsEffects]
