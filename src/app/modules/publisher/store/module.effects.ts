import { AddPublisherEffects } from "./add-publisher/add-publisher.effects";
import { PublisherPageEffects } from "./page/publisher-page.effects";
import { PublisherBooksEffects } from "./pagination/publisher-books.effects";
import { PublisherEffects } from "./publishers/publisher.effects";
import { SearchPublisherEffects } from "./search-publisher/search-publisher.effects";

export const moduleEffects: any[] = [AddPublisherEffects, PublisherPageEffects,
  PublisherEffects, SearchPublisherEffects, PublisherBooksEffects]
