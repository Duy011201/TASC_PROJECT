import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {AuthRoutesModule} from './auth.routes.module';
import {RegisterComponent} from './register/register.component';
import {SharedModule} from "../share/share.module";

@NgModule({
  imports: [AuthRoutesModule, SharedModule],
  declarations: [LoginComponent, RegisterComponent],
  providers: [],
})
export class AuthModule {
}
