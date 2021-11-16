import { AddBookHashtagComponent } from "./components/add-book-hashtag/add-book-hashtag.component";
import { AddPublisherCycleModalComponent } from "./components/add-publisher-cycle-modal/add-publisher-cycle-modal.component";
import { AddPublisherCycleService } from "./components/add-publisher-cycle-modal/services/add-publisher-cycle.service";
import { AddPublisherModalComponent } from "./components/add-publisher-modal/add-publisher-modal.component";
import { AddPublisherService } from "./components/add-publisher-modal/services/add-publisher.service";
import { AddSeriesModalComponent } from "./components/add-series-modal/add-series-modal.component";
import { AddSeriesService } from "./components/add-series-modal/services/add-series.service";
import { BookCoverComponent } from "./components/book-cover/book-cover.component";
import { EditBookCoverComponent } from "./components/edit-book-cover/edit-book-cover.component";
import { SearchAuthorsComponent } from "./components/search-authors/search-authors.component";
import { SearchPublisherCycleComponent } from "./components/search-publisher-cycle/search-publisher-cycle.component";
import { SearchPublisherComponent } from "./components/search-publisher/search-publisher.component";
import { SearchSeriesComponent } from "./components/search-series/search-series.component";
import { SectionContentComponent } from "./components/section-content/section-content.component";
import { SectionHeaderComponent } from "./components/section-header/section-header.component";


export const components = [AddBookHashtagComponent, AddPublisherCycleModalComponent,
  AddPublisherModalComponent, AddSeriesModalComponent, BookCoverComponent, EditBookCoverComponent,
  SearchAuthorsComponent, SearchPublisherComponent, SearchPublisherCycleComponent, SearchSeriesComponent,
  SectionContentComponent, SectionHeaderComponent
];
export const entryComponents = [AddPublisherCycleModalComponent, AddPublisherModalComponent, AddSeriesModalComponent];

export const commonServices = [AddSeriesService, AddPublisherService, AddPublisherCycleService]
