import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'book-publisher',
  templateUrl: './book-publisher.component.html',
  styleUrls: ['./book-publisher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookPublisherComponent implements OnInit {

  public publisherLink = '/publisher';

  @Input() publisherName: string
  @Input() publisherId: number;

  constructor() { }

  ngOnInit() {
  }

}
