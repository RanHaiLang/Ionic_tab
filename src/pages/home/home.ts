import {Component, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import {NavController, App, NavParams} from 'ionic-angular';
import {YufangxingweihugongdanListPage} from "../yufangxingweihugongdan-list/yufangxingweihugongdan-list";
import {XunzhangongdanListPage} from "../xunzhangongdan-list/xunzhangongdan-list";
import {XiangmugaizaogongdanListPage} from "../xiangmugaizaogongdan-list/xiangmugaizaogongdan-list";
import {XiaoweixiugongdanListPage} from "../xiaoweixiugongdan-list/xiaoweixiugongdan-list";
import {JiuzhengxingweixiugongdanListPage} from "../jiuzhengxingweixiugongdan-list/jiuzhengxingweixiugongdan-list";
import {GongzuoxukezhengListPage} from "../gongzuoxukezheng-list/gongzuoxukezheng-list";
import {Storage} from "@ionic/storage";
import {HttpService} from "../../prodivers/httpService";
import {NativeService} from "../../prodivers/nativeService";
import {error} from "util";

declare var echarts;
//declare var window;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('container') container: ElementRef;
  chart: any;
  username:string;
  buttonshow:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public app:App,public storage:Storage,public httpService:HttpService,
              public nativeService:NativeService,public cd: ChangeDetectorRef) {
  }
  e:boolean;
  u:boolean;
  userView(){
    var url = this.httpService.url+"/appUser/VcappScreens?username="+this.username;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.buttonshow = data['result'];
      this.u=true;
    })
  }

  KpiList:any=[]
  getKpi(){
    var url = this.httpService.url + "/appUser/totalsy?username="+this.username;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.KpiList = data['result']
      console.log(this.KpiList)
      this.e=true;
      this.Echarts();
    })
  }

  //打开新页面
  OpenPage(page,uscudfchar05){
    this.storage.set("uscudfchar05",uscudfchar05);
    this.storage.set("url",'selectdblist');
    this.navCtrl.push(page)
  }


  ionViewDidEnter() {
    /*this.storage.get("username").then((val)=>{
      this.username = val;
      this.userView();
      this.getKpi();
    })*/
  }
  ionViewDidLoad(){
      this.storage.get("username").then((val)=>{
        this.username = val;
        if(!this.nativeService.isConnecting()){//没网络时
          this.e=false;
          this.u=false;
        }else {
          this.userView();
          this.getKpi();
        }
      })
  }


  Echarts(){
    let ctx = this.container.nativeElement;
    this.chart = echarts.init(ctx);
    let option = {
      title: {
        text: '月度工单数量统计',
        //subtext: '纯属虚构'
      },
      color: ['#3398DB'],
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '6%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          axisTick: {
            alignWithLabel: true
          },
          axisLabel:{
            fontSize:12,
            interval:0,
            rotate:40
          },
          barGap:'10%',//柱间距
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'工单数量',
          type:'bar',
          barWidth: '50%',
          data:[],
        }
      ]
    }
    option.series[0].data=this.KpiList;
    this.chart.setOption(option);
  }
}
