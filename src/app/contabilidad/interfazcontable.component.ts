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
    templateUrl: './interfazcontable.component.html',
    styleUrls: ['./interfazcontable.component.scss']
})
export class InterfazContableComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */

    

    @ViewChild('modalbusquedainterfazcontable') modalbusquedainterfazcontable: any
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
        detalle:[]
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
    listforma: any[] = [];
    listtiposeguro: any[] = [];
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
        this.cargaTipoComprobante();
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
        this.cargaClaseContable();
        this.cargaServicio();
        this.cargaAuxiliargenera();
        this.cargaInterfaz();
        this.listnaturaleza = Funcion.ListNaturaleza();
        this.cargaTipoAuxiliar();
        this.alto = ((screen.height / 2) - 50).toString();

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
    cargaInterfaz() {
        this.spinner.show();
        this.boletoService.getInterfazContable(globales.cia).subscribe(data => {
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

    buscarTicket(row: BoDetalleModel) {
        if (row.bd_ticket != "") {
            var detalle: BoDetalleModel = new BoDetalleModel();
            detalle.bd_ticket = row.bd_ticket;
            this.spinner.show();
            this.boletoService.buscarBoleto(detalle).subscribe(data => {
                this.spinner.hide();
                if (data.success === false) {
                    row.bd_ticket = "";
                    this.mensaje("2", data.msgError);
                    document.getElementById("sec" + row.sec.toString())?.focus();
                }
            }, () => {
                this.spinner.hide();
            });
        }

    }
    cargaPersona() {
        this.spinner.show();
        this.mantenimientoService.manPersona(globales.cia, this.iDocumento.cl_codigo.toString()).subscribe(data => {
            try {
                this.listpersona = data.root[0];
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

 
    insertInterfazContable() {
        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;
        this.iDocumento.us_codigo = Funcion.returdatosession("usuario").us_codigo;



        this.boletoService.insertInterfazContable(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    this.mensaje("3", data.msgError);
                    this.limpiabotones(1);
                    this.habilitarfrom(1);
                    this.cargaInterfaz();
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
    updateInterfazContable() {
        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;
        this.boletoService.updateInterfazContable(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    this.mensaje("3", data.msgError);
                    this.limpiabotones(1);
                    this.habilitarfrom(1);
                    this.cargaInterfaz();
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
    guardarInterfazContable() {
        this.submitted = true;
        this.validar();
        if (this.submitted === true) {
            if (this.smensaje != "") {
                this.mensaje("1", this.smensaje);
            }
            return
        } else {
            if (this.isAccion === "I") {
                this.insertInterfazContable();
            }
            if (this.isAccion === "M") {
                this.updateInterfazContable();
            }
        }
    }
    validar() {
        var debe: number = 0;
        var haber: number = 0;
        this.smensaje = "";
        this.submitted = false;
        if (this.iDocumento.cob_tipo === "" || this.iDocumento.cob_tipo === undefined) {
            this.submitted = true;
            return;
        }
        this.iDocumento.detalle.forEach((k: any) => {
            if (k.cdi_naturaleza === "D") {
                debe++;
            } else {
                haber++;
            }
        });

        if (!(debe > 0 && haber>0)) {
            this.smensaje = "Debe ingresa por lo menos una cuenta deudora y acredora. por favor verificar";
            this.submitted = true;
            return;
        }

        if (this.iDocumento.detalle.length > 0) {
            for (var i = 0; i < this.iDocumento.detalle.length; i++) {
                if (this.iDocumento.detalle[i].cpc_codigo_co === "" || this.iDocumento.detalle[i].cpc_codigo_co === undefined) {
                    this.smensaje = "No ha seleccionado una cuenta en la linea " + this.iDocumento.detalle[i].cdi_linea + " del asiento. Por favor verificar";
                    this.submitted = true;
                    return;
                }
                if (this.iDocumento.detalle[i].cta_codigo === "" || this.iDocumento.detalle[i].cta_codigo === undefined) {
                    this.smensaje = "No ha seleccionado un tipo auxiliar en la linea " + this.iDocumento.detalle[i].cdi_linea + " del asiento. Por favor verificar";
                    this.submitted = true;
                    return;
                }
                if (this.iDocumento.detalle[i].coa_codigo === "" || this.iDocumento.detalle[i].coa_codigo === undefined) {
                    this.smensaje = "No ha seleccionado un auxiliar en la linea " + this.iDocumento.detalle[i].cdi_linea + " del asiento. Por favor verificar";
                    this.submitted = true;
                    return;
                }
            }
        } else {
            this.smensaje = "Debe Ingresar dos linea de detalle en el asiento contable";
            this.submitted = true;
            return;
        }

    }

    cierreInterfazContable(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaInterfazContable(JSON.parse(event))
        }
    }
    seteaInterfazContable(dato: any) {
        this.iDocumento = dato;
        this.iDocumento.detalle = this.listdetalle.filter(function (k) {
            return k.cci_codigo === dato.cci_codigo;
        });

        this.iDocumento.detalle.forEach((k: any) => {
            this.cargaAuxiliar(k);
            if (k.cod_naturaleza === "D") {
                k.valor = k.cod_debe;
            } else {
                k.valor = k.cod_haber;
            }
        });
        this.limpiabotones(3);

    }
    cierreProveedor(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaProveedor(JSON.parse(event))
        }
    }
    seteaProveedor(dato: any) {

     

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
                var fecha = new Date();
                var formatoFecha = moment(fecha);
                this.iDocumento.cob_tipo = "";
                this.iDocumento.cci_fecha_registro = formatoFecha.format("YYYY-MM-DD").toString()
                this.submitted = false;
                this.iDocumento.detalle = [];
                this.iDocumento.cci_estado = "A";
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
    constructor(@Inject(DOCUMENT) document: Document, private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private fb: FormBuilder, private mantenimientoService: MantenimientoService, private boletoService: BoletoService, private injector: Injector) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Interfaz Contable')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.notifier = this.injector.get(ServiceMensaje);
    }
    buscar(id: string) {
        this.openModal(this.modalbusquedainterfazcontable);

    }
    buscarcam() {

    }
    salir() {
        this.router.navigate(['/principal/default'], {
            skipLocationChange: true,
        });
    }
    deleteInterfazContable() {
        this.spinner.show();
        this.iDocumento.cci_estado = "D";
        this.boletoService.deleteInterfazContable(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    //this.limpiarcontrato();
                    this.habilitarfrom(1);
                    this.cargaInterfaz();
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
    cierrePlanCuenta(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaPlanCuenta(JSON.parse(event))
        }
    }
    seteaPlanCuenta(dato: any) {
        let _index = this.iDocumento.detalle.findIndex((k: any) => k.cdi_linea === this.lineagrid);
        this.iDocumento.detalle[_index].cpc_codigo = dato.cpc_codigo;
        this.iDocumento.detalle[_index].cpc_codigo_co = dato.cpc_codigo_co;
        this.iDocumento.detalle[_index].cpc_descripcion = dato.cpc_descripcion;
    }
    cargaPlanCuenta(row:any) {
        this.lineagrid = row.cdi_linea;
        this.limpiarColor();
        row.color = "SG";
        this.spinner.show();
        this.mantenimientoService.manPlanCuentaM(globales.cia).subscribe(data => {
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
    selectBoleto(bc_codigo: string) {
        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;
        this.boletoService.getBoletoSelect(globales.cia, bc_codigo).subscribe(data => {
            try {
                if (data.success) {
                    let linea = 1;
              
                    
                    var formatoFechaBoleto = moment(data.root[0][0].bc_fecha_pedido);
                    var formatoFechaIni = moment(data.root[0][0].bc_fecha_inicio_viaje);
                    var formatoFechaFin = moment(data.root[0][0].bc_fecha_fin_viaje);
                    data.root[0][0].bc_fecha_pedido = formatoFechaBoleto.format("YYYY-MM-DD").toString();
                    data.root[0][0].bc_fecha_inicio_viaje = formatoFechaIni.format("YYYY-MM-DD").toString();
                    data.root[0][0].bc_fecha_fin_viaje = formatoFechaFin.format("YYYY-MM-DD").toString();
                    this.iDocumento = data.root[0][0];

                    if (this.tipoboletoid === "1") {
                        this.limpiabotones(3);
                    }else{
                        this.iDocumento.bc_nombre_pasajero = "";
                        this.iDocumento.bc_identificacion_pasajero = "";
                    }

                    data.root[1].forEach((key: any) => {
                        key.sec = linea;
                        linea += 1;
                    });


                    this.iDocumento.detalle_bo = data.root[1];

   

                } else {
                    this.mensaje("2", data.msgError);
                }
                this.cargaPersona();
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.mensaje("2", err.message);
            this.spinner.hide();
        });

    }
    cierreBoleto(event: any) {
        if (event !== "") {
            this.hideModal()
            let _linea = JSON.parse(event);
            this.selectBoleto(_linea.bc_codigo);
        }
    }
    cierreBoletocm(event: any) {
        if (event !== "") {
            this.hideModal()
            let _linea = JSON.parse(event);
            this.iDocumento.bc_boleto_cambio = _linea.bc_codigo;
        }
    }
    seteaCliente(_datos: any) {
        this.iDocumento.cl_codigo = _datos.cl_codigo;
        this.iDocumento.cl_nombre = _datos.cl_nombre;
        this.cargaPersona()
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
        this.lineagrid = row.cdi_linea;
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
            if (natu === k.cod_naturaleza) {
                valor = valor + ((k.valor === "" || k.valor === undefined) ? 0 : parseFloat(k.valor));
            }
            
        });
        
        return valor;
    }
    calculototal() {
        if (this.calculo('A') === this.calculo('D')) {
            this.iDocumento.cob_monto = this.calculo('A');
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
        var _linea:any={ };
        _linea.cdi_linea = this.iDocumento.detalle.length + 1;
        _linea.cpc_codigo ="";
        _linea.cpc_descripcion = "";
        _linea.cta_codigo = "";
        _linea.coa_codigo = "";
        _linea.cdi_naturaleza = "A";

        this.iDocumento.detalle.push(_linea);

    }
    duplicarlinea() {
        if (this.lineagrid === 0) {
            this.mensaje("1", "Debe Seleccionar una linea para duplicar");
        } else {
         
        }
    }
    borrarlinea() {
        let index = this.iDocumento.detalle.findIndex((key: any) => key.cdi_linea === this.lineagrid);
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
        this.llamarmodal = _tipo + "|Ingreso de Interfaz Contable|" + _mensaje + "|" + Funcion.Ramdon().toString();
    }
    aceptarOk(event: boolean) {
        if (event) {
            this.limpiabotones(1); this.habilitarfrom(4);
        }
    }
}
