import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { StoreModule } from '@ngrx/store';
import { ErrorsRoutingModule } from './routing';
import { errorsStateReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ErrorsEffects } from './store/errors.effects';
import { ErrorsFacade } from './store/errors.facade';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorActions } from './services/error-actions.service';
import { UnAuthorizedInterceptor } from './services/unauthorized.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [ForbiddenComponent, UnauthorizedComponent, NotFoundComponent],
  imports: [
    CommonModule,
    ErrorsRoutingModule,
    StoreModule.forFeature('errors', errorsStateReducer),
    EffectsModule.forFeature([ErrorsEffects]),
    SharedModule
  ],
  providers: [
    ErrorsFacade,
    ErrorsEffects,
    ErrorActions,
    { provide: HTTP_INTERCEPTORS, useClass: UnAuthorizedInterceptor, multi: true }
  ]
})
export class ErrorsModule { }
