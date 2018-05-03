/**
 * Created by SeaRan on 2017/8/4.
 */
import {Injectable, SystemJsNgModuleLoader, SystemJsNgModuleLoaderConfig} from "@angular/core";
import {
  Http, Headers, RequestOptions, RequestOptionsArgs, RequestMethod,
  URLSearchParams, Response
} from "@angular/http";
import {Observable} from "rxjs";
import {NativeService} from "./nativeService";
import {AlertController, ToastController} from "ionic-angular";
import {InAppBrowser} from "@ionic-native/in-app-browser";
@Injectable()
export class HttpService{

  //192.168.3.121:8090
  //192.168.3.139:7128
  // 阿里云培训环境：101.132.167.88:7127
  // 阿里云正式环境：101.132.167.88:7128

  //培训系统appkey：8121451375714ca89b27338b
  //正式系统appkey：c396af6c58c90f33f6072959
  public url:string="http://192.168.3.139:7128/Total"

  //当前版本
  public curreentversion="1.0.4"
  constructor(public http:Http,public nativeService:NativeService,public alertCtrl:AlertController,
              private iab: InAppBrowser,public toastCtrl: ToastController){

  }
  //http请求
  timeout:boolean=false;

  lastClickTime:number = 0;//上次点击的时间

  spaceTime:number = 5000;//时间间隔
  isAllowClick:boolean;//是否允许点击

  //防止短时间内事件多次点击
  public preventClick():boolean{
    var currentTime = new Date().valueOf();//当前系统时间
    console.log(currentTime)

    if(currentTime-this.lastClickTime>this.spaceTime){
      this.isAllowClick = true;
    }else {
      this.isAllowClick = false;
      this.nativeService.showToast("点击速度过快,请稍后.")
    }
    this.lastClickTime = currentTime;
    return this.isAllowClick;
  }

  public request(url:string,options:RequestOptionsArgs):Observable<Response>{
    return Observable.create((observer)=>{
      //请求前
      this.nativeService.showLoading("正在加载...");
      this.http.request(url,options).subscribe(res=>{
        //请求成功
        this.nativeService.hideLoading();
        observer.next(res);
      },err=>{
        this.requestFailed(url,options,err);
        //this.nativeService.showToast(err)
      })
    })
  }
  //Post请求
  public post(url:string,body:any=null):Observable<Response>{
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    //let options = new RequestOptions({headers:headers})
    return this.request(url,new RequestOptions({
      method:RequestMethod.Post,
      body:body,
      headers:headers
    }))
  }

  //get请求
  public get(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Get,
      search: HttpService.buildURLSearchParams(paramMap)
    }));
  }

  /**
   * 将对象转为查询参数
   * @param paramMap
   * @returns {URLSearchParams}
   */
  private static buildURLSearchParams(paramMap): URLSearchParams {
    let params = new URLSearchParams();
    if (!paramMap) {
      return params;
    }
    for (let key in paramMap) {
      let val = paramMap[key];
      if (val instanceof Date) {
        //val = Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
      }
      params.set(key, val);
    }
    return params;
  }
  private requestFailed(url: string, options: RequestOptionsArgs, err) {
    this.nativeService.hideLoading();
    console.log('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'err', err);
    let msg = '请求发生异常', status = err.status;
    if (!this.nativeService.isConnecting()) {//判断是否有网络
      msg = '请求失败，请连接网络';
    } else {
      if (status === 0) {
        msg = '请求失败，请求响应出错';
      } else if (status === 404) {
        msg = '请求失败，未找到请求地址';
      } else if (status === 500) {
        msg = '请求失败，服务器出错，请稍后再试';
      }
    }
    this.nativeService.showToast(msg);
  }
}
