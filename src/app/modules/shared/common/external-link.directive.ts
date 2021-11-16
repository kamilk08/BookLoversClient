import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
  selector: '[externalLink]'
})
export class ExternalLinkDirective implements OnChanges {

  @Input() link: string

  constructor(private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.link, 'link');
    if (this.link) {
      if (this.link.startsWith('https')) {
        this.el.nativeElement.href = this.link;
        return;
      }
      else {
        this.link = '//' + this.link;;
        this.el.nativeElement.href = this.link;
        return;
      }
    }
  }

}
