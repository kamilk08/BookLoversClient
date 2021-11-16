import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrariansRoutingModule } from './routing.module';
import { StoreModule } from '@ngrx/store';
import { librarianModuleReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { LibrariansFacade } from './store/librarians.facade';
import { ApiModule } from '../api/api.module';

import * as fromEffects from './module.effects';
import { AuthModule } from '../auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../auth/interceptors/token.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule,
    LibrariansRoutingModule,
    AuthModule,
    StoreModule.forFeature('librarians', librarianModuleReducer),
    EffectsModule.forFeature(fromEffects.effects),
    SharedModule
  ],
  exports: [],
  providers: [LibrariansFacade, ...fromEffects.effects
  ]
})
export class LibrariansModule { }
