import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private URL = 'https://api.asambleasyjuntasdirectivas.com/api' 

  constructor( private http: HttpClient) { }

  pdfquorum(id){
    return this.http.post<any>(this.URL + '/pdfquorum',id)
  }

  pdfquorumactualizado(id){
    return this.http.post<any>(this.URL + '/pdfquorumactualizado',id)
  }

  pdfvotaciones(id){
    return this.http.post<any>(this.URL + '/pdfvotaciones',id)
  }
}
