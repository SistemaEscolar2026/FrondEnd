import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Funcion } from '@funciones/funciones';
import { BancosService } from '@services/bancos-service';
import { NgxSpinnerService } from "ngx-spinner";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BotonesModel } from '@modelo/botones-model';
import { globales, environment } from 'src/environments/environment';
import { ServiceMensaje } from '@services/config/ServiceMensaje';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './mantenimientotipodocumento.component.html',
    styleUrls: ['./mantenimientotipodocumento.component.scss']
})
export class MantenimientoTipoDocumentoComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedatipodocumento') modalbusquedatipodocumento: any;
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
    listotipo: any[] = [];
    iAccion: string = "";

    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listtipodocumento: any[] = [];

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    bancosfrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        codigo: new FormControl(''),
        descripcion: new FormControl(''),
        valor: new FormControl(''),
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
    cargaTipoDocumento() {
        this.spinner.show();
        this.bancosService.manTipoDocumento(globales.cia).subscribe(data => {
            try {
                this.listtipodocumento = data.root[0];
                this.openModal(this.modalbusquedatipodocumento);
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
                this.bancosfrom.controls['codigo'].disable();
                this.bancosfrom.controls['descripcion'].disable();
                this.bancosfrom.controls['estado'].disable();
                this.bancosfrom.controls['valor'].disable();

                
                break;
            case 2:
                this.iAccion = "I";
                this.bancosfrom.controls['tipo'].setValue("I");
                this.bancosfrom.controls['codigo'].enable();
                this.bancosfrom.controls['descripcion'].enable();
                this.bancosfrom.controls['estado'].setValue("A");
                this.bancosfrom.controls['estado'].enable();
                this.bancosfrom.controls['valor'].setValue("I");
                this.bancosfrom.controls['valor'].enable();

                break;
            case 3:
                this.iAccion = "M";
                this.bancosfrom.controls['tipo'].setValue("M");
                this.bancosfrom.controls['codigo'].disable();
                this.bancosfrom.controls['descripcion'].enable();
                this.bancosfrom.controls['estado'].enable();
                this.bancosfrom.controls['valor'].disable();
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
    constructor(private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private fb: FormBuilder, private bancosService: BancosService, private injector: Injector) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Mantenimiento Tipo Documento Bancario')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listEstado = Funcion.Estado();
        this.listotipo = Funcion.Tipo();
        this.notifier = this.injector.get(ServiceMensaje);
        this.habilitarfrom(1);
    }

    /**
  * DEFINICION DE FUNCION PARA BORRAR VENDEDOR
  */
    deletebancos() {
        this.spinner.show();
        this.model.btdcodigo = this.bancosfrom.controls['codigo'].value.toString().toUpperCase();
        this.model.btdestado = "D";
        this.bancosService.deleteTipoDocumento(this.model).subscribe(data => {
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
    insertbancos() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.btdcodigo = this.bancosfrom.controls['codigo'].value.toString().toUpperCase();
        this.model.btddescripcion = this.bancosfrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.btdvalor = this.bancosfrom.controls['valor'].value.toString().toUpperCase();
        this.model.btdestado = this.bancosfrom.controls['estado'].value.toString().toUpperCase();
        this.bancosService.insertTipoDocumento(this.model).subscribe(data => {
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
    updatebancos() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.btdcodigo = this.bancosfrom.controls['codigo'].value.toString().toUpperCase();
        this.model.btddescripcion = this.bancosfrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.btdvalor = this.bancosfrom.controls['valor'].value.toString().toUpperCase();
        this.model.btdestado = this.bancosfrom.controls['estado'].value.toString().toUpperCase();
        this.bancosService.updateTipoDocumento(this.model).subscribe(data => {
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
    guardarbanco() {
        this.submitted = true;
        if (this.bancosfrom.invalid) {
            return;
        } else {
            if (this.bancosfrom.controls['tipo'].value === "I") {
                this.insertbancos();
            } else {
                this.updatebancos();
            }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaPais(data: any) {

        this.bancosfrom.controls['codigo'].setValue(data.btd_codigo);
        this.bancosfrom.controls['descripcion'].setValue(data.btd_descripcion);
        this.bancosfrom.controls['valor'].setValue(data.btd_valor);
        this.bancosfrom.controls['estado'].setValue(data.btd_estado);

        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarpais() {

        this.bancosfrom.controls['codigo'].setValue("");
        this.bancosfrom.controls['descripcion'].setValue("");
        this.bancosfrom.controls['valor'].setValue("");
        this.bancosfrom.controls['estado'].setValue("");
        this.submitted = false;
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaTipoDocumento();
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
    cierreTipoDocumento(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaPais(JSON.parse(event))
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
        return this.bancosfrom.controls;
    }
}
