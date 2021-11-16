import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { AddFavouriteAuthor } from './models/add-favourite-author.model';
import { AddFavouriteBook } from './models/add-favourite-book.model';
import { FavouriteAuthor } from './models/favourite-author.model';
import { FavouriteBook } from './models/favourite-book.model';
import { RemoveFavourite } from './models/remove-favourite.model';
import { ADD_FAVOURITE_AUTHOR, ADD_FAVOURITE_BOOK, GET_FAVOURITE_AUTHORS, GET_FAVOURITE_BOOKS, REMOVE_FAVOURITE } from './favourites.urls';

@Injectable()
export class FavouritesApi {

  constructor(private http: HttpClient) { }


  getFavouriteAuthors(readerId: number) {
    return this.http.get(GET_FAVOURITE_AUTHORS(readerId), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => response as Array<FavouriteAuthor>))
  }

  getFavouriteBooks(readerId: number) {
    return this.http.get(GET_FAVOURITE_BOOKS(readerId), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => response as Array<FavouriteBook>));
  }

  addFavouriteAuthor(model: AddFavouriteAuthor) {
    return this.http.post(ADD_FAVOURITE_AUTHOR, model, { headers: DEFAULT_HEADERS() });
  }

  addFavouriteBook(model: AddFavouriteBook) {
    return this.http.post(ADD_FAVOURITE_BOOK, model, { headers: DEFAULT_HEADERS() });
  }

  removeFavourite(model: RemoveFavourite) {
    return this.http.request('delete', REMOVE_FAVOURITE, { headers: DEFAULT_HEADERS(), body: model });
  }

}
