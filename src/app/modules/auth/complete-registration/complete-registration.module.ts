import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { verifyAccountModuleReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CompleteRegistrationRouting } from './complete-registration.routing';
import { VerifyAccountComponent } from './index/verify-account.component';
import { ApiModule } from '../../api/api.module';

import * as fromEffects from './store/module.effects';
import * as fromFacades from './store/module.facades';

@NgModule({
  declarations: [VerifyAccountComponent],
  imports: [
    CommonModule,
    CompleteRegistrationRouting,
    ApiModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    StoreModule.forFeature('verify-account', verifyAccountModuleReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects)
  ],
  exports: [],
  providers: [
    ...fromFacades.moduleFacades,
    ...fromEffects.moduleEffects
  ]
})
export class CompleteRegistrationModule { }
