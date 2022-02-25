import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AsambleasService {

  private URL = 'https://api.asambleasyjuntasdirectivas.com/api' 

  constructor(
    private http: HttpClient,
    private router: Router) { }

    listAsambleaUser(id) {
      return this.http.post<any>(this.URL + '/asamblea/lista' , id);
    }  

    listvotacionesUser(id) {
      return this.http.post<any>(this.URL + '/asamblea/votaciones' , id);
    }  

    listvotacionesUserdos() {
      return this.http.get<any>(this.URL + '/asamblea/votacionesdos' );
    }  

    Activaasamble(data) {
      return this.http.post<any>(this.URL + '/asamblea/estado',data );
    } 
    
    Activarasamblea(data) {
      return this.http.post<any>(this.URL + '/asamblea/activar' ,data);
    }  

    Desactivarasamblea(data) {
      return this.http.post<any>(this.URL + '/asamblea/desactivar',data );
    } 

    AlmacenarDatos(data) {
      return this.http.post<any>(this.URL + '/asamblea/datosactualiza',data );
    }  

}
