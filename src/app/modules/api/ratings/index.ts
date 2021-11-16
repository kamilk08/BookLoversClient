import { RatingsOverviewAdapter } from "./overviews/ratings-overview.adapter";
import { RatingsOverviewApi } from "./overviews/ratings-overview.api";
import { RatingAdapter } from "./rating.adapter";
import { RatingsApi } from "./ratings.api";
import { StatisticsApi } from "./statistics/statistics.api";

export const api: any[] = [RatingsOverviewApi, StatisticsApi, RatingsApi];
export const adapters: any[] = [RatingsOverviewAdapter, RatingAdapter]
