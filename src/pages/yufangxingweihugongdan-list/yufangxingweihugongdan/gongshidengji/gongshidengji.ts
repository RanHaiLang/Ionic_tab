import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GongshiDetailPage} from "./gongshi-detail/gongshi-detail";
import {HttpService} from "../../../../prodivers/httpService";
import {YufangxingweihugongdanListPage} from "../../yufangxingweihugongdan-list";

/**
 * Generated class for the GongshidengjiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gongshidengji',
  templateUrl: 'gongshidengji.html',
})
export class GongshidengjiPage {

  gongdanDetail:any=[];
  gongshidengji:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpService) {
    //var key = this.navParams.get("key");
    this.gongdanDetail = this.navParams.get("yfxwhDetail");//获取详细信息
    this.getgongshiList();
  }

  //获取工时列表
  getgongshiList(){
    var url = this.httpService.url+"/actBh/list/bookHour?evt_code="+this.gongdanDetail.evt_code+"&row=10";
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.gongshidengji = data['result'];
      this.totalPage = data['pageInf']['totalPage'];
    })
  }

  //下拉刷新
  totalPage:number;//总页数
  pageNum:number=1;//当前页默认1
  doRefresh(refresher){
    this.pageNum=1;
    var url = this.httpService.url+"/actBh/list/bookHour?evt_code="+this.gongdanDetail.evt_code+"&row=10";
    setTimeout(() => {
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.gongshidengji = data['result'];
        this.totalPage = data['pageInf']['totalPage'];
      })
      refresher.complete();
    }, 2000);
  }

  //上拉加载
  doInfinite(infiniteScroll){
    if(this.totalPage>this.pageNum){
      this.pageNum+=1;
      var url = this.httpService.url + "/actBh/list/bookHour?evt_code="+this.gongdanDetail.evt_code+"&pageNum="+this.pageNum+"&row=10";
      setTimeout(() => {
        this.httpService.get(url).subscribe((res)=>{
          let data = res.json();
          this.totalPage = data['pageInf']['totalPage'];
          for(let i=0;i<data['result'].length;i++){
            this.gongshidengji.push(data['result'][i])
          }
        })
        infiniteScroll.complete();
      }, 2000);
    }else {
      infiniteScroll.complete();
    }
  }
  backPage(){
    this.navCtrl.push(YufangxingweihugongdanListPage)
  }
  goGongshiDetail(){
    this.navCtrl.push(GongshiDetailPage,{
      gongdanDetail:this.gongdanDetail
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GongshidengjiPage');
  }

}
