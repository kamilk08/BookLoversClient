import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE } from "src/app/modules/shared/common/query";

export class BrowsePagination {
  public page: number;
  public count: number;

  constructor(page: number, count: number) {
    this.page = page;
    this.count = count;
  }

  public static defaultPagination() {
    return new BrowsePagination(DEFAULT_PAGE, DEFAULT_ITEMS_COUNT);
  }
}
