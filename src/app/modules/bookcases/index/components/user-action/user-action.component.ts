import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserActionComponent implements OnInit {

  @Input() toolTipText: string;
  @Input() icon: any;

  constructor() { }

  ngOnInit() {
  }

}
