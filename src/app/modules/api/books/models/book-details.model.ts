import { Language } from './language.model';
import { BOOK_LANGUAGES } from '../../../books/common/languages';

export class BookDetails {
    pages: number
    language: Language


    constructor(pages: number, languageId: number) {
        this.pages = pages;
        this.language = BOOK_LANGUAGES.find(p => p.id === languageId);
    }
}
