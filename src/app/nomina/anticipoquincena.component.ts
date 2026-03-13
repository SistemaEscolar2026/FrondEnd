import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Funcion } from '@funciones/funciones';
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
    templateUrl: './anticipoquincena.component.html',
    styleUrls: ['./anticipoquincena.component.scss']
})
export class AnticipoQuincenaComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedaanticipo') modalbusquedaanticipo: any;
    @ViewChild('modalbusquedaempleado') modalbusquedaempleado: any;
    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    modalRef: any;
    /**
  * DEFINICION DE VARIABLE DE CONTROL DE ACCION SUBMIT DE PAGINA
  */
    submitted = false;
    isAccion: string = "";
    llamarmodal: string = "";
    smensaje: string = "";
    parentsvg: any = {};
    /**
   * DEFINICION DE VARIABLE DE RUTA LA CUAL NOS PERMITA REDIRECCIONAR A OTRA PAGINA
   */
    router: Router;
    ban: number = 0;
    ColumnaDetalle: any[] = ['Identificacion', 'Nombre Empleado', 'Sueldo Empleado','Anticipo Quincena'];
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
    selectedlineagrid: string = "";
    listEstado: any[] = [];
    detallequincena: any[] = [];
    listmeses: any[] = [];
    iDocumento: any = {};
    habilitaobjetofrom: boolean = true;
    habilitaobjetobuscar: boolean = true;

    iAccion: string = ""
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listanticipoquincena: any[] = [];
    listdetalle: any[] = [];
    listipofalta: any[] = [];

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    parametrofrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        cocodigo: new FormControl(''),
        codigo: new FormControl(''),
        ruc: new FormControl(''),
        descripcion: new FormControl(''),
        estado: new FormControl('')
    });
    /**
   * DEFINICION DE VARIABLE DE MODELO DE VENDEDOR
   */
    model: any = {};
    /**
 * DEFINICION DE FUNCION INIT DE LA CLASE
 */
    ngOnInit() {
        this.cancelar();
    }
    /**
* DEFINICION DE FUNCION CARGA FORMA
*/
    cargaAnticipo() {
        this.spinner.show();
        this.mantenimientoService.getAnticipoQuincena(globales.cia).subscribe(data => {
            try {
                this.listanticipoquincena = data.root[0];
                this.openModal(this.modalbusquedaanticipo);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    limpiarColor() {
        for (var i = 0; i < this.detallequincena.length; i++) {
            this.detallequincena[i].color = "";
        }
    }
    /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
    clickGrid(row: any) {
        this.limpiarColor();
        row.color = "SG";
        this.selectedlineagrid = row.npd_linea
    }
    habilitarfrom(val: Number) {
        switch (val) {
            case 1:
                this.habilitaobjetofrom = true;
                this.habilitaobjetobuscar = true;
                break;
            case 2:
                this.isAccion = "I";
                this.habilitaobjetofrom = false;
                this.habilitaobjetobuscar = false;
                break;
            case 3:
                this.isAccion = "M";
                this.habilitaobjetobuscar = true;
                this.habilitaobjetofrom = false;

                break;
        }
    }
    buscaremp(ban: number) {
        this.ban = ban;
    }
    calcularcuota() {
        this.detallequincena = [];
        this.spinner.show();
        this.mantenimientoService.generaquincena(globales.cia, this.iDocumento.naq_anio, this.iDocumento.naq_mes).subscribe(data => {
            try {
                if (data.codError === "0") {
                    this.detallequincena = data.root[0];
                } else {
                    this.mensaje("1", data.msgError);
                }
              
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    agregarlinea() {
        var linea: any = {};
        linea.linea = this.detallequincena.length + 1;
        this.detallequincena.push(linea);
        this.selectedlineagrid = "";
    }
    /**
  * DEFINICION DE FUNCION QUE BORRA UNA LINEA EN EL DETALLE DE PEDIDO
  */
    borrarlinea() {
        for (var i = 0; i < this.detallequincena.length; i++) {
            if (this.detallequincena[i].npd_linea === this.selectedlineagrid) {
                this.detallequincena.splice(i, 1);
                this.selectedlineagrid = "";
                break;
            }
        }
    }

    cierreEmpleado(event: any) {
        if (event != "") {
            this.cierreModal(true);
            //codigo
            var _dato: any = JSON.parse(event);
            this.cargaempleadoselect(_dato);
        }
    }
    cargaempleadoselect(codigo: any) {


        if (this.ban === 1) {
            this.iDocumento = codigo;

            this.limpiabotones(3);
        } else {
            this.iDocumento.nom_sec = codigo.empsec;
            this.iDocumento.empsec = codigo.empsec;
            this.iDocumento.empcodigo = codigo.empcodigo;
            this.iDocumento.empnombres = codigo.empnombres;
            this.iDocumento.empsueldo = codigo.confsalario;
            this.iDocumento.empapellidopaterno = codigo.empapellidopaterno;
            this.iDocumento.empapellidomaterno = codigo.empapellidomaterno;
        }

    }

    cierreModal(event: boolean) {
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
    constructor(private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private fb: FormBuilder, private mantenimientoService: MantenimientoService, private injector: Injector) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Ingreso de Aerolineas')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listEstado = Funcion.Estado();
        this.listmeses = Funcion.CargaMeses();
        this.listipofalta = Funcion.TipoFalta();
        this.notifier = this.injector.get(ServiceMensaje);
        this.habilitarfrom(1);
    }

    aceptarOk(event: boolean) {
        if (event) {
            this.cancelar();
        }
    }
    delete() {
        this.spinner.show();
        this.iDocumento.naq_estado = "D";
        this.mantenimientoService.deletAnticipoQuincena(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarparametro();
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


    aceptarConfiEli(event: boolean) {
        if (event) {

        }
    }

    /**
  * DEFINICION DE FUNCION PARA GUARDAR Y ACTUALIZAR VENDEDOR
  */
    guardarprestamo() {
        this.validar();
        if (this.smensaje != "") {
            this.mensaje("1", this.smensaje);
            return
        } else {
            if (this.isAccion === "I") {
                this.insertPrestamo();
            }
            if (this.isAccion === "M") {
                this.updatePrestamo();
            }
        }

     
    }
    aceptarConfi(event: boolean) {
        if (event) {
            this.guardarprestamo();
        }
    }
    confirmarguardar() {
        if (this.isAccion === "I") {
            this.mensaje("4", "Esta seguro de generar el anticipo de quincena");
        } else if (this.isAccion === "M") {
            this.mensaje("4", "Esta seguro de modificar el anticipo de quincena");
        }

    }
    updatePrestamo() {
        this.spinner.show();
        this.iDocumento.detalle = this.detallequincena;
        this.mantenimientoService.updateAnticipoQuincena(this.iDocumento).subscribe(data => {
            try {
                if (data.success) {
                    var mensaje: string = "";
                    mensaje = mensaje + data.msgError + "<br/>";
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
    calculoquincena() {
        this.iDocumento.naq_valototal = "";
        this.detallequincena.forEach((x) => {
            this.iDocumento.naq_valototal = ((this.iDocumento.naq_valototal === "") ? 0 : parseFloat(this.iDocumento.naq_valototal)) + parseFloat(x.nqd_valorquincena);
        });
        return this.iDocumento.naq_valototal;
    }
    insertPrestamo() {
        this.spinner.show();
        this.iDocumento.co_codigo = globales.cia;
        this.iDocumento.naq_estado = "A";
        this.iDocumento.us_codigo = Funcion.returdatosession("usuario").us_codigo;
        this.iDocumento.detalle = this.detallequincena;
        this.mantenimientoService.insertantincipoquincena(this.iDocumento).subscribe(data => {
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
    validar() {
        this.smensaje = "";


        if (this.detallequincena.length <= 0) {
            this.smensaje = "No se ha cargado el antincipo de quincena...Por Favor Revisar"
            return;
        }

    }

    modificarquincena() {
        if (this.iDocumento.cob_tipo === null) {
            this.habilitarfrom(3);
            this.limpiabotones(2);
        } else {
            this.mensaje("1", "No se puede modificar el anticipo quincena ya esta contabilizada ...Por Favor Revisar")
            return;
        }
    }
    seteaParametro(data: any) {

        this.spinner.show();
        this.mantenimientoService.getseleAnticipoQuincena(data.co_codigo, data.naq_codigo).subscribe(data => {
            try {
                if (data.codError === "0") {
                    this.iDocumento = data.root[0][0];
                    this.iDocumento.naq_fecharegistro = moment(data.naq_fecharegistro).format("YYYY-MM-DD").toString();

                    this.iDocumento.naq_mes = parseInt(this.iDocumento.naq_mes);
                    this.iDocumento.naq_anio = parseInt(this.iDocumento.naq_anio);

                    this.detallequincena = data.root[1];
                    this.limpiabotones(3);
                } else {
                    this.mensaje("1", data.msgError);
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
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarparametro() {
        this.iDocumento = {};
        this.iDocumento.naq_fecharegistro = moment(new Date()).format("YYYY-MM-DD").toString()
        this.iDocumento.naq_mes = parseInt( moment(new Date()).format("YYYY-MM-DD").toString().substr(5, 2));
        this.iDocumento.naq_anio = moment(new Date()).format("YYYY-MM-DD").toString().substr(0, 4);
        this.iDocumento.naq_estado = "A";
        this.iDocumento.naq_observacion = "";

        this.iDocumento.naq_valototal = "";

        this.detallequincena = [];
    }

    guardar() {

    }
    cancelar() {
        this.limpiabotones(1);
        this.limpiarparametro();
        this.habilitarfrom(1);
    }

    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaAnticipo();
    }
    /**
  * DEFINICION DE FUNCION SALIR DE LA PANTALLA
  */
    salir() {
        this.router.navigate(['/principal/default'], {
            skipLocationChange: true,
        });
    }
    /**
  * DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
  */
    cierreAnticipo(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaParametro(JSON.parse(event))
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
    /**
  * DEFINICION DE FUNCION DE VALIDACION DE CONTROL DE FROM 
  */
    get f(): { [key: string]: AbstractControl } {
        return this.parametrofrom.controls;
    }

    mensaje(_tipo: string, _mensaje: string) {
        this.llamarmodal = _tipo + "|Anticipo de quincena|" + _mensaje + "|" + Funcion.Ramdon().toString();
    }
}
