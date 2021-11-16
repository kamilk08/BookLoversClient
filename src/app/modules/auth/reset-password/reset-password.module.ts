import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ApiModule } from "../../api/api.module";
import { SharedModule } from "../../shared/shared.module";
import { ResetPasswordComponent } from "./index/reset-password.component";
import { ResetPasswordRoutingModule } from "./reset-password.routing";
import { resetPasswordModuleReducer } from "./store";

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ApiModule,
    SharedModule,
    ResetPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('reset-password', resetPasswordModuleReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  providers: [
    ...fromEffects.effects,
    ...fromFacades.facades
  ]
})
export class ResetPasswordModule {

}
