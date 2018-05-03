/**
 * Created by SeaRan on 2017/8/4.
 */
import {Injectable} from "@angular/core";
import {Loading, LoadingController, Platform, ToastController, AlertController} from "ionic-angular";
import {Network} from "@ionic-native/network";
import {Toast} from "@ionic-native/toast";
import {Camera,CameraOptions} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";
import {File,FileEntry} from "@ionic-native/file";
import {Observable} from "rxjs";
import {FileChooser} from "@ionic-native/file-chooser";
import {MediaCapture, MediaFile, CaptureVideoOptions,CaptureError} from "@ionic-native/media-capture";
import {VideoPlayer} from "@ionic-native/video-player";
import {DatePicker} from "@ionic-native/date-picker";

declare var AppMinimize;
@Injectable()
export class NativeService{
  private loading: Loading;
  private loadingIsOpen: boolean = false;
  constructor(public loadingCtrl:LoadingController,private platform: Platform,
              private network: Network,
              public toast:Toast,
              public toastCtrl:ToastController,
              public camera:Camera,
              public imagePicker:ImagePicker,
              public file:File,
              public alertCtrl:AlertController,
              private fileChooser: FileChooser,
              private mediaCapture: MediaCapture,
              private videoPlayer: VideoPlayer,
              public datePicker:DatePicker){

  }


  /**
   * 统一调用此方法显示提示信息
   * @param message 信息内容
   * @param duration 显示时长
   */
  showToast(message: string = '操作完成', duration: number = 2000): void {
    if (this.isMobile()) {
      this.toast.show(message, String(duration), 'center').subscribe();
    } else {
      this.toastCtrl.create({
        message: message,
        duration: duration,
        position: 'middle',
        showCloseButton: false
      }).present();
    }
  };

  showAlert(title,subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['确定']
    });
    alert.present();
  }


  //统一调用此方法显示loading
  showLoading(content:string=''):void{
    if(!this.loadingIsOpen){
      this.loadingIsOpen = true;
      this.loading = this.loadingCtrl.create({
        content:content
      });
      this.loading.present();
      setTimeout(()=>{//最长显示10秒
        this.loadingIsOpen && this.loading.dismiss();
        this.loadingIsOpen = false;
      },20000)
    }
  };

  //关闭loading
  hideLoading():void{
    this.loadingIsOpen && this.loading.dismiss();
    this.loadingIsOpen = false;
  }

  /**
   * 是否真机环境
   * @return {boolean}
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   * @return {boolean}
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
   */
  getNetworkType(): string {
    if (!this.isMobile()) {
      return 'wifi';
    }
    return this.network.type;
  }

  /**
   * 判断是否有网络
   * @returns {boolean}
   */
  isConnecting(): boolean {
    return this.getNetworkType() != 'none';
  }

  /**
   * 调用最小化app插件
   */
  appMinimize() {
    AppMinimize.minimize();
  }

  /**
   * 使用cordova-plugin-camera获取照片
   * @param options
   * @returns {Promise<string>}
   */
  getPictures(options: CameraOptions = {}): Observable<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
      destinationType: this.camera.DestinationType.DATA_URL,//默认返回base64字符串,DATA_URL:base64   FILE_URI:图片路径
      quality: 100,//图像质量，范围为0 - 100
      allowEdit: false,//选择图片前是否允许编辑
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 1000,//缩放图像的宽度（像素）
      targetHeight: 1000,//缩放图像的高度（像素）
      saveToPhotoAlbum: false,//是否保存到相册
      correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
    }, options);
    return Observable.create(observer => {
      this.camera.getPicture(ops).then((imgData: string) => {
        if (ops.destinationType === this.camera.DestinationType.DATA_URL) {
          observer.next('data:image/jpg;base64,' + imgData);
        } else {
          observer.next(imgData);
        }
      }).catch(err => {
        if (err == 20) {
          this.showToast('没有权限,请在设置中开启权限');
          return;
        }
        if (String(err).indexOf('cancel') != -1) {
          return;
        }
        //this.logger.log(err, '使用cordova-plugin-camera获取照片失败');
        this.showToast('获取照片失败');
      });
    });
  };

  /**
   * 通过拍照获取照片
   * @param options
   * @return {Promise<string>}
   */
  getPictureByCameras(options: CameraOptions = {}): Observable<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
    }, options);
    return this.getPictures(ops);
  };

  /**
   * 通过图库选择多图
   * @param options
   * @return {Promise<T>}
   */
  getMultiplePicture(options = {}): Promise<any> {
    let that = this;
    let destinationType = options['destinationType'] || 0;//0:base64字符串,1:图片url
    let maximumImagesCount = options['maximumImagesCount'];
    return new Promise((resolve) => {
      this.imagePicker.getPictures(Object.assign({
        maximumImagesCount: maximumImagesCount,
        width: 1000,//缩放图像的宽度（像素）
        height: 1000,//缩放图像的高度（像素）
        quality: 100//图像质量，范围为0 - 100
      }, options)).then(files => {
        if (destinationType === 1) {
          resolve(files);
        } else {
          let imgBase64s = [];//base64字符串数组
          for (let fileUrl of files) {
            that.convertImgToBase64(fileUrl, base64 => {
              imgBase64s.push(base64);
              if (imgBase64s.length === files.length) {
                resolve(imgBase64s);
              }
            });
          }
        }
      }).catch(err => {
        this.warn('getMultiplePicture:' + err);
        this.showToast('获取照片失败');
      });
    });
  };

  getMultiplePictures(options = {}): Observable<any> {
    let that = this;
    let ops = Object.assign({
      maximumImagesCount: 4,
      width: 1000,//缩放图像的宽度（像素）
      height: 1000,//缩放图像的高度（像素）
      quality: 100//图像质量，范围为0 - 100
    }, options);
    return Observable.create(observer => {
      this.imagePicker.getPictures(ops).then(files => {
        let destinationType = options['destinationType'] || 0;//0:base64字符串,1:图片url
        if (destinationType === 1) {
          observer.next(files);
        } else {
          let imgBase64s = [];//base64字符串数组
          for (let fileUrl of files) {
            that.convertImgToBase64_1(fileUrl).subscribe(base64 => {
              imgBase64s.push(base64);
              if (imgBase64s.length === files.length) {
                observer(imgBase64s);
              }
            });
          }
        }
      }).catch(err => {
        //this.logger.log(err, '通过图库选择多图失败');
        this.showToast('获取照片失败');
      });
    });
  };

  /**
   * 拍摄视频
   */
  takeVideo():Observable<MediaFile[]>{
    return Observable.create((resolve)=>{
      let options: CaptureVideoOptions = {
        limit: 1,
        duration:10,
        quality:50
      };
      this.mediaCapture.captureVideo(options)
        .then(
          (data: MediaFile[]) => {
            resolve.next(data),
            console.log(data)
          },
          (err: CaptureError) => {
            console.error(err),
            this.showToast("拍摄失败")
          }
          )
    })
  }

  /**
   * 播放视频
   */
  playVideo(data){
    this.showLoading("正在加载...")
    this.videoPlayer.play(data).then(() => {
      this.hideLoading();
      console.log('video completed');
    }).catch(err => {
      console.log(err);
      this.hideLoading();
    });
  }


  chooseVideo() {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType:0,
      mediaType: 1,//为1时允许选择视频文件
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image =  imageData;
      //this.path = base64Image;
      //this.profilePicture="assets/img/video.png";//选择视频后，image另外显示一张图片，目前还无法获取视频的第一帧图片。
      //alert(this.path);
    }, (err) => {
      // Handle error
    });

  }

  /**
   * 根据图片绝对路径转化为base64字符串
   * @param url 绝对路径
   * @param callback 回调函数
   */
  convertImgToBase64(url: string, callback) {
    this.getFileContentAsBase64(url, function (base64Image) {
      callback.call(this, base64Image.substring(base64Image.indexOf(';base64,') + 8));
    })
  }

  convertImgToBase64_1(path: string): Observable<string> {
    return Observable.create(observer => {
      this.file.resolveLocalFilesystemUrl(path).then((fileEnter: FileEntry) => {
        fileEnter.file(file => {
          let reader = new FileReader();
          reader.onloadend = function (e) {
            observer.next(this.result);
          };
          reader.readAsDataURL(file);
        });
      }).catch(err => {
        //this.logger.log(err, '根据图片绝对路径转化为base64字符串失败');
      });
    });
  }

  private getFileContentAsBase64(path: string, callback) {
    function fail(err) {
      console.log('Cannot found requested file' + err);
    }

    function gotFile(fileEntry) {
      fileEntry.file(function (file) {
        let reader = new FileReader();
        reader.onloadend = function (e) {
          let content = this.result;
          callback(content);
        };
        reader.readAsDataURL(file);
      });
    }

    this.file.resolveLocalFilesystemUrl(path).then(fileEnter => gotFile(fileEnter)).catch(err => fail(err));
    // window['resolveLocalFileSystemURL'](path, gotFile, fail);
  }

  warn(info): void {
    console.log('%cNativeService/' + info, 'color:#e8c406');
  }

  //文件选择器
  openFile(){
    this.fileChooser.open()
      .then(uri => {console.log(uri);this.showToast(uri)})
      .catch(e => console.log(e));
  }


  //时间选择器年月日时分
  datePickers():Observable<Date>{
    return Observable.create(observer=>{
      this.datePicker.show({
        date: new Date(),
        mode: 'datetime',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
        is24Hour:true
      }).then(
        date => {
          console.log(date)
          //alert(date);
          var Y = date.getFullYear();
          var M = (date.getMonth()+1)/10<1?"0"+(date.getMonth()+1):(date.getMonth()+1);
          var D = date.getDate()/10<1?"0"+date.getDate():date.getDate();
          var H = date.getHours()/10<1?"0"+date.getHours():date.getHours();
          var m = date.getMinutes()/10<1?"0"+date.getMinutes():date.getMinutes();
          var s = date.getSeconds()/10<1?"0"+date.getSeconds():date.getSeconds();
          observer.next(Y+"-"+M+"-"+D+" "+H+":"+m)
        },
        err => console.log('Error occurred while getting date: ', err)
      );
    })
  }

  //时间选择器yyyy-MM-DD HH:mm:ss
  datePickerss():Observable<Date>{
    return Observable.create(observer=>{
      this.datePicker.show({
        date: new Date(),
        mode: 'datetime',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
        is24Hour:true
      }).then(
        date => {
          console.log(date)
          //alert(date);
          var Y = date.getFullYear();
          var M = (date.getMonth()+1)/10<1?"0"+(date.getMonth()+1):(date.getMonth()+1);
          var D = date.getDate()/10<1?"0"+date.getDate():date.getDate();
          var H = date.getHours()/10<1?"0"+date.getHours():date.getHours();
          var m = date.getMinutes()/10<1?"0"+date.getMinutes():date.getMinutes();
          var s = date.getSeconds()/10<1?"0"+date.getSeconds():date.getSeconds();
          observer.next(Y+"-"+M+"-"+D+" "+H+":"+m)
        },
        err => console.log('Error occurred while getting date: ', err)
      );
    })
  }
  //时间选择器yyyy-MM-DD
  datePickersss():Observable<Date>{
    return Observable.create(observer=>{
      this.datePicker.show({
        date: new Date(),
        mode: 'date',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
        is24Hour:true
      }).then(
        date => {
          console.log(date)
          //alert(date);
          var Y = date.getFullYear();
          var M = (date.getMonth()+1)/10<1?"0"+(date.getMonth()+1):(date.getMonth()+1);
          var D = date.getDate()/10<1?"0"+date.getDate():date.getDate();
          var H = date.getHours()/10<1?"0"+date.getHours():date.getHours();
          var m = date.getMinutes()/10<1?"0"+date.getMinutes():date.getMinutes();
          var s = date.getSeconds()/10<1?"0"+date.getSeconds():date.getSeconds();
          observer.next(Y+"-"+M+"-"+D)
        },
        err => console.log('Error occurred while getting date: ', err)
      );
    })
  }
}
