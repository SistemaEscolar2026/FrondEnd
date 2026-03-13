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
    templateUrl: './registronotacredito.component.html',
    styleUrls: ['./registronotacredito.component.scss']
})
export class RegistroNotaCreditoComponent implements OnInit {
    /**
   * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
   */
    @ViewChild('modalbusquedaentidad') modalbusquedaentidad: any;
    @ViewChild('modalbusquedafactura') modalbusquedafactura: any;
    @ViewChild('modalbusquedaboletocm') modalbusquedaboletocm: any;
    @ViewChild('modalbusquedanotacredito') modalbusquedanotacredito: any;

    
    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    parentsvg: any = {};
    impuestoporcentaje: number = 0;
    modalRef: any;
    lineaselect: string = "";
    llamarmodal: string = "";
    estadofactura: string = "";
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
    detalleboletopago: any[] = [];
    detalleregistrofactura: any[] = [];
    detalleregistrofacturageneral: DetallePago[] = [];
    listcliente: any[] = [];
    listtipopago: any[] = [];
    iDocumento: any = {
        fa_fecha_factura: "",
        fa_numero_factura: ""
    }
    datoscla: string = "";
    ;
    lineagrid: any = {}
    lineagridse: number = 0;
    lineagridalo: number = 0;
    listaimpuesto: any[] = [];
    listEstado: any[] = [];
    listEstados: any[] = [];
    listTipoViaje: any[] = [];
    listrutas: any[] = [];
    listproveedor: any[] = [];
    listPagoSri: any[] = [];
    listforma: any[] = [];
    listtiposeguro: any[] = [];
    listboleto: any[] = [];
    listfacturas: any[] = [];
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
        this.iDocumento.opcionimp1 = this.listaimpuesto[0].pa_codigo;
        this.iDocumento.fa_numero_factura = "";
        this.iDocumento.fa_tipofactura = "B";
        this.iDocumento.fa_tipo_iva = "S";
        this.numerofactura();
    }
    limpiarregistro() {
        this.detalleboletopago = [];
        this.detalleregistrofactura = [];
        this.detalleregistrofacturageneral = [];
        this.lineaselect = "";
    }
    deleteregistro() {

    }
    nuevo() {
        this.limpiabotones(2);
        this.habilitarfrom(1);
        if (this.isAccion==='M') {
            this.estadofactura = "Factura Sin Procesar";
            this.iDocumento.fa_estado_electronico = "RG";
        }
      
    }
    cancelar() {
        this.limpiabotones(1);
        this.limpiarregistro();
        this.habilitarfrom(4);
        this.numerofactura();
        this.iDocumento.fa_tipofactura = "B";
        this.iDocumento.fa_tipo_iva = "S";
        this.estadofactura = "Nota Credito Sin Procesar";
    }
    numerofactura() {
        this.spinner.show();
        this.facturacionService.numeroNotaCredito(globales.cia).subscribe(data => {
            try {
                if (data.success) {
                    this.iDocumento.fa_numero_nota_credito = data.root[0][0].factura;
                    this.generaclave();
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
    deletefactura() {
        this.spinner.show();
        this.iDocumento.fa_estado = 0;
        this.facturacionService.deleteFactura(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    //this.limpiarcontrato();
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
        this.iDocumento.fa_subtotal = 0;
        this.iDocumento.fa_subtotalexento = 0;
        this.iDocumento.fa_baseiva = 0;
        this.iDocumento.fa_iva = 0;
        this.iDocumento.fa_total = 0;
        if (col === 2) {
            this.detalleregistrofactura.forEach((key) => {
                _cantidad = _cantidad + key.fd_total;
            });
        }
        if (this.iDocumento.fa_tipofactura === 'B') {
            this.detalleregistrofactura.forEach((key) => {
                this.iDocumento.fa_subtotal = parseFloat(this.iDocumento.fa_subtotal) + parseFloat((key.fd_subtotal === "") ? 0 : key.fd_subtotal);
                this.iDocumento.fa_subtotalexento = parseFloat(this.iDocumento.fa_subtotalexento) + parseFloat((key.fd_base0 === "") ? 0 : key.fd_base0);
                this.iDocumento.fa_baseiva = parseFloat(this.iDocumento.fa_baseiva) + parseFloat((key.fd_baseiva === "") ? 0 : key.fd_baseiva);
                this.iDocumento.fa_iva = parseFloat(this.iDocumento.fa_iva) + parseFloat((key.fd_iva === "") ? 0 : key.fd_iva);
                this.iDocumento.fa_total = parseFloat(this.iDocumento.fa_total) + parseFloat((key.fd_total === "") ? 0 : key.fd_total);
            });
        } else {
            this.detalleregistrofactura.forEach((key) => {
                this.iDocumento.fa_subtotal = parseFloat(this.iDocumento.fa_subtotal) + parseFloat((key.fd_subtotal === "") ? 0 : key.fd_subtotal);
                this.iDocumento.fa_subtotalexento = parseFloat(this.iDocumento.fa_subtotalexento) + (parseFloat((key.fd_base0 === "") ? 0 : key.fd_base0) * ((key.fd_cantidad === "") ? 1 : key.fd_cantidad));
                this.iDocumento.fa_baseiva = parseFloat(this.iDocumento.fa_baseiva) + (parseFloat((key.fd_baseiva === "") ? 0 : key.fd_baseiva) * ((key.fd_cantidad === "") ? 1 : key.fd_cantidad));
                this.iDocumento.fa_iva = parseFloat(this.iDocumento.fa_iva) + parseFloat((key.fd_iva === "") ? 0 : key.fd_iva);
                this.iDocumento.fa_total = parseFloat(this.iDocumento.fa_total) + parseFloat((key.fd_total === "") ? 0 : key.fd_total);
            });
        }
        return _cantidad.toFixed(2);
    }

    validar() {
        this.smensaje = "";

        if (this.iDocumento.cl_codigo === "") {
            this.smensaje = "No Tiene seleccionado ninguna Cliente ...Por Favor Revisar"
            return;
        }



        if (this.detalleregistrofactura.length <= 0) {
            this.smensaje = "No Tiene ingresado ningun detalle de factura ...Por Favor Revisar"
            return;
        }



    }
    modificarfactura() {
        if (this.iDocumento.fa_estado_electronico === 'RG') {
            this.habilitarfrom(3);
            this.limpiabotones(2);
        } else {
            this.mensaje("1", "No se puede modificar la nota de credito ya esta en proceso del sri ...Por Favor Revisar")
            return;
        }
    }
    confirmarguardar(parent: any) {
        this.parentsvg = parent;
        if (this.isAccion === "I") {
            this.mensaje("4", "Esta seguro de guardar la nota de credito");
        } else if (this.isAccion === "M") {
            this.mensaje("4", "Esta seguro de modificar la nota de credito");
        }

    }
    confirmareliminar() {
        if (this.iDocumento.fa_estado_electronico !== 'RG') {
            this.mensaje("1", "No se puede eliminar la nota de credito ya esta en proceso del sri ...Por Favor Revisar")
            return;
        } else {
            this.mensaje("5", "Esta seguro de eliminar la nota de credito N°." + this.iDocumento.fa_establecimiento + '-' + this.iDocumento.fa_punto_emision + '-' + this.iDocumento.fa_secuencial);
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
       // this.iDocumento.fa_clave = this.parentsvg.bcElement.nativeElement.innerHTML;
        this.iDocumento.detalle = this.detalleregistrofactura;
        this.facturacionService.updateFacturanc(this.iDocumento).subscribe(data => {
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
    updateFactura2() {
        this.spinner.show();
      //  this.iDocumento.fa_clave = this.parentsvg.bcElement.nativeElement.innerHTML;
  
        this.iDocumento.detalle = this.detalleregistrofactura;
        this.facturacionService.updateFactura2(this.iDocumento).subscribe(data => {
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
    guardafacturafin(img: any) {

/*        var img: any = document.getElementById('my-node')*/
        const parts = img.split(';base64,')[1];

        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;
        this.iDocumento.fa_estado = 1;
        this.iDocumento.fa_clave = parts;

        this.iDocumento.detalle = this.detalleregistrofactura;
        this.facturacionService.insertNotaCredito(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    var mensaje: string = "";
                    mensaje = mensaje + data.msgError + "<br/>";
                    //var _datos: any[] = [];
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
    insertFactura() {
   
        svgAsPngUri(document.querySelector('svg'), {},  (pngUri: any) => {
           
            var img: any = pngUri;
            this.guardafacturafin(img);
           

        });

       

    }

    generaclave() {

        var dato: string = "";
        dato.replace('-', '')
        var compa: any = Funcion.returdatosession("compania");
        var fecha = (this.iDocumento.fa_fecha_factura != "") ? this.iDocumento.fa_fecha_factura.toString().substr(8, 2) + this.iDocumento.fa_fecha_factura.toString().substr(5, 2) + this.iDocumento.fa_fecha_factura.toString().substr(0, 4) : "";
        var numero: string = (this.iDocumento.fa_numero_nota_credito != "" && this.iDocumento.fa_numero_nota_credito != undefined) ? this.iDocumento.fa_numero_nota_credito.replace('-', '') : ""
        numero = numero.toString().replace("-", "");
        this.datoscla = fecha + "04" + compa.fae_ruc + compa.fae_tipo_ambiente + numero + "12345678" + compa.fae_tipo_emision;
        if (this.datoscla.length >= 47) {
            this.datoscla = this.datoscla + Funcion.algoritmoDigito11(this.datoscla.split(""));
        }
        if (this.datoscla.length >= 47) {
            var img: any = document.getElementById('my-node')
            svgAsPngUri(document.querySelector('svg'), {}, function (pngUri: any) {
     
                img.src = pngUri;

            });
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
                ;
                var fecha = new Date();
                var formatoFecha = moment(fecha);
                this.iDocumento.fa_fecha_factura = formatoFecha.format("YYYY-MM-DD").toString();
                this.iDocumento.fa_fecha_ingreso = formatoFecha.format("YYYY-MM-DD").toString();
                this.iDocumento.fp_sri_codigo = 1;
                this.generaclave();
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
                //                this.iDocumento = {}
                //;
                //                var fecha = new Date();
                //                var formatoFecha = moment(fecha);
                //                this.iDocumento.fp_sri_codigo = 1;
                //                this.iDocumento.fa_fecha_factura = formatoFecha.format("YYYY-MM-DD").toString();
                //                this.iDocumento.fa_fecha_ingreso = formatoFecha.format("YYYY-MM-DD").toString();

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

    

    buscarnotacredito() {
        this.spinner.show();
        this.boletoService.getNotaCredito(globales.cia).subscribe(data => {
            try {
                this.listfacturas = data.root[0];
                this.openModalgr(this.modalbusquedanotacredito, "modal-lg modal-primary");
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
        this.boletoService.getFacturapr(globales.cia).subscribe(data => {
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
    buscarboleto() {
        this.spinner.show();
        this.boletoService.getBoletoEntidadfa(globales.cia, this.iDocumento.cl_codigo, this.iDocumento.fa_tipo_iva).subscribe(data => {
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
        // if (typeof this?.coreDoc === 'undefined') {
        //   throw new Error(
        //     'A document must be specified. Are you avoiding namespace conflicts using fat arrow functions?'
        //   );
        // }
        var a = this._document.createElement("a");
        a.href = dataUrl;
        a.download = filename;
        this._document.body.appendChild(a); //Firefox requires link to be in body
        a.click();
        this._document.body.removeChild(a);
    }
    imagen: string = "";
    prueba(parentsvg: any) {

        //  const reader = new FileReader();

        //debugger;
        //var svg:any = document.querySelector('svg');
        //var img: any = document.getElementById('my-node')
        //var canvas: any = document.querySelector('canvas');

        //this.parentsvg = parentsvg.bcElement.nativeElement.innerHTML;
        //var xml = new XMLSerializer().serializeToString(svg);
        //var encodedData = window.btoa(xml);


        //var svg64 = btoa(xml);
        //var b64Start = 'data:image/svg+xml;base64,';

        //var image64 = b64Start + svg64;

        //let blobData = this.convertBase64ToBlob(image64);
        ////const blob = new Blob([blobData], { type: "image/png" });
        ////const url = window.URL.createObjectURL(blob);
        ////// window.open(url);
        ////const link = document.createElement('a');
        ////link.href = url;
        ////link.download = 'Qrcode';
        ////link.click();

        //// set it as the source of the img element
        //img.onload = function () {
        //    // draw the image onto the canvas
        //    canvas.getContext('2d').drawImage(img, 0, 0);
        //}
        ////img.src = image64;

        ////var node:any = document.getElementById('my-node');

        ////saveSvgAsPng(document.querySelector('svg'), "pngtest.png");

        ////svgAsPngUri(document.getElementById("diagram")).

        //    svgAsPngUri(document.querySelector('svg'), { scale: 2.0 }, function(pngUri:any) {
        //        img.src = pngUri;
        //    });

        //var encodedData = window.btoa(s);
        //let blobData = this.convertBase64ToBlob(encodedData);

        //htmlToImage.toSvg(this.parentsvg).then(dataUrl => {
        //  this.downloadDataUrl(dataUrl, "image-file.png");
        /*  });*/
        //var img: any = document.getElementById('my-node')
        //svgAsPngUri(document.querySelector('svg'), { }, function (pngUri: any) {
        //    img.src = pngUri;
        //});


        //const parts = img.src.split(';base64,')[1];

    }
    cambioradioIVA() {
        this.detalleregistrofactura = [];
    }
    cambioradio() {

        if (this.iDocumento.fa_tipofactura === "B") {
            this.iDocumento.fa_tipo_iva = "S";
        }
        this.detalleregistrofactura = [];
    }
    buscarboletofactura(linea: string) {
        this.spinner.show();
        this.facturacionService.GetBoletoFactura(globales.cia, linea).subscribe(data => {
            try {
                var datos: any[] = data.root[0];
                datos.forEach((c) => {
                    let index: number = this.detalleregistrofactura.findIndex((x) => x.fd_codigo_linea === c.fd_codigo_linea);
                    if (index < 0) {
                        this.detalleregistrofactura.push(c);
                    }

                });
                // = data.root[0];
                if (this.iDocumento.fa_tipo_iva === 'S') {
                    this.detalleregistrofactura.forEach((key) => {
                        key.fd_base0 = 0;
                        // parseFloat(key.fd_base0) + parseFloat(key.fd_baseiva) + parseFloat(key.fd_iva);
                        key.fd_baseiva = parseFloat(key.fd_valor_servicio);
                        this.calculoiva(key);
                    });
                }
                if (this.iDocumento.fa_tipo_iva === 'N') {
                    this.detalleregistrofactura.forEach((key) => {
                           key.fd_base0 = parseFloat(key.fd_total);
                       // key.fd_base0 = parseFloat(key.fd_base0) + parseFloat(key.fd_baseiva) + parseFloat(key.fd_iva);
                        key.fd_baseiva = 0;
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
        this.facturacionService.getFacturaSelect2(globales.cia, linea).subscribe(data => {
            try {

                var datos: any = data.root[0][0];

                this.iDocumento.cl_codigo = datos.cl_codigo;
                this.iDocumento.cl_nombre = datos.cl_nombre;
                this.iDocumento.cl_direccion = datos.cl_direccion;
                this.iDocumento.cl_correo = datos.cl_correo;
                this.iDocumento.fa_numero_factura = datos.fa_numero_factura;
                this.iDocumento.fa_fecha_factura_modi = datos.fa_fecha_factura;
                this.iDocumento.fp_sri_codigo = datos.fp_sri_codigo;
                this.iDocumento.fa_subtotal = datos.fa_subtotal;
                this.iDocumento.fa_subtotalexento = datos.fa_subtotalexento;
                this.iDocumento.fa_baseiva = datos.fa_baseiva;
                this.iDocumento.fa_iva = datos.fa_iva;
                this.iDocumento.fa_total = datos.fa_total;
                this.iDocumento.fa_tipofactura = datos.fa_tipofactura;
                this.iDocumento.fa_tipo_iva = datos.fa_tipo_iva;
        
              
                this.detalleregistrofactura = data.root[1];
                this.generaclave();
               
              //  this.limpiabotones(3);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.mensaje("2", err.message);
            this.spinner.hide();
        });

    }
    buscarNotaCreditoselect(linea: string) {
        this.spinner.show();
        this.facturacionService.getFacturaSelectNC(globales.cia, linea).subscribe(data => {
            try {
                this.iDocumento = data.root[0][0];
                this.iDocumento.fa_fecha_factura = moment(this.iDocumento.fa_fecha_factura).format("YYYY-MM-DD").toString();
                this.iDocumento.fa_fecha_ingreso = moment(this.iDocumento.fa_fecha_ingreso).format("YYYY-MM-DD").toString();
                this.detalleregistrofactura = data.root[1];
                if (this.iDocumento.fa_estado_electronico !== 'RG') {

                    this.estadofactura = "Factura Procesada";
                } else {
                    this.estadofactura = "Factura Sin Procesar";
                }

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
    cierreNotaCredito(event: string) {
        if (event !== "") {
            this.hideModal()
            this.buscarNotaCreditoselect(event);
        }
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
        if (this.iDocumento.fa_tipofactura === 'B') {
            row.fd_baseiva = (row.fd_baseiva.toString() === "") ? '0' : row.fd_baseiva.toString();
            row.fd_base0 = (row.fd_base0.toString() === "") ? '0' : row.fd_base0.toString();
            row.fd_subtotal = ((row.fd_baseiva.toString() === "") ? 0 : parseFloat(row.fd_baseiva.toString())) + ((row.fd_base0.toString() === "") ? 0 : parseFloat(row.fd_base0.toString()));
            row.fd_iva = ((parseFloat(row.fd_baseiva.toString())) * this.impuestoporcentaje) / 100;
            row.fd_total = parseFloat(row.fd_subtotal.toString()) + parseFloat(row.fd_iva.toString())
        } else {
            row.fd_baseiva = (row.fd_baseiva.toString() === "") ? '0' : row.fd_baseiva.toString();
            row.fd_base0 = (row.fd_base0.toString() === "") ? '0' : row.fd_base0.toString();
            row.fd_subtotal = ((row.fd_baseiva.toString() === "") ? 0 : parseFloat(row.fd_baseiva.toString())) + ((row.fd_base0.toString() === "") ? 0 : parseFloat(row.fd_base0.toString()));
            row.fd_subtotal = row.fd_subtotal * ((row.fd_cantidad === "") ? 1 : row.fd_cantidad);
            row.fd_iva = (((parseFloat(row.fd_baseiva.toString())) * ((row.fd_cantidad === "") ? 1 : row.fd_cantidad)) * this.impuestoporcentaje) / 100;
            row.fd_total = parseFloat(row.fd_subtotal.toString()) + parseFloat(row.fd_iva.toString())
        }

    }
    calculo(row: DetallePago, num: number) {

        let _valorcab = this.lineagrid.bd_total_general;

        let resume = this.detalleregistrofactura.filter((key) => {
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
    }
    buscar() {
        this.buscarnotacredito();
    }
    buscarFactura() {
        this.buscarfactura();
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
        this.iDocumento.cl_direccion = _datos.cl_direccion;
        this.iDocumento.cl_correo = _datos.cl_correo;
    }
    limpiarColor() {
        for (var i = 0; i < this.detalleboletopago.length; i++) {
            this.detalleboletopago[i].color = "";
        }
    }

    agregarlinea() {
        if (this.iDocumento.cl_codigo != "" && this.iDocumento.cl_codigo != undefined) {
            if (this.iDocumento.fa_tipofactura === "B") {
                this.buscarboleto();
            } else {
                this.detalleregistrofactura.push({
                    bc_codigo: this.detalleregistrofactura.length + 1,
                    fd_codigo_linea: "",
                    fd_descripcion: "",
                    fd_cantidad: "",
                    fd_base0: "",
                    fd_baseiva: "",
                    fd_subtotal: "",
                    fd_iva: "",
                    fd_total: ""
                });

            }

        } else {
            this.mensaje("1", "Debe seleccionar una Cliente");
        }


    }
    borrarlinea() {
        let index = this.detalleregistrofactura.findIndex(key => key.bc_codigo === this.lineagridse);
        this.detalleregistrofactura.splice(index, 1);
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
        if (this.detalleregistrofactura.length > 0) {
            for (var i = this.detalleregistrofacturageneral.length - 1; i >= 0; i--) {
                if (this.detalleregistrofacturageneral[i].seccab === this.lineagrid.sec) {
                    this.detalleregistrofacturageneral.splice(i, 1);
                }
            }
            this.detalleregistrofactura.forEach((key) => {
                this.detalleregistrofacturageneral.push(key);
            });
            this.detalleregistrofactura = [];
        } else {
            this.detalleregistrofactura.forEach((key) => {
                this.detalleregistrofacturageneral.push(key);
            });
            this.detalleregistrofactura = [];
        }
        this.lineagrid = row;

        let listado = this.detalleregistrofacturageneral.filter((key) => {
            return key.seccab === this.lineagrid.sec;
        });
        this.detalleregistrofactura = listado;
        this.lineaselect = "Registro Pago " + this.lineagrid.cl_nombre + " Boleto " + this.lineagrid.bd_ticket + " Total " + this.lineagrid.bd_total_general;
    }

    limpiarColorseg() {
        for (var i = 0; i < this.detalleregistrofactura.length; i++) {
            this.detalleregistrofactura[i].color = "";
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
        this.llamarmodal = _tipo + "|Registro Nota Credito|" + _mensaje + "|" + Funcion.Ramdon().toString();
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
