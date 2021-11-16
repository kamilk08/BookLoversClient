import { BrowseCriteriaDetails } from './browse-criteria-details.model';
import { BrowsePagination } from './browse-criteria-pagination.model';

export class BrowseCriteria {
  public readonly categories: number[]
  public readonly title: string
  public readonly details: BrowseCriteriaDetails;
  public readonly pagination: BrowsePagination

  constructor(title: string, categories: number[], details: BrowseCriteriaDetails, pagination: BrowsePagination) {
    this.title = title;
    this.categories = categories === [] ? null : categories;
    this.details = details;
    this.pagination = pagination;
  }

  static defaultCriteria() {
    const criteriaDetails = BrowseCriteriaDetails.defaultCriteria();
    const pagination = BrowsePagination.defaultPagination();

    return new BrowseCriteria('', null, criteriaDetails, pagination);
  }
}
