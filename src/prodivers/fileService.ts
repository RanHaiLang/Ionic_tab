import {Injectable} from "@angular/core";
import {HttpService} from "./httpService";
import {NativeService} from "./nativeService";
import {Observable} from "rxjs";
import {FileObj} from "../model/FileObj";
import {Response, RequestOptions} from "@angular/http";
import {FileTransfer, FileTransferObject,FileUploadOptions} from "@ionic-native/file-transfer";
import {File} from "@ionic-native/file";
import {YufangxingweihugongdanPage} from "../pages/yufangxingweihugongdan-list/yufangxingweihugongdan/yufangxingweihugongdan";
import {XunzhangongdanPage} from "../pages/xunzhangongdan-list/xunzhangongdan/xunzhangongdan";
import {Storage} from "@ionic/storage";
@Injectable()
export class FileService {
  constructor(private httpService: HttpService, private nativeService: NativeService,
              private transfer: FileTransfer,private file: File,public storage:Storage) {
  }

  /**
   * 根据文件id获取文件信息
   * @param id
   * @returns {FileObj}
   */
  getFileInfoById(id: string): Observable<FileObj> {
    if (!id) {
      return Observable.of({});
    }
    return this.httpService.get("FILE_SERVE_URL" + '/getById', {id: id}).map((res: Response) => {
      let result = res.json();
      if (!result.success) {
        //this.nativeService.alert(result.msg);
        return {};
      } else {
        let fileObj = result.data;
        fileObj.origPath = "FILE_SERVE_URL" + fileObj.origPath;
        fileObj.thumbPath = "FILE_SERVE_URL" + fileObj.thumbPath;
        return fileObj;
      }
    });
  }

  /**
   * 根据文件id数组获取文件信息
   * @param ids
   * @returns {FileObj[]}
   */
  getFileInfoByIds(ids: string[]): Observable<FileObj[]> {
    if (!ids || ids.length == 0) {
      return Observable.of([]);
    }
    return this.httpService.get("FILE_SERVE_URL" + '/getByIds', {ids: ids}).map((res: Response) => {
      let result = res.json();
      if (!result.success) {
        //this.nativeService.alert(result.msg);
        return [];
      } else {
        for (let fileObj of result.data) {
          fileObj.origPath = "FILE_SERVE_URL" + fileObj.origPath;
          fileObj.thumbPath = "FILE_SERVE_URL" + fileObj.thumbPath;
        }
        return result.data;
      }
    });
  }

  /**
   * 批量上传图片,只支持上传base64字符串
   * @param fileObjList 数组中的对象必须包含bse64属性
   * @returns {FileObj[]}
   */
  basestr:any=[];
  uploadMultiByBase64(fileObjList: FileObj[]): Observable<FileObj[]> {
    if (!fileObjList || fileObjList.length == 0) {
      return Observable.of([]);
    }
    //this.nativeService.showToast(fileObjList[0]+"");
    //获取图片base64字符串存入新数组中
    this.basestr=[];
    for(let i=0;i<fileObjList.length;i++){
      this.basestr.push(fileObjList[i].base64)
      console.log(fileObjList[i].base64)
    }
    console.log(this.basestr)
    return this.httpService.post(this.httpService.url + '/appEvent/evtuploabase', "basestr="+this.basestr).map((res: Response) => {
      let result = res.json();
      if (!result.success) {
        this.nativeService.showAlert("操作提示",result.msg);
        return [];
      } else {
        for (let fileObj of result.data) {
          fileObj.origPath = this.httpService.url + fileObj.origPath;
          fileObj.thumbPath = this.httpService.url + fileObj.thumbPath;
        }
        return result.data;
      }
    });
  }


  /**
   * 上传单张图片,只支持上传base64字符串
   * @param fileObj 对象必须包含origPath属性
   * @returns {FileObj}
   */
  uploadByBase64(fileObj: FileObj): Observable<FileObj> {
    if (!fileObj.base64) {
      return Observable.of({});
    }
    return this.httpService.post(this.httpService.url + '/appUpload?directory=liveWork', [fileObj]).map((res: Response) => {
      let result = res.json();
      if (!result.success) {
        //this.nativeService.alert(result.msg);
        return [];
      } else {
        let fileObj = result.data[0];
        fileObj.origPath = "FILE_SERVE_URL" + fileObj.origPath;
        fileObj.thumbPath = "FILE_SERVE_URL" + fileObj.thumbPath;
        return fileObj;
      }
    });
  }

  /**
   * 批量上传图片
   * @param fileObjList 数组中的对象必须包含origPath属性
   * @returns {FileObj[]}
   */
  uploadMultiByFilePath(fileObjList: FileObj[]): Observable<FileObj[]> {
    if (fileObjList.length == 0) {
      return Observable.of([]);
    }
    return Observable.create((observer) => {
      this.nativeService.showLoading("正在上传...");
      let fileObjs = [];
      for (let fileObj of fileObjList) {
        this.nativeService.convertImgToBase64_1(fileObj.origPath).subscribe(base64 => {
          fileObjs.push({
            'base64': base64,
            'type': FileService.getFileType(fileObj.origPath),
            'parameter': fileObj.parameter
          });
          if (fileObjs.length === fileObjList.length) {
            this.uploadMultiByBase64(fileObjs).subscribe(res => {
              observer.next(res);
              this.nativeService.hideLoading();
            })
          }
        })
      }
    });
  }

  /**
   * app上传单张图片
   * @param fileObj 对象必须包含origPath属性
   * @returns {FileObj}
   */
  uploadByFilePath(fileObj: FileObj): Observable<FileObj> {
    if (!fileObj.origPath) {
      return Observable.of({});
    }
    return Observable.create((observer) => {
      this.nativeService.showLoading();
      this.nativeService.convertImgToBase64_1(fileObj.origPath).subscribe(base64 => {
        let file = <FileObj>({
          'base64': base64,
          'type': FileService.getFileType(fileObj.origPath),
          'parameter': fileObj.parameter
        });
        this.uploadByBase64(file).subscribe(res => {
          observer.next(res);
          this.nativeService.hideLoading();
        })
      })
    });
  }

  private static getFileType(path: string): string {
    return path.substring(path.lastIndexOf('.') + 1);
  }



  origPath:any=[];
  filename:any=[];
  filePaths: FileObj[] = [];
  //单张图片/单个视频上传
  upload(filePath,evt_code){
    console.log("evt_code="+evt_code)
    //this.nativeService.showAlert("fileObj:",filePath)
    //var filename = filePath.origPath.substring(filePath.origPath.lastIndexOf("/")+1)
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
          console.log(data['result'])
          this.storage.set("yfxwhImageDate",data['r5rmDocs'])
        })
      }, (err) => {
        // error
        this.nativeService.showToast("上传失败")
      })
  }

  //多张图片/多个视频上传
  uploadMultiBy(fileObjList:FileObj[]){
    for (let fileObj of fileObjList) {
      var filename = fileObj.origPath.substring(fileObj.origPath.lastIndexOf("/")+1)
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'files',
        fileName: filename,
        headers: {}
      }
      fileTransfer.upload(fileObj.origPath,this.httpService.url+"/currency/uploadvido", options)
        .then((data) => {
          // success
          console.log(data);
          if(data['result']==1){//上传成功

          }
          this.nativeService.showAlert("success:",data)
        }, (err) => {
          // error
          this.nativeService.showAlert("error:",err)
        })
    }
  }

}
