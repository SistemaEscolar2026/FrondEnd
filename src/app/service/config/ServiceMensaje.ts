import { Injectable} from '@angular/core';
import {  ToastrService } from 'ngx-toastr';


/**
* CLASE TIPO SERVICE DONDE SE INVOCA MENSAJE TIPO TOAS
*/
@Injectable({
  providedIn: 'root'
})

export class ServiceMensaje {

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private toastr: ToastrService,) { }

  /**
* DEFINICION DE FUNCION LOS MENSAJE NORMAL
*/
  showSuccess(title:string,message: string): void {
    this.toastr.info(title, message);
  }
  /**
* DEFINICION DE FUNCION LOS MENSAJE OK
*/
  showok(title: string, message: string): void {
    this.toastr.success(title, message);
  }
  /**
* DEFINICION DE FUNCION LOS MENSAJE DE ERROR
*/
  showError(message: string): void {
    this.toastr.error("", message);
    
  }

}
