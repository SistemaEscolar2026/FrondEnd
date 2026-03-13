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
    templateUrl: './servicioadicional.component.html',
    styleUrls: ['./servicioadicional.component.scss']
})
export class ServicioAdicionalComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedaservicio') modalbusquedaservicio: any;
    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    modalRef: any;
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
    /**
  * DEFINICION DE VARIABLE DE LISTADO DE OBJETO DE FORMA PAGO
  */
    listFormaCM: any[] = [];
    iAccion: string = "";
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listservicio: any[] = [];

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    serviciofrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        codigo: new FormControl(''),
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
    /**
* DEFINICION DE FUNCION CARGA FORMA
*/
    cargaServicio() {
        this.spinner.show();
        this.mantenimientoService.manServicioAdicional(globales.cia).subscribe(data => {
            try {
                this.listservicio = data.root[0];
                this.openModal(this.modalbusquedaservicio);
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
                this.serviciofrom.controls['codigo'].disable();
                this.serviciofrom.controls['descripcion'].disable();
                this.serviciofrom.controls['estado'].disable();

                break;
            case 2:
                this.iAccion = "I";
                this.serviciofrom.controls['tipo'].setValue("I");
                this.serviciofrom.controls['codigo'].disable();
                this.serviciofrom.controls['descripcion'].enable();
                this.serviciofrom.controls['estado'].setValue("A");
                this.serviciofrom.controls['estado'].enable();
                break;
            case 3:
                this.iAccion = "M";
                this.serviciofrom.controls['tipo'].setValue("M");
                this.serviciofrom.controls['codigo'].disable();
                this.serviciofrom.controls['descripcion'].enable();
                this.serviciofrom.controls['estado'].enable();
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
            if (!Funcion.ValidadPagina('Servicios Adicionales')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listEstado = Funcion.Estado();
        this.listFormaCM = Funcion.TipoForma();
        this.notifier = this.injector.get(ServiceMensaje);
        this.habilitarfrom(1);
    }

    /**
  * DEFINICION DE FUNCION PARA BORRAR VENDEDOR
  */
    deleteservicio() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.sacodigo = this.serviciofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.saestado = "D";
        this.mantenimientoService.deleteServicio(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarservicio();
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
    insertservicio() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.sacodigo = this.serviciofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.sadescripcion = this.serviciofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.saestado = this.serviciofrom.controls['estado'].value.toString().toUpperCase();
        this.mantenimientoService.insertServicio(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarservicio();
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
    updateservicio() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.sacodigo = this.serviciofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.sadescripcion = this.serviciofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.saestado = this.serviciofrom.controls['estado'].value.toString().toUpperCase();
        this.mantenimientoService.updateServicio(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarservicio();
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
    guardarservicio() {
        this.submitted = true;
        if (this.serviciofrom.invalid) {
            return;
        } else {
            if (this.serviciofrom.controls['tipo'].value === "I") {
                this.insertservicio();
            } else {
                this.updateservicio();
            }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaForma(data: any) {

        this.serviciofrom.controls['codigo'].setValue(data.sa_codigo);
        this.serviciofrom.controls['descripcion'].setValue(data.sa_descripcion);
        this.serviciofrom.controls['estado'].setValue(data.sa_estado);




        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarservicio() {

        this.serviciofrom.controls['codigo'].setValue("");
        this.serviciofrom.controls['descripcion'].setValue("");
        this.serviciofrom.controls['estado'].setValue("");
        this.submitted = false;
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaServicio();
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
    cierreForma(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaForma(JSON.parse(event))
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
        return this.serviciofrom.controls;
    }
}
