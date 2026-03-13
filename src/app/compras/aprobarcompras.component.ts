import { Component,  ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Funcion } from '@funciones/funciones';
import { BotonesModel } from '@modelo/botones-model';
import { ComCabeceraModel } from '@modelo/comCabecera-model';
import { MantenimientoService } from '@services/mantenimiento-service';
import { ComprasService } from '@services/compras-service';
import { NgxSpinnerService } from "ngx-spinner";
import { globales, environment } from 'src/environments/environment';
import * as moment from 'moment';
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  templateUrl: './aprobarcompras.component.html',
  styleUrls: ['./aprobarcompras.component.scss']
})
export class AprobarComprasComponent {
  /**
* DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE CLIENTE
*/
  @ViewChild('modalbusquedaproveedor') modalbusquedaproveedor: any;
  /**
* DEFINICION DE VARIABLE QUE ABRE MODAL ORDEN COMPRA
*/
  openOrden: string = "";
  /**
* @ignore
*/
  bangeneral: number = 0;
  /**
* DEFINICION DE VARIABLE PARA LOS DATOS GENERALES DEL GRID DE DETALLE DE PEDIDO
*/
  datogridgeneral: any = [];
  /**
* DEFINICION DE VARIABLE PARA LOS DATOS DE IMPUESTO
*/
  cargaimpuesto: string = "";
  /**
* DEFINICION DE VARIABLE QUE ENVIA INFORMACION A MODAL DE MENSAJE
*/
  llamarmodal: string = "";
  /**
* DEFINICION DE VARIABLE PARA BUSQUEDAD
*/
  txtbusca: string = "";
  /**
* DEFINICION DE VARIABLE CON NOMBRE DE COLUMNA DE CABECERA DE DETALLE DE PEDIDO
*/
  ColumnaDetalle: any[] = ['Sel.', 'Fecha', 'Documento', 'Número', 'Proveedor', 'Comprador', 'Total', ' '];
  /**
* DEFINICION DE VARIABLE PARA FECHA INICIAL
*/
  fechaInicial: string = "";
  /**
* DEFINICION DE VARIABLE PARA FECHA FINAL
*/
  fechaFinal: string = "";
  /**
* DEFINICION DE VARIABLE CON DETALLE DE ORDEN DE APORBACION
*/
  detalleOrden: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE PROVEEDORES
*/
  listproveedor: any[] = [];
  /**
* DEFINICION DE VARIABLE PARA PROVEEDOR INICIAL
*/
  proveedorIni: string = "";
  /**
* DEFINICION DE VARIABLE PARA PROVEEDOR FINAL
*/
  proveedorFin: string = "";
  /**
* DEFINICION DE VARIABLE PARA NOMBRE DE PROVEEDOR INICIAL
*/
  nomproveedorIni: string = "";
  /**
* DEFINICION DE VARIABLE PARA NOMBRE DE PROVEEDOR FINAL
*/
  nomproveedorFin: string = "";
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
 * DEFINICION DE VARIABLE QUE MANEJA EL OBJETO DE APROBACION
 */
  modeloaprobacion: ComCabeceraModel[] = [];
  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private spinner: NgxSpinnerService,_router: Router, private modalService: BsModalService, private mantenimientoService: MantenimientoService, private comprasService: ComprasService) {
    this.router = _router;
    if (!Funcion.ValidadAutorizado()) {
      this.router.navigate(['/']);
    } else {
      if (!Funcion.ValidadPagina('Aprobar Ordenes de Compra')) {
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
* DEFINICION DE FUNCION LIMPIAR PANTALLA
*/
  limpiar() {
    var date = new Date();
    var primerDia = new Date(date.getFullYear(), 0, 1);
    var ultimoDia = new Date(date.getFullYear(), 11 + 1, 0);
    this.fechaInicial = moment(primerDia).format("YYYY-MM-DD").toString();
    this.fechaFinal = moment(ultimoDia).format("YYYY-MM-DD").toString();
    this.proveedorIni = "";
    this.nomproveedorIni = "";
    this.proveedorFin = "";
    this.nomproveedorFin = "";
    sessionStorage.setItem("variablecontrol", "N");
  }
  /**
 * DEFINICION DE FUNCION PARA LOSTFOCUS DE CLIENTE
 */
  buscarcliente(ban: number) {
    if (ban === 1) {
      if (this.proveedorIni !== "") {
        this.cargarProveedorseleccionado(this.proveedorIni, ban)
      }
    } else {
      if (this.proveedorFin !== "") {
        this.cargarProveedorseleccionado(this.proveedorFin, ban)
      }
    }
  }
  /**
* DEFINICION DE FUNCION PARA SETEAR INFORMACION EN OBJETO DE FROM 
*/
  async setdatosfrom(dato: any, ban: number) {
    if (ban == 1) {
      this.proveedorIni = dato.prcodigo;
      this.nomproveedorIni = dato.prnombre;
    } else {
      this.proveedorFin = dato.prcodigo;
      this.nomproveedorFin = dato.prnombre;
    }
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE ORDENES DE COMPRA PENDIENTE
*/
  cargaOrdenPendiente() {
    this.spinner.show();
    this.comprasService.getObetenerOrdenesCompraAD(globales.cia, this.fechaInicial + '|' + this.fechaFinal, ((this.proveedorIni === "") ? "00000" : this.proveedorIni) + '|' + ((this.proveedorFin) === "" ? "ZZZZZ" : this.proveedorFin), "N").subscribe(async data => {
      try {
        if (data != null) {
          this.detalleOrden = data;
          this.detalleOrden.forEach((key: any) => {
            key.sel = false;
          });
        } else {
          this.detalleOrden = [];
        }
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE CLIENTE SELECCIONADO
*/
  cargarProveedorseleccionado(codcliente: string, ban: number) {
    this.spinner.show();
    this.mantenimientoService.getGetProveedorseleccionado(globales.cia, codcliente).subscribe(async data => {
      try {
        if (data != null) {
          this.hideModal()
          this.setdatosfrom(data, ban);
        } else {
          this.buscar(ban);
        }
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA APROBAR ORDEN DE COMPRA
*/
  procesar() {
    var _resultado = this.detalleOrden.filter(function (data2: { sel: boolean; }) {
      return data2.sel === true;
    });
    if (_resultado.length <= 0) {
      this.llamarmodal = "1|Aprobar Órdenes Compra|Debe seleccionar Ordenes de Compra para procesar...|" + Funcion.Ramdon().toString();
    } else {
      _resultado.forEach((key: any) => {
        let _hijo = new ComCabeceraModel();
        _hijo.ccoaprobado = "S";
        _hijo.ccousuarioaprobacion = Funcion.ReturnUsuario().us_codigo;
        _hijo.ccousuarioultmodif = Funcion.ReturnUsuario().us_codigo;
        _hijo.ciacodigo = key.cia_codigo;
        _hijo.tcomcodigo = key.tcom_codigo;
        _hijo.cconumero = key.cco_numero;
        this.modeloaprobacion.push(_hijo);
      });

      this.spinner.show();
      this.comprasService.apruebaDesapruebaOrdenCompra(Funcion.Complemento(), Funcion.Auditoria() + environment.modCompCxP + ",020000001", this.modeloaprobacion).subscribe(async data => {
        try {
          this.llamarmodal = "3|Aprobar Órdenes Compra|Proceso Terminado con Éxito...|" + Funcion.Ramdon().toString();
          this.spinner.hide();
        } catch (e) {
          this.spinner.hide();
        }
      }, err => {
        this.llamarmodal = "2|Aprobar Órdenes Compra|" + err.error.Message+"|" + Funcion.Ramdon().toString();
        this.spinner.hide();
      });
    }
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE ORDENES DE COMPRA PENDIENTE
*/
  cargaOrdenCompra(dato:any) {
    this.spinner.show();
    this.comprasService.getOrdenCompra(Funcion.Complemento(), Funcion.Auditoria() + environment.modCompCxP + ",020000001", globales.cia, dato.cco_numero, dato.tcom_codigo).subscribe(async data => {
      try {
        if (data != null) {
          this.datogridgeneral = data.comDetalle;
          this.openOrden = "Orden de Compra|" + Funcion.Ramdon().toString();
          this.cargaimpuesto = data;
        } else {
          this.datogridgeneral = [];
        }
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, err => {
      this.llamarmodal = "2|Aprobar Órdenes Compra|" + err.error.Message + "|" + Funcion.Ramdon().toString();
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA BUSCAR CLIENTE
*/
  buscar(ban: number) {
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
* DEFINICION DE FUNCION CERRAR MODAL PROVEEDOR
*/
  cierreProveedor(event: string) {
    if (event !== "") {
      this.hideModal()
      var _datos = JSON.parse(event)
      this.setdatosfrom(_datos, this.bangeneral);
    }
  }
  /**
* DEFINICION DE FUNCION PARA OCULTAR MODALES
*/
  hideModal() {
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
* DEFINICION DE FUNCION PARA ABRIR ORDEN DE COMPRA
*/
  openCompra(dato: any) {
    this.cargaOrdenCompra(dato);
  }
  /**
* DEFINICION DE FUNCION DE LIMPIAR COLOR
*/
  limpiarColor() {
    for (var i = 0; i < this.detalleOrden.length; i++) {
      this.detalleOrden[i].color = "";
    }
  }
  /**
* DEFINICION DE FUNCION CLICK EN ACEPTAR EN MODAL DE APROBACION DE ORDEN DE COMPRA
*/
  aceptarOk(event: boolean) {
    if (event) {
      this.cargaOrdenPendiente();
    }
  }
  /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
  clickGrid(row: any) {
    this.limpiarColor();
    row.color = "SG";
  }
  /**
* DEFINICION DE FUNCION DE DOBLE CLICK EN LINEA DE GRID
*/
  dblclickGrid(row: any) {
    this.limpiarColor();
    row.color = "SG";
  }
}
