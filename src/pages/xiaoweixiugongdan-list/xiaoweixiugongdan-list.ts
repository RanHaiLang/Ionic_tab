import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, App} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {XiaoweixiuPage} from "./xiaoweixiu/xiaoweixiu";
import {HttpService} from "../../prodivers/httpService";
import {Storage} from "@ionic/storage";
import {AddXioweixiuMessagePage} from "./add-xioweixiu-message/add-xioweixiu-message";

/**
 * Generated class for the XiaoweixiugongdanListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xiaoweixiugongdan-list',
  templateUrl: 'xiaoweixiugongdan-list.html',
})
export class XiaoweixiugongdanListPage {

  xiaoweixiuList:any=[];
  username:string;
  uscudfchar05:string;

  url:string
  org:string
  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App,
              public httpService:HttpService,public storage:Storage) {
    this.storage.get("url").then((res)=>{
      this.url = res;
    })
    this.storage.get("uscudfchar05").then((res)=>{
      this.uscudfchar05 = res;
    })
    this.storage.get("org").then((res)=>{
      this.org = res;
    })
    this.storage.get("username").then((res)=>{
      this.username = res;
      this.getxwxList();
    })
  }

  backPage(){
    var selectedIndex;
    if(this.url=='selectdblist'){
      selectedIndex=0;
    }else {
      selectedIndex=1;
    }
    this.app.getRootNav().setRoot(TabsPage,{
      selectedIndex:selectedIndex
    });
  }

  //获取列表
  getxwxList(){
    var url = this.httpService.url + "/appEvent/"+this.url+"?hom_ewsfunction="+this.uscudfchar05
      +"&username="+this.username+"&row=10&word=&org="+this.org;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.xiaoweixiuList = data['result'];
      this.totalPage = data['pageInf']['totalPage'];
    })
  }

  //搜索
  word:string="";//搜索条件
  pageNum:number=1;//当前页默认1
  totalPage:number;//总页数
  getItems(item){
    this.pageNum=1;
    if(item.target.value!=undefined){
      this.word=item.target.value;
    }else {
      this.word="";
    }
    var url = this.httpService.url + "/appEvent/"+this.url+"?hom_ewsfunction="+this.uscudfchar05
      +"&username="+this.username+"&word="+this.word+"&row=10&org="+this.org;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.xiaoweixiuList = data['result'];
      this.totalPage = data['pageInf']['totalPage'];
    })
  }

  //下拉刷新
  doRefresh(refresher){
    this.pageNum=1;
    var url = this.httpService.url+"/appEvent/"+this.url+"?hom_ewsfunction="+this.uscudfchar05
      +"&username="+this.username+"&word="+this.word+"&row=10&org="+this.org;
    setTimeout(() => {
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.xiaoweixiuList = data['result'];
        this.totalPage = data['pageInf']['totalPage'];
      })
      refresher.complete();
    }, 2000);
  }

  //上拉加载
  doInfinite(infiniteScroll){
    if(this.totalPage>this.pageNum){
      this.pageNum+=1;
      var url = this.httpService.url + "/appEvent/"+this.url+"?hom_ewsfunction="+this.uscudfchar05
        +"&username="+this.username+"&word="+this.word+"&pageNum="+this.pageNum+"&row=10&org="+this.org;
      setTimeout(() => {
        this.httpService.get(url).subscribe((res)=>{
          let data = res.json();
          this.totalPage = data['pageInf']['totalPage'];
          for(let i=0;i<data['result'].length;i++){
            this.xiaoweixiuList.push(data['result'][i])
          }
        })
        infiniteScroll.complete();
      }, 2000);
    }else {
      infiniteScroll.complete();
    }
  }
  //获取详细信息
  goXiaoweixiugongdan(evt_code,key){
    if(key=='select'){//查看详情
      var url = this.httpService.url +"/appEvent/evtpmwhdetail?evt_code="+evt_code;
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.storage.set("xwxDetail",data['result']);
        this.storage.set("xwxImageDate",data['r5rmDocs']);
        this.storage.set("xwxOpinion",data['adDetails']);//存储审批意见
        this.navCtrl.push(XiaoweixiuPage,{
          xwxDetail:data['result']
        })
      })
    }else {//新增
      this.navCtrl.push(AddXioweixiuMessagePage,{
      })
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad XiaoweixiugongdanListPage');
  }

}
