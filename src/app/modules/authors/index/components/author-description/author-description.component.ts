import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'author-description',
  templateUrl: './author-description.component.html',
  styleUrls: ['./author-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorDescriptionComponent implements OnInit {

  public expanded: boolean = false;

  public readonly maxDescriptionCount: number = 500;
  public readonly afterBigLetter: number = 1;

  @Input() description: string;
  @Input() descriptionSource: string

  constructor() { }

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
