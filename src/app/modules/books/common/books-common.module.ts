import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";

import * as fromCommon from './index';

@NgModule({
  declarations: [
    ...fromCommon.entryComponents,
    ...fromCommon.components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule

  ],
  providers: [...fromCommon.commonServices],
  exports: [...fromCommon.components, ...fromCommon.entryComponents],
  entryComponents: [...fromCommon.entryComponents]
})
export class BooksCommonModule {

}
