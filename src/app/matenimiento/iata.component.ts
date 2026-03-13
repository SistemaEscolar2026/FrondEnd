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
    templateUrl: './iata.component.html',
    styleUrls: ['./iata.component.scss']
})
export class IataComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedapais') modalbusquedapais: any;
    @ViewChild('modalbusquedaiata') modalbusquedaiata: any;
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
    iAccion: string = "";

    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listpais: any[] = [];
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listciudad: any[] = [];

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    ciudadfrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        codigo: new FormControl(''),
        pacodigo: new FormControl(''),
        paisnom: new FormControl(''),
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
        this.limpiabotones(1);
    }
    cargaPais() {
        this.spinner.show();
        this.mantenimientoService.manPais(globales.cia).subscribe(data => {
            try {
                this.listpais = data.root[0];
                this.openModal(this.modalbusquedapais);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    /**
* DEFINICION DE FUNCION CARGA FORMA
*/
    cargaCiudad() {
        this.spinner.show();
        this.mantenimientoService.manCiudad(globales.cia).subscribe(data => {
            try {
                this.listciudad = data.root[0];
                this.openModal(this.modalbusquedaiata);
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
                this.ciudadfrom.controls['codigo'].disable();
                this.ciudadfrom.controls['pacodigo'].disable();
                this.ciudadfrom.controls['descripcion'].disable();
                this.ciudadfrom.controls['paisnom'].disable();
                this.ciudadfrom.controls['estado'].disable();
                this.habilita = true;
                break;
            case 2:
                this.iAccion = "I";
                this.ciudadfrom.controls['tipo'].setValue("I");
                this.ciudadfrom.controls['codigo'].enable();
                this.ciudadfrom.controls['pacodigo'].enable();
                this.ciudadfrom.controls['descripcion'].enable();
                this.ciudadfrom.controls['paisnom'].disable();
                this.ciudadfrom.controls['estado'].setValue("A");
                this.ciudadfrom.controls['estado'].enable();
                this.habilita = false;
                break;
            case 3:
                this.iAccion = "M";
                this.ciudadfrom.controls['tipo'].setValue("M");
                this.ciudadfrom.controls['codigo'].disable();
                this.ciudadfrom.controls['pacodigo'].disable();
                this.ciudadfrom.controls['paisnom'].disable();
                this.ciudadfrom.controls['descripcion'].enable();
                this.ciudadfrom.controls['estado'].enable();
                this.habilita = true;
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
            if (!Funcion.ValidadPagina('Ingreso de Iata')) {
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
    deleteciudad() {
        this.spinner.show();
        this.model.cicodigo = this.ciudadfrom.controls['codigo'].value.toString().toUpperCase();
        this.model.ciestado = "D";
        this.mantenimientoService.deleteCiuda(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarciudad();
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
    insertciudad() {
        this.spinner.show();
        this.model.cicodigo = this.ciudadfrom.controls['codigo'].value.toString().toUpperCase();
        this.model.pacodigo = this.ciudadfrom.controls['pacodigo'].value.toString().toUpperCase();
        this.model.cinombre = this.ciudadfrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.ciestado = this.ciudadfrom.controls['estado'].value.toString().toUpperCase();
        this.mantenimientoService.insertCiudad(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarciudad();
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
  * DEFINICION DE FUNCION PARA ACTUALIZAR UN VENDEDOR
  */
    updateciudad() {
        this.spinner.show();
        this.model.cicodigo = this.ciudadfrom.controls['codigo'].value.toString().toUpperCase();
        this.model.pacodigo = this.ciudadfrom.controls['pacodigo'].value.toString().toUpperCase();
        this.model.cinombre = this.ciudadfrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.ciestado = this.ciudadfrom.controls['estado'].value.toString().toUpperCase();
        this.mantenimientoService.updateCiudad(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarciudad();
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
    guardarciudad() {
        this.submitted = true;
        if (this.ciudadfrom.invalid) {
            return;
        } else {
            if (this.ciudadfrom.controls['paisnom'].value === "") {
                this.notifier.showSuccess("Pais es Requerido", "");
            } else
                if (this.ciudadfrom.controls['tipo'].value === "I") {
                    this.insertciudad();
                } else {
                    this.updateciudad();
                }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaPais(data: any) {

        this.ciudadfrom.controls['pacodigo'].setValue(data.pa_codigo);
        this.ciudadfrom.controls['paisnom'].setValue(data.pa_nombre);
    }
    /**
   * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
   */
    seteaCiudad(data: any) {

        this.ciudadfrom.controls['codigo'].setValue(data.ci_codigo);
        this.ciudadfrom.controls['descripcion'].setValue(data.ci_nombre);
        this.ciudadfrom.controls['pacodigo'].setValue(data.pa_codigo);
        this.ciudadfrom.controls['paisnom'].setValue(data.pa_nombre);
        this.ciudadfrom.controls['estado'].setValue(data.ci_estado);

        this.limpiabotones(3);
    }
    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarciudad() {

        this.ciudadfrom.controls['codigo'].setValue("");
        this.ciudadfrom.controls['pacodigo'].setValue("");
        this.ciudadfrom.controls['paisnom'].setValue("");
        this.ciudadfrom.controls['descripcion'].setValue("");
        this.ciudadfrom.controls['estado'].setValue("");

        this.submitted = false;
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaCiudad();
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
    cierrePais(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaPais(JSON.parse(event))
        }
    }
    /**
* DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
*/
    cierreCiudad(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaCiudad(JSON.parse(event))
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
        return this.ciudadfrom.controls;
    }
}
