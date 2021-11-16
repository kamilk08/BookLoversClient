import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ApiModule } from "../../api/api.module";
import { SharedModule } from "../../shared/shared.module";
import { PasswordTokenComponent } from "./index/password-token.component";
import { PasswordTokenRoutingModule } from "./password-token.routing";
import { generateTokenModuleReducer } from "./store";

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [
    PasswordTokenComponent
  ],
  imports: [
    CommonModule,
    PasswordTokenRoutingModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('generate-token', generateTokenModuleReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  providers: [
    ...fromEffects.effects,
    ...fromFacades.facades

  ]
})
export class PasswordTokenModule {

}
