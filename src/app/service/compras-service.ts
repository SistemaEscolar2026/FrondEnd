import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, headersglobal } from 'src/environments/environment';

/**
* CLASE TIPO SERVICE DONDE SE REALIZA INVOCACION A METODO API VARIOS
*/
@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private _httpClient: HttpClient) { }
    insertRetencionCompra(complemento: string, auditoria: string, iDocumentoRet: any) {

        const paramslist = new HttpParams()
            .set('auditoria', auditoria)
            .set('complemento', complemento);

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.comprasCxP}InsertRetencionCompra`, iDocumentoRet, { headers: headersglobal.headers, params: paramslist }).pipe()
    }
    getRetenciones3p(complemento: string, auditoria: string, par1: string, par2: string, par3: string) {
        const paramslist = new HttpParams()
            .set('auditoria', auditoria)
            .set('complemento', complemento);
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.comprasCxP}GetRetenciones3p`, parambusquedad, { headers: headersglobal.headers, params: paramslist }).pipe()
    }

  /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE CONSULTA DE ORDEN DE COMPRA
*/
  ejecutaSPEstCtaCxp(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string, par8: string) {
    var parambusquedad = {
      par1: par1,
      par2: par2,
      par3: par3,
      par4: par4,
      par5: par5,
      par6: par6,
      par7: par7,
      par8: par8
    }
    return this._httpClient.post<any>(`${environment.API_URL}/${environment.comprasCxP}EjecutaSPEstCtaCxp`, parambusquedad, { headers: headersglobal.headers }).pipe()
  }
  /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE CONSULTA DE ORDEN DE COMPRA
*/
  getOrdenCompra(complemento: string, auditoria: string,ciabus: string, valorbus: string,  tipo: string) {

    const paramslist = new HttpParams()
      .set('auditoria', auditoria)
      .set('complemento', complemento);

    var parambusquedad = {
      cia: ciabus,
      valor: valorbus,
      tipo: tipo
    }
    return this._httpClient.post<any>(`${environment.API_URL}/${environment.comprasCxP}GetOrdenCompra`, parambusquedad, { headers: headersglobal.headers, params: paramslist }).pipe()
  }
  /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE CONSULTA DE ORDEN DE COMPRAS
  */
  getObetenerOrdenesCompraAD(ciabus: string, valorbus: string, valorfiltro: string, tipo: string)  {
    var parambusquedad = {
      cia: ciabus,
      valor: valorbus,
      tipo: tipo,
      valorfiltro: valorfiltro
    }

    return this._httpClient.post<any>(`${environment.API_URL}/${environment.comprasCxP}GetObetenerOrdenesCompraAD`, parambusquedad, { headers: headersglobal.headers}).pipe()
  }
  /**
 * FUNCION QUE INVOCA EL METODO API DE ACTUALIZACION ORDEN DE COMPRA
 */
  apruebaDesapruebaOrdenCompra(complemento: string, auditoria: string,ordencompra:any[]) {
    const paramslist = new HttpParams()
      .set('auditoria', auditoria)
      .set('complemento', complemento);

    return this._httpClient.post<any>(`${environment.API_URL}/${environment.comprasCxP}ApruebaDesapruebaOrdenCompra`, ordencompra, { headers: headersglobal.headers, params: paramslist  }).pipe()
  }
}




