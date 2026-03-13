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
import { BoCabeceraModel } from '@modelo/bocabecera-model';
import { TotalModel } from '@modelo/total-model';
import * as moment from 'moment';
import { BoDetalleModel } from '@modelo/bodetalle-model';
import { BoSeguroModel } from '@modelo/boseguro-model';
import { BoAlojamientoModel } from '@modelo/boalojamiento-model';
import { DetallePago } from '@modelo/detallePago-model';
import { DOCUMENT } from '@angular/common';
import * as htmlToImage from "html-to-image";
declare var saveSvgAsPng: any;
declare var svgAsPngUri: any;
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './registroordencompra.component.html',
    styleUrls: ['./registroordencompra.component.scss']
})
export class RegistroOrdenCompraComponent implements OnInit {
    /**
   * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
   */
    @ViewChild('modalbusquedaproveedor') modalbusquedaproveedor: any;
    @ViewChild('modalbusquedaordencompra') modalbusquedaordencompra: any;
    @ViewChild('modalbusquedaboletocm') modalbusquedaboletocm: any;
    @ViewChild('modalbusquedagastos') modalbusquedagastos: any;
    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
   
    impuestoporcentaje: number = 0;
    modalRef: any;
    lineaselect: string = "";
    llamarmodal: string = "";
    listadogastos: any[] = [];
    ColumnaDetalle: any[] = ['', 'N°. BOLETO', 'ENTIDAD', 'FECHA DE EMISION', 'RUTA', 'FECHA DE IDA', 'FECHA DE RETORNO', 'ABONO', 'TOTAL BOLETO + SERVICIO', 'SALDO', 'OPERADOR', '# DE TICKET', '# RESERVA'];
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
    detalleregistropago: any[] = [];
    detalleregistrocompra: any[] = [];
    detalleregistrocomprageneral: DetallePago[] = [];
    listcliente: any[] = [];
    listtipopago: any[] = [];
    iDocumento: any = {
        fa_fecha_factura: "",
        fa_numero_factura: "",
        cp_tipo_doc: "",
        relacion: ""
    }
    datoscla: string = "";
    indextab: number = 0;
    lineagrid: any = {}
    lineagridse: number = 0;
    lineagridalo: number = 0;
    listaimpuesto: any[] = [];
    listformapago: any[] = [];
    listEstado: any[] = [];
    listEstados: any[] = [];
    listTipoViaje: any[] = [];
    listrutas: any[] = [];
    listproveedor: any[] = [];
    listPagoSri: any[] = [];
    listTipoDoc: any[] = [];
    listodocref: any[] = [];
    listTipoCompra: any[] = [];
    listforma: any[] = [];
    listtiposeguro: any[] = [];
    listboleto: any[] = [];
    listoordencompra: any[] = [];
    listtipoalojamiento: any[] = [];
    lineaseguro: BoSeguroModel = new BoSeguroModel();
    lineaalojamiento: BoAlojamientoModel = new BoAlojamientoModel();
    smensaje = "";
    isAccion: string = "";
    /**
   * DEFINICION DE VARIABLE DE MODELO DE VENDEDOR
   */
    model: any = {};
    saveAsImage(parent: any) {
        // fetches base 64 date from image
        const parentElement = parent.bcElement.nativeElement.innerHTML;

        // converts base 64 encoded image to blobData
        let blobData = this.convertBase64ToBlob(parentElement);

        // saves as image
        // chrome
        const blob = new Blob([blobData], { type: "image/png" });
        const url = window.URL.createObjectURL(blob);
        // window.open(url);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Qrcode';
        link.click();


    }
    cierreGastos(event: string) {
        if (event !== "") {
            this.hideModal();
            let _idenx = this.detalleregistrocompra.findIndex(k => k.bc_codigo === this.lineagridse);
            let iGasto = JSON.parse(event);

            
            this.detalleregistrocompra[_idenx].coi_codigo = iGasto.ga_codigo;
            this.detalleregistrocompra[_idenx].odc_codigo_item = iGasto.ga_cod_descripcion;
            this.detalleregistrocompra[_idenx].odc_descripcion_item = iGasto.ga_descripcion
        }
    }
    buscarGasto(row: any) {
        this.lineagridse = row.bc_codigo;
        this.limpiarColorseg();
        row.color = "SG";
        this.spinner.show();
        this.mantenimientoService.getGastos(globales.cia).subscribe(data => {
            try {
                this.listadogastos = data.root[0];
                this.openModal(this.modalbusquedagastos);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.notifier.showError(err.error.Message);
            this.spinner.hide();
        });

    }

    private convertBase64ToBlob(Base64Image: any) {
        // SPLIT INTO TWO PARTS
        const parts = Base64Image.split(';base64,');
        // HOLD THE CONTENT TYPE
        const imageType = parts[0].split(':')[1];
        // DECODE BASE64 STRING
        const decodedData = window.atob(parts[1]);
        // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
        const uInt8Array = new Uint8Array(decodedData.length);
        // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
        for (let i = 0; i < decodedData.length; ++i) {
            uInt8Array[i] = decodedData.charCodeAt(i);
        }
        // RETURN BLOB IMAGE AFTER CONVERSION
        return new Blob([uInt8Array], { type: imageType });
    }
    /**
 * DEFINICION DE FUNCION INIT DE LA CLASE
 */
    ngOnInit() {
        var _Datos: any[] = [];
        this.limpiabotones(1);
        this.listtipopago = Funcion.TipoPago();
        var _Datos: any[] = [];
        _Datos = Funcion.returdatosession("parametro");
        _Datos.forEach((key) => {
            this.listaimpuesto.push({
                pa_codigo: key.pa_codigo,
                pa_descripcion: key.pa_descripcion + ' ' + key.pa_valor,
                pa_valor: key.pa_valor
            });
        });
        try {
            let dato: number = _Datos.findIndex((key) => key.pa_descripcion === "IMPUESTO");
            this.impuestoporcentaje = parseFloat(_Datos[dato].pa_valor);
        } catch (e) {
            this.impuestoporcentaje = 12;
        }
        this.cargaPagoSri();
        this.listEstado = Funcion.Estado();
        this.cargaTipoDocumento();
        this.cargaTipoCompra();
        this.listodocref = Funcion.TipoDocRef();
        this.cargaFormafp();
        this.iDocumento.opcionimp1 = this.listaimpuesto[0].pa_codigo;


    }
    cargaFormafp() {
        this.spinner.show();
        this.mantenimientoService.manFormaPagofp(globales.cia, "P").subscribe(data => {
            try {
                this.listformapago = data.root[0]
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
    cargaTipoCompra() {
        this.spinner.show();
        this.mantenimientoService.manTipoCompra(globales.cia).subscribe(data => {
            try {
                this.listTipoCompra = data.root[0];

                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    limpiarregistro() {
        this.detalleregistropago = [];
        this.detalleregistrocompra = [];
        this.detalleregistrocomprageneral = [];
        this.lineaselect = "";
    }
    deleteregistro() {

    }
    cancelar() {
        this.limpiabotones(1);
        this.limpiarregistro();
        this.habilitarfrom(4);

        this.iDocumento.fa_tipofactura = "D";
        this.iDocumento.fa_tipo_iva = "S";

    }
   
    deletefactura() {
        this.spinner.show();
        this.iDocumento.ord_estado = 0;
        this.facturacionService.deleteOrdenCompra(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1); this.habilitarfrom(4); this.cancelar();
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
   


    cierreModalTipoSeguro(event: any) {
        if (event) {
            this.hideModal()
        }
    }

    /**
* DEFINICION DE FUNCION CARGA FORMA
*/
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

    totalColumna(col: number) {
        let _cantidad: number = 0;
        this.iDocumento.ord_subtotal = 0;
        this.iDocumento.ord_exento = 0;
        this.iDocumento.ord_gravable = 0;

        this.iDocumento.ord_iva = 0;
        this.iDocumento.ord_total = 0;
        if (col === 2) {
            this.detalleregistrocompra.forEach((key) => {
                _cantidad = _cantidad + key.odc_total;
            });
        }

        this.detalleregistrocompra.forEach((key) => {
            this.iDocumento.ord_subtotal = parseFloat(this.iDocumento.ord_subtotal) + parseFloat(key.odc_subtotal);
            this.iDocumento.ord_exento = parseFloat(this.iDocumento.ord_exento) + parseFloat(key.odc_subtotal0);
            this.iDocumento.ord_gravable = parseFloat(this.iDocumento.ord_gravable) + parseFloat(key.odc_subtotaliva);
            this.iDocumento.ord_iva = parseFloat(this.iDocumento.ord_iva) + parseFloat(key.odc_iva);
            this.iDocumento.ord_total = parseFloat(this.iDocumento.ord_total) + parseFloat(key.odc_total);
        });
        this.detalleregistropago[0].ofp_valor_pago = this.iDocumento.ord_total;

        return _cantidad.toString();
    }
    cierreModalproveedor(event: any) {
        if (event) {
            this.hideModal()
        }
    }
    validar() {
        this.smensaje = "";

        if (this.iDocumento.pr_codigo === "" || this.iDocumento.pr_codigo === null || this.iDocumento.pr_codigo === undefined) {
            this.smensaje = "No Tiene seleccionado ninguna proveedor ...Por Favor Revisar"
            return;
        }
        if (this.iDocumento.ord_tipo_doc === "" || this.iDocumento.ord_tipo_doc === null || this.iDocumento.ord_tipo_doc === undefined) {
            this.smensaje = "No ha seleccionado ninguna tipo de documento ...Por Favor Revisar"
            return;
        }

        if (this.detalleregistrocompra.length <= 0) {
            this.smensaje = "No Tiene ingresado ningun detalle de orden de compra ...Por Favor Revisar"
            return;
        }


        for (var i = 0; i < this.detalleregistropago.length; i++) {
            if (this.detalleregistropago[i].ofp_vencimiento_pago === "" || this.detalleregistropago[i].ofp_vencimiento_pago === undefined) {
                this.smensaje = "No ha ingresado  la fecha de vecimiento de la forma de pago ...Por Favor Revisar";
                return;
            }
        }



    }
    modificarfactura() {
        if (parseInt(this.iDocumento.relacion) === parseInt("0")) {
            this.habilitarfrom(3);
            this.limpiabotones(2);
        } else {
            this.mensaje("1", "No se puede modificar la orden de compra ya que tiene una factura realacionada ...Por Favor Revisar")
            return;
        }
    }
    confirmarguardar() {
      
        if (this.isAccion === "I") {
            this.mensaje("4", "Esta seguro de guardar la orden de compra");
        } else if (this.isAccion === "M") {
            this.mensaje("4", "Esta seguro de modificar la orden de compra");
        }

    }
    confirmareliminar() {
        if (parseInt(this.iDocumento.relacion) > parseInt("0")) {
            this.mensaje("1", "No se puede eliminar la orden compra ya que tiene una factura realacionada ...Por Favor Revisar")
            return;
        } else {
            this.mensaje("5", "Esta seguro de eliminar la orden de compra N°." + this.iDocumento.ord_codigo);
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
                this.insertFactura();
            }
            if (this.isAccion === "M") {
                this.updateFactura();
            }
        }
    }
    updateFactura() {
        this.spinner.show();


        this.iDocumento.co_codigo = globales.cia;
        this.iDocumento.ord_estado = 1;




        this.iDocumento.detalle = this.detalleregistrocompra;
        this.iDocumento.detallefp = this.detalleregistropago;
        this.facturacionService.updateOrdenCompra(this.iDocumento).subscribe(data => {
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
    insertFactura() {
        //var img: any = document.getElementById('my-node')
        //const parts = img.src.split(';base64,')[1];

        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;
        this.iDocumento.ord_estado = 1;




        this.iDocumento.detalle = this.detalleregistrocompra;
        this.iDocumento.detallefp = this.detalleregistropago;
        this.facturacionService.insertOrdenCompra(this.iDocumento).subscribe(data => {
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
                this.iDocumento.ord_fecha_registro = formatoFecha.format("YYYY-MM-DD").toString();
                this.iDocumento.ord_fecha_ingreso = formatoFecha.format("YYYY-MM-DD").toString();
                this.iDocumento.fp_sri_codigo = 1;
                this.iDocumento.relacion = "";
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
                this.iDocumento.fa_tipofactura = "D";
                this.iDocumento.fa_tipo_iva = "S";
                this.iDocumento.ord_estado = "A";
                this.detalleregistropago.push({});
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
    cogeforma(row: any) {
        let _idenx = this.listformapago.findIndex(k => k.fp_codigo === parseInt(row.ofp_tipo_forma_pago));
        var date = new Date();
        var primerDia = new Date(date.getFullYear(), date.getMonth(), date.getDate() + this.listformapago[_idenx].fp_dia);
        var formatoFecha = moment(primerDia);
        row.ofp_vencimiento_pago = formatoFecha.format("YYYY-MM-DD").toString();
    }
    cargaPagoSri() {
        this.spinner.show();
        this.mantenimientoService.manPagoSri(globales.cia).subscribe(data => {
            try {
                this.listPagoSri = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    buscarfactura() {
        this.spinner.show();
        this.facturacionService.cargaOrdenCompra(globales.cia).subscribe(data => {
            try {
                this.listoordencompra = data.root[0];
                this.openModalgr(this.modalbusquedaordencompra, "modal-lg modal-primary");
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    buscarOrdenSelect() {
        this.spinner.show();
        this.facturacionService.cargaOrdenCompraSelect(globales.cia, this.iDocumento.ord_codigo).subscribe(data => {
            try {
                this.iDocumento = data.root[0][0];
                this.detalleregistropago = data.root[2];
                this.detalleregistrocompra = data.root[1];
                this.limpiabotones(3);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cierreOrdenCompra(event: any) {
        if (event !== "") {
            this.iDocumento.ord_codigo = event;
            this.buscarOrdenSelect();
            this.hideModal()
        }

    }
    buscarboleto() {
        this.spinner.show();
        this.boletoService.getBoletoentidad(globales.cia, this.iDocumento.cl_codigo).subscribe(data => {
            try {
                this.listboleto = data.root[0];
                this.openModalgr(this.modalbusquedaboletocm, "modal-lg modal-primary");
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.mensaje("2", err.message);
            this.spinner.hide();
        });

    }

    downloadDataUrl(dataUrl: string, filename: string): void {
        var a = this._document.createElement("a");
        a.href = dataUrl;
        a.download = filename;
        this._document.body.appendChild(a); //Firefox requires link to be in body
        a.click();
        this._document.body.removeChild(a);
    }
    imagen: string = "";
    prueba(parentsvg: any) {



    }
    cambioradio() {
        this.detalleregistrocompra = [];
    }
    buscarboletofactura(linea: string) {
        this.spinner.show();
        this.facturacionService.GetBoletoFactura(globales.cia, linea).subscribe(data => {
            try {
                this.detalleregistrocompra = data.root[0];
                if (this.iDocumento.fa_tipo_iva !== 'S') {
                    this.detalleregistrocompra.forEach((key) => {
                        key.odc_subtotal0 = parseFloat(key.odc_subtotal0) + parseFloat(key.odc_subtotaliva) + parseFloat(key.odc_iva);
                        key.odc_subtotaliva = 0;
                        this.calculoiva(key);
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

    cierreBoletocm(event: string) {
        if (event !== "") {
            this.hideModal()
            this.buscarboletofactura(event);
        }
    }

    buscarfacturaselect(linea: string) {
        this.spinner.show();
        this.facturacionService.getFacturaSelect(globales.cia, linea).subscribe(data => {
            try {
                this.iDocumento = data.root[0][0];
                this.iDocumento.fa_fecha_factura = moment(this.iDocumento.fa_fecha_factura).format("YYYY-MM-DD").toString();
                this.iDocumento.fa_fecha_ingreso = moment(this.iDocumento.fa_fecha_ingreso).format("YYYY-MM-DD").toString();
                this.detalleregistrocompra = data.root[1];
                this.limpiabotones(3);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.mensaje("2", err.message);
            this.spinner.hide();
        });

    }
    cierreFacturacm(event: string) {
        if (event !== "") {
            this.hideModal()
            this.buscarfacturaselect(event);
        }
    }
    cierreModalcliente(event: any) {
        if (event) {
            this.hideModal()
        }
    }
    calculoiva(row: any) {
        if (row.odc_lleva_iva) {
            row.odc_subtotaliva = parseFloat(row.odc_cantidad) * parseFloat(row.odc_precio);
            row.odc_subtotal0 = 0;
        } else {
            row.odc_subtotal0 = parseFloat(row.odc_cantidad) * parseFloat(row.odc_precio);
            row.odc_subtotaliva = 0;
        }
        row.odc_subtotaliva = (row.odc_subtotaliva.toString() === "") ? '0' : row.odc_subtotaliva.toString();
        row.odc_subtotal0 = (row.odc_subtotal0.toString() === "") ? '0' : row.odc_subtotal0.toString();
        row.odc_subtotal = ((row.odc_subtotaliva.toString() === "") ? 0 : parseFloat(row.odc_subtotaliva.toString())) + ((row.odc_subtotal0.toString() === "") ? 0 : parseFloat(row.odc_subtotal0.toString()));
        row.odc_iva = ((parseFloat(row.odc_subtotaliva.toString())) * this.impuestoporcentaje) / 100;
        row.odc_total = parseFloat(row.odc_subtotal.toString()) + parseFloat(row.odc_iva.toString())
        this.totalColumna(1);
    }
    calculo(row: DetallePago, num: number) {

        let _valorcab = this.lineagrid.bd_total_general;

        let resume = this.detalleregistrocompra.filter((key) => {
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
        return 0;

    }
    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(@Inject(DOCUMENT) private _document: Document, private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private fb: FormBuilder, private mantenimientoService: MantenimientoService, private boletoService: BoletoService, private cuentaxCobrarService: CuentaxCobrarService, private facturacionService: FacturacionService, private injector: Injector) {
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
        this.iDocumento.fa_tipofactura = "D";
        this.iDocumento.fa_tipo_iva = "S";
    }
    buscar() {
        this.buscarfactura();
    }

    salir() {
        this.router.navigate(['/principal/default'], {
            skipLocationChange: true,
        });
    }


    cierreProveedor(event: any) {
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
        this.iDocumento.pr_codigo = _datos.pr_codigo;
        this.iDocumento.pr_nombre = _datos.pr_nombre;
        this.iDocumento.cl_direccion = _datos.cl_direccion;
        this.iDocumento.cl_correo = _datos.cl_correo;
    }
    limpiarColor() {
        //for (var i = 0; i < this.detalleboletopago.length; i++) {
        //    this.detalleboletopago[i].color = "";
        //}
    }

    agregarlinea() {
        if (this.iDocumento.pr_codigo != "" && this.iDocumento.pr_codigo != undefined) {
            if (this.iDocumento.fa_tipofactura === "B") {
                this.buscarboleto();
            } else {
                this.detalleregistrocompra.push({
                    bc_codigo: this.detalleregistrocompra.length + 1,
                    fd_codigo_linea: "",
                    fd_descripcion: "",
                    odc_subtotal0: "",
                    odc_subtotaliva: "",
                    odc_subtotal: "",
                    odc_iva: "",
                    odc_total: ""
                });

            }

        } else {
            this.mensaje("1", "Debe seleccionar un Proveedor");
        }


    }
    borrarlinea() {
        let index = this.detalleregistrocompra.findIndex(key => key.bc_codigo === this.lineagridse);
        this.detalleregistrocompra.splice(index, 1);
        this.totalColumna(2);
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
        if (this.detalleregistrocompra.length > 0) {
            for (var i = this.detalleregistrocomprageneral.length - 1; i >= 0; i--) {
                if (this.detalleregistrocomprageneral[i].seccab === this.lineagrid.sec) {
                    this.detalleregistrocomprageneral.splice(i, 1);
                }
            }
            this.detalleregistrocompra.forEach((key) => {
                this.detalleregistrocomprageneral.push(key);
            });
            this.detalleregistrocompra = [];
        } else {
            this.detalleregistrocompra.forEach((key) => {
                this.detalleregistrocomprageneral.push(key);
            });
            this.detalleregistrocompra = [];
        }
        this.lineagrid = row;

        let listado = this.detalleregistrocomprageneral.filter((key) => {
            return key.seccab === this.lineagrid.sec;
        });
        this.detalleregistrocompra = listado;
        this.lineaselect = "Registro Pago " + this.lineagrid.cl_nombre + " Boleto " + this.lineagrid.bd_ticket + " Total " + this.lineagrid.bd_total_general;
    }

    limpiarColorseg() {
        for (var i = 0; i < this.detalleregistrocompra.length; i++) {
            this.detalleregistrocompra[i].color = "";
        }
    }
    clickGridp(row: any) {
        this.lineagridse = row.bc_codigo;
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

    cierreModal(event: any) {
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
        this.llamarmodal = _tipo + "|Registro Orden Compra|" + _mensaje + "|" + Funcion.Ramdon().toString();
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
            this.deletefactura();
        }
    }
}
