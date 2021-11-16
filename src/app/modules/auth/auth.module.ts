import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserAdapter } from '../api/auth/user.adapter';
import { StoreModule } from '@ngrx/store';
import { authModuleReducer, moduleEffects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { AuthFacade } from './store/auth-state/auth.facade';
import { ReaderGuard } from './guards/reader.guard';
import { TokenRefreshingModule } from './refreshing/token-refreshing.module';
import { LibrarianGuard } from './guards/librarian.guard';
import { AuthService } from './services/auth.service';
import { CookiesService } from './services/cookies.service';
import { TokenService } from './services/token.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    TokenRefreshingModule,
    SharedModule,
    StoreModule.forFeature('auth', authModuleReducer),
    EffectsModule.forFeature(moduleEffects),
  ],
  exports: [],
  providers: [
    AuthFacade,
    AuthService,
    TokenService,
    CookiesService,
    UserAdapter,
    ReaderGuard,
    LibrarianGuard
  ]
})
export class AuthModule { }
