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
    templateUrl: './permisoiess.component.html',
    styleUrls: ['./permisoiess.component.scss']
})
export class PermisoIESSComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedapermisoiess') modalbusquedapermisoiess: any;
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
    /**
   * DEFINICION DE VARIABLE DE RUTA LA CUAL NOS PERMITA REDIRECCIONAR A OTRA PAGINA
   */
    router: Router;
    ban: number = 0;
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
    listadoempleado: any[] = [];
    iFalta: any = {};
    habilitaobjetofrom: boolean = true;
    habilitaobjetobuscar: boolean = true;

    iAccion:string=""
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listpermisoiess: any[] = [];
    listiporol: any[] = [];
    listrubro: any[] = [];

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
    cargaAerolinea() {
        this.spinner.show();
        this.mantenimientoService.getFaltasIess(globales.cia).subscribe(data => {
            try {
                this.listpermisoiess = data.root[0];
                this.openModal(this.modalbusquedapermisoiess);
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
        this.cargaEmpleado();
    }
    cargaEmpleado() {
        this.spinner.show();
        this.mantenimientoService.manConfigEmpleado(globales.cia).subscribe(data => {
            try {
                this.spinner.hide();
                this.listadoempleado = data.root[0];
                this.openModal(this.modalbusquedaempleado);
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
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
            this.iFalta = codigo;

            this.limpiabotones(3);
        } else {
            this.iFalta.empsec = codigo.empsec;
            this.iFalta.empcodigo = codigo.empcodigo;
            this.iFalta.empnombres = codigo.empnombres;
            this.iFalta.empapellidopaterno = codigo.empapellidopaterno;
            this.iFalta.empapellidomaterno = codigo.empapellidomaterno;
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
            if (!Funcion.ValidadPagina('Ingreso Permiso IESS ')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listEstado = Funcion.Estado();
        this.cargarubor();
        this.listiporol = Funcion.TipoRol();
        this.notifier = this.injector.get(ServiceMensaje);
        this.habilitarfrom(1);
    }
    cargarubor() {
        this.spinner.show();
        this.mantenimientoService.getRubro(globales.cia).subscribe(data => {
            try {
                this.listrubro = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }

    aceptarOk(event: boolean) {
        if (event) {
            this.cancelar();
        }
    }
    delete() {
        this.spinner.show();
        this.iFalta.faiestado = "D";
        this.mantenimientoService.deleteFaltasIess(this.iFalta).subscribe(data => {
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

    aceptarConfi(event: boolean) {
        if (event) {

        }
    }
    aceptarConfiEli(event: boolean) {
        if (event) {
     
        }
    }

    /**
  * DEFINICION DE FUNCION PARA GUARDAR Y ACTUALIZAR VENDEDOR
  */
    guardarfalta() {
        this.validar();
        if (this.smensaje != "") {
            this.mensaje("1", this.smensaje);
            return
        } else {
            if (this.isAccion === "I") {
                this.insertFalta();
            }
            if (this.isAccion === "M") {
                this.updateFalta();
            }
        }
    }
    updateFalta() {
        this.spinner.show();
        this.mantenimientoService.updateFaltasIess(this.iFalta).subscribe(data => {
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
    insertFalta() {
        this.spinner.show();
        this.iFalta.faiestado = "A";
        this.mantenimientoService.insertFaltasIess(this.iFalta).subscribe(data => {
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
    validar() {
        this.smensaje = "";

        if (this.iFalta.empcodigo === "") {
            this.smensaje = "No Tiene seleccionado ninguna empleado ...Por Favor Revisar"
            return;
        }



        if (this.iFalta.faitipo === "") {
            this.smensaje = "No Tiene seleccionado ningun tipo de falta...Por Favor Revisar"
            return;
        }



    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaParametro(data: any) {
        this.iFalta = data;

        this.iFalta.faifecha = moment(data.faifecha).format("YYYY-MM-DD").toString();
        this.iFalta.faifechainicio = moment(data.faifechainicio).format("YYYY-MM-DD").toString();
        this.iFalta.faifechafin = moment(data.faifechafin).format("YYYY-MM-DD").toString();

        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarparametro() {
        this.iFalta = {};
        this.iFalta.empcodigo = "";
        this.iFalta.empnombres = "";
        this.iFalta.faitipo = "";
        this.iFalta.faifecha = moment(new Date()).format("YYYY-MM-DD").toString()
        this.iFalta.faifechainicio = moment(new Date()).format("YYYY-MM-DD").toString()
        this.iFalta.faifechafin = moment(new Date()).format("YYYY-MM-DD").toString()
        this.iFalta.faitipo = "";
        this.iFalta.faiestado = "A";
        this.iFalta.nrcodigo = "";
        this.iFalta.faiobservacion = "";
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
        this.cargaAerolinea();
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
    cierreFaltas(event: any) {
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
        this.llamarmodal = _tipo + "|Registro Permiso IESS|" + _mensaje + "|" + Funcion.Ramdon().toString();
    }
}
