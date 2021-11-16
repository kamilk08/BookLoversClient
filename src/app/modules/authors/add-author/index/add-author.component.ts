import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { SubCategory } from 'src/app/modules/api/books/models/sub-category.model';
import { FICTION_SUBCATEGORIES, NON_FICTION_SUBCATEGORIES } from 'src/app/modules/books/common/categories';
import { Sex, SEXES } from 'src/app/modules/shared';
import { SelectedImage } from 'src/app/modules/shared/models/selected-image';
import { AddAuthorFacade } from '../store/add-author-state/add-author.facade';


@Component({
  selector: 'add-author-modal',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss'],
})
export class AddAuthorComponent implements OnInit, OnDestroy {

  public readonly fictionSubCategories: SubCategory[] = FICTION_SUBCATEGORIES;
  public readonly nonFictionSubCategories: SubCategory[] = NON_FICTION_SUBCATEGORIES;
  public readonly sexes: Sex[] = SEXES;

  constructor(
    public readonly modalRef: NzModalRef,
    public readonly facade: AddAuthorFacade) { }

  ngOnDestroy(): void {

    this.facade.resestAddAuthorForm();
    this.modalRef.destroy();
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    this.facade.submitForm(form);

    this.modalRef.destroy();
  }

  onClear() {
    this.facade.resestAddAuthorForm();
  }

  onImageSelect(file: SelectedImage) {
    this.facade.setAuthorImage(file);
  }
}
