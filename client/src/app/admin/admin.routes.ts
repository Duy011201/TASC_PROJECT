import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from '../component/page-not-found/page-not-found.component';
import { UserComponent } from './user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { SETTING } from '../core/configs/setting.config';
import { CompanyComponent } from './company/company.component';
import { NotificationComponent } from './notification/notification.component';
import { PackageServiceComponent } from './package-service/package-service.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';

export const routes: Routes = [
  { path: '', redirectTo: SETTING.SYSTEM_PAGE.HEADER_HOME, pathMatch: 'full' },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_USER,
    component: UserComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_COMPANY,
    component: CompanyComponent,
  },
  // {
  //   path: SETTING.SYSTEM_PAGE.MANAGER_NOTIFICATION,
  //   component: NotificationComponent,
  // },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_SERVICE_PACK,
    component: PackageServiceComponent,
  },
  // {
  //   path: SETTING.SYSTEM_PAGE.MANAGER_RECRUITMENT,
  //   component: RecruitmentComponent,
  // },
  {
    path: SETTING.SYSTEM_PAGE.RELATED_404,
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutesModule {}
