import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService:AuthServiceService) { }

  intercept(req:any, next:any) {
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
