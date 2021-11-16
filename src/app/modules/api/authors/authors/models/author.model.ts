import { UUID } from 'angular2-uuid'
import { AuthorBasics } from './author-basics.model'
import { AuthorDescription } from './author-description.model'
import { AuthorDetails } from './author-details.model'
import { Identification } from 'src/app/modules/shared/models/identification'
import { Follower } from 'src/app/modules/shared/models/follower'
import { SubCategory } from '../../../books/models/sub-category.model'
import { ALL_SUBCATEGORIES } from 'src/app/modules/books/common/categories'

export class Author {
  public identification: Identification
  public basics: AuthorBasics
  public description: AuthorDescription
  public details: AuthorDetails

  public books: number[]
  public followers: Follower[];
  public quotes: number[]
  public genres: SubCategory[]

  constructor(basics: AuthorBasics, description: AuthorDescription, details: AuthorDetails, genres: number[]) {
    this.identification = { id: null, guid: UUID.UUID() };
    this.basics = basics;
    this.description = description;
    this.details = details;

    this.books = [];
    this.followers = []
    this.quotes = []
    this.genres = ALL_SUBCATEGORIES.filter(p => genres.includes(p.id));
  }

  public getAuthorGenresIds() {
    return this.genres.map(s => s.id);
  }

  public hasOtherBooks(bookId: number) {
    return this.books.some(p => p !== bookId);
  }

  public hasFollower(userId: number) {
    return this.followers.find(p => p.followedById === userId) !== undefined;
  }

  public setAuthorId(authorId: number) {
    if (this.identification.id === undefined)
      return;

    const authorGuid = this.identification.guid;
    this.identification = { id: authorId, guid: authorGuid };
  }
}
