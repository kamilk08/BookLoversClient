import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Shelf } from 'src/app/modules/bookcases/models';
import { ShelfChange } from '../../events/shelf-change.event';

@Component({
  selector: 'shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss']
})
export class ShelfComponent implements OnInit {

  private _checked: boolean = false;

  get checked(): boolean {
    return this._checked;
  }
  set checked(flag: boolean) {
    this._checked = flag;
  }

  @Input() shelf: Shelf;

  @Output() selectShelf: EventEmitter<ShelfChange> = new EventEmitter<ShelfChange>();

  constructor() {
  }

  ngOnInit() {

  }

  onModelChange(checked: any) {
    this.selectShelf.emit({ shelf: this.shelf, selected: checked });
  }
}
