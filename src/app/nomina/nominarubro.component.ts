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
    templateUrl: './nominarubro.component.html',
    styleUrls: ['./nominarubro.component.scss']
})
export class NominaRubroComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedarubro') modalbusquedarubro: any;
    @ViewChild('modalbusquedaplancuenta') modalbusquedaplancuenta: any;
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
    listcuentas: any[] = [];
    /**
  * DEFINICION DE VARIABLE DE LISTADO DE OBJETO DE FORMA PAGO
  */
    listFormaCM: any[] = [];
    iAccion: string = "";
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listrubro: any[] = [];
    busca: boolean = true;

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    rubrofrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        codigo: new FormControl(''),
        nombre: new FormControl(''),
        estado: new FormControl(''),
        tiporubro: new FormControl(''),
        pagonomina: new FormControl(''),
        conceptopago: new FormControl(''),
        cuentacontable: new FormControl('')
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
    cargaForma() {
        this.spinner.show();
        this.mantenimientoService.getRubro(globales.cia).subscribe(data => {
            try {
                this.listrubro = data.root[0];
                this.openModal(this.modalbusquedarubro);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cargaPlanCuenta() {
        this.spinner.show();
        this.mantenimientoService.manPlanCuenta(globales.cia).subscribe(data => {
            try {
                this.listcuentas = data.root[0];
                this.openModal(this.modalbusquedaplancuenta);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }

    cierrePlanCuenta(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaPlanCuenta(JSON.parse(event))
        }
    }
    seteaPlanCuenta(dato: any) {

        this.rubrofrom.controls['cuentacontable'].setValue(dato.cpc_codigo_co);

    }
    /**
   * DEFINICION PARA HABILITAR EL FROM
   */
    habilitarfrom(val: Number) {
        switch (val) {
            case 1:

                this.iAccion = "";
                this.rubrofrom.controls['codigo'].disable();
                this.rubrofrom.controls['nombre'].disable();
                this.rubrofrom.controls['estado'].disable();

                this.rubrofrom.controls['tiporubro'].disable();
                this.rubrofrom.controls['pagonomina'].disable();
                this.rubrofrom.controls['conceptopago'].disable();
                this.rubrofrom.controls['cuentacontable'].disable();
                this.busca = true;

                break;
            case 2:
                this.iAccion = "I";
                this.rubrofrom.controls['tipo'].setValue("I");
                this.rubrofrom.controls['codigo'].disable();
                this.rubrofrom.controls['nombre'].enable();
                this.rubrofrom.controls['estado'].enable();
                this.rubrofrom.controls['estado'].setValue("A");
                this.rubrofrom.controls['tiporubro'].enable();
                this.rubrofrom.controls['tiporubro'].setValue("R");
                this.rubrofrom.controls['pagonomina'].enable();
                this.rubrofrom.controls['pagonomina'].setValue("S");
                this.rubrofrom.controls['conceptopago'].enable();
                this.rubrofrom.controls['cuentacontable'].disable();
                this.busca = false;


                break;
            case 3:
                this.iAccion = "M";
                this.rubrofrom.controls['tipo'].setValue("M");
                this.rubrofrom.controls['codigo'].disable();
                this.rubrofrom.controls['nombre'].enable();
                this.rubrofrom.controls['estado'].enable();
                this.rubrofrom.controls['tiporubro'].enable();
                this.rubrofrom.controls['pagonomina'].enable();
                this.rubrofrom.controls['conceptopago'].enable();
                this.rubrofrom.controls['cuentacontable'].disable();
                this.busca = false;
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
            if (!Funcion.ValidadPagina('Ingreso Rubros')) {
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
    deleteforma() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.nr_codigo = this.rubrofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.nr_estado = "D";
        this.mantenimientoService.deleteRubro(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarforma();
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


    insertforma() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.nr_codigo = this.rubrofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.nr_nombre = this.rubrofrom.controls['nombre'].value.toString().toUpperCase();
        this.model.nr_estado = this.rubrofrom.controls['estado'].value.toString().toUpperCase();
        this.model.nr_tiporubro = this.rubrofrom.controls['tiporubro'].value.toString().toUpperCase();
        this.model.nr_pagonomina = this.rubrofrom.controls['pagonomina'].value.toString().toUpperCase();
        this.model.nr_conceptopago = this.rubrofrom.controls['conceptopago'].value.toString().toUpperCase();
        this.model.cpc_codigo_co = this.rubrofrom.controls['cuentacontable'].value.toString().toUpperCase();

        this.mantenimientoService.insertRubro(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarforma();
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
    updateforma() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.nr_codigo = this.rubrofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.nr_nombre = this.rubrofrom.controls['nombre'].value.toString().toUpperCase();
        this.model.nr_estado = this.rubrofrom.controls['estado'].value.toString().toUpperCase();
        this.model.nr_tiporubro = this.rubrofrom.controls['tiporubro'].value.toString().toUpperCase();
        this.model.nr_pagonomina = this.rubrofrom.controls['pagonomina'].value.toString().toUpperCase();
        this.model.nr_conceptopago = this.rubrofrom.controls['conceptopago'].value.toString().toUpperCase();
        this.model.cpc_codigo_co = this.rubrofrom.controls['cuentacontable'].value.toString().toUpperCase();

        this.mantenimientoService.updateRubro(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarforma();
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
    guardarforma() {
        this.submitted = true;
        if (this.rubrofrom.invalid) {
            return;
        } else {
            if (this.rubrofrom.controls['tipo'].value === "I") {
                this.insertforma();
            } else {
                this.updateforma();
            }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaForma(data: any) {

        this.rubrofrom.controls['codigo'].setValue(data.nr_codigo);
        this.rubrofrom.controls['nombre'].setValue(data.nr_nombre);
        this.rubrofrom.controls['estado'].setValue(data.nr_estado);
        this.rubrofrom.controls['tiporubro'].setValue(data.nr_tiporubro);
        this.rubrofrom.controls['pagonomina'].setValue(data.nr_pagonomina);
        this.rubrofrom.controls['conceptopago'].setValue(data.nr_conceptopago);
        this.rubrofrom.controls['cuentacontable'].setValue(data.cpc_codigo_co);



        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarforma() {

        this.rubrofrom.controls['codigo'].setValue("");
        this.rubrofrom.controls['nombre'].setValue("");
        this.rubrofrom.controls['estado'].setValue("");
        this.rubrofrom.controls['tiporubro'].setValue("");
        this.rubrofrom.controls['pagonomina'].setValue("");
        this.rubrofrom.controls['conceptopago'].setValue("");
        this.rubrofrom.controls['cuentacontable'].setValue("");
        this.submitted = false;
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaForma();
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
        return this.rubrofrom.controls;
    }
}
