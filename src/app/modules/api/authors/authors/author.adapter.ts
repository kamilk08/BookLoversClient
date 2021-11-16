import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { FullName, Identification, Sex, Follower, Adapter } from '../../../shared';
import { Author } from './models/author.model';
import { AuthorBasics } from './models/author-basics.model';
import { AuthorDescription } from './models/author-description.model';
import { CATEGORIES } from '../../../books/common/categories';
import { AuthorDetails } from './models/author-details.model';
import { SubCategory } from '../../books/models/sub-category.model';

@Injectable()
export class AuthorAdapter implements Adapter<Author> {
  adapt(item: any): Author {
    if (!item)
      return undefined;

    const author = {
      identification: this.adaptIdentification(item.id, item.guid),
      basics: this.adaptAuthorBasics(new FullName(item.firstName, item.secondName), item.sex),
      description: this.adaptDescription(item.aboutAuthor, item.descriptionSource, item.authorWebSite),
      details: this.adaptAuthorDetails(item.birthDate, item.deathDate, item.birthPlace, item.addedByReaderId),
      books: item.authorBooks,
      followers: this.adaptAuthorFollowers(item.authorFollowers),
      quotes: item.authorQuotes,
      genres: this.adaptAuthorSubCategories(item.authorSubCategories),
      getAuthorGenresIds: Author.prototype.getAuthorGenresIds,
      hasOtherBooks: Author.prototype.hasOtherBooks,
      hasFollower: Author.prototype.hasFollower,
      setAuthorId: Author.prototype.setAuthorId
    };

    return author;
  }

  private adaptIdentification(id: number, guid: UUID): Identification {
    return {
      id: id,
      guid: guid
    }
  }
  private adaptAuthorBasics(fullName: FullName, sexId: number): AuthorBasics {
    return {
      fullName: fullName,
      sex: Sex.getSex(sexId)
    }
  }
  private adaptDescription(about: string, source: string, website: string): AuthorDescription {
    return {
      about: about,
      source: source,
      website: website
    }
  }
  private adaptAuthorDetails(birthDate: Date, deathDate: Date, birthPlace: string, addedById: number): AuthorDetails {
    return {
      birthDate: birthDate,
      deathDate: deathDate,
      birthPlace: birthPlace,
      addedById: addedById
    }
  }

  private adaptAuthorFollowers(authorFollowers: any[]): Follower[] {
    return authorFollowers.map(follower => new Follower(follower.authorId, follower.followedById));
  }

  private adaptAuthorSubCategories(subCategories: any[]): SubCategory[] {
    return subCategories.map(subCategory => {
      return { id: subCategory.id, name: subCategory.subCategoryName, category: CATEGORIES.find(p => p.id == subCategory.categoryId) }
    });
  }


}
