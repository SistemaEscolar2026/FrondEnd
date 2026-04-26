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
    templateUrl: './curso.component.html',
    styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedacurso') modalbusquedacurso: any;
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
    iAccion: string = "";

    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listparalelo: any[] = [];
    listnivel: any[] = [];
    listcurso: any[] = [];
    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    paisfrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        codigo: new FormControl(''),
        nacodigo: new FormControl(''),
        pacodigo: new FormControl(''),
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
    cargaCurso() {
        this.spinner.show();
        this.mantenimientoService.manCurso(globales.cia).subscribe(data => {
            try {
                this.listcurso = data.root[0];
                this.openModal(this.modalbusquedacurso);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cargaNivel() {
        this.spinner.show();
        this.mantenimientoService.manNivel(globales.cia).subscribe(data => {
            try {
                this.listnivel = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cargaParalelo() {
        this.spinner.show();
        this.mantenimientoService.manParalelo(globales.cia).subscribe(data => {
            try {
                this.listparalelo = data.root[0];
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
                this.paisfrom.controls['codigo'].disable();
                this.paisfrom.controls['nacodigo'].disable();
                this.paisfrom.controls['pacodigo'].disable();
                this.paisfrom.controls['descripcion'].disable();
                this.paisfrom.controls['estado'].disable();

                break;
            case 2:
                this.iAccion = "I";
                this.paisfrom.controls['tipo'].setValue("I");
                this.paisfrom.controls['codigo'].enable();
                this.paisfrom.controls['descripcion'].enable();
                this.paisfrom.controls['nacodigo'].enable();
                this.paisfrom.controls['pacodigo'].enable();
                this.paisfrom.controls['estado'].setValue("A");
                this.paisfrom.controls['estado'].enable();
                break;
            case 3:
                this.iAccion = "M";
                this.paisfrom.controls['tipo'].setValue("M");
                this.paisfrom.controls['codigo'].disable();
                this.paisfrom.controls['nacodigo'].enable();
                this.paisfrom.controls['pacodigo'].enable();
                this.paisfrom.controls['descripcion'].enable();
                this.paisfrom.controls['estado'].enable();
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
            if (!Funcion.ValidadPagina('Curso')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listEstado = Funcion.Estado();
        this.notifier = this.injector.get(ServiceMensaje);
        this.habilitarfrom(1);
        this.cargaNivel();
        this.cargaParalelo();
    }

    /**
  * DEFINICION DE FUNCION PARA BORRAR VENDEDOR
  */
    deletepais() {
        this.spinner.show();
        this.model.cucodigo = this.paisfrom.controls['codigo'].value.toString().toUpperCase();
        this.model.cuestado = "D";
        this.mantenimientoService.deleteCurso(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarpais();
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
    insertpais() {
        this.spinner.show();
        this.model.cucodigo = this.paisfrom.controls['codigo'].value.toString().toUpperCase();
        this.model.cunombre = this.paisfrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.cuestado = this.paisfrom.controls['estado'].value.toString().toUpperCase();
        this.model.nacodigo = this.paisfrom.controls['nacodigo'].value.toString().toUpperCase();
        this.model.pacodigo = this.paisfrom.controls['pacodigo'].value.toString().toUpperCase();
        this.mantenimientoService.insertCurso(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarpais();
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
    updatepais() {
        this.spinner.show();
        this.model.cucodigo = this.paisfrom.controls['codigo'].value.toString().toUpperCase();
        this.model.cunombre = this.paisfrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.cuestado = this.paisfrom.controls['estado'].value.toString().toUpperCase();
        this.model.nacodigo = this.paisfrom.controls['nacodigo'].value.toString().toUpperCase();
        this.model.pacodigo = this.paisfrom.controls['pacodigo'].value.toString().toUpperCase();
        this.mantenimientoService.updateCurso(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarpais();
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
    guardarpais() {
        this.submitted = true;
        if (this.paisfrom.invalid) {
            return;
        } else {
            if (this.paisfrom.controls['tipo'].value === "I") {
                this.insertpais();
            } else {
                this.updatepais();
            }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaCurso(data: any) {

        this.paisfrom.controls['codigo'].setValue(data.cu_codigo);
        this.paisfrom.controls['descripcion'].setValue(data.cu_nombre);
        this.paisfrom.controls['estado'].setValue(data.cu_estado);
        this.paisfrom.controls['nacodigo'].setValue(data.na_codigo);
        this.paisfrom.controls['pacodigo'].setValue(data.pa_codigo);
        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarpais() {

        this.paisfrom.controls['codigo'].setValue("");
        this.paisfrom.controls['descripcion'].setValue("");
        this.paisfrom.controls['estado'].setValue("");
        this.paisfrom.controls['nacodigo'].setValue("");
        this.paisfrom.controls['pacodigo'].setValue("");
        this.submitted = false;
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaCurso();
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
    cierreParalelo(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaCurso(JSON.parse(event))
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
        return this.paisfrom.controls;
    }
}
