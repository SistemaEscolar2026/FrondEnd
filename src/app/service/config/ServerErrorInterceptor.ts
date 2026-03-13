import { Injectable } from '@angular/core';
import { 
  HttpEvent, HttpRequest, HttpHandler, 
  HttpInterceptor, HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

/**
* CLASE TIPO SERVICE DONDE SE CONTROLA LOS ERRORES DEL LADO DE SERVIDOR
*/
@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  /**
  * OBJETO QUE INTERCETA LOS ERRORS DEL PORTAL 
  */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );    
  }
}
