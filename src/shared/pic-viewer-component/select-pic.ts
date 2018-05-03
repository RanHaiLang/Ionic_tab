/**
 * Created by SeaRan on 2017/8/7.
 */

import {Component, Input, Output, EventEmitter} from "@angular/core";
import {FileObj} from "../../model/FileObj";
import {NativeService} from "../../prodivers/nativeService";
import {ActionSheetController, NavController, ModalController} from "ionic-angular";
import {ViewerPic} from "./viewer-pic";
import {Storage} from "@ionic/storage";
import {FileService} from "../../prodivers/fileService";
import {HttpService} from "../../prodivers/httpService";
import {FileTransferObject,FileUploadOptions,FileTransfer} from "@ionic-native/file-transfer";
/*
 自定义添加预览图片组件
 */
@Component({
  selector:'page-select-pic',
  templateUrl:'select-pic.html',
})

export class SelectPic{
  @Input() max:number=4;//最多可选择多少张图片，默认4张
  @Input() destinationType:number = 1;//期待返回的图片的格式，默认1图片路径，0为返回base64
  @Input() allowAdd:boolean = true;//是否允许新增
  @Input() allowDelete:boolean = true;//是否允许删除
  @Input() fileObjList:FileObj[] = [];//图片列表，与filrObjListChange形成双向数据绑定
  @Output() fileObjListChange = new EventEmitter<any>();

  evt_code:string;//工单号
  ImgUploadUrl:string;//图片上传路径
  username:string;//用户名
  rcv_event:string;//油站编号
  rcv_act:string;//活动编号
  ImgUrl:string;//图片详情路径
  pageNum:number;
  constructor(public navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController,
              private nativeService: NativeService,
              public modalCtrl:ModalController,
              public storage:Storage,public fileService:FileService,
              public httpService:HttpService,private transfer: FileTransfer){

  }

  //拍照或选择图片
  addPicture() {//新增照片
    this.storage.get("evt_code").then((res)=>{
      this.evt_code = res;
    })
    this.storage.get("ImgUploadUrl").then((res)=>{
      this.ImgUploadUrl = res;
      console.log("ImgUploadUrl:"+this.ImgUploadUrl)
    })
    this.storage.get("ImgUrl").then((res)=>{
      this.ImgUrl = res;
      console.log("ImgUrl:"+this.ImgUrl)
    })
    this.storage.get("rcv_act").then((res)=>{
      this.rcv_act = res;
      console.log(res);
      console.log("rcv_act1:"+this.rcv_act)
    })
    this.storage.get("rcv_event").then((res)=>{
      this.rcv_event = res;
    })
    this.storage.get("pageNum").then((res)=>{
      this.pageNum = res;
    })
    this.storage.get("username").then((res)=>{
      this.username = res;
    });

    let that = this;
    that.actionSheetCtrl.create({
      buttons: [
        /*{
          text: '从相册选择',
          handler: () => {
            that.nativeService.getMultiplePictures({//从相册多选
              maximumImagesCount: (that.max - that.fileObjList.length),
              destinationType: this.destinationType
            }).subscribe(imgs => {
              for (let img of <string[]>imgs) {
                that.getPictureSuccess(img);
                //this.nativeService.showToast(img);
              }
            });
          }
        },*/
        {
          text: '拍照',
          handler: () => {
            that.nativeService.getPictureByCameras({
              destinationType: this.destinationType
            }).subscribe(img => {
              //that.getPictureSuccess(img);
              if(this.ImgUploadUrl=='evtuploadwd'){//检查项上传图片
                this.upload2(img)
              }else {//工单上传图片
                this.upload(img,this.evt_code)
              }
            });
          }
        },
        {
          text:'拍摄视频',
          handler:()=>{
              this.nativeService.takeVideo().subscribe(data=>{
                if(this.ImgUploadUrl=='evtuploadwd') {//检查项上传图片
                  for(let i=0;i<data.length;i++){
                    //this.getPictureSuccess(data[i].fullPath)
                    this.upload2(data[i].fullPath)
                  }
                }else {
                  console.log("视频："+data);
                  for(let i=0;i<data.length;i++){
                    //this.getPictureSuccess(data[i].fullPath)
                    this.upload(data[i].fullPath,this.evt_code)
                  }
                }
              });
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    }).present();
  }

  origPath:any=[];
  filename:any=[];
  filePaths: FileObj[] = [];
  //单张图片/单个视频上传
  upload(filePath,evt_code){
    console.log("evt_code="+evt_code)
    var filename = filePath.substring(filePath.lastIndexOf("/")+1)
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'files',
      fileName: filename,
      headers: {
      }
    }
    this.nativeService.showLoading("正在上传...");
    fileTransfer.upload(filePath,this.httpService.url+"/appEvent/evtuploadqm?evt_code="+evt_code, options)
      .then((data) => {
        // success
        this.nativeService.hideLoading();
        this.nativeService.showToast("上传成功")
        //获取详细信息
        var url = this.httpService.url + "/appEvent/evtpmwhdetail?evt_code="+evt_code;
        this.httpService.get(url).subscribe((res)=>{
          let data = res.json();
          console.log(data['r5rmDocs'])

          this.fileObjList=[];
          for(var i=0;i<data['r5rmDocs'].length;i++){
            var suffix = data['r5rmDocs'][i].doc_filename.substring(data['r5rmDocs'][i].doc_filename.lastIndexOf(".")+1);
            let fileObj = <FileObj>{'id':data['r5rmDocs'][i].doc_code,'origPath': data['r5rmDocs'][i].doc_filename, 'thumbPath': data['r5rmDocs'][i].doc_filename, 'suffix':suffix};
            this.fileObjList.push(fileObj);
          }
          this.fileObjListChange.emit(this.fileObjList);
        })
      }, (err) => {
        // error
        this.nativeService.showToast("上传失败")
        this.nativeService.hideLoading();
      })
  }

  upload2(filePath){
    console.log("evt_code="+this.evt_code)
    var filename = filePath.substring(filePath.lastIndexOf("/")+1)
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'files',
      fileName: filename,
      headers: {
      }
    }
    this.nativeService.showLoading("正在上传...");
    fileTransfer.upload(filePath,this.httpService.url+"/appEvent/"+this.ImgUploadUrl+"?rcv_event="+this.rcv_event
      +"&rcv_act="+this.rcv_act+"&evt_code="+this.evt_code+"&rcv_createdby="+this.username, options)
      .then((data) => {
        // success
        this.nativeService.hideLoading();
        this.nativeService.showToast("上传成功")
        //获取详细信息
        var url = this.httpService.url + "/appEvent/"+this.ImgUrl+"?evt_code="+this.evt_code+"&evt_code2="+this.rcv_event+"&pageNum="+this.pageNum;
        this.httpService.get(url).subscribe((res)=>{
          let data = res.json();
          console.log(data['r5rmDocs'])

          this.fileObjList=[];
          //给图片的数组是复制
          for(var i=0;i<data['r5rmDocs'].length;i++){
            var suffix = data['r5rmDocs'][i].rcd_doc.substring(data['r5rmDocs'][i].rcd_doc.lastIndexOf(".")+1);
            let fileObj = <FileObj>{'id':data['r5rmDocs'][i].rcd_id,'origPath': data['r5rmDocs'][i].rcd_doc,'thumbPath': data['r5rmDocs'][i].rcd_doc, 'suffix':suffix};
            this.fileObjList.push(fileObj);
          }
          console.log(this.fileObjList);
          this.fileObjListChange.emit(this.fileObjList);
        })
      }, (err) => {
        // error
        this.nativeService.showToast("上传失败")
        this.nativeService.hideLoading();
      })
  }

  //拍照成功或选择图片成功后赋值
  private getPictureSuccess(img) {
    /*if (this.destinationType == 0) {
      img = 'data:image/jpg;base64,' + img;
    }*/
    console.log("img:"+img)
    var suffix = img.substring(img.lastIndexOf(".")+1);
    let fileObj = <FileObj>{'origPath': img, 'thumbPath': img, 'suffix':suffix};
    this.fileObjList.push(fileObj);
    this.fileObjListChange.emit(this.fileObjList);//子组件暴露一个 EventEmitter 属性，当事件发生时，子组件利用该属性 emits( 向上弹射 ) 事件。父组件绑定到这个事件属性，并在事件发生时作出回应
  }

  viewerPicture(index) {//照片预览
    let picturePaths = [];
    for (let fileObj of this.fileObjList) {
      picturePaths.push(fileObj.origPath);
    }
    //this.navCtrl.push(ViewerPic, {'initialSlide': index, 'picturePaths': picturePaths});
    this.modalCtrl.create(ViewerPic, {'initialSlide': index, 'picturePaths': picturePaths}).present();
  }

  //press事件长按触发
  deletePicture(i,doc_code) {//删除照片
    this.storage.get("ImgUploadUrl").then((res)=>{
      this.ImgUploadUrl = res;
      console.log("ImgUploadUrl:"+this.ImgUploadUrl)
    })
    console.log(doc_code)
    if (!this.allowDelete) {
      return;
    }
    let that = this;
    that.actionSheetCtrl.create({
      buttons: [
        {
          text: '删除',
          role: 'destructive',
          handler: () => {
            var url=""
            var body=""
            if(this.ImgUploadUrl=='evtuploadwd'){
              url = this.httpService.url + "/appEvent/deletewddoc"
              body = "rcd_id="+doc_code
            }else {
              url = this.httpService.url + "/appEvent/deleteeamdoc"
              body = "doc_code="+doc_code
            }


            this.httpService.post(url,body).subscribe((res)=>{
              let data = res.json();
              this.nativeService.showToast(data['message'])
              if(data['resultCode']==1) {
                that.fileObjList.splice(i, 1);
              }
            })

          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    }).present();
  }
}
