import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {XukejianchaxiangDetailPage} from "./xukejianchaxiang-detail/xukejianchaxiang-detail";
import {GongzuoxukezhengPage} from "../gongzuoxukezheng";
import {HttpService} from "../../../../prodivers/httpService";
import {GongzuoxukezhengListPage} from "../../gongzuoxukezheng-list";

/**
 * Generated class for the GongzuoxukezhengXukejianchaxiangPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gongzuoxukezheng-xukejianchaxiang',
  templateUrl: 'gongzuoxukezheng-xukejianchaxiang.html',
})
export class GongzuoxukezhengXukejianchaxiangPage {

  xukezhengjiancha:any=[]
  gzxkzgdDetail:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpService) {
    this.gzxkzgdDetail = this.navParams.get("gzxkzgdDetail");//获取详细信息
  }

  backPage(){
    this.navCtrl.push(GongzuoxukezhengListPage)
  }

  //获取许可证检查项列表
  getXkzjcxList(){
    var url = this.httpService.url + "/appEvent/evtxzjclist?evt_code="+this.gzxkzgdDetail.evt_code+"&row=10";
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.xukezhengjiancha = data['result'];
      this.totalPage = data['pageInf']['totalPage'];
      this.totalNumber = data['pageInf']['totalNumber'];
      this.finished = data['finished'];
    })
  }
  //下拉刷新
  totalPage:number;//总页数
  totalNumber:number;//总条数
  pageNum:number=1;//当前页默认1
  finished:number=0;//已完成项
  doRefresh(refresher){
    this.pageNum=1;
    var url = this.httpService.url+"/appEvent/evtxzjclist?evt_code="+this.gzxkzgdDetail.evt_code+"&row=10";
    setTimeout(() => {
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.xukezhengjiancha = data['result'];
        this.totalPage = data['pageInf']['totalPage'];
        this.totalNumber = data['pageInf']['totalNumber'];
        this.finished = data['finished'];
      })
      refresher.complete();
    }, 2000);
  }

  //上拉加载
  doInfinite(infiniteScroll){
    if(this.totalPage>this.pageNum){
      this.pageNum+=1;
      var url = this.httpService.url + "/appEvent/evtxzjclist?evt_code="+this.gzxkzgdDetail.evt_code+"&pageNum="+this.pageNum+"&row=10";
      setTimeout(() => {
        this.httpService.get(url).subscribe((res)=>{
          let data = res.json();
          this.totalPage = data['pageInf']['totalPage'];
          this.totalNumber = data['pageInf']['totalNumber'];
          this.finished = data['finished'];
          for(let i=0;i<data['result'].length;i++){
            this.xukezhengjiancha.push(data['result'][i])
          }
        })
        infiniteScroll.complete();
      }, 2000);
    }else {
      infiniteScroll.complete();
    }
  }


  goXukejianchaDetail(indexs){
    this.navCtrl.push(XukejianchaxiangDetailPage,{
      evt_code:this.gzxkzgdDetail.evt_code,
      evt_rstatus:this.gzxkzgdDetail.evt_rstatus,
      index:indexs,
      totalNumber:this.totalNumber
    })
  }
  ionViewDidLoad() {
    this.getXkzjcxList();
    console.log('ionViewDidLoad GongzuoxukezhengXukejianchaxiangPage');
  }

}
