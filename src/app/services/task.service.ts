import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL = 'https://api.asambleasyjuntasdirectivas.com/api' 

  constructor( private http: HttpClient) { }

  getTasks(){
    return this.http.get<any>(this.URL + '/tasks')
  }

  postUserInfo(){
    return this.http.post<any>(this.URL + '/registroInicial',{})
  }

  getPrivateTasks(){
    return this.http.get<any>(this.URL + '/private-tasks')
  }

  getDataInfo(){
    return this.http.get<any>(this.URL + '/infoUser') 
  }

   getDataInfoUser(){
    return this.http.get<any>(this.URL + '/infoUserUser') 
  }

  getDataAsistenciaUser(){
    return this.http.get<any>(this.URL + '/dataasistenciauser') 
  }

  getDataAsistenciaUserTiem(){
    return this.http.get<any>(this.URL + '/dataasistenciausertiem') 
  }

  getDataInfoAsamblea(){
    return this.http.get<any>(this.URL + '/DataInfoAsamblea')
  }

  getDataInfoAsambleas(){
    return this.http.get<any>(this.URL + '/DataInfoAsambleas')
  }

  getDataInfoAsambleasDocument(){
    return this.http.get<any>(this.URL + '/DataInfoAsambleadocumes')
  }

  getDataInfoAsambleasVotaciones(){
    return this.http.get<any>(this.URL + '/DataInfoAsambleavotaciones')
  }

  getDataInfoAsambleasVotacion(data){
    return this.http.post<any>(this.URL + '/DataInfoAsambleavotacion',data)
  }

  getDataInfoAsambleasVotacionmulti(data){
    return this.http.post<any>(this.URL + '/DataInfoAsambleavotacionmulti',data)
  }
}

