import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {LoginPage} from './login';
import {HistoryUserPage} from "./history-user";

@NgModule({
  declarations: [
    LoginPage,
    HistoryUserPage
  ],
  entryComponents: [
    LoginPage,
    HistoryUserPage
  ],
  providers: [],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
