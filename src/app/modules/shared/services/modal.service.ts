import { NzModalService, ModalOptionsForService } from 'ng-zorro-antd';
import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {

  private modalOptions: ModalOptionsForService

  constructor(private modalService: NzModalService) {
    this.modalOptions = {};
  }

  withTitle(title: string) {
    this.modalOptions.nzTitle = title;
    return this;
  }

  withWidth(width: string) {
    this.modalOptions.nzWidth = width;
    return this;
  }

  withContent(component: any) {
    this.modalOptions.nzContent = component;
    return this;
  }

  withFooter(component: any) {
    this.modalOptions.nzFooter = component;
    return this;
  }

  withoutFooter() {
    this.modalOptions.nzFooter = null;
    return this;
  }

  withParams(params: any) {
    this.modalOptions.nzComponentParams = params;
    return this;
  }

  isCloseable(flag: boolean) {
    this.modalOptions.nzClosable = flag;
    return this;
  }

  canBeClosedByEscapeButton(flag: boolean) {
    this.modalOptions.nzKeyboard = flag;

    return this;
  }

  openModal() {
    return this.modalService.create(this.modalOptions);
  }




}
