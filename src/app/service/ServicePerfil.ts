import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, headersglobal, headerstoken } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServicePerfil {

  private actionUrl: string="";

  private userLoggedIn = new Subject<boolean>();

  constructor( private http: HttpClient) {

  }
    public getConsultaPerfilTipo(perf: any) {
    var perfil = {
      tipo_Perfil: perf.tipo_Perfil,
      cod_Perfil: perf.cod_Perfil,
      nom_Perfil: perf.nom_Perfil
    }
        return this.http.post<any>(this.actionUrl + 'ConsultaTotalPerfilTipo', perfil, { headers: headersglobal.headers }).pipe(timeout(500000));
  }
    public getConsultaPerfil(perf: any) {
    var perfil = {
      cod_Perfil: perf.cod_Perfil,
      nom_Perfil: perf.nom_Perfil
    }
        return this.http.post<any>(this.actionUrl + 'ConsultaTotalPerfil', perfil, { headers: headersglobal.headers }).pipe(timeout(500000));
  }
    public getConsultaPerfilUsuario(perf: any) {
    var perfil = {
      cod_Usuario: perf.cod_Usuario,
      cod_Perfil: perf.cod_Perfil,
      nom_Perfil: perf.nom_Perfil
    }
        return this.http.post<any>(this.actionUrl + 'ConsultaPerfilUsuario', perfil, { headers: headersglobal.headers }).pipe(timeout(500000));
  }
    public getConsultaPerfilUsuarioProveedor(perf: any) {
    var perfil = {
      cod_Usuario: perf.cod_Usuario,
      cod_Perfil: perf.cod_Perfil,
      nom_Perfil: perf.nom_Perfil
    }
        return this.http.post<any>(this.actionUrl + 'ConsultaPerfilUsuarioProveedor', perfil, { headers: headersglobal.headers }).pipe(timeout(500000));
  }
  
    public getConsultaPerfilMasa(perf: any) {
    var perfil = {
      cod_Perfil: perf.cod_Perfil,
      nom_Perfil: perf.nom_Perfil
    }
        return this.http.post<any>(this.actionUrl + 'ConsultaTotalPerfilMasa', perfil, { headers: headersglobal.headers }).pipe(timeout(500000));
  }
    public getReportePerfilMasa(perf: any) {
    var perfil = {
      cod_tipo: perf.cod_tipo,
      cod_Perfil: perf.cod_Perfil,
      nom_Perfil: perf.nom_Perfil,
      cod_tipoReporte: perf.cod_tipoReporte
    }
    
    return this.http.post(this.actionUrl + 'ReportePerfilMasa', perfil, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000));
  }
    public getReportePerfilMasaReport(perf: any) {
    var perfil = {
      cod_tipo: perf.cod_tipo,
      cod_Perfil: perf.cod_Perfil,
      nom_Perfil: perf.nom_Perfil,
      cod_tipoReporte: perf.cod_tipoReporte
    }

    return this.http.post(this.actionUrl + 'ReportePerfilMasaReport', perfil, { headers: headersglobal.headers, responseType: 'blob' }).pipe(timeout(500000));
  }
    public getConsultaPerfilPagina(perf: any) {
    var perfil = {
      cod_Perfil: perf.cod_Perfil,
      nom_Perfil: perf.nom_Perfil
    }
        return this.http.post<any>(this.actionUrl + 'ConsultaPerfilPagina', perfil, { headers: headersglobal.headers });
  }
    public getConsultaPaginaPerfil(perf: any) {
    var perfil = {
      cod_Perfil: perf.cod_Perfil,
      tipo_Pagina: perf.tipo_Pagina,
      s_tipo: perf.s_tipo
    }
        return this.http.post<any>(this.actionUrl + 'ConsultaPaginaPerfil', perfil, { headers: headersglobal.headers });
  }
    public getActualizarPerfilPagina(perf: any) {
    var perfil = {
      s_tipo: perf.s_tipo,
      cod_Perfil: perf.cod_Perfil,
      cod_Hasta: perf.cod_Hasta
    }
        return this.http.post<any>(this.actionUrl + 'ActualizarPerfilPagina', perfil, { headers: headersglobal.headers });
  }

  

  
    public getActualizarPerfil(perf: any) {
    var perfil = {
      cod_tipo: perf.cod_tipo,
      cod_segPerfil: perf.cod_segPerfil,
      cod_Perfil: perf.cod_Perfil,
      nom_Perfil: perf.nom_Perfil,
      des_Perfil: perf.des_Perfil,
      area_Perfil: perf.area_Perfil,
      est_Perfil: perf.est_Perfil,
      tipo_Perfil: perf.tipo_Perfil
    }

        return this.http.post<any>(this.actionUrl + 'ActualizarPerfil', perfil, { headers: headersglobal.headers });
  }
}
