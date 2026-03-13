import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, headersglobal } from 'src/environments/environment';
import { CabeceraPed } from '@modelo/cabeceraped-model';

/**
* CLASE TIPO SERVICE DONDE SE REALIZA INVOCACION A METODO API VARIOS
*/
@Injectable({
  providedIn: 'root'
})
export class VentasService {

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private _httpClient: HttpClient) { }

  /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE CONSULTA DE PEDIDO DE VENTAS
  */
  getDocumentosPed(complemento: string, auditoria: string, ciabus: string, tipodoc: string,numero:string) {
    const paramslist = new HttpParams()
      .set('auditoria', auditoria)
      .set('complemento', complemento);

    var parambusquedad = {
      cia: ciabus,
      valor: numero,
      tipo: tipodoc
    }

    return this._httpClient.post<any>(`${environment.API_URL}/${environment.ventas}GetDocumentosPed`, parambusquedad, { headers: headersglobal.headers, params: paramslist }).pipe()
  }
  /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ACTUALIZAR PEDIDO DE VENTAS
  */
  updateDocumentosPed(complemento: string, auditoria: string, cabeceraPed: CabeceraPed) {
    const paramslist = new HttpParams()
      .set('auditoria', auditoria)
      .set('complemento', complemento);

    return this._httpClient.post<any>(`${environment.API_URL}/${environment.ventas}UpdateDocumentosPed`, cabeceraPed, { headers: headersglobal.headers, params: paramslist }).pipe()
  }
  /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ANULAR PEDIDO DE VENTAS
  */
  anulaDocumentosPed(complemento: string, auditoria: string, cabeceraPed: CabeceraPed) {
    const paramslist = new HttpParams()
      .set('auditoria', auditoria)
      .set('complemento', complemento);

    return this._httpClient.post<any>(`${environment.API_URL}/${environment.ventas}AnulaDocumentosPed`, cabeceraPed, { headers: headersglobal.headers, params: paramslist }).pipe()
  }
  /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ELIMINAR PEDIDO DE VENTAS
  */
  deleteDocumentosPed(complemento: string, auditoria: string, ciabus: string, tipodoc: string, numerodoc: string) {
    const paramslist = new HttpParams()
      .set('auditoria', auditoria)
      .set('complemento', complemento);

    var parambusquedad = {
      cia: ciabus,
      tipo: tipodoc,
      valor: numerodoc
    }

    return this._httpClient.post<any>(`${environment.API_URL}/${environment.ventas}DeleteDocumentosPed`, parambusquedad, { headers: headersglobal.headers, params: paramslist }).pipe()
  }
  /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE INSERTAR PEDIDO DE VENTAS
  */
  insertDocumentosPed(complemento: string, auditoria: string, cabeceraPed: CabeceraPed, sucursal: any) {
    const paramslist = new HttpParams()
      .set('auditoria', auditoria)
      .set('complemento', complemento);

    var documento = {
      cabeceraPed: cabeceraPed,
      sucursal: sucursal
    }

    return this._httpClient.post<any>(`${environment.API_URL}/${environment.ventas}InsertDocumentosPed`, documento, { headers: headersglobal.headers, params: paramslist }).pipe()
  }
  /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE CARTERA DE CLIENTE
  */
  infoCarPedCliente(ciabus: string, valorbus: string, valorfiltro: string) {
    var parambusquedad = {
      cia: ciabus,
      valor: valorbus,
      valorfiltro: valorfiltro
    }
    return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.ventas}InfoCarPedCliente`, parambusquedad, { headers: headersglobal.headers }).pipe()
  }
  /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE HISTORIAL PEDIDO DE VENTAS
  */
  histoPedCliente(ciabus: string, valorbus: string, valorfiltro: string, iItem: string) {
    var parambusquedad = {
      cia: ciabus,
      valor: valorbus,
      tipo: iItem,
      valorfiltro: valorfiltro
    }
    return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.ventas}HistoPedCliente`, parambusquedad, { headers: headersglobal.headers }).pipe()
  }

  /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ITEM POR CLIENTE
  */
  ayudaItemsPedPrecCont(ciabus: string, subcursal: string, cliente: string, fecha: string) {
    var parambusquedad = {
      cia: ciabus,
      valor: subcursal,
      tipo: cliente,
      valorfiltro: fecha
    }
    return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.ventas}AyudaItemsPedPrecCont`, parambusquedad, { headers: headersglobal.headers }).pipe()
  }


}


