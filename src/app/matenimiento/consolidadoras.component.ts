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
    templateUrl: './consolidadoras.component.html',
    styleUrls: ['./consolidadoras.component.scss']
})
export class ConsolidadorasComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedacomision') modalbusquedacomision: any;
    @ViewChild('modalbusquedaconsolidadoras') modalbusquedaconsolidadoras: any;
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
    iAccion: string = "";
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

    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listconsolidadora: any[] = [];

    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listcomision: any[] = [];

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    consolidorafrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        codigo: new FormControl(''),
        nombre: new FormControl(''),
        comcodigo: new FormControl(''),
        comnombre: new FormControl(''),
        observacion: new FormControl(''),
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
    cargaConsolidora() {
        this.spinner.show();
        this.mantenimientoService.manConsolidadoras(globales.cia).subscribe(data => {
            try {
                this.listconsolidadora = data.root[0];
                this.openModal(this.modalbusquedaconsolidadoras);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }

    cargaComision() {
        this.spinner.show();
        this.mantenimientoService.manComision(globales.cia).subscribe(data => {
            try {
                this.listcomision = data.root[0];
                this.openModal(this.modalbusquedacomision);
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
                this.consolidorafrom.controls['codigo'].disable();
                this.consolidorafrom.controls['comcodigo'].disable();
                this.consolidorafrom.controls['comnombre'].disable();
                this.consolidorafrom.controls['nombre'].disable();
                this.consolidorafrom.controls['observacion'].disable();
                this.consolidorafrom.controls['estado'].disable();
                this.habilita = true;
                break;
            case 2:
                this.iAccion = "I";
                this.consolidorafrom.controls['tipo'].setValue("I");
                this.consolidorafrom.controls['codigo'].disable();
                this.consolidorafrom.controls['nombre'].enable();
                this.consolidorafrom.controls['comcodigo'].disable();
                this.consolidorafrom.controls['comnombre'].disable();
                this.consolidorafrom.controls['observacion'].enable();
                this.consolidorafrom.controls['estado'].setValue("A");
                this.consolidorafrom.controls['estado'].enable();
                this.habilita = false;
                break;
            case 3:
                this.iAccion = "M";
                this.consolidorafrom.controls['tipo'].setValue("M");
                this.consolidorafrom.controls['codigo'].disable();
                this.consolidorafrom.controls['nombre'].enable();
                this.consolidorafrom.controls['comcodigo'].disable();
                this.consolidorafrom.controls['comnombre'].disable();
                this.consolidorafrom.controls['observacion'].enable();
                this.consolidorafrom.controls['estado'].enable();
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
            if (!Funcion.ValidadPagina('Ingreso de Consolidadoras')) {
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
    deleteconsolidador() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.coscodigo = this.consolidorafrom.controls['codigo'].value.toString().toUpperCase();
        this.model.cosestado = "D";
        this.mantenimientoService.deleteConsolidadora(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarconsolidador();
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
    insertconsolidador() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.cosnombre = this.consolidorafrom.controls['nombre'].value.toString().toUpperCase();
        this.model.cosobservacion = this.consolidorafrom.controls['observacion'].value.toString().toUpperCase();
        this.model.cosestado = this.consolidorafrom.controls['estado'].value.toString().toUpperCase();
        this.model.comcodigo = this.consolidorafrom.controls['comcodigo'].value;


        this.mantenimientoService.insertConsolidadores(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarconsolidador();
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
    updateconsolidador() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.coscodigo = this.consolidorafrom.controls['codigo'].value.toString().toUpperCase();
        this.model.cosnombre = this.consolidorafrom.controls['nombre'].value.toString().toUpperCase();
        this.model.cosobservacion = this.consolidorafrom.controls['observacion'].value.toString().toUpperCase();
        this.model.cosestado = this.consolidorafrom.controls['estado'].value.toString().toUpperCase();
        this.model.comcodigo = this.consolidorafrom.controls['comcodigo'].value;

       
        this.mantenimientoService.updateConsolidadoras(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarconsolidador();
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
    guardarconsolidador() {
        this.submitted = true;
        if (this.consolidorafrom.invalid) {
            return;
        } else {
            if (this.consolidorafrom.controls['comnombre'].value === "") {
                this.notifier.showSuccess("Comision es Requerido", "");
            } else
            if (this.consolidorafrom.controls['tipo'].value === "I") {
                this.insertconsolidador();
            } else {
                this.updateconsolidador();
            }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaConsolidador(data: any) {


        this.consolidorafrom.controls['codigo'].setValue(data.cos_codigo);
        this.consolidorafrom.controls['nombre'].setValue(data.cos_nombre);
        this.consolidorafrom.controls['comcodigo'].setValue(data.co_codigo);
        this.consolidorafrom.controls['comnombre'].setValue(data.co_entidad);
        this.consolidorafrom.controls['observacion'].setValue(data.cos_observacion);
        this.consolidorafrom.controls['estado'].setValue(data.cos_estado);

        this.limpiabotones(3);
    }


    seteaComision(data: any) {

        this.consolidorafrom.controls['comcodigo'].setValue(data.co_codigo);
        this.consolidorafrom.controls['comnombre'].setValue(data.co_entidad);

    }
    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarconsolidador() {
        this.consolidorafrom.controls['codigo'].setValue("");
        this.consolidorafrom.controls['nombre'].setValue("");
        this.consolidorafrom.controls['comcodigo'].setValue("");
        this.consolidorafrom.controls['comnombre'].setValue("");
        this.consolidorafrom.controls['observacion'].setValue("");
        this.consolidorafrom.controls['estado'].setValue("");

        this.submitted = false;
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaConsolidora();
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
    cierreConsolidador(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaConsolidador(JSON.parse(event))
        }
    }
    cierreComision(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaComision(JSON.parse(event))
        }
    }
    /**
* DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
*/
    cierreModalcomision(event: any) {
        if (event) {
            this.hideModal()
        }
    }
    /**
  * DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
  */
    cierreModalconsolidadora(event: any) {
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
        return this.consolidorafrom.controls;
    }
}
