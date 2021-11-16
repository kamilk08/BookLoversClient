import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import { Book } from 'src/app/modules/api/books/models';
import { NavigateTo } from 'src/app/modules/shared/common/navigate-to';
import { TimeLineActivity } from '../../../../../api/timelines/models/timeline-activity.interface';
import { TimelineItemDetailsService } from '../../services/timeline-item-details.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'new-book-in-bookcase-timeline-item',
  templateUrl: './new-book-in-bookcase-timeline-item.component.html',
  styleUrls: ['./new-book-in-bookcase-timeline-item.component.scss'],
  providers: [TimelineItemDetailsService]
})
export class NewBookInBookcaseTimelineItemComponent implements OnInit {

  public readonly avatarUrl = (readerId: number) => `${environment.upload}/avatars/${readerId}`;

  @Input() reader: Reader;
  @Input() activity: TimeLineActivity
  @Input() book: Book;

  @Output() moveToReader: EventEmitter<NavigateTo> = new EventEmitter<NavigateTo>();
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() details: EventEmitter<Book> = new EventEmitter<Book>();

  constructor(public readonly detailsService: TimelineItemDetailsService) { }

  ngOnInit() {
  }

  navigateToReader() {
    this.moveToReader.emit({ objectId: this.reader.identification.id });
  }

  toggleActivity() {
    this.toggle.emit(!this.activity.show);
  }

  expandDetails() {
    this.detailsService.expandDetails();
    this.details.emit(this.book);
  }

}
