import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, headersglobal, headerstoken } from 'src/environments/environment';

/**
* CLASE TIPO SERVICE DONDE SE REALIZA INVOCACION A METODO API VARIOS
*/
@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private _httpClient: HttpClient) { }
  /**
* FUNCION QUE INVOCA EL METODO API DE TOKEN DE SEGURIDAD
*/
  token(usuario: string, clave: string) {
    var parambusquedad = {
      "par1": usuario,
      "par2": clave
    };
    return this._httpClient.post<any>(`${environment.API_URLLOGIN}/api/Account/tokenusuario`, parambusquedad, { headers: headersglobal.headers }).pipe()
  }
  /**
* FUNCION QUE INVOCA EL METODO API DE CAMBIO DE CLAVE
*/
  changePassword(clavevieja: string, clave: string, confirmacion: string) {
    var cambio = {
      "OldPassword": clavevieja,
      "NewPassword": clave,
      "ConfirmPassword": confirmacion,
    };

    return this._httpClient.post<any>(`${environment.API_URLLOGIN}/api/Account/ChangePassword`, cambio, { headers: headersglobal.headers }).pipe()
  }
 
  /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE USUARIOS
*/
  getUsuarios(id: string,compania: string) {
    var usuario = {
        "uscodigo": id,
        "cocodigo": compania,
        "usclave":""
    };
      return this._httpClient.post<any>(`${environment.API_URL}/${environment.seguridades}loginusuario`, usuario, { headers: headersglobal.headers }).pipe()
  }
  /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE MENU DE USUARIOS
*/
    getMenuUsuario(id: string, compania: string) {
    var usuario = {
        "uscodigo": id,
        "cocodigo": compania,
        "usclave": ""
    };

    return this._httpClient.post<any>(`${environment.API_URL}/${environment.seguridades}MenuUsuario`, usuario, { headers: headersglobal.headers }).pipe()
  }
}
