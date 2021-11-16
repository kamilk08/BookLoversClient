import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RemoveTagChange } from './remove-tag.event';

@Component({
  selector: 'removable-tag',
  templateUrl: './removable-tag.component.html',
  styleUrls: ['./removable-tag.component.css']
})
export class RemovableTagComponent implements OnInit {

  @Input() tagText: string
  @Input() tagData: any;

  @Output() remove: EventEmitter<RemoveTagChange> = new EventEmitter<RemoveTagChange>();

  constructor() {

  }

  ngOnInit() {
  }

  removeTag() {
    this.remove.emit({ tag: this });
  }

}
