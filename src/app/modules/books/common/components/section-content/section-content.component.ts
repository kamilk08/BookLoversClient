import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'section-content',
  templateUrl: './section-content.component.html',
  styleUrls: ['./section-content.component.css']
})
export class SectionContentComponent implements OnInit {

  @Input() expand: boolean;

  constructor() { }

  ngOnInit() {
  }

}
