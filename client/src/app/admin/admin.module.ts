import {NgModule} from '@angular/core';
import {AdminService} from './admin.service';
import {AdminRoutesModule} from './admin.routes';
import {MenuLeftComponent} from './menu-left/menu-left.component';
import {UserComponent} from './user/user.component';
import {CompanyComponent} from './company/company.component';
import {DialogUserComponent} from './user/dialog/dialog.component';
import {DialogCompanyComponent} from './company/dialog/dialog.component';
import {NotificationComponent} from './notification/notification.component';
import {PackageServiceComponent} from './package-service/package-service.component';
import {DialogServiceDialogComponent} from './package-service/dialog/dialog.component';
import {SharedModule} from '../share/share.module';
import {RecruitmentComponent} from './recruitment/recruitment.component';
import {DialogRecruitmentComponent} from './recruitment/dialog/dialog.component';
import {SkeletonModule} from "primeng/skeleton";

@NgModule({
    imports: [AdminRoutesModule, SharedModule, SkeletonModule],
  declarations: [
    MenuLeftComponent,
    UserComponent,
    DialogUserComponent,
    CompanyComponent,
    DialogCompanyComponent,
    NotificationComponent,
    PackageServiceComponent,
    DialogServiceDialogComponent,
    RecruitmentComponent,
    DialogRecruitmentComponent,
  ],
  providers: [AdminService],
})
export class AdminModule {
}
