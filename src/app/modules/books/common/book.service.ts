import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Author } from '../../api/authors/authors/models/author.model';
import { Publisher } from '../../api/publishers/models/publisher.model';
import { Series } from '../../api/series/models/series.model';
import { SubCategory } from '../../api/books/models/sub-category.model';
import { Language, BookBuilder, BookPublisher, BookHashTag, BookBasics, BookAuthor, BookSeries, BookCover, BookPublisherCycle, BookDescription, BookDetails } from '../../api/books/models';
import { CoverType } from '../../api/books/models/cover-type';
import { SelectedImage } from '../../shared/models/selected-image';
import { PublisherCycle } from '../../api/cycles/models/publisher-cycle.model';
import { AuthService } from '../../auth/services/auth.service';

export abstract class BookService {

  public bookForm: FormGroup;

  constructor(private bookBuilder: BookBuilder, private authService: AuthService) {
    this.createBookForm();
  }

  public buildBook() {
    const bookBasics = this.getBookBasics();
    const publishedBy: BookPublisher = this.getBookPublisher();

    const book = this.bookBuilder.initialize(bookBasics, this.getAuthorsIds(), publishedBy)
      .withCover(this.getBookCover())
      .withCycles(this.getPublisherCycles().map(s => new BookPublisherCycle(s.identification.id, s.identification.guid)))
      .withDescritpion(this.getBookDescription())
      .withDetails(this.getBookDetails())
      .withSeries(this.getSeries())
      .withAddedBy(this.authService.userId, this.authService.userGuid)
      .withHashTags(this.bookForm.get('hashTags').value)
      .getBook();

    return book;
  }


  public getCoverFile() {
    const selectedImage = this.bookForm.get('cover').value as SelectedImage;
    return selectedImage === null ? '' : selectedImage.encodedImage;
  }

  public getCoverFileName() {
    const selectedImage = this.bookForm.get('cover').value as SelectedImage;
    return selectedImage === null ? '' : selectedImage.fileName;
  }


  public getBookHashTags() {
    return this.bookForm.get('hashTags').value as BookHashTag[];
  }

  public getBookBasics() {
    const title = this.bookForm.get('title').value;
    const isbn = this.bookForm.get('isbn').value;
    const subCategory = this.bookForm.get('category').value as SubCategory;

    return new BookBasics(title, isbn, subCategory);
  }

  public getAuthorsIds() {
    const authors = this.bookForm.get('authors').value as Author[];
    return authors.map(v => new BookAuthor(v.identification.id, v.identification.guid));
  }

  public getSeries() {
    const series = this.bookForm.get('series').value as Series;
    const seriesPosition = this.bookForm.get('seriesPosition').value;
    return series ? new BookSeries(series.identification.id, series.identification.guid, seriesPosition) : BookSeries.EmptySeries()
  }

  public getBookCover() {
    const coverType = this.bookForm.get('coverType').value as CoverType;
    const coverSource = this.bookForm.get('coverSource').value;
    const isCoverAdded = this.bookForm.get('isCoverAdded').value;

    return new BookCover(coverType.id, coverSource, isCoverAdded);
  }

  public getPublisherCycles() {
    const publisherCycles = this.bookForm.get('publisherCycles').value as PublisherCycle[];
    if (publisherCycles)
      return publisherCycles.filter(f => f !== undefined) as PublisherCycle[];

    return [];
  }

  public getBookDescription() {
    const description = this.bookForm.get('description').value;
    const source = this.bookForm.get('descriptionSource').value;

    return new BookDescription(description, source);
  }

  public getBookDetails() {
    const pages = this.bookForm.get('pages').value;
    const language = this.bookForm.get('language').value as Language;

    return new BookDetails(pages, language.id);
  }

  public removeHashTag(tag: BookHashTag) {
    const hashTags = this.getBookHashTags();
    const index = hashTags.findIndex(f => f === tag);
    hashTags.splice(index, 1);
    return hashTags;
  }

  public addHashTag(hashTag: BookHashTag) {
    const hashTags = this.getBookHashTags();
    hashTags.push(hashTag);
    return hashTags;
  }

  private createBookForm() {
    this.bookForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      authors: new FormControl([], [Validators.required]),
      publisher: new FormControl(null, [Validators.required]),
      published: new FormControl(null, []),
      isbn: new FormControl('', [Validators.required, Validators.maxLength(13)]),
      category: new FormControl(null, [Validators.required]),
      description: new FormControl('', [Validators.maxLength(2083)]),
      descriptionSource: new FormControl('', []),
      series: new FormControl(null),
      seriesPosition: new FormControl('', [Validators.min(1)]),
      publisherCycles: new FormControl([], []),
      hashTags: new FormControl([]),
      language: new FormControl(null, [Validators.min(0), Validators.max(2)]),
      pages: new FormControl(null, [Validators.min(1)]),
      coverSource: new FormControl(''),
      isCoverAdded: new FormControl(false, [Validators.required]),
      coverType: new FormControl(null, [Validators.min(1), Validators.max(3)]),
      cover: new FormControl(null)
    })
  }

  private getBookPublisher() {
    const publisher = this.bookForm.get('publisher').value as Publisher;
    const publishedBy: BookPublisher = {
      publisherId: null,
      publisherGuid: publisher.identification.guid,
      published: this.bookForm.get('published').value
    };
    return publishedBy;
  }

}
