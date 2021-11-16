import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  @Input() tagText: string

  constructor() { }

  ngOnInit() {
  }

}
