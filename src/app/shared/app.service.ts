import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class FileUploadService {
    /**
     *
     */
    constructor(private http: HttpClient) {
        
    }

    uploadFile(user) : Observable<any>{
        return this.http.post<JSON>('http://localhost:58303/api/uploadattachment/', user);
    }
}

export class UserModel{
    name:string;
    email: string;
    fileName:string;
    Attachment: File;
  }