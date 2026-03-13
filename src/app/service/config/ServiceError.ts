import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

/**
* CLASE TIPO SERVICE DONDE SE CONTROLA LOS ERROR
*/
@Injectable({
  providedIn: 'root'
})
export class ServiceError {

  /**
* DEFINICION DE FUNCION QUE DEVULVE LOS MENSAJE DEL LADO DE CLIENTE
*/
  getClientMensaje(error: any): string {
    if (!navigator.onLine) {
      return 'No hay conexion Internet';
    }
    //return error.rejection.message ? error.rejection.message : error.toString();
    return error.toString();
  }

  /**
* DEFINICION DE FUNCION QUE DEVULVE LOS MENSAJE TIPO  DE INVOCACION DE CLIENTE
*/
  getClientStack(error: any): string {
    return error.stack;
  }

  /**
* DEFINICION DE FUNCION QUE DEVULVE LOS MENSAJE DEL LADO DEL SERVIDOR
*/
  getServerMensaje(error: HttpErrorResponse): string {
    return error.message;
  }

  /**
* DEFINICION DE FUNCION QUE DEVULVE LOS MENSAJE TIPO  DE INVOCACION DEL SERVIDOR
*/
  getServerStack(error: HttpErrorResponse): string {
    return 'stack';
  }
}
