import { FormGroup } from "@angular/forms";
import { Author } from "src/app/modules/api/authors/authors/models/author.model";
import { Publisher } from "src/app/modules/api/publishers/models/publisher.model";
import { Series } from "src/app/modules/api/series/models/series.model";
import { SelectedImage } from "src/app/modules/shared/models/selected-image";
import { BookAuthor, BookBasics, BookCover, BookDescription, BookDetails, BookHashTag, BookPublisher, BookSeries, Language } from "../../../api/books/models";
import { CoverType } from "../../../api/books/models/cover-type";
import { SubCategory } from "../../../api/books/models/sub-category.model";
import { PublisherCycle } from "src/app/modules/api/cycles/models/publisher-cycle.model";
import { BOOK_LANGUAGES } from "../../common/languages";

export class BookFormExtensions {

  static bookBasics(form: FormGroup) {
    const title = form.get('title').value;
    const isbn = form.get('isbn').value;
    const subCategory = form.get('category').value as SubCategory;

    return new BookBasics(title, isbn, subCategory);
  }

  static bookAuthors(form: FormGroup) {
    const authors = form.get('authors').value as Author[];
    return authors.map(v => new BookAuthor(v.identification.id, v.identification.guid));
  }

  static bookSeries(form: FormGroup) {
    const series = form.get('series').value as Series;
    const seriesPosition = form.get('seriesPosition').value;
    return series ? new BookSeries(series.identification.id, series.identification.guid, seriesPosition) : BookSeries.EmptySeries()
  }

  static bookHashTags(form: FormGroup) {
    return form.get('hashTags').value as BookHashTag[];
  }

  static bookPublisher(form: FormGroup) {
    const publisher = form.get('publisher').value as Publisher;
    const publishedBy: BookPublisher = {
      publisherId: null,
      publisherGuid: publisher.identification.guid,
      published: form.get('published').value
    };
    return publishedBy;
  }

  static bookCover(form: FormGroup) {
    const coverType = form.get('coverType').value as CoverType;
    const coverSource = form.get('coverSource').value;
    const isCoverAdded = form.get('isCoverAdded').value;

    return new BookCover(coverType === null ? -1 : coverType.id, coverSource, isCoverAdded);
  }

  static bookCycles(form: FormGroup) {
    const publisherCycles = form.get('publisherCycles').value as PublisherCycle[];
    if (publisherCycles)
      return publisherCycles.filter(f => f !== undefined) as PublisherCycle[];

    return [];
  }

  static bookDescription(form: FormGroup) {
    const description = form.get('description').value;
    const source = form.get('descriptionSource').value;

    return new BookDescription(description, source);
  }

  static bookDetails(form: FormGroup) {
    const pages = form.get('pages').value;
    const language = form.get('language').value as Language;

    return new BookDetails(pages, language === null ? BOOK_LANGUAGES[0].id : language.id);
  }

  static coverFile(form: FormGroup) {
    const selectedImage = form.get('cover').value as SelectedImage;
    return selectedImage === null ? '' : selectedImage.encodedImage;
  }

  static coverFileName(form: FormGroup) {
    const selectedImage = form.get('cover').value as SelectedImage;
    return selectedImage === null ? '' : selectedImage.fileName;
  }

}
