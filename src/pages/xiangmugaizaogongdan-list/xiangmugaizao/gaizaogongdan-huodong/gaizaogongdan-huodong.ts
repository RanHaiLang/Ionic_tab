import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {XiangmugaizaogongdanListPage} from "../../xiangmugaizaogongdan-list";
import {GaizaogongdanHuodongDetailPage} from "./gaizaogongdan-huodong-detail/gaizaogongdan-huodong-detail";
import {HttpService} from "../../../../prodivers/httpService";
import {NativeService} from "../../../../prodivers/nativeService";

/**
 * Generated class for the GaizaogongdanHuodongPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gaizaogongdan-huodong',
  templateUrl: 'gaizaogongdan-huodong.html',
})
export class GaizaogongdanHuodongPage {

  huodonglist:any=[];
  xmgzgongdanDetail:any=[];//工单详情
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpService:HttpService,public alertCtrl:AlertController,
              public nativeService:NativeService) {
    var key = this.navParams.get("key");
    if(key=='detail'){
      this.xmgzgongdanDetail.evt_code = this.navParams.get("evt_code")
      this.xmgzgongdanDetail.evt_rstatus = this.navParams.get("evt_rstatus")
    }else {
      this.xmgzgongdanDetail = this.navParams.get("xmgzDetail");
    }

    this.getHuodongList();
  }

  backPage(){
    this.navCtrl.push(XiangmugaizaogongdanListPage)
  }

  //获取活动列表
  getHuodongList(){
    var url = this.httpService.url + "/appEvent/evtpmwhacttext?evt_code="+this.xmgzgongdanDetail.evt_code+"&row=10";
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.huodonglist = data['result'];
    })
  }

  pageNum:number=1;//当前页默认1
  totalPage:number;//总页数
  //下拉刷新
  doRefresh(refresher){
    this.pageNum=1;
    var url = this.httpService.url+"/appEvent/evtpmwhacttext?evt_code="+this.xmgzgongdanDetail.evt_code+"&row=10";
    setTimeout(() => {
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.huodonglist = data['result'];
        this.totalPage = data['pageInf']['totalPage'];
      })
      refresher.complete();
    }, 2000);
  }
  //上拉加载
  doInfinite(infiniteScroll){
    if(this.totalPage>this.pageNum){
      this.pageNum+=1;
      var url = this.httpService.url + "/appEvent/evtpmwhacttext?evt_code="+this.xmgzgongdanDetail.evt_code+"&pageNum="+this.pageNum+"&row=10";
      setTimeout(() => {
        this.httpService.get(url).subscribe((res)=>{
          let data = res.json();
          this.totalPage = data['pageInf']['totalPage'];
          for(let i=0;i<data['result'].length;i++){
            this.huodonglist.push(data['result'][i])
          }
        })
        infiniteScroll.complete();
      }, 2000);
    }else {
      infiniteScroll.complete();
    }
  }

  godetailpage(huodongDetail,key){
    this.navCtrl.push(GaizaogongdanHuodongDetailPage,{
      evt_code:this.xmgzgongdanDetail.evt_code,
      evt_rstatus:this.xmgzgongdanDetail.evt_rstatus,
      huodongDetail:huodongDetail,
      key:key
    })
  }

  //删除活动
  deleteHuodong(act_act){
    //操作确认提示
    let alert = this.alertCtrl.create({
      title: '操作提示',
      message: '确认删除？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            return ;
          }
        },
        {
          text: '确定',
          handler: () => {
            var url = this.httpService.url + "/appEvent/dleactevt";
            var body = "act_event="+this.xmgzgongdanDetail.evt_code+"&act_act="+act_act;
            console.log(body)
            this.httpService.post(url,body).subscribe((res)=>{
              let data = res.json();
              if(data['resultCode']==1){
                this.nativeService.showToast(data['message'])
                for(var i=0;i<this.huodonglist.length;i++){
                  if(this.huodonglist[i].act_act==act_act){
                    this.huodonglist.splice(i,1);
                  }
                }
              }else {
                this.nativeService.showToast(data['message'])
              }
            })
          }
        }
      ]
    });
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GaizaogongdanHuodongPage');
  }

}
