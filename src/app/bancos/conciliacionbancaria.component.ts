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
    templateUrl: './conciliacionbancaria.component.html',
    styleUrls: ['./conciliacionbancaria.component.scss']
})
export class ConciliacionBancariaComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
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
    listEstado: any[] = [];
    listcuentas: any[] = [];
    listconciliacionbusquedad: any[] = [];
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
* DEFINICION DE FUNCION CARGA FORMA
*/
    cargaBancos() {
        this.spinner.show();
        this.bancosService.getCargaConciliacion(globales.cia).subscribe(data => {
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
    cargaPlanCuenta(row: any) {
        this.lineagridse = row.bdd_linea;

        if (row.bdd_linea > 1) {
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
    cierrePlanCuenta(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaPlanCuenta(JSON.parse(event))
        }
    }
    seteaPlanCuenta(dato: any) {
        let _index = this.detalleregistro.findIndex((k: any) => k.bdd_linea === this.lineagridse);
        this.detalleregistro[_index].cpc_codigo = dato.cpc_codigo;
        this.detalleregistro[_index].cpc_codigo_co = dato.cpc_codigo_co;
        this.detalleregistro[_index].cpc_descripcion = dato.cpc_descripcion;

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
    agregarlinea() {

        this.detalleregistro.push({
            bdd_linea: this.detalleregistro.length + 1,
            cpc_codigo: "",
            cpc_codigo_co: "",
            cpc_descripcion: "",
            cpc_naturaleza: "",
            bdd_valor: "",
            bdd_glosa: ""
        });
        this.habilitaobjetofrom2 = true;
    }

    confirmarguardar() {
        if (this.iAccion === "I") {
            this.mensaje("4", "Esta seguro de guardar la conciliacion bancaria");
        } else if (this.iAccion === "M") {
            this.mensaje("4", "Esta seguro de modificar la conciliacion bancaria");
        }

    }

    agregalinea() {
        if (this.iDocumento.bnc_codigo !== "" && this.iDocumento.bnc_codigo !== null && this.iDocumento.bnc_codigo !== undefined && this.iDocumento.ban_codigo !== "" && this.iDocumento.ban_codigo !== null && this.iDocumento.ban_codigo !== undefined && this.iDocumento.bcb_codigo !== "" && this.iDocumento.bcb_codigo !== null && this.iDocumento.bcb_codigo !== undefined && this.iDocumento.btd_codigo !== "" && this.iDocumento.btd_codigo !== null && this.iDocumento.btd_codigo !== undefined) {

            var dato: string = this.listtipodocumento.find((x) => x.btd_codigo === parseInt(this.iDocumento.btd_codigo)).btd_valor;

            var cuenta: any = this.listcuentas.find((x) => x.cpc_codigo_co === this.listparametro.pa_valor);

            this.detalleregistro.push({
                bdd_linea: this.detalleregistro.length + 1,
                cpc_codigo: cuenta.cpc_codigo,
                cpc_codigo_co: cuenta.cpc_codigo_co,
                cpc_descripcion: cuenta.cpc_descripcion,
                cpc_naturaleza: (dato === "I") ? "A" : "D",
                bdd_valor: "",
                bdd_glosa: ""
            });
            this.habilitaobjetofrom2 = true;
        } else {
            this.mensaje("1", "Debe seleccion un banco, tipo cuenta, numero de cuenta y tipo documento por favor verificar...");
        }


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
        if (this.iDocumento.bco_cierre_estado !== 'P') {
            this.mensaje("1", "La conciliacion bancaria esta cerrada no se puede eliminar")
            return;
        }


        this.spinner.show();
        this.iDocumento.bco_estado = "D";
        this.bancosService.deleteConciliacion(this.iDocumento).subscribe(data => {
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
        this.iDocumento.bco_estado = "A";
        this.iDocumento.us_codigo = Funcion.returdatosession("usuario").us_codigo;
        this.iDocumento.bco_fechaini = this.iDocumento.bdo_fechaini;
        this.iDocumento.bco_fechafin = this.iDocumento.bdo_fechafin;
        this.iDocumento.bco_anteriorlibro = this.iDocumento.bdo_anteriorlibro;
        this.iDocumento.bco_anteriorbanco = this.iDocumento.bdo_anteriorbanco;
        this.iDocumento.bco_anteriorconciliacion = this.iDocumento.bdo_anteriorconciliacion;
        this.iDocumento.bco_debelibro = this.iDocumento.bdo_debelibro;
        this.iDocumento.bco_debebanco = this.iDocumento.bdo_debebanco;
        this.iDocumento.bco_debeconciliacion = this.iDocumento.bdo_debeconciliacion;
        this.iDocumento.bco_haberlibro = this.iDocumento.bdo_haberlibro;
        this.iDocumento.bco_haberbanco = this.iDocumento.bdo_haberbanco;
        this.iDocumento.bco_haberconciliacion = this.iDocumento.bdo_haberconciliacion;
        this.iDocumento.bco_actuallibro = this.iDocumento.bdo_actuallibro;
        this.iDocumento.bco_actualbanco = this.iDocumento.bdo_actualbanco;
        this.iDocumento.bco_actualconciliacion = this.iDocumento.bdo_actualconciliacion;



        this.iDocumento.detalle = this.detalleregistro.filter((x) => x.sele === true);
        this.bancosService.insertConciliacionBancaria(this.iDocumento).subscribe(data => {
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
        this.iDocumento.bco_estado = "A";
        this.iDocumento.us_codigo = Funcion.returdatosession("usuario").us_codigo;
        this.iDocumento.bco_fechaini = this.iDocumento.bdo_fechaini;
        this.iDocumento.bco_fechafin = this.iDocumento.bdo_fechafin;
        this.iDocumento.bco_anteriorlibro = this.iDocumento.bdo_anteriorlibro;
        this.iDocumento.bco_anteriorbanco = this.iDocumento.bdo_anteriorbanco;
        this.iDocumento.bco_anteriorconciliacion = this.iDocumento.bdo_anteriorconciliacion;
        this.iDocumento.bco_debelibro = this.iDocumento.bdo_debelibro;
        this.iDocumento.bco_debebanco = this.iDocumento.bdo_debebanco;
        this.iDocumento.bco_debeconciliacion = this.iDocumento.bdo_debeconciliacion;
        this.iDocumento.bco_haberlibro = this.iDocumento.bdo_haberlibro;
        this.iDocumento.bco_haberbanco = this.iDocumento.bdo_haberbanco;
        this.iDocumento.bco_haberconciliacion = this.iDocumento.bdo_haberconciliacion;
        this.iDocumento.bco_actuallibro = this.iDocumento.bdo_actuallibro;
        this.iDocumento.bco_actualbanco = this.iDocumento.bdo_actualbanco;
        this.iDocumento.bco_actualconciliacion = this.iDocumento.bdo_actualconciliacion;



        this.iDocumento.detalle = this.detalleregistro.filter((x) => x.sele === true);
        this.bancosService.updateConcilacionBancaria(this.iDocumento).subscribe(data => {
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

        if (this.iDocumento.ban_codigo === "" || this.iDocumento.ban_codigo === undefined) {
            this.smensaje = "No Tiene seleccionado ninguna Banco ...Por Favor Revisar"
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

        if (this.iDocumento.bcb_codigo === "" || this.iDocumento.bcb_codigo === undefined) {
            this.smensaje = "No Tiene seleccionado ninguna Tipo Cuenta ...Por Favor Revisar"
            return true;
        }

        if (this.iDocumento.bnc_codigo === "" || this.iDocumento.bnc_codigo === undefined) {
            this.smensaje = "No Tiene seleccionado ninguna Numero Cuenta ...Por Favor Revisar"
            return true;
        }


        if (this.detalleregistro.length <= 0) {
            this.smensaje = "No Tiene ingresado ningun detalle de Documento Bancario ...Por Favor Revisar"
            return true;
        }

        if (this.detalleregistro.filter((x) => x.sele === true).length <= 0) {
            this.smensaje = "No Tiene seleccionado ningun Documento Bancario ...Por Favor Revisar"
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
        if (this.iDocumento.bco_cierre_estado !== 'P') {
            this.mensaje("1", "La conciliacion bancaria esta cerrada no se puede modificar")
            return;
        }
        //if (this.iDocumento.ban_estado_concilacion !== 'N') {
        //    this.mensaje("1", "El documento bancario esta conciliado no se puede eliminar")
        //    return;
        //}

        this.habilitarfrom(3);
        this.limpiabotones(2);
    }
    buscardatos() {
        this.iDocumento.bdo_debelibro = 0;
        this.iDocumento.bdo_haberlibro = 0;
        this.detalleregistro = [];
        this.spinner.show();
        this.bancosService.buscardocuemnto(globales.cia, this.iDocumento.ban_codigo, this.iDocumento.bcb_codigo, this.iDocumento.bnc_codigo, this.iDocumento.bdo_fechaini, this.iDocumento.bdo_fechafin).subscribe(data => {
            try {
                this.detalleregistro = data.root[0];
                /*              this.limpiabotones(3);*/
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
    seteaDocumentoBancario(data: any) {

        this.spinner.show();
        this.bancosService.getCargaConciliacionselec(globales.cia, data.bco_codigo).subscribe(data => {
            try {
                this.iDocumento = data.root[0][0];
                this.iDocumento.bdo_fechaini = moment(this.iDocumento.bdo_fechaini).format("YYYY-MM-DD").toString();
                this.iDocumento.bdo_fechafin = moment(this.iDocumento.bdo_fechafin).format("YYYY-MM-DD").toString();
                var datos: any[] = data.root[1];
                datos.forEach((x) => {
                    if (x.sele === 1) {
                        x.sele = true;
                    } else {
                        x.sele = false;
                    }
                });
                this.detalleregistro = data.root[1];
                this.cargaNumeroCuenta();
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
        this.llamarmodal = _tipo + "|Registro Conciliacion Bancaria|" + _mensaje + "|" + Funcion.Ramdon().toString();
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
