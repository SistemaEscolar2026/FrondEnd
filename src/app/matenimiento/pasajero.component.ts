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
    templateUrl: './pasajero.component.html',
    styleUrls: ['./pasajero.component.scss']
})
export class PasajeroComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedacliente') modalbusquedacliente: any;
    @ViewChild('modalbusquedapasajero') modalbusquedapasajero: any;
    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    modalRef: any;
    /**
  * DEFINICION DE VARIABLE DE CONTROL DE ACCION SUBMIT DE PAGINA
  */
    submitted = false;
    habilita:boolean= false;
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
    iAccion: string = "";
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listcliente: any[] = [];
    listpasajero: any[] = [];

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    pasajerofrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        codigo: new FormControl(''),
        nombre: new FormControl(''),
        identificacion: new FormControl(''),
        direccion: new FormControl(''),
        estado: new FormControl(''),
        telefono: new FormControl(''),
        clcodigo: new FormControl(''),
        clientenom: new FormControl('')
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
* DEFINICION DE FUNCION CARGA PASAJERO
*/
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
    cargaPasajero() {
        this.spinner.show();
        this.mantenimientoService.manPasajero(globales.cia).subscribe(data => {
            try {
                this.listpasajero = data.root[0];
                this.openModal(this.modalbusquedapasajero);
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
                this.pasajerofrom.controls['codigo'].disable();
                this.pasajerofrom.controls['nombre'].disable();
                this.pasajerofrom.controls['identificacion'].disable();
                this.pasajerofrom.controls['estado'].disable();
                this.pasajerofrom.controls['telefono'].disable();
                this.pasajerofrom.controls['direccion'].disable();
                this.pasajerofrom.controls['clientenom'].disable();
                this.habilita = true;
                break;
            case 2:
                this.iAccion = "I";
                this.pasajerofrom.controls['tipo'].setValue("I");
                this.pasajerofrom.controls['codigo'].enable();
                this.pasajerofrom.controls['nombre'].enable();
                this.pasajerofrom.controls['identificacion'].enable();
                this.pasajerofrom.controls['estado'].setValue("A");
                this.pasajerofrom.controls['estado'].enable();
                this.pasajerofrom.controls['telefono'].enable();
                this.pasajerofrom.controls['direccion'].enable();
                this.pasajerofrom.controls['clientenom'].disable();
                this.habilita = false;
                break;
            case 3:
                this.iAccion = "M";
                this.pasajerofrom.controls['tipo'].setValue("M");
                this.pasajerofrom.controls['codigo'].disable();
                this.pasajerofrom.controls['nombre'].enable();
                this.pasajerofrom.controls['identificacion'].disable();
                this.pasajerofrom.controls['estado'].enable();
                this.pasajerofrom.controls['telefono'].enable();
                this.pasajerofrom.controls['direccion'].enable();
                this.pasajerofrom.controls['clientenom'].disable();
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
            if (!Funcion.ValidadPagina('Ingreso de Pasajero')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listEstado = Funcion.Estado();
      
        this.notifier = this.injector.get(ServiceMensaje);
        this.habilitarfrom(1);
    }

    /**
  * DEFINICION DE FUNCION PARA BORRAR VENDEDOR
  */
    deletecliente() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.pocodigo = this.pasajerofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.poestado = "D";
        this.mantenimientoService.deletePasajero(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarpasajero();
                    this.habilitarfrom(1);
                }else{
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
    insertpasajero() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.panombre = this.pasajerofrom.controls['nombre'].value.toString().toUpperCase();
        this.model.paestado = this.pasajerofrom.controls['estado'].value.toString().toUpperCase();
        this.model.padireccion = this.pasajerofrom.controls['direccion'].value;
        this.model.paidentificacion = this.pasajerofrom.controls['identificacion'].value;
        this.model.clcodigo = this.pasajerofrom.controls['clcodigo'].value;
        this.model.patelefono = this.pasajerofrom.controls['telefono'].value;
        this.mantenimientoService.insertPasajero(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarpasajero();
                    this.habilitarfrom(1);
                } else {
                    this.notifier.showError(data.msgError);
                }
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.notifier.showError(err.Message);
            this.spinner.hide();
        });
    }
    /**
  * DEFINICION DE FUNCION PARA ACTUALIZAR UN VENDEDOR
  */
    updatepasajero() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.clcodigo = this.pasajerofrom.controls['clcodigo'].value.toString().toUpperCase();
        this.model.pacodigo = this.pasajerofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.panombre = this.pasajerofrom.controls['nombre'].value.toString().toUpperCase();
        this.model.paestado = this.pasajerofrom.controls['estado'].value.toString().toUpperCase();
        this.model.padireccion = this.pasajerofrom.controls['direccion'].value;
        this.model.paidentificacion = this.pasajerofrom.controls['identificacion'].value;
        this.model.patelefono = this.pasajerofrom.controls['telefono'].value;
        this.mantenimientoService.updatePasajero(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarpasajero();
                    this.habilitarfrom(1);

                } else {
                    this.notifier.showError(data.msgError);
                }
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.notifier.showError(err.Message);
            this.spinner.hide();
        });
    }

    /**
  * DEFINICION DE FUNCION PARA GUARDAR Y ACTUALIZAR VENDEDOR
  */
    guardarpasajero() {
        this.submitted = true;
        if (this.pasajerofrom.invalid) {
            return;
        } else {
            if (this.pasajerofrom.controls['tipo'].value === "I") {
                this.insertpasajero();
            } else {
                this.updatepasajero();
            }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaPasajero(data: any) {
        this.pasajerofrom.controls['codigo'].setValue(data.pa_codigo);
        this.pasajerofrom.controls['nombre'].setValue(data.pa_nombre);
        this.pasajerofrom.controls['identificacion'].setValue(data.pa_identificacion);
        this.pasajerofrom.controls['clcodigo'].setValue(data.cl_codigo);
        this.pasajerofrom.controls['clientenom'].setValue(data.cl_nombre);
        this.pasajerofrom.controls['estado'].setValue(data.pa_estado);
        this.pasajerofrom.controls['telefono'].setValue(data.pa_telefono);
        this.pasajerofrom.controls['direccion'].setValue(data.pa_direccion);
        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarpasajero() {
        this.pasajerofrom.controls['codigo'].setValue("");
        this.pasajerofrom.controls['nombre'].setValue("");
        this.pasajerofrom.controls['identificacion'].setValue("");
        this.pasajerofrom.controls['estado'].setValue("");
        this.pasajerofrom.controls['telefono'].setValue("");
        this.pasajerofrom.controls['direccion'].setValue("");
        this.pasajerofrom.controls['clcodigo'].setValue("");
        this.pasajerofrom.controls['clientenom'].setValue("");
        this.submitted = false;
    }

    buscarcliente() {
        this.cargaCliente();
    }

    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaPasajero();
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
    cierreCliente(event: any) {
        if (event !== "") {
            this.hideModal()
            var _dato = JSON.parse(event);
            this.pasajerofrom.controls['clcodigo'].setValue(_dato.cl_codigo);
            this.pasajerofrom.controls['clientenom'].setValue(_dato.cl_nombre);
        }
    }
    /**
* DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
*/
    cierrePasajero(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaPasajero(JSON.parse(event))
        }
    }
    /**
  * DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
  */
    cierreModalcliente(event: any) {
        if (event) {
            this.hideModal()
        }
    }
    cierreModalpasajero(event: any) {
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
        return this.pasajerofrom.controls;
    }
}
