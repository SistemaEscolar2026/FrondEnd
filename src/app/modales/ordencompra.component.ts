import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReportViewerModule } from 'ngx-ssrs-reportviewer-v2';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatTabsModule } from '@angular/material/tabs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FuncionesService } from '@services/funciones-service';
import { Funcion } from '@funciones/funciones';
import { TotalesComponent } from '@modales/totales.component';
import { GridDetalleFormaPagoComponent } from '@modales/gridformapago.component';
import { GridDescuentoRecargoComponent } from '@modales/griddescuentorecargo.component';
import { globales } from 'src/environments/environment';
import { MantenimientoService } from '@services/mantenimiento-service';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  standalone: true,
  selector: 'app-ordencompra',
  templateUrl: './ordencompra.component.html',
  styleUrls: ['./ordencompra.component.scss'],
  imports: [
    MatTabsModule,
    ReportViewerModule,
    CommonModule,
    FormsModule,
    TotalesComponent,
    GridDetalleFormaPagoComponent,
    GridDescuentoRecargoComponent,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrdenCompraComponent implements OnInit {
  /**
* DEFINICION DE VARIABLE ENTRADA PARA ABRIR REPORT
*/
  @Input() set openOrden(dato: string) {
    if (dato != "") {
      this.titulo = dato.split('|')[0];
      this.openModalStatic(this.modalordencompra, "ngDraggable modal-fullscreen modal-primary");
    }
  }
  /**
* DEFINICION DE VARIABLE ENTRADA PARA CARGA DE DETALLE PEDIDO 
*/
  @Input() set cargaitemes(datos: any[]) {
    if (datos.length > 0) {
      this.detgrid = datos;
      this.detgrid.forEach((key: any) => {
        key.depiva = (key.depiva === "S") ? true : false;
      });
    }
  }
  /**
* DEFINICION DE VARIABLE ENTRADA PARA IMPUESTO
*/
  @Input() set cargaimpuesto(datos: any) {
    if (datos != "") {
      this.impuestos = datos.imcodigo + "||";
      this.basecerobaseivatotalpadre = datos.ccoexento + "|" + (parseFloat(datos.ccosubtotal) - parseFloat(datos.ccoexento)).toString() + "|" + datos.ccototalimp;
      this.iDocumento = datos;
      this.iDocumento.ccofechadoc = Funcion.FormatoFecha(datos.ccofechadoc);
      this.iDocumento.ccofechavencimiento = Funcion.FormatoFecha(datos.ccofechavencimiento);
      this.nuevalinea = [];
      this.nuevalineadescuentorecargo = [];
      datos.comDetalleFpago.forEach((key: any) => {
        this.nuevalinea.push({
          fpago: key.fpcodigo,
          pago: key.dcoftotalapagar,
          vencimiento: Funcion.FormatoFecha(key.dcoffecvenc),
          porcPrecio: key.dcoftotalapagar
        });
      });
      datos.comDetalleDesrec.forEach((key: any) => {
        this.nuevalineadescuentorecargo.push({
          linea: key.dcodrlinea,
          tipo: key.drtipodesrec,
          codigoS: key.drtipodesrec + key.drcodigo,
          valor: key.dcodrvalordesrec,
          total: key.dcodrtotaldesrec
        });
      });
    }
  }
  /**
* DEFINICION DE VARIABLE DE MODAL DE ORDEN DE COMPRA
*/
  @ViewChild('modalordencompra') modalordencompra: any;
  /**
* DEFINICION DE VARIABLE PARA EL MANEJO DE LAS NUEVAS LINEA EN LA FORMA DE PAGO 
*/
  nuevalinea: any[] = [];
  /**
* DEFINICION DE VARIABLE PARA EL MANEJO DE LAS NUEVAS LINEA DECUENTO Y RECARGO
*/
  nuevalineadescuentorecargo: any[] = [];
  /**
* DEFINICION DE VARIABLE DE MODELO FROM
*/
  iDocumento: any = {};
  /**
* DEFINICION DE VARIABLE DE TITULO DE REPORTE
*/
  titulo: string = "";
  /**
* DEFINICION DE VARIABLE CON NOMBRE DE COLUMNA DE CABECERA DE DETALLE DE PEDIDO
*/
  ColumnaDetalle: any[] = ['Centro Costo', 'Medida', 'Cantidad', 'Precio', 'Total', 'IVA', 'Valor IVA'];
  /**
* DEFINICION DE VARIABLE CON DATOS DE DETALLE DE PEDIDO
*/
  detgrid: any[] = [];
  /**
* DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
*/
  modalRef: any;
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE TIPO ITEMS
*/
  listitems: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE TIPO DOCUMENTO
*/
  listtipodoc: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE SUCURSAL
*/
  listsucursal: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CENTRO COSTOS
*/
  listcosto: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE ORIGEN
*/
  listorigen: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE TIPO COMPRA
*/
  listtipocompra: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE COMPRADORES
*/
  listcomprador: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE UNIDAD MEDIDA
*/
  listmedida: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE UNIDAD MEDIDA
*/
  impuestos: string = "";
  /**
* DEFINICION DE VARIABLE CON VALORES PARA SESSION DE TOTALES
*/
  basecerobaseivatotalpadre: string = "";
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE ESTADO
*/
  listEstado: any[] = [];
  /**
* DEFINICION DE VARIABLE USO DE MODULO EN FORMA DE PAGO
*/
  usoModulo: string = "V";
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE NIVEL DE APOBACION
*/
  listoDatoNivel: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE REFERENCIA
*/
  listoReferencia: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE COMPRA
*/
  listoCompra: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE FORMA DE PAGO
*/
  listformapago: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE FORMA DE PAGO
*/
  listfdescuentorecargo: any[] = [];
  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(_router: Router, private modalService: BsModalService, private funcionesService: FuncionesService, private mantenimientoService: MantenimientoService) {
    this.listitems = Funcion.TipoItems();
    this.listorigen = Funcion.TipoOrigen();
    this.listtipocompra = Funcion.TipoCompra();
    this.listEstado = Funcion.Estado();
    this.listoDatoNivel = Funcion.DatosCombo();
    this.listoReferencia = Funcion.TipoReferencia();
    this.listoCompra = Funcion.TipoCompra2();
    this.listfdescuentorecargo = Funcion.TipoDescuentoRecargo();
  }

  /**
* DEFINICION DE FUNCION INIT DE LA CLASE
*/
  ngOnInit() {
    this.funcionesService.getCentrosCosto(globales.cia).subscribe(data => { this.listcosto = data; }, () => { });
    this.funcionesService.getMedidas().subscribe(data => { this.listmedida = data; }, () => { });
    this.cargarSucursal();
    this.cargarTipoDocumento();
    this.cargarCompradores();
    this.cargarFormaPago();
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE FORMA DE PAGO
*/
  cargarFormaPago() {
    this.mantenimientoService.getFormasPago(this.usoModulo).subscribe(data => {
      try {
        this.listformapago = data;
      } catch (e) {
      }
    }, () => {
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA LISTADO DE SUCURSALES
*/
  cargarCompradores() {
    this.mantenimientoService.getComprador(globales.cia).subscribe(data => {
      try {
        this.listcomprador = data;
      } catch (e) {
      }
    }, () => {
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA LISTADO DE SUCURSALES
*/
  cargarSucursal() {
    this.mantenimientoService.getSucursalesVtasInv(globales.cia, Funcion.ReturnUsuario().us_codigo).subscribe(data => {
      try {
        this.listsucursal = data;
        this.iDocumento.sucodigo = globales.sucursalPrin;
      } catch (e) {
      }
    }, () => {
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA LISTADO DE TIPO DOCUMENTO
*/
  cargarTipoDocumento() {
    this.mantenimientoService.getTipodocComp(globales.cia).subscribe(data => {
      try {
        this.listtipodoc = data;
      } catch (e) {
      }
    }, () => {
    });
  }
  /**
* DEFINICION DE FUNCION DE CERRAR MODALES
*/
  cerrar() {
    this.hideModal();
  }
  /**
* DEFINICION DE FUNCION DE HIDDEN MODAL
*/
  hideModal() {
    if (this.modalRef != undefined) {
      this.modalRef.hide();
    }
  }
  /**
* DEFINICION DE FUNCION ABRIR MODALES STATICO
*/
  openModalStatic(content: string, tipo: string) {
    this.modalRef = this.modalService.show(
      content, { class: tipo, backdrop: 'static' });
  }

  /**
* DEFINICION DE FUNCION DE CALCULO DE TOTALES
*/
  sumtotales(row: any) {
    var _datos: any[] = [];
    _datos.push(row);
    let total = 0;
    total = _datos.reduce((prev, next) => prev + ((next.dcocantpedalterna * next.dcocostomedalter) + next.dcoiva), 0);
    return total;
  }

}
