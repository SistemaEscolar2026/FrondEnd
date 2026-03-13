import { Component,   ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Funcion } from '@funciones/funciones';
import { BotonesModel } from '@modelo/botones-model';
import { MantenimientoService } from '@services/mantenimiento-service';
import { ComprasService } from '@services/compras-service';
import { NgxSpinnerService } from "ngx-spinner";
import { globales, environment } from 'src/environments/environment';
import * as moment from 'moment';
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  templateUrl: './estadocuentacxp.component.html',
  styleUrls: ['./estadocuentacxp.component.scss']
})
export class EstadoCuentaCXPComponent {
  /**
* DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE CLIENTE
*/
  @ViewChild('modalbusquedaproveedor') modalbusquedaproveedor: any;
  /**
* @ignore
*/
  bangeneral: number = 0;
  /**
* @ignore
*/
  controlmultiple: boolean = false;
  /**
* DEFINICION DE VARIABLE PARA FECHA INICIAL
*/
  fechaInicial: string = "";
  /**
* DEFINICION DE VARIABLE PARA FECHA FINAL
*/
  fechaFinal: string = "";
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE PROVEEDORES
*/
  listproveedor: any[] = [];
  /**
* DEFINICION DE VARIABLE PARA ABRIR MODAL DE REPORTE
*/
  openReport: string = "";
  /**
* DEFINICION DE VARIABLE LISTADO PROVEDORES SELECCIONADOS
*/
  listproveedoresseleccionado: any[] = [];
  /**
* DEFINICION DE VARIABLE ESTADO CON SALDO 0
*/
  estadocero: boolean = true;
  /**
* DEFINICION DE VARIABLE VER ANTICIPO
*/
  estadoanticipo: boolean = false;
  /**
* DEFINICION DE VARIABLE TIPO REPORTE
*/
  tiporeporte: string = "D";
  /**
* DEFINICION DE VARIABLE TIPO REPORTE
*/
  tipopresentacion: string = "N";
  /**
* DEFINICION DE VARIABLE QUE ENVIA INFORMACION A MODAL DE MENSAJE
*/
  llamarmodal: string = "";
  /**
 * DEFINICION DE VARIABLE DE RUTA LA CUAL NOS PERMITA REDIRECCIONAR A OTRA PAGINA
 */
  router: Router;
  /**
* DEFINICION DE VARIABLE MODAL DE MANEJO DE LA SECCION DE BOTONES
*/
  botones: BotonesModel = new BotonesModel();
  /**
* DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
*/
  modalRef: any;
  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private spinner: NgxSpinnerService,_router: Router, private modalService: BsModalService, private mantenimientoService: MantenimientoService, private comprasService: ComprasService) {
    this.router = _router;
    if (!Funcion.ValidadAutorizado()) {
      this.router.navigate(['/']);
    } else {
      if (!Funcion.ValidadPagina('Estado de Cuenta (Compras CxP)')) {
        this.router.navigate(['/principal/default'], {
          skipLocationChange: true,
        });
      }
    }
    this.limpiar();
  }


  /**
* DEFINICION DE FUNCION SALIR DE LA PANTALLA
*/
  salir() {
    this.router.navigate(['/principal/default'], {
      skipLocationChange: true,
    });
  }
  /**
* DEFINICION DE FUNCION LIMPIAR PROVEEDORES
*/
  limpiarproveedor() {
    this.listproveedoresseleccionado = [];
  }
  /**
* DEFINICION DE FUNCION LIMPIAR PANTALLA
*/
  limpiar() {
    var date = new Date();
    var primerDia = new Date(date.getFullYear(), 0, 1);
    var ultimoDia = new Date(date.getFullYear(), 11 + 1, 0);
    this.fechaInicial = moment(primerDia).format("YYYY-MM-DD").toString();
    this.fechaFinal = moment(ultimoDia).format("YYYY-MM-DD").toString();
    this.botones.btnimprimir = true;
    this.listproveedoresseleccionado = [];

  }

  /**
* DEFINICION DE FUNCION PARA SETEAR INFORMACION EN OBJETO DE FROM 
*/
  async setdatosfrom(dato: any[], ban: number) {
    if (ban == 1) {
      dato.forEach((key: any) => {
        this.listproveedoresseleccionado.push({
          codigo: key.prcodigo,
          descripcion: key.prcodigo + ' - ' + key.prnombre
        });
      });
    }
  }

  /**
* DEFINICION DE FUNCION PARA BUSCAR PROVEEDOR
*/
  buscar(ban: number) {
    this.controlmultiple = true;
    this.bangeneral = ban;
    this.cargarProveedor();
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE LISTADO DE CLIENTE
*/
  cargarProveedor() {
    this.spinner.show();
    this.mantenimientoService.getProveedor(globales.cia).subscribe(data => {
      try {
        this.listproveedor = data;
        this.openModal(this.modalbusquedaproveedor, "");
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA CERRAR MODALES
*/
  cierreModal(event: boolean) {
    if (event) {
      this.hideModal()
    }
  }
  /**
* DEFINICION DE FUNCION CERRAR MODAL PROVEEDOR ARRAY
*/
  cierreProveedorarray(event: any) {
    if (event.length>0) {
      this.hideModal()
      this.setdatosfrom(event, this.bangeneral);
    }
  }
  /**
* DEFINICION DE FUNCION PARA OCULTAR MODALES
*/
  hideModal() {
    this.controlmultiple = false;
    if (this.modalRef != undefined) {
      this.modalRef.hide();
    }
  }
  /**
* DEFINICION DE FUNCION PARA ABRIR CUALQUIER MODAL
*/
  openModal(content: string, tipo: string) {
    this.modalRef = this.modalService.show(
      content, { class: tipo });
  }
  /**
* DEFINICION DE FUNCION PARA PROCESAR REPORTE
*/
  procesar() {
    this.botones.btnimprimir = false;
    this.spinner.show();
    var _proveedores = "";
    this.listproveedoresseleccionado.forEach((key: any) => {
      _proveedores +=  key.codigo + ',';
    });
    this.comprasService.ejecutaSPEstCtaCxp(globales.cia, Funcion.ReturnUsuario().us_codigo, globales.nomMaquina, this.fechaInicial, this.fechaFinal, (_proveedores === "") ? 'T' : _proveedores, (this.estadocero) ? 'S' : 'N', (this.estadoanticipo)?'S':'N').subscribe(async data => {
      try {
        if (data != null) {
          this.generaReporte();
        }
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, err => {
      this.llamarmodal = "2|Estado de Cuenta CXP|" + err.error.Message + "|" + Funcion.Ramdon().toString();
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA GENERAR REPORTE
*/
  generaReporte() {
    let parametro = {
      cia: globales.cia,
      maquina: globales.nomMaquina,
      usuario: Funcion.ReturnUsuario().us_codigo,
      fechaIni: this.fechaInicial,
      fechaFin: this.fechaFinal
    };
    let iNombreRporte = "";
    if (this.tipopresentacion === "N") {
      if (this.tiporeporte === "D") {
        iNombreRporte = "estadoCuenta";
      }
      else {
        iNombreRporte = "estadoCuentaRes";
      }
    } else {
      if (this.tiporeporte === "D") {
        iNombreRporte = "EstadoCuentaCol";
      }
      else {
        iNombreRporte = "EstadoCuentaResCol";
      }
    }
    this.openReport = "Impresión Estado de Cuenta CXP|" + environment.reportServerCompCxP + iNombreRporte+"|" + JSON.stringify(parametro) + "|" + Funcion.Ramdon();

  }

 
}
