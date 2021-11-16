import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'book-description',
  templateUrl: './book-description.component.html',
  styleUrls: ['./book-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDescriptionComponent implements OnInit {

  public expanded: boolean = false;
  public maxDescriptionCount: number = 500;
  public readonly afterBigLetter: number = 1;

  constructor() { }

  @Input() description: string

  ngOnInit() {
  }

  public firstLetter() {
    if (this.description)
      return this.description.charAt(0);
  }

  public sliceDescription(from: number, to: number) {
    if (this.description)
      return this.description.slice(from, to);
  }

  public toggleExpand() {
    this.expanded = !this.expanded;
  }
}
