import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'preview-bookcase-shelf',
  templateUrl: './preview-bookcase-shelf.component.html',
  styleUrls: ['./preview-bookcase-shelf.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewBookcaseShelfComponent implements OnInit {

  @Input() shelfName: any
  @Input() booksOnShelf: number
  @Input() shelfIcon: string
  @Input() hasBook: boolean

  constructor() { }


  ngOnInit() {
  }

}
