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
    templateUrl: './aerolinea.component.html',
    styleUrls: ['./aerolinea.component.scss']
})
export class AerolineaComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedaaerolinea') modalbusquedaaerolinea: any;
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

    iAccion:string=""
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listaerolinea: any[] = [];

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
        this.limpiabotones(1);
    }
    /**
* DEFINICION DE FUNCION CARGA FORMA
*/
    cargaAerolinea() {
        this.spinner.show();
        this.mantenimientoService.manAerolinea(globales.cia).subscribe(data => {
            try {
                this.listaerolinea = data.root[0];
                this.openModal(this.modalbusquedaaerolinea);
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
                this.parametrofrom.controls['codigo'].disable();
                this.parametrofrom.controls['ruc'].disable();
                this.parametrofrom.controls['descripcion'].disable();
                this.parametrofrom.controls['estado'].disable();

                break;
            case 2:
                this.iAccion = "I";
                this.parametrofrom.controls['tipo'].setValue("I");
                this.parametrofrom.controls['codigo'].disable();
                this.parametrofrom.controls['ruc'].enable();
                this.parametrofrom.controls['descripcion'].enable();
                this.parametrofrom.controls['estado'].setValue("A");
                this.parametrofrom.controls['estado'].enable();
                break;
            case 3:
                this.iAccion = "M";
                this.parametrofrom.controls['tipo'].setValue("M");
                this.parametrofrom.controls['codigo'].disable();
                this.parametrofrom.controls['ruc'].enable();
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
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private fb: FormBuilder, private mantenimientoService: MantenimientoService, private injector: Injector) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Ingreso de Aerolineas')) {
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
    deleteparametro() {
        this.spinner.show();
        this.model.cocodigo = this.parametrofrom.controls['cocodigo'].value.toString().toUpperCase();
        this.model.escodigo = this.parametrofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.esestado = "D";
        this.mantenimientoService.deleteAerolinea(this.model).subscribe(data => {
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
    insertparametro() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.aecodigo = this.parametrofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.aeruc = this.parametrofrom.controls['ruc'].value.toString().toUpperCase();
        this.model.aedescripcion = this.parametrofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.aeestado = this.parametrofrom.controls['estado'].value.toString().toUpperCase();
        this.mantenimientoService.insertAerolinea(this.model).subscribe(data => {
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
    updateparametro() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.aecodigo = this.parametrofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.aeruc = this.parametrofrom.controls['ruc'].value.toString().toUpperCase();
        this.model.aedescripcion = this.parametrofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.aeestado = this.parametrofrom.controls['estado'].value.toString().toUpperCase();
        this.mantenimientoService.updateAerolinea(this.model).subscribe(data => {
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
    guardarparametro() {
        this.submitted = true;
        if (this.parametrofrom.invalid) {
            return;
        } else {
            if (this.parametrofrom.controls['tipo'].value === "I") {
                this.insertparametro();
            } else {
                this.updateparametro();
            }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaParametro(data: any) {
        this.parametrofrom.controls['cocodigo'].setValue(data.co_codigo);
        this.parametrofrom.controls['codigo'].setValue(data.ae_codigo);
        this.parametrofrom.controls['ruc'].setValue(data.ae_ruc);
        this.parametrofrom.controls['descripcion'].setValue(data.ae_descripcion);
        this.parametrofrom.controls['estado'].setValue(data.ae_estado);

        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarparametro() {
        this.parametrofrom.controls['cocodigo'].setValue("");
        this.parametrofrom.controls['codigo'].setValue("");
        this.parametrofrom.controls['ruc'].setValue("");
        this.parametrofrom.controls['descripcion'].setValue("");
        this.parametrofrom.controls['estado'].setValue("");
        this.submitted = false;
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
    cierreAerolinea(event: any) {
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
