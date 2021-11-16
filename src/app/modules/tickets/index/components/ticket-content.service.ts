import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TicketContentService {

  private _toggled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly toggled$: Observable<boolean> = this._toggled$.asObservable();

  constructor() {
  }

  toggleTicketContent() {
    const current = !this._toggled$.value;
    this._toggled$.next(current);
  }
}
