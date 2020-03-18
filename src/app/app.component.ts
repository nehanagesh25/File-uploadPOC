import { Component , OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

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
  ngOnInit(){}  
  onChange(e){
    let fileList: FileList = e.target.files;
    if (fileList.length > 0) {
        let file: File = fileList[0];
        this.fileUpload = file;
        var ticks = ((new Date().getTime() * 10000) + 621355968000000000);
        this.globalfileName = file.name.split('.')[0] + "_" + ticks + "." + file.name.split('.')[1];
    }
  }
  onSubmit(data){
    console.log(data);
    this.user.name = data.name;
    this.user.email = data.email
    this.user.fileName= this.globalfileName;
    // this.user.fileName = this.globalfileName;
    let formData: FormData = new FormData();
    formData.append('uploadFile', this.fileUpload, this.globalfileName);
    formData.append('jsonData',JSON.stringify(this.user));


  }
}
export class UserModel{
  name:string;
  email: string;
  fileName:string;
}