import {NgModule} from '@angular/core';
import {EmployerService} from './employer.service';
import {EmployerRoutesModule} from './employer.routes';
import {MenuLeftComponent} from './menu-left/menu-left.component';
import {CartComponent} from './cart/cart.component';
import {DialogCartComponent} from './cart/dialog/dialog.component';
import {SharedModule} from '../share/share.module';
import {RecruitmentComponent} from './recruitment/recruitment.component';
import {DialogRecruitmentComponent} from './recruitment/dialog/dialog.component';
import {RecruitmentProcessComponent} from "./recruitment-process/recruitment-process.component";
import {PdfViewerModule} from 'ng2-pdf-viewer';

@NgModule({
  imports: [EmployerRoutesModule, SharedModule, PdfViewerModule],
  declarations: [
    MenuLeftComponent,
    CartComponent,
    DialogCartComponent,
    RecruitmentComponent,
    DialogRecruitmentComponent,
    RecruitmentProcessComponent,
  ],
  providers: [EmployerService],
  exports: [
    MenuLeftComponent
  ]
})
export class EmployerModule {
}
