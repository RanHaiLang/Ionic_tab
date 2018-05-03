import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {YouzhanListPage} from "../youzhan-list";
import {KaishixunzhanPage} from "../kaishixunzhan/kaishixunzhan";
import {HttpService} from "../../../../../prodivers/httpService";

/**
 * Generated class for the XunzhanjianchaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xunzhanjiancha',
  templateUrl: 'xunzhanjiancha.html',
})
export class XunzhanjianchaPage {

  title:string;
  evt_code:string;
  evt_rstatus:string;
  evt_code2:string;
  xunzhanjiacha:any=[]
  xunzhanxuanxiang:any=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpService) {
    this.title = this.navParams.get("title");
    this.evt_code = this.navParams.get("evt_code");//工单编号
    this.evt_rstatus = this.navParams.get("evt_rstatus");//工单状态
    this.evt_code2 = this.navParams.get("evt_code2");//油站工单号
    this.getxzwdList();
  }

  backPage(){
    this.navCtrl.popToRoot()
  }

  //获取问答列表
  getxzwdList(){
    var url = this.httpService.url + "/appEvent/evtxkzjclist?evt_code="+this.evt_code+"&evt_code2="+this.evt_code2+"&row=10";
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.xunzhanjiacha = data['result'];
      this.totalPage = data['pageInf']['totalPage'];
      this.totalNumber = data['pageInf']['totalNumber'];
      this.finished = data['finished'];
      console.log(this.xunzhanjiacha)
    })
  }
  //下拉刷新
  totalPage:number;//总页数
  totalNumber:number;//总页数
  pageNum:number=1;//当前页默认1
  finished:number=0;//已完成项
  doRefresh(refresher){
    this.pageNum=1;
    var url = this.httpService.url+"/appEvent/evtxkzjclist?evt_code="+this.evt_code+"&evt_code2="+this.evt_code2+"&row=10";
    setTimeout(() => {
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.xunzhanjiacha = data['result'];
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
      var url = this.httpService.url + "/appEvent/evtxkzjclist?evt_code="+this.evt_code+"&evt_code2="+this.evt_code2+"&pageNum="+this.pageNum+"&row=10";
      setTimeout(() => {
        this.httpService.get(url).subscribe((res)=>{
          let data = res.json();
          this.totalPage = data['pageInf']['totalPage'];
          this.totalNumber = data['pageInf']['totalNumber'];
          for(let i=0;i<data['result'].length;i++){
            this.xunzhanjiacha.push(data['result'][i])
          }
          this.finished = data['finished'];
        })
        infiniteScroll.complete();
      }, 2000);
    }else {
      infiniteScroll.complete();
    }
  }

  goxunzhan(indexs){
    console.log("evt_code:"+this.evt_code2)
    this.navCtrl.push(KaishixunzhanPage,{
      title:this.title,
      evt_code:this.evt_code,
      evt_rstatus:this.evt_rstatus,
      index:indexs,
      finished:this.finished,
      totalNumber:this.totalNumber,
      evt_code2:this.evt_code2
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad XunzhanjianchaPage');
  }

}
