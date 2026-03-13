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

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './personaentidad.component.html',
    styleUrls: ['./personaentidad.component.scss']
})
export class PersonaEntidadComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedapersonaentidad') modalbusquedapersonaentidad: any;
    @ViewChild('modalbusquedacliente') modalbusquedacliente: any;
    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    modalRef: any;
    habilita: boolean = false;
    /**
  * DEFINICION DE VARIABLE DE CONTROL DE ACCION SUBMIT DE PAGINA
  */
    submitted = false;
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
    listcliente: any[] = [];
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listpersona: any[] = [];
    iAccion: string = "";
    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    personafrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        codigo: new FormControl(''),
        clcodigo: new FormControl(''),
        clnombre: new FormControl(''),
        nombre: new FormControl(''),
        identificacion: new FormControl(''),
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
        this.limpiabotones(1);
    }
    /**
* DEFINICION DE FUNCION CARGA VENDEDORES
*/
    cargaPersona() {
        this.spinner.show();
        this.mantenimientoService.manPersona(globales.cia,"").subscribe(data => {
            try {
                this.listpersona = data.root[0];
                this.openModal(this.modalbusquedapersonaentidad);
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
                this.personafrom.controls['codigo'].disable();
                this.personafrom.controls['nombre'].disable();
                this.personafrom.controls['clnombre'].disable();
                this.personafrom.controls['identificacion'].disable();
                this.personafrom.controls['estado'].disable();
                this.habilita = true;
                break;
            case 2:
                this.iAccion = "I";
                this.personafrom.controls['tipo'].setValue("I");
                this.personafrom.controls['clnombre'].disable();
                this.personafrom.controls['codigo'].enable();
                this.personafrom.controls['nombre'].enable();
                this.personafrom.controls['identificacion'].enable();
                this.personafrom.controls['estado'].setValue("A");
                this.personafrom.controls['estado'].enable();
                this.habilita = false;
                break;
            case 3:
                this.iAccion = "M";
                this.personafrom.controls['tipo'].setValue("M");
                this.personafrom.controls['clnombre'].disable();
                this.personafrom.controls['codigo'].disable();
                this.personafrom.controls['nombre'].enable();
                this.personafrom.controls['identificacion'].disable();
                this.personafrom.controls['estado'].enable();
                this.habilita = false;
                break;
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
            if (!Funcion.ValidadPagina('Persona Autorizadas Entidad')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listEstado = Funcion.Estado();
        this.listpersona = Funcion.TipoCliente();
        this.notifier = this.injector.get(ServiceMensaje);
        this.habilitarfrom(1);
    }

    /**
  * DEFINICION DE FUNCION PARA BORRAR VENDEDOR
  */
    deletepersona() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.pacodigo = this.personafrom.controls['codigo'].value.toString().toUpperCase();
        this.model.paestado = "D";
        this.mantenimientoService.deletePersona(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarpersona();
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

    /**
  * DEFINICION DE FUNCION PARA INSERTAR UN VENDEDOR
  */
    insertpersona() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.clcodigo = this.personafrom.controls['clcodigo'].value.toString().toUpperCase();
        this.model.padescripcion = this.personafrom.controls['nombre'].value.toString().toUpperCase();
        this.model.paestado = this.personafrom.controls['estado'].value.toString().toUpperCase();
        this.model.paruc = this.personafrom.controls['identificacion'].value;
        this.mantenimientoService.insertPersona(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarpersona();
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
    cargaCliente() {
        this.spinner.show();
        this.mantenimientoService.manCliente(globales.cia).subscribe(data => {
            try {
                this.listcliente = data.root[0];
                this.openModal(this.modalbusquedacliente);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    /**
  * DEFINICION DE FUNCION PARA ACTUALIZAR UN VENDEDOR
  */
    updatepersona() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.pacodigo = this.personafrom.controls['codigo'].value.toString().toUpperCase();
        this.model.clcodigo = this.personafrom.controls['clcodigo'].value.toString().toUpperCase();
        this.model.padescripcion = this.personafrom.controls['nombre'].value.toString().toUpperCase();
        this.model.paestado = this.personafrom.controls['estado'].value.toString().toUpperCase();
        this.model.paruc = this.personafrom.controls['identificacion'].value;
        this.mantenimientoService.updatePersona(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarpersona();
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

    /**
  * DEFINICION DE FUNCION PARA GUARDAR Y ACTUALIZAR VENDEDOR
  */
    guardarpersona() {
        this.submitted = true;
        if (this.personafrom.invalid) {
            return;
        } else {
            if (this.personafrom.controls['tipo'].value === "I") {
                this.insertpersona();
            } else {
                this.updatepersona();
            }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaPersona(data: any) {

        this.personafrom.controls['codigo'].setValue(data.pa_codigo);
        this.personafrom.controls['nombre'].setValue(data.pa_descripcion);
        this.personafrom.controls['clcodigo'].setValue(data.cl_codigo);
        this.personafrom.controls['clnombre'].setValue(data.cl_nombre);
        this.personafrom.controls['identificacion'].setValue(data.pa_ruc);
        this.personafrom.controls['estado'].setValue(data.pa_estado);
        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarpersona() {
        this.personafrom.controls['codigo'].setValue("");
        this.personafrom.controls['nombre'].setValue("");
        this.personafrom.controls['clcodigo'].setValue("");
        this.personafrom.controls['clnombre'].setValue("");
        this.personafrom.controls['identificacion'].setValue("");
        this.personafrom.controls['estado'].setValue("");

        this.submitted = false;
    }
    cierreCliente(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaCliente(JSON.parse(event))
        }
    }
    seteaCliente(data: any) {

        this.personafrom.controls['clcodigo'].setValue(data.cl_codigo);
        this.personafrom.controls['clnombre'].setValue(data.cl_nombre);

    }

    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaPersona();
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
    cierrePersona(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaPersona(JSON.parse(event))
        }
    }
    /**
  * DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
  */
    cierreModalpersona(event: any) {
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
        return this.personafrom.controls;
    }
}
