import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { BookFacade } from '../../../store/book.facade';
import { Book } from '../../../../api/books/models';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable()
export class BookEditGuard implements CanActivate {

  private editPageKey = (bookId: number) => `edit-book-${bookId}`;

  constructor(private authService: AuthService,
    private bookFacade: BookFacade,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const bookId = +route.paramMap.get('id');
    if (this.authService.isLibrarian) return true
    else {
      const book = this.getBookFromStorage(bookId);
      return book === undefined ? this.isBookAddedByUser$(bookId) : this.isBookAddedByUser(book);
    }
  }

  private isBookAddedByUser$(bookId: number) {
    return this.bookFacade.bookById$(bookId)
      .pipe(
        filter(f => f !== undefined),
        tap((book) => localStorage.setItem(this.editPageKey(bookId), JSON.stringify(book))),
        map((book) => this.isBookAddedByUser(book)),
        tap(value => {
          if (!value) this.router.navigate(['/sign_in']);
          else return value;
        })
      );
  }

  private getBookFromStorage(bookId: number) {
    const storageBook = localStorage.getItem(this.editPageKey(bookId));
    return storageBook === null ? undefined : JSON.parse(storageBook) as Book;
  }

  private isBookAddedByUser(book: Book) {
    if (book.addedBy.addedById === this.authService.userId) return true
    else {
      this.router.navigate(['/sign_in']);
    }
  }
}
