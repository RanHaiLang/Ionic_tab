import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {HttpService} from "../../prodivers/httpService";
import {Response} from "@angular/http";
import {FileObj} from "../../model/FileObj";
import {MenuPage} from "../menu/menu";

declare var echarts;
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  myDate:any="2017-07-19T17:28";
  fileObjList: FileObj[] = [];

  @ViewChild('container') container: ElementRef;
  chart: any;
  constructor(public navCtrl: NavController,public InAppBrowser:InAppBrowser,public httpService:HttpService) {

  }

  clickButton(){
    console.log("=============")
    this.InAppBrowser.create("https://itunes.apple.com/cn/app/%E4%BA%94%E4%B8%B0%E6%9C%BA%E6%A2%B0%E5%9F%B9%E8%AE%AD%E7%89%88/id1241567416?mt=8","_system","location=yes,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭")
  }

  default(){
    var url = this.httpService.url+"/mail/list/app?row=10&page=0&paramLike=&processInstanceName="
    this.httpService.get(url).map((res:Response)=>res.json()).subscribe(res=>{
      console.log(res);
    })
  }

  clickMenu(){
    this.navCtrl.push(MenuPage);
  }


  ionViewDidEnter() {
    let ctx = this.container.nativeElement;
    this.chart = echarts.init(ctx);
    this.chart.setOption({
      title:{
        text:'当月维修复核率'
      },
      tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
      },
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {}
        }
      },
      series : [
        {
          name: '业务指标',
          type: 'gauge',
          detail: {
            formatter:'{value}%',
            offsetCenter:[0,'10%']
          },
          data: [{value: 50, name: '复核率'}],
          radius:'85%',
          startAngle:180,
          endAngle:0,
          min:0,
          max:100,
          splitNumber:10,
          axisLine:{
            show:false,
            lineStyle:{
              color:[[0.2, '#CA7278'], [0.8, '#54A6E0'], [1, '#2ABABB']],
              width:20,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10
            }
          }
        }
      ]
    });

  }

  suijishu(){
    var suiji=''
    //1~32的随机整数
    for (var i=0; i<10; i++){
      var a1 = Math.floor(Math.random()*(32+1))
      //document.write(a1+';')
      suiji+=a1
    }
    console.log(suiji)
  }
}
