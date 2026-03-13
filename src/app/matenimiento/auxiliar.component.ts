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
    templateUrl: './auxiliar.component.html',
    styleUrls: ['./auxiliar.component.scss']
})
export class AuxiliarComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedaauxiliar') modalbusquedaauxiliar: any;
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

    listtipoauxliar: any[] = [];
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listgrupo: any[] = [];
    iAccion: string = "";
    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    parametrofrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        codtipoauxiliar: new FormControl(''),
        coacodigo: new FormControl(''),
        codigo: new FormControl(''),
        codauxiliar: new FormControl(''),
        descripcion: new FormControl(''),
        estado: new FormControl('')
    });
    /**
   * DEFINICION DE VARIABLE DE MODELO DE VENDEDOR
   */
    model: any = {};
    /**
 * DEFINICION DE FUNCION INIT DE LA codauxiliar
 */
    ngOnInit() {
        this.limpiabotones(1);
        this.cargaTipoAuxiliar();
    }
    /**
* DEFINICION DE FUNCION CARGA FORMA
*/
    
    cargaTipoAuxiliar() {
        this.spinner.show();
        this.mantenimientoService.manTipoAuxiliar(globales.cia).subscribe(data => {
            try {
                this.listtipoauxliar = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cargaAuxiliar() {
        this.spinner.show();
        this.mantenimientoService.manAuxiliar(globales.cia).subscribe(data => {
            try {
                this.listgrupo = data.root[0];
                this.openModal(this.modalbusquedaauxiliar);
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
                this.parametrofrom.controls['coacodigo'].disable();
                this.parametrofrom.controls['codtipoauxiliar'].disable();
                this.parametrofrom.controls['codauxiliar'].disable();
                this.parametrofrom.controls['descripcion'].disable();
                this.parametrofrom.controls['estado'].disable();

                break;
            case 2:
                this.iAccion = "I";
                this.parametrofrom.controls['tipo'].setValue("I");
                this.parametrofrom.controls['coacodigo'].disable();
                this.parametrofrom.controls['codtipoauxiliar'].enable();
                this.parametrofrom.controls['codauxiliar'].enable();
                this.parametrofrom.controls['descripcion'].enable();
                this.parametrofrom.controls['estado'].setValue("A");
                this.parametrofrom.controls['estado'].enable();
                break;
            case 3:
                this.iAccion = "M";
                this.parametrofrom.controls['codigo'].disable();
                this.parametrofrom.controls['tipo'].setValue("M");
                this.parametrofrom.controls['coacodigo'].disable();
                this.parametrofrom.controls['codtipoauxiliar'].enable();
                this.parametrofrom.controls['codauxiliar'].enable();
                this.parametrofrom.controls['descripcion'].enable();
                this.parametrofrom.controls['estado'].enable();
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
  * CONSTRUCTOR DE LA codauxiliar
  */
    constructor(private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private fb: FormBuilder, private mantenimientoService: MantenimientoService, private injector: Injector) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Auxiliares')) {
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
    deletetipoauxiliar() {
        this.spinner.show();
        this.model.coacodigo = this.parametrofrom.controls['coacodigo'].value.toString().toUpperCase();
        this.model.cocodigo = this.parametrofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.coaestado = "D";
        this.mantenimientoService.deleteAuxiliar(this.model).subscribe(data => {
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

    /**
  * DEFINICION DE FUNCION PARA INSERTAR UN VENDEDOR
  */
    insertgrupo() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.coacodigo = this.parametrofrom.controls['coacodigo'].value.toString().toUpperCase();
        this.model.ctacodigo = this.parametrofrom.controls['codtipoauxiliar'].value.toString().toUpperCase();
        this.model.coadescripcion = this.parametrofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.coacodigodesc = this.parametrofrom.controls['codauxiliar'].value.toString().toUpperCase();
        this.model.coaestado = this.parametrofrom.controls['estado'].value.toString().toUpperCase();
        this.model.uscodigo = Funcion.returdatosession("usuario").us_codigo;
        this.mantenimientoService.insertAuxiliar(this.model).subscribe(data => {
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
    /**
  * DEFINICION DE FUNCION PARA ACTUALIZAR UN VENDEDOR
  */
    updategrupo() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.coacodigo = this.parametrofrom.controls['coacodigo'].value.toString().toUpperCase();
        this.model.ctacodigo = this.parametrofrom.controls['codtipoauxiliar'].value.toString().toUpperCase();
        this.model.coadescripcion = this.parametrofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.coacodigodesc = this.parametrofrom.controls['codauxiliar'].value.toString().toUpperCase();
        this.model.coaestado = this.parametrofrom.controls['estado'].value.toString().toUpperCase();
        this.model.uscodigo = Funcion.returdatosession("usuario").us_codigo;
        this.mantenimientoService.UpdateAuxiliar(this.model).subscribe(data => {
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

    /**
  * DEFINICION DE FUNCION PARA GUARDAR Y ACTUALIZAR VENDEDOR
  */
    guardargrupo() {
        this.submitted = true;
        if (this.parametrofrom.invalid) {
            return;
        } else {
            if (this.parametrofrom.controls['tipo'].value === "I") {
                this.insertgrupo();
            } else {
                this.updategrupo();
            }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaParametro(data: any) {
        this.parametrofrom.controls['coacodigo'].setValue(data.coa_codigo);
        this.parametrofrom.controls['codtipoauxiliar'].setValue(data.cta_codigo);
        this.parametrofrom.controls['codigo'].setValue(data.co_codigo);
        this.parametrofrom.controls['codauxiliar'].setValue(data.coa_codigodesc);
        this.parametrofrom.controls['descripcion'].setValue(data.coa_descripcion);
        this.parametrofrom.controls['estado'].setValue(data.coa_estado);

        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarparametro() {
        this.parametrofrom.controls['coacodigo'].setValue("");
        this.parametrofrom.controls['codigo'].setValue("");
        this.parametrofrom.controls['codtipoauxiliar'].setValue("");
        this.parametrofrom.controls['codauxiliar'].setValue("");
        this.parametrofrom.controls['descripcion'].setValue("");
        this.parametrofrom.controls['estado'].setValue("");

        this.submitted = false;
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaAuxiliar();
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
    cierreParametro(event: any) {
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
}
