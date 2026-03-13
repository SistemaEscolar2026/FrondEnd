import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, headersglobal, headerstoken } from 'src/environments/environment';

/**
* CLASE TIPO SERVICE DONDE SE REALIZA INVOCACION A METODO API VARIOS
*/
@Injectable({
    providedIn: 'root'
})
export class SriService {
    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(private _httpClient: HttpClient) { }


    getSriComprasDocs( par1: string, par2: string, par3: string) {


        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        };
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}GetSriComprasDocs`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getSriVentasDocs(par1: string, par2: string, par3: string) {


        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        };
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}GetSriVentasDocs`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }


    getSriCompra( par1: string, par2: string, par3: string, par4: string) {


        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4
        };
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}GetSriCompras`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getSriVentas(par1: string, par2: string, par3: string, par4: string) {


        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4
        };
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}GetSriVentas`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }

    insertDatosAll(_model: any[]) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}InsertDatosAll`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertSriVentas(auditoria: string, complemento: string, _model: any) {
        const paramslist = new HttpParams()
            .set('auditoria', auditoria)
            .set('complemento', complemento);

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}InsertSriVentas`, _model, { headers: headersglobal.headers, params: paramslist }).pipe()
    }

    insertCompras( _model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}InsertSriCompras`, _model, { headers: headersglobal.headers}).pipe()
    }
    updateSriVentas( _model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}UpdateSriVentas`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateCompras( _model: any) {


        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}UpdateSriCompras`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteVentasCompras3p(auditoria: string, complemento: string, par1: string, par2: string, par3: string) {
        const paramslist = new HttpParams()
            .set('auditoria', auditoria)
            .set('complemento', complemento);

        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        };

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}DeleteVentasCompras3p`, parambusquedad, { headers: headersglobal.headers, params: paramslist }).pipe()
    }
    deleteVentas3p(auditoria: string, complemento: string, par1: string, par2: string, par3: string) {
        const paramslist = new HttpParams()
            .set('auditoria', auditoria)
            .set('complemento', complemento);

        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        };

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}DeleteVentas3p`, parambusquedad, { headers: headersglobal.headers, params: paramslist }).pipe()
    }
    deleteSriVentas(par1: string, par2: string, par3: string, par4: string) {

        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4
        };

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}DeleteSriVentas`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    deleteInformacion(par1: string, par2: string, par3: string, par4: string) {

        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4
        };

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}DeleteInformacion`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    deleteCompras3p(auditoria: string, complemento: string, par1: string, par2: string, par3: string) {
        const paramslist = new HttpParams()
            .set('auditoria', auditoria)
            .set('complemento', complemento);

        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        };

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}DeleteCompras3p`, parambusquedad, { headers: headersglobal.headers, params: paramslist }).pipe()
    }
    deleteCompras( par1: string, par2: string, par3: string, par4: string) {

        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4
        };

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}DeleteCompras`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getMaxSriVentasSecuencial(par1: string, par2: string, par3: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        };

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}GetMaxSriVentasSecuencial`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }


    exportaLibroVentasCliente(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6
        };

        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.sri}ExportaLibroVentasCliente`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }

    exportaCompSustCredS(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6
        };

        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.sri}ExportaCompSustCredS`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    exportaRetencionesEfectuadas(par1: string, par2: string, par3: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        };

        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.sri}ExportaRetencionesEfectuadas`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }

    exportaCompSustCredSD(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6
        };

        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.sri}ExportaCompSustCredSD`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    exportaCompSustCredDS(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6
        };

        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.sri}ExportaCompSustCredDS`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }


    getInformacionXml(par1: string, par2: string, par3: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        };

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}GetInformacionXml`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }

    getSecuanciaAnul(par1: string, par2: string, par3: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        };

        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.sri}GetSecuanciaAnul`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getInformacionall(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        };

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}GetInformacionall`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getInformacioncompras(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        };

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}GetInformacioncompras`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getInformacionventas(par1: string, par2: string, par3: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        };

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}GetInformacionventas`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }

    validaComprasVentas(par1: string, par2: string, par3: string, par4: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4
        };

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}ValidaComprasVentas`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    obtienEVentasEstab(par1: string, par2: string, par3: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        };

        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.sri}ObtienEVentasEstab`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    obtieneFPagoSri2(par1: string, par2: string, par3: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        };

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}ObtieneFPagoSri2`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }


}
