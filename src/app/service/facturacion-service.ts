import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, headersglobal, headerstoken } from 'src/environments/environment';
import { BoCabeceraModel } from '../modelo/bocabecera-model';
import { timeout, catchError } from 'rxjs/operators';
/**
* CLASE TIPO SERVICE DONDE SE REALIZA INVOCACION A METODO API VARIOS
*/
@Injectable({
    providedIn: 'root'
})
export class FacturacionService {
    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(private _httpClient: HttpClient) { }
    
    GetBoletoFactura(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.factura}GetBoletoFactura`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getFacturaSelectNC(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.notacredito}GetFacturaSelectNC`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getFacturaSelect2(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.notacredito}GetFacturaSelect2`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getFacturaSelect(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.factura}GetFacturaSelect`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    procesarFacturaAnu(par1: string,) {
        var _model: any = {
            fa_codigo: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.factura}ProcesarFacturaAnu`, _model, { headers: headersglobal.headers }).pipe()
    }
    procesarNotaCredito(par1: string,) {
        var _model: any = {
            fa_codigo: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.notacredito}ProcesarNotaCredito`, _model, { headers: headersglobal.headers }).pipe()
    }
    procesarFactura(par1: string,) {
        var _model: any = {
            fa_codigo: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.factura}ProcesarFactura`, _model, { headers: headersglobal.headers }).pipe()
    }
    procesarDocumentos(docunentos: any[]) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.contabilidad}ProcesarDocumentos`, docunentos, { headers: headersglobal.headers }).pipe()
    }
    numeroNotaCredito(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.notacredito}NumeroNotaCredito`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    numeroFactura(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.factura}NumeroFactura`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    insertNotaCredito(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.notacredito}InsertNotaCredito`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertFactura(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.factura}InsertFactura`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertFacturaPagar(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.cuentaxpagar}InsertFacturaPagar`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertRetencionFactura(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.factura}InsertRetencionFactura`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteFacturaPagar(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.cuentaxpagar}DeleteFacturaPagar`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteFacturaRet(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.factura}DeleteFacturaRet`, _model, { headers: headersglobal.headers }).pipe()
    }
    retonoRetenciones(_model: string) {
        var parambusquedad = {
            par1: _model
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.cuentaxpagar}RetonoRetenciones`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    cargaOrdenFactura(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.cuentaxpagar}CargaOrdenFactura`, _model, { headers: headersglobal.headers }).pipe()
    }
    cargaOrdenCompra(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.cuentaxpagar}CargaOrdenCompra`, _model, { headers: headersglobal.headers }).pipe()
    }
    cargaOrdenCompraSelect(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.cuentaxpagar}CargaOrdenCompraSelect`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getFacturaRetSelect(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.factura}GetFacturaRetSelect`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    cargaFacturaPagarSelect(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.cuentaxpagar}CargaFacturaPagarSelect`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    insertOrdenCompra(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.ordencompra}InsertOrdenCompra`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteFactura(_model: BoCabeceraModel) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.factura}DeleteFactura`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteOrdenCompra(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.ordencompra}DeleteOrdenCompra`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateFactura2(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.factura}UpdateFactura2`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateFacturanc(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.notacredito}updateFacturanc`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateFactura(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.factura}UpdateFactura`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateFacturaPagar(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.cuentaxpagar}UpdateFacturaPagar`, _model, { headers: headersglobal.headers }).pipe()
    }
    
    updateOrdenCompra(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.ordencompra}UpdateOrdenCompra`, _model, { headers: headersglobal.headers }).pipe()
    }
}
