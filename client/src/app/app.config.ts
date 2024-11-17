import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';
import {routes} from './app.routes';
import {HttpClientModule, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideRouterStore} from '@ngrx/router-store';
import {userReducer} from "./ngrx/reducers/user.reducer";
import {UserEffect} from "./ngrx/effects/user.effect";
import {MessageService} from "primeng/api";
import {SharedModule} from "./share/share.module";
import {companyReducer} from "./ngrx/reducers/company.reducer";
import {CompanyEffect} from "./ngrx/effects/company.effect";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideStore({
      user: userReducer,
      company: companyReducer
    }),
    provideHttpClient(withInterceptorsFromDi()),
    provideEffects([UserEffect, CompanyEffect]),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()}),
    provideRouterStore(),
    MessageService,
    SharedModule,
  ],
};
