import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';
import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideRouterStore} from '@ngrx/router-store';
import {userReducer} from "./ngrx/reducers/user.reducer";
import {UserEffect} from "./ngrx/effects/user.effect";
import {MessageService} from "primeng/api";
import {SharedModule} from "./share/share.module";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideStore(),
    provideEffects(),
    provideStore({user: userReducer}),
    provideEffects([UserEffect]),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()}),
    provideRouterStore(),
    MessageService,
    SharedModule
  ],
};
