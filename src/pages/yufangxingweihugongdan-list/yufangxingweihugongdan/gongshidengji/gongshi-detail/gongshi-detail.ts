import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {GongshidengjiPage} from "../gongshidengji";
import {HttpService} from "../../../../../prodivers/httpService";
import {NativeService} from "../../../../../prodivers/nativeService";
import {SelectuserPage} from "../../../../../shared/selectuser/selectuser";
import {SelectHuodongPage} from "../../../../../shared/select-huodong/select-huodong";

/**
 * Generated class for the GongshiDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gongshi-detail',
  templateUrl: 'gongshi-detail.html',
})
export class GongshiDetailPage {

  gongdanDetail:any=[];
  gongshiDetail:any=[];
  hoursForm:any=[];
  key:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,
              public httpService:HttpService,public nativeService:NativeService,public modalCtrl:ModalController) {
    this.gongdanDetail = this.navParams.get("gongdanDetail");
    console.log(this.gongshiDetail)
    this.hoursForm = this.formBuilder.group({
      boo_act:[this.gongshiDetail.boo_act,Validators.required],//活动编号
      boo_person:[this.gongshiDetail.boo_person,Validators.required],//负责人代码
      per_desc:[this.gongshiDetail.per_desc,Validators.required],//负责人
      boo_hours:[this.gongshiDetail.boo_hours,Validators.required],//工时
      boo_date:[this.gongshiDetail.boo_date,Validators.required],//时间
      boo_mrc:[this.gongshiDetail.boo_mrc,Validators.required],//部门
      act_note:[this.gongshiDetail.act_note,Validators.required],//活动说明
    })
  }
  backPage(){
    this.navCtrl.popToRoot()
  }

  openTime(){
    this.nativeService.datePickerss().subscribe(date=>{
      console.log(date);
      this.hoursForm.controls['boo_date'].setValue(date)
    })
  }
  getName(){
    let modal = this.modalCtrl.create(SelectuserPage,{
      evt_code:this.gongdanDetail.evt_code
    });
    modal.onDidDismiss(data=>{
      this.hoursForm.controls['boo_person'].setValue(data.per_code);
      this.hoursForm.controls['per_desc'].setValue(data.per_desc);
      this.hoursForm.controls['boo_mrc'].setValue(data.per_mrc);
    });
    modal.present();
  }
  getHuodong(){
    let modal = this.modalCtrl.create(SelectHuodongPage,{
      evt_code:this.gongdanDetail.evt_code
    });
    modal.onDidDismiss(data=>{
      this.hoursForm.controls['act_note'].setValue(data.act_note);
      this.hoursForm.controls['boo_act'].setValue(data.act_act);
    });
    modal.present();
  }
  newHours(){
    //非空判断
    if(
      this.hoursForm.value.per_desc==null||this.hoursForm.value.per_desc==""||
      this.hoursForm.value.boo_act==null||this.hoursForm.value.boo_act==""||
      this.hoursForm.value.boo_hours==null||this.hoursForm.value.boo_hours==""||
      this.hoursForm.value.boo_date==null||this.hoursForm.value.boo_date==""
    ){
      this.nativeService.showToast("请填写*号部分")
    }else {
      //工作时间比工单创建时间晚
      var evt_created = new Date(this.gongdanDetail.evt_created).valueOf();
      var boo_date = new Date(this.hoursForm.value.boo_date).valueOf();
      if(evt_created>boo_date){
        this.nativeService.showToast("工作时间应晚于工单创建时间");
      }else {
        var url = this.httpService.url + "/actBh/insert/bookHour";
        let body = "boo_event=" + this.gongdanDetail.evt_code + "&boo_person=" + this.hoursForm.value.boo_person
          + "&boo_hours=" + this.hoursForm.value.boo_hours+"&boo_mrc="+this.hoursForm.value.boo_mrc
          +"&boo_date="+this.hoursForm.value.boo_date+"&boo_act="+this.hoursForm.value.boo_act;
        this.httpService.post(url,body).subscribe((res)=>{
          let data = res.json();
          console.log(data);
          if(data['resultCode']==1){
            this.nativeService.showToast(data['message']);
            this.navCtrl.setRoot(GongshidengjiPage,{
              key:'detail',
              gongdanDetail:this.gongdanDetail
            })
          }
        })
      }

    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GongshiDetailPage');
  }

}
