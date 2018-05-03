import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";

/**
 * Generated class for the AddGongshidengjiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-gongshidengji',
  templateUrl: 'add-gongshidengji.html',
})
export class AddGongshidengjiPage {

  hoursForm:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder:FormBuilder) {
    this.hoursForm = this.formBuilder.group({
        employee:['',Validators.required],
        hours:['',Validators.required]
    })
  }

  backPage(){
    this.navCtrl.popToRoot();
  }

  addHours(){
    console.log("nihao "+this.hoursForm.value.employee+":"+this.hoursForm.value.hours)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGongshidengjiPage');
  }

}
