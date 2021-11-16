import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {

  public expanded: boolean = true;

  @Input() header: string;
  @Output() sectionExpand: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  expand() {
    this.expanded = !this.expanded;
    this.sectionExpand.emit(this.expanded);
  }
}
