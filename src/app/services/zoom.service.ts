import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  private URL = 'https://api.asambleasyjuntasdirectivas.com/api' 

  constructor( private http: HttpClient) { }

  getGenerateSignature(){
    return this.http.get<any>(this.URL + '/signature')
  }


}
