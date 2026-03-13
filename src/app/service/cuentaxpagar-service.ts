import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, headersglobal, headerstoken } from 'src/environments/environment';
import { BoCabeceraModel } from '../modelo/bocabecera-model';
import { timeout, catchError } from 'rxjs/operators';
import { DetallePago } from '../modelo/detallePago-model';
/**
* CLASE TIPO SERVICE DONDE SE REALIZA INVOCACION A METODO API VARIOS
*/
@Injectable({
    providedIn: 'root'
})
export class CuentaxPagarService {
    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(private _httpClient: HttpClient) { }
    InsertDocumentoCXP(_model:any) {

        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.cuentaxpagar}InsertDocumentoCXP`, _model, { headers: headersglobal.headers }).pipe(timeout(500000))
    }
    UpdateDocumentoCXP(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.cuentaxpagar}UpdateDocumentoCXP`, _model, { headers: headersglobal.headers }).pipe(timeout(500000))
    }
    DeleteDocumentoCXP(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.cuentaxpagar}DeleteDocumentoCXP`, _model, { headers: headersglobal.headers }).pipe(timeout(500000))
    }
    

    cargaBoletopagoretencion(par1: string, par2: string, par3: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.cuentaxcobrar}CargaBoletoPagoRetencion`, parambusquedad, { headers: headersglobal.headers }).pipe(timeout(500000))
    }
    getDocumentoCXP(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.cuentaxpagar}GetDocumentoCXP`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    insertPago(_model: DetallePago[]) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.cuentaxcobrar}InsertPago`, _model, { headers: headersglobal.headers }).pipe()
    }

}
