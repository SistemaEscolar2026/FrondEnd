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

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './reporteordenpago.component.html',
    styleUrls: ['./reporteordenpago.component.scss']
})
export class ReporteOrdenPagoComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedadocbancario') modalbusquedadocbancario: any;
    @ViewChild('modalbusquedadoconciliacion') modalbusquedadoconciliacion: any;

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
    /**
   * DEFINICION DE VARIABLE DE LISTADO DE OBJETO DE ESTADO
   */
    listconciliacionbusquedad: any[] = [];
    listEstado: any[] = [];
    listcuentas: any[] = [];
    listbancosbusquedad: any[] = [];
    iAccion: string = "";
    llamarmodal: string = "";
    listtipodocumento: any[] = [];
    listbancos: any[] = [];
    listcuentabancaria: any[] = [];
    listnumerocuenta: any[] = [];
    detalleregistro: any[] = [];
    listparametro: any = {};
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
        this.cancelar();
    }

    /**
   * DEFINICION PARA HABILITAR EL FROM
   */
    habilitarfrom(val: Number) {
        switch (val) {
            case 1:
                this.iAccion = "";
                this.habilitaobjetofrom = false;
                this.habilitaobjetofrom2 = false;
                break;
            case 2:
                this.iAccion = "I";
                this.habilitaobjetofrom = false;
                this.habilitaobjetofrom2 = false;
                break;
            case 3:
                this.habilitaobjetofrom = false;
                this.habilitaobjetofrom2 = false;
                this.iAccion = "M";
                break;
        }
    }


    confirmarguardar() {
        if (this.iAccion === "I") {
            this.mensaje("4", "Esta seguro de realizar el cierre de conciliacion bancario");
        }

    }
    buscarpdf() {
        this.spinner.show();
        this.bancosService.repoteOrdenPago("PDF", globales.cia, this.iDocumento.bdo_fechaini, this.iDocumento.bdo_fechafin, this.iDocumento.ban_codigo, this.iDocumento.bcb_codigo, this.iDocumento.bnc_codigo, Funcion.returdatosession("usuario").us_login,"prueba").subscribe((results) => {
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

    totalColumna(col: number) {
        let _cantidad: number = 0;

        return _cantidad.toFixed(2);
    }

    limpiabotones(_dato: Number) {
        switch (_dato) {
            case 1:
                this.botones.btnnuevo = false;
                this.botones.btnmodificar = true;
                this.botones.btngrabar = true
                this.botones.btneliminar = false;
                this.botones.btncancelar = false;
                this.botones.btnbuscar = false;
                this.botones.btnsalir = false;
                break;
            case 2:
                this.botones.btnnuevo = true;
                this.botones.btnmodificar = true;
                this.botones.btngrabar = false
                this.botones.btneliminar = false;
                this.botones.btncancelar = false;
                this.botones.btnbuscar = true;
                this.botones.btnsalir = false;
                break;
            case 3:
                this.botones.btnnuevo = true;
                this.botones.btnmodificar = true;
                this.botones.btngrabar = false
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
    constructor(private spinner: NgxSpinnerService, _router: Router, private mantenimientoService: MantenimientoService, private modalService: BsModalService, private fb: FormBuilder, private bancosService: BancosService, private injector: Injector) {
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
    cierreConciliacionBancario(event: any) {
        if (event !== "") {
            this.hideModal()
            var data:any = JSON.parse(event);
            this.buscardatos2(data.bco_codigo);
        }
    }

    //buscardatos
    cargaBancos() {
        this.spinner.show();
        this.bancosService.getCargaConciliacionPendiente(globales.cia).subscribe(data => {
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
    cargaParametro() {
        this.spinner.show();
        this.mantenimientoService.manParanetro(globales.cia).subscribe(data => {
            try {
                var datos: any[] = data.root[0];

                this.listparametro = datos.find((x) => x.pa_descripcion === "DOCUMENTOBANCO");
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
    calculo() {
        this.iDocumento.bdo_actuallibro = parseFloat(this.iDocumento.bdo_anteriorlibro) + parseFloat(this.iDocumento.bdo_debelibro) - parseFloat(this.iDocumento.bdo_haberlibro);
        this.iDocumento.bdo_actualbanco = parseFloat((this.iDocumento.bdo_anteriorbanco === '' || this.iDocumento.bdo_anteriorbanco === undefined) ? "0" : this.iDocumento.bdo_anteriorbanco) + parseFloat((this.iDocumento.bdo_debebanco === "" || this.iDocumento.bdo_debebanco === undefined) ? "0" : this.iDocumento.bdo_debebanco) - parseFloat((this.iDocumento.bdo_haberbanco === "" || this.iDocumento.bdo_haberbanco === undefined) ? "0" : this.iDocumento.bdo_haberbanco);

        this.iDocumento.bdo_anteriorconciliacion = parseFloat((this.iDocumento.bdo_anteriorlibro === "" || this.iDocumento.bdo_anteriorlibro === undefined) ? "0" : this.iDocumento.bdo_anteriorlibro) - parseFloat((this.iDocumento.bdo_anteriorbanco === "" || this.iDocumento.bdo_anteriorbanco === undefined) ? "0" : this.iDocumento.bdo_anteriorbanco);
        this.iDocumento.bdo_debeconciliacion = parseFloat((this.iDocumento.bdo_debelibro === "" || this.iDocumento.bdo_debelibro === undefined) ? "0" : this.iDocumento.bdo_debelibro) - parseFloat((this.iDocumento.bdo_debebanco === "" || this.iDocumento.bdo_debebanco === undefined) ? "0" : this.iDocumento.bdo_debebanco);
        this.iDocumento.bdo_haberconciliacion = parseFloat((this.iDocumento.bdo_haberlibro === "" || this.iDocumento.bdo_haberlibro === undefined) ? "0" : this.iDocumento.bdo_haberlibro) - parseFloat((this.iDocumento.bdo_haberbanco === "" || this.iDocumento.bdo_haberbanco === undefined) ? "0" : this.iDocumento.bdo_haberbanco);
        this.iDocumento.bdo_actualconciliacion = parseFloat((this.iDocumento.bdo_actuallibro === "" || this.iDocumento.bdo_actuallibro === undefined) ? "0" : this.iDocumento.bdo_actuallibro) - parseFloat((this.iDocumento.bdo_actualbanco === "" || this.iDocumento.bdo_actualbanco === undefined) ? "0" : this.iDocumento.bdo_actualbanco);
    }
    seleccuenta() {
        this.iDocumento.bdo_debelibro = 0;
        this.iDocumento.bdo_haberlibro = 0;
        this.iDocumento.bdo_anteriorlibro = this.listnumerocuenta.find((x) => x.bnc_codigo === parseInt(this.iDocumento.bnc_codigo)).bsc_saldo;
        this.detalleregistro = [];
        this.calculo();
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
        if (this.iDocumento.cob_codigo !== null) {
            this.mensaje("1", "El documento bancario tiene un asiento contable no se puede eliminar")
            return;
        }
        if (this.iDocumento.ban_estado_concilacion !== 'N') {
            this.mensaje("1", "El documento bancario esta conciliado no se puede eliminar")
            return;
        }


        this.spinner.show();
        this.iDocumento.bdo_estado = "D";
        this.bancosService.deleteDocumentoBancario(this.iDocumento).subscribe(data => {
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
            this.notifier.showError(err.error.Message);
            this.spinner.hide();
        });
    }

    /**
  * DEFINICION DE FUNCION PARA INSERTAR UN VENDEDOR
  */
    insertdocumentobancos() {
        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;
        this.iDocumento.us_codigo_cierre = Funcion.returdatosession("usuario").us_codigo;
        this.iDocumento.bco_cierre_estado = "C";
        this.iDocumento.bco_fechacierre = this.iDocumento.bdo_fechacierre;
        this.bancosService.updateConcilacionBancariaCierre(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    var mensaje: string = "";
                    mensaje = mensaje + data.msgError + "<br/>";

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
    /**
  * DEFINICION DE FUNCION PARA ACTUALIZAR UN VENDEDOR
  */
    updatedocumentobancos() {
        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;
        this.iDocumento.us_codigo = Funcion.returdatosession("usuario").us_codigo;
        this.iDocumento.bdo_estado = "A";
        this.iDocumento.detalle = this.detalleregistro;
        this.bancosService.updateDocumentoBancio(this.iDocumento).subscribe(data => {
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

        if (this.iDocumento.bdo_anteriorbanco === "" || this.iDocumento.bdo_anteriorbanco === undefined) {
            this.smensaje = "Debe ingresar el Saldo Anterior segun bancos ...Por Favor Revisar"
            return true;
        }

        if (this.iDocumento.bdo_debebanco === "" || this.iDocumento.bdo_debebanco === undefined) {
            this.smensaje = "Debe ingresar el Total Deber segun bancos ...Por Favor Revisar"
            return true;
        }

        if (this.iDocumento.bdo_haberbanco === "" || this.iDocumento.bdo_haberbanco === undefined) {
            this.smensaje = "Debe ingresar el Total Haber segun bancos ...Por Favor Revisar"
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
            if (this.iAccion === "I") {
                this.insertdocumentobancos();
            } else {
                this.updatedocumentobancos();
            }
        }
    }

    modificar() {
        if (this.iDocumento.cob_codigo !== null) {
            this.mensaje("1", "El documento bancario tiene un asiento contable no se puede modificar")
            return;
        }
        if (this.iDocumento.ban_estado_concilacion !== 'N') {
            this.mensaje("1", "El documento bancario esta conciliado no se puede eliminar")
            return;
        }

        this.habilitarfrom(3);
        this.limpiabotones(2);
    }
    buscardatos2(bco_codigo:string) {
        this.iDocumento.bdo_debelibro = 0;
        this.iDocumento.bdo_haberlibro = 0;
        this.spinner.show();
        this.bancosService.getCargaConciliacionCierreselect(globales.cia, bco_codigo).subscribe(data => {
            try {
                var datos: any[] = data.root[0];
                if (datos.length > 0) {
                    this.iDocumento = data.root[0][0];
                    var fecha = new Date();
                    var formatoFecha = moment(fecha);
                    this.iDocumento.bdo_fechacierre = formatoFecha.format("YYYY-MM-DD").toString();
                    this.iDocumento.bdo_fechaini = moment(this.iDocumento.bdo_fechaini).format("YYYY-MM-DD").toString();
                    this.iDocumento.bdo_fechafin = moment(this.iDocumento.bdo_fechafin).format("YYYY-MM-DD").toString();
                    this.iDocumento.bdo_usuariocierre = Funcion.returdatosession("usuario").us_login
                    this.limpiabotones(3);
                    this.habilitaobjetofrom = true;
                    this.habilitaobjetofrom2 = false;
                } else {
                    this.mensaje("1", "No exite una conciliacion en los parametros indicados ...Por Favor Revisar")
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
    buscardatos() {
        this.iDocumento.bdo_debelibro = 0;
        this.iDocumento.bdo_haberlibro = 0;
        this.spinner.show();
        this.bancosService.getCargaConciliacionCierre(globales.cia, this.iDocumento.ban_codigo, this.iDocumento.bcb_codigo, this.iDocumento.bnc_codigo, this.iDocumento.bdo_fechaini, this.iDocumento.bdo_fechafin).subscribe(data => {
            try {
                var datos: any[] = data.root[0];
                if (datos.length > 0) {
                    this.iDocumento = data.root[0][0];
                    var fecha = new Date();
                    var formatoFecha = moment(fecha);
                    this.iDocumento.bdo_fechacierre = formatoFecha.format("YYYY-MM-DD").toString();
                    this.iDocumento.bdo_fechaini = moment(this.iDocumento.bdo_fechaini).format("YYYY-MM-DD").toString();
                    this.iDocumento.bdo_fechafin = moment(this.iDocumento.bdo_fechafin).format("YYYY-MM-DD").toString();
                    this.iDocumento.bdo_usuariocierre = Funcion.returdatosession("usuario").us_login
                    this.limpiabotones(3);
                    this.habilitaobjetofrom = true;
                    this.habilitaobjetofrom2 = false;
                } else {
                    this.mensaje("1", "No exite una conciliacion en los parametros indicados ...Por Favor Revisar")
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
    selec() {
        this.iDocumento.bdo_debelibro = 0;
        this.iDocumento.bdo_haberlibro = 0;
        this.detalleregistro.filter((x) => {
            if (x.sele) {
                this.iDocumento.bdo_debelibro += x.bdo_deber;
                this.iDocumento.bdo_haberlibro += x.bdo_haber;
            }
        });
        this.calculo();
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
        this.iDocumento.bdo_observacion = "";
        var fecha = new Date();
        var formatoFecha = moment(fecha);
        this.iDocumento.bdo_fechaini = formatoFecha.format("YYYY-MM-DD").toString();
        this.iDocumento.bdo_fechafin = formatoFecha.format("YYYY-MM-DD").toString();
        this.submitted = false;

        this.detalleregistro = [];
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
        this.llamarmodal = _tipo + "|Cierre Conciliacion Bancario|" + _mensaje + "|" + Funcion.Ramdon().toString();
    }
    openModalgr(content: string, tipo: string) {
        this.modalRef = this.modalService.show(
            content, { class: tipo });
    }
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
    /**
  * DEFINICION DE FUNCION APERTURA DE MODAL
  */
    openModal(content: string) {
        this.modalRef = this.modalService.show(
            content);
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
