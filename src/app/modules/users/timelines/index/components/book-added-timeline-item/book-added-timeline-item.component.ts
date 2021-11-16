import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import { NavigateTo } from 'src/app/modules/shared/common/navigate-to';
import { TimeLineActivity } from '../../../../../api/timelines/models/timeline-activity.interface';
import { environment } from 'src/environments/environment';
import { Book } from 'src/app/modules/api/books/models';
import { TimelineItemDetailsService } from '../../services/timeline-item-details.service';

@Component({
  selector: 'book-added-timeline-item',
  templateUrl: './book-added-timeline-item.component.html',
  styleUrls: ['./book-added-timeline-item.component.scss'],
  providers: [TimelineItemDetailsService]
})
export class BookAddedTimeLineItemComponent implements OnInit {

  public readonly avatarUrl = (readerId: number) => `${environment.upload}/users/${readerId}/avatar`;


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
