import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRouting } from './routing';
import { AuthModule } from './modules/auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromIndex from './store/index';
import { SharedModule } from './modules/shared/shared.module';
import { NZ_I18N, en_US, NgZorroAntdModule } from 'ng-zorro-antd';
import { BookcasesModule } from './modules/bookcases/bookcases.module';
import './modules/shared/common/exntensions';
import { ClassificationModule } from './modules/classification/classification.module';
import { ErrorsModule } from './modules/errors/errors.module';
import { RouterModule } from './modules/router/router.module';
import { LibrariansModule } from './modules/librarians/librarians.module';
import { ReadersModule } from './modules/users/readers/readers.module';
import { UnAuthorizedInterceptor } from './modules/errors/services/unauthorized.interceptor';
import { TokenInterceptor } from './modules/auth/interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    RouterModule,
    AuthModule,
    SharedModule,
    ClassificationModule,
    ErrorsModule,
    LibrariansModule,
    ReadersModule,
    BookcasesModule,
    StoreModule.forRoot(fromIndex.appReducersMap),
    EffectsModule.forRoot([])
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
  { provide: HTTP_INTERCEPTORS, useClass: UnAuthorizedInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
