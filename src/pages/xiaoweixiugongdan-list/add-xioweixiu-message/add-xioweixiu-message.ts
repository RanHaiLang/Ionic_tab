import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {FileObj} from "../../../model/FileObj";
import {XiaoweixiugongdanListPage} from "../xiaoweixiugongdan-list";
import {OilStationEquipmentSelection} from "../../../shared/oil-station-equipment-selection/oil-station-equipment-selection";
import {HttpService} from "../../../prodivers/httpService";
import {NativeService} from "../../../prodivers/nativeService";
import {SupplierPage} from "../../../shared/supplier/supplier";
import {Storage} from "@ionic/storage";
import {XiaoweixiuPage} from "../xiaoweixiu/xiaoweixiu";

/**
 * Generated class for the AddXioweixiuMessagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-xioweixiu-message',
  templateUrl: 'add-xioweixiu-message.html',
})
export class AddXioweixiuMessagePage {

  fileObjList: FileObj[] = [];
  filePaths: FileObj[] = [];
  MessageForm:any=[];
  xwxDetail:any=[];
  username:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder:FormBuilder,public modalCtrl:ModalController,
              public nativeService:NativeService,public httpService:HttpService,
              public storage:Storage) {
    this.MessageForm = this.formBuilder.group({
      evt_code:["自动生成",[Validators.required]],
      evt_desc:["",[Validators.required]],
      obj_desc:["",[Validators.required]],//设备描述
      evt_object:["",[Validators.required]],//设备代码
      evt_object_org:["",[Validators.required]],//设备组织
      des_text:["",[Validators.required]],//油站名称
      evt_location:["",[Validators.required]],//油站代码
      evt_location_org:["",[Validators.required]],//组织
      uco_desc:["",[Validators.required]],
      evt_start:["",[Validators.required]],
      evt_completed:["",[Validators.required]],
      com_desc:["",[Validators.required]],//供应商描述
      evt_udfchar30:["",[Validators.required]],//供应商代码
      evt_udfnum01:["",[Validators.required]],
      evt_udfnum02:["",[Validators.required]],
      evt_workaddress:["",[Validators.required]],
    })
    this.storage.get("mrcdesc").then((res)=>{
      console.log(res)
      this.MessageForm.controls['des_text'].setValue(res);
    })
    this.storage.get("username").then((res)=>{
      this.username = res;
    })
  }


  backPage(){
    this.navCtrl.push(XiaoweixiugongdanListPage)
  }

  getShebei(){
    let modal = this.modalCtrl.create(OilStationEquipmentSelection,{
      key:"A",
      title:"设备描述"
    });
    modal.onDidDismiss(data=>{
      console.log(data.obj_desc)
      this.MessageForm.controls['obj_desc'].setValue(data.obj_desc)
      this.MessageForm.controls['evt_object'].setValue(data.obj_code);
      this.MessageForm.controls['evt_object_org'].setValue(data.obj_org)
    });
    modal.present()
  }

  getYouzhan(){
    let modal = this.modalCtrl.create(OilStationEquipmentSelection,{
      key:"L",
      title:"油站名称"
    });
    modal.onDidDismiss(data=>{
      console.log(data.obj_desc)
      this.MessageForm.controls['des_text'].setValue(data.obj_desc)
      this.MessageForm.controls['evt_location'].setValue(data.obj_code);
      this.MessageForm.controls['evt_location_org'].setValue(data.obj_org)
    });
    modal.present();
  }
  openTime(key){
    this.nativeService.datePickerss().subscribe(date=>{
      console.log(date);
      if(key=='evt_start'){
        this.MessageForm.controls['evt_start'].setValue(date)
      }else if(key=='evt_completed'){
        this.MessageForm.controls['evt_completed'].setValue(date)
      }
    })
  }

  //供应商
  getSupplier(){
    let modal = this.modalCtrl.create(SupplierPage,{
    });
    modal.onDidDismiss(data=>{
      if(data=='无'){
        this.MessageForm.controls['evt_udfchar30'].setValue("")
        this.MessageForm.controls['com_desc'].setValue("")
      }else {
        this.MessageForm.controls['evt_udfchar30'].setValue(data.com_code==undefined?"":data.com_code)
        this.MessageForm.controls['com_desc'].setValue(data.com_desc==undefined?"":data.com_desc)
      }
    });
    modal.present();
  }


  submitMessage(){
    //防事件多点击
    if(this.httpService.preventClick()==true) {
      //非空判断
      if (
        this.MessageForm.value.evt_desc == null || this.MessageForm.value.evt_desc == "" ||
        this.MessageForm.value.evt_udfnum02 == null || this.MessageForm.value.evt_udfnum02 == ""
      ) {
        this.nativeService.showToast("请填写*号部分")
      } else {
        var evt_start = new Date(this.MessageForm.value.evt_start).valueOf();
        var evt_completed = new Date(this.MessageForm.value.evt_completed).valueOf();
        if (evt_start > evt_completed) {
          this.nativeService.showToast("开始日期必须早于结束日期")
        } else {
          if (this.MessageForm.value.evt_udfnum02 < 0 || this.MessageForm.value.evt_udfnum02 > 600) {
            this.nativeService.showToast("小维修金额必须大于等于0且小于或等于600")
          } else {
            if (this.MessageForm.value.evt_udfnum01 == "") {
              this.MessageForm.controls['evt_udfnum01'].setValue(0)
            }
            var url = this.httpService.url + "/appEvent/insertevt";
            let body = "&evt_desc=" + this.MessageForm.value.evt_desc
              + "&evt_jobtype=XWX&evt_object="
              + "&evt_createdby=" + this.username + "&evt_workaddress=" + this.MessageForm.value.evt_workaddress
              + "&evt_udfchar30=" + this.MessageForm.value.evt_udfchar30 + "&evt_udfnum01=" + this.MessageForm.value.evt_udfnum01
              + "&evt_udfnum02=" + this.MessageForm.value.evt_udfnum02;
            this.httpService.post(url, body).subscribe((res) => {
              let data = res.json();
              if (data['resultCode'] == 1) {
                this.nativeService.showToast(data['message']);
                //this.navCtrl.push(XiaoweixiugongdanListPage)
                this.getDetail(data['result'].evt_code)
              } else {
                this.nativeService.showToast(data['message']);
              }
            })
          }
        }
      }
    }
  }

  //获取详情
  getDetail(evt_code){
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
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddXioweixiuMessagePage');
  }

}
