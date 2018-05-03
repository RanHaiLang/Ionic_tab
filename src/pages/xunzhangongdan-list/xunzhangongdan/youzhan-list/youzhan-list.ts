import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {XunzhangongdanListPage} from "../../xunzhangongdan-list";
import {XunzhanjianchaPage} from "./xunzhanjiancha/xunzhanjiancha";
import {KaishixunzhanPage} from "./kaishixunzhan/kaishixunzhan";
import {NativeService} from "../../../../prodivers/nativeService";
import {HttpService} from "../../../../prodivers/httpService";

/**
 * Generated class for the YouzhanListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-youzhan-list',
  templateUrl: 'youzhan-list.html',
})
export class YouzhanListPage {

  youzhanlist:any=[];
  xzgdDetail:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public nativeService:NativeService,public httpService:HttpService) {
    this.xzgdDetail = this.navParams.get("xzgdDetail");
  }
  ionViewWillEnter(){
    this.getYouZhanList();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad YouzhanListPage');
  }
  backPage(){
    this.navCtrl.push(XunzhangongdanListPage)
  }
  //获取油站列表
  getYouZhanList(){
    var url = this.httpService.url + "/appEvent/selectevtobj?evt_code="+this.xzgdDetail.evt_code+"&row=10";
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.youzhanlist = data['result']
      this.totalPage = data['pageInf']['totalPage'];
    })
  }
  //下拉刷新
  totalPage:number;//总页数
  pageNum:number=1;//当前页默认1
  doRefresh(refresher){
    this.pageNum=1;
    var url = this.httpService.url+"/appEvent/selectevtobj?evt_code="+this.xzgdDetail.evt_code+"&row=10";
    setTimeout(() => {
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.youzhanlist = data['result'];
        this.totalPage = data['pageInf']['totalPage'];
      })
      refresher.complete();
    }, 2000);
  }
  //上拉加载
  doInfinite(infiniteScroll){
    if(this.totalPage>this.pageNum){
      this.pageNum+=1;
      var url = this.httpService.url + "/appEvent/selectevtobj?evt_code="+this.xzgdDetail.evt_code+"&pageNum="+this.pageNum+"&row=10";
      setTimeout(() => {
        this.httpService.get(url).subscribe((res)=>{
          let data = res.json();
          this.totalPage = data['pageInf']['totalPage'];
          for(let i=0;i<data['result'].length;i++){
            this.youzhanlist.push(data['result'][i])
          }
        })
        infiniteScroll.complete();
      }, 2000);
    }else {
      infiniteScroll.complete();
    }
  }

  //巡站检查列表
  goxunzhanjiancha(name,evt_code,status){
    if(status=='BE01'||status=='CE01'||status=='DE01'||status=='R'){//开始巡站
      this.onSubmit(evt_code)
    }else if(status=='AE97'||status=='AE98'){//巡站中、巡站完成
      console.log(name)
      this.navCtrl.push(XunzhanjianchaPage,{
        title:name,
        evt_code:this.xzgdDetail.evt_code,
        evt_rstatus:this.xzgdDetail.evt_rstatus,
        evt_code2:evt_code
      })
    }

  }
  goKaishixunzhan(name,evt_code2){
    this.navCtrl.push(KaishixunzhanPage,{
      title:name,
      evt_code:this.xzgdDetail.evt_code,
      evt_rstatus:this.xzgdDetail.evt_rstatus,
      index:1,
      evt_code2:evt_code2
    });
  }
  onSubmit(evt_code){
    var url = this.httpService.url + "/appEvent/updateeventstatus";
    let body = "evt_code="+evt_code+"&evt_status=AE97";
    console.log(body)
    this.httpService.post(url,body).subscribe(res=>{
      let data = res.json();
      if(data['resultCode']==1){
        this.navCtrl.push(XunzhanjianchaPage,{
          title:name,
          evt_code:this.xzgdDetail.evt_code,
          evt_rstatus:this.xzgdDetail.evt_rstatus,
          evt_code2:evt_code
        })
      }else {
        this.nativeService.showToast(data['message'])
      }
    })
  }

}
