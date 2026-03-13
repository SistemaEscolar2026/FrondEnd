import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, headersglobal, headerstoken } from 'src/environments/environment';
import { BoCabeceraModel } from '../modelo/bocabecera-model';
import { timeout, catchError } from 'rxjs/operators';
import { BoDetalleModel } from '../modelo/bodetalle-model';
/**
* CLASE TIPO SERVICE DONDE SE REALIZA INVOCACION A METODO API VARIOS
*/
@Injectable({
    providedIn: 'root'
})
export class BancosService {
    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(private _httpClient: HttpClient) { }
    
    cargacierreconciliacion(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}GetCargaCierreConciliacion`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getCargaConciliacionCierreselect(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}GetCargaConciliacionCierreSelect`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getCargaConciliacionCierre(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}GetCargaConciliacionCierre`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteDocumentoBancario(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string, par8: string, par9: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7,
            par8: par8,
            par9: par9
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteDocumentoBancario`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteOrdenPago(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string, par8: string, par9: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7,
            par8: par8,
            par9: par9
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteOrdenPago`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteConciliacion(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string, par8: string, par9: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7,
            par8: par8,
            par9: par9
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteConciliacion`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    buscardocuemnto(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}GetDocumentos`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getOrdenPagoSele(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.ordenpago}getOrdenPagoSele`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getCargaConciliacionselec(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}GetCargaConciliacionselec`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    buscardocumentoselect(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}GetDocumentoSelec`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getCargaConciliacionCierreEstado(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}GetCargaConciliacionCierreEstado`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getCargaConciliacionPendiente(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}GetCargaConciliacionPendiente`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getOrdenPagoAprobar(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.ordenpago}getOrdenPagoAprobar`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getOrdenPago(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.ordenpago}getOrdenPago`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getCargaConciliacion(par1: string) {
        var parambusquedad = {
            par1: par1
        }
          return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}GetCargaConciliacion`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    buscardocumento(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}GetDocumento`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manBancos(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}GetBancos`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    deleteBancos(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}DeleteBancos`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteConciliacion(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}DeleteConciliacion`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteOrdenPago(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.ordenpago}DeleteOrdenPago`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteDocumentoBancario(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}DeleteDocumentoBancario`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertBancos(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}InsertBancos`, _model, { headers: headersglobal.headers }).pipe()
    }
    UpdateOrdenReverso(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.ordenpago}UpdateOrdenReverso`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateOrdenAprobacion(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.ordenpago}UpdateOrdenAprobacion`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertOrdenPago(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.ordenpago}InsertOrdenPago`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertConciliacionBancaria(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}InsertConcilacionBancaria`, _model, { headers: headersglobal.headers }).pipe()
    }

    insertDocumentoBancio(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}InsertDocumentoBancos`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateOrdenPago(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.ordenpago}UpdateOrdenPago`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateConcilacionBancaria(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}UpdateConcilacionBancaria`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateConcilacionBancariaCierre(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}UpdateConcilacionBancariaCierre`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateCierreConcilacionBancaria(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}UpdateCierreConcilacionBancaria`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateDocumentoBancio(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}UpdateDocumentoBancos`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateBancos(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}UpdateBancos`, _model, { headers: headersglobal.headers }).pipe()
    }
    manNumeroCuenta3p(par1: string, par2: string, par3: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}GetNumeroCuenta3p`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    GetNumeroCuenta3pnw(par1: string, par2: string, par3: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}GetNumeroCuenta3pnw`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manCuentaBancaria(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}GetCuentaBancaria`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    deleteCuentaBancaria(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}DeleteCuentaBancaria`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertCuentaBancaria(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}InsertCuentaBancaria`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateCuentaBancaria(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}UpdateCuentaBancaria`, _model, { headers: headersglobal.headers }).pipe()
    }

    
    manNumeroCuenta(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}GetNumeroCuenta`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manTipoDocumento(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}GetTipoDocumento`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    deleteNumeroCuenta(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}DeleteNumeroCuenta`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteTipoDocumento(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}DeleteTipoDocumento`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertNumeroCuenta(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}InsertNumeroCuenta`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertTipoDocumento(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}InsertTipoDocumento`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateNumeroCuenta(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}UpdateNumeroCuenta`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateTipoDocumento(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.bancos}UpdateTipoDocumento`, _model, { headers: headersglobal.headers }).pipe()
    }
}