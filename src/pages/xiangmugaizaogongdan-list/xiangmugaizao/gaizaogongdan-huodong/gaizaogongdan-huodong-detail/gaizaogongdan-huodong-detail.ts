import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GaizaogongdanHuodongPage} from "../gaizaogongdan-huodong";
import {NativeService} from "../../../../../prodivers/nativeService";
import {HttpService} from "../../../../../prodivers/httpService";

/**
 * Generated class for the GaizaogongdanHuodongDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gaizaogongdan-huodong-detail',
  templateUrl: 'gaizaogongdan-huodong-detail.html',
})
export class GaizaogongdanHuodongDetailPage {

  huodongDetail:any=[];
  evt_code:string;
  evt_rstatus:string;
  key:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public nativeService:NativeService,public httpService:HttpService) {
    this.key = this.navParams.get("key")
    this.evt_code = this.navParams.get("evt_code");
    this.evt_rstatus = this.navParams.get("evt_rstatus");
    if(this.key=='detail'){//查看详情
      this.huodongDetail = this.navParams.get("huodongDetail");
    }else if(this.key=='new'){
      this.huodongDetail.act_act = '自动生成'
    }
  }
  backPage(){
    this.navCtrl.popToRoot();
  }

  openTime(key){
    this.nativeService.datePickersss().subscribe(date=>{
      console.log(date);
      if(key=='act_start'){
        this.huodongDetail.act_start = date
      }else if(key=='act_udfdate01'){
        this.huodongDetail.act_udfdate01 = date;
      }
    })
  }
  submitHuodong(){
    //非空判断
    if(this.huodongDetail.act_note==null||this.huodongDetail.act_note==""||
      this.huodongDetail.act_udfdate01==null||this.huodongDetail.act_udfdate01==""||
      this.huodongDetail.act_start==null||this.huodongDetail.act_start==""){
      this.nativeService.showToast("请填写*号部分")
    }else {
      var act_start = new Date(this.huodongDetail.act_start).valueOf();//开始时间
      var act_udfdate01 = new Date(this.huodongDetail.act_udfdate01).valueOf();//结束时间
      if(act_start>act_udfdate01){
        this.nativeService.showToast("开始时间必须早于结束时间")
      }else {
        var url = this.httpService.url + "/appEvent/updateactevt";
        let body = "act_event="+this.evt_code+"&act_note="+this.huodongDetail.act_note
          +"&act_udfdate01="+this.huodongDetail.act_udfdate01+"&act_start="+this.huodongDetail.act_start
          +"&act_act="+this.huodongDetail.act_act;
        this.httpService.post(url,body).subscribe((res)=>{
          let data = res.json();
          if(data['resultCode']==1){
            this.nativeService.showToast(data['message']);
            this.navCtrl.setRoot(GaizaogongdanHuodongPage,{
              key:'detail',
              evt_code:this.evt_code
            })
          }else {
            this.nativeService.showToast(data['message']);
          }
        })
      }
    }
  }
  newHuodong(){
    //非空判断
    if(this.huodongDetail.act_note==null||this.huodongDetail.act_note==""||
      this.huodongDetail.act_udfdate01==null||this.huodongDetail.act_udfdate01==""||
      this.huodongDetail.act_start==null||this.huodongDetail.act_start==""){
      this.nativeService.showToast("请填写*号部分")
    }else {
      var act_start = new Date(this.huodongDetail.act_start).valueOf();//开始时间
      var act_udfdate01 = new Date(this.huodongDetail.act_udfdate01).valueOf();//结束时间

      var url = this.httpService.url + "/appEvent/insetactevt";
      let body = "act_event="+this.evt_code+"&act_note="+this.huodongDetail.act_note
        +"&act_udfdate01="+this.huodongDetail.act_udfdate01+"&act_start="+this.huodongDetail.act_start;
      this.httpService.post(url,body).subscribe((res)=>{
        let data = res.json();
        if(data['resultCode']==1){
          this.nativeService.showToast(data['message']);
          this.navCtrl.setRoot(GaizaogongdanHuodongPage,{
            key:'detail',
            evt_code:this.evt_code
          })
        }else {
          this.nativeService.showToast(data['message']);
        }
      })
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GaizaogongdanHuodongDetailPage');
  }

}
