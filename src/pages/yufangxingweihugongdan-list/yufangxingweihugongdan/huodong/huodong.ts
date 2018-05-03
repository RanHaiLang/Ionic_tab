import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {YufangxingweihugongdanListPage} from "../../yufangxingweihugongdan-list";
import {HuodongDetailPage} from "./huodong-detail/huodong-detail";
import {HttpService} from "../../../../prodivers/httpService";

/**
 * Generated class for the HuodongPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-huodong',
  templateUrl: 'huodong.html',
})
export class HuodongPage {

  huodonglist:any=[];
  gongdanDetail:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpService) {
    var key = this.navParams.get("key");
    if(key=='detail'){
      this.gongdanDetail.evt_code = this.navParams.get("evt_code")
      this.gongdanDetail.evt_rstatus = this.navParams.get("evt_rstatus")
      console.log(this.gongdanDetail)
    }else {
      this.gongdanDetail = this.navParams.get("yfxwhDetail");
    }
    this.getHuodongList();
  }

  //获取工单列表
  totalPage:number;//总页数
  getHuodongList(){
    var url = this.httpService.url+"/appEvent/evtpmwhacttext?evt_code="+this.gongdanDetail.evt_code+"&row=10";
    this.httpService.get(url).subscribe((res)=>{
      res = res.json();
      this.huodonglist = res['result'];
      this.totalPage = res['pageInf']['totalPage'];
    })
  }

  //下拉刷新
  doRefresh(refresher){
    this.pageNum = 1;
    var url = this.httpService.url+"/appEvent/evtpmwhacttext?evt_code="+this.gongdanDetail.evt_code+"&row=10";
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
  pageNum:number=1;
  doInfinite(infiniteScroll){
    if(this.totalPage>this.pageNum){
      this.pageNum += 1;
      var url = this.httpService.url + "/appEvent/evtpmwhacttext?evt_code=" + this.gongdanDetail.evt_code + "&pageNum=" + this.pageNum + "&row=10";
      setTimeout(() => {
        this.httpService.get(url).subscribe((res) => {
          let data = res.json();
          this.totalPage = data['pageInf']['totalPage'];
          for (let i = 0; i < data['result'].length; i++) {
            this.huodonglist.push(data['result'][i])
          }
        })
        infiniteScroll.complete();
      }, 2000);
    }else {
      infiniteScroll.complete();
    }
  }

  godetailpage(act_task,act_act,evt_code){
    this.navCtrl.push(HuodongDetailPage,{
      act_task:act_task,
      evt_code:evt_code,
      evt_rstatus:this.gongdanDetail.evt_rstatus,
      act_act:act_act
    });
  }
  backPage(){
    this.navCtrl.push(YufangxingweihugongdanListPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HuodongPage');
  }

}
