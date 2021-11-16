import { AuthorStatisticsEffects } from "./authors/author-statistics.effects";
import { PublisherStatisticsEffects } from "./publisher/publisher-statistics.effects";
import { SeriesStatisticsEffects } from "./series/series-statistics.effects";

export const moduleEffects: any[] = [AuthorStatisticsEffects, PublisherStatisticsEffects, SeriesStatisticsEffects];
