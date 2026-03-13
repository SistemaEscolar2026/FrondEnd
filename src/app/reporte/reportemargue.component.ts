import { Component, Injector, OnInit, ViewChild } from '@angular/core';
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

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './reportemargue.component.html',
    styleUrls: ['./reportemargue.component.scss']
})
export class ReporteMargueComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedaentidad') modalbusquedaentidad: any;
    @ViewChild('modalbusquedaproveedor') modalbusquedaproveedor: any;
    @ViewChild('modalbusquedaruta') modalbusquedaruta: any;
    @ViewChild('modalbusquedaforma') modalbusquedaforma: any;
    @ViewChild('modalbusquedatiposeguro') modalbusquedatiposeguro: any;
    @ViewChild('modalbusquedatipoalojamiento') modalbusquedatipoalojamiento: any;
    @ViewChild('modalbusquedaboleto') modalbusquedaboleto: any;




    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    impuestoporcentaje: number = 0;
    modalRef: any;
    llamarmodal: string = "";
    ColumnaDetalle: any[] = ['FECHA DE EMISION','OPERADOR','N° BOLETO', 'NOMBRE DEL PASAJERO', 'RUTA', 'FECHA DE IDA','FECHA DE RETORNO', 'VALOR BOLETO', 'IVA', 'OTROS IMPUESTOS', 'TOTAL BOLETO', 'SERVICIO EMISIÓN', 'IVA SERVICIO', 'TOTAL SERVICIOS', 'TOTAL BOLETO + SERVICIO', 'ESTADO',  'NETO', 'OTRO COSTO','COSTO BOLETO', 'FEES', 'SEGUROS', 'NAC/INT', '# RESERVA', 'PAGO', 'AUTORIZACION', 'RECIBO', 'PROVEEDOR', 'OBSERVACIONES'];
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
    /**
  * DEFINICION DE VARIABLE NOTIFICACION TIPO TOAS
  */
    notifier: any;
    submitted = false;
    habilitaobjetofrom: boolean = true;
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    detallereporte: any[] = [];
    listcliente: any[] = [];
    iDocumento: BoCabeceraModel = new BoCabeceraModel();
    lineagrid: number = 0;
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
        this.cargaEstado();
        this.listTipoViaje = Funcion.TipoViaje();
        this.limpiabotones(1);
        var _Datos: any[] = [];
        _Datos = Funcion.returdatosession("parametro");
        try {
            this.impuestoporcentaje = parseFloat(_Datos.filter((key) => {
                key.pa_descripcion === "IMPUESTO";
            })[0].pa_valor);
        } catch (e) {
            this.impuestoporcentaje = 12;
        }
        this.listEstados = Funcion.EstadoBoletos();

    }
    cargaEstado() {
        this.spinner.show();
        this.mantenimientoService.manEstado(globales.cia).subscribe(data => {
            try {
                this.listEstado = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    buscarexcel() {
        this.spinner.show();
        this.boletoService.repoteBoletos("EXC", globales.cia, this.iDocumento.bc_fecha_inicio_viaje, this.iDocumento.bc_fecha_fin_viaje, "", "", "", globales.nomMaquina, Funcion.ReturnUsuario().us_codigo).subscribe((results) => {
            try {

                var file = new Blob([(results)], { type: 'application/xlsx' });
                var fileURL = window.URL.createObjectURL(file);
                const a = document.createElement('a');
                a.setAttribute('style', 'display:none;');
                document.body.appendChild(a);
                a.href = fileURL;
                a.download = "ReporteBoleto.xlsx";
                a.click();
                this.spinner.hide();
               // window.open(fileURL, '_blank', '');
            } catch (e) {
                this.spinner.hide();
            }
          
        }, () => {
            this.spinner.hide();
        });
    }
    buscarpdf() {
        this.spinner.show();
        this.boletoService.repoteBoletos("PDF", globales.cia, this.iDocumento.bc_fecha_inicio_viaje, this.iDocumento.bc_fecha_fin_viaje, "", "", "", globales.nomMaquina, Funcion.ReturnUsuario().us_codigo).subscribe((results) => {
            try {
                try {
                    var file = new Blob([results], { type: 'application/pdf' });
                    var fileURL = window.URL.createObjectURL(file);
                    window.open(fileURL, '_blank', '');
                    this.spinner.hide();
                } catch (e) {
                    this.spinner.hide();
                }
                
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    buscarboleto() {
        this.spinner.show();
        this.boletoService.repoteBoletosVisual("", globales.cia, this.iDocumento.bc_fecha_inicio_viaje, this.iDocumento.bc_fecha_fin_viaje, "", "").subscribe(data => {
            try {
                this.detallereporte = data.root[0];
                if (this.detallereporte.length<=0) {
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
    buscartiposeguro(row: BoSeguroModel) {
        this.lineaseguro = row;
        this.spinner.show();
        this.mantenimientoService.manTipoSeguro(globales.cia).subscribe(data => {
            try {
                this.listtiposeguro = data.root[0];
                this.openModal(this.modalbusquedatiposeguro);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }


    buscartipoalojamiento(row: BoAlojamientoModel) {
        this.lineaalojamiento = row;
        this.spinner.show();
        this.mantenimientoService.manTipoAlojamiento(globales.cia).subscribe(data => {
            try {
                this.listtipoalojamiento = data.root[0];
                this.openModal(this.modalbusquedatipoalojamiento);
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
    cargaForma() {
        this.spinner.show();
        this.mantenimientoService.manFormaPago(globales.cia).subscribe(data => {
            try {
                this.listforma = data.root[0];
                this.openModal(this.modalbusquedaforma);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cargaRuta() {
        this.spinner.show();
        this.mantenimientoService.manRutas(globales.cia).subscribe(data => {
            try {
                this.listrutas = data.root[0];
                var _detalle: [];
                _detalle = data.root[1];
                for (var i = 0; i < this.listrutas.length; i++) {
                    this.listrutas[i].detalle = [];
                    this.listrutas[i].detalle = _detalle.filter((key: any) => {
                        return key.rut_codigo === this.listrutas[i].rut_codigo
                    });
                }
                this.openModal(this.modalbusquedaruta);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    insertBoleto() {
        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;
        this.boletoService.insertBoleto(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    this.mensaje("3", data.msgError);
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
    updateBoleto() {
        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;
        this.boletoService.updateBoleto(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    this.mensaje("3", data.msgError);
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
    guardarBoleto() {
        this.submitted = true;
        this.validar();
        if (this.submitted === true) {
            if (this.smensaje != "") {
                this.mensaje("1", this.smensaje);
            }
            return
        } else {
            if (this.isAccion === "I") {
                this.insertBoleto();
            }
            if (this.isAccion === "M") {
                this.updateBoleto();
            }
        }
    }
    validar() {
        this.smensaje = "";
        this.submitted = false;
        if (this.iDocumento.cl_nombre === "") {
            this.submitted = true;
            return;
        }
        if (this.iDocumento.bc_estado_boleto === 0) {
            this.submitted = true;
            return;
        }
        if (this.iDocumento.bc_identificacion_pasajero === "") {
            this.submitted = true;
            return;
        }
        if (this.iDocumento.bc_nombre_pasajero === "") {
            this.submitted = true;
            return;
        }
        if (this.iDocumento.rut_discripcion === "") {
            this.submitted = true;
            return;
        }
        if (this.iDocumento.bc_persona_solicita === "") {
            this.submitted = true;
            return;
        }
        //if (this.iDocumento.costos_bo.boc_costo_boleto === "" || this.iDocumento.costos_bo.boc_costo_boleto === "0") {
        //    this.submitted = true;
        //    return;
        //}
        //if (this.iDocumento.costos_bo.ds_forma === "" || this.iDocumento.costos_bo.ds_forma === "0") {
        //    this.submitted = true;
        //    return;
        //}
        if (this.iDocumento.detalle_bo.length <= 0) {
            this.smensaje = "Debe Ingresar por los menos un Ticket de Viaje"
            this.submitted = true;
            return;
        }
        if (this.iDocumento.detalle_bo.length > 0) {
            for (var i = 0; i < this.iDocumento.detalle_bo.length; i++) {
                if (this.iDocumento.detalle_bo[i].bd_ticket === "") {
                    this.smensaje = "Debe Ingresar el numero de Ticket de Viaje"
                    this.submitted = true;
                    return;
                }
                if (this.iDocumento.detalle_bo[i].bd_valor_ticket === 0) {
                    this.smensaje = "Debe Ingresar el valor Ticket de Viaje"
                    this.submitted = true;
                    return;
                }
            }
        }
        //if (this.iDocumento.seguro_bo.length > 0) {
        //    for (var i = 0; i < this.iDocumento.seguro_bo.length; i++) {
        //        if (this.iDocumento.seguro_bo[i].ts_codigodesc === "") {
        //            this.smensaje = "Debe Ingresar el Tipo Seguro de Viaje"
        //            this.submitted = true;
        //            return;
        //        }
        //        if (this.iDocumento.seguro_bo[i].bs_valor_seguro === 0) {
        //            this.smensaje = "Debe Ingresar el valor Seguro de Viaje"
        //            this.submitted = true;
        //            return;
        //        }
        //    }
        //}
        //if (this.iDocumento.alojamiento_bo.length > 0) {
        //    for (var i = 0; i < this.iDocumento.alojamiento_bo.length; i++) {
        //        if (this.iDocumento.alojamiento_bo[i].ta_codigodesc === "") {
        //            this.smensaje = "Debe Ingresar el Tipo Alojamiento de Viaje"
        //            this.submitted = true;
        //            return;
        //        }
        //        if (this.iDocumento.alojamiento_bo[i].ba_valor === 0) {
        //            this.smensaje = "Debe Ingresar el valor Alojamiento de Viaje"
        //            this.submitted = true;
        //            return;
        //        }
        //    }
        //}
    }
    cierreProveedor(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaProveedor(JSON.parse(event))
        }
    }
    seteaProveedor(dato: any) {

        let index = this.iDocumento.detalle_bo.findIndex(key => key.sec === this.lineagrid);
        this.iDocumento.detalle_bo[index].costos_bo.costo_proveedor.pr_codigo = dato.pr_codigo;
        this.iDocumento.detalle_bo[index].costos_bo.costo_proveedor.pr_codigodesc = dato.pr_nombre;

        //this.iDocumento.costos_bo.costo_proveedor.pr_codigo = dato.pr_codigo;
        //this.iDocumento.costos_bo.costo_proveedor.pr_codigodesc = dato.pr_nombre;
    }
    cierreModalproveedor(event: any) {
        if (event) {
            this.hideModal()
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
    constructor(private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private fb: FormBuilder, private mantenimientoService: MantenimientoService, private boletoService: BoletoService, private injector: Injector) {
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
    deleteboleto() {
        this.spinner.show();
        this.iDocumento.bc_estado_boleto = 2;
        this.boletoService.deleteBoleto(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    //this.limpiarcontrato();
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
    cierreCliente(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaCliente(JSON.parse(event))
        }
    }
    selectBoleto(bc_codigo:string) {
        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;
        this.boletoService.getBoletoSelect(globales.cia, bc_codigo).subscribe(data => {
            try {
                if (data.success) {
                    let linea = 1;
                    this.limpiabotones(3);
                    var formatoFechaIni = moment(data.root[0][0].bc_fecha_inicio_viaje);
                    var formatoFechaFin = moment(data.root[0][0].bc_fecha_fin_viaje);
                    data.root[0][0].bc_fecha_inicio_viaje = formatoFechaIni.format("YYYY-MM-DD").toString();
                    data.root[0][0].bc_fecha_fin_viaje = formatoFechaFin.format("YYYY-MM-DD").toString();
                    this.iDocumento = data.root[0][0];
                    data.root[1].forEach((key:any) => {
                        key.sec = linea;
                        linea += 1;
                    });
                    

                    this.iDocumento.detalle_bo = data.root[1];

                    this.iDocumento.detalle_bo.forEach((key) => {
                        data.root[2].forEach((keyco: any) => {
                            if (key.bd_codigo === keyco.bd_codigo) {
                                key.costos_bo = keyco;
                                data.root[3].forEach((keycopro: any) => {
                                    if (key.costos_bo.boc_codigo === keycopro.boc_codigo) {
                                        key.costos_bo.costo_proveedor = keycopro;
                                    }
                                });
                            }
                        });
                    });
                
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
    cierreBoleto(event: any) {
        if (event !== "") {
            this.hideModal()
            let _linea = JSON.parse(event);
            this.selectBoleto(_linea.bc_codigo);
        }
    }
    seteaCliente(_datos: any) {
        this.iDocumento.cl_codigo = _datos.cl_codigo;
        this.iDocumento.cl_nombre = _datos.cl_nombre;

    }
    limpiarColor() {
        for (var i = 0; i < this.iDocumento.detalle_bo.length; i++) {
            this.iDocumento.detalle_bo[i].color = "";
        }
    }
    /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
    clickGrid(row: BoDetalleModel) {
        this.lineagrid = row.sec;
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
    calculo(linea: BoDetalleModel) {
        linea.bd_valor_iva = (linea.bd_valor_ticket * this.impuestoporcentaje) / 100;
        linea.bd_total_boleto = parseFloat(linea.bd_valor_ticket.toString()) + parseFloat(linea.bd_valor_iva.toString()) + parseFloat((linea.bd_otro_impuesto.toString() === '' || linea.bd_otro_impuesto.toString() === undefined) ? "0" : linea.bd_otro_impuesto.toString());
        linea.bd_iva_servicio = (linea.bd_valor_servicio * this.impuestoporcentaje) / 100;
        linea.bd_total_servicio = parseFloat(linea.bd_valor_servicio.toString()) + parseFloat(linea.bd_iva_servicio.toString());

        linea.bd_total_general = parseFloat(linea.bd_total_boleto.toString()) + parseFloat(linea.bd_total_servicio.toString());
        
        linea.costos_bo.boc_costo_total = parseFloat(linea.costos_bo.boc_costo_boleto.toString()) + parseFloat(linea.costos_bo.boc_otro_costo.toString()) + parseFloat((linea.costos_bo.boc_costo_fee.toString() === "") ? "0" : linea.costos_bo.boc_costo_fee.toString()) + parseFloat((linea.costos_bo.boc_costo_seguro.toString() === "") ? "0" : linea.costos_bo.boc_costo_seguro.toString());
    }
    agregarlinea() {
        var _linea: BoDetalleModel = new BoDetalleModel();
        _linea.sec = this.iDocumento.detalle_bo.length + 1;
        this.iDocumento.detalle_bo.push(_linea);
    }
  
    borrarlinea() {
        let index = this.iDocumento.detalle_bo.findIndex(key => key.sec === this.lineagrid);
        this.iDocumento.detalle_bo.splice(index, 1);
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
        let index = this.iDocumento.detalle_bo.findIndex(key => key.sec === this.lineagrid);
        this.iDocumento.detalle_bo[index].costos_bo.fp_codigo = _datos.fp_codigo;
        this.iDocumento.detalle_bo[index].costos_bo.ds_forma = _datos.fp_descripcion;
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
        this.llamarmodal = _tipo + "|Ingreso de Boleto|" + _mensaje + "|" + Funcion.Ramdon().toString();
    }
    aceptarOk(event: boolean) {
        if (event) {

        }
    }
}
