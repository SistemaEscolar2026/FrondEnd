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
    templateUrl: './ingresodocumento.component.html',
    styleUrls: ['./ingresodocumento.component.scss']
})
export class IngresoDocumentoComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedadocbancario') modalbusquedadocbancario: any;

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
* DEFINICION DE FUNCION CARGA FORMA
*/
    cargaBancos() {
        this.spinner.show();
        this.bancosService.buscardocumento(globales.cia).subscribe(data => {
            try {
                this.listbancosbusquedad = data.root[0];
                this.openModal(this.modalbusquedadocbancario);
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

        if (row.bdd_linea > 1 && (this.iAccion === "I" || this.iAccion === "M")) {
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
            this.mensaje("4", "Esta seguro de guardar el documento bancario");
        } else if (this.iAccion === "M") {
            this.mensaje("4", "Esta seguro de modificar el documento bancario");
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
    calculo(natu: string) {
        var valor: number = 0;

        this.detalleregistro.forEach((k: any) => {
            if (natu === k.cod_naturaleza) {
                valor = valor + ((k.valor === "" || k.valor === undefined) ? 0 : parseFloat(k.valor));
            }


            //if (k.cod_naturaleza === "D") {
            //    this.iDocumento.cob_monto = ((this.iDocumento.cob_monto === "" || this.iDocumento.cob_monto === undefined) ? 0 : parseFloat(this.iDocumento.cob_monto)) + ((k.valor === "" || k.valor === undefined) ? 0 : parseFloat(k.valor));

            //}

        });

        if (natu === 'A') {
            this.iDocumento.cob_monto = valor;
        }

        return valor;
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
            this.bancosService.manNumeroCuenta3p(globales.cia, this.iDocumento.ban_codigo, this.iDocumento.bcb_codigo).subscribe(data => {
                try {
                    this.listnumerocuenta = [{
                        bnc_codigo: "",
                        bnc_numero: ""
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
        this.iDocumento.us_codigo = Funcion.returdatosession("usuario").us_codigo;
        this.iDocumento.bdo_estado = "A";
        this.iDocumento.detalle = this.detalleregistro;
        this.bancosService.insertDocumentoBancio(this.iDocumento).subscribe(data => {
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

        if (this.iDocumento.btd_codigo === "" || this.iDocumento.btd_codigo === undefined) {
            this.smensaje = "No Tiene seleccionado ninguna Tipo Documento ...Por Favor Revisar"
            return true;
        }
        if (this.iDocumento.bdo_referencia === "" || this.iDocumento.bdo_referencia === undefined) {
            this.smensaje = "No Ingresado un numero de referencia ...Por Favor Revisar"
            return true;
        }
        if (this.detalleregistro.length <= 0) {
            this.smensaje = "No Tiene ingresado ningun detalle de Documento Bancario ...Por Favor Revisar"
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
            if (this.iAccion === "I") {
                this.insertdocumentobancos();
            } else {
                this.updatedocumentobancos();
            }
        }
    }

    modificar() {
        if (this.iDocumento.cob_codigo!==null) {
            this.mensaje("1","El documento bancario tiene un asiento contable no se puede modificar")
            return;
        }
        if (this.iDocumento.ban_estado_concilacion !== 'N') {
            this.mensaje("1", "El documento bancario esta conciliado no se puede eliminar")
            return;
        }

        this.habilitarfrom(3);
        this.limpiabotones(2);
    }
    seteaDocumentoBancario(data: any) {

        this.spinner.show();
        this.bancosService.buscardocumentoselect(globales.cia, data.bdo_codigo).subscribe(data => {
            try {
                this.iDocumento = data.root[0][0];
                this.iDocumento.bdo_fecha = moment(this.iDocumento.bdo_fecha).format("YYYY-MM-DD").toString();
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
        this.iDocumento.bdo_referencia = "";
        this.iDocumento.bdo_observacion = "";
        var fecha = new Date();
        var formatoFecha = moment(fecha);
        this.iDocumento.bdo_fecha = formatoFecha.format("YYYY-MM-DD").toString();
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
        this.llamarmodal = _tipo + "|Registro Documento Bancario|" + _mensaje + "|" + Funcion.Ramdon().toString();
    }
    /**
  * DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
  */
    cierreDocumentoBancario(event: any) {
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
