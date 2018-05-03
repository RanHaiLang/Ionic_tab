import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongzuoxukezhengListPage } from './gongzuoxukezheng-list';
import {GongzuoxukezhengPageModule} from "./gongzuoxukezheng/gongzuoxukezheng.module";
import {AddXukezhengMessagePageModule} from "./add-xukezheng-message/add-xukezheng-message.module";

@NgModule({
  declarations: [
    GongzuoxukezhengListPage,
  ],
  imports: [
    IonicPageModule.forChild(GongzuoxukezhengListPage),
    GongzuoxukezhengPageModule,
    AddXukezhengMessagePageModule
  ],
})
export class GongzuoxukezhengListPageModule {}
