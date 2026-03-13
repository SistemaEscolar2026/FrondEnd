import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Funcion } from '@funciones/funciones';
import { MantenimientoService } from '@services/mantenimiento-service';
import { BoletoService } from '@services/boleto-service';
import { NgxSpinnerService } from "ngx-spinner";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BotonesModel } from '@modelo/botones-model';
import { globales, environment } from 'src/environments/environment';
import { ServiceMensaje } from '@services/config/ServiceMensaje';
import { CuentaxPagarService } from '@services/cuentaxpagar-service';
import { BoCabeceraModel } from '@modelo/bocabecera-model';
import { TotalModel } from '@modelo/total-model';
import * as moment from 'moment';
import { BoDetalleModel } from '@modelo/bodetalle-model';
import { BoSeguroModel } from '../modelo/boseguro-model';
import { BoAlojamientoModel } from '../modelo/boalojamiento-model';
import { DOCUMENT } from '@angular/common';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './ingresodocumetocxp.component.html',
    styleUrls: ['./ingresodocumetocxp.component.scss']
})
export class IngresoDocumentoCXPComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedaproveedor') modalbusquedaproveedor: any;
    @ViewChild('modalbusquedadocumentocxp') modalbusquedadocumentocxp: any;


    @ViewChild('modalbusquedaplancuenta') modalbusquedaplancuenta: any;

    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    impuestoporcentaje: number = 0;
    modalRef: any;
    llamarmodal: string = "";
    ColumnaDetalle: any[] = ['N. BOLETO', 'VALOR BOLETO', 'IVA', 'OTROS IMPUESTOS', 'TOTAL BOLETO', 'SERVICIO EMISION', 'IVA SERVICIO', 'TOTAL SERVICIOS', 'TOTAL BOLETO + SERVICIO', 'ESTADO', '', 'NETO', 'OTRO COSTO', 'FEES', 'SEGUROS', 'NAC/INT', '# RESERVA', 'PAGO', 'AUTORIZACION', 'RECIBO', 'PROVEEDOR', 'OBSERVACIONES'];
    ColumnaDetalleSeguro: any[] = ['TIPO SEGURO', 'VALOR', 'OBSERVACION'];
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
    tipoboletoid: string = "";
    /**
  * DEFINICION DE VARIABLE NOTIFICACION TIPO TOAS
  */
    notifier: any;
    submitted = false;
    habilitaobjetofrom: boolean = true;
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listcliente: any[] = [];
    listservicio: any[] = [];
    listaerolinea: any[] = [];
    listaauxilargen: any[] = [];
    listitipocomprobante: any[] = [];
    listclasecomprobante: any[] = [];
    iDocumento: any = {
        detalle: []
    };
    lineagrid: number = 0;
    lineagridse: number = 0;
    lineagridalo: number = 0;
    listEstado: any[] = [];
    listpersona: any[] = [];
    listEstados: any[] = [];
    listtipoauxiliar: any[] = [];
    listTipoViaje: any[] = [];
    listproveedor: any[] = [];
    listTipoDoc: any[] = [];
    listforma: any[] = [];
    listtiposeguro: any[] = [];
    listusuario: any[] = [];
    listboleto: any[] = [];
    listnaturaleza: any[] = [];
    listtipoalojamiento: any[] = [];
    listcuentas: any[] = [];
    listcabecera: any[] = [];
    listdetalle: any[] = [];
    lineaseguro: BoSeguroModel = new BoSeguroModel();
    lineaalojamiento: BoAlojamientoModel = new BoAlojamientoModel();
    smensaje = "";
    isAccion: string = "";
    /**
   * DEFINICION DE VARIABLE DE MODELO DE VENDEDOR
   */
    model: any = {};
    alto: string = "";
    /**
 * DEFINICION DE FUNCION INIT DE LA CLASE
 */
    ngOnInit() {
        this.listEstado = Funcion.Estado();
        this.listTipoViaje = Funcion.TipoViaje();
       // this.cargaTipoComprobante();
        this.cargaTipoDocumento();
        this.limpiabotones(1);
        var _Datos: any[] = [];
        _Datos = Funcion.returdatosession("parametro");
        try {
            let dato: number = _Datos.findIndex((key) => key.pa_descripcion === "IMPUESTO");
            this.impuestoporcentaje = parseFloat(_Datos[dato].pa_valor);
        } catch (e) {
            this.impuestoporcentaje = 12;
        }
        this.listEstados = Funcion.EstadoBoletos();
  //      this.cargaClaseContable();
        this.cargaServicio();
        this.cargaDocumentoCXP();
        this.cargaAuxiliargenera();
        this.listnaturaleza = Funcion.ListNaturaleza();
        this.cargaTipoAuxiliar();
        this.cargaUsuario();
        this.alto = ((screen.height / 2) - 50).toString();

    }
    cargaUsuario() {
        this.spinner.show();
        this.mantenimientoService.manUsuario(globales.cia).subscribe(data => {
            try {
                this.listusuario = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cargaTipoComprobante() {
        this.spinner.show();
        this.mantenimientoService.getTipoComprobante(globales.cia).subscribe(data => {
            try {
                this.listitipocomprobante = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cargaProveedor() {
        this.spinner.show();
        this.mantenimientoService.manProveedor(globales.cia).subscribe(data => {
            try {
                this.listproveedor = data.root[0];
                this.openModal(this.modalbusquedaproveedor);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cargaTipoDocumento() {
        this.spinner.show();
        this.mantenimientoService.manTipoDocumento(globales.cia).subscribe(data => {
            try {
                this.listTipoDoc = data.root[0];

                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cargaClaseContable() {
        this.spinner.show();
        this.mantenimientoService.getClaseContable(globales.cia).subscribe(data => {
            try {
                this.listclasecomprobante = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }


    cargaDocumentoCXP() {
        this.spinner.show();
        this.cuentaxPagarService.getDocumentoCXP(globales.cia).subscribe(data => {
            try {
                this.listcabecera = data.root[0];
                this.listdetalle = data.root[1];
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


    insertAsiento() {
        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;
        this.iDocumento.us_codigoreg = Funcion.returdatosession("usuario").us_codigo;

        this.iDocumento.cxp_total_debe = this.calculo('D');
        this.iDocumento.cxp_total_haber = this.calculo('A');

        this.iDocumento.detalle.forEach((k: any) => {
            if (k.cpd_naturaleza === 'D') {
                k.cpd_debe = k.valor;
            } else {
                k.cpd_haber = k.valor;
            }
        });
        this.cuentaxPagarService.InsertDocumentoCXP(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    this.mensaje("3", data.msgError);
                    this.limpiabotones(1);
                    this.habilitarfrom(1);
                    this.cargaDocumentoCXP();
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
    updateAsiento() {
        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;


        this.iDocumento.cxp_total_debe = this.calculo('D');
        this.iDocumento.cxp_total_haber = this.calculo('A');

        this.iDocumento.detalle.forEach((k: any) => {
            if (k.cpd_naturaleza === 'D') {
                k.cpd_debe = k.valor;
            } else {
                k.cpd_haber = k.valor;
            }
        });
        this.cuentaxPagarService.UpdateDocumentoCXP(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    this.mensaje("3", data.msgError);
                    this.limpiabotones(1);
                    this.habilitarfrom(1);
                    this.cargaDocumentoCXP();
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
    guardarAsiento() {
        this.submitted = true;
        this.validar();
        if (this.submitted === true) {
            if (this.smensaje != "") {
                this.mensaje("1", this.smensaje);
            }
            return
        } else {
            if (this.isAccion === "I") {
                this.insertAsiento();
            }
            if (this.isAccion === "M") {
                this.updateAsiento();
            }
        }
    }
    validar() {
        this.smensaje = "";
        this.submitted = false;
        if (this.iDocumento.cxp_tipo_doc === "" || this.iDocumento.cxp_tipo_doc === undefined) {
            this.submitted = true;
            return;
        }
        if (this.iDocumento.us_codigo === "" || this.iDocumento.us_codigo === undefined) {
            this.submitted = true;
            return;
        }
        if (this.iDocumento.pr_nombre === "" || this.iDocumento.pr_nombre === undefined) {
            this.submitted = true;
            return;
        }
        if (this.iDocumento.detalle.length > 0) {
            for (var i = 0; i < this.iDocumento.detalle.length; i++) {
                if (this.iDocumento.detalle[i].cpc_codigo_co === "" || this.iDocumento.detalle[i].cpc_codigo_co === undefined) {
                    this.smensaje = "No ha seleccionado una cuenta en la linea " + this.iDocumento.detalle[i].cpd_linea + " del asiento. Por favor verificar";
                    this.submitted = true;
                    return;
                }
                if (this.iDocumento.detalle[i].cta_codigo === "" || this.iDocumento.detalle[i].cta_codigo === undefined) {
                    this.smensaje = "No ha seleccionado un tipo auxiliar en la linea " + this.iDocumento.detalle[i].cpd_linea + " del asiento. Por favor verificar";
                    this.submitted = true;
                    return;
                }
                //if (this.iDocumento.detalle[i].coa_codigo === "" || this.iDocumento.detalle[i].coa_codigo === undefined) {
                //    this.smensaje = "No ha seleccionado un auxiliar en la linea " + this.iDocumento.detalle[i].cpd_linea + " del asiento. Por favor verificar";
                //    this.submitted = true;
                //    return;
                //}
                if (this.iDocumento.detalle[i].valor === "" || this.iDocumento.detalle[i].valor === undefined) {
                    this.smensaje = "No insegrado un valor en la linea " + this.iDocumento.detalle[i].cpd_linea + " del asiento. Por favor verificar";
                    this.submitted = true;
                    return;
                }
            }
        } else {
            this.smensaje = "Debe Ingresar dos linea de detalle en el asiento contable";
            this.submitted = true;
            return;
        }
        if (this.calculo('D') != this.calculo('A')) {
            this.smensaje = "Comprobante descuadrado por favor verificar";
            this.submitted = true;
            return;
        }
        this.calculototal();

    }
    cierreProveedor(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaProveedor(JSON.parse(event))
        }
    }
    seteaProveedor(dato: any) {

        this.iDocumento.pr_codigo = dato.pr_codigo;
        this.iDocumento.pr_nombre = dato.pr_nombre;
        this.iDocumento.cl_direccion = dato.cl_direccion;
        this.iDocumento.cl_correo = dato.cl_correo;

        //this.iDocumento.costos_bo.costo_proveedor.pr_codigo = dato.pr_codigo;
        //this.iDocumento.costos_bo.costo_proveedor.pr_codigodesc = dato.pr_nombre;
    }
    cierreModalproveedor(event: any) {
        if (event) {
            this.hideModal()
        }
    }
    cambiosino() {
        if (this.iDocumento.bc_tipo_viaje === "N") {
            this.iDocumento.bc_fecha_fin_viaje = "";
        } else {
            var fecha = new Date();
            var formatoFecha = moment(fecha);
            this.iDocumento.bc_fecha_fin_viaje = formatoFecha.format("YYYY-MM-DD").toString();
        }
    }
    /**
  * DEFINICION DE FUNCION PARA LIMPIAR LOS SECCION DE BOTONES
  */
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
                this.iDocumento = {};
                this.iDocumento.pr_nombre = "";
                this.iDocumento.cxp_tipo_doc = "";
                this.iDocumento.us_codigo = "";
                var fecha = new Date();
                var formatoFecha = moment(fecha);
                this.iDocumento.cob_tipo = "";
                this.iDocumento.ccc_codigo = "";
                this.iDocumento.cxp_fecha_registro = formatoFecha.format("YYYY-MM-DD").toString()
                this.iDocumento.cob_fecha_contable = formatoFecha.format("YYYY-MM-DD").toString();
                this.submitted = false;
                this.iDocumento.detalle = [];
                this.iDocumento.cxp_estado = "A";
                this.listpersona = [];
                this.tipoboletoid = "";
                break;
            case 2:
                this.botones.btnnuevo = true;
                this.botones.btnmodificar = true;
                this.botones.btngrabar = false
                this.botones.btneliminar = true;
                this.botones.btncancelar = false;
                this.botones.btnbuscar = true;
                this.botones.btnsalir = false;
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
                this.isAccion = "C";
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
    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(@Inject(DOCUMENT) document: Document, private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private cuentaxPagarService: CuentaxPagarService, private fb: FormBuilder, private mantenimientoService: MantenimientoService, private boletoService: BoletoService, private injector: Injector) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Ingreso de Comprobantes')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.notifier = this.injector.get(ServiceMensaje);
    }
    buscar(id: string) {
        this.openModal(this.modalbusquedadocumentocxp);


    }
    buscarcam() {

    }
    salir() {
        this.router.navigate(['/principal/default'], {
            skipLocationChange: true,
        });
    }
    deleteAsiento() {
        this.spinner.show();
        this.iDocumento.cxp_estado = "D";
        this.cuentaxPagarService.DeleteDocumentoCXP(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.cargaDocumentoCXP();
                    this.habilitarfrom(1);
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

    cierredocumentocxp(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaAsientoContable(JSON.parse(event))
        }
    }
    seteaAsientoContable(dato: any) {
        this.iDocumento = dato;
        this.iDocumento.detalle = this.listdetalle.filter(function (k) {
            return k.cxp_codigo === dato.cxp_codigo;
        });

        this.iDocumento.detalle.forEach((k: any) => {
            this.cargaAuxiliar(k);
            if (k.cpd_naturaleza === "D") {
                k.valor = k.cpd_debe;
            } else {
                k.valor = k.cpd_haber;
            }
            this.calculo(k);
        });

        this.limpiabotones(3);
    }

    cierrePlanCuenta(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaPlanCuenta(JSON.parse(event))
        }
    }
    seteaPlanCuenta(dato: any) {
        let _index = this.iDocumento.detalle.findIndex((k: any) => k.cpd_linea === this.lineagrid);
        this.iDocumento.detalle[_index].cpc_codigo = dato.cpc_codigo;
        this.iDocumento.detalle[_index].cpc_codigo_co = dato.cpc_codigo_co;
        this.iDocumento.detalle[_index].cpd_descripcion = dato.cpc_descripcion;

    }
    cargaPlanCuenta(row: any) {
        this.lineagrid = row.cpd_linea;
        this.limpiarColor();
        row.color = "SG";
        this.spinner.show();
        this.mantenimientoService.manPlanCuenta(globales.cia).subscribe(data => {
            try {
                this.listcuentas = data.root[0];
                this.openModal(this.modalbusquedaplancuenta);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cargaServicio() {
        this.spinner.show();
        this.mantenimientoService.manServicioAdicional(globales.cia).subscribe(data => {
            try {
                this.listservicio = [];
                this.listservicio.push({
                    sa_codigo: "",
                    sa_descripcion: ""
                });
                data.root[0].forEach((key: any) => {
                    this.listservicio.push({
                        sa_codigo: key.sa_codigo,
                        sa_descripcion: key.sa_descripcion
                    });
                })
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cierreCliente(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaCliente(JSON.parse(event))
        }
    }


    seteaCliente(_datos: any) {
        this.iDocumento.cl_codigo = _datos.cl_codigo;
        this.iDocumento.cl_nombre = _datos.cl_nombre;

    }
    limpiarColor() {
        for (var i = 0; i < this.iDocumento.detalle.length; i++) {
            this.iDocumento.detalle[i].color = "";
        }
    }
    /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
    clickGrid(row: any) {
        this.lineagrid = row.cpd_linea;
        this.limpiarColor();
        row.color = "SG";
    }
    limpiarColorseg() {
        //for (var i = 0; i < this.iDocumento.seguro_bo.length; i++) {
        //    this.iDocumento.seguro_bo[i].color = "";
        //}
    }
    clickGridseg(row: BoSeguroModel) {
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
    cambio(linea: BoDetalleModel) {

    }
    calculo(natu: string) {
        var valor: number = 0;

        this.iDocumento.detalle.forEach((k: any) => {
            if (natu === k.cpd_naturaleza) {
                valor = valor + ((k.valor === "" || k.valor === undefined) ? 0 : parseFloat(k.valor));
            }

         
            //if (k.cpd_naturaleza === "D") {
            //    this.iDocumento.cxp_monto = ((this.iDocumento.cxp_monto === "" || this.iDocumento.cxp_monto === undefined) ? 0 : parseFloat(this.iDocumento.cxp_monto)) + ((k.valor === "" || k.valor === undefined) ? 0 : parseFloat(k.valor));

            //}

        });

        if (natu === 'A') {
            this.iDocumento.cxp_monto = valor;
        }

        return valor;
    }
    calculototal() {
        if (this.calculo('A') === this.calculo('D')) {
            this.iDocumento.cxp_monto = this.calculo('A');
        }

    }
    cargaAuxiliargenera() {
        this.spinner.show();
        this.mantenimientoService.manAuxiliar(globales.cia).subscribe(data => {
            try {
                this.listaauxilargen = data.root[0];

                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cargaAuxiliar(row: any) {
        row.listauxiliar = this.listaauxilargen.filter((k) => k.cta_codigo === parseInt(row.cta_codigo));
    }
    cargaTipoAuxiliar() {
        this.spinner.show();
        this.mantenimientoService.manTipoAuxiliar(globales.cia).subscribe(data => {
            try {
                this.listtipoauxiliar = data.root[0];

                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    agregarlinea() {
        var _linea: any = {};
        _linea.cpd_linea = this.iDocumento.detalle.length + 1;
        _linea.cpc_codigo = "";
        _linea.cpd_descripcion = "";
        _linea.cta_codigo = "";
        _linea.coa_codigo = "";
        _linea.cpd_naturaleza = "A";
        _linea.valor = "0";
        _linea.cod_descripcion = "";

        this.iDocumento.detalle.push(_linea);

    }
    duplicarlinea() {
        if (this.lineagrid === 0) {
            this.mensaje("1", "Debe Seleccionar una linea para duplicar");
        } else {

        }
    }
    borrarlinea() {
        let index = this.iDocumento.detalle.findIndex((key: any) => key.cpd_linea === this.lineagrid);
        this.iDocumento.detalle.splice(index, 1);
        //  this.calculo();
    }
    cierreRutas(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaRuta(JSON.parse(event))
        }
    }
    cierreForma(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaForma(JSON.parse(event))
        }
    }
    cierreModalrutas(event: any) {
        if (event) {
            this.hideModal()
        }
    }
    cierreModalforma(event: any) {
        if (event) {
            this.hideModal()
        }
    }
    cierreModalcliente(event: any) {
        if (event) {
            this.hideModal()
        }
    }
    seteaForma(_datos: any) {

        //this.iDocumento.costos_bo.fp_codigo = _datos.fp_codigo;
        //this.iDocumento.costos_bo.ds_forma = _datos.fp_descripcion;
    }
    seteaRuta(_datos: any) {
        this.iDocumento.rut_codigo = _datos.rut_codigo;
        this.iDocumento.rut_discripcion = _datos.rut_ruta;

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
        this.llamarmodal = _tipo + "|Ingreso de Documento CXP|" + _mensaje + "|" + Funcion.Ramdon().toString();
    }
    aceptarOk(event: boolean) {
        if (event) {
            this.limpiabotones(1); this.habilitarfrom(4);
        }
    }
}
