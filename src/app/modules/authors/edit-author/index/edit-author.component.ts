import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { SelectedImage } from 'src/app/modules/shared/models/selected-image';
import { Author } from '../../../api/authors/authors/models/author.model';
import { EditAuthorFacade } from '../store/edit-author.facade';
import { Sex, SEXES } from 'src/app/modules/shared';
import { SubCategory } from 'src/app/modules/api/books/models/sub-category.model';
import { FormGroup } from '@angular/forms';
import { FICTION_SUBCATEGORIES, NON_FICTION_SUBCATEGORIES } from 'src/app/modules/books/common/categories';

@Component({
  selector: 'edit-author-modal',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.scss']
})
export class EditAuthorComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  public fictionSubCategories: SubCategory[] = FICTION_SUBCATEGORIES;
  public nonFictionSubCategories: SubCategory[] = NON_FICTION_SUBCATEGORIES;
  public sexes: Sex[] = SEXES;

  public author?: Author

  constructor(
    public readonly modalRef: NzModalRef,
    public readonly facade: EditAuthorFacade) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.facade.resetEditAuthorForm();
  }

  ngOnInit() {
    if (this.author) this.facade.setAuthor(this.author);
  }

  onSubmit(form: FormGroup) {
    this.facade.submitEditAuthorForm(form);
    this.modalRef.destroy();
  }

  onClear() {
    this.facade.resetEditAuthorForm();
  }

  onImageSelect(file: SelectedImage) {
    this.facade.setAuthorImage(file);
  }
}
