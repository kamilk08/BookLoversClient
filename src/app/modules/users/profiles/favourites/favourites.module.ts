import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { favouritesModuleReducer, moduleEffects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { FavouritesFacade } from './store/favourites.facade';
import { ApiModule } from 'src/app/modules/api/api.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule,
    StoreModule.forFeature('favourites', favouritesModuleReducer),
    EffectsModule.forFeature([...moduleEffects])
  ],
  providers: [
    ...moduleEffects,
    FavouritesFacade
  ]
})
export class FavouritesModule { }
