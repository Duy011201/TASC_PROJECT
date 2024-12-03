import {NgModule} from '@angular/core';
import {EmployerService} from './employer.service';
import {EmployerRoutesModule} from './employer.routes';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MenuLeftComponent} from './menu-left/menu-left.component';
import {NotificationComponent} from './notification/notification.component';
import {CartComponent} from './cart/cart.component';
import {DialogCartComponent} from './cart/dialog/dialog.component';
import {HistoryComponent} from './history/history.component';
import {SharedModule} from '../share/share.module';
import {RecruitmentComponent} from './recruitment/recruitment.component';
import {DialogRecruitmentComponent} from './recruitment/dialog/dialog.component';
import {RecruitmentProcessComponent} from "./recruitment-process/recruitment-process.component";
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {DialogCompanyComponent} from "./dashboard/dialog/dialog.component";

@NgModule({
  imports: [EmployerRoutesModule, SharedModule, PdfViewerModule],
  declarations: [
    DashboardComponent,
    MenuLeftComponent,
    NotificationComponent,
    CartComponent,
    DialogCartComponent,
    HistoryComponent,
    RecruitmentComponent,
    DialogRecruitmentComponent,
    RecruitmentProcessComponent,
    DialogCompanyComponent,
  ],
  providers: [EmployerService],
  exports: [
    MenuLeftComponent
  ]
})
export class EmployerModule {
}
