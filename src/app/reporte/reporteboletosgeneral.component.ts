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
    templateUrl: './reporteboletosgeneral.component.html',
    styleUrls: ['./reporteboletosgeneral.component.scss']
})
export class ReporteBoletosGeneralComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedaentidad') modalbusquedaentidad: any;
    @ViewChild('modalbusquedaforma') modalbusquedaforma: any;

    col1: boolean = false;
    col2: boolean = false;
    col3: boolean = false;
    col4: boolean = false;
    col5: boolean = false;
    col6: boolean = false;

    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    impuestoporcentaje: number = 0;
    modalRef: any;
    llamarmodal: string = "";
    ColumnaDetalle: any[] = ['N. BOLETO', 'FECHA DE EMISION', 'RUC AEROLINEA', 'OPERADOR', 'PERSONA SOLICITA', '# DE TICKET', '# DE TICKET CAMBIO', 'IDENTIFICACION DEL PASAJERO', 'NOMBRE DEL PASAJERO', 'RUTA', 'FECHA DE IDA', 'FECHA DE RETORNO', 'VALOR BOLETO', 'IVA', 'OTROS IMPUESTOS', 'TOTAL BOLETO', 'SERVICIO EMISION', 'IVA SERVICIO', 'TOTAL SERVICIOS', 'TOTAL BOLETO + SERVICIO', 'ESTADO', 'SERVICIO ADICIONAL', 'VALOR ADICIONAL', 'NETO', 'OTRO COSTO', 'COSTO BOLETO', 'FEES', 'SEGUROS', 'NAC/INT', '# RESERVA', 'PAGO', 'AUTORIZACION', 'RECIBO', 'PROVEEDOR', 'OBSERVACIONES', 'USUARIO'];
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
    listforma: any[] = [];
    listusuario: any[] = [];
    detallereporte: any[] = [];
    columnareporte: any[] = [];
    codreporte: any[] = [];
    listcliente: any[] = [];
    iDocumento: BoCabeceraModel = new BoCabeceraModel();
    lineagrid: number = 0;
    lineagridse: number = 0;
    lineagridalo: number = 0;
    listEstado: any[] = [];
    listEstados: any[] = [];
    listTipoViaje: any[] = [];
    tipoboleto: string = "";
    listrutas: any[] = [];
    
    
    smensaje = "";
    isAccion: string = "";
    /**
   * DEFINICION DE VARIABLE DE MODELO DE VENDEDOR
   */
    model: any = {};
    /**
 * DEFINICION DE FUNCION INIT DE LA CLASE
 */
    alto: string = "";
    ngOnInit() {
        this.limpiabotones(1);
        var _Datos: any[] = [];
        this.listTipoViaje = Funcion.TipoViaje();


        this.cargaUsuario();
        this.alto = ((screen.height / 2) - 50).toString();

        this.iDocumento.tipoboleto = "NACIONAL";
    }
    cargaUsuario() {
        this.spinner.show();
        this.mantenimientoService.manUsuario(globales.cia).subscribe(data => {
            try {
                this.listusuario = [];
                this.listusuario.push({
                    us_codigo: "0",
                    us_nombre: ""
                });
                var datos: any[] = [];
                datos = data.root[0];
                datos.forEach((k) => {
                    this.listusuario.push(k);
                });
                this.iDocumento.us_codigo = "0";
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cancelar() {

        this.iDocumento.cl_codigo = 0;
        this.iDocumento.cl_nombre = "";
        this.iDocumento.us_codigo = "0";

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
    buscarexcel() {
        this.spinner.show();

        this.boletoService.repoteBoletosTipo("EXC", globales.cia, this.iDocumento.bc_fecha_inicio_viaje, this.iDocumento.bc_fecha_fin_viaje, this.iDocumento.cl_codigo.toString(), this.iDocumento.us_codigo.toString(), this.iDocumento.tipoboleto, globales.nomMaquina, Funcion.ReturnUsuario().us_login).subscribe((results) => {
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
    totalColumna(col: number) {
        let _cantidad: number = 0;
        if (col === 1) {
            this.detallereporte.forEach((key) => {
                _cantidad = _cantidad + key.bd_total_boleto;
            });
        }
        if (col === 2) {
            this.detallereporte.forEach((key) => {
                _cantidad = _cantidad + key.bd_valor_servicio;
            });
        }
        if (col === 3) {
            this.detallereporte.forEach((key) => {
                _cantidad = _cantidad + key.bd_iva_servicio;
            });
        }
        if (col === 4) {
            this.detallereporte.forEach((key) => {
                _cantidad = _cantidad + key.bd_total_general;
            });
        }

        return _cantidad.toFixed(2);
    }
    buscarpdf() {
       
        this.spinner.show();
        this.boletoService.repoteBoletosTipo("PDF", globales.cia, this.iDocumento.bc_fecha_inicio_viaje, this.iDocumento.bc_fecha_fin_viaje, this.iDocumento.cl_codigo.toString(), this.iDocumento.us_codigo.toString(), this.iDocumento.tipoboleto, globales.nomMaquina, Funcion.ReturnUsuario().us_login).subscribe((results) => {
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
        this.boletoService.repoteBoletosTipoVisual("", globales.cia, this.iDocumento.bc_fecha_inicio_viaje, this.iDocumento.bc_fecha_fin_viaje, this.iDocumento.cl_codigo.toString(), this.iDocumento.us_codigo.toString(), this.iDocumento.tipoboleto).subscribe(data => {
            try {
                this.detallereporte = data.root[0];
                if (this.detallereporte.length <= 0) {
                    this.botones.btneliminar = true;
                    this.mensaje("1", "No hay informacion consultada.");
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
    seteaForma(data: any) {
        this.iDocumento.fp_codigo = data.fp_codigo;
        this.iDocumento.fp_nombre = data.fp_descripcion;

    }
    cierreForma(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaForma(JSON.parse(event))
        }
    }
    cierreModalforma(event: any) {
        if (event) {
            this.hideModal()
        }
    }
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
        this.llamarmodal = _tipo + "|Ingreso de Boleto General|" + _mensaje + "|" + Funcion.Ramdon().toString();
    }
    aceptarOk(event: boolean) {
        if (event) {

        }
    }
}
