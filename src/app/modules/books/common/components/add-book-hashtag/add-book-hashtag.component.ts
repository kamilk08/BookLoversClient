import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CLOSEABLE_HASHTAG } from 'src/app/modules/shared/components/hash-tags/hash-tag-mode';
import { FormGroup } from '@angular/forms';
import { HashTagEvent } from './events/hash-tag.event';
import { BookHashTag, MAX_HASHTAG_LENGTH } from '../../../../api/books/models/book-hash-tag';

@Component({
  selector: 'add-book-hashtag',
  templateUrl: './add-book-hashtag.component.html',
  styleUrls: ['./add-book-hashtag.component.scss']
})
export class AddBookHashtagComponent implements OnInit, OnChanges {

  hashTags: BookHashTag[] = [];
  inputVisible = false;

  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;
  @Input() form: FormGroup = new FormGroup({});
  @Input() bookHashTags: BookHashTag[] = [];

  @Output() hashTagAdded: EventEmitter<HashTagEvent> = new EventEmitter<HashTagEvent>();
  @Output() hashTagRemoved: EventEmitter<HashTagEvent> = new EventEmitter<HashTagEvent>();

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.hashTags = this.bookHashTags;
  }

  close(hashTag: BookHashTag): void {
    this.hashTags = this.hashTags.filter(tag => tag !== hashTag);

    this.hashTagRemoved.emit({ hashTag: hashTag });
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      if (this.inputElement)
        this.inputElement.nativeElement.focus();
    }, 10);
  }

  addHashTag(): void {
    if (this.inputElement.nativeElement.value == '') {
      this.hideHashTagInput();
      return;
    }

    const hashTag: BookHashTag = { hashTagValue: this.inputElement.nativeElement.value };
    if (!this.isTooLong(hashTag.hashTagValue) && !this.isDuplicated(hashTag)) {
      this.hashTags = [...this.hashTags, hashTag];
    }
    else return;

    this.hideHashTagInput();

    this.hashTagAdded.emit({ hashTag: hashTag });
  }


  public getMode() {
    return CLOSEABLE_HASHTAG.mode;
  }

  private hideHashTagInput(): void {
    this.inputVisible = false;
    this.inputElement.nativeElement.value = '';
  }

  private isTooLong(value: string) {
    return value.length > MAX_HASHTAG_LENGTH() ? true : false;
  }

  private isDuplicated(hashTag: BookHashTag): boolean {
    let tag = this.hashTags.find(p => p.hashTagValue === hashTag.hashTagValue);
    return tag ? true : false;
  }

}
