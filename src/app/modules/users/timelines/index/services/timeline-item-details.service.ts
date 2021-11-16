import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TimelineItemDetailsService {

  private expanded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly isExpanded$: Observable<boolean> = this.expanded$.asObservable();

  constructor() {
  }

  expandDetails() {
    const currentState = !this.expanded$.value;
    this.expanded$.next(currentState);
  }
}
