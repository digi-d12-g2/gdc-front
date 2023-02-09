import { Injectable } from '@angular/core';
import {AlertService} from '../services/alert/alert.service';
import {catchError, map} from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(
    private alertSrv: AlertService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return new Observable((observer) => {

      next.handle(request).subscribe(
        () => {},
        (err: HttpErrorResponse) => {
          this.alertSrv.error(err.error.message);
          console.log(err);
        }
      )

    });
  }
}
