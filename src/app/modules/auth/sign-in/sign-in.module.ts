import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SignInComponent } from './index/sign-in.component';
import { SignInRoutingModule } from './sign-in.routing';
import { signInPageReducer } from './store';
import { ApiModule } from '../../api/api.module';

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ApiModule,
    StoreModule.forFeature('sign-in', signInPageReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  providers: [
    ...fromEffects.effects,
    ...fromFacades.facades
  ]
})
export class SignInModule { }
