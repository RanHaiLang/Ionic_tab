import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, App} from 'ionic-angular';
import {GongzuoxukezhengPage} from "./gongzuoxukezheng/gongzuoxukezheng";
import {TabsPage} from "../tabs/tabs";
import {HttpService} from "../../prodivers/httpService";
import {Storage} from "@ionic/storage";
import {AddXukezhengMessagePage} from "./add-xukezheng-message/add-xukezheng-message";

/**
 * Generated class for the GongzuoxukezhengListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gongzuoxukezheng-list',
  templateUrl: 'gongzuoxukezheng-list.html',
})
export class GongzuoxukezhengListPage {

  gongzuoxukezhengList:any=[];
  username:string;
  uscudfchar05:string;

  url:string;
  org:string;
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
      this.getGzxkzList();
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
  getGzxkzList(){
    var url = this.httpService.url + "/appEvent/"+this.url+"?hom_ewsfunction="+this.uscudfchar05
      +"&username="+this.username+"&row=10&word="+this.word+"&org="+this.org;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.gongzuoxukezhengList = data['result'];
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
    var url = this.httpService.url + "/appEvent/"+this.url+"?hom_ewsfunction="+this.uscudfchar05+"&username="+this.username+"&word="+this.word+"&row=10&org="+this.org;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.gongzuoxukezhengList = data['result'];
      this.totalPage = data['pageInf']['totalPage'];
    })
  }

  //下拉刷新
  doRefresh(refresher){
    this.pageNum=1;
    var url = this.httpService.url+"/appEvent/"+this.url+"?hom_ewsfunction="+this.uscudfchar05+"&username="+this.username+"&word="+this.word+"&row=10&org="+this.org;
    setTimeout(() => {
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.gongzuoxukezhengList = data['result'];
        this.totalPage = data['pageInf']['totalPage'];
      })
      refresher.complete();
    }, 2000);
  }

  //上拉加载
  doInfinite(infiniteScroll){
    if(this.totalPage>this.pageNum){
      this.pageNum+=1;
      var url = this.httpService.url + "/appEvent/"+this.url+"?hom_ewsfunction="+this.uscudfchar05+"&username="+this.username+"&word="+this.word+"&pageNum="+this.pageNum+"&row=10&org="+this.org;
      setTimeout(() => {
        this.httpService.get(url).subscribe((res)=>{
          let data = res.json();
          this.totalPage = data['pageInf']['totalPage'];
          for(let i=0;i<data['result'].length;i++){
            this.gongzuoxukezhengList.push(data['result'][i])
          }
        })
        infiniteScroll.complete();
      }, 2000);
    }else {
      infiniteScroll.complete();
    }
  }

  //获取详细信息
  goGongzuoxukezheng(evt_code,key){
    if(key=='select'){
      var url = this.httpService.url + "/appEvent/evtpmwhdetail?evt_code="+evt_code;
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.storage.set("gzxkzgdDetail",data['result']);
        this.storage.set("xkzImageDate",data['r5rmDocs']);
        this.storage.set("XKZOpinion",data['adDetails']);//存储审批意见
        this.navCtrl.push(GongzuoxukezhengPage,{
          gzxkzgdDetail:data['result']
        })
      })
    }else {
      this.navCtrl.push(AddXukezhengMessagePage)
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GongzuoxukezhengListPage');
  }

}
