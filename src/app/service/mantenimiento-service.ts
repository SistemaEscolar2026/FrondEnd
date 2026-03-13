import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, headersglobal, headerssintoken } from 'src/environments/environment';
import { VendedorModel } from '@modelo/vendedor-model';
import { ProvinciaModel } from '@modelo/provincia-model';
import { CantonModel } from '@modelo/canton-model';
import { timeout, catchError } from 'rxjs/operators';
import { ValidacionModel } from '@modelo/stringvalidacion-modelo';
import { UsuarioModel } from '@modelo/usuario-model';

/**
* CLASE TIPO SERVICE DONDE SE REALIZA INVOCACION A METODO API VARIOS
*/
@Injectable({
    providedIn: 'root'
})
export class MantenimientoService {

    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(private _httpClient: HttpClient) { }
    getClientescia(ciabus: string) {
        var parambusquedad = {
            cia: ciabus
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetClientescia`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getConfigCiaSri(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetConfigCiaSri1p`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getTipodocRetElect(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetTipodocRetElect`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getTipodocRet2p(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetTipodocRet2p`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    GetParametro2(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetParametro2`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }    getPaisSri() {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetPaisSri`, null, { headers: headersglobal.headers }).pipe()
    }
    getRegimenFiscal() {
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetRegimenFiscal`, null, { headers: headersglobal.headers }).pipe()
    }
    getTipopagoSri() {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetTipopagoSri`, null, { headers: headersglobal.headers }).pipe()
    }
    getCreTrib() {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetCreTrib`, null, { headers: headersglobal.headers }).pipe()
    }
    getTipocompSriCom() {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetTipocompSriCompra`, null, { headers: headersglobal.headers }).pipe()
    }

    validarEsquema(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}ValidarEsquemapost`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    validarXML(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<string>(`${environment.API_URL}/${environment.funciones}ValidarXML`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getRetencionIvATipo(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetRetencionIvATipo`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }

    getTipoCliente() {
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetTipoClienteall`, null, { headers: headersglobal.headers }).pipe()
    }
    getTipoproveSri() {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetTipoproveSri`, null, { headers: headersglobal.headers }).pipe()
    }
    getTipocompSriVtas() {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetTipocompSriVtas`, null, { headers: headersglobal.headers }).pipe()
    }

    getIce() {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetIce`, null, { headers: headersglobal.headers }).pipe()
    }
    getIva() {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetIva`, null, { headers: headersglobal.headers }).pipe()
    }

    insertValores(nume: number, clave: string) {
        var valor = {
            valor1: nume + 1,
            valor2: clave,
        }
        return this._httpClient.post<string>(`${environment.API_URLLOGIN}/${environment.mantenimientos}InsertValores`, valor, { headers: headersglobal.headers }).pipe()
    }
    getTiposContratos() {
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetTiposContratos`, null, { headers: headersglobal.headers }).pipe()
    }
    getTiposDiscapacidades() {
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetTiposDiscapacidades`, null, { headers: headersglobal.headers }).pipe()
    }
    getPais() {
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetPais`, null, { headers: headersglobal.headers }).pipe()
    }
    getTipoIdentificacion() {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetTipoIdentificacion`, null, { headers: headersglobal.headers }).pipe()
    }
    getNacionalidad() {
        return this._httpClient.post<ProvinciaModel[]>(`${environment.API_URL}/${environment.mantenimientos}GetNacionalidad`, null, { headers: headersglobal.headers }).pipe()
    }
    getTipoEmpleado() {

        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetTipoEmpleado`, null, { headers: headersglobal.headers }).pipe()
    }
    getSucursalescia(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetSucursalescia`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getCentrosCosto(ciabus: string) {
        var parambusquedad = {
            cia: ciabus
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetCentrosCosto`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getCargos() {

        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetCargos`, null, { headers: headersglobal.headers }).pipe()
    }

    getPlanCtaMov(ciabus: string) {
        var parambusquedad = {
            par1: ciabus
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetPlanCtaMov`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getTipoCuenta() {
        return this._httpClient.get<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetTipoCuenta`, { headers: headersglobal.headers }).pipe()
    }
    getBancos() {
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetBancos`, null, { headers: headersglobal.headers }).pipe()
    }
    getNivelEstudios() {
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetNivelEstudios`, null, { headers: headersglobal.headers }).pipe()
    }
    getProfesion() {
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetProfesion`, null, { headers: headersglobal.headers }).pipe()
    }
 
    getTurnos(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetTurnosid`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getRolDocumento() {
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetRolDocumento`, null, { headers: headersglobal.headers }).pipe()
    }
    getTipoAuxiliar(ciabus: string) {
        var parambusquedad = {
            par1: ciabus
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetTipoAuxiliar`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getEmpleadosTR(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetEmpleadosTR1p`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getTipoDependencia() {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetTipoDependencia`, null, { headers: headersglobal.headers }).pipe()
    }
    insertConfigEmpleados(empleado: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}InsertConfigEmpleado`, empleado, { headers: headersglobal.headers }).pipe()
    }
    insertEmpleados( empleado: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}InsertEmpleado`, empleado, { headers: headersglobal.headers }).pipe()
    }
    updateConfigEmpleados(empleado: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}UpdateConfigEmpleado`, empleado, { headers: headersglobal.headers }).pipe()
    }
    updateEmpleados(empleado: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}UpdateEmpleado`, empleado, { headers: headersglobal.headers}).pipe()
    }
    getEmpleados2p(auditoria: string, complemento: string, par1: string, par2: string) {
        const paramslist = new HttpParams()
            .set('auditoria', auditoria)
            .set('complemento', complemento);

        var parambusquedad = {
            par1: par1,
            par2: par2,
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetEmpleados2p`, parambusquedad, { headers: headersglobal.headers, params: paramslist }).pipe()
    }
    deleteEmpleados(empleado: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}DeleteNomina`, empleado, { headers: headersglobal.headers}).pipe()
    }
    deleteConfigEmpleados(empleado: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}deleteConfigEmpleados`, empleado, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION VALOR DE USUARIO
  */
    getValor(usvalor: string | null = null) {
        var parambusquedad = {
            par1: usvalor
        }
        return this._httpClient.post<string>(`${environment.API_URLLOGIN}/${environment.mantenimientos}GetValor`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE COMPAÑIAS LOGIN
  */
    getCompanias(ciabus: string | null = null) {
        var parambusquedad = {
            cia: ciabus
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.mantenimientos}companiaslogin`, parambusquedad, { headers: headerssintoken }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE PROVINCIAS
  */
    getProvincias() {
        return this._httpClient.post<ProvinciaModel[]>(`${environment.API_URL}/${environment.mantenimientos}GetProvincias`, null, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE CANTONES
  */
    getCantones(valorbus: string) {
        var parambusquedad = {
            valor: valorbus
        }
        return this._httpClient.post<CantonModel[]>(`${environment.API_URL}/${environment.mantenimientos}GetCantones`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE FICHA DEL VENDEDOR
  */
    getVendedorFicha(ciabus: string, valorbus: string, auditoria: string, complemento: string) {
        var parambusquedad = {
            cia: ciabus,
            valor: valorbus,
            auditoria: auditoria,
            complemento: complemento,
        }

        return this._httpClient.post<VendedorModel>(`${environment.API_URL}/${environment.mantenimientos}GetVendedorFicha`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manConsolidadoras(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetConsolidadora`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manProveedor(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetProveedor`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manClientead(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetClientead`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manCliente(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetCliente`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    updateMenu(detalle: any[]) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.seguridades}UpdateMenu`, detalle, { headers: headersglobal.headers }).pipe()
    }
    updateMenuPerfil(detalle: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.seguridades}UpdateMenuPerfil`, detalle, { headers: headersglobal.headers }).pipe()
    }
    cargaMenu(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.seguridades}GetCargaMenu`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manProcesaSobre(par1: string, par2: string, par3: string, par4: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.reportenominames}repoteFinMesRol`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manPersona(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetPersonaAutorizada`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manUsuario(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetUsuario`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manCompania() {
   
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetCompania`, null, { headers: headersglobal.headers }).pipe()
    }
    manPasajero(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetPasajero`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manComision(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetComision`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manContraro(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetContrato`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getRubro(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetRubro`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manFormaPago(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetFormaPago`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manFormaPagofp(par1: string,par2:string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetFormaPagofp`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manServicioAdicional(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetServicioAdicional`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manEmpleado(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}GetNomina`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manConfigEmpleado(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}GetConfigEmpleado`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    cargaperiodovacaciones(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}cargaperiodovacaciones`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manPerfil(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.seguridades}GetPerfil`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manPais(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetPais`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manEstado(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetEstado`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manTipoCompra(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetTipoCompra`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manTipoPrestamo(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetTipoPrestamo`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manTipoDocumento(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetTipoDocumento`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manRetencionFuente(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetRetencionFuente`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manRetencionIva(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetRetencionIva`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manParanetro(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetParametro`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manPlanCuentaM(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetPlanCuentaM`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manPlanCuenta(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetPlanCuenta`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manGrupo(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetGrupo`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manTipoAuxiliar(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetTipoAuxiliar`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manAuxiliar(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetAuxiliar`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manSubGrupo(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetSubGrupo`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getClaseContable(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetClaseContable`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getTipoComprobante(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetTipoComprobante`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getAnticipo(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetAnticipo`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    generadecimo13(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2

        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}generadecimo13`, parambusquedad, { headers: headersglobal.headers }).pipe()
    } 
    generadecimo14(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2

        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}generadecimo14`, parambusquedad, { headers: headersglobal.headers }).pipe()
    } 
 
    generaquincena(par1: string, par2: string, par3: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3

        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}generaquincena`, parambusquedad, { headers: headersglobal.headers }).pipe()
    } 
    generafinmes(par1: string, par2: string, par3: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3

        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}generafinmes`, parambusquedad, { headers: headersglobal.headers }).pipe()
    } 
    generafinmesTMP(par1: string, par2: string, par3: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3

        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}generafinmesTMP`, parambusquedad, { headers: headersglobal.headers }).pipe()
    } 
    
    getPrestamo(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetPrestamo`, parambusquedad, { headers: headersglobal.headers }).pipe()
    } 
    buscaVacaciones(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}buscaVacaciones`, parambusquedad, { headers: headersglobal.headers }).pipe()
    } 
    
    getFaltas(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetFaltas`, parambusquedad, { headers: headersglobal.headers }).pipe()
    } 
    getFaltasIess(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetFaltasIess`, parambusquedad, { headers: headersglobal.headers }).pipe()
    } 
    manAerolinea(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetAerolinea`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manCiudad(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetCiudad`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manPagoSri(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetPagoSri`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manTipoSeguro(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetTipoSeguro`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    manTipoAlojamiento(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetTipoAlojamiento`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE VENDEDORES
  */
    getVendedor(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetCliente`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE CLIENTES
  */
    getCliente(ciabus: string, valorbus: string) {
        var parambusquedad = {
            cia: ciabus,
            valor: valorbus,
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetClientesActVe`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE PROVEEDORES
  */
    getProveedor(ciabus: string) {
        var parambusquedad = {
            par1: ciabus
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetProveedores`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION TRANSPORTE
  */
    getTransporteProd(ciabus: string, valorbus: string) {
        var parambusquedad = {
            cia: ciabus,
            valor: valorbus,
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetTransporteProd`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }

    obtieneIvaCodigos() {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.sri}ObtieneIvaCodigos`, null, { headers: headersglobal.headers }).pipe()
    }
    getClienteseleccionado(ciabus: string, valorbus: string) {
        var parambusquedad = {
            cia: ciabus,
            valor: valorbus,
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetClientes`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getTiporetSriAplicaDiv(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetTiporetSriAplicaDiv`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getTiporetSri() {
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetTiporetSri`, null, { headers: headersglobal.headers }).pipe()
    }
    getFPagoSriAll() {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetFPagoSriall`, null, { headers: headersglobal.headers }).pipe()
    }
    getTiporetSriAplicaMTS(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetTiporetSriAplicaMTS`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getGetProveedorseleccionado(ciabus: string, valorbus: string) {
        var parambusquedad = {
            cia: ciabus,
            valor: valorbus,
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetProveedor`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }

    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE BODEGA
  */
    getBodegas(ciabus: string, valorbus: string) {
        var parambusquedad = {
            par1: ciabus,
            par2: valorbus,
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetBodegas`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }

    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE CONDUCTOR CALIFICADO
  */
    getCondCalifrsq(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetCondCalifrsq`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE PLACA VEHICULO
  */
    getVehiculoEquipoEsta(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetVehiculoEquipoEsta`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE LA FORMA DE PAGO
  */
    getFormasPago(valorbus: string) {
        var parambusquedad = {
            valor: valorbus,
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetFormasPago`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION VALOR DE NUMERICO
  */
    getValoresNum() {
        return this._httpClient.post<number>(`${environment.API_URLLOGIN}/${environment.mantenimientos}GetValoresNum`, null, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE DIRECCION DE CLIENTE
  */
    getClientesDir(ciabus: string, valorbus: string) {
        var parambusquedad = {
            cia: ciabus,
            valor: valorbus,
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetClientesDir`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }

    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ITEMS
  */
    getItems(ciabus: string, valorbus: string) {
        var parambusquedad = {
            cia: ciabus,
            valor: valorbus,
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetItems`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE LOS GRUPOS
  */
    getGrupos(ciabus: string) {
        var parambusquedad = {
            cia: ciabus
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetGrupos`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE LISTA DE PRECIO
  */
    getListasPrecios(ciabus: string) {
        var parambusquedad = {
            cia: ciabus
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetListasPrecios`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE IMPUESTOS
  */
    getImpuesto(ciabus: string) {
        var parambusquedad = {
            cia: ciabus
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetImpuesto`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE LISTADO DE COMPRADOR
  */
    getComprador(ciabus: string) {
        var parambusquedad = {
            cia: ciabus
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetComprador`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }

    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE IMPUESTOS
  */
    getTipodocComp(ciabus: string) {
        var parambusquedad = {
            cia: ciabus
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetTipodocComp`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }

    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE TIPO DE PEDIDO
  */
    getTipoPedido() {

        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.vistas}GetTipoDocPed`, null, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE SUCURSALES
  */
    getSucursales(ciabus: string, valorbus: string) {
        var parambusquedad = {
            cia: ciabus,
            valor: valorbus,
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetSucursales`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION SUCURSALES DE VENTAS DE INVENTARIO
  */
    getSucursalesVtasInv(ciabus: string, valorbus: string) {
        var parambusquedad = {
            cia: ciabus,
            valor: valorbus,
        }
        return this._httpClient.post<any[]>(`${environment.API_URL}/${environment.mantenimientos}GetSucursalesVtasInv`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
   * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE FECHA PROCESO
   */
    getFecProc(ciabus: string, valorBus: string, tipoBus: string) {
        var parambusquedad = {
            cia: ciabus,
            valor: valorBus,
            valorDate: tipoBus,
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetFecProc`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }

    /**
  * FUNCION QUE INVOCA EL METODO API DE ACTUALIZACION DE USUARIO
  */
    updateUsuariosLogin(usuario: UsuarioModel) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.mantenimientos}updateUsuariosLogin`, usuario, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE INSERTAR UN CONTRATO
*/
    insertContrato(_modelo: any, _modeldet: any[]) {
        var _model: any={
            cab: _modelo,
            det: _modeldet
        }

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertContrato`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
 * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE INSERTAR UN CLIENTE
 */
    insertConsolidadores(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertConsolidadoras`, _model, { headers: headersglobal.headers }).pipe()
    }

    getGastos(usvalor: string | null = null) {
        var parambusquedad = {
            par1: usvalor
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.mantenimientos}GetGastos`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    insertGastos(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertGastos`, _model, { headers: headersglobal.headers }).pipe()
    }
    
    updateGastos(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateGasto`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteGastos(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteGasto`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertRuta(_model: any, _modeldet: any[]) {
        var _ruta = {
            cab: _model,
            det: _modeldet
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertRuta`, _ruta, { headers: headersglobal.headers }).pipe()
    }
    updateRuta(_model: any, _modeldet: any[]) {
        var _ruta = {
            cab: _model,
            det: _modeldet
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateRuta`, _ruta, { headers: headersglobal.headers }).pipe()
    }
    deleteRuta(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteRuta`, _model, { headers: headersglobal.headers }).pipe()
    }
    manRutas(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}GetRutas`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE INSERTAR UN PROVEEDOR
*/
    insertProveedor(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertProveedor`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
   * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE INSERTAR UN CLIENTE
   */
    insertCliente(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertCliente`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertPersona(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertPersonaAutorizada`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertCompania(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertCompania`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertUsuario(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertUsuario`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE INSERTAR UN PASAJERO
*/
    insertPasajero(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertPasajero`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE INSERTAR UNA COMISION
*/
    insertComision(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertComision`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE INSERTAR UNA FORMA PAGO
*/
    insertForma(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertForma`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertServicio(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertServicio`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertPerfil(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.seguridades}InsertPerfil`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertPais(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertPais`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertEstado(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertEstado`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertTipoPrestamo(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertTipoPrestamo`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertTipoDocumento(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertTipoDocumento`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertTipoCompra(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertTipoCompra`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertRetencionFuente(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertRetencionFuente`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertRetencionIva(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertRetencionIva`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertParametro(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertParametro`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertPlanCuenta(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertPlanCuenta`, _model, { headers: headersglobal.headers }).pipe()
    }
    
    insertGrupo(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertGrupo`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertClaseContable(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertClaseContable`, _model, { headers: headersglobal.headers }).pipe()
    }
    
    insertTipoAuxiliar(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertTipoAuxiliar`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertAuxiliar(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertAuxiliar`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertSubGrupo(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertSubGrupo`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertAerolinea(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertAerolinea`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE INSERTAR UN TIPO SEGURO
*/
    insertTipoSeguro(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertTipoSeguro`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE INSERTAR UN TIPO ALOJAMIENTO
*/
    insertTipoAlojamiento(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertAlojamiento`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE INSERTAR UN PAIS
*/
    insertCiudad(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertCiudad`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ELIMINACION DE CONTRATO
*/
    deleteContrato(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteContrato`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ELIMINACION DE CLIENTE
*/
    deleteConsolidadora(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteConsolidadora`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ELIMINACION DE PROVEEDOR
*/
    deleteProveedor(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteProveedor`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ELIMINACION DE CLIENTE
  */
    deleteCliente(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteCliente`, _model, { headers: headersglobal.headers }).pipe()
    }
    deletePersona(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeletePersonaAutorizada`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteCompania(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteCompania`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteUsuario(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteUsuario`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ELIMINACION DE CLIENTE
*/
    deletePasajero(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeletePasajero`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ELIMINACION DE COMISION
*/
    deleteComision(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteComision`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteRubro(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteRubro`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateRubro(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateRubro`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertRubro(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertRubro`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteForma(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteForma`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteServicio(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteServicio`, _model, { headers: headersglobal.headers }).pipe()
    }
    deletePerfil(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.seguridades}DeletePerfil`, _model, { headers: headersglobal.headers }).pipe()
    }
    deletePais(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeletePais`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteEstado(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteEstado`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteTipoCompra(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteTipoCompra`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteTipoPrestamo(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteTipoPrestamo`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteTipoDocumento(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteTipoDocumento`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteRetencionFuente(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteRetencionFuente`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteRetencionIva(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteRetencionIva`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteParametro(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteParametro`, _model, { headers: headersglobal.headers }).pipe()
    }
    deletePlanCuenta(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeletePlanCuenta`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteGrupo(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteGrupo`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteClaseContable(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteClaseContable`, _model, { headers: headersglobal.headers }).pipe()
    }
    
    deleteAuxiliar(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteAuxiliar`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteTipoAuxiliar(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteTipoAuxiliar`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteSubGrupo(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteSubGrupo`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteAerolinea(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteAerolinea`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertFalta(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertFaltas`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertAnticipo(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertAnticipo`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertantincipoquincena(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}insertAnticipoQuincena`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertDecimo13(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}insertDecimo13`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertDecimo14(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}insertDecimo14`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertNominaFinMes(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}insertNominaFinMes`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertNominaFinMesTMP(_model: any) {
        return this._httpClient.post(`${environment.API_URL}/${environment.nomina}insertNominaFinMesTMP`, _model, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
      }
    deletFinMes(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}deletNominaFinMes`, _model, { headers: headersglobal.headers }).pipe()
    }
    deletAnticipoQuincena(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}deletAnticipoQuincena`, _model, { headers: headersglobal.headers }).pipe()
    }
    deletDecimo13(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}deletDecimo14`, _model, { headers: headersglobal.headers }).pipe()
    }
    deletDecimo14(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}deletDecimo13`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateAnticipoQuincena(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}updateAnticipoQuincena`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateDecimo13(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}updateDecimo13`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateDecimo14(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}updateDecimo14`, _model, { headers: headersglobal.headers }).pipe()
    }
    getseleAnticipoQuincena(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}GetSeleAnticipoQuincena`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getseleDecimo13(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}GetSeleDecimo13`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getseleDecimo14(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}GetSeleDecimo14`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getSeleNominaFinMes(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}GetSeleNominaFinMes`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getAnticipoQuincena(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}GetAnticipoQuincena`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getDecimos(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}GetDecimos`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    
    getNomianFinMes(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}GetNominaFinMes`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    insertPrestamo(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertPrestamo`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertVacaciones(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}InsertVacaciones`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertFaltasIess(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}InsertFaltasIess`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateAnticipo(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateAnticipo`, _model, { headers: headersglobal.headers }).pipe()
    }
    updatePrestamo(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdatePrestamo`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateFalta(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateFaltas`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateFaltasIess(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateFaltasIess`, _model, { headers: headersglobal.headers }).pipe()
    }
    deletePrestamo(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeletePrestamo`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteVacaciones(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.nomina}DeleteVacaciones`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteAnticipo(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteAnticipo`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteFalta(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteFaltas`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteFaltasIess(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteFaltasIess`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ELIMINACION DE CIUDAD
*/
    deleteCiuda(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteCiudad`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ELIMINACION DE TIPO SEGURO
*/
    deleteTipoSeguro(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteCiudad`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ELIMINACION DE TIPO ALOJAMIENTO
*/
    deleteTipoAlojamiento(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}DeleteAlojamiento`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
 * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ACTUALIZAR UN CLIENTE
 */
    updateContrato(_modelo: any, _modeldet: any[]) {
        var _model: any = {
            cab: _modelo,
            det: _modeldet
        }
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateContrato`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ACTUALIZAR UN CLIENTE
  */
    updateConsolidadoras(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateConsolidadoras`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ACTUALIZAR UN PROVEEDOR
  */
    updateProveedor(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateProveedor`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
   * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ACTUALIZAR UN CLIENTE
   */
    updateCliente(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateCliente`, _model, { headers: headersglobal.headers }).pipe()
    }
    updatePersona(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdatePersonaAutorizada`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateCompania(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateCompania`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateUsuario(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateUsuario`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ACTUALIZAR UN PASAJERO
*/
    updatePasajero(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdatePasajero`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
 * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ACTUALIZAR UNA COMISION
 */
    updateComision(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateComision`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ACTUALIZAR UNA FORMA DE PAGO
*/
    updateForma(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateForma`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateServicio(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateServicio`, _model, { headers: headersglobal.headers }).pipe()
    }
    updatePerfil(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.seguridades}UpdatePerfil`, _model, { headers: headersglobal.headers }).pipe()
    }
    updatePais(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdatePais`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateEstado(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateEstado`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateTipoPrestamo(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateTipoPrestamo`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateTipoDocumento(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateTipoDocumento`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateTipoCompra(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateTipoCompra`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateRetencionFuente(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateRetencionFuente`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateRetencionIva(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateRetencionIva`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateParametro(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateParametro`, _model, { headers: headersglobal.headers }).pipe()
    }
    updatePlanCuenta(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdatePlanCuenta`, _model, { headers: headersglobal.headers }).pipe()
    }
    UpdateGrupo(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateGrupo`, _model, { headers: headersglobal.headers }).pipe()
    }
    UpdateClaseContable(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateClaseContable`, _model, { headers: headersglobal.headers }).pipe()
    }
    
    UpdateTipoAuxiliar(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateTipoAuxiliar`, _model, { headers: headersglobal.headers }).pipe()
    }
    UpdateAuxiliar(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateAuxiliar`, _model, { headers: headersglobal.headers }).pipe()
    }
    UpdateSubGrupo(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateSubGrupo`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateAerolinea(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateAerolinea`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ACTUALIZAR UN TIPO SEGURO
*/
    updateTipoSeguro(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateTipoSeguro`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ACTUALIZAR UN TIPO ALOJAMIENTO
*/
    updateTipoAlojamiento(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateAlojamiento`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
* FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE ACTUALIZAR UN PAIS
*/
    updateCiudad(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.mantenimientos}UpdateCiudad`, _model, { headers: headersglobal.headers }).pipe()
    }
    /**
   * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE BUSQUEDA DE PRODUCTOS
   */
    getBusProd(ciabus: string, valorBus: string) {
        var parambusquedad = {
            cia: ciabus,
            valor: valorBus
        }
        return this._httpClient.post<ValidacionModel[]>(`${environment.API_URL}/${environment.funciones}GetBusProd`, parambusquedad, { headers: headersglobal.headers }).pipe(
        )
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE BUSQUEDA DE IMPORTACION
  */
    busqueda(ciabus: string, valorBus: string, tipoBus: string) {
        var parambusquedad = {
            cia: ciabus,
            valor: valorBus,
            tipo: tipoBus,
        }
        return this._httpClient.post<ValidacionModel[]>(`${environment.API_URL}/${environment.importaciones}Busqueda`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    /**
  * FUNCION QUE INVOCA EL METODO API DE DEVOLUCION DE TIPO DOCMENTO DE VENTA
  */
    getTipodocVen(ciabus: string, valorBus: string, tipoBus: string) {
        var parambusquedad = {
            cia: ciabus,
            valor: valorBus,
            tipo: tipoBus,
        }
        return this._httpClient.post<ValidacionModel[]>(`${environment.API_URL}/${environment.mantenimientos}GetTipodocVen`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
}
