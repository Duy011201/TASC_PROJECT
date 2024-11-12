import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {SETTING} from './core/configs/setting.config';

export const routes: Routes = [
  {path: '', redirectTo: SETTING.SYSTEM_PAGE.HEADER_HOME, pathMatch: 'full'},
  {
    path: SETTING.SYSTEM_PAGE.RELATED_AUTH,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    data: {showHeader: false, showFooter: false},
  },
  {
    path: SETTING.SYSTEM_PAGE.RELATED_404,
    component: PageNotFoundComponent,
    data: {showHeader: true, showFooter: true},
  },
];
