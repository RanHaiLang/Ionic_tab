import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {FileObj} from "../../../model/FileObj";
import {NativeService} from "../../../prodivers/nativeService";
import {HttpService} from "../../../prodivers/httpService";
import {OilStationEquipmentSelection} from "../../../shared/oil-station-equipment-selection/oil-station-equipment-selection";
import {RiskPriorityPage} from "../../../shared/risk-priority/risk-priority";
import {SupplierPage} from "../../../shared/supplier/supplier";
import {Storage} from "@ionic/storage";
import {JiuzhengxingweixiugongdanListPage} from "../jiuzhengxingweixiugongdan-list";
import {DepartmentPage} from "../../../shared/department/department";
import {JiuzhengxingweixiuPage} from "../jiuzhengxingweixiu/jiuzhengxingweixiu";

/**
 * Generated class for the AddPutongweixiuMessagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-putongweixiu-message',
  templateUrl: 'add-putongweixiu-message.html',
})
export class AddPutongweixiuMessagePage {

  MessageForm:any=[];
  jzxwxDetail:any=[];
  username:string;
  mrc:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,
              public httpService:HttpService,public nativeService:NativeService,public modalCtrl:ModalController,
              public storage:Storage) {
    this.MessageForm = this.formBuilder.group({
      evt_code:["自动生成",[Validators.required]],
      evt_desc:[this.jzxwxDetail.evt_desc,[Validators.required]],
      evt_mrc:[this.jzxwxDetail.evt_mrc,[Validators.required]],//部门代码
      evt_mrcdesc:[this.jzxwxDetail.evt_mrcdesc,[Validators.required]],//部门描述
      obj_desc:[this.jzxwxDetail.obj_desc,[Validators.required]],//设备描述
      evt_object:[this.jzxwxDetail.evt_object,[Validators.required]],//设备代码
      evt_object_org:[this.jzxwxDetail.evt_object_org,[Validators.required]],//设备组织
      des_text:[this.jzxwxDetail.des_text,[Validators.required]],//油站名称
      evt_location:[this.jzxwxDetail.evt_location,[Validators.required]],//油站代码
      evt_location_org:[this.jzxwxDetail.evt_location_org,[Validators.required]],//组织
      uco_desc:[this.jzxwxDetail.uco_desc,[Validators.required]],
      uco_desc3:[this.jzxwxDetail.uco_desc3,[Validators.required]],//优先级描述
      evt_priority:[this.jzxwxDetail.evt_priority,[Validators.required]],//优先级代码
      evt_udfdate03:[this.jzxwxDetail.evt_udfdate03,[Validators.required]],
      evt_udfdate04:[this.jzxwxDetail.evt_udfdate04,[Validators.required]],
      evt_udfdate02:[this.jzxwxDetail.evt_udfdate02,[Validators.required]],
      com_desc:[this.jzxwxDetail.com_desc,[Validators.required]],//供应商描述
      evt_udfchar30:[this.jzxwxDetail.evt_udfchar30,[Validators.required]],//供应商代码
      evt_udfnum01:[this.jzxwxDetail.evt_udfnum01,[Validators.required]],
      evt_workaddress:[this.jzxwxDetail.evt_workaddress,[Validators.required]],
    })
    this.storage.get("username").then((res)=>{
      this.username = res;
    })
    this.storage.get("mrcdesc").then((res)=>{
      this.MessageForm.controls['des_text'].setValue(res)
    })
    this.storage.get("mrc").then((res)=>{
      this.mrc = res;
    })
  }

  backPage(){
    this.navCtrl.pop();
  }

  //部门
  getDepartment(){
    let modal = this.modalCtrl.create(DepartmentPage,{
    });
    modal.onDidDismiss(data=>{
      if(data=='无'){
        this.MessageForm.controls['evt_mrc'].setValue("")
        this.MessageForm.controls['evt_mrcdesc'].setValue("")
      }else {
        if(data.com_code!=undefined){
          console.log(data.com_desc)
          this.MessageForm.controls['evt_mrc'].setValue(data.com_code)
          this.MessageForm.controls['evt_mrcdesc'].setValue(data.com_desc)
        }

      }

    });
    modal.present();
  }
  //设备选择
  getShebei(){
    let modal = this.modalCtrl.create(OilStationEquipmentSelection,{
      key:"equiment",
      url:'searchObj',
      evt_mrc:this.mrc,
      title:"设备描述"
    });
    modal.onDidDismiss(data=>{
      if(data=='无'){
        this.MessageForm.controls['obj_desc'].setValue("")
        this.MessageForm.controls['evt_object'].setValue("");
        this.MessageForm.controls['evt_object_org'].setValue("")
      }else {
        if(data.com_desc!=undefined){
          this.MessageForm.controls['obj_desc'].setValue(data.com_desc)
          this.MessageForm.controls['evt_object'].setValue(data.com_code);
          this.MessageForm.controls['evt_object_org'].setValue(data.com_org)
        }
      }

    });
    modal.present();
  }
  //油站名称
  getYouzhan(){
    let modal = this.modalCtrl.create(OilStationEquipmentSelection,{
      key:"oil",
      url:'getevtlocationByPage',
      title:"油站名称"
    });
    modal.onDidDismiss(data=>{
      if(data=='无'){
        this.MessageForm.controls['des_text'].setValue("")
        this.MessageForm.controls['evt_location'].setValue("")
        this.MessageForm.controls['evt_location_org'].setValue("")
      }else {
        if(data.com_code!=undefined){
          this.MessageForm.controls['des_text'].setValue(data.com_desc)
          this.MessageForm.controls['evt_location'].setValue(data.com_code)
          this.MessageForm.controls['evt_location_org'].setValue(data.com_org)
        }
      }
    });
    modal.present();
  }

  //获取优先级
  getPriority(){
    let modal = this.modalCtrl.create(RiskPriorityPage,{
      key:"1",
      title:"优先级"
    });
    modal.onDidDismiss(data=>{
      if(data=='无'){
        console.log(data.uco_desc)
        this.MessageForm.controls['evt_priority'].setValue("");
        this.MessageForm.controls['uco_desc3'].setValue("");
      }else {
        if(data.uco_code!=undefined){
          this.MessageForm.controls['evt_priority'].setValue(data.uco_code);
          this.MessageForm.controls['uco_desc3'].setValue(data.uco_desc);
        }
      }
    });
    modal.present();
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
        if(data.com_code!=undefined&&data.com_desc!=undefined){
          this.MessageForm.controls['evt_udfchar30'].setValue(data.com_code)
          this.MessageForm.controls['com_desc'].setValue(data.com_desc)
        }
      }
    });
    modal.present();
  }
  openTime(key){
    this.nativeService.datePickerss().subscribe(date=>{
      console.log(date);
      if(key=='evt_udfdate04'){
        this.MessageForm.controls['evt_udfdate04'].setValue(date)
      }else if(key=='evt_udfdate03'){
        this.MessageForm.controls['evt_udfdate03'].setValue(date)
      }
    })
  }

  submitMessage(){
    //防事件多点击
    if(this.httpService.preventClick()==true) {
      //非空判断
      if (this.MessageForm.value.evt_desc == null || this.MessageForm.value.evt_desc == "" ||
        this.MessageForm.value.obj_desc == null || this.MessageForm.value.obj_desc == "" ||
        this.MessageForm.value.uco_desc3 == null || this.MessageForm.value.uco_desc3 == ""
      ) {
        this.nativeService.showToast("请填写*号部分")
      } else {
        var url = this.httpService.url + "/appEvent/insertevt";
        let body = "evt_desc=" + this.MessageForm.value.evt_desc
          + "&evt_jobtype=CM&evt_createdby=" + this.username
          + "&evt_priority=" + this.MessageForm.value.evt_priority
          + "&evt_object=" + this.MessageForm.value.evt_object + "&evt_object_org=" + this.MessageForm.value.evt_object_org
        this.httpService.post(url, body).subscribe((res) => {
          let data = res.json();
          console.log(data)
          if (data['resultCode'] == 1) {
            this.nativeService.showToast(data['message']);
            this.getDetail(data['result'].evt_code);
          } else {
            this.nativeService.showToast(data['message']);
          }
        })
      }
    }
  }
  //获取详细信息
  getDetail(evt_code){
    var url = this.httpService.url + "/appEvent/evtpmwhdetail?evt_code="+evt_code;
    this.httpService.get(url).subscribe((res)=> {
      let data = res.json();
      this.storage.set("jzxwxDetail", data['result']);
      this.storage.set("jzxwxImageDate", data['r5rmDocs']);
      this.storage.set("jzxwxOpinion", data['adDetails']);//存储审批意见
      this.navCtrl.push(JiuzhengxingweixiuPage, {
        jzxwxDetail: data['result']
      })
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPutongweixiuMessagePage');
  }

}
