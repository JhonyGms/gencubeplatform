import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GraficasService {
 
  private URL = 'https://api.asambleasyjuntasdirectivas.com/api' 

  constructor( 
    private http: HttpClient,
    private router: Router) { }

    quorum() {
      return this.http.get<any>(this.URL + '/quorum' );
    }

    quorumadmin(ID) {
      return this.http.post<any>(this.URL + '/quorum', ID );
    }

    qcrearvotacion(ID) {
      return this.http.post<any>(this.URL + '/crearvotacion', ID );
    }

    qvotacioninfo(ID) {
      return this.http.post<any>(this.URL + '/votacioninfo', ID );
    }

    resultadoVotaciones(ID) {
      return this.http.post<any>(this.URL + '/resultadovotaciones', ID );
    }
    resultadoVotacionessave(ID) {
      return this.http.post<any>(this.URL + '/resultadovotacionessave', ID );
    }
    resultadoVotacionesquorum(ID) {
      return this.http.post<any>(this.URL + '/resultadovotacionesquo', ID );
    }

    resultadoVotacionesquorumq(ID) {
      return this.http.post<any>(this.URL + '/resultadovotacionesquoq', ID );
    }
    resultadovotacionesquoq
    
    resultadoVotacionesdos(ID) {
      return this.http.post<any>(this.URL + '/resultadovotacionesdos', ID ); 
    } 

    votacionesActivar(ID) {
      return this.http.post<any>(this.URL + '/votacionesactivar', ID );
    }
    votacionesDesactivar(ID) {
      return this.http.post<any>(this.URL + '/votacionesdesactivar', ID );
    }
}
 