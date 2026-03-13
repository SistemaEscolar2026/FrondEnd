import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Funcion } from '@funciones/funciones';
import { BancosService } from '@services/bancos-service';
import { MantenimientoService } from '@services/mantenimiento-service';
import { NgxSpinnerService } from "ngx-spinner";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BotonesModel } from '@modelo/botones-model';
import { globales, environment } from 'src/environments/environment';
import { ServiceMensaje } from '@services/config/ServiceMensaje';
import * as moment from 'moment';
import { BoletoService } from '@services/boleto-service';
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './reversoordenpago.component.html',
    styleUrls: ['./reversoordenpago.component.scss']
})
export class ReversoOrdenPagoComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedadoconciliacion') modalbusquedadoconciliacion: any;
    @ViewChild('modalbusquedaproveedor') modalbusquedaproveedor: any;

    @ViewChild('modalbusquedadofactura') modalbusquedadofactura: any;


    @ViewChild('modalbusquedaplancuenta') modalbusquedaplancuenta: any;
    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    modalRef: any;
    /**
  * DEFINICION DE VARIABLE DE CONTROL DE ACCION SUBMIT DE PAGINA
  */
    submitted = false;
    lineagridse: string = "";
    /**
   * DEFINICION DE VARIABLE DE RUTA LA CUAL NOS PERMITA REDIRECCIONAR A OTRA PAGINA
   */
    router: Router;
    /**
  * DEFINICION DE VARIABLE MODAL DE MANEJO DE LA SECCION DE BOTONES
  */
    botones: BotonesModel = new BotonesModel();
    /**
  * DEFINICION DE VARIABLE NOTIFICACION TIPO TOAS
  */
    notifier: any;
    ColumnaDetalle: any[] = ['#', 'F. Emisión', 'RUC', 'Razón Social', 'No. De factura', 'Sub. 12%', 'Sub. 0%', 'No objeto', 'IVA', 'Total'];
    listEstado: any[] = [];
    listcuentas: any[] = [];
    listconciliacionbusquedad: any[] = [];
    iAccion: string = "";
    llamarmodal: string = "";
    listtipodocumento: any[] = [];
    listproveedor: any[] = []
    listbancos: any[] = [];
    listcuentabancaria: any[] = [];
    listnumerocuenta: any[] = [];
    detalleregistro: any[] = [];
    detalleregistrofact: any[] = [];
    listparametro: any = {};
    listparametro2: any = {};
    listnaturaleza: any[] = [];
    iDocumento: any = {};
    habilitaobjetofrom: boolean = true;
    habilitaobjetofrom2: boolean = true;
    alto: string = "";
    smensaje: string = "";
    /**
   * DEFINICION DE VARIABLE DE MODELO DE VENDEDOR
   */
    model: any = {};
    /**
 * DEFINICION DE FUNCION INIT DE LA CLASE
 */
    ngOnInit() {
        this.limpiabotones(1);
        this.plancuenta();
        this.cancelar();
    }

    cargaPlanCuenta(row: any) {
        this.lineagridse = row.bdd_linea;

        if (row.bdd_linea > 2 && (this.iAccion === "I" || this.iAccion === "M")) {
            this.limpiarColorseg();
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
    cargaBancos() {
        this.spinner.show();
        this.bancosService.getOrdenPagoAprobar(globales.cia,"C").subscribe(data => {
            try {
                this.listconciliacionbusquedad = data.root[0];

                this.openModalgr(this.modalbusquedadoconciliacion, "modal-lg modal-primary");
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }

    /**
   * DEFINICION PARA HABILITAR EL FROM
   */
    habilitarfrom(val: Number) {
        switch (val) {
            case 1:
                this.iAccion = "";
                this.habilitaobjetofrom = true;
                this.habilitaobjetofrom2 = true;
                break;
            case 2:
                this.iAccion = "I";
                this.habilitaobjetofrom = false;
                this.habilitaobjetofrom2 = false;
                break;
            case 3:
                this.habilitaobjetofrom = false;
                this.habilitaobjetofrom2 = true;
                this.iAccion = "M";
                break;
        }
    }


    confirmarguardar() {
        this.mensaje("4", "Esta seguro de Reversar la orden de pago");

    }


    limpiarColorseg() {
        for (var i = 0; i < this.detalleregistro.length; i++) {
            this.detalleregistro[i].color = "";
        }
    }
    clickGrid(row: any) {
        this.lineagridse = row.bdd_linea;
        this.limpiarColorseg();
        row.color = "SG";
    }
    totalColumna(col: number) {
        let _cantidad: number = 0;
        if (col === 1) {
            this.detalleregistro.forEach((key) => {
                _cantidad = _cantidad + key.baseiva;
            });
        }
        if (col === 2) {
            this.detalleregistro.forEach((key) => {
                _cantidad = _cantidad + key.base0;
            });
        }
        if (col === 3) {
            this.detalleregistro.forEach((key) => {
                _cantidad = _cantidad + key.cxp_subtotal;
            });
        }
        if (col === 4) {
            this.detalleregistro.forEach((key) => {
                _cantidad = _cantidad + key.cxp_iva;
            });
        }
        if (col === 5) {
            this.detalleregistro.forEach((key) => {
                _cantidad = _cantidad + key.cxp_total;
            });
        }
        return _cantidad.toFixed(2);
    }
    borrarlinea() {
        let index = this.detalleregistro.findIndex(key => key.bc_codigo === this.lineagridse);
        this.detalleregistro.splice(index, 1);
        this.totalColumna(2);
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
                this.botones.btnsalir = false;
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

    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(private spinner: NgxSpinnerService, private boletoService: BoletoService, _router: Router, private mantenimientoService: MantenimientoService, private modalService: BsModalService, private fb: FormBuilder, private bancosService: BancosService, private injector: Injector) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Mantenimiento de Banco')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listEstado = Funcion.Estado();
        this.notifier = this.injector.get(ServiceMensaje);
        this.habilitarfrom(1);
        this.cargabanco();
        this.cargaCuentaBancaria();
        this.cargaTipoDocumento();
        this.cargaParametro();
        this.plancuenta();
        this.listnaturaleza = Funcion.ListNaturaleza();
        this.alto = ((screen.height / 2) - 50).toString();
    }

    plancuenta() {
        this.spinner.show();
        this.mantenimientoService.manPlanCuenta(globales.cia).subscribe(data => {
            try {
                this.listcuentas = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cierreProveedor(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaCliente(JSON.parse(event))
        }
    }
    seteaCliente(_datos: any) {
        this.iDocumento.pr_codigo = _datos.pr_codigo;
        this.iDocumento.pr_nombre = _datos.pr_nombre;
        this.iDocumento.cl_direccion = _datos.cl_direccion;
        this.iDocumento.cl_correo = _datos.cl_correo;
        //    this.habilitaobjetofrom2 = true;
    }
    cierreModalproveedor(event: any) {
        if (event) {
            this.hideModal()
        }
    }
    agregalinea() {
        this.detalleregistro = [];
        if (this.iDocumento.bnc_codigo !== "" && this.iDocumento.bnc_codigo !== null && this.iDocumento.bnc_codigo !== undefined && this.iDocumento.ban_codigo !== "" && this.iDocumento.ban_codigo !== null && this.iDocumento.ban_codigo !== undefined && this.iDocumento.bcb_codigo !== "" && this.iDocumento.bcb_codigo !== null && this.iDocumento.bcb_codigo !== undefined) {


            var cuenta: any = this.listcuentas.find((x) => x.cpc_codigo_co === this.listparametro.pa_valor);

            this.detalleregistro.push({
                bdd_linea: this.detalleregistro.length + 1,
                cpc_codigo: cuenta.cpc_codigo,
                cpc_codigo_co: cuenta.cpc_codigo_co,
                cpc_descripcion: cuenta.cpc_descripcion,
                cpc_naturaleza: "A",
                bdd_valor: "",
                bdd_glosa: ""
            });
            var cuenta: any = this.listcuentas.find((x) => x.cpc_codigo_co === this.listparametro2.pa_valor);

            this.detalleregistro.push({
                bdd_linea: this.detalleregistro.length + 1,
                cpc_codigo: cuenta.cpc_codigo,
                cpc_codigo_co: cuenta.cpc_codigo_co,
                cpc_descripcion: cuenta.cpc_descripcion,
                cpc_naturaleza: "D",
                bdd_valor: "",
                bdd_glosa: ""
            });


        } else {
            this.mensaje("1", "Debe seleccion un banco, tipo cuenta, numero de cuenta y tipo documento por favor verificar...");
        }


    }
    cargaParametro() {
        this.spinner.show();
        this.mantenimientoService.manParanetro(globales.cia).subscribe(data => {
            try {
                var datos: any[] = data.root[0];

                this.listparametro = datos.find((x) => x.pa_descripcion === "DOCUMENTOBANCO");
                this.listparametro2 = datos.find((x) => x.pa_descripcion === "DOCUMENTOBANCOPRV");


                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }

    nuevo() {
        this.limpiabotones(2);
        this.habilitarfrom(2);
    }
    cancelar() {
        this.limpiabotones(1);
        this.limpiardocumento();
        this.habilitarfrom(1);
    }
    cargaTipoDocumento() {
        this.spinner.show();
        this.listtipodocumento = [];
        this.bancosService.manTipoDocumento(globales.cia).subscribe(data => {
            try {
                this.listtipodocumento = [{
                    btd_codigo: "",
                    btd_descripcion: ""
                }];
                data.root[0].forEach((x: any) => {
                    this.listtipodocumento.push(x);
                });
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }


    cargaNumeroCuenta() {
        if (this.iDocumento.ban_codigo !== "" && this.iDocumento.bcb_codigo !== "") {
            this.spinner.show();
            this.listnumerocuenta = [];
            this.bancosService.GetNumeroCuenta3pnw(globales.cia, this.iDocumento.ban_codigo, this.iDocumento.bcb_codigo).subscribe(data => {
                try {
                    this.listnumerocuenta = [{
                        bnc_codigo: 0,
                        bnc_numero: "",
                        bsc_saldo: 0
                    }];
                    data.root[0].forEach((x: any) => {
                        this.listnumerocuenta.push(x);
                    });
                    /*             this.listnumerocuenta = data.root[0];*/
                    this.spinner.hide();
                } catch (e) {
                    this.spinner.hide();
                }
            }, () => {
                this.spinner.hide();
            });
        }


    }
    cargaCuentaBancaria() {
        this.spinner.show();
        this.listcuentabancaria = [];
        this.bancosService.manCuentaBancaria(globales.cia).subscribe(data => {
            try {
                this.listcuentabancaria = [{
                    bcb_codigo: "",
                    bcb_descripcion: ""
                }];
                data.root[0].forEach((x: any) => {
                    this.listcuentabancaria.push(x);
                });

                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cargabanco() {
        this.spinner.show();
        this.listbancos = [];
        this.bancosService.manBancos(globales.cia).subscribe(data => {
            try {
                this.listbancos = [{
                    ban_codigo: "",
                    ban_descripcion: ""
                }];
                data.root[0].forEach((x: any) => {
                    this.listbancos.push(x);
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
  * DEFINICION DE FUNCION PARA BORRAR VENDEDOR
  */
    deletebancos() {
        if (this.iDocumento.bop_estado_aprobacion !== 'P') {
            this.mensaje("1", "La orden de pago esta cerrada no se puede eliminar")
            return;
        }
        if (this.iDocumento.cob_codigo !== null) {
            this.mensaje("1", "la Orden de Pago tiene un asiento contable no se puede eliminar")
            return;
        }

        this.spinner.show();
        this.iDocumento.bop_estado = "D";
        this.bancosService.deleteOrdenPago(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.cancelar();
                } else {
                    this.notifier.showError(data.msgError);
                }
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.spinner.hide();
            this.notifier.showError(err.error.Message);

        });
    }

    /**
  * DEFINICION DE FUNCION PARA INSERTAR UN VENDEDOR
  */
    insertdocumentobancos() {
        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;
        this.iDocumento.us_codigo_aprobacion = null;
        this.iDocumento.bop_estado_aprobacion = "P";
        this.bancosService.UpdateOrdenReverso(this.iDocumento).subscribe(data => {
            try {
                this.spinner.hide();
                if (data.success) {
                    var mensaje: string = "";
                    mensaje = mensaje + data.msgError + "<br/>";
                    this.mensaje("3", mensaje);
                    this.cancelar();
                } else {
                    this.notifier.showError(data.msgError);
                }
              
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.notifier.showError(err.error.Message);
            this.spinner.hide();
        });
    }
    /**
  * DEFINICION DE FUNCION PARA ACTUALIZAR UN VENDEDOR
  */
    updatedocumentobancos() {
        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;
        this.iDocumento.bop_estado = "A";
        this.iDocumento.us_codigo = Funcion.returdatosession("usuario").us_codigo;
        this.iDocumento.detalleFac = this.detalleregistrofact.filter((x) => x.sele === true);
        this.iDocumento.detalle = this.detalleregistro;
        this.bancosService.updateOrdenPago(this.iDocumento).subscribe(data => {
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
    validar() {
        this.smensaje = "";

        if (this.iDocumento.cob_codigo !== null) {
            this.smensaje = "La Orden de Pago tiene un asiento contable no se puede reversar";
            return true;
        }

        if (this.iDocumento.ban_codigo === "" || this.iDocumento.ban_codigo === undefined) {
            this.smensaje = "No Tiene seleccionado ninguna Banco ...Por Favor Revisar"
            return true;
        }


        if (this.iDocumento.bcb_codigo === "" || this.iDocumento.bcb_codigo === undefined) {
            this.smensaje = "No Tiene seleccionado ninguna Tipo Cuenta ...Por Favor Revisar"
            return true;
        }

        if (this.iDocumento.bnc_codigo === "" || this.iDocumento.bnc_codigo === undefined) {
            this.smensaje = "No Tiene seleccionado ninguna Numero Cuenta ...Por Favor Revisar"
            return true;
        }

        if (this.iDocumento.btd_codigo === "" || this.iDocumento.btd_codigo === undefined) {
            this.smensaje = "No Tiene seleccionado un tipo documento ...Por Favor Revisar"
            return true;
        }

        if (this.iDocumento.pr_nombre === "" || this.iDocumento.pr_nombre === undefined) {
            this.smensaje = "No Tiene seleccionado ningun proveedor ...Por Favor Revisar"
            return true;
        }
        if (this.detalleregistro.length <= 0) {
            this.smensaje = "No Tiene ingresado ningun detalle de Orden de Pago ...Por Favor Revisar"
            return true;
        }



        var debe: number = 0;
        var haber: number = 0;

        this.detalleregistro.forEach((x) => {
            if (x.cpc_naturaleza === 'A') {
                debe = debe + parseFloat((x.bdd_valor === "") ? "0" : x.bdd_valor);
            } else {
                haber = haber + parseFloat((x.bdd_valor === "") ? "0" : x.bdd_valor);
            }
        });

        if (debe !== haber || debe === 0 || haber === 0) {
            this.smensaje = "El Debe y Haber no cuadra ...Por Favor Revisar"
            return true;
        }

        return false;

    }
    guardardocumento() {
        this.submitted = true;
        if (this.validar()) {
            this.mensaje("1", this.smensaje);
            return;
        } else {
            this.insertdocumentobancos();
        }
    }

    modificar() {
        if (this.iDocumento.bop_estado_aprobacion !== 'P') {
            this.mensaje("1", "La Orden de pago esta aprobada no se puede modificar")
            return;
        }
        //if (this.iDocumento.ban_estado_concilacion !== 'N') {
        //    this.mensaje("1", "El documento bancario esta conciliado no se puede eliminar")
        //    return;
        //}

        this.habilitarfrom(3);
        this.limpiabotones(2);
    }
    selec(row: any) {
        var valor: number = 0;
        this.detalleregistro.forEach((x) => {
            if (x.sele) {
                valor += parseFloat(x.cxp_total);
            }
        });
        this.iDocumento.bop_total = valor.toFixed(2);
    }
    buscardatos() {
        this.iDocumento.bdo_debelibro = 0;
        this.iDocumento.bdo_haberlibro = 0;

        this.detalleregistrofact = this.detalleregistrofact.filter((x) => x.sele === 1);
        this.openModalgr(this.modalbusquedadofactura, "modal-lg modal-primary");
    }
    //selec() {
    //    this.iDocumento.bdo_debelibro = 0;
    //    this.iDocumento.bdo_haberlibro = 0;
    //    this.detalleregistro.filter((x) => {
    //        if (x.sele) {
    //            this.iDocumento.bdo_debelibro += x.bdo_deber;
    //            this.iDocumento.bdo_haberlibro += x.bdo_haber;
    //        }
    //    });
    //    this.calculo();
    //}}

    calculo(natu: string) {
        var valor: number = 0;

        this.detalleregistro.forEach((k: any) => {
            if (natu === k.cpc_naturaleza) {
                valor = valor + ((k.bdd_valor === "" || k.bdd_valor === undefined) ? 0 : parseFloat(k.bdd_valor));
            }


            //if (k.cod_naturaleza === "D") {
            //    this.iDocumento.cob_monto = ((this.iDocumento.cob_monto === "" || this.iDocumento.cob_monto === undefined) ? 0 : parseFloat(this.iDocumento.cob_monto)) + ((k.valor === "" || k.valor === undefined) ? 0 : parseFloat(k.valor));

            //}

        });

        if (natu === 'A') {
            this.iDocumento.bop_total = valor;
        }
    }
    seteaDocumentoBancario(data: any) {

        this.spinner.show();
        this.bancosService.getOrdenPagoSele(globales.cia, data.bop_codigo).subscribe(data => {
            try {
                this.iDocumento = data.root[0][0];
                var fecha = new Date();
                var formatoFecha = moment(fecha);
                this.iDocumento.bop_fecha_aprobacion = formatoFecha.format("YYYY-MM-DD").toString();
                this.iDocumento.bop_usuariocierre = Funcion.returdatosession("usuario").us_login
                this.iDocumento.bop_fecha_ingreso = moment(this.iDocumento.bop_fecha_ingreso).format("YYYY-MM-DD").toString();
                var datos: any[] = data.root[1];
                datos.forEach((x) => {
                    if (x.sele === 1) {
                        x.sele = true;
                    } else {
                        x.sele = false;
                    }
                });
                this.detalleregistro = data.root[1];
                this.detalleregistrofact = data.root[2];
                this.cargaNumeroCuenta();
                this.limpiabotones(3);
                this.botones.btngrabar = false;
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
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiardocumento() {

        this.iDocumento = {};
        this.iDocumento.bdo_codigo = "";
        this.iDocumento.ban_codigo = "";
        this.iDocumento.bcb_codigo = "";
        this.iDocumento.bnc_codigo = "";
        this.iDocumento.btd_codigo = "";
        this.iDocumento.bop_observacion = "";

        this.iDocumento.pr_codigo = "";
        this.iDocumento.pr_nombre = "";
        this.iDocumento.cl_direccion = "";
        this.iDocumento.cl_correo = "";


        var fecha = new Date();
        var formatoFecha = moment(fecha);
        this.iDocumento.bop_fechaini = formatoFecha.format("YYYY-MM-DD").toString();
        this.iDocumento.bop_fechafin = formatoFecha.format("YYYY-MM-DD").toString();
        this.iDocumento.bop_fecha_ingreso = formatoFecha.format("YYYY-MM-DD").toString();
        this.iDocumento.bop_observacion = "";
        this.iDocumento.bop_total = "";
        this.submitted = false;

        this.detalleregistro = [];
        this.detalleregistrofact = [];
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaBancos();
    }
    /**
  * DEFINICION DE FUNCION SALIR DE LA PANTALLA
  */
    salir() {
        this.router.navigate(['/principal/default'], {
            skipLocationChange: true,
        });
    }
    mensaje(_tipo: string, _mensaje: string) {
        this.llamarmodal = _tipo + "|Reverso Orden Pago|" + _mensaje + "|" + Funcion.Ramdon().toString();
    }
    /**
  * DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
  */
    cierreConciliacionBancario(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaDocumentoBancario(JSON.parse(event))
        }
    }
    /**
  * DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
  */
    cierreModalforma(event: any) {
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
    aceptar() {
        this.hideModal();
    }
    cancelarmod() {
        this.hideModal();
    }
    /**
  * DEFINICION DE FUNCION APERTURA DE openModalgr
  */
    openModal(content: string) {
        this.modalRef = this.modalService.show(
            content);
    }
    openModalgr(content: string, tipo: string) {
        this.modalRef = this.modalService.show(
            content, { class: tipo });
    }
    aceptarOk(event: boolean) {
        if (event) {
            this.cancelar();
        }
    }
    aceptarConfi(event: boolean) {
        if (event) {
            this.guardardocumento();
        }
    }
    aceptarConfiEli(event: boolean) {
        if (event) {

        }
    }
}
