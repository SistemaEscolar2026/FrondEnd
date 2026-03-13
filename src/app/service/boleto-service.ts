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
export class BoletoService {
    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(private _httpClient: HttpClient) { }



    repoteBoletosTipo(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string, par8: string, par9: string) {
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
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteBoletosTipo`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteBoletos(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string, par8: string, par9: string) {
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
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteBoletos`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repotePago(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repotePago`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteDecimos(par1: string, par2: string, par3: string, par4: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteDecimos`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteAnticipoQuincena(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteAnticipoQuincena`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }

    reporteentidadvisualpdf(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}reporteentidadvisualpdf`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    reporteproveedorvisualpdf(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}reporteproveedorvisualpdf`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteContratos(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteContratos`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteCuentaxCobrarVencido(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteCuentaxCobrarVencido`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteCuentaxCobrar(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteCuentaxCobrar`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteCuentaxPagar(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteCuentaxPagar`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteCuentaxPagarRet(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteCuentaxPagarRet`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }

    repoteOrdenCompra(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteOrdenCompra`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteFacturacion2(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteFacturacion2`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteFacturacionXMLNC(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteFacturacionXMLNC`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteFacturacionXML(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteFacturacionXML`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteNotaCredito(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteNotaCredito`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteFacturacion(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteFacturacion`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteVacaciones(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteVacaciones`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteGanancias(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string, par8: string) {
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
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteUtilidades`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repotePrestamo(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repotePrestamo`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteAdelanto(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteAdelanto`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteFaltas(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteFalta`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteImportacionSri(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteImportacionSri`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteEstadoCuentaEmpleado(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteEstadoCuentaEmpleado`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteCuadreiva(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteCuadreIva`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteLiquidacioniva(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteLiquidacionIva`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteComprobante(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteComprobante`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteBalanceEXE(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporteContabilidad}repoteBalanceEXE`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repotePerdidaEXE(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporteContabilidad}repotePerdidaEXE`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }

    repotePlanCuentarpt(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repotePlanCuentaRPT`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }

    generaRIDE(par1: string, par2: string) {
        var _model: any = {
            co_codigo: par1,
            fa_codigo: par2
        }
        return this._httpClient.post(`${environment.API_URL}/${environment.reporte}GeneraRIDE`, _model, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    repoteForma(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string, par8: string) {
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
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reporte}repoteForma`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))
    }
    recuperaBoletos(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}recuperaBoletos`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }

    activarBoleto(_model: any) {

        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.boleto}activarBoleto`, _model, { headers: headersglobal.headers }).pipe()
    }
    repoteBoletosTipoVisual(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string, par7: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6,
            par7: par7
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteBoletosVisualTipo`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteBoletosCambio(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteBoletosCambio`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteBoletosVisual(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteBoletosVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    reporteentidadvisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}reporteentidadvisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteDecimosVisual(par1: string, par2: string, par3: string, par4: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteDecimosVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteAnticipoQuincenaVisual(par1: string, par2: string, par3: string, par4: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteAnticipoQuincenaVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteFinMesPDF(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6
        }
        return this._httpClient.post(`${environment.API_URLLOGIN}/${environment.reportenominames}repoteFinMes`, parambusquedad, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000))

    }

    repoteFinMesVisual(par1: string, par2: string, par3: string, par4: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reportenominames}repoteFinMesVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    reporteproveedorvisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}reporteproveedorvisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteContratoVisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteContratoVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repotePagoVisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repotePagoVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteCuentaxCobrarVisualVencido(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteCuentaxCobrarVisualVencido`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteCuentaxCobrarVisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteCuentaxCobrarVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteCuentaxPagarRetVisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteCuentaxPagarRetVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteCuentaxPagarSelec(par1: string, par2: string, par3: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteCuentaxPagarSelec`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteCuentaxPagarVisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteCuentaxPagarVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteOrdenCompraVisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteOrdenCompraVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteFacturacionVisual2(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteFacturacionVisual2`, parambusquedad, { headers: headersglobal.headers }).pipe()
    
    }
    repoteFacturacionVisualAnu(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteFacturacionVisualAnu`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteFacturacionVisualNC(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteFacturacionVisualNC`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteFacturacionVisual3(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteFacturacionVisual3`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteFacturacionVisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteFacturacionVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteVacacionesVisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteVacacionesVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteGanancia(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteUtilidad`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repotePrestamoVisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repotePrestamoVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteAdelantoVisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteAdelantoVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteFaltasVisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteFaltaVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteComprobanteVisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteComprobanteVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteBalanceVisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporteContabilidad}repoteBalanceVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repotePerdidaVisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporteContabilidad}repotePerdidaVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }


    repotePlanCuenta(par1: string, par2: string, par3: string, par4: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repotePlanCuenta`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    repoteContabilizaVisual(par1: string, par2: string, par3: string, par4: string, par5: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteContabilizaVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }

    repoteFormaVisual(par1: string, par2: string, par3: string, par4: string, par5: string, par6: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3,
            par4: par4,
            par5: par5,
            par6: par6
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.reporte}repoteFormaVisual`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getBoletoentidad(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.boleto}GetBoletoEntidad`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getBoletoEntidadfa(par1: string, par2: string, par3: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2,
            par3: par3
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.boleto}GetBoletoEntidadfa`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getFacturaRet(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.factura}GetFacturaPagarRet`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getNotaCredito(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.notacredito}GetNotaCredito`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getFacturapr(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.factura}GetFacturapr`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getFactura(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.factura}GetFactura`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    
    getRetencionFactura(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.factura}GetRetencionFactura`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getFacturaPagar(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.cuentaxpagar}GetFacturaPagar`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getFacturaPagarRet(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.cuentaxpagar}GetFacturaPagarRet`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getBoleto(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.boleto}GetBoleto`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getAsiento(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.contabilidad}GetAsiento`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    getInterfazContable(par1: string) {
        var parambusquedad = {
            par1: par1
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.contabilidad}GetInterfazContable`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
    asientoApertura(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.contabilidad}AsientoApertura`, _model, { headers: headersglobal.headers }).pipe()
    }
    procesarCierre(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.contabilidad}CierreModulo`, _model, { headers: headersglobal.headers }).pipe()
    }
    reversoAsiento(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.contabilidad}ReversoAsientoApertura`, _model, { headers: headersglobal.headers }).pipe()
    }
    reversoCierre(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.contabilidad}ReversoModulo`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertAsiento(_model: BoCabeceraModel) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.contabilidad}InsertAsiento`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertInterfazContable(_model: BoCabeceraModel) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.contabilidad}InsertInterfazContable`, _model, { headers: headersglobal.headers }).pipe()
    }

    updateAsiento(_model: BoCabeceraModel) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.contabilidad}UpdateAsiento`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateInterfazContable(_model: BoCabeceraModel) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.contabilidad}UpdateInterfazContable`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteInterfazContable(_model: BoCabeceraModel) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.contabilidad}DeleteInterfazContable`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteAsiento(_model: BoCabeceraModel) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.contabilidad}DeleteAsiento`, _model, { headers: headersglobal.headers }).pipe()
    }
    insertBoleto(_model: BoCabeceraModel) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.boleto}InsertBoleto`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateBoletoCambio(_model: any) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.boleto}UpdateBoletoCambio`, _model, { headers: headersglobal.headers }).pipe()
    }
    updateBoleto(_model: BoCabeceraModel) {
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.boleto}UpdateBoleto`, _model, { headers: headersglobal.headers }).pipe()
    }
    deleteBoleto(_model: BoCabeceraModel) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.boleto}DeleteBoleto`, _model, { headers: headersglobal.headers }).pipe()
    }
    buscarBoleto(_model: BoDetalleModel) {
        return this._httpClient.post<any>(`${environment.API_URL}/${environment.boleto}BuscarBoleto`, _model, { headers: headersglobal.headers }).pipe()
    }

    getBoletoSelect(par1: string, par2: string) {
        var parambusquedad = {
            par1: par1,
            par2: par2
        }
        return this._httpClient.post<any>(`${environment.API_URLLOGIN}/${environment.boleto}GetBoletoSelect`, parambusquedad, { headers: headersglobal.headers }).pipe()
    }
}
