import {NgModule} from '@angular/core';
import {AdminRoutesModule} from './admin.routes';
import {MenuLeftComponent} from './menu-left/menu-left.component';
import {UserComponent} from './user/user.component';
import {SharedModule} from '../share/share.module';
import {SkeletonModule} from "primeng/skeleton";
import {DialogUserComponent} from "./user/dialog/dialog.component";

@NgModule({
  imports: [AdminRoutesModule, SharedModule, SkeletonModule],
  declarations: [
    MenuLeftComponent,
    UserComponent,
    DialogUserComponent
  ],
  providers: [],
})
export class AdminModule {
}
