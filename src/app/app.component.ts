import { Component , OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs';
import { FileUploadService } from './shared/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  public fileUpload;
  user :UserModel = new UserModel();
  globalfileName;
  myForm:NgForm;
  fileToUpload : File = null;
  constructor(public http:Http, public fileService: FileUploadService){}
  ngOnInit(){}  
  onChange(file: FileList){
    // let fileList: FileList = e.target.files;
    // if (fileList.length > 0) {
    //     let file: File = fileList[0];
    //     this.fileUpload = file;
    //     var ticks = ((new Date().getTime() * 10000) + 621355968000000000);
    //     this.globalfileName = file.name.split('.')[0] + "_" + ticks + "." + file.name.split('.')[1];
    // }
    this.fileToUpload = file.item(0);
    this.globalfileName = this.fileToUpload.name;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  onSubmit(data){
    console.log(data);
    this.user.name = data.name;
    this.user.email = data.email
    this.user.fileName= this.globalfileName;
    this.user.Attachment = this.fileToUpload
    // this.user.fileName = this.globalfileName;
    let formData: FormData = new FormData();
    formData.append('uploadFile', this.fileToUpload, this.globalfileName);
    formData.append('jsonData',JSON.stringify(this.user));
    let headers = new Headers()
    let options = new RequestOptions({ headers: headers });
    let apiUrl1 = "/api/UploadFileApi";
    this.fileService.uploadFile(formData).subscribe(data => {
       console.log(data);
    });
     //return this.http.post('http://localhost:58303/api/uploadattachment/', formData, options);
    // .map(res => res.json());
        // .map(res => res.json())
        // .subscribe(
        // data => console.log("data"),
        // error => console.log(error)
        // )
 }

 

}
export class UserModel{
  name:string;
  email: string;
  fileName:string;
  Attachment: File;
}