import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { AddAuthorDto } from 'src/app/modules/api/authors/add-author/models/add-author-dto.model';
import { AddAuthorPicture } from 'src/app/modules/api/authors/add-author/models/add-author-picture.model';
import { ALL_SUBCATEGORIES } from 'src/app/modules/books/common/categories';
import { SEXES } from 'src/app/modules/shared';
import { SolveTicketChange } from './events/solve-ticket-change';

@Component({
  selector: 'author-ticket-content',
  templateUrl: './author-ticket-content.component.html',
  styleUrls: ['./author-ticket-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class AuthorTicketContentComponent implements OnInit, OnChanges {
  public encodedImage: string;

  @Input() content: AddAuthorDto;
  @Input() image: AddAuthorPicture;
  @Input() manageable: boolean;

  @Output() solveTicket: EventEmitter<SolveTicketChange> = new EventEmitter<SolveTicketChange>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.image) {
      this.encodedImage = 'data:image/jpeg;base64,' + this.image.authorImage
    }
  }

  approveOrDeclineTicket(flag: boolean) {
    flag ? this.solveTicket.emit({
      approved: true,
      declined: false
    }) : this.solveTicket.emit({
      approved: false,
      declined: true
    });
  }


  getAuthorGenres() {
    if (this.content) {
      const genres = this.content.authorGenres.map(m => ALL_SUBCATEGORIES.find(f => f.id === m));
      return genres.map(s => s.name);
    }

    return [];
  }

  getSex() {
    if (this.content) {
      return SEXES.find(f => f.id === this.content.basics.sex);
    }

    return undefined;
  }

}
