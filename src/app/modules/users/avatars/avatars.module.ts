import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { avatarsReducer } from './store/avatar.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AvatarEffects } from './store/avatar.effects';
import { AvatarsFacade } from './store/avatars.facade';
import { ApiModule } from '../../api/api.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ApiModule,
    StoreModule.forFeature('avatars', avatarsReducer),
    EffectsModule.forFeature([AvatarEffects])
  ],
  providers: [AvatarEffects, AvatarsFacade]
})
export class AvatarsModule { }
