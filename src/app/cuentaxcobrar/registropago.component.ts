import { Component, Inject, Injector, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Funcion } from '@funciones/funciones';
import { MantenimientoService } from '@services/mantenimiento-service';
import { BoletoService } from '@services/boleto-service';
import { CuentaxCobrarService } from '@services/cuentaxcobrar-service';
import { NgxSpinnerService } from "ngx-spinner";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BotonesModel } from '@modelo/botones-model';
import { globales, environment } from 'src/environments/environment';
import { ServiceMensaje } from '@services/config/ServiceMensaje';
import { BoCabeceraModel } from '@modelo/bocabecera-model';
import { TotalModel } from '@modelo/total-model';
import * as moment from 'moment';
import { BoDetalleModel } from '@modelo/bodetalle-model';
import { BoSeguroModel } from '@modelo/boseguro-model';
import { BoAlojamientoModel } from '@modelo/boalojamiento-model';
import { DetallePago } from '@modelo/detallePago-model';
import { DOCUMENT } from '@angular/common';
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './registropago.component.html',
    styleUrls: ['./registropago.component.scss']
})
export class RegistroPagoComponent implements OnInit {
    /**
   * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
   */
    @ViewChild('modalbusquedaentidad') modalbusquedaentidad: any;


    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    impuestoporcentaje: number = 0;
    modalRef: any;
    lineaselect: string = "";
    llamarmodal: string = "";
    ColumnaDetalle: any[] = ['','FACTURA', 'ENTIDAD', 'FECHA DE FACTURA', 'RUTA',  'ABONO', 'TOTAL FACTURA', 'SALDO'];
    /**
  * DEFINICION DE VARIABLE DE CONTROL DE ACCION SUBMIT DE PAGINA
  */
    /**
   * DEFINICION DE VARIABLE DE RUTA LA CUAL NOS PERMITA REDIRECCIONAR A OTRA PAGINA
   */
    router: Router;
    /**
  * DEFINICION DE VARIABLE MODAL DE MANEJO DE LA SECCION DE BOTONES
  */
    botones: BotonesModel = new BotonesModel();
    totalmodel: TotalModel = new TotalModel();
    /**
  * DEFINICION DE VARIABLE NOTIFICACION TIPO TOAS
  */
    notifier: any;
    submitted = false;
    habilitaobjetofrom: boolean = true;
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    detalleboletopago: any[] = [];
    detalleregistropago: DetallePago[] = [];
    detalleregistropagogeneral: DetallePago[] = [];
    listcliente: any[] = [];
    listtipopago: any[] = [];
    iDocumento: BoCabeceraModel = new BoCabeceraModel();
    lineagrid: any = {}
    lineagridse: number = 0;
    lineagridalo: number = 0;
    listEstado: any[] = [];
    listEstados: any[] = [];
    listTipoViaje: any[] = [];
    listrutas: any[] = [];
    listproveedor: any[] = [];
    listforma: any[] = [];
    listtiposeguro: any[] = [];
    listboleto: any[] = [];
    listtipoalojamiento: any[] = [];
    lineaseguro: BoSeguroModel = new BoSeguroModel();
    lineaalojamiento: BoAlojamientoModel = new BoAlojamientoModel();
    smensaje = "";
    isAccion: string = "";
    /**
   * DEFINICION DE VARIABLE DE MODELO DE VENDEDOR
   */
    model: any = {};
    /**
 * DEFINICION DE FUNCION INIT DE LA CLASE
 */
    ngOnInit() {
        var _Datos: any[] = [];
        this.cancelar();
        this.listtipopago = Funcion.TipoPago();

    }
    limpiarregistro() {
        this.detalleboletopago = [];
        this.detalleregistropago = [];
        this.detalleregistropagogeneral = [];
        this.lineaselect = "";
    }
    deleteregistro() {

    }
    cancelar() {
        this.limpiabotones(2);
        this.limpiarregistro();
        this.habilitarfrom(2);
    }
   
    buscarboleto() {
        this.spinner.show();
        this.cuentaxCobrarService.cargapagoboleto(globales.cia, this.iDocumento.bc_fecha_fin_viaje, this.iDocumento.cl_codigo.toString()).subscribe(data => {
            try {
                let sec = 1;
                this.detalleboletopago = data.root[0];
                this.detalleboletopago.forEach((key: any) => {
                    key.color = "";
                    key.sec = sec;
                    sec++;
                });
                if (this.detalleboletopago.length <= 0) {
                    this.botones.btneliminar = true;
                } else {
                    this.botones.btneliminar = false;
                }

                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }



    cierreModalTipoSeguro(event: any) {
        if (event) {
            this.hideModal()
        }
    }

    /**
* DEFINICION DE FUNCION CARGA FORMA
*/
    cargaCliente() {
        this.spinner.show();
        this.mantenimientoService.manCliente(globales.cia).subscribe(data => {
            try {
                this.listcliente = data.root[0];
                this.openModal(this.modalbusquedaentidad);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }

    totalColumna(col: number) {
        let _cantidad: number = 0;
        if (col === 1) {
            this.detalleboletopago.forEach((key) => {
                _cantidad = _cantidad + key.fa_total;
            });
        }
        if (col === 2) {
            this.detalleregistropago.forEach((key) => {
                _cantidad = _cantidad + key.total;
            });
        }
        if (col === 3) {
            this.detalleboletopago.forEach((key) => {
                _cantidad = _cantidad + parseFloat(key.bc_abono.toString());
            });
        }
        if (col === 4) {
            this.detalleboletopago.forEach((key) => {
                _cantidad = _cantidad + (parseFloat(key.fa_total.toString()) - parseFloat(key.bc_abono.toString()));
            });
        }
        return _cantidad.toFixed(2);
    }

    validar() {
        this.smensaje = "";

        if (this.detalleregistropago.length > 0) {
            for (var i = this.detalleregistropagogeneral.length - 1; i >= 0; i--) {
                if (this.detalleregistropagogeneral[i].seccab === this.lineagrid.sec) {
                    this.detalleregistropagogeneral.splice(i, 1);
                }
            }
            this.detalleregistropago.forEach((key) => {
                this.detalleregistropagogeneral.push(key);
            });
            this.detalleregistropago = [];
        } else {
            this.detalleregistropago.forEach((key) => {
                this.detalleregistropagogeneral.push(key);
            });
            this.detalleregistropago = [];
        }


        if (this.detalleboletopago.length <= 0) {
            this.smensaje = "No Tiene ningun Boleto pendiente de pago ...Por Favor Revisar"
            return;
        }
        if (this.detalleregistropagogeneral.length <= 0) {
            this.smensaje = "No Tiene ingresado ningun pago ...Por Favor Revisar"
            return;
        }



    }
    confirmarguardar() {
        this.mensaje("4", "Esta seguro de guardar la informacion");
    }
    guardar() {
        this.validar();
        if (this.smensaje != "") {
            this.mensaje("1", this.smensaje);
            return
        } else {
            if (this.isAccion === "I") {
                this.insertPago();
            }
            if (this.isAccion === "M") {
                //   this.updateBoleto();
            }
        }
    }
    insertPago() {
        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;

        this.cuentaxCobrarService.insertPago(this.detalleregistropagogeneral).subscribe(data => {
            try {
                if (data.success) {
                    var mensaje: string = "";
                    mensaje = mensaje + data.msgError + "<br/>";
                    var _datos: any[] = [];
                    _datos = data.root[0];
                    _datos.forEach((k: any) => {
                        mensaje = mensaje + k.mensaje + "<br/>";
                    });
                    this.mensaje("3", mensaje);
                    this.limpiabotones(1);
                    this.habilitarfrom(1);
                } else {
                    this.mensaje("2", data.msgError);
                }
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.mensaje("2", err.message);
            this.spinner.hide();
        });

    }
    /**
  * DEFINICION DE FUNCION PARA LIMPIAR LOS SECCION DE BOTONES
  */
    limpiabotones(_dato: Number) {
        switch (_dato) {
            case 1:
                this.botones.btnnuevo = false;
                this.botones.btnmodificar = true;
                this.botones.btnbuscar = true;
                this.botones.btngrabar = true
                this.botones.btneliminar = true;
                this.botones.btncancelar = false;
                this.botones.btnbuscar = true;
                this.botones.btnsalir = false
                this.iDocumento = new BoCabeceraModel();
                var fecha = new Date();
                var formatoFecha = moment(fecha);
                this.iDocumento.bc_fecha_inicio_viaje = formatoFecha.format("YYYY-MM-DD").toString();
                this.iDocumento.bc_fecha_fin_viaje = formatoFecha.format("YYYY-MM-DD").toString();
                this.submitted = false;
                break;
            case 2:
                this.botones.btnnuevo = true;
                this.botones.btnmodificar = true;
                this.botones.btngrabar = false
                this.botones.btneliminar = true;
                this.botones.btncancelar = false;
                this.botones.btnbuscar = true;
                this.botones.btnsalir = false;
                this.botones.btnbuscar = false;
                this.iDocumento = new BoCabeceraModel();
                var fecha = new Date();
                var formatoFecha = moment(fecha);
                this.iDocumento.bc_fecha_inicio_viaje = formatoFecha.format("YYYY-MM-DD").toString();
                this.iDocumento.bc_fecha_fin_viaje = formatoFecha.format("YYYY-MM-DD").toString();
                break;
            case 3:
                this.botones.btnnuevo = true;
                this.botones.btnmodificar = false;
                this.botones.btngrabar = true
                this.botones.btneliminar = false;
                this.botones.btncancelar = false;
                this.botones.btnbuscar = true;
                this.botones.btnsalir = false;
                break;
        }
    }
    habilitarfrom(val: Number) {
        switch (val) {
            case 1:
                this.isAccion = "I";
                this.habilitaobjetofrom = false;
                break;
            case 2:
                this.isAccion = "I";
                this.habilitaobjetofrom = true;
                break;
            case 3:
                this.isAccion = "M";
                this.habilitaobjetofrom = false;
                break;
            case 4:
                this.isAccion = "";
                this.habilitaobjetofrom = true;
                break;
        }
    }
    calculo(row: DetallePago, num: number) {

        let _valorcab = this.lineagrid.bd_total_general;

        let resume = this.detalleregistropago.filter((key) => {
            return key.sec != this.lineagridse;
        });
        let _sal = 0;
        resume.forEach((key) => {
            _sal = _sal + key.total;
        });
        _sal = _valorcab - _sal;
        if (num === 1) {
            if (parseFloat(row.valor_efectivo.toString()) > parseFloat(_sal.toFixed(2))) {
                row.valor_efectivo = "";
                row.total = parseFloat((row.valor_efectivo.toString() === "") ? "0" : row.valor_efectivo.toString()) + parseFloat((row.valor_cheque.toString() === "") ? "0" : row.valor_cheque.toString()) + parseFloat((row.valor_deposito.toString() === "") ? "0" : row.valor_deposito.toString()) + parseFloat((row.valor_transferencia.toString() === "") ? "0" : row.valor_transferencia.toString());
            } else {
                row.total = parseFloat((row.valor_efectivo.toString() === "") ? "0" : row.valor_efectivo.toString()) + parseFloat((row.valor_cheque.toString() === "") ? "0" : row.valor_cheque.toString()) + parseFloat((row.valor_deposito.toString() === "") ? "0" : row.valor_deposito.toString()) + parseFloat((row.valor_transferencia.toString() === "") ? "0" : row.valor_transferencia.toString());
            }
        }
        if (num === 2) {
            if (parseFloat(row.valor_deposito.toString()) > parseFloat(_sal.toFixed(2))) {
                row.valor_deposito = "";
                row.total = parseFloat((row.valor_efectivo.toString() === "") ? "0" : row.valor_efectivo.toString()) + parseFloat((row.valor_cheque.toString() === "") ? "0" : row.valor_cheque.toString()) + parseFloat((row.valor_deposito.toString() === "") ? "0" : row.valor_deposito.toString()) + parseFloat((row.valor_transferencia.toString() === "") ? "0" : row.valor_transferencia.toString());
            } else {
                row.total = parseFloat((row.valor_efectivo.toString() === "") ? "0" : row.valor_efectivo.toString()) + parseFloat((row.valor_cheque.toString() === "") ? "0" : row.valor_cheque.toString()) + parseFloat((row.valor_deposito.toString() === "") ? "0" : row.valor_deposito.toString()) + parseFloat((row.valor_transferencia.toString() === "") ? "0" : row.valor_transferencia.toString());
            }
        }
        if (num === 3) {
            if (parseFloat(row.valor_cheque.toString()) > parseFloat(_sal.toFixed(2))) {
                row.valor_cheque = "";
                row.total = parseFloat((row.valor_efectivo.toString() === "") ? "0" : row.valor_efectivo.toString()) + parseFloat((row.valor_cheque.toString() === "") ? "0" : row.valor_cheque.toString()) + parseFloat((row.valor_deposito.toString() === "") ? "0" : row.valor_deposito.toString()) + parseFloat((row.valor_transferencia.toString() === "") ? "0" : row.valor_transferencia.toString());
            } else {
                row.total = parseFloat((row.valor_efectivo.toString() === "") ? "0" : row.valor_efectivo.toString()) + parseFloat((row.valor_cheque.toString() === "") ? "0" : row.valor_cheque.toString()) + parseFloat((row.valor_deposito.toString() === "") ? "0" : row.valor_deposito.toString()) + parseFloat((row.valor_transferencia.toString() === "") ? "0" : row.valor_transferencia.toString());
            }
        }
        if (num === 4) {
            if (parseFloat(row.valor_transferencia.toString()) > parseFloat(_sal.toFixed(2))) {
                row.valor_transferencia = "";
                row.total = parseFloat((row.valor_efectivo.toString() === "") ? "0" : row.valor_efectivo.toString()) + parseFloat((row.valor_cheque.toString() === "") ? "0" : row.valor_cheque.toString()) + parseFloat((row.valor_deposito.toString() === "") ? "0" : row.valor_deposito.toString()) + parseFloat((row.valor_transferencia.toString() === "") ? "0" : row.valor_transferencia.toString());
            } else {
                row.total = parseFloat((row.valor_efectivo.toString() === "") ? "0" : row.valor_efectivo.toString()) + parseFloat((row.valor_cheque.toString() === "") ? "0" : row.valor_cheque.toString()) + parseFloat((row.valor_deposito.toString() === "") ? "0" : row.valor_deposito.toString()) + parseFloat((row.valor_transferencia.toString() === "") ? "0" : row.valor_transferencia.toString());
            }
        }

        let idenx = this.detalleboletopago.findIndex((key: any) =>
            key.sec === this.lineagrid.sec
        );

        this.detalleboletopago[idenx].bc_abono = this.totalColumna(2);

    }
    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(@Inject(DOCUMENT) private _document: Document, private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private fb: FormBuilder, private mantenimientoService: MantenimientoService, private boletoService: BoletoService, private cuentaxCobrarService: CuentaxCobrarService, private injector: Injector) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Reporte Boletos')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.notifier = this.injector.get(ServiceMensaje);
    }
    buscar() {
        this.buscarboleto();
    }
    salir() {
        this.router.navigate(['/principal/default'], {
            skipLocationChange: true,
        });
    }

    cierreCliente(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaCliente(JSON.parse(event))
        }
    }
    selecttipo(row: DetallePago) {
        row.num_cheque = "";
        row.num_deposito = "";
        row.num_transferencia = "";
        row.valor_efectivo = "";
        row.valor_cheque = "";
        row.valor_deposito = "";
        row.valor_transferencia = "";
        this.calculo(row, 1);
    }
    seteaCliente(_datos: any) {
        this.iDocumento.cl_codigo = _datos.cl_codigo;
        this.iDocumento.cl_nombre = _datos.cl_nombre;

    }
    limpiarColor() {
        for (var i = 0; i < this.detalleboletopago.length; i++) {
            this.detalleboletopago[i].color = "";
        }
    }

    agregarlinea() {
        let _valorcab = this.lineagrid.fa_total;
        if (parseFloat(_valorcab) > parseFloat(this.totalColumna(2))) {
            let row: DetallePago = new DetallePago();
            row.sec = this.detalleregistropago.length + 1;
            row.seccab = this.lineagrid.sec;
            row.cc_codigo = this.lineagrid.cc_codigo;
            this.detalleregistropago.push(row);
        } else {
            this.mensaje("1", "No se puede agregar mas pago al boleto");
        }

    }
    borrarlinea() {
        let index = this.detalleregistropago.findIndex(key => key.sec === this.lineagridse);
        this.detalleregistropago.splice(index, 1);
    }
    irSeccion(id: string) {
        const element = document.querySelector("#" + id);
        if (element) {
            element.scrollIntoView({ block: "start", behavior: "smooth" });
        }

    }
    /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
    clickGrid(row: BoDetalleModel) {

        this.limpiarColor();
        row.color = "SG";
        this.irSeccion('vesAqui');
        if (this.detalleregistropago.length > 0) {
            for (var i = this.detalleregistropagogeneral.length - 1; i >= 0; i--) {
                if (this.detalleregistropagogeneral[i].seccab === this.lineagrid.sec) {
                    this.detalleregistropagogeneral.splice(i, 1);
                }
            }
            this.detalleregistropago.forEach((key) => {
                this.detalleregistropagogeneral.push(key);
            });
            this.detalleregistropago = [];
        } else {
            this.detalleregistropago.forEach((key) => {
                this.detalleregistropagogeneral.push(key);
            });
            this.detalleregistropago = [];
        }
        this.lineagrid = row;

        let listado = this.detalleregistropagogeneral.filter((key) => {
            return key.seccab === this.lineagrid.sec;
        });
        this.detalleregistropago = listado;
        this.lineaselect = "Registro Pago " + this.lineagrid.cl_nombre + " Factura " + this.lineagrid.factura + " Total " + this.lineagrid.fa_total;
    }

    limpiarColorseg() {
        for (var i = 0; i < this.detalleregistropago.length; i++) {
            this.detalleregistropago[i].color = "";
        }
    }
    clickGridp(row: DetallePago) {
        this.lineagridse = row.sec;
        this.limpiarColorseg();
        row.color = "SG";
    }
    limpiarColoralo() {
        //for (var i = 0; i < this.iDocumento.alojamiento_bo.length; i++) {
        //    this.iDocumento.alojamiento_bo[i].color = "";
        //}
    }
    clickGridalo(row: BoAlojamientoModel) {
        this.lineagridalo = row.sec;
        this.limpiarColoralo();
        row.color = "SG";
    }

    cierreModalcliente(event: any) {
        if (event) {
            this.hideModal()
        }
    }

    /**
  * DEFINICION DE FUNCION CIERRE HIDE DE MODALES
  */
    hideModal() {
        if (this.modalRef != undefined) {
            this.modalRef.hide();
        }
    }
    /**
  * DEFINICION DE FUNCION APERTURA DE MODAL
  */
    openModal(content: string) {
        this.modalRef = this.modalService.show(
            content);
    }
    openModalgr(content: string, tipo: string) {
        this.modalRef = this.modalService.show(
            content, { class: tipo });
    }
    mensaje(_tipo: string, _mensaje: string) {
        this.llamarmodal = _tipo + "|Registro Pago|" + _mensaje + "|" + Funcion.Ramdon().toString();
    }
    aceptarOk(event: boolean) {
        if (event) {
            this.cancelar();
        }
    }
    aceptarConfi(event: boolean) {
        if (event) {
            this.guardar();
        }
    }
}
