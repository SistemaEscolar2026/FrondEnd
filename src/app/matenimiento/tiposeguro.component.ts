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
    templateUrl: './tiposeguro.component.html',
    styleUrls: ['./tiposeguro.component.scss']
})
export class TipoSeguroComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedatiposeguro') modalbusquedatiposeguro: any;
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
    listtiposeguro: any[] = [];

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    tiposegurofrom: FormGroup = new FormGroup({
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
    cargaTipoSeguro() {
        this.spinner.show();
        this.mantenimientoService.manTipoSeguro(globales.cia).subscribe(data => {
            try {
                this.listtiposeguro = data.root[0];
                this.openModal(this.modalbusquedatiposeguro);
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
                this.tiposegurofrom.controls['codigo'].disable();
                this.tiposegurofrom.controls['descripcion'].disable();
                this.tiposegurofrom.controls['estado'].disable();
                this.habilita = true;
                break;
            case 2:
                this.iAccion = "I";
                this.tiposegurofrom.controls['tipo'].setValue("I");
                this.tiposegurofrom.controls['codigo'].disable();
                this.tiposegurofrom.controls['descripcion'].enable();
                this.tiposegurofrom.controls['estado'].setValue("A");
                this.tiposegurofrom.controls['estado'].enable();
                this.habilita = false;
                break;
            case 3:
                this.iAccion = "M";
                this.tiposegurofrom.controls['tipo'].setValue("M");
                this.tiposegurofrom.controls['codigo'].disable();
                this.tiposegurofrom.controls['descripcion'].enable();
                this.tiposegurofrom.controls['estado'].enable();
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
            if (!Funcion.ValidadPagina('Ingreso de Tipo Seguro')) {
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
    deletetiposeguro() {
        this.spinner.show();
        this.model.tscodigo = this.tiposegurofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.tsestado = "D";
        this.mantenimientoService.deleteTipoSeguro(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiartiposeguro();
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
    inserttiposeguro() {
        this.spinner.show();
        this.model.cicodigo = this.tiposegurofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.tsnombre = this.tiposegurofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.tsestado = this.tiposegurofrom.controls['estado'].value.toString().toUpperCase();
        this.mantenimientoService.insertTipoSeguro(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiartiposeguro();
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
    updatetiposeguro() {
        this.spinner.show();
        this.model.tscodigo = this.tiposegurofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.tsnombre = this.tiposegurofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.tsestado = this.tiposegurofrom.controls['estado'].value.toString().toUpperCase();
        this.mantenimientoService.updateTipoSeguro(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiartiposeguro();
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
    guardartiposeguro() {
        this.submitted = true;
        if (this.tiposegurofrom.invalid) {
            return;
        } else {
            if (this.tiposegurofrom.controls['tipo'].value === "I") {
                this.inserttiposeguro();
            } else {
                this.updatetiposeguro();
            }
        }
    }

    /**
   * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
   */
    seteaTipoSeguro(data: any) {

        this.tiposegurofrom.controls['codigo'].setValue(data.ts_codigo);
        this.tiposegurofrom.controls['descripcion'].setValue(data.ts_nombre);
        this.tiposegurofrom.controls['estado'].setValue(data.ts_estado);

        this.limpiabotones(3);
    }
    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiartiposeguro() {

        this.tiposegurofrom.controls['codigo'].setValue("");
        this.tiposegurofrom.controls['descripcion'].setValue("");
        this.tiposegurofrom.controls['estado'].setValue("");

        this.submitted = false;
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaTipoSeguro();
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
    cierreTipoSeguro(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaTipoSeguro(JSON.parse(event))
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
        return this.tiposegurofrom.controls;
    }
}
