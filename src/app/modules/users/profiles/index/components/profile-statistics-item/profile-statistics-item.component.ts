import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'profile-statistics-item',
  templateUrl: './profile-statistics-item.component.html',
  styleUrls: ['./profile-statistics-item.component.scss']
})
export class ProfileStatisticsItemComponent implements OnInit {

  @Input() value: number
  @Input() text: string
  @Input() icon: any

  constructor() { }

  ngOnInit() {
  }

}
