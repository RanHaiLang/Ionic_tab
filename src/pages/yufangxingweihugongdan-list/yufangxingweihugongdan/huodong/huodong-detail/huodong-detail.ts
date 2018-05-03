import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HuodongPage} from "../huodong";
import {HttpService} from "../../../../../prodivers/httpService";
import {NativeService} from "../../../../../prodivers/nativeService";

/**
 * Generated class for the HuodongDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-huodong-detail',
  templateUrl: 'huodong-detail.html',
})
export class HuodongDetailPage {

  act_task:string;//任务号
  evt_code:string;//单号
  evt_rstatus:string;//工单状态
  act_act:string;//序列号
  huodongDetail:any=[];
  weibaoSop:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpService,
              public nativeService:NativeService) {
    this.act_task = this.navParams.get("act_task");
    this.evt_code = this.navParams.get("evt_code");
    this.evt_rstatus = this.navParams.get("evt_rstatus");
    this.act_act = this.navParams.get("act_act");
    this.getDetail();
  }

  //获取活动详情
  getDetail(){
    var url = this.httpService.url+"/adDetail/task/detail?task_code="+this.act_task+"&evt_code="+this.evt_code+"&act_act="+this.act_act;
    this.httpService.get(url).subscribe((res)=>{
      res = res.json();
      this.huodongDetail = res['activity'];
      if(res['result']['add_text']!=null){
        this.weibaoSop = res['result']['add_text'].split("\n");
        console.log(this.weibaoSop)
        this.weibaoSop = this.weibaoSop.splice(0,this.weibaoSop.length-1)
      }
    })
  }
  backPage(){
    this.navCtrl.popToRoot();
  }
  openTime(key){
    this.nativeService.datePickersss().subscribe(date=>{
      console.log(date);
      if(key=='act_start'){
        this.huodongDetail.act_start = date
      }else if(key=='actjs'){
        this.huodongDetail.actjs = date;
      }
    })
  }
  submitHuodong(){
    //非空判断
    if(
      this.huodongDetail.act_start==null||this.huodongDetail.act_start==""||
      this.huodongDetail.actjs==null||this.huodongDetail.actjs==""||
      this.huodongDetail.act_note==null||this.huodongDetail.act_note==""
    ){
      this.nativeService.showToast("请填写*号部分")
    }else {
      var act_start = new Date(this.huodongDetail.act_start).valueOf();
      var actjs = new Date(this.huodongDetail.actjs).valueOf();
      if(act_start>actjs){
        this.nativeService.showToast("开始日期必须早于结束日期");
      }else {
        var url = this.httpService.url + "/appEvent/updateactevt";
        let body = "act_event="+this.evt_code+"&act_note="+this.huodongDetail.act_note
          +"&actjs="+this.huodongDetail.actjs+"&act_start="+this.huodongDetail.act_start
          +"&act_act="+this.huodongDetail.act_act;
        this.httpService.post(url,body).subscribe((res)=>{
          let data = res.json();
          if(data['resultCode']==1){
            this.nativeService.showToast(data['message']);
            this.navCtrl.setRoot(HuodongPage,{
              key:'detail',
              evt_code:this.evt_code,
              evt_rstatus:this.evt_rstatus
            })
          }else {
            this.nativeService.showToast(data['message']);
          }
        })
      }
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HuodongDetailPage');
  }

}
