import { Component, Inject, Injector, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Funcion } from '@funciones/funciones';
import { MantenimientoService } from '@services/mantenimiento-service';
import { BoletoService } from '@services/boleto-service';

import { FacturacionService } from '@services/facturacion-service';
import { CuentaxCobrarService } from '@services/cuentaxcobrar-service';
import { NgxSpinnerService } from "ngx-spinner";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BotonesModel } from '@modelo/botones-model';
import { globales, environment } from 'src/environments/environment';
import { ServiceMensaje } from '@services/config/ServiceMensaje';
import * as moment from 'moment';

import { DOCUMENT } from '@angular/common';
import { createMask } from '@ngneat/input-mask';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './registroretencion.component.html',
    styleUrls: ['./registroretencion.component.scss']
})
export class IngresoRetencionComponent implements OnInit {

    @ViewChild('busquedaretenciones') busquedaretenciones: any;
    @ViewChild('modalbusquedafactura') modalbusquedafactura: any;
    router: Router;
    notifier: any;
    submitted = false;
    habilitaobjetofrom: boolean = true;
    habilitaret: boolean = true;
    iDocumento: any = {};
    llamarmodal: string = "";
    isAccion: string = "";
    botones: BotonesModel = new BotonesModel();
    smensaje = "";
    lineagridserwet: string = "";
    listretenciones: any[] = [];
    listfacturas: any[] = [];
    listotiporetencion: any[] = [];
    listoretiva: any[] = [];
    listoretrenta: any[] = [];
    detalleregistroretencion: any[] = [];
    modalRef: any;
    constructor(@Inject(DOCUMENT) private _document: Document, private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private fb: FormBuilder, private mantenimientoService: MantenimientoService, private boletoService: BoletoService, private cuentaxCobrarService: CuentaxCobrarService, private facturacionService: FacturacionService, private injector: Injector) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Ingreso Retencion')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.notifier = this.injector.get(ServiceMensaje);
        this.listotiporetencion = Funcion.TipoRetencion();
        this.cargaRetenciones();
        this.cancelar();
    }

    ngOnInit() {
        var _Datos: any[] = [];
        this.limpiabotones(1);

    }
    cargaRetenciones() {
        this.spinner.show();
        this.facturacionService.retonoRetenciones(globales.cia).subscribe(data => {
            try {
                this.listoretiva = data.root[0];
                this.listoretrenta = data.root[1];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    limpiarColorsegret() {
        for (var i = 0; i < this.detalleregistroretencion.length; i++) {
            this.detalleregistroretencion[i].color = "";
        }
    }
    clickGridpret(row: any) {
        this.lineagridserwet = row.crp_linea;
        this.limpiarColorsegret();
        row.color = "SG";
    }
    cogeRetencion(row: any) {

    }
    cogevalorret(row: any) {
        let index = this.detalleregistroretencion.findIndex(key => key.crp_linea === this.lineagridserwet);
        if (row.red_tipo_retenciones === "01") {
            let idx = this.listoretiva.findIndex(k => k.rt_codigo === parseInt(row.rt_codigo));
            row.red_porcentaje = this.listoretiva[idx].rt_porcentaje;
        } else {
            let idx = this.listoretrenta.findIndex(k => k.rt_codigo === parseInt(row.rt_codigo));
            row.red_porcentaje = this.listoretrenta[idx].rt_porcentaje;
        }
        this.detalleregistroretencion.forEach((key) => {
            if (key.red_tipo_retenciones === "01") {
                key.red_valor = (parseFloat(this.iDocumento.fa_iva) * parseFloat(key.red_porcentaje)) / 100;
            } else {
                key.red_valor = (parseFloat(this.iDocumento.fa_subtotal) * parseFloat(key.red_porcentaje)) / 100;
            }
        });
        //this.totalColumna(1);
    }
    agregarlinearet() {
        if (this.iDocumento.fa_codigo === "") {
            this.mensaje("1", "Debe selecciona una factura para aplicar la retencion");
            return;
        }
        this.detalleregistroretencion.push({
            crp_linea: this.detalleregistroretencion.length + 1,
            red_tipo_retenciones: (parseFloat(this.iDocumento.fa_baseiva) > 0) ? "01" : "02",
            rt_codigo: "",
            red_porcentaje: 0,
            red_valor: ""
        });


        if (parseFloat(this.iDocumento.fa_baseiva) > 0) {
            this.habilitaret = false;
        } else {
            this.habilitaret = true;
        }
    }
    borrarlinearet() {
        let index = this.detalleregistroretencion.findIndex(key => key.crp_linea === this.lineagridserwet);

        this.detalleregistroretencion.splice(index, 1);
    }
    cierreFactura(event: string) {
        if (event !== "") {
            this.hideModal()
            this.buscarfacturaselect(event);
        }
    }
    buscarfacturaselect(linea: string) {
        this.spinner.show();
        this.facturacionService.getFacturaSelect(globales.cia, linea).subscribe(data => {
            try {

                var datos: any = data.root[0][0];
                var detalleregistrofactura: any[] = data.root[1];
                this.iDocumento.fa_codigo = datos.fa_codigo;

                this.iDocumento.fa_tipofactura = datos.fa_tipofactura;
                this.iDocumento.fa_observacion = datos.fa_observacion;
                this.iDocumento.fa_numero_factura = datos.fa_establecimiento + "-" + datos.fa_punto_emision + "-" + datos.fa_secuencial;
                this.iDocumento.cl_nombre = datos.cl_nombre;
                this.iDocumento.fa_fecha_factura = moment(datos.fa_fecha_factura).format("YYYY-MM-DD").toString();

                if (datos.fa_tipofactura === 'B') {
                    detalleregistrofactura.forEach((key) => {
                        this.iDocumento.fa_subtotal = parseFloat(this.iDocumento.fa_subtotal) + parseFloat((key.fd_subtotal === "") ? 0 : key.fd_subtotal);
                        this.iDocumento.fa_subtotalexento = parseFloat(this.iDocumento.fa_subtotalexento) + parseFloat((key.fd_base0 === "") ? 0 : key.fd_base0);
                        this.iDocumento.fa_baseiva = parseFloat(this.iDocumento.fa_baseiva) + parseFloat((key.fd_baseiva === "") ? 0 : key.fd_baseiva);
                        this.iDocumento.fa_iva = parseFloat(this.iDocumento.fa_iva) + parseFloat((key.fd_iva === "") ? 0 : key.fd_iva);
                        this.iDocumento.fa_total = parseFloat(this.iDocumento.fa_total) + parseFloat((key.fd_total === "") ? 0 : key.fd_total);
                    });
                } else {
                    detalleregistrofactura.forEach((key) => {
                        this.iDocumento.fa_subtotal = parseFloat(this.iDocumento.fa_subtotal) + parseFloat((key.fd_subtotal === "") ? 0 : key.fd_subtotal);
                        this.iDocumento.fa_subtotalexento = parseFloat(this.iDocumento.fa_subtotalexento) + (parseFloat((key.fd_base0 === "") ? 0 : key.fd_base0) * ((key.fd_cantidad === "") ? 1 : key.fd_cantidad));
                        this.iDocumento.fa_baseiva = parseFloat(this.iDocumento.fa_baseiva) + (parseFloat((key.fd_baseiva === "") ? 0 : key.fd_baseiva) * ((key.fd_cantidad === "") ? 1 : key.fd_cantidad));
                        this.iDocumento.fa_iva = parseFloat(this.iDocumento.fa_iva) + parseFloat((key.fd_iva === "") ? 0 : key.fd_iva);
                        this.iDocumento.fa_total = parseFloat(this.iDocumento.fa_total) + parseFloat((key.fd_total === "") ? 0 : key.fd_total);
                    });
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
    buscarfactura() {
        this.spinner.show();
        this.boletoService.getFacturaRet(globales.cia).subscribe(data => {
            try {
                this.listfacturas = data.root[0];
                this.openModalgr(this.modalbusquedafactura, "modal-lg modal-primary");
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.mensaje("2", err.message);
            this.spinner.hide();
        });

    }

    limpiabotones(_dato: Number) {
        switch (_dato) {
            case 1:
                this.botones.btnnuevo = false;
                this.botones.btnmodificar = true;
                this.botones.btngrabar = true
                this.botones.btneliminar = true;
                this.botones.btncancelar = false;
                this.botones.btnbuscar = false;
                this.botones.btnsalir = false
                var fecha = new Date();
                var formatoFecha = moment(fecha);
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
    validar() {
        this.smensaje = "";

        if (this.iDocumento.fa_codigo === "" || this.iDocumento.fa_codigo === null || this.iDocumento.fa_codigo === undefined) {
            this.smensaje = "No ha seleccionado ninguna factura ...Por Favor Revisar"
            return;
        }
        if (this.iDocumento.ret_fecha_registro === "" || this.iDocumento.ret_fecha_registro === null || this.iDocumento.ret_fecha_registro === undefined) {
            this.smensaje = "No ha ingresado la fecha de la retencion ...Por Favor Revisar"
            return;
        }
        if (this.iDocumento.ret_numero_retencion === "" || this.iDocumento.ret_numero_retencion === null || this.iDocumento.ret_numero_retencion === undefined) {
            this.smensaje = "No ha ingresado el numero de la retencion ...Por Favor Revisar"
            return;
        }

        if (this.iDocumento.ret_numero_retencion.length<15) {
            this.smensaje = "El numero de la retencion debe tener una longitud de 15 ...Por Favor Revisar"
            return;
        }
        if (this.iDocumento.ret_autorizacion === "" || this.iDocumento.ret_autorizacion === null || this.iDocumento.ret_autorizacion === undefined) {
            this.smensaje = "No ha ingresado el numero de autorizacion de la retencion ...Por Favor Revisar"
            return;
        }

        if (this.detalleregistroretencion.length <= 0) {
            this.smensaje = "Debe ingresar por lo menos una retencion ...Por Favor Revisar"
            return;
        }
    }
    guardar() {
        this.validar();
        if (this.smensaje != "") {
            this.mensaje("1", this.smensaje);
            return
        } else {
            if (this.isAccion === "I") {
                this.insertRetencion();
            }
            if (this.isAccion === "M") {
                this.updateRetencion();
            }
        }
    }
    insertRetencion() {
        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;
        this.iDocumento.ret_estado = 1;
        this.iDocumento.us_codigo = Funcion.returdatosession("usuario").us_codigo;
        this.iDocumento.detalle = this.detalleregistroretencion;
        this.facturacionService.insertRetencionFactura(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    var mensaje: string = "";
                    mensaje = mensaje + data.msgError + "<br/>";
                    var _datos: any[] = [];
                    //_datos = data.root[0];
                    //_datos.forEach((k: any) => {
                    //    mensaje = mensaje + k.mensaje + "<br/>";
                    //});
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
    updateRetencion() {

    }
    deleteRetencion() {
        this.spinner.show();
        this.iDocumento.ret_estado = 0;
        this.facturacionService.deleteFacturaRet(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.habilitarfrom(4);
                    this.cancelar();
                } else {
                    this.notifier.showError(data.msgError);
                }
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.notifier.showError(err.error.Message);
            this.spinner.hide();
        });
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
    buscar() {
        this.buscarretencion();
    }
    buscarretencion() {
        this.spinner.show();
        this.boletoService.getRetencionFactura(globales.cia).subscribe(data => {
            try {
                this.listretenciones = data.root[0];
                this.openModalgr(this.busquedaretenciones, "modal-lg modal-primary");
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.mensaje("2", err.message);
            this.spinner.hide();
        });

    }
    buscarretencionesslect(linea: string) {
        this.spinner.show();
        this.facturacionService.getFacturaRetSelect(globales.cia, linea).subscribe(data => {
            try {
                  var datos: any = {};
                datos = data.root[0][0];
                this.iDocumento = {};
                this.iDocumento.fa_subtotal = "0";
                this.iDocumento.fa_subtotalexento = "0";
                this.iDocumento.fa_baseiva = "0";
                this.iDocumento.fa_iva = "0";
                this.iDocumento.fa_total = "0";

                this.iDocumento.ret_codigo = datos.ret_codigo;
                this.iDocumento.co_codigo = datos.co_codigo;
                this.iDocumento.ret_numero_retencion = datos.ret_numero_retencion;
                this.iDocumento.ret_autorizacion = datos.ret_autorizacion;
                this.iDocumento.ret_fecha_registro = moment(datos.ret_fecha_registro).format("YYYY-MM-DD").toString();
                this.detalleregistroretencion = data.root[1];

     
                this.limpiabotones(3);
                this.spinner.hide();

                this.buscarfacturaselect(datos.fa_codigo);
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.mensaje("2", err.message);
            this.spinner.hide();
        });

    }
    cancelar() {
        this.limpiabotones(1);
        this.habilitarfrom(4);
        this.iDocumento = {};
        this.iDocumento.fa_codigo = "";
        this.iDocumento.fa_subtotal = "0";
        this.iDocumento.fa_subtotalexento = "0";
        this.iDocumento.fa_baseiva = "0";
        this.iDocumento.fa_iva = "0";
        this.iDocumento.fa_total = "0";

        this.detalleregistroretencion = [];
    }
    confirmareliminar() {
        this.mensaje("5", "Esta seguro de eliminar la Retencion a Factura N°." + this.iDocumento.ret_numero_retencion);

    }
    modificarretencion() {
        if (this.iDocumento.cxp_estado_electronico === 'RG') {
            this.habilitarfrom(3);
            this.limpiabotones(2);
        } else {
            this.mensaje("1", "No se puede modificar la factura por pagar ya esta en proceso la retencion en el sri ...Por Favor Revisar")
            return;
        }
    }
    confirmarguardar() {

        if (this.isAccion === "I") {
            this.mensaje("4", "Esta seguro de guardar la Retencion de factura");
        } else if (this.isAccion === "M") {
            this.mensaje("4", "Esta seguro de modificar la Retencion de factura");
        }

    }
    hideModal() {
        if (this.modalRef != undefined) {
            this.modalRef.hide();
        }
    }
    cierreModal(event: any) {
        if (event) {
            this.hideModal()
        }
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
    aceptarConfiEli(event: boolean) {
        if (event) {
            this.deleteRetencion();
        }
    }
    aceptarConficarga(event: boolean) {
        if (event) {

        }
    }
    cierreRetenciones(event: string) {
        if (event !== "") {
            this.hideModal()
            this.buscarretencionesslect(event);
        }
    }
    salir() {
        this.router.navigate(['/principal/default'], {
            skipLocationChange: true,
        });
    }
    openModalgr(content: string, tipo: string) {
        this.modalRef = this.modalService.show(
            content, { class: tipo });
    }
    mensaje(_tipo: string, _mensaje: string) {
        this.llamarmodal = _tipo + "|Registro Retencion a Factura|" + _mensaje + "|" + Funcion.Ramdon().toString();
    }

}
