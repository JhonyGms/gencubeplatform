import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private URL = 'https://api.asambleasyjuntasdirectivas.com/api' 

  constructor( private http: HttpClient) { }

  uploadfiles(formData){
    return this.http.post(this.URL + '/upload',formData)
  }

  uploadfilesAsamblea(asamblea){
    return this.http.post(this.URL + '/agregarAsamblea', asamblea)
  }
}
 