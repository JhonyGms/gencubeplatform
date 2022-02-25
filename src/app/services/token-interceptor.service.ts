import { Injectable } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { AuthGuard } from '../auth.guard';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{



  constructor(
    private authoService: AuthService
  ) { }

  intercept(req, next){ 
    
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authoService.getToken()}`,
        AuthorizationUser: `Bearer ${this.authoService.getTokenUser()}`
      }
    })
  return next.handle(tokenizeReq)
  }

}
