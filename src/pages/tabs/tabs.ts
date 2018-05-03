import {Component, ViewChild} from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {Tabs, NavParams} from "ionic-angular";
import {SampleSignaturepadPage} from "../../shared/sample-signaturepad/sample-signaturepad";
import {MenuPage} from "../menu/menu";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MenuPage;
  tab3Root = ContactPage;

  selectedIndex:number=0
  @ViewChild('mainTabs') tabs:Tabs;
  constructor(public navParam:NavParams) {
    this.selectedIndex = this.navParam.get("selectedIndex")
  }
}
