import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Funcion } from '@funciones/funciones';
import { MantenimientoService } from '@services/mantenimiento-service';
import { VentasService } from '@services/ventas-service';
import { FuncionesService } from '@services/funciones-service';
import { TotalModel } from '@modelo/total-model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, } from '@angular/forms';
import { BotonesModel } from '@modelo/botones-model';
import { globales, environment } from 'src/environments/environment';
import { ServiceMensaje } from '@services/config/ServiceMensaje';
import { TabuladoresModel } from '@modelo/TabuladoresModel';
import { CabeceraPed } from '@modelo/cabeceraped-model';
import { RelpedProductoc } from '@modelo/relpedProductocModel-model';
import { TransporteProd } from '@modelo/transporteProd-model';
import { BdgTransportista } from '@modelo/bdgTransportista-model';
import { WorkflowAprobped } from '@modelo/workflowAprobpedModel-model';
import { Options } from 'select2';
import { NgxSpinnerService } from "ngx-spinner";


/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  templateUrl: './ingresopedido.component.html',
  styleUrls: ['./ingresopedido.component.scss']
})
export class IngresoPedidoComponent implements OnInit {
  /**
* DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE ITEM
*/
  @ViewChild('modalbusquedaitem') modalbusquedaitem: any;
  /**
* DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE CLIENTE
*/
  @ViewChild('modalbusquedacliente') modalbusquedacliente: any;
  /**
* DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE TRANSPORTISTA
*/
  @ViewChild('modalbusquedatransportista') modalbusquedatransportista: any;
  /**
* DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE PRODUCTO CONTROLADOS
*/
  @ViewChild('modalproductocontrol') modalproductocontrol: any;
  /**
* DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
*/
  modalRef: any;
  /**
* DEFINICION DE VARIABLE LISTADO DE SUCURSALES
*/
  lSucursal: any;
  /**
* DEFINICION DE VARIABLE CON NOMBRE DE COLUMNA DE CABECERA DE FACTURA CLIENTE
*/
  ColumnaDetalle: any[] = ['Fecha', 'Fecha Venc.', 'Cuota', 'Total Doc.', 'Abono', 'Saldo', 'Días Mora'];
  /**
* DEFINICION DE VARIABLE CON NOMBRE DE COLUMNA DE CABECERA DE DATOS HISTORICOS
*/
  ColumnaDetalleHistorico: any[] = ['Cantidad', 'Precio Vta.', 'Precio Lista', 'IVA', 'Total'];
  /**
* DEFINICION DE VARIABLE PARA ABRIR MODAL DE REPORTE
*/
  openReport: string = "";
  /**
* DEFINICION DE VARIABLE OBTENER EL NUMERO DE DOCUMENTO
*/
  numerodocumento: number = 0;
  /**
* DEFINICION DE VARIABLE PARA CAPTAR LOS MENSAJE DE ERROR
*/
  isMensajeS: string = "";
  /**
* DEFINICION DE VARIABLE PARA INDICAR SI SE IMPRIME O NO EL DOCUMENTO
*/
  iImpresion: number = 0;
  /**
* DEFINICION DE VARIABLE PARA LOS MENSAJE DE VALIDACION
*/
  lMensaje: string = "";
  /**
* DEFINICION DE VARIABLE PARA INDICAR SI EL PEDIDO ES AUTOMATICO
*/
  pedidoautomatico: boolean = false;
  /**
* DEFINICION DE VARIABLE PARA FECHA DE RESERVA
*/
  fechaReserva: string = "";
  /**
* DEFINICION DE VARIABLE PARA EL CONTROL DE PRODUCTO CONTROLADOS
*/
  prodControl: string = "false|" + Funcion.Ramdon();
  /**
* DEFINICION DE VARIABLE PARA EL CONTROL DE VALORES BASE 0 O BASE IVA
*/
  basecerobaseivatotalpadre: string = "";
  /**
* DEFINICION DE VARIABLE PARA LA BUSQUEDA DE ITEM
*/
  datobusquedadmodal: string = "";
  /**
* DEFINICION DE VARIABLE PARA EL VALOR DEL IVA
*/
  valorIva: number = 0;
  /**
* DEFINICION DE VARIABLE PARA LOS CODIGO DE IMPUESTO
*/
  impuestos: string = "";
  /**
* DEFINICION DE VARIABLE CONTROL DE TIPO DE TRANSACCION GUARDAR O ACTUALIZAR
*/
  isAccion: string = "";
  /**
* DEFINICION DE VARIABLE PARA EL ENVIO DE ITEM AL DETALLE DE GRID
*/
  lineagrid: any = [];
  /**
* DEFINICION DE VARIABLE PARA LOS DATOS GENERALES DEL GRID DE DETALLE DE PEDIDO
*/
  datogridgeneral: any = [];
  /**
* DEFINICION DE VARIABLE PARA LOS DATOS GENERALES DEL GRID DE FORMA DE PAGO
*/
  datogridformapago: any = [];
  /**
* DEFINICION DE VARIABLE PARA EL MANEJO DE LAS NUEVAS LINEA EN LA FORMA DE PAGO 
*/
  nuevalinea: any[] = [];
  /**
* DEFINICION DE VARIABLE GENERAL DEL MODELO DE ORDEN DE VENTA
*/
  iDocumento: CabeceraPed = new CabeceraPed();
  /**
* DEFINICION DE VARIABLE DATOS GENERAL DE ITEM POR CLIENTE PARA EL MODAL DE BUSQUEDA DE ITEM
*/
  parametroitem: any[] = [];
  /**
* DEFINICION DE VARIABLE DE CLIENTE SELECCIONADO
*/
  clienteseleccionado: any = [];
  /**
* DEFINICION DE VARIABLE CARGA GENERAL DE IMPUESTO
*/
  listaimpuestotmp: any[] = [];
  /**
* DEFINICION DE VARIABLE DE AÑO EN CURSO PARA VALIDACION 
*/
  pedidoaniocurso: string = "";
  /**
* DEFINICION DE VARIABLE PARA MOSTRA EL MENSAJE DE CLIENTE EN MORA
*/
  lbMora: string = "CLIENTE EN MORA";
  /**
* DEFINICION DE VARIABLE DE CONTROL DE CLIENTE EN MORA
*/
  visiblemora: boolean = false;
  /**
* DEFINICION DE VARIABLE PARA MOSTRA EL MENSAJE DE CLIENTE SIN CUPO
*/
  lbCupo: string = "CLIENTE SIN CUPO";
  /**
* DEFINICION DE VARIABLE DE CONTROL DE CLIENTE SIN CUPO
*/
  visiblecupo: boolean = false;
  /**
* DEFINICION DE VARIABLE DE CONTROL PARA LIMPIAR FORMA DE PAGO
*/
  limpiagridfomapago: string = "0";
  /**
* DEFINICION DE VARIABLE DE CONTROL PARA LIMPIAR LA SESSION DE TOTALES
*/
  limpiatotales: string = "0";
  /**
* DEFINICION DE VARIABLE DE CONTROL PARA LIMPIAR EL GRID DE DETALLE DE PEDIDO
*/
  limpiagrid: string = "true|" + Funcion.Ramdon();
  /**
* DEFINICION DE VARIABLE PARA MOSTRA EL CUPO UTILIZADO
*/
  utilizado: string = "0.00"
  /**
* DEFINICION DE VARIABLE PARA MOSTRA EL CUPO DISPONIBLE
*/
  disponible: string = "0.00"
  /**
* DEFINICION DE VARIABLE PARA MOSTRA EL SALDO
*/
  saldo: string = "0.00"
  /**
* DEFINICION DE VARIABLE PARA LOS FILTRO DE GRUPO EN LA CARGA DE HISTORICO
*/
  selectgrupo: string = "";
  /**
* DEFINICION DE VARIABLE PARA CONTROL SI ES UN TRASNPORTE ES NUEVO O CREADO
*/
  selectnuevocreado: string = "C";
  /**
* DEFINICION DE VARIABLE PARA FILTRO DE FECHA INICIAL PARA HISTORICO
*/
  fechainicial: string = "";
  /**
* DEFINICION DE VARIABLE PARA FILTRO DE FECHA FINAL PARA HISTORICO
*/
  fechafinal: string = "";
  /**
* DEFINICION DE VARIABLE PARA MOSTRA INFORMACION DE CLINETE SELECCCIONADO 
*/
  clienteinfo: string = "";
  /**
* DEFINICION DE VARIABLE DATOS DE CARTERA DE CLIENTE 
*/
  detgridcliente: any[] = [];
  /**
* DEFINICION DE VARIABLE DATOS DE HISTORICO DE CLIENTE
*/
  detgridhistorico: any[] = [];
  /**
* DEFINICION DE VARIABLE USO DE MODULO EN FORMA DE PAGO
*/
  usoModulo: string = "V";
  /**
* DEFINICION DE VARIABLE PARA HABILITA LOS TABULADORES SEGUN LA CONDICION
*/
  habilitacombotab1: boolean = true;
  /**
* DEFINICION DE VARIABLE PARA HABILITA LOS BOTONES DE BUSQUEDA
*/
  habilitabuscar: boolean = true;
  /**
* DEFINICION DE VARIABLE PARA HABILITA COMPONETENTE DEL FROM
*/
  habilitaobjetofrom: boolean = true;
  /**
* DEFINICION DE VARIABLE PARA HABILITA COMBO DE SUCURSAL
*/
  habilitacombosucur: boolean = true;
  /**
* DEFINICION DE VARIABLE PARA HABILITA FORMA DE PAGO
*/
  habilitaformapago: boolean = true;
  /**
* DEFINICION DE VARIABLE PARA HABILITA COMBO SI O NO
*/
  habilitacombosino: boolean = true;
  /**
* DEFINICION DE VARIABLE PARA HABILITA CHECK DE NUEVO O CREADO TRANSPORTISTA
*/
  habilitacombocrnu: boolean = true;
  /**
* DEFINICION DE VARIABLE PARA HABILITA BOTON BUSCAR CHOFER
*/
  habilitacombotran: boolean = true;
  /**
* DEFINICION DE VARIABLE PARA HABILITA GRID DETALLE DE PEDIDO
*/
  habilitagriddetalle: string = "true|" + Funcion.Ramdon();
  /**
* DEFINICION DE VARIABLE PARA MENEJAR EL INDEX DE LOS TABULADORES
*/
  indextab: number = 0;
  /**
* DEFINICION DE VARIABLE MODELO DE TABULADORES
*/
  tab: TabuladoresModel = new TabuladoresModel();
  /**
* DEFINICION DE VARIABLE QUE ENVIA INFORMACION A MODAL DE MENSAJE
*/
  llamarmodal: string = "";
  /**
* DEFINICION DE VARIABLE CON LA OPCION SELECCIONADA EN EL COMBO DE OPCIONES
*/
  cmbopcion: string = "";
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE OPCIONES
*/
  listopciones: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE PRODUCTO CONTROLADOS
*/
  listcontrol: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
  listcliente: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE TRANSPORTISTA
*/
  listtransportista: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE GRUPO
*/
  listagrupo: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE SUCURSAL
*/
  listsucursal: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE TIPO DE PEDIDO
*/
  listpedido: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE TIPO DE LISTA DE PRECIO
*/
  listprecio: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE VENDEDORES
*/
  listvendedor: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE FORMA DE PAGO
*/
  listformapago: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE DIRECCION DE ENVIO
*/
  listenvio: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE ESTADO
*/
  listEstado: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE TIPO DE DOCUMENTO
*/
  listtipodoc: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE NIVEL DE APOBACION
*/
  listoDatoNivel: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE TIPO DE IDENTIFICACION
*/
  listtipoident: any[] = [];
  /**
 * DEFINICION DE VARIABLE DE RUTA LA CUAL NOS PERMITA REDIRECCIONAR A OTRA PAGINA
 */
  router: Router;
  /**
* DEFINICION DE VARIABLE DE MODAL BOTONES DE LA BARRA SUPERIOR
*/
  botones: BotonesModel = new BotonesModel();
  /**
* DEFINICION DE VARIABLE QUE MANEJA EL OBJETO DE NOTIFICACIONES
*/
  notifier: any;
  /**
* DEFINICION DE VARIABLE QUE MUESTRA UN MESAJE INFORMATIVO DE LOS PRODUCTOR CONTROLADOS
*/
  pedPend: string = "";
  /**
* DEFINICION DE VARIABLE QUE CONFIGURA COMBO DE GRUPO
*/
  options: Options | any;
  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private spinner: NgxSpinnerService,_router: Router, private modalService: BsModalService, private fb: FormBuilder, private funcionesService: FuncionesService, private mantenimientoService: MantenimientoService, private ventasService: VentasService, private injector: Injector) {
    this.router = _router;
    if (!Funcion.ValidadAutorizado()) {
      this.router.navigate(['/']);
    } else {
      if (!Funcion.ValidadPagina('Ingreso de Pedidos')) {
        this.router.navigate(['/principal/default'], {
          skipLocationChange: true,
        });
      }
    }
    sessionStorage.setItem("variablecontrol", "S");
    this.listopciones = Funcion.Opciones();
    this.cmbopcion = "0";
    this.notifier = this.injector.get(ServiceMensaje);

    this.encerafrom();
    this.limpiabotones(1)
    this.cargarImpuesto();

  }
  /**
* DEFINICION DE FUNCION INIT DE LA CLASE
*/
  ngOnInit() {
    sessionStorage.setItem("variablecontrol", "S");
    this.options = {
      multiple: false,
      closeOnSelect: true,
      width: '100%'
    };
  }

  /**
* DEFINICION DE FUNCION PARA HABILTAR Y DESAHABILITRA CONTROLES DE PANTALLA
*/
  habilitarfrom(val: Number) {
    switch (val) {
      case 1:
        this.habilitacombotab1 = false;
        this.habilitaobjetofrom = false;
        this.habilitacombosucur = false;
        this.habilitabuscar = true;
        this.indextab = 2;
        break;
      case 2:
        this.habilitacombotab1 = true;
        this.habilitaobjetofrom = true;
        this.habilitacombosucur = true;
        this.habilitabuscar = false;
        this.indextab = 2;
        break;
      case 3:
        this.habilitacombotab1 = true;
        this.habilitaobjetofrom = true;
        this.habilitacombosucur = true;
        this.habilitabuscar = true;
        this.indextab = 2;
        break;
    }
  }
  /**
* DEFINICION DE FUNCION PARA SETEAR INFORMACION EN OBJETO DE FROM 
*/
  async setdatosfrom(dato: any) {
    this.clienteseleccionado = dato;
    if (this.clienteseleccionado.clcupo === "" || this.clienteseleccionado.clcupo === null)
      this.clienteseleccionado.clcupo = "0.00";
    this.clienteinfo = "CLIENTE :" + dato.clcodigo + " - " + dato.clnombre;
    this.iDocumento.clcodigo = dato.clcodigo;
    this.iDocumento.clnombre = dato.clnombre;
    this.cargarEnvio("");
    this.cargaCarteraCliente();
    this.pedPend = "Estarán disponibles solo los productos controlados con certificado y credencial vigente del cliente...";
    this.nuevalinea = [];
    this.iDocumento.iCliExento = dato.clexento;
    this.iDocumento.ciacodigo = globales.cia;
    if (this.isAccion === "I") {
      this.iDocumento.lpcodigo = dato.lpcodigo;
      this.iDocumento.vecodigo = dato.vecodigo;
      this.iDocumento.provcodigo = dato.provcodigo;
      this.iDocumento.cancodigo = dato.cancodigo;
      this.iDocumento.parrocodigo = dato.parrocodigo;
      this.iDocumento.paurcodigo = dato.paurcodigo;
      this.iDocumento.capfechasistema = moment(await this.funcionesService.fechaservidor()).format("YYYY-MM-DD").toString();
      if (dato.fpcodigo != null) {
        this.nuevalinea.push({
          fpago: dato.fpcodigo,
          pago: 0,
          vencimiento: this.iDocumento.capfechadoc,
          porcPrecio: 0
        });
      } else if (dato.fpcodigo2 != null) {
        this.nuevalinea.push({
          fpago: dato.fpcodigo2,
          pago: 0,
          vencimiento: this.iDocumento.capfechadoc,
          porcPrecio: 0
        });
      } else if (dato.fpcodigo3 != null) {
        this.nuevalinea.push({
          fpago: dato.fpcodigo3,
          pago: 0,
          vencimiento: this.iDocumento.capfechadoc,
          porcPrecio: 0
        });
      } else {
        this.notifier.showError("El cliente no tiene configurado una forma de pago. Favor comunicarse con el departamente de cobranzas...");
      }
    } else {
      this.iDocumento.capfecultmodif = moment(await this.funcionesService.fechaservidor()).format("YYYY-MM-DD").toString();
    }
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION EN GRID DE HISTORICO
*/
  cargaHistorico(item: string) {
    this.spinner.show();
    this.ventasService.histoPedCliente(globales.cia, this.clienteseleccionado.clcodigo, this.fechainicial + '|' + this.fechafinal, item).subscribe(data => {
      try {
        this.detgridhistorico = data;
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION EN CARTERA DE CLIENTE
*/
  cargaCarteraCliente() {
    this.spinner.show();
    this.ventasService.infoCarPedCliente(globales.cia, this.clienteseleccionado.clcodigo, this.fechafinal).subscribe(data => {
      try {
        this.detgridcliente = data;
        this.validaCartera();
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });

  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION EN DIRECCION DE ENVIO
*/
  cargarEnvio(dato: string) {
    this.spinner.show();
    this.mantenimientoService.getClientesDir(globales.cia, this.clienteseleccionado.clcodigo).subscribe(data => {
      try {
        this.listenvio = data;
        this.iDocumento.datospedEntrega.vdpedireccionenvio = dato;
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE FORMA DE PAGO
*/
  cargarFormaPago() {
    this.spinner.show();
    this.mantenimientoService.getFormasPago(this.usoModulo).subscribe(data => {
      try {
        this.listformapago = data;
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE IMPUESTO
*/
  cargarImpuesto() {
    this.spinner.show();
    this.mantenimientoService.getImpuesto(globales.cia).subscribe(data => {
      try {
        this.listaimpuestotmp = [
          {
            imcodigo: '',
            imnombre: '',
            ciacodigo: '',
            imcodelectsri: null,
            imcodimpsri: '',
            imporc: 0,
            imtipovalporc: '',
            imvalor: 0,
            imvigente: ''
          }
        ];
        data.forEach((key: any) => {
          this.listaimpuestotmp.push({
            imcodigo: key.imcodigo,
            imnombre: key.imnombre,
            ciacodigo: key.ciacodigo,
            imcodelectsri: key.imcodelectsri,
            imcodimpsri: key.imcodimpsri,
            imporc: key.imporc,
            imtipovalporc: key.imtipovalporc,
            imvalor: key.imvalor,
            imvigente: key.imvigente
          });
        });
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
  cargarClienteseleccionado(codcliente: string) {
    this.spinner.show();
    this.mantenimientoService.getClienteseleccionado(globales.cia, codcliente).subscribe(async data => {
      try {
        if (data != null) {
          this.hideModal()
          this.limpiatab(2);
          this.indextab = 2;
          this.setdatosfrom(data);
          await this.cargaItem(false);
        } else {
          this.buscar();
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
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE CLIENTE SELECCIONADO POR CONSULTA DE ORDEN DE VENTA
*/
  cargarClienteseleccionadoConsulta(codcliente: string) {
    this.spinner.show();
    this.mantenimientoService.getClienteseleccionado(globales.cia, codcliente).subscribe(async data => {
      try {
        if (data != null) {
          this.hideModal()
          this.indextab = 2;
          this.setdatosfromconsulta(data);
        } else {
          this.buscar();
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
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE LISTADO DE CLIENTE
*/
  cargarCliente() {
    this.spinner.show();
    this.mantenimientoService.getCliente(globales.cia, Funcion.ReturnUsuario().us_codigo).subscribe(data => {
      try {
        this.listcliente = data;
        this.openModal(this.modalbusquedacliente, "");
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA MODAL DE PRODUCTO CONTROLADO
*/
  cargarProductoControl() {
    this.prodControl = "true|" + Funcion.Ramdon();
  }
  /**
* DEFINICION DE FUNCION PARA CARGA MODAL DE BUSQUEDA DE TRANSPORTISTA
*/
  cargarTransportista() {
    this.spinner.show();
    this.mantenimientoService.getTransporteProd(globales.cia, "P").subscribe(data => {
      try {
        this.listtransportista = data;
        this.openModal(this.modalbusquedatransportista, "");
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA LISTADO DE SUCURSALES
*/
  cargarSucursal() {
    this.spinner.show();
    this.mantenimientoService.getSucursalesVtasInv(globales.cia, Funcion.ReturnUsuario().us_codigo).subscribe(data => {
      try {
        this.listsucursal = data;
        this.iDocumento.sucodigo = globales.sucursalPrin;
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA LISTADO DE TIPO DOCUMENTO
*/
  cargarTipoDoc() {
    this.spinner.show();
    this.mantenimientoService.getTipodocVen(globales.cia, this.iDocumento.sucodigo, "D").subscribe(data => {
      try {
        this.listtipodoc = data;
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE TIPO DOCUMENTO SELECCIONADO
*/
  cargarTipoDocselect() {
    this.spinner.show();
    this.mantenimientoService.getTipodocVen(globales.cia, this.iDocumento.sucodigo, "D").subscribe(data => {
      try {
        this.listtipodoc = data;
        this.cargarGetSucursalselect(this.iDocumento.sucodigo);
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    })
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE TIPO DOCUMENTO SELECCIONADO 2
*/
  cargarTipoDocselect2() {
    this.spinner.show();
    this.mantenimientoService.getTipodocVen(globales.cia, this.iDocumento.sucodigo, "D").subscribe(data => {
      try {
        this.listtipodoc = data;
        this.cargarGetSucursalselect2(this.iDocumento.sucodigo);
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    })
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE TIPO DOCUMENTO SELECCIONADO CUANDO SE SELECCIONA UNA SUCURSAL
*/
  selecttipoSucursal() {
    this.cargarTipoDocselect();
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE TIPO PEDIDO DE VENTA
*/
  cargarTipoPedido() {
    this.spinner.show();
    this.mantenimientoService.getTipoPedido().subscribe(data => {
      try {
        this.listpedido = data;
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE GRUPO
*/
  cargarGrupo() {
    this.spinner.show();
    this.mantenimientoService.getGrupos(globales.cia).subscribe(data => {
      try {
        this.listagrupo = [
          {
            id: '',
            text: ''
          }
        ];
        data.forEach((key: any) => {
          this.listagrupo.push({
            ciacodigo: key.ciacodigo,
            id: key.grcodigo,
            text: key.grnombre,
            grnombreabreviado: key.grnombreabreviado,
            grprodcontrolado: key.grprodcontrolado
          });
        });
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE LISTA DE PRECIO
*/
  cargarListaPrecio() {
    this.spinner.show();
    this.mantenimientoService.getListasPrecios(globales.cia).subscribe(data => {
      try {
        data.forEach((key: any) => {
          this.listprecio.push({
            lpcodigo: key.lpcodigo,
            lpnombre: key.lpnombre
          });
        });
        this.iDocumento.lpcodigo = data[0].lpcodigo;
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE VENDEDORES
*/
  cargarListaVendedor() {
    this.spinner.show();
    this.mantenimientoService.getVendedor(globales.cia).subscribe(data => {
      try {
        data.forEach((key: any) => {
          this.listvendedor.push({
            vecodigo: key.vecodigo,
            venombre: key.venombre
          });
        });
        this.iDocumento.vecodigo = data[0].vecodigo;
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA LIMPIAR MODELO DE OBJETO DE TAB 
*/
  limpiatab(_dato: number) {
    switch (_dato) {
      case 1:
        this.tab.tab1 = false;
        this.tab.tab2 = true;
        this.tab.tab3 = false;
        this.tab.tab4 = false;
        this.tab.tab5 = false;
        this.tab.tab6 = true;
        this.tab.tab7 = false;
        break;
      case 2:
        this.tab.tab1 = false;
        this.tab.tab2 = false;
        this.tab.tab3 = false;
        this.tab.tab4 = false;
        this.tab.tab5 = false;
        this.tab.tab6 = false;
        this.tab.tab7 = false;
        break;
    }
  }
  /**
* DEFINICION DE FUNCION PARA LIMPIAR LOS SESSION DE BOTONES
*/
  limpiabotones(_dato: Number) {
    switch (_dato) {
      case 1:
        this.botones.btnnuevo = false;
        this.botones.btnmodificar = true;
        this.botones.btngrabar = true
        this.botones.btnanular = true
        this.botones.btneliminar = true;
        this.botones.btncancelar = false;
        this.botones.btnbuscar = false;
        this.botones.btnimprimir = true
        this.botones.btnprocontrolados = true
        this.botones.btnsalir = false;
        break;
      case 2:
        this.botones.btnnuevo = true;
        this.botones.btnmodificar = true;
        this.botones.btngrabar = false
        this.botones.btnanular = true
        this.botones.btneliminar = true;
        this.botones.btncancelar = false;
        this.botones.btnbuscar = true;
        this.botones.btnimprimir = false
        this.botones.btnprocontrolados = false
        this.botones.btnsalir = false;
        break;
      case 3:
        this.botones.btnnuevo = true;
        this.botones.btnmodificar = false;
        this.botones.btngrabar = false
        this.botones.btnanular = false
        this.botones.btneliminar = false;
        this.botones.btncancelar = false;
        this.botones.btnbuscar = false;
        this.botones.btnimprimir = false
        this.botones.btnprocontrolados = false
        this.botones.btnsalir = false;
        break;
      case 4:
        this.botones.btnnuevo = true;
        this.botones.btnmodificar = true;
        this.botones.btngrabar = true
        this.botones.btnanular = true
        this.botones.btneliminar = true;
        this.botones.btncancelar = false;
        this.botones.btnbuscar = true;
        this.botones.btnimprimir = false
        this.botones.btnprocontrolados = false
        this.botones.btnsalir = false;
        break;
    }
  }
  /**
* DEFINICION DE FUNCION PARA VALIDAR CARTERA DE CLIENTE
*/
  validaCartera() {
    let _diasMora = this.detgridcliente.reduce((prev, next) => prev + next.diasMora, 0);
    let _deuda = this.detgridcliente.reduce((prev, next) => prev + next.saldo, 0);
    let _saldototal = this.detgridcliente.reduce((prev, next) => prev + next.saldo, 0);
    this.utilizado = (_deuda < 0) ? "0.00" : _deuda;
    this.saldo = _saldototal;
    this.disponible = (this.clienteseleccionado.clcupo - _deuda).toString();
    this.visiblemora = (_diasMora > 0) ? true : false;
    this.visiblecupo = (parseFloat(this.disponible) <= 0) ? true : false;
  }
  /**
* DEFINICION DE FUNCION PARA LIMPIAR OBJETO DE FROM
*/
  limpiarfrom() {
    this.numerodocumento = 0;
    this.iDocumento = new CabeceraPed();
    var fecha = new Date();
    var formatoFechaReserva = moment(fecha);
    this.funcionesService.getparametron(globales.cia, environment.modVentas, "aprob_ped_automatico").subscribe(data => { this.pedidoautomatico = (data.pavalorchar === "S" ? true : false); }, () => { });
    this.funcionesService.getparametron(globales.cia, environment.modInventario, "anio_en_curso").subscribe(data => { this.pedidoaniocurso = data.pavalornumeric; }, () => { });
    this.funcionesService.getparametron(globales.cia, environment.modVentas, "num_dias_duracion_res").subscribe(data => { this.fechaReserva = formatoFechaReserva.add("day", data.pavalorint).format("YYYY-MM-DD").toString(); }, () => { });
    this.cmbopcion = "0";
    var formatoFecha = moment(fecha);
    this.fechafinal = formatoFecha.format("YYYY-MM-DD").toString();
    formatoFecha.add("day", -365);
    this.fechainicial = formatoFecha.format("YYYY-MM-DD").toString();
    this.clienteinfo = "";
    this.limpiatab(1);
    this.indextab = 0;
    this.clienteseleccionado = {};
    this.clienteseleccionado.clcupo = "0.00";
    this.utilizado = "0.00"
    this.disponible = "0.00"
    this.saldo = "0.00"
    this.visiblemora = false;
    this.visiblecupo = false;
    this.pedPend = "";
    this.detgridcliente = [];
    this.detgridhistorico = [];
    try {
      this.iDocumento.captipo = this.lSucursal.configSucvta.csvtipdocpe;
    } catch (e) {
    }
    this.iDocumento.clcodigo = "";
    this.iDocumento.clnombre = "";
    this.iDocumento.capfechadoc = globales.fechaModuVta;
    this.iDocumento.capestado = "A";
    this.iDocumento.capnumero = 0;
    this.iDocumento.capaprobadovta = "N";
    this.iDocumento.capaprobadopc = "N";
    this.iDocumento.capaprobadopfa = "N";
    this.iDocumento.capaprobadocre = "N";
    this.iDocumento.aproreserva = "N";
    this.iDocumento.cappedreservado = "N";
    this.iDocumento.capretiramercaderia = "N";
    this.iDocumento.sucodigo = globales.sucursalPrin;
    try {
      if (this.lSucursal.configSucvta.csvtipdocpe == null) {
        this.iDocumento.captipo = this.listpedido[0].vw_tipo_ped;
      } else {
        this.iDocumento.captipo = this.listpedido[0].vw_tipo_ped;
      }
    } catch (e) {
    }
    this.cargarTipoDoc();
    this.iDocumento.bdgTransportista.btrtipoid = "C";
    this.habilitagriddetalle = "true|" + Funcion.Ramdon();
    let lTipoDoc = this.iDocumento.tvcodigo;
    var datafiltro = this.listtipodoc.filter(function (data2) {
      return data2.tvcodigo === lTipoDoc
    });
    let _imp = "";
    datafiltro.forEach((key: any) => {
      _imp = ((key.imcodigo === null) ? "" : key.imcodigo);
      _imp = _imp + '|' + ((key.imcodigo2 === null) ? "" : key.imcodigo2);
      _imp = _imp + '|' + ((key.imcodigo3 === null) ? "" : key.imcodigo3);
    });
    this.impuestos = _imp;
    this.habilitaformapago = true;
  }
  /**
* DEFINICION DE FUNCION OPCION DE BOTON DE CANCELAR
*/
  cancelarBoton() {
    this.limpiagrid = "true|" + Funcion.Ramdon();
    this.limpiagridfomapago = Funcion.Ramdon().toString();
    this.limpiatotales = Funcion.Ramdon().toString();
    this.limpiabotones(1);
    this.habilitarfrom(3);
    this.limpiarfrom();
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION ENVASE A LA SUCURSAL SELECCIONA 2
*/
  cargarGetSucursalselect2(codsuc: string) {
    this.spinner.show();
    this.mantenimientoService.getSucursales(globales.cia, codsuc).subscribe(data => {
      try {
        try {
          this.lSucursal = data;
          this.iDocumento.captipo = this.lSucursal.configSucvta.csvtipdocpe;
          if (this.lSucursal.configSucvta.csvtipdocpe == null) {
            this.iDocumento.captipo = this.listpedido[0].vw_tipo_ped;
          } else {
            this.iDocumento.captipo = this.lSucursal.configSucvta.csvtipdocpe
          }
        } catch (e) {
        }
        let lTipoDoc = (this.lSucursal.suelectronico == "S") ? this.lSucursal.configSucvta.csvtipdocvene : this.lSucursal.configSucvta.csvtipdocven;
        this.iDocumento.tvcodigo = lTipoDoc;
        var datafiltro = this.listtipodoc.filter(function (data2) {
          return data2.tvcodigo === lTipoDoc
        });
        let _imp = "";
        datafiltro.forEach((key: any) => {
          _imp = ((key.imcodigo === null) ? "" : key.imcodigo);
          _imp = _imp + '|' + ((key.imcodigo2 === null) ? "" : key.imcodigo2);
          _imp = _imp + '|' + ((key.imcodigo3 === null) ? "" : key.imcodigo3);
        });
        this.impuestos = _imp;
        if (this.isAccion === "I") {
          this.numerodocumento = parseInt(this.lSucursal.configSucvta.csvfolioped) + 1;
          this.lSucursal.configSucvta.csvfolioped = parseInt(this.lSucursal.configSucvta.csvfolioped) + 1;
        }
        this.spinner.hide();
        this.cargaItemcm();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION ENVASE A LA SUCURSAL SELECCIONA 
*/
  cargarGetSucursalselect(codsuc: string) {
    this.spinner.show();
    this.mantenimientoService.getSucursales(globales.cia, codsuc).subscribe(data => {
      try {
        try {
          this.lSucursal = data;
          this.iDocumento.captipo = this.lSucursal.configSucvta.csvtipdocpe;
          if (this.lSucursal.configSucvta.csvtipdocpe == null) {
            this.iDocumento.captipo = this.listpedido[0].vw_tipo_ped;
          } else {
            this.iDocumento.captipo = this.lSucursal.configSucvta.csvtipdocpe
          }
        } catch (e) {
        }
        let lTipoDoc = (this.lSucursal.suelectronico == "S") ? this.lSucursal.configSucvta.csvtipdocvene : this.lSucursal.configSucvta.csvtipdocven;
        this.iDocumento.tvcodigo = lTipoDoc;
        var datafiltro = this.listtipodoc.filter(function (data2) {
          return data2.tvcodigo === lTipoDoc
        });
        let _imp = "";
        datafiltro.forEach((key: any) => {
          _imp = ((key.imcodigo === null) ? "" : key.imcodigo);
          _imp = _imp + '|' + ((key.imcodigo2 === null) ? "" : key.imcodigo2);
          _imp = _imp + '|' + ((key.imcodigo3 === null) ? "" : key.imcodigo3);
        });
        this.impuestos = _imp;
        if (this.isAccion === "I") {
          this.numerodocumento = parseInt(this.lSucursal.configSucvta.csvfolioped) + 1;
          this.lSucursal.configSucvta.csvfolioped = parseInt(this.lSucursal.configSucvta.csvfolioped) + 1;
        }
        this.spinner.hide();
        this.cargaItem(false);
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE SUCURSALES
*/
  cargarGetSucursal(codsuc: string) {
    this.spinner.show();
    this.mantenimientoService.getSucursales(globales.cia, codsuc).subscribe(data => {
      try {
        try {
          this.lSucursal = data;
          this.iDocumento.captipo = this.lSucursal.configSucvta.csvtipdocpe;
          if (this.lSucursal.configSucvta.csvtipdocpe == null) {
            this.iDocumento.captipo = this.listpedido[0].vw_tipo_ped;
          } else {
            this.iDocumento.captipo = this.lSucursal.configSucvta.csvtipdocpe
          }
        } catch (e) {
        }
        let lTipoDoc = (this.lSucursal.suelectronico == "S") ? this.lSucursal.configSucvta.csvtipdocvene : this.lSucursal.configSucvta.csvtipdocven;
        this.iDocumento.tvcodigo = lTipoDoc;
        var datafiltro = this.listtipodoc.filter(function (data2) {
          return data2.tvcodigo === lTipoDoc
        });
        let _imp = "";
        datafiltro.forEach((key: any) => {
          _imp = ((key.imcodigo === null) ? "" : key.imcodigo);
          _imp = _imp + '|' + ((key.imcodigo2 === null) ? "" : key.imcodigo2);
          _imp = _imp + '|' + ((key.imcodigo3 === null) ? "" : key.imcodigo3);
        });

        this.impuestos = _imp;
        if (this.isAccion === "I") {
          this.numerodocumento = parseInt(this.lSucursal.configSucvta.csvfolioped) + 1;
          this.lSucursal.configSucvta.csvfolioped = parseInt(this.lSucursal.configSucvta.csvfolioped) + 1;
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
* DEFINICION DE FUNCION PARA ENCERAR FORMULARIO
*/
  encerafrom() {
    this.cargarGrupo();
    this.cargarTipoPedido();
    this.cargarSucursal();
    this.cargarListaPrecio();
    this.cargarListaVendedor();
    this.cargarFormaPago();
    this.cargarGetSucursal(globales.sucursalPrin);
    this.habilitarfrom(3);
    this.limpiarfrom();
    this.listEstado = Funcion.Estado();
    this.listoDatoNivel = Funcion.DatosCombo();
    this.listtipoident = Funcion.DatosComboIdenti();

  }
  /**
* DEFINICION DE FUNCION DE SELECCION DE OPCIONES DE PANEL
*/
  selectopcionpanel() {
    switch (this.cmbopcion) {
      case "I":
        this.isAccion = "I";
        this.limpiabotones(2);
        this.habilitarfrom(1)
        this.buscar();
        break;
      case "M":
        this.isAccion = "M";
        this.limpiabotones(3);
        this.habilitarfrom(2)
        break;
      case "C":
        this.isAccion = "C";
        this.limpiabotones(4);
        this.habilitarfrom(2)
        break;
    }
  }
  /**
* DEFINICION DE FUNCION PARA VALIDACIONES VARIA DE LA ORDEN DE PEDIDO ANTES DE GRABAR
*/
  validadFrom() {
    var objTotales: TotalModel = new TotalModel();
    this.lMensaje = "";
    this.iDocumento.detallePed.forEach((d: any) => {
      d.depcantped = d.depcantmedalter * d.depfactor;
      d.depprecio = d.deppreciomedalter / d.depfactor;
      d.total = d.depcantmedalter * d.deppreciomedalter;
      if (d.depiva) {
        d.depivalin = ((d.depcantmedalter * d.deppreciomedalter) * d.depporiva) / 100;
      }
      else {
        d.depivalin = 0;
      }
      objTotales.poriva1 = d.depporiva;
      objTotales.subtotal = ((objTotales.subtotal === "") ? 0 : parseFloat(objTotales.subtotal)) + d.total;
      if (d.depiva) {
        var _dtos = this.listaimpuestotmp.filter(function (data2) {
          return data2.imporc === d.depporiva;
        });
        _dtos.forEach((key: any) => {
          objTotales.opcionimp1 = key.imcodigo;
        });
        objTotales.iva1 = (((objTotales.iva1 === "") ? 0 : parseFloat(objTotales.iva1)) + d.depivalin).toFixed(4);
        objTotales.subtotaliva = ((objTotales.subtotaliva === "") ? 0 : parseFloat(objTotales.subtotaliva)) + d.total;
      } else {
        objTotales.iva1 = (((objTotales.iva1 === "") ? 0 : parseFloat(objTotales.iva1)) + 0).toFixed(4);
        objTotales.subtotalexento = ((objTotales.subtotalexento === "") ? 0 : parseFloat(objTotales.subtotalexento)) + d.total;
      }
    });
    objTotales.total = (parseFloat(objTotales.total) + parseFloat(objTotales.subtotaliva) + parseFloat(objTotales.subtotalexento) + parseFloat(objTotales.iva1)).toFixed(4);
    this.valorTotalModelo(objTotales);
    if (this.iDocumento.captipo === "") {
      this.lMensaje = "Debe seleccionar un tipo de pedido...";
      return false;
    } else if (this.pedidoaniocurso != this.iDocumento.capfechadoc.substring(0, 4)) {
      this.lMensaje = "No puede ingresar pedidos que no pertenecen al año de proceso...";
      return false;
    } else if (this.iDocumento.clcodigo === "" || this.iDocumento.clcodigo === null) {
      this.lMensaje = "Debe seleccionar un cliente para el pedido...";
      return false;
    } else if (this.iDocumento.detpedFpago.length <= 0) {
      this.lMensaje = "Debe ingresar al menos una forma de pago... Favor Verifique...";
      return false;
    } else if (parseFloat(objTotales.total).toFixed(2) != this.iDocumento.detpedFpago.reduce((prev, next) => prev + next.dpftotalapagar, 0).toFixed(2)) {
      this.lMensaje = "La suma de los valores de las formas de pago debe ser igual al total del documento... Favor Verifique...";
      return false;
    } else if (this.iDocumento.detallePed.length <= 0) {
      this.lMensaje = "Debe ingresar al menos un ítem para el pedido...";
      return false;
    } else if (this.iDocumento.datospedEntrega.vdpedireccionenvio === "") {
      this.lMensaje = "Debe seleccionar el lugar de envío del cliente...";
      return false;
    }
    if (this.iDocumento.relpedProductoc.length > 0) {
      if (this.iDocumento.cappersonasautori === "") {
        this.lMensaje = "El pedido tiene productos controlados, debe ingresar las personas autorizadas en datos adicionales... Favor Verifique...";
        return false;
      } else if (this.iDocumento.datospedEntrega.vdpedireccionenvio != null) {
        if (!this.iDocumento.datospedEntrega.vdpedireccionenvio.includes("STD -")) {
          if (!this.iDocumento.datospedEntrega.vdpedireccionenvio.includes("STD-")) {
            if (!this.iDocumento.datospedEntrega.vdpedireccionenvio.includes("STD.")) {
              if (!this.iDocumento.datospedEntrega.vdpedireccionenvio.includes("STD ")) {
                this.lMensaje = "El pedido tiene productos controlados, debe seleccionar un lugar de envío diferente... Favor Verifique...";
                return false;
              }
            }
          }
        }
      }

    }
    if (this.iDocumento.capretiramercaderia === "S") {
      if (this.iDocumento.bdgTransportista.btrructrans === "") {
        this.lMensaje = "Indicó que el pedido es retiro personal, pero no inidicó la identificación de la persona que va a retirar el producto... Favor Verifique...";
        return false;
      } else if (!Funcion.ValidaCed(this.iDocumento.bdgTransportista.btrructrans, this.iDocumento.bdgTransportista.btrtipoid)) {
        this.lMensaje = "Indicó que el pedido es retiro personal, pero ocurrió el siguiente error con la identificación ingresada: ";
        return false;
      } else if (this.iDocumento.bdgTransportista.btrnomtrans === "") {
        this.lMensaje = "Indicó que el pedido es retiro personal, pero no inidicó el nombre de la persona que va a retirar el producto... Favor Verifique...";
        return false;
      } else if (this.iDocumento.bdgTransportista.btrplaca === "") {
        this.lMensaje = "Indicó que el pedido es retiro personal, pero no inidicó la placa del vehículo que va a retirar el producto... Favor Verifique...";
        return false;
      }
    }
    if (this.iDocumento.cappedreservado === "S") {
      if (this.iDocumento.capreferencia2 === "") {
        this.lMensaje = "Debe ingresar la orden de compra para el pedido reservado... Favor Verifique...";
        return false;
      }
    }

    if (this.iDocumento.detallePed.length > 0) {
      for (var i = 0; i < this.iDocumento.detallePed.length; i++) {
        if (this.iDocumento.detallePed[i].itcodigo === "") {
          this.lMensaje = "No ha seleccionado un ítem en el detalle... Favor Verifique...";
          return false;
          break;
        } else if (parseFloat(this.iDocumento.detallePed[i].depcantmedalter.toString()).toFixed(4) === parseFloat("0").toFixed(4)) {
          this.lMensaje = "No ha ingresado la cantidad en el detalle para el ítem " + this.iDocumento.detallePed[i].itcodigo + "... Favor Verifique...";
          return false;
          break;
        } else if (parseFloat(this.iDocumento.detallePed[i].deppreciomedalter.toString()).toFixed(4) === parseFloat("0").toFixed(4) && this.iDocumento.detallePed[i].itpermitepreciocerovta === "N") {
          this.lMensaje = "No ha ingresado el precio en el detalle para el ítem " + this.iDocumento.detallePed[i].itcodigo + "... Favor Verifique...";
          return false;
          break;
        }
      }
    }
    if (this.validaProductoControl()) {
      return false;
    }
    return true;
  }
  /**
* DEFINICION DE FUNCION PARA VALIDACIONES DE PRODUCTO CONTROLADOS
*/
  validaProductoControl(): boolean {
    if (this.iDocumento.detallePed.filter(x => x.prccodigo != "").length > 0 && this.iDocumento.relpedProductoc.length === 0) {
      this.cargarProductoControl();
      return true;
    } else {
      var datafiltro = this.iDocumento.detallePed.filter(function (data2) {
        return data2.prccodigo != "";
      });
      let unique = [...new Set(datafiltro.map(item => item.prccodigo))];
      if (unique.length != this.iDocumento.relpedProductoc.length) {
        this.iDocumento.relpedProductoc = [];
        this.cargarProductoControl();
        return true;
      } else {
        for (var i = 0; i < unique.length; i++) {
          if (parseFloat(this.iDocumento.detallePed.filter(x => x.prccodigo === unique[i]).reduce((prev, next) => prev + next.depcantmedalter, 0).toString()) != parseFloat(this.iDocumento.relpedProductoc.filter(x => x.prccodigo === unique[i]).reduce((prev, next) => prev + next.rppcantidad, 0).toString())) {
            this.iDocumento.relpedProductoc = [];
            this.cargarProductoControl();
            return true;
            break;
          }
        }
      }
    }
    return false;
  }
  /**
* DEFINICION DE FUNCION PARA GUARDAR ORDEN DE VENTA
*/
  guardaringresopedido(datoimp: number) {
    this.iImpresion = datoimp;
    this.isMensajeS = "";
    this.lMensaje = "";
    if (this.validadFrom()) {
      if (this.isAccion === "I") {
        this.iDocumento.capusuario = Funcion.ReturnUsuario().us_codigo;
        this.iDocumento.capnumero = this.numerodocumento;
      } else if (this.isAccion == "M") {
        this.iDocumento.capusuarioultmodif = Funcion.ReturnUsuario().us_codigo;
      }
      this.iDocumento.datospedEntrega.ciacodigo = this.iDocumento.ciacodigo;
      this.iDocumento.datospedEntrega.captipo = this.iDocumento.captipo;
      this.iDocumento.datospedEntrega.capnumero = this.iDocumento.capnumero;
      this.iDocumento.capfechavencres = this.iDocumento.cappedreservado == "S" ? this.fechaReserva : null;
      if (this.iDocumento.capretiramercaderia === "S") {
        this.iDocumento.bdgTransportista.ciacodigo = this.iDocumento.ciacodigo;
        this.iDocumento.bdgTransportista.captipo = this.iDocumento.captipo;
        this.iDocumento.bdgTransportista.capnumero = this.iDocumento.capnumero;
        this.iDocumento.bdgTransportista.btrtipotrans = "P";
        this.iDocumento.bdgTransportista.sucodigo = null;
        this.iDocumento.bdgTransportista.vqplaca = null;
        if (this.selectnuevocreado === "N") {
          this.iDocumento.bdgTransportista.transporteProd.ciacodigo = this.iDocumento.ciacodigo;
          this.iDocumento.bdgTransportista.transporteProd.trtipotrans = "P";
          this.iDocumento.bdgTransportista.transporteProd.trruc = this.iDocumento.bdgTransportista.btrructrans;
          this.iDocumento.bdgTransportista.transporteProd.tidcodigo = this.iDocumento.bdgTransportista.btrtipoid;
          this.iDocumento.bdgTransportista.transporteProd.trnombre = this.iDocumento.bdgTransportista.btrnomtrans;
        }
        else {
          this.iDocumento.bdgTransportista.transporteProd = new TransporteProd();
        }
      } else {
        this.iDocumento.bdgTransportista = new BdgTransportista();
      }
      this.iDocumento.detallePed.forEach((key: any) => {
        key.ciacodigo = this.iDocumento.ciacodigo;
        key.captipo = this.iDocumento.captipo;
        key.capnumero = this.iDocumento.capnumero;
        key.depiva = (key.depiva) ? 'S' : 'N';
      });
      this.iDocumento.relpedProductoc.forEach((key: any) => {
        key.ciacodigo = this.iDocumento.ciacodigo;
        key.captipo = this.iDocumento.captipo;
        key.capnumero = this.iDocumento.capnumero;
      });
      this.iDocumento.detpedFpago.forEach((key: any) => {
        key.ciacodigo = this.iDocumento.ciacodigo;
        key.captipo = this.iDocumento.captipo;
        key.capnumero = this.iDocumento.capnumero;
      });
      if (this.iDocumento.cappedreservado === "N") {
        this.lMensaje = this.generaWorkFlow();
      }
      else {
        this.lMensaje = "Su pedido reservado vence el " + this.iDocumento.capfechavencres + ", favor tomar en cuenta esta fecha.";
      }
      if (this.isAccion === "I") {
        this.spinner.show();
        this.ventasService.insertDocumentosPed(Funcion.Complemento(), Funcion.Auditoria() + environment.modVentas + ",010000032", this.iDocumento, this.lSucursal).subscribe(data => {
          try {
            this.isMensajeS = data;
            if (this.isAccion == "I") {
              this.isMensajeS = this.isMensajeS + "<br />Se generó el documento " + this.iDocumento.captipo + " No. " + this.iDocumento.capnumero;
            }
            this.isMensajeS = this.isMensajeS + "<br />" + this.lMensaje;
            this.llamarmodal = "3|Ingreso de Pedidos de Ventas|" + this.isMensajeS + "|" + Funcion.Ramdon().toString();
            this.spinner.hide();
          } catch (e) {
            this.spinner.hide();
          }
        }, err => {
          let valoemodal = err.error.Message.toString().split('|')[0];
          if (valoemodal === "-1") {
            this.llamarmodal = "2|Ingreso de Pedidos de Ventas|" + err.error.Message.toString().split('|')[1] + "|" + Funcion.Ramdon().toString();
          } else {
            this.llamarmodal = "1|Ingreso de Pedidos de Ventas|" + err.error.Message.toString().split('|')[1] + "|" + Funcion.Ramdon().toString();
          }
          this.spinner.hide();
        });

      } else {
        this.spinner.show();
        this.ventasService.updateDocumentosPed(Funcion.Complemento(), Funcion.Auditoria() + environment.modVentas + ",010000034", this.iDocumento).subscribe(data => {
          try {
            this.isMensajeS = data;
            this.isMensajeS = this.isMensajeS + "<br />" + this.lMensaje;
            this.llamarmodal = "3|Ingreso de Pedidos de Ventas|" + this.isMensajeS + "|" + Funcion.Ramdon().toString();
            this.spinner.hide();
          } catch (e) {
            this.spinner.hide();
          }
        }, err => {
          let valoemodal = err.error.Message.toString().split('|')[0];
          if (valoemodal === "-1") {
            this.llamarmodal = "2|Ingreso de Pedidos de Ventas|" + err.error.Message.toString().split('|')[1] + "|" + Funcion.Ramdon().toString();
          } else {
            this.llamarmodal = "1|Ingreso de Pedidos de Ventas|" + err.error.Message.toString().split('|')[1] + "|" + Funcion.Ramdon().toString();
          }
          this.spinner.hide();
        });
      }
    } else {
      if (this.lMensaje != "") {
        this.llamarmodal = "1|Ingreso de Pedidos de Ventas|" + this.lMensaje + "|" + Funcion.Ramdon().toString();
      }
    }
  }
  /**
* DEFINICION DE FUNCION PARA GENERAR WORKFLOW DE FLUJO DE APORBACION
*/
  generaWorkFlow() {
    let lAprueba = true;
    let lMensaje = "";
    var wFA: WorkflowAprobped = new WorkflowAprobped();
    this.iDocumento.workflowAprobped = [];
    if (this.pedidoautomatico) {
      //Aprobacion de ventas
      wFA = new WorkflowAprobped();
      wFA.ciacodigo = this.iDocumento.ciacodigo;
      wFA.captipo = this.iDocumento.captipo;
      wFA.capnumero = this.iDocumento.capnumero;
      wFA.vwatarea = "APROBACIÓN DE VENTAS";
      wFA.vwaorden = 1;
      for (var i = 0; i < this.iDocumento.detallePed.length; i++) {
        if (this.iDocumento.detallePed[i].deppreciomedalter < this.iDocumento.detallePed[i].deppreclista) {
          lAprueba = false;
          break;
        }
      }
      if (lAprueba) {
        wFA.vwaaprobado = "S";
        this.iDocumento.capaprobadovta = "S";
        this.iDocumento.capfecaprobacionvta = this.iDocumento.capfechasistema;
        this.iDocumento.capusuarioaprobacionvta = Funcion.ReturnUsuario().us_codigo;
      }
      else {
        wFA.vwaaprobado = "N";
      }
      this.iDocumento.workflowAprobped.push(wFA);
      //Aprobacion de Productos Controlados
      if (this.iDocumento.relpedProductoc.length > 0) {
        wFA = new WorkflowAprobped();
        wFA.ciacodigo = this.iDocumento.ciacodigo;
        wFA.captipo = this.iDocumento.captipo;
        wFA.capnumero = this.iDocumento.capnumero;
        wFA.vwatarea = "APROBACIÓN DE PRODUCTO CONTROLADOS";
        wFA.vwaorden = 2;
        wFA.vwaaprobado = "N";
        this.iDocumento.workflowAprobped.push(wFA);
      }
      //Aprobacion de Productos Controlados FFAA
      if (this.iDocumento.detallePed.filter(x => x.pfacodigo != "").length > 0) {
        wFA = new WorkflowAprobped();
        wFA.ciacodigo = this.iDocumento.ciacodigo;
        wFA.captipo = this.iDocumento.captipo;
        wFA.capnumero = this.iDocumento.capnumero;
        wFA.vwatarea = "APROBACIÓN DE PRODUCTO CONTROLADOS FFAA";
        wFA.vwaorden = 3;
        wFA.vwaaprobado = "N";
        this.iDocumento.workflowAprobped.push(wFA);
      }
      //Aprobacion de Crédito
      wFA = new WorkflowAprobped();
      wFA.ciacodigo = this.iDocumento.ciacodigo;
      wFA.captipo = this.iDocumento.captipo;
      wFA.capnumero = this.iDocumento.capnumero;
      wFA.vwatarea = "APROBACIÓN DE CRÉDITO";
      wFA.vwaorden = 4;
      if (this.visiblemora === false && this.visiblecupo === false) {
        wFA.vwaaprobado = "S";
        this.iDocumento.capaprobadocre = "S";
        this.iDocumento.capfechaaprobacioncre = this.iDocumento.capfechasistema;
        this.iDocumento.capusuarioaprobacioncre = Funcion.ReturnUsuario().us_codigo;
      }
      else {
        wFA.vwaaprobado = "N";
      }
      this.iDocumento.workflowAprobped.push(wFA);

    } else {
      //Aprobacion de ventas
      wFA = new WorkflowAprobped();
      wFA.ciacodigo = this.iDocumento.ciacodigo;
      wFA.captipo = this.iDocumento.captipo;
      wFA.capnumero = this.iDocumento.capnumero;
      wFA.vwatarea = "APROBACIÓN DE VENTAS";
      wFA.vwaorden = 1;
      wFA.vwaaprobado = "N";
      this.iDocumento.workflowAprobped.push(wFA);
      //Aprobacion de Productos Controlados
      if (this.iDocumento.relpedProductoc.length > 0) {
        wFA = new WorkflowAprobped();
        wFA.ciacodigo = this.iDocumento.ciacodigo;
        wFA.captipo = this.iDocumento.captipo;
        wFA.capnumero = this.iDocumento.capnumero;
        wFA.vwatarea = "APROBACIÓN DE PRODUCTO CONTROLADOS";
        wFA.vwaorden = 2;
        wFA.vwaaprobado = "N";
        this.iDocumento.workflowAprobped.push(wFA);
      }
      //Aprobacion de Productos Controlados FFAA
      if (this.iDocumento.detallePed.filter(x => x.pfacodigo != "").length > 0) {
        wFA = new WorkflowAprobped();
        wFA.ciacodigo = this.iDocumento.ciacodigo;
        wFA.captipo = this.iDocumento.captipo;
        wFA.capnumero = this.iDocumento.capnumero;
        wFA.vwatarea = "APROBACIÓN DE PRODUCTO CONTROLADOS FFAA";
        wFA.vwaorden = 3;
        wFA.vwaaprobado = "N";
        this.iDocumento.workflowAprobped.push(wFA);
      }
      //Aprobacion de Crédito
      wFA = new WorkflowAprobped();
      wFA.ciacodigo = this.iDocumento.ciacodigo;
      wFA.captipo = this.iDocumento.captipo;
      wFA.capnumero = this.iDocumento.capnumero;
      wFA.vwatarea = "APROBACIÓN DE CRÉDITO";
      wFA.vwaorden = 4;
      wFA.vwaaprobado = "N";
      this.iDocumento.workflowAprobped.push(wFA);
    }

    if (this.iDocumento.workflowAprobped.filter(x => x.vwaaprobado === "S").length > 0) {
      lMensaje = "El pedido pasó las siguientes aprobaciones :<br />";
      this.iDocumento.workflowAprobped.forEach((key: any) => {
        if (key.vwaaprobado === "S") {
          lMensaje += key.vwatarea + "<br />";
        }
      });
    }
    if (this.iDocumento.workflowAprobped.filter(x => x.vwaaprobado === "N").length > 0) {
      lMensaje = "El pedido no pasó las siguientes aprobaciones :<br />";
      this.iDocumento.workflowAprobped.forEach((key: any) => {
        if (key.vwaaprobado === "N") {
          lMensaje += key.vwatarea + "<br />";
        }
      });
    }
    return lMensaje;
  }
  /**
* DEFINICION DE FUNCION PARA ELIMINAR ORDEN DE VENTA
*/
  deletepedido() {
    this.spinner.show();
    this.ventasService.deleteDocumentosPed(Funcion.Complemento(), Funcion.Auditoria() + environment.modVentas + ",010000035", globales.cia, this.iDocumento.captipo, this.iDocumento.capnumero.toString()).subscribe(data => {
      try {
        this.isMensajeS = data;
        this.llamarmodal = "3|Ingreso de Pedidos de Ventas|" + this.isMensajeS + "|" + Funcion.Ramdon().toString();
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, err => {
      this.llamarmodal = "2|Ingreso de Pedidos de Ventas|" + err.error.Message + "|" + Funcion.Ramdon().toString();
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA ANULAR ORDEN DE VENTA
*/
  anular() {
    this.spinner.show();
    this.iDocumento.capestado = "D";
    this.iDocumento.capusuarioultmodif = Funcion.ReturnUsuario().us_codigo;
    this.ventasService.anulaDocumentosPed(Funcion.Complemento(), Funcion.Auditoria() + environment.modVentas + ",010000034", this.iDocumento).subscribe(data => {
      try {
        this.isMensajeS = data;
        this.llamarmodal = "3|Ingreso de Pedidos de Ventas|" + this.isMensajeS + "|" + Funcion.Ramdon().toString();
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, err => {
      this.llamarmodal = "2|Ingreso de Pedidos de Ventas|" + err.error.Message + "|" + Funcion.Ramdon().toString();
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA BUSCAR ORDEN DE VENTA
*/
  buscarOrden() {
    if (this.iDocumento.capnumero != 0 && this.isAccion != "I") {
      this.consulta();
    }
  }
  /**
* DEFINICION DE FUNCION PARA SETAR INFORMACION DE UNA ORDEN DE VENTA CONSULTADA
*/
  setdatosfromconsulta(dato: any) {
    this.clienteseleccionado = dato;
    if (this.clienteseleccionado.clcupo === "" || this.clienteseleccionado.clcupo === null)
      this.clienteseleccionado.clcupo = "0.00";
    this.clienteinfo = "CLIENTE :" + dato.clcodigo + " - " + dato.clnombre;
    this.iDocumento.clcodigo = dato.clcodigo;
    this.iDocumento.clnombre = dato.clnombre;
    var _dato = (this.iDocumento.datospedEntrega.vdpedireccionenvio != null) ? this.iDocumento.datospedEntrega.vdpedireccionenvio : "";
    this.cargarEnvio(_dato);
    this.cargaCarteraCliente();
    this.pedPend = "Estarán disponibles solo los productos controlados con certificado y credencial vigente del cliente...";
  }
  /**
* DEFINICION DE FUNCION PARA BUSCAR UNA ORDEN DE VENTA CONSULTADA
*/
  consulta() {
    this.spinner.show();
    this.ventasService.getDocumentosPed(Funcion.Complemento(), Funcion.Auditoria() + environment.modVentas + ",010000031", globales.cia, this.iDocumento.captipo, this.iDocumento.capnumero.toString()).subscribe(async data => {
      try {
        var fecha = new Date(data.capfechadoc);
        var formatoFecha = moment(fecha);
        data.capfechadoc = formatoFecha.format("YYYY-MM-DD").toString();
        this.iDocumento = data;
        this.iDocumento.capfecultmodif = moment(await this.funcionesService.fechaservidor()).format("YYYY-MM-DD").toString();
        this.iDocumento.detpedFpago.forEach((key: any) => {
          var fecha = new Date(key.dpffecvenc);
          var formatoFecha = moment(fecha);
          key.dpffecvenc = formatoFecha.format("YYYY-MM-DD").toString();
        });
        if (this.iDocumento.bdgTransportista === null) {
          this.iDocumento.bdgTransportista = new BdgTransportista();
        }
        this.cargarClienteseleccionadoConsulta(this.iDocumento.clcodigo);
        this.cargarTipoDocselect2();
        this.datogridgeneral = this.iDocumento.detallePed;
        this.datogridformapago = this.iDocumento.detpedFpago;
        this.limpiatab(2);
        if (this.isAccion === "M") {
          this.habilitabuscar = true;
          if (!this.validamodificar()) {
            if (this.lMensaje != "") {
              this.llamarmodal = "1|Ingreso de Pedidos de Ventas|" + this.lMensaje + "|" + Funcion.Ramdon().toString();
              this.cargaItemcm();
              this.habilitagriddetalle = "true|" + Funcion.Ramdon();
              this.limpiabotones(4);
            }
          } else {
            this.habilitarfrom(1);
            this.habilitacombotab1 = true;
            this.cargaItem(false);
            this.habilitagriddetalle = "false|" + Funcion.Ramdon();
          }
        } else {
          this.habilitabuscar = true;
        }
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
        this.habilitabuscar = false;
      }
    }, err => {
      this.habilitabuscar = false;
      this.llamarmodal = "2|Ingreso de Pedidos de Ventas|" + err.error.Message + "|" + Funcion.Ramdon().toString();
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA VALIDAR INFORMACION PARA MODIFICAR ORDEN DE VENTA
*/
  validamodificar() {
    if (this.iDocumento.capestado == "D") {
      this.lMensaje = "El documento que desea modificar está desactivo, no podrá modificarlo...";
      return false;
    } else if (this.pedidoaniocurso != this.iDocumento.capfechadoc.substring(0, 4)) {
      this.lMensaje = "El documento que desea modificar no pertenece al año de proceso, no podrá modificarlo...";
      return false;
    } else if (this.iDocumento.aproreserva === "S") {
      this.lMensaje = "El documento que desea modificar está reservado, no podrá modificarlo...";
      return false;
    } else if (this.iDocumento.capaprobadocre === "S") {
      this.lMensaje = "El documento que desea modificar está aprobado por crédito, no podrá modificarlo...";
      return false;
    } else if (this.iDocumento.capaprobadopfa === "S") {
      this.lMensaje = "El documento que desea modificar está aprobado por productos controlados FFAA, no podrá modificarlo...";
      return false;
    } else if (this.iDocumento.capaprobadopc === "S") {
      this.lMensaje = "El documento que desea modificar está aprobado por productos controlados, no podrá modificarlo...";
      return false;
    } else if (this.iDocumento.capaprobadovta === "S") {
      this.lMensaje = "El documento que desea modificar está aprobado por ventas, no podrá modificarlo...";
      return false;
    }
    return true;
  }
  /**
* DEFINICION DE FUNCION PARA BUSCAR CLIENTE
*/
  buscar() {
    this.cargarCliente();
  }
  /**
* DEFINICION DE FUNCION PARA SALIR DE LA PANTALLA
*/
  salir() {
    this.router.navigate(['/principal/default'], {
      skipLocationChange: true,
    });
  }
  /**
* DEFINICION DE FUNCION PARA IMPRIMIR ORDEN DE VENTA
*/
  imprimir() {
    let parametro = {
      cia: globales.cia,
      usuario: Funcion.ReturnUsuario().us_codigo,
      numero: this.iDocumento.capnumero,
      tipo: this.iDocumento.captipo,
      valorletras: Funcion.NumeroALetras(this.iDocumento.capsubtotal + this.iDocumento.captotalimp, null)
    };
    this.openReport = "Impresión Reporte Pedido|" + environment.FIVentas + "IngresoPedidos|" + JSON.stringify(parametro) + "|" + Funcion.Ramdon().toString();

  }
  /**
* DEFINICION DE FUNCION CERRAR MODAL CLIENTE
*/
  cierreCliente(event: string) {
    if (event !== "") {
      this.hideModal()
      this.limpiatab(2);
      this.indextab = 2;
      var _datos = JSON.parse(event)
      this.cargarGetSucursal(globales.sucursalPrin);
      this.cargarClienteseleccionado(_datos.clcodigo);
    } else {
      this.limpiatab(1);
    }
  }
  /**
* DEFINICION DE FUNCION CERRAR MODAL TRANSPORTISTA
*/
  cierreTransportista(event: any) {
    if (event !== "") {
      this.hideModal()
      var _datos = JSON.parse(event)
      this.iDocumento.bdgTransportista.btrtipoid = _datos.tidcodigo;
      this.iDocumento.bdgTransportista.btrructrans = _datos.trruc;
      this.iDocumento.bdgTransportista.btrnomtrans = _datos.trnombre;
      this.iDocumento.bdgTransportista.tridtransportes = _datos.tridtransportes;
    } else {
      this.hideModal()
    }
  }
  /**
* DEFINICION DE FUNCION PARA CARGAHISTORICO
*/
  cargahistorico() {
    this.cargaHistorico((this.selectgrupo === "") ? "T" : this.selectgrupo);
  }
  /**
* DEFINICION DE FUNCION PARA LIMPIAR HISTORICO
*/
  limpiarhistorico() {
    this.detgridhistorico = [];
  }
  /**
* DEFINICION DE FUNCION PARA PLACA DEFAULT
*/
  defaultplaca() {
    this.iDocumento.bdgTransportista.btrplaca = "XXXXXXX";
  }
  /**
* DEFINICION DE FUNCION PARA BOTON CARGA TRANSPORTISTA
*/
  buscarchofer() {
    this.cargarTransportista();
  }
  /**
* DEFINICION DE FUNCION PARA CIERRE MODAL DE ITEM
*/
  cierreItem(event: string) {
    if (event !== "") {
      this.hideModal()
      this.lineagrid = JSON.parse(event)
    }
  }
  /**
* DEFINICION DE FUNCION PARA LIMPIAR SESSION DE TRANSPORTISTA
*/
  limpiaretiro() {
    this.iDocumento.bdgTransportista.btrtipoid = "C";
    this.iDocumento.bdgTransportista.btrructrans = "";
    this.iDocumento.bdgTransportista.btrplaca = "";
    this.iDocumento.bdgTransportista.btrnomtrans = "";
    this.iDocumento.bdgTransportista.tridtransportes = 0;
  }
  /**
* DEFINICION DE FUNCION PARA OPCION DE CHECKBOX SI O NO TRANSPORTISTA
*/
  cambiosino() {
    this.limpiaretiro();
    if (this.iDocumento.capretiramercaderia === "S") {
      this.habilitacombocrnu = false;
      this.selectnuevocreado = "C";
      this.habilitacombotran = false;
    } else {
      this.selectnuevocreado = "C";
      this.habilitacombosino = true;
      this.habilitacombocrnu = true;
    }
  }
  /**
* DEFINICION DE FUNCION PARA OPCION DE CHECKBOX SI ES NUEVO O NO
*/
  cambionucre() {
    this.limpiaretiro();
    if (this.selectnuevocreado === "C") {
      this.habilitacombocrnu = false;
      this.habilitacombosino = true;
      this.habilitacombotran = false;
    } else {
      this.habilitacombotran = true;
      this.habilitacombocrnu = false;
      this.habilitacombosino = false;
    }
  }
  /**
* DEFINICION DE FUNCION PARA LOSTFOCUS DE CLIENTE
*/
  buscarcliente() {
    this.cargarGetSucursal(globales.sucursalPrin);
    this.cargarClienteseleccionado(this.iDocumento.clcodigo)
  }
  /**
* DEFINICION DE FUNCION PARA ABRIR MODAL DE BUCAR ITEM
*/
  buscaritem(event: string) {
    if (event == "1" || event.length >= 15) {
      this.datobusquedadmodal = (event.length >= 15) ? event : "";
      this.openModal(this.modalbusquedaitem, "modal-lg modal-primary");
    } else {
      this.datobusquedadmodal = "";
      this.openModal(this.modalbusquedaitem, "modal-lg modal-primary");
    }
  }
  /**
* DEFINICION DE FUNCION PARA LLENAR PRODUCTO CONTROLADOS
*/
  llenaProductoControl(row: string, cantid: string) {
    this.spinner.show();
    let _lista: any[] = [];
    for (var i = 0; i < row.split(',').length; i++) {
      _lista.push({
        codigo: row.split(',')[i],
        cantidad: parseFloat(cantid.split(',')[i])
      });
    }
    this.funcionesService.controlmovCupo(globales.cia, row, this.iDocumento.clcodigo, this.iDocumento.capfechadoc).subscribe(data => {
      try {
        var _datageneral = data.root[0];
        for (var i = 0; i < _datageneral.length; i++) {
          _datageneral[i].items = data.root[1].filter(function (data2: { prc_codigo: string; }) {
            return data2.prc_codigo === _datageneral[i].prc_codigo;
          });
          _datageneral[i].productocantidad = _lista.filter(function (data2: { codigo: string; }) {
            return data2.codigo === _datageneral[i].prc_codigo;
          }).reduce((prev, next) => prev + next.cantidad, 0);
        }
        if (this.iDocumento.relpedProductoc.length <= 0) {
          this.listcontrol = _datageneral;
        } else {
          for (var i = 0; i < this.iDocumento.relpedProductoc.length; i++) {
            for (var j = 0; j < _datageneral.length; j++) {
              for (var x = 0; x < _datageneral[j].items.length; x++) {
                if (_datageneral[j].items[x].prc_codigo === this.iDocumento.relpedProductoc[i].prccodigo && _datageneral[j].items[x].tc_codigo === this.iDocumento.relpedProductoc[i].tccodigo) {
                  _datageneral[j].items[x].cantidad = this.iDocumento.relpedProductoc[i].rppcantidad;
                  _datageneral[j].items[x].sel = true;
                }
              }
            }
          }
          this.listcontrol = _datageneral;
        }
        this.prodControl = "false|" + Funcion.Ramdon();
        this.openModalStatic(this.modalproductocontrol, "");
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA DEVOLVER INFORMACION DE PRODUCTO CONTROLADOS
*/
  devuelvecontrolproducto(event: any[]) {
    if (event != null && event.length > 0) {
      var lsProductos = "";
      var lsProductoscant = "";
      let ban = 0;
      event.forEach((key: any) => {
        if (ban === 0) {
          lsProductos += key.prccodigo;
          lsProductoscant += key.depcantmedalter;
        } else {
          lsProductos += "," + key.prccodigo;
          lsProductoscant += "," + key.depcantmedalter;
        }
        ban++;
      });

      this.llenaProductoControl(lsProductos, lsProductoscant);
    }
  }
  /**
* DEFINICION DE FUNCION PARA DATOS DE VALORES BASE 0 O BASE IVA
*/
  basecerobaseiva(event: string) {
    if (event != null) {
      this.basecerobaseivatotalpadre = event;
    }
  }
  /**
* DEFINICION DE FUNCION PARA DATOS DE DETALLE DE ORDEN DE VENTA
*/
  valorDetalleModelo(detallePed: any[]) {
    this.iDocumento.detallePed = detallePed;
  }
  /**
* DEFINICION DE FUNCION PARA DATOS DE FORMA DE PAGO
*/
  valorFormaModelo(objFormasPago: any[]) {
    this.iDocumento.detpedFpago = [];
    objFormasPago.forEach((key: any) => {
      this.iDocumento.detpedFpago.push({
        ciacodigo: this.iDocumento.ciacodigo,
        captipo: this.iDocumento.captipo,
        capnumero: this.iDocumento.capnumero,
        fpcodigo: key.fpago,
        fpusomodulo: "V",
        dpftotalapagar: parseFloat(key.pago),
        dpffecvenc: key.vencimiento,
        dpfporcprecio: parseFloat(key.porcPrecio),
        fpago: ""
      });
    });
  }
  /**
* DEFINICION DE FUNCION PARA DATOS DE SESSION DE TOTAL DE DOCUMENTO
*/
  valorTotalModelo(objTotales: TotalModel) {
    this.iDocumento.imcodigo = objTotales.opcionimp1 == "" ? null : objTotales.opcionimp1;
    this.iDocumento.imcodigo2 = objTotales.opcionimp2 == "" ? null : objTotales.opcionimp2;
    this.iDocumento.imcodigo3 = objTotales.opcionimp3 == "" ? null : objTotales.opcionimp3;
    this.iDocumento.capporcimpuesto = parseFloat(objTotales.poriva1);
    this.iDocumento.capporcimpuesto2 = parseFloat(objTotales.poriva2);
    this.iDocumento.capporcimpuesto3 = parseFloat(objTotales.poriva3);
    this.iDocumento.capsubtotal = parseFloat(objTotales.subtotal);
    this.iDocumento.captotaldesc = parseFloat(objTotales.subtotaldescuento);
    this.iDocumento.captotalrec = parseFloat(objTotales.subtotalrecargos);
    this.iDocumento.captotalimp = parseFloat(objTotales.iva1);
    this.iDocumento.captotalimp2 = parseFloat(objTotales.iva2);
    this.iDocumento.captotalimp3 = parseFloat(objTotales.iva3);
    this.iDocumento.capexento = parseFloat(objTotales.subtotalexento);
  }
  /**
* DEFINICION DE FUNCION PARA CARGA DATO DE IVA
*/
  cargavaloriva(event: number) {
    this.valorIva = event;
  }
  /**
* DEFINICION DE FUNCION PARA CARGA DATO DE ITEM CONSULTA Y MODIFICACION
*/
  cargaItemcm() {
    this.spinner.show();
    this.ventasService.ayudaItemsPedPrecCont(globales.cia, this.iDocumento.sucodigo, this.iDocumento.clcodigo, this.iDocumento.capfechadoc).subscribe(data => {
      try {
        this.parametroitem = data;
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA LISTADO DE ITEM
*/
  cargaItem(habilita: boolean) {
    this.spinner.show();
    this.ventasService.ayudaItemsPedPrecCont(globales.cia, this.iDocumento.sucodigo, this.iDocumento.clcodigo, this.iDocumento.capfechadoc).subscribe(data => {
      try {
        this.parametroitem = data;
        this.habilitagriddetalle = habilita + "|" + Funcion.Ramdon();
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA INFORMACION DE PRODUCTO CONTROLADO
*/
  retornoGrid(event: any[]) {
    this.iDocumento.relpedProductoc = [];
    if (event != null && event.length > 0) {
      for (var i = 0; i < event.length; i++) {
        for (var j = 0; j < event[i].items.length; j++) {
          let rPC = new RelpedProductoc();
          rPC.prccodigo = event[i].items[j].prc_codigo;
          rPC.tccodigo = event[i].items[j].tc_codigo;
          rPC.clcodigo = this.iDocumento.clcodigo;
          rPC.pccnumero = event[i].items[j].numero;
          rPC.rppnumcalificacion = event[i].items[j].calif;
          rPC.rppcantidad = event[i].items[j].cantidad;
          this.iDocumento.relpedProductoc.push(rPC);
        }
      }
      this.cierreModal(true);
    }
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
* DEFINICION DE FUNCION CLICK EN ACEPTAR EN MODAL DE INGRESO DE ORDEN
*/
  aceptarOk(event: boolean) {
    if (event) {
      if (this.iImpresion === 1) {
        this.imprimir();
      }
      this.cancelarBoton();
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
* DEFINICION DE FUNCION PARA ABRIR CUALQUIER MODAL DE FORMA STATICO
*/
  openModalStatic(content: string, tipo: string) {
    this.modalRef = this.modalService.show(
      content, { class: tipo, backdrop: 'static' });
  }
}
