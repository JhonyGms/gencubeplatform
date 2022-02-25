import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
}) 
export class AuthService {

  private URL = 'https://api.asambleasyjuntasdirectivas.com/api' 



  constructor( 
    private http: HttpClient,
    private router: Router) { }

  signUp(user) {
    return this.http.post<any>(this.URL + '/registro' , user);
  }

  signIn(user) {
    return this.http.post<any>(this.URL + '/logear' , user);
  }
  
  signInUser(user) {
    return this.http.post<any>(this.URL + '/logearUser' , user);
  }

  signInUserLogo(user) {
    return this.http.post<any>(this.URL + '/logearUserLogo' , user);
  }

  listAsam() {
    return this.http.get<any>(this.URL + '/listasambleas');
  }

  formularioInicial(user) {
    return this.http.post<any>(this.URL + '/formularioinicial',user);
  }

  loggedIn(): Boolean{
    return !!localStorage.getItem('token');
  }

  loggedInUser(): Boolean{
    return !!localStorage.getItem('tokenUser');
  }


  getToken() {
    return localStorage.getItem('token')
  }

  getTokenUser() {
    return localStorage.getItem('tokenUser')
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenUser');
    this.router.navigate(['/usuario'])
  }
}
