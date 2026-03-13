import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FuncionesService } from '@services/funciones-service';
import { SriService } from '@services/sri-service';
import { Funcion } from '@funciones/funciones';
import { BotonesModel } from '@modelo/botones-model';
import { MantenimientoService } from '@services/mantenimiento-service';
import { BancosService } from '@services/bancos-service';
import { NgxSpinnerService } from "ngx-spinner";
import { globales, environment } from 'src/environments/environment';
import * as moment from 'moment';
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  templateUrl: './cuadraturaventasriconta.component.html',
  styleUrls: ['./cuadraturaventasriconta.component.scss']
})
export class CuadraturaVentasSriContabilidadComponent {

  router: Router;
  openReport: string = "";
  llamarmodal: string = "";
  botones: BotonesModel = new BotonesModel();
  fechaservidor: string = "";
  ddw_mes: string = "";
  ne_anio: string = "";
  rb_excel: string = "";
 
  constructor(private spinner: NgxSpinnerService, _router: Router, private funcionesService: FuncionesService, private modalService: BsModalService, private bancosService: BancosService, private mantenimientoService: MantenimientoService, private sriService: SriService) {
    this.router = _router;
    if (!Funcion.ValidadAutorizado()) {
      this.router.navigate(['/']);
    } else {
      if (!Funcion.ValidadPagina('Cuadratura de Iva en Ventas SRI Contabilidad')) {
        this.router.navigate(['/principal/default'], {
          skipLocationChange: true,
        });
      }
      }
      var fecha = new Date();
      this.fechaservidor = moment(fecha).format("YYYY-MM-DD").toString();
    this.limpiar();
  }

  procesar() {
    this.generaReporte();

  }
  generaReporte() {
    let parametro = {
      cia: globales.cia,
      anio: this.ne_anio,
      mes: this.ddw_mes,
      maquina: globales.nomMaquina,
      usuario: Funcion.ReturnUsuario().us_codigo
    };


    let iNombreRporte = "";


    if (this.rb_excel === "N") {
      iNombreRporte = "CuadraturaIVAVentasContab";
    }
    else {
      iNombreRporte = "CuadraturaIVAVentasContabCol";
    }


    this.openReport = "Cuadratura de Iva en Ventas-SRI-Contabilidad|" + environment.reportServerSRI + iNombreRporte + "|" + JSON.stringify(parametro) + "|" + Funcion.Ramdon();

  }



  limpiar() {
    this.ddw_mes = parseInt(this.fechaservidor.substr(5, 2)).toString();
    this.ne_anio = parseInt(this.fechaservidor.substr(0, 4)).toString();
    this.rb_excel = "N";


  }



  salir() {
    this.router.navigate(['/principal/default'], {
      skipLocationChange: true,
    });
  }



  /**
* DEFINICION DE FUNCION MENSAJE DE MODALES
*/
  modalmensaje(tipo: string, mensaje: string) {
    this.llamarmodal = tipo + "|Cuadratura de Iva en Ventas-SRI-Contabilidad|" + mensaje + "|" + Funcion.Ramdon();
  }

}
