import { HttpErrorResponse } from '@angular/common/http';
import { ServiceError } from './ServiceError';
import { ServiceMensaje } from './ServiceMensaje';
import { Injector, ErrorHandler, Injectable } from '@angular/core';

/**
* CLASE TIPO SERVICE DONDE SE CONTROLA LOS ERRORES GENERALES DEL PORTAL
*/
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  /**
* CONSTRUCTOR DE LA CLASE
*/
    constructor(private injector: Injector) { }

  /**
 * OBJETO QUE INTERCETA LOS ERRORES DE VALIDACION
 */
    handleError(error: Error | HttpErrorResponse) {

        const errorService = this.injector.get(ServiceError);
        
        const notifier = this.injector.get(ServiceMensaje);

        let message;
        let stackTrace;

        if (error instanceof HttpErrorResponse) {
            //  Error del Server
            message = errorService.getServerMensaje(error);
            stackTrace = errorService.getServerStack(error);
            notifier.showError(message);
        } else {
            //  Error de lado del Client
            message = errorService.getClientMensaje(error);
            stackTrace = errorService.getClientStack(error);
           // notifier.showError(message);
        }
        console.error(error);
    }
}
