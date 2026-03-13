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
    templateUrl: './formapago.component.html',
    styleUrls: ['./formapago.component.scss']
})
export class FormaPagoComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedaforma') modalbusquedaforma: any;
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
    listforma: any[] = [];

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    pagofrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        codigo: new FormControl(''),
        dia: new FormControl(''),
        descripcion: new FormControl(''),
        tipofp: new FormControl(''),
        tipofp2: new FormControl(''),

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
    cargaForma() {
        this.spinner.show();
        this.mantenimientoService.manFormaPago(globales.cia).subscribe(data => {
            try {
                this.listforma = data.root[0];
                this.openModal(this.modalbusquedaforma);
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
                this.pagofrom.controls['codigo'].disable();
                this.pagofrom.controls['descripcion'].disable();
                this.pagofrom.controls['dia'].disable();

                this.pagofrom.controls['tipofp2'].disable();
                this.pagofrom.controls['tipofp'].disable();
                this.pagofrom.controls['estado'].disable();

                break;
            case 2:
                this.iAccion = "I";
                this.pagofrom.controls['tipo'].setValue("I");
                this.pagofrom.controls['codigo'].disable();
                this.pagofrom.controls['descripcion'].enable();
                this.pagofrom.controls['dia'].enable();
                this.pagofrom.controls['tipofp'].setValue(true);
                this.pagofrom.controls['tipofp'].enable();
                this.pagofrom.controls['tipofp2'].setValue(true);
                this.pagofrom.controls['tipofp2'].enable();
                this.pagofrom.controls['estado'].setValue("A");
                this.pagofrom.controls['estado'].enable();
                break;
            case 3:
                this.iAccion = "M";
                this.pagofrom.controls['tipo'].setValue("M");
                this.pagofrom.controls['codigo'].disable();
                this.pagofrom.controls['dia'].enable();
                this.pagofrom.controls['descripcion'].enable();
                this.pagofrom.controls['tipofp'].enable();
                this.pagofrom.controls['tipofp2'].enable();
                this.pagofrom.controls['estado'].enable();
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
            if (!Funcion.ValidadPagina('Ingreso Forma de Pago')) {
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
        this.model.fpcodigo = this.pagofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.fpestado = "D";
        this.mantenimientoService.deleteForma(this.model).subscribe(data => {
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
  * DEFINICION DE FUNCION PARA INSERTAR UN VENDEDOR
  */
    insertforma() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.fpcodigo = this.pagofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.fpdia = this.pagofrom.controls['dia'].value.toString().toUpperCase();
        this.model.fpdescripcion = this.pagofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.fptipo = (this.pagofrom.controls['tipofp'].value === true) ? "E" : "";
        this.model.fptipo2 = (this.pagofrom.controls['tipofp2'].value === true) ? "P" : "";
        this.model.fpestado = this.pagofrom.controls['estado'].value.toString().toUpperCase();
        this.mantenimientoService.insertForma(this.model).subscribe(data => {
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
        this.model.fpcodigo = this.pagofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.fpdia = this.pagofrom.controls['dia'].value.toString().toUpperCase();
        this.model.fpdescripcion = this.pagofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.fptipo = (this.pagofrom.controls['tipofp'].value === true) ? "E" : "";
        this.model.fptipo2 = (this.pagofrom.controls['tipofp2'].value === true) ? "P" : "";
        this.model.fpestado = this.pagofrom.controls['estado'].value.toString().toUpperCase();
        this.mantenimientoService.updateForma(this.model).subscribe(data => {
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
        if (this.pagofrom.invalid) {
            return;
        } else {
            if (this.pagofrom.controls['tipo'].value === "I") {
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

        this.pagofrom.controls['codigo'].setValue(data.fp_codigo);
        this.pagofrom.controls['descripcion'].setValue(data.fp_descripcion);
        this.pagofrom.controls['dia'].setValue(data.fp_dia);
        this.pagofrom.controls['tipofp'].setValue((data.fp_tipo === "E") ? true : false);
        this.pagofrom.controls['tipofp2'].setValue((data.fp_tipo2 === "P") ? true : false);
        this.pagofrom.controls['estado'].setValue(data.fp_estado);




        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarforma() {

        this.pagofrom.controls['codigo'].setValue("");
        this.pagofrom.controls['dia'].setValue("");
        this.pagofrom.controls['descripcion'].setValue("");
        this.pagofrom.controls['tipofp'].setValue("");
        this.pagofrom.controls['tipofp2'].setValue("");
        this.pagofrom.controls['estado'].setValue("");
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
        return this.pagofrom.controls;
    }
}
