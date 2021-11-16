import { BookcaseAdapter, BookcaseApi, ShelfAdatper } from "./api"
import { BookcasePaginationApi } from "./pagination/bookcase-pagination.api"
import { BookcaseSettingsApi } from "./settings/bookcase-settings.api"
import { ShelfRecordAdapter } from "./shelf-records/shelf-record.adapter"
import { ShelfRecordApi } from "./shelf-records/shelf-records.api"
import { BookcaseStatisticsApi } from "./statistics/bookcase-statistics.api"

export const api: any[] = [
  BookcaseApi,
  BookcasePaginationApi,
  BookcaseSettingsApi,
  ShelfRecordApi,
  BookcaseStatisticsApi]

export const adapters: any[] = [
  BookcaseAdapter,
  ShelfAdatper,
  ShelfRecordAdapter]
