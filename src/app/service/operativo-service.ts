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
export class OperativoService {

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private _httpClient: HttpClient) { }

  /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE CONSULTA DE PEDIDO DE PREDESPACHOS
  */
  getPredespachos(ciabus: string, tipodoc: string, numero: string) {
    var parambusquedad = {
      par1: ciabus,
      par2: tipodoc,
      par3: numero
    }
    return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.operativo}GetPredespachos`, parambusquedad, { headers: headersglobal.headers }).pipe()
  }
  /**
* FUNCION QUE INVOCA EL METODO API DE GRABAR PREDESPACHO
*/
  grabaPredespacho(complemento: string, auditoria: string, predespacho: any) {
    const paramslist = new HttpParams()
      .set('auditoria', auditoria)
      .set('complemento', complemento);

    return this._httpClient.post<any>(`${environment.API_URL}/${environment.operativo}GrabaPredespacho`, predespacho, { headers: headersglobal.headers, params: paramslist }).pipe()
  }

  /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE PEDIDOS CONGELADOS
*/
  getCongelaPreDes(par1: string, par2: string, par3: string, par4: string) {
    var parambusquedad = {
      par1: par1,
      par2: par2,
      par3: par3,
      par4: par4
    }
    return this._httpClient.post<any>(`${environment.API_URL}/${environment.operativo}GetCongelaPreDes`, parambusquedad, { headers: headersglobal.headers }).pipe()
  }
  /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ELIMINAR PEDIDO CONGELADO
*/
  deleteCongelaPreDes(par1: string, par2: string, par3: string, par4: string) {
    var parambusquedad = {
      par1: par1,
      par2: par2,
      par3: par3,
      par4: par4
    }
    return this._httpClient.post<any>(`${environment.API_URL}/${environment.operativo}DeleteCongelaPreDes`, parambusquedad, { headers: headersglobal.headers }).pipe()
  }
  /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE INSERTAR PEDIDO CONGELADO
*/
  insertCongelaPreDes(par1: string, par2: string, par3: string, par4: string, par5: string) {
    var cP = {
      ciacodigo: par1,
      captipo: par2,
      capnumero: par3,
      cabnumero: par4,
      cabusuario: par5
    }
    return this._httpClient.post<any>(`${environment.API_URL}/${environment.operativo}InsertCongelaPreDes`, cP, { headers: headersglobal.headers }).pipe()
  }
  /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE INSERTAR PEDIDO CONGELADO
*/
  getDocumentosBdg(complemento: string, auditoria: string, par1: string, par2: string, par3: string, par4: string) {

    const paramslist = new HttpParams()
      .set('auditoria', auditoria)
      .set('complemento', complemento);

    var parambusquedad = {
      par1: par1,
      par2: par2,
      par3: par3,
      par4: par4
    }
    return this._httpClient.post<any>(`${environment.API_URL}/${environment.operativo}GetDocumentosBdg`, parambusquedad, { headers: headersglobal.headers, params: paramslist }).pipe()
  }







}


