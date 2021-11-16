import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ShelfRecord } from 'src/app/modules/api/bookcases/shelf-records/models/shelf-record.model';

@Component({
  selector: 'shelf-record',
  templateUrl: './shelf-record.component.html',
  styleUrls: ['./shelf-record.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShelfRecordComponent implements OnInit {

  @Input() shelfRecord: ShelfRecord;

  constructor() { }

  ngOnInit() {
  }

}
