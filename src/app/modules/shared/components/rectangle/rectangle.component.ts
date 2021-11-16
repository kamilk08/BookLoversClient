import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent implements OnInit {

  public isActive: boolean;

  @Input() value: string;

  constructor() { }

  ngOnInit() {
  }

  activate() {
    this.isActive = !this.isActive;
  }
}
