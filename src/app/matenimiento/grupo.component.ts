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
    templateUrl: './grupo.component.html',
    styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedagrupo') modalbusquedagrupo: any;
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
    listClase: any[] = [];


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
        concodigo: new FormControl(''),
        concodgrupo: new FormControl(''),
        codigo: new FormControl(''),
        clase: new FormControl(''),
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
    cargaGrupo() {
        this.spinner.show();
        this.mantenimientoService.manGrupo(globales.cia).subscribe(data => {
            try {
                this.listgrupo = data.root[0];
                this.openModal(this.modalbusquedagrupo);
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
                this.parametrofrom.controls['concodigo'].disable();
                this.parametrofrom.controls['concodgrupo'].disable();
                this.parametrofrom.controls['descripcion'].disable();
                this.parametrofrom.controls['clase'].disable();
                this.parametrofrom.controls['estado'].disable();

                break;
            case 2:
                this.iAccion = "I";
                this.parametrofrom.controls['tipo'].setValue("I");
                this.parametrofrom.controls['concodigo'].disable();
                this.parametrofrom.controls['concodgrupo'].enable();
                this.parametrofrom.controls['descripcion'].enable();
                this.parametrofrom.controls['clase'].enable();
                this.parametrofrom.controls['estado'].setValue("A");
                this.parametrofrom.controls['estado'].enable();
                break;
            case 3:
                this.iAccion = "M";
                this.parametrofrom.controls['codigo'].disable();
                this.parametrofrom.controls['tipo'].setValue("M");
                this.parametrofrom.controls['concodgrupo'].disable();
                this.parametrofrom.controls['concodigo'].disable();
                this.parametrofrom.controls['descripcion'].enable();
                this.parametrofrom.controls['clase'].enable();
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
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private fb: FormBuilder, private mantenimientoService: MantenimientoService, private injector: Injector) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Grupo Contable')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listEstado = Funcion.Estado();
        this.listClase = Funcion.Clase();
        this.notifier = this.injector.get(ServiceMensaje);
        this.habilitarfrom(1);
    }

    /**
  * DEFINICION DE FUNCION PARA BORRAR VENDEDOR
  */
    deletegrupo() {
        this.spinner.show();
        this.model.concodigo = this.parametrofrom.controls['concodigo'].value.toString().toUpperCase();
        this.model.cocodigo = this.parametrofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.conestado = "D";
        this.mantenimientoService.deleteGrupo(this.model).subscribe(data => {
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
        this.model.concodigo = this.parametrofrom.controls['concodigo'].value.toString().toUpperCase();
        this.model.concodgrupo = this.parametrofrom.controls['concodgrupo'].value.toString().toUpperCase();
        this.model.condescripcion = this.parametrofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.conclase = this.parametrofrom.controls['clase'].value.toString().toUpperCase();
        this.model.conestado = this.parametrofrom.controls['estado'].value.toString().toUpperCase();
        this.model.uscodigo = Funcion.returdatosession("usuario").us_codigo;
        this.mantenimientoService.insertGrupo(this.model).subscribe(data => {
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
        this.model.concodigo = this.parametrofrom.controls['concodigo'].value.toString().toUpperCase();
        this.model.concodgrupo = this.parametrofrom.controls['concodgrupo'].value.toString().toUpperCase();
        this.model.condescripcion = this.parametrofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.conclase = this.parametrofrom.controls['clase'].value.toString().toUpperCase();
        this.model.conestado = this.parametrofrom.controls['estado'].value.toString().toUpperCase();
        this.model.uscodigo = Funcion.returdatosession("usuario").us_codigo;
        this.mantenimientoService.UpdateGrupo(this.model).subscribe(data => {
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
        this.parametrofrom.controls['concodigo'].setValue(data.con_codigo);
        this.parametrofrom.controls['concodgrupo'].setValue(data.con_cod_grupo);
        this.parametrofrom.controls['codigo'].setValue(data.co_codigo);
        this.parametrofrom.controls['clase'].setValue(data.con_clase);
        this.parametrofrom.controls['descripcion'].setValue(data.con_descripcion);
        this.parametrofrom.controls['estado'].setValue(data.con_estado);

        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarparametro() {
        this.parametrofrom.controls['concodigo'].setValue("");
        this.parametrofrom.controls['codigo'].setValue("");
        this.parametrofrom.controls['concodgrupo'].setValue("");
        this.parametrofrom.controls['descripcion'].setValue("");
        this.parametrofrom.controls['clase'].setValue("");
        this.parametrofrom.controls['estado'].setValue("");

        this.submitted = false;
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaGrupo();
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
