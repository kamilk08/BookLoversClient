import { AddCycleBookEffects } from "./add-cycle-book/add-cycle-book.effects";
import { AddPublisherCycleEffects } from "./add-publisher-cycle/add-publisher-cycle.effects";
import { PublisherCycleEffects } from "./publisher-cycles/publisher-cycle.effects";
import { RemoveCycleBookEffects } from "./remove-cycle-book/remove-cycle-book.effects";
import { SearchPublisherCycleEffects } from "./search-cycles/search-publisher-cycle.effects";

export const moduleEffects: any[] = [AddCycleBookEffects,
  AddPublisherCycleEffects, PublisherCycleEffects, RemoveCycleBookEffects,
  SearchPublisherCycleEffects]
