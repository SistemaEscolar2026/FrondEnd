import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Funcion } from '@funciones/funciones';
import { BotonesModel } from '@modelo/botones-model';
import { MantenimientoService } from '@services/mantenimiento-service';
import { OperativoService } from '@services/operativo-service';
import { NgxSpinnerService } from "ngx-spinner";
import { globales, environment } from 'src/environments/environment';
import { FuncionesService } from '@services/funciones-service';
import {  STEP_STATE } from 'ng-wizard';
import { WizardModel } from '@modelo/wizard-model';
import { BdgTransportista } from '@modelo/bdgTransportista-model';
import * as moment from 'moment';
import { TransporteProd } from '../modelo/transporteProd-model';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  templateUrl: './aprobarpredespacho.component.html',
  styleUrls: ['./aprobarpredespacho.component.scss']
})
export class AprobarPreDespachoComponent implements OnInit {
  /**
* DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE PLACA
*/
  @ViewChild('modalbusquedaplaca') modalbusquedaplaca: any;
  /**
* DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE TRANSPORTISTA
*/
  @ViewChild('modalbusquedatransportista') modalbusquedatransportista: any;
  /**
* DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE LOTE CONTROLADOS
*/
  @ViewChild('modallotecontrol') modallotecontrol: any;
  /**
* DEFINICION DE VARIABLE PARA ABRIR MODAL DE REPORTE
*/
  openReport: string = "";
  /**
* DEFINICION DE VARIABLE QUE ENVIA INFORMACION A MODAL DE MENSAJE
*/
  llamarmodal: string = "";
  /**
* DEFINICION DE VARIABLE DE SENTIDO 
*/
  sentido: string = "D";
  /**
* DEFINICION DE VARIABLE DE GRID DE ORDEN DE PREDESPACHO
*/
  detgrid: any[] = [];
  /**
* DEFINICION DE VARIABLE DE GRID DETALLE ORDEN PREDESPACHO
*/
  detdetalle: any[] = [];
  /**
* DEFINICION DE VARIABLE DE RETORNO LOTE
*/
  retornoGridlote: any[] = [];
  /**
* DEFINICION DE VARIABLE DE ITEM DE PEDIDO
*/
  lineaitempedido: any[] = [];
  /**
* DEFINICION DE VARIABLE LISTADO DE PLACA
*/
  listadoplaca: any[] = [];
  /**
* DEFINICION DE VARIABLE LISTADO DE CONDUCTOR CLASIFICADO
*/
  listconducali: any[] = [];
  /**
* @ignore
*/
  iProc: string = "S";
  /**
* DEFINICION DE VARIABLE MODAL DE MANEJO DE LA SECCION DE BOTONES
*/
  botones: BotonesModel = new BotonesModel();
  /**
* DEFINICION DE VARIABLE DE RUTA LA CUAL NOS PERMITA REDIRECCIONAR A OTRA PAGINA
*/
  router: Router;
  /**
* DEFINICION DE VARIABLE PARA FECHA INICIAL
*/
  fechaInicial: string = "";
  /**
* DEFINICION DE VARIABLE PARA FECHA FINAL
*/
  fechaFinal: string = "";
  /**
* DEFINICION DE VARIABLE CON LA LOTE DE PRODUCTO 
*/
  listlotecontrol: any[] = [];
  envaselote: any = {};
  model: WizardModel = new WizardModel();
  listbodega: any[] = [];
  listmedida: any[] = [];
  wzselecwizar: number = 0;
  usuarioinfo: string = "";
  iDocumento: any = {};
  iTransportista: BdgTransportista = new BdgTransportista();
  prevstep: string = "";
  nextstep: string = "";
  resetstep: string = "";
  iIDTransp: string = "";
  fechaservidor: string = "";
  /**
* DEFINICION DE VARIABLE PARA HABILITA COMBO SI O NO
*/
  habilitacombosino: boolean = true;
  /**
* DEFINICION DE VARIABLE PARA HABILITA CHECK DE NUEVO O CREADO TRANSPORTISTA
*/
  habilitacombocrnu: boolean = false;
  /**
  /**
* DEFINICION DE VARIABLE CON FILA SELECCIONADA DEL GRID DE DETALLE DE PEDIDO
*/
  codbodega: string = "";
  selectedgrid: any[] = [];
  listtipotrans: any[] = [];
  listtipoident: any[] = [];
  selectedlineagrid: any = {};
  modalRef: any;
  /**
* DEFINICION DE VARIABLE PARA HABILITA BOTON BUSCAR CHOFER
*/
  habilitacombotran: boolean = false;
  /**
* DEFINICION DE VARIABLE PARA CONTROL SI ES UN TRASNPORTE ES NUEVO O CREADO
*/
  selectnuevocreado: string = "C";
  /**
* DEFINICION DE VARIABLE CON LA LISTADO DE TRANSPORTISTA
*/
  listtransportista: any[] = [];
  /**
* CONSTRUCTOR DE LA CLASE
*/

  constructor(private spinner: NgxSpinnerService, _router: Router, private funcionesService: FuncionesService, private modalService: BsModalService, private mantenimientoService: MantenimientoService, private operativoService: OperativoService) {
    this.router = _router;
    if (!Funcion.ValidadAutorizado()) {
      this.router.navigate(['/']);
    } else {
      if (!Funcion.ValidadPagina('Aprobacion Predespacho')) {
        this.router.navigate(['/principal/default'], {
          skipLocationChange: true,
        });
      }
    }
    this.model.wz1titulo = "Pedidos";
    this.model.wz1descripcion = "Selecciona el pre despacho para aprobar";
    this.model.wz1state = STEP_STATE.normal

    this.model.wz2titulo = "Pre Despacho";
    this.model.wz2descripcion = "Ingresa las iniciales y las cantidades o selecciona los lotes";
    this.model.wz2state = STEP_STATE.normal

    this.model.wz3titulo = "Transportista";
    this.model.wz3descripcion = "Ingresa o confirma los datos del transportista";
    this.model.wz3state = STEP_STATE.normal
    this.limpiar();
  }
  async ngOnInit() {
    this.funcionesService.getMedidas().subscribe(data => { this.listmedida = data; }, () => { });
    this.listtipoident = Funcion.DatosComboIdenti();
    this.listtipotrans = Funcion.DatosComboTransporte();
    this.fechaservidor = moment(await this.funcionesService.fechaservidor()).format("YYYY-MM-DD").toString();

  }

  limpiar() {
    this.codbodega = "";
    this.cargarBodega();
    var date = new Date();
    this.fechaInicial = Funcion.FormatoFecha(date.toDateString());
    this.fechaFinal = Funcion.FormatoFecha(date.toDateString());
    this.usuarioinfo = Funcion.ReturnUsuario().us_descrip;
  }


  cargarConductorCalif() {
    this.iTransportista.cccodigo = "";
    this.listconducali = [];
    this.mantenimientoService.getCondCalifrsq(globales.cia, ((this.iTransportista.btrtipotrans === "R" || this.iTransportista.btrtipotrans === "C") && this.iIDTransp === "5354") ? "S" : "N").subscribe(async data => {
      try {
        if (data != null) {
          this.listconducali.push({
            cccodigo: "",
            presenta: ""
          });
          data.forEach((key) => {
            this.listconducali.push({
              cccodigo: key.cccodigo,
              presenta: key.cccodigo + " - " + key.ccapellidopaterno + " " + key.ccapellidomaterno + " " + key.ccprimernombre + " " + key.ccsegundonombre
            });
          });

          this.iTransportista.cccodigo = "";
        }
      } catch (e) {
      }
    }, () => {
    });
  }
  cargarPlaca() {
    this.spinner.show();
    this.mantenimientoService.getVehiculoEquipoEsta(globales.cia, this.iDocumento.sucodigo).subscribe(async data => {
      try {
        if (data != null) {
          this.listadoplaca = data;
          this.openModal(this.modalbusquedaplaca, "");
        }
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }

  cargarBodega() {
    this.spinner.show();
    this.mantenimientoService.getBodegas(globales.cia, Funcion.ReturnUsuario().us_codigo).subscribe(async data => {
      try {
        if (data != null) {
          this.listbodega = data;
          this.codbodega = data[0].bocodigo;
          this.cargarPedidos();
        } else {
          this.llamarmodal = "1|Aprobación Predespacho|No tiene bodegas relacionadas, no podrá aprobar los predespachos...|" + Funcion.Ramdon().toString();
        }
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    });
  }

  cargarPedidos() {
    this.spinner.show();
    this.operativoService.getPredespachos(globales.cia, this.codbodega, Funcion.ReturnUsuario().us_codigo).subscribe(async data => {
      try {
        if (data != null) {
          this.detgrid = data;
        }
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, err => {
      this.llamarmodal = "2|Aprobación Predespacho|" + err.error.Message + "|" + Funcion.Ramdon().toString();
      this.spinner.hide();
    });
  }
  buscarPreDespacho() {
    this.spinner.show();
    this.operativoService.getDocumentosBdg(Funcion.Complemento(), Funcion.Auditoria() + environment.modOperativo + ",010000001", globales.cia, this.selectedlineagrid.cap_tipo, this.selectedlineagrid.cap_numero, this.selectedlineagrid.cab_numero).subscribe(async data => {
      try {
        this.iDocumento = data;
        this.iDocumento.captipo = this.selectedlineagrid.cap_tipo;
        this.iDocumento.capnumero = this.selectedlineagrid.cap_numero;
        this.iDocumento.vecodigo = this.selectedlineagrid.ve_codigo;
        this.iDocumento.venombre = this.selectedlineagrid.ve_nombre;
        this.iDocumento.cabnumero = this.selectedlineagrid.cab_numero;
        this.iDocumento.clcodigo = this.selectedlineagrid.cl_codigo;
        this.iDocumento.clnombre = this.selectedlineagrid.cl_nombre;
        this.detdetalle = this.iDocumento.detBodega;
        this.nextstep = Funcion.Ramdon().toString();
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, err => {
      this.llamarmodal = "2|Aprobación Predespacho|" + err.error.Message + "|" + Funcion.Ramdon().toString();
      this.spinner.hide();
    });
  }
  deletePedidoCongeladoatras() {
    this.spinner.show();
    this.operativoService.deleteCongelaPreDes(globales.cia, this.selectedlineagrid.cap_tipo, this.selectedlineagrid.cap_numero, this.selectedlineagrid.cab_numero).subscribe(async data => {
      try {
        this.selectedlineagrid = {}
        this.prevstep = Funcion.Ramdon().toString();
        this.cargarPedidos();
      } catch (e) {
        this.spinner.hide();
      }
    }, err => {
      this.llamarmodal = "2|Aprobación Predespacho|" + err.error.Message + "|" + Funcion.Ramdon().toString();
      this.spinner.hide();
    });
  }
  deletePedidoCongelado() {
    this.spinner.show();
    this.operativoService.deleteCongelaPreDes(globales.cia, this.selectedlineagrid.cap_tipo, this.selectedlineagrid.cap_numero, this.selectedlineagrid.cab_numero).subscribe(async data => {
      try {
        this.selectedlineagrid = {}
        this.resetstep = Funcion.Ramdon().toString();
        this.cargarPedidos();
      } catch (e) {
        this.spinner.hide();
      }
    }, err => {
      this.llamarmodal = "2|Aprobación Predespacho|" + err.error.Message + "|" + Funcion.Ramdon().toString();
      this.spinner.hide();
    });
  }
  controlLotes(item: string, linea: number) {
    this.spinner.show();
    this.funcionesService.controlLotes(globales.cia, this.iDocumento.bocodigo, item, Funcion.FormatoFecha(this.iDocumento.cabfechadoc)).subscribe(async data => {
      try {
        data.forEach((key: any) => {
          key.sel = (key.sel === 'N') ? false : true;
          key.linea = linea - 1;
        });
        this.iDocumento.detBodega[linea - 1].detBodegaLote.forEach((key: any) => {
          for (var i = 0; i < data.length; i++) {
            if (data[i].item === key.itcodigo && data[i].lote === key.locodigo) {
              data[i].sel = true;
              data[i].cantidad = key.dblcantidad;
            }
          }
        });

        this.envaselote = {
          item: item,
          linea: linea - 1,
          detBodega: this.iDocumento.detBodega[linea - 1]
        }

        if (this.retornoGridlote.length > 0) {
          this.listlotecontrol = this.retornoGridlote;
        } else {
          this.listlotecontrol = data;
        }


        this.spinner.hide();
        this.openModalStatic(this.modallotecontrol, "modal-lg modal-primary");
      } catch (e) {
        this.spinner.hide();
      }
    }, err => {
      this.llamarmodal = "2|Aprobación Predespacho|" + err.error.Message + "|" + Funcion.Ramdon().toString();
      this.spinner.hide();
    });
  }
  insertarPedidoCongelado() {
    this.spinner.show();
    this.operativoService.insertCongelaPreDes(globales.cia, this.selectedlineagrid.cap_tipo, this.selectedlineagrid.cap_numero, this.selectedlineagrid.cab_numero, Funcion.ReturnUsuario().us_codigo).subscribe(async data => {
      try {
        this.buscarPreDespacho()
      } catch (e) {
        this.spinner.hide();
      }
    }, err => {
      this.llamarmodal = "2|Aprobación Predespacho|" + err.error.Message + "|" + Funcion.Ramdon().toString();
      this.spinner.hide();
    });
  }
  buscarPedidoCongelado() {
    this.spinner.show();
    this.operativoService.getCongelaPreDes(globales.cia, this.selectedlineagrid.cap_tipo, this.selectedlineagrid.cap_numero, this.selectedlineagrid.cab_numero).subscribe(async data => {
      try {
        if (data != null) {
          this.llamarmodal = "1|Aprobación Predespacho|El pre despacho #" + this.selectedlineagrid.cab_numero + " del pedido " + this.selectedlineagrid.cap_tipo + " - " + this.selectedlineagrid.cap_numero + ", se encuentra en proceso por el usuario " + data.cabusuario + "  y no podrá procesarlo...|" + Funcion.Ramdon().toString();
          this.spinner.hide();
        } else {
          this.insertarPedidoCongelado();
        }

      } catch (e) {
        this.spinner.hide();
      }
    }, err => {
      this.llamarmodal = "2|Aprobación Predespacho|" + err.error.Message + "|" + Funcion.Ramdon().toString();
      this.spinner.hide();
    });
  }
  wzselecccionado(event: number) {
    this.wzselecwizar = event;
    if (this.wzselecwizar === 2) {
      this.iTransportista.btrtipotrans = "P";
      this.iTransportista.btrtipoid = "C";
      this.selectnuevocreado = "C";
      this.cargarConductorCalif();
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
* DEFINICION DE FUNCION CLICK EN ACEPTAR EN MODAL DE APROBACION DE ORDEN DE COMPRA
*/
  aceptarOk(event: boolean) {
    if (event) {
      this.imprimir();
      this.resetWizard();
    }
  }
  /**
* DEFINICION DE FUNCION DE LIMPIAR COLOR
*/
  limpiarColor() {
    for (var i = 0; i < this.detgrid.length; i++) {
      this.detgrid[i].color = "";
    }
  }
  /**
* DEFINICION DE FUNCION DE LIMPIAR COLOR DETALLE
*/
  limpiarColorD() {
    for (var i = 0; i < this.detdetalle.length; i++) {
      this.detdetalle[i].color = "";
    }
  }
  /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
  clickGrid(row: any) {
    this.limpiarColor();
    this.selectedgrid = [];
    this.selectedgrid.push(row);
    this.selectedlineagrid = this.selectedgrid[0];
    row.color = "SG";
  }
  /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID DETALLE
*/
  clickGridd(row: any) {
    this.limpiarColorD();
    this.lineaitempedido = [];
    this.lineaitempedido.push(row);
    row.color = "SG";
  }
  /**
* DEFINICION DE FUNCION SALIR DE LA PANTALLA
*/
  salir() {
    this.router.navigate(['/principal/default'], {
      skipLocationChange: true,
    });
  }
  showNextStep() {
    if (this.selectedgrid.length <= 0) {
      this.llamarmodal = "1|Aprobación Predespacho|Debe seleccionar un pedido para poder seguir|" + Funcion.Ramdon();
    } else {
      if (this.wzselecwizar === 0) {
        this.buscarPedidoCongelado();
      } else {
        if (this.wzselecwizar === 1) {
          let ban = 0;
          if (this.iDocumento.cabpersonaprocesa === "") {
            this.llamarmodal = "1|Debe ingresar sus iniciales en el campo Procesado...|" + Funcion.Ramdon();
            ban = 1;
          } else {
            for (var i = 0; i < this.iDocumento.detBodega.length; i++) {
              if ((this.iDocumento.detBodega[i].debmotivo != null && this.iDocumento.detBodega[i].debmotivo != "") || this.iDocumento.detBodega[i].saldo === "N") {
                this.iProc = "N";
                break;
              }
            }

            for (var i = 0; i < this.detdetalle.length; i++) {
              if (this.detdetalle[i].itlote === "S") {
                if (this.detdetalle[i].detBodegaLote.length <= 0) {
                  this.llamarmodal = "1|Aprobación Predespacho|No ha ingresado los lotes para el ítem " + this.detdetalle[i].itcodigo + "...|" + Funcion.Ramdon();
                  ban = 1;
                  break;
                }
                if ((parseInt(this.detdetalle[i].debcantped) > parseInt(this.detdetalle[i].debcantdes)) && this.detdetalle[i].saldo === "S") {
                  this.llamarmodal = "1|Aprobación Predespacho|La cantidad a despachar del ítem " + this.detdetalle[i].itcodigo + " es menor que la pedida, favor verifique las cantidades ingresadas...|" + Funcion.Ramdon();
                  ban = 1;
                  break;
                }
                if (parseInt(this.detdetalle[i].debcantped) < parseInt(this.detdetalle[i].debcantdes)) {
                  this.llamarmodal = "1|Aprobación Predespacho|La cantidad a despachar del ítem " + this.detdetalle[i].itcodigo + " es mayor que la pedida, favor verifique las cantidades ingresadas...|" + Funcion.Ramdon();
                  ban = 1;
                  break;
                }
              }
            }
            if (ban === 0) {
              this.iDocumento.cabprocesado = this.iProc;
              if (this.iProc === "N") {
                this.iTransportista = new BdgTransportista();
                this.llamarmodal = "1|Aprobación Predespacho|El predespacho seleccionado no será procesado por que existen ítems que su saldo no cumple con lo pedido.<br />Se grabará como procesado NO... Favor verificar los saldos...|" + Funcion.Ramdon();
              }
              this.nextstep = Funcion.Ramdon().toString();
            }
          }
        } else {
          this.iDocumento.cabprocesado = this.iProc;
          if (this.iProc === "N") {
            this.iTransportista = new BdgTransportista();
            this.llamarmodal = "1|Aprobación Predespacho|El predespacho seleccionado no será procesado por que existen ítems que su saldo no cumple con lo pedido.<br />Se grabará como procesado NO... Favor verificar los saldos...|" + Funcion.Ramdon();
          }
          this.nextstep = Funcion.Ramdon().toString();
        }
      }

    }
  }
  /**
* DEFINICION DE FUNCION PARA CARGA MODAL DE BUSQUEDA DE TRANSPORTISTA
*/
  cargarTransportista() {
    this.spinner.show();
    this.mantenimientoService.getTransporteProd(globales.cia, this.iTransportista.btrtipotrans).subscribe(data => {
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
  showPreviousStep() {
    if (this.wzselecwizar === 1) {
      this.selectedgrid = [];
      this.deletePedidoCongeladoatras();
    } else {
      this.prevstep = Funcion.Ramdon().toString();
    }

  }
  resetWizard() {
    if (this.selectedgrid.length > 0) {
      this.selectedgrid = [];
      this.retornoGridlote = [];
      this.deletePedidoCongelado();
      this.iTransportista = new BdgTransportista();
    } else {
      this.selectedgrid = [];
      this.retornoGridlote = [];
      this.iTransportista = new BdgTransportista();
      this.resetstep = Funcion.Ramdon().toString();
      this.cargarPedidos();
    }

  }

  abrirLote(row: any) {
    if (row.itlote === 'S') {
      this.controlLotes(row.itcodigo, row.deplinea);
    }
  }
  /**
* DEFINICION DE FUNCION PARA CERRAR MODALES
*/
  retornoGrid(event: any[]) {
    if (event.length > 0) {
      this.retornoGridlote = event;

      if (this.lineaitempedido.length > 0) {
        this.detdetalle[this.retornoGridlote[0].linea].debcantdes = parseInt(this.retornoGridlote.reduce((prev, next) => prev + next.cantidad, 0));
        this.detdetalle[this.retornoGridlote[0].linea].detBodegaLote = this.retornoGridlote;
      }
    }
    this.cierreModal(true);
  }
  /**
* DEFINICION DE FUNCION PARA CERRAR MODALES
*/
  cierreModal(event: boolean) {
    if (event) {
      this.hideModal()
    }
  }
  defaultplaca() {
    this.cargarPlaca();

  }
  cambionucre() {
    //this.limpiaretiro();
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
* DEFINICION DE FUNCION CERRAR MODAL TRANSPORTISTA
*/
  cierreTransportista(event: any) {
    if (event !== "") {
      this.hideModal()
      var _datos = JSON.parse(event)
      this.iTransportista.btrtipoid = _datos.tidcodigo;
      this.iTransportista.btrructrans = _datos.trruc;
      this.iTransportista.btrnomtrans = _datos.trnombre;
      this.iTransportista.tridtransportes = _datos.tridtransportes;
      this.iIDTransp = _datos.tridtransportes;
    } else {
      this.hideModal()
    }
  }
  cambioTipoTrans() {
    this.selectnuevocreado = "C";
    if (this.iTransportista.btrtipotrans === "R") {
      this.iTransportista.btrtipoid = "R";
      this.iTransportista.btrructrans = globales.ciaRuc;
      this.iTransportista.btrnomtrans = globales.ciaDescrip;
    } else {
      this.iTransportista.btrtipoid = "C";
      this.iTransportista.btrructrans = "";
      this.iTransportista.btrnomtrans = "";
    }
    this.cargarConductorCalif();
  }
  /**
* DEFINICION DE FUNCION CERRAR MODAL PLACA
*/
  cierreplaca(event: string) {
    if (event !== "") {
      let _dato = JSON.parse(event);
      this.iTransportista.btrplaca = _dato.vqplaca;
      this.hideModal()
    }
  }
  omitir() {
    this.iTransportista = new BdgTransportista();
    this.grabar(2);
  }
  /**
* DEFINICION DE FUNCION PARA BOTON CARGA TRANSPORTISTA
*/
  buscarchofer() {
    this.cargarConductorCalif();
    this.cargarTransportista();
  }
  /**
* DEFINICION DE FUNCION PARA ABRIR CUALQUIER MODAL DE FORMA STATICO
*/
  openModalStatic(content: string, tipo: string) {
    this.modalRef = this.modalService.show(
      content, { class: tipo, backdrop: 'static' });
  }
  grabar(ban: number) {
    if (ban === 1) {
      if (this.validar()) {
        this.grabarFinal();
      }
    } else {
      this.grabarFinal();
    }
  }
  imprimir() {
    let parametro = {
      cia: globales.cia,
      tip_ped: this.iDocumento.captipo,
      num_ped: this.iDocumento.capnumero,
      num_pre: this.iDocumento.cabnumero,
      usuario: Funcion.ReturnUsuario().us_codigo
    };

    let iNombreRporte = "predespacho";

    this.openReport = "Aprobación Predespacho|" + environment.reportServerOperativo + iNombreRporte + "|" + JSON.stringify(parametro) + "|" + Funcion.Ramdon();
  }
  grabarFinal() {
    if (this.iTransportista.btrplaca != "") {
      this.iTransportista.ciacodigo = this.iDocumento.ciacodigo;
      this.iTransportista.captipo = this.iDocumento.captipo;
      this.iTransportista.capnumero = this.iDocumento.capnumero;
      if (this.iTransportista.btrtipotrans === "R") {
        this.iTransportista.sucodigo = this.iDocumento.sucodigo;
        this.iTransportista.vqplaca = this.iTransportista.btrplaca.toUpperCase();
        this.iTransportista.tridtransportes = null;
      }
      else {
        this.iTransportista.sucodigo = null;
        this.iTransportista.vqplaca = null;
        this.iTransportista.tridtransportes = parseInt(this.iIDTransp);
      }
      if (this.selectnuevocreado === "N") {
        this.iTransportista.transporteProd.ciacodigo = this.iTransportista.ciacodigo;
        this.iTransportista.transporteProd.trtipotrans = this.iTransportista.btrtipotrans;
        this.iTransportista.transporteProd.trruc = this.iTransportista.btrructrans;
        this.iTransportista.transporteProd.tidcodigo = this.iTransportista.btrtipoid;
        this.iTransportista.transporteProd.trnombre = this.iTransportista.btrnomtrans;
      }
      else {
        this.iTransportista.transporteProd = new TransporteProd();
      }

      this.iDocumento.cabproctrans = "S";
      this.iDocumento.cabfechaproctrans = this.fechaservidor;
      this.iDocumento.cabusuarioproctrans = Funcion.ReturnUsuario().us_codigo;
      this.iDocumento.cabfecinitraslado = this.fechaInicial;
      this.iDocumento.cabfecfintraslado = this.fechaFinal;


    }
    let dat = this.iDocumento.detBodega.filter(function (data2: { itlote: string, detBodegaLote: any[]; }) {
      return data2.itlote === "S" && data2.detBodegaLote.length > 0;
    });
    if (this.retornoGridlote.length >= 0) {
      this.iDocumento.detBodega = this.detdetalle;
    } else {
      if (dat <= 0) {
        this.iDocumento.detBodega = this.detdetalle;
      } else {
        this.iDocumento.detBodega = this.detdetalle;
      }
    }



    for (var i = 0; i < this.iDocumento.detBodega.length; i++) {
      if (this.iDocumento.detBodega[i].detBodegaLote != null && this.iDocumento.detBodega[i].detBodegaLote.length > 0) {
        for (var j = 0; j < this.iDocumento.detBodega[i].detBodegaLote.length; j++) {
          this.iDocumento.detBodega[i].detBodegaLote[j].ciacodigo = this.iDocumento.detBodega[i].ciacodigo;
          this.iDocumento.detBodega[i].detBodegaLote[j].captipo = this.iDocumento.detBodega[i].captipo;
          this.iDocumento.detBodega[i].detBodegaLote[j].capnumero = this.iDocumento.detBodega[i].capnumero;
          this.iDocumento.detBodega[i].detBodegaLote[j].deplinea = this.iDocumento.detBodega[i].deplinea;
          this.iDocumento.detBodega[i].detBodegaLote[j].cabnumero = this.iDocumento.detBodega[i].cabnumero;
          this.iDocumento.detBodega[i].detBodegaLote[j].deblinea = this.iDocumento.detBodega[i].deblinea;
          if (this.iDocumento.detBodega[i].detBodegaLote[j].item !== undefined) {
            this.iDocumento.detBodega[i].detBodegaLote[j].itcodigo = this.iDocumento.detBodega[i].detBodegaLote[j].item;
          }
          if (this.iDocumento.detBodega[i].detBodegaLote[j].lote !== undefined) {
            this.iDocumento.detBodega[i].detBodegaLote[j].locodigo = this.iDocumento.detBodega[i].detBodegaLote[j].lote;
          }
          if (this.iDocumento.detBodega[i].detBodegaLote[j].cantidad !== undefined) {
            this.iDocumento.detBodega[i].detBodegaLote[j].dblcantidad = this.iDocumento.detBodega[i].detBodegaLote[j].cantidad;
          }
          if (this.iDocumento.detBodega[i].detBodegaLote[j].envases != null && this.iDocumento.detBodega[i].detBodegaLote[j].envases.length > 0) {
            for (var x = 0; x < this.iDocumento.detBodega[i].detBodegaLote[j].envases.length; x++) {
              this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].ciacodigo = this.iDocumento.detBodega[i].detBodegaLote[j].ciacodigo;
              this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].captipo = this.iDocumento.detBodega[i].detBodegaLote[j].captipo;
              this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].capnumero = this.iDocumento.detBodega[i].detBodegaLote[j].capnumero;
              this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].deplinea = this.iDocumento.detBodega[i].detBodegaLote[j].deplinea;
              this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].cabnumero = this.iDocumento.detBodega[i].detBodegaLote[j].cabnumero;
              this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].deblinea = this.iDocumento.detBodega[i].detBodegaLote[j].deblinea;
              if (this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].item !== undefined) {
                this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].itcodigo = this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].item;
              }
              this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].locodigo = this.iDocumento.detBodega[i].detBodegaLote[j].locodigo;
              if (this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].linea !== undefined) {
                this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].deelinea = this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].linea;
              }
              if (this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].envase_ini !== undefined) {
                this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].deeenvaseini = this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].envase_ini;
              }
              if (this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].envase_fin !== undefined) {
                this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].deeenvasefin = this.iDocumento.detBodega[i].detBodegaLote[j].envases[x].envase_fin;
              }
            }
          }
        }
      }
    }

    let predespacho: any = {
      cabBodega: this.iDocumento,
      bdgTransportista: this.iTransportista
    };

    this.spinner.show();
    this.operativoService.grabaPredespacho(Funcion.Complemento(), Funcion.Auditoria() + environment.modOperativo + ",010000001", predespacho).subscribe(data => {
      try {
        this.llamarmodal = "3|Aprobación Predespacho|" + data + "|" + Funcion.Ramdon();
        this.spinner.hide();
      } catch (e) {
        this.spinner.hide();
      }
    }, err => {
      this.llamarmodal = "2|Aprobación Predespacho|" + err.error.Message.toString() + "|" + Funcion.Ramdon().toString();
      this.spinner.hide();
    });

  }
  validar() {
    let rotorno = true;
    if (this.iTransportista.btrructrans === "") {
      this.llamarmodal = "1|Aprobación Predespacho|Debe ingresar la identificación de la persona que va a retirar el producto... Favor Verifique...|" + Funcion.Ramdon();
      rotorno = false;
    } else if (this.iTransportista.btrtipoid === "C" && this.iTransportista.btrructrans.length !== 10) {
      this.llamarmodal = "1|Aprobación Predespacho|El número de identificación debe tener 10 dígitos para el tipo de identificación cédula... Favor Verifique...|" + Funcion.Ramdon();
      rotorno = false;
    } else if (this.iTransportista.btrtipoid === "R" && this.iTransportista.btrructrans.length !== 13) {
      this.llamarmodal = "1|Aprobación Predespacho|El número de identificación debe tener 13 dígitos para el tipo de identificación R.U.C. Favor Verifique...|" + Funcion.Ramdon();
      rotorno = false;
    } else if (this.iTransportista.btrnomtrans === "") {
      this.llamarmodal = "1|Aprobación Predespacho|Debe indicar el nombre de la persona que va a retirar el producto... Favor Verifique...|" + Funcion.Ramdon();
      rotorno = false;
    } else if (this.iTransportista.btrplaca === "") {
      this.llamarmodal = "1|Aprobación Predespacho|Debe indicar o seleccionar la placa del vehículo que va a retirar el producto... Favor Verifique...|" + Funcion.Ramdon();
      rotorno = false;
    } else if (this.iTransportista.cccodigo === "") {
      this.llamarmodal = "1|Aprobación Predespacho|Debe seleccionar el conductor... Favor Verifique...|" + Funcion.Ramdon();
      rotorno = false;
    } else if (this.iDocumento.cabfechadoc > this.fechaInicial) {
      this.llamarmodal = "1|Aprobación Predespacho|La fecha inicial no puede ser menor a la fecha del predespacho... Favor verifique ...|" + Funcion.Ramdon();
      rotorno = false;
    } else if (this.fechaInicial > this.fechaFinal) {
      this.llamarmodal = "1|Aprobación Predespacho|La fecha inicial no puede ser mayor a la final...|" + Funcion.Ramdon();
      rotorno = false;
    } else if (this.fechaInicial < this.fechaservidor) {
      this.modalmensaje("1", "La fecha inicial no puede ser menor a la fecha actual...");
      rotorno = false;
    }
    return rotorno;
  }
  modalmensaje(tipo: string, mensaje: string) {
    this.llamarmodal = tipo + "|Aprobación Predespacho|" + mensaje + "|" + Funcion.Ramdon();
  }
}
