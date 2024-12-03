import {NgModule} from '@angular/core';
import {CandidateService} from './candidate.service';
import {EmployerRoutesModule} from './candidate.routes';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MenuLeftComponent} from './menu-left/menu-left.component';
import {SharedModule} from '../share/share.module';
import {PdfViewerModule} from 'ng2-pdf-viewer';

@NgModule({
    imports: [EmployerRoutesModule, SharedModule, PdfViewerModule],
    declarations: [
        DashboardComponent,
        MenuLeftComponent,
    ],
    providers: [CandidateService],
    exports: [
        MenuLeftComponent
    ]
})
export class CandidateModule {
}
