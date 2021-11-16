import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { editShelfReducer } from './store/edit-shelf.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { EditShelfComponent } from './index/edit-shelf.component';
import { EditShelfsNameService } from './index/services/edit-shelfs-name.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [EditShelfComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('edit-shelf', editShelfReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  providers:

    [...fromEffects.effects, ...fromFacades.facades,
      EditShelfsNameService],
  entryComponents: [EditShelfComponent]
})
export class EditShelfModule { }
