import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MantenimientoService } from '@services/mantenimiento-service';
import * as moment from 'moment';
import { globales, environment,  headersglobal } from 'src/environments/environment';

/**
* CLASE TIPO SERVICE DONDE SE REALIZA INVOCACION A METODO API VARIOS
*/
@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private _httpClient: HttpClient, private mantenimientoService: MantenimientoService) {

  }
  /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE FECHA SERVIDOR
*/
  fechaServidor() {
    return this._httpClient.post<any>(`${environment.API_URL}/${environment.funciones}FechaServidor`, null, { headers: headersglobal.headers }).pipe()
  }
  /**
* FUNCION QUE DEVUELVE LA FECHA DEL SERVIDOR
*/
  async fechaservidor() {
    let _retorno: Date = new Date();
    await this.fechaServidor().subscribe(data => {
      try {
        _retorno = data.fecha;
        return _retorno;
      } catch (e) {
        return _retorno;
      }
    }, () => {
      return _retorno;
    });
    return _retorno;
  }

  /**
* FUNCION QUE BORRA LA FECHA DEL PROCESO
*/
  async deleteFechaProceso(_ciabus: string, _valorbus: string) {
    let _retorno = 0;
    await this.deletefechaproceso(_ciabus, _valorbus).subscribe(data => {
      try {
        _retorno = 1;
        return _retorno;
      } catch (e) {
        return _retorno;
      }
    }, () => {
      return _retorno;
    });
    return _retorno;
  }
  /**
* FUNCION QUE INVOCA EL METODO API DE BORRAR LA FECHA DE PROCESO
*/
  deletefechaproceso(ciabus: string, valorbus: string) {
    var parambusquedad = {
      cia: ciabus,
      valor: valorbus
    }
    return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteFecProc`, parambusquedad, { headers: headersglobal.headers }).pipe()
  }
  /**
* FUNCION QUE INVOCA EL METODO API DE CARGA DE LOTES
*/
  controlLotes(par1: string, par2: string, par3: string, par4: string) {
    var parambusquedad = {
      par1: par1,
      par2: par2,
      par3: par3,
      par4: par4
    }
    return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.funciones}ControlLotes`, parambusquedad, { headers: headersglobal.headers }).pipe()
  }
  

  /**
* FUNCION QUE DEVUELVE PARAMETRO TIPO ENTERO
*/
  getParametroNdia(ciabus: string, valorbus: string, anio: string) {
    let _retorno = 0;
    this.getparametron(ciabus, valorbus, anio).subscribe(data => {
      try {
        _retorno = data.pavalorint;
        return _retorno;
      } catch (e) {
        return _retorno;
      }
    }, () => {
      return _retorno;
    });
    return _retorno;
  }
  /**
* FUNCION QUE DEVUELVE PARAMETRO TIPO STRING
*/
  getParametroNString(ciabus: string, valorbus: string, anio: string) {
    let _retorno = "";
    this.getparametron(ciabus, valorbus, anio).subscribe(data => {
      try {
        _retorno = data.pavalorchar;
        return _retorno;
      } catch (e) {
        return _retorno;
      }
    }, () => {
      return _retorno;
    });
    return _retorno;
  }
  /**
* FUNCION QUE DEVUELVE PARAMETRO TIPO NUMBER
*/
  async getParametroN(ciabus: string, valorbus: string, anio: string) {
    let _retorno = 0;
    await this.getparametron(ciabus, valorbus, anio).subscribe(data => {
      try {
        _retorno = data.pavalornumeric;
        return _retorno;
      } catch (e) {
        return _retorno;
      }
    }, () => {
      return _retorno;
    });
    return _retorno;
  }
  
  /**
* FUNCION QUE INVOCA EL METODO API DE CENTRO COSTO
*/
  getImpuesto(ciabus: string) {
    var parambusquedad = {
      cia: ciabus
    }
    return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetImpuesto`, parambusquedad, { headers: headersglobal.headers }).pipe()
  }
  /**
* FUNCION QUE INVOCA EL METODO API DE CENTRO COSTO
*/
  getCentrosCosto(ciabus: string) {
    var parambusquedad = {
      cia: ciabus
    }
    return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetCentrosCosto`, parambusquedad, { headers: headersglobal.headers }).pipe()
  }
  /**
* FUNCION QUE INVOCA EL METODO API DE UNIDAD MEDIDA
*/
  getMedidas() {
    return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetMedidas`, null, { headers: headersglobal.headers }).pipe()
  }
  /**
* FUNCION QUE INVOCA EL METODO API DE PARAMETRO
*/
  getparametron(ciabus: string, valorbus: string, anio: string) {
    var parambusquedad = {
      cia: ciabus,
      valor: valorbus,
      tipo: anio
    }
    return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetParametroN`, parambusquedad, { headers: headersglobal.headers }).pipe()
  }
  /**
* FUNCION QUE DEVUELVE AÑO EN PROCESO
*/
  async getAnioProceso(_ciabus: string) {
    let _retorno = 0;
    await this.getanioroceso(_ciabus).subscribe(data => {
      try {
        _retorno = data.apranio;
        return _retorno;
      } catch (e) {
        return _retorno;
      }
    }, () => {
      return _retorno;
    });
    return _retorno;
  }

  /**
* FUNCION QUE INVOCA EL METODO CONTROL MOVIMIENTO DE CUPO
*/
  controlmovCupo(ciabus: string, producto: string, cliente: string, fecha: string) {
    var parambusquedad = {
      cia: ciabus,
      valor: producto,
      tipo: cliente,
      valorfiltro: fecha
    }
    return this._httpClient.post<any>(`${environment.API_URL}/${environment.funciones}ControlMovCupo`, parambusquedad, { headers: headersglobal.headers }).pipe()
  }
  /**
* FUNCION QUE INVOCA EL METODO AÑO DE PROCESO
*/
  getanioroceso(ciabus: string) {
    var parambusquedad = {
      cia: ciabus
    }
    return this._httpClient.post<any>(`${environment.API_URL}/${environment.contabilidad}GetAnioProceso`, parambusquedad, { headers: headersglobal.headers }).pipe()
  }
  /**
* FUNCION QUE DEVUELVE LA FECHA EN CURSO
*/
  async obtieneFecha(dato: string) {
    var formatoFecha = moment(await this.fechaservidor());
    var retorno = "";
    var lFecha = "";
    lFecha = await this.obtieneFechafinal(dato, formatoFecha.format("YYYY-MM-DD").toString());
    if (lFecha == "") {
      const datoretorno = await this.deleteFechaProceso(globales.cia, dato);
      if (datoretorno == 0) {
        lFecha = formatoFecha.format("YYYY-MM-DD").toString();
      } else {
        if (dato != environment.modContabilidad) {
          const datoparmetro = await this.getParametroN(globales.cia, dato, "anio_en_curso")
          lFecha = datoparmetro.toString() + "-" + formatoFecha.month.toString() + "-" + formatoFecha.day.toString();
        } else {
          const anioproceso = await this.getAnioProceso(globales.cia);
          if (anioproceso == 0) {
            lFecha = formatoFecha.format("YYYY-MM-DD").toString();
          } else {
            lFecha = anioproceso.toString() + "-" + formatoFecha.month.toString() + "-" + formatoFecha.day.toString();
          }
        }
      }
    } else {
      retorno = lFecha;
    }
    return lFecha;

  }
  /**
* FUNCION QUE DEVUELVE LA FECHA FINAL
*/
  async obtieneFechafinal(dato: string, formatoFecha: string) {
    var lFecha = "";
    this.mantenimientoService.getFecProc(globales.cia, dato, formatoFecha).subscribe(data => {
      try {
        if (data == null) {
          lFecha = "";
        } else {
          lFecha = data.fepfechaproc;
        }
      } catch (e) {
        lFecha = formatoFecha
      }
    }, () => {
      lFecha = formatoFecha
    });
    return lFecha;
  }

}


