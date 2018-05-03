import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {SupplierPage} from "../../../shared/supplier/supplier";
import {RiskPriorityPage} from "../../../shared/risk-priority/risk-priority";
import {LicenseCategoryPage} from "../../../shared/license-category/license-category";
import {OilStationEquipmentSelection} from "../../../shared/oil-station-equipment-selection/oil-station-equipment-selection";
import {NativeService} from "../../../prodivers/nativeService";
import {HttpService} from "../../../prodivers/httpService";
import {Storage} from "@ionic/storage";
import {GongzuoxukezhengListPage} from "../gongzuoxukezheng-list";
import {FileObj} from "../../../model/FileObj";
import {DepartmentPage} from "../../../shared/department/department";
import {JobNumberPage} from "../../../shared/job-number/job-number";
import {GongzuoxukezhengPage} from "../gongzuoxukezheng/gongzuoxukezheng";

/**
 * Generated class for the AddXukezhengMessagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-xukezheng-message',
  templateUrl: 'add-xukezheng-message.html',
})
export class AddXukezhengMessagePage {

  fileObjList: FileObj[] = [];
  filePaths: FileObj[] = [];
  MessageForm:any=[];
  gzxkzgdDetail:any=[];
  username:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,
              public modalCtrl:ModalController,public httpService:HttpService,
              public storage:Storage,public nativeService:NativeService) {
    this.MessageForm = this.formBuilder.group({
      evt_code:["自动生成",[Validators.required]],
      evt_parent:[this.gzxkzgdDetail.evt_parent,[Validators.required]],//工单号
      parent_desc:[this.gzxkzgdDetail.parent_desc,[Validators.required]],//工单号描述
      evt_desc:[this.gzxkzgdDetail.evt_desc,[Validators.required]],
      des_text:[this.gzxkzgdDetail.des_text,[Validators.required]],//油站描述
      evt_location:[this.gzxkzgdDetail.evt_location,[Validators.required]],//油站代码
      evt_location_org:[this.gzxkzgdDetail.evt_location_org,[Validators.required]],//组织
      uco_desc:[this.gzxkzgdDetail.uco_desc,[Validators.required]],
      evt_status:[this.gzxkzgdDetail.evt_status,[Validators.required]],
      uco_desc2:[this.gzxkzgdDetail.uco_desc2,[Validators.required]],//许可证分类描述
      evt_standwork:[this.gzxkzgdDetail.evt_standwork,[Validators.required]],//许可证分类代码
      evt_udfchar01:[this.gzxkzgdDetail.evt_udfchar01,[Validators.required]],
      uco_desc3:[this.gzxkzgdDetail.uco_desc3,[Validators.required]],//风险等级描述
      evt_priority:[this.gzxkzgdDetail.evt_priority,[Validators.required]],//风险等级代码
      evt_start:[this.gzxkzgdDetail.evt_start,[Validators.required]],
      evt_completed:[this.gzxkzgdDetail.evt_completed,[Validators.required]],
      evt_udfchar30:[this.gzxkzgdDetail.evt_udfchar30,[Validators.required]],//供应商代码
      com_desc:[this.gzxkzgdDetail.com_desc,[Validators.required]],//供应商描述
      evt_mrc:[this.gzxkzgdDetail.evt_mrc,[Validators.required]],//部门代码
      evt_mrcdesc:[this.gzxkzgdDetail.evt_mrcdesc,[Validators.required]],//部门描述
      evt_workaddress:[this.gzxkzgdDetail.evt_workaddress,[Validators.required]],
    })
    this.storage.get("username").then((res)=>{
      this.username = res;
    })
  }
  backPage(){
    this.navCtrl.pop()
  }

  //工单号
  getJobNumber(){
    let modal = this.modalCtrl.create(JobNumberPage,{
      evt_udfchar30:this.MessageForm.value.evt_udfchar30
    });
    modal.onDidDismiss(data=>{
      if(data=='无'){
        this.MessageForm.controls['evt_parent'].setValue("")
      }else {
        if(data.com_code!=undefined){
          console.log(data.com_desc)
          this.MessageForm.controls['evt_parent'].setValue(data.com_code)
        }
      }
    });
    modal.present();
  }
  //获取油站名称
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

  //获取许可证分类
  getLicenseCategory(){
    let modal = this.modalCtrl.create(LicenseCategoryPage,{
    });
    modal.onDidDismiss(data=>{
      if(data=='无'){
        this.MessageForm.controls['uco_desc2'].setValue("")
        this.MessageForm.controls['evt_standwork'].setValue("")
      }else {
        if(data.com_code!=undefined){
          this.MessageForm.controls['uco_desc2'].setValue(data.com_desc)
          this.MessageForm.controls['evt_standwork'].setValue(data.com_code)
        }
      }
    });
    modal.present();
  }
  //获取风险等级
  getRisk(){
    let modal = this.modalCtrl.create(RiskPriorityPage,{
      key:"2",
      title:"风险等级"
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

  openTime(key){
    this.nativeService.datePickers().subscribe(date=>{
      if(key=='evt_start'){
        this.MessageForm.controls['evt_start'].setValue(date)
      }else if(key=='evt_completed'){
        this.MessageForm.controls['evt_completed'].setValue(date)
      }
    })
  }

  submitMessage(){
    //防事件多点击
    if(this.httpService.preventClick()==true){
      //非空判断
      if (
        this.MessageForm.value.evt_desc==null||this.MessageForm.value.evt_desc==""||
        this.MessageForm.value.uco_desc2==null||this.MessageForm.value.uco_desc2==""||
        this.MessageForm.value.des_text==null||this.MessageForm.value.des_text==""||
        this.MessageForm.value.uco_desc3==null||this.MessageForm.value.uco_desc3==""||
        this.MessageForm.value.evt_udfchar01==null||this.MessageForm.value.evt_udfchar01==""||
        this.MessageForm.value.evt_workaddress==null||this.MessageForm.value.evt_workaddress==""||
        this.MessageForm.value.evt_parent==null||this.MessageForm.value.evt_parent==""||
        this.MessageForm.value.com_desc==null||this.MessageForm.value.com_desc==""
      ){
        this.nativeService.showToast("请填写*号部分")
      }else {
        var url = this.httpService.url + "/appEvent/insertevtxkz";
        let body = "evt_desc="+this.MessageForm.value.evt_desc+"&evt_standwork="+this.MessageForm.value.evt_standwork
          +"&evt_priority="+this.MessageForm.value.evt_priority+"&evt_udfchar01="+this.MessageForm.value.evt_udfchar01
          +"&evt_workaddress="+this.MessageForm.value.evt_workaddress+"&evt_parent="+this.MessageForm.value.evt_parent
          +"&evt_udfchar30="+this.MessageForm.value.evt_udfchar30+"&evt_location="+this.MessageForm.value.evt_location
          +"&evt_location_org="+this.MessageForm.value.evt_location_org+"&evt_jobtype=XKZ"
          +"&evt_createdby="+this.username;
        this.httpService.post(url,body).subscribe((res)=>{
          let data = res.json();
          if(data['resultCode']==1){
            this.nativeService.showToast(data['message']);
            this.getDetail(data['result'].evt_code)
          }else {
            this.nativeService.showToast(data['message']);
          }
        })
      }
    }
  }

  //获取详细信息
  getDetail(evt_code){
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
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddXukezhengMessagePage');
  }

}
