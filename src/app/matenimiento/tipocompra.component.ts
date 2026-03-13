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
    templateUrl: './tipocompra.component.html',
    styleUrls: ['./tipocompra.component.scss']
})
export class TipoCompraComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedatipocompra') modalbusquedatipocompra: any;
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
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listestados: any[] = [];

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    estadofrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        cocodigo: new FormControl(''),
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
    cargaTipoCompra() {
        this.spinner.show();
        this.mantenimientoService.manTipoCompra(globales.cia).subscribe(data => {
            try {
                this.listestados = data.root[0];
                this.openModal(this.modalbusquedatipocompra);
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

                this.estadofrom.controls['codigo'].disable();
                this.estadofrom.controls['descripcion'].disable();
                this.estadofrom.controls['valor'].disable();
                this.estadofrom.controls['estado'].disable();

                break;
            case 2:
                this.estadofrom.controls['tipo'].setValue("I");
                this.estadofrom.controls['codigo'].enable();
                this.estadofrom.controls['descripcion'].enable();
                this.estadofrom.controls['valor'].enable();
                this.estadofrom.controls['estado'].setValue("A");
                this.estadofrom.controls['estado'].enable();
                break;
            case 3:
                this.estadofrom.controls['tipo'].setValue("M");
                this.estadofrom.controls['codigo'].disable();
                this.estadofrom.controls['descripcion'].enable();
                this.estadofrom.controls['valor'].enable();
                this.estadofrom.controls['estado'].enable();
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
            if (!Funcion.ValidadPagina('Ingreso de Tipo Compra')) {
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
    deletetipocompra() {
        this.spinner.show();
        this.model.cocodigo = this.estadofrom.controls['cocodigo'].value.toString().toUpperCase();
        this.model.tccodigo = this.estadofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.tcestado = "D";
        this.mantenimientoService.deleteTipoCompra(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarestado();
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
    inserttipocompra() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.tccodigo = this.estadofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.tcnombre = this.estadofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.tcvalor = this.estadofrom.controls['valor'].value.toString().toUpperCase();
        this.model.tcestado = this.estadofrom.controls['estado'].value.toString().toUpperCase();
        this.mantenimientoService.insertTipoCompra(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarestado();
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
    updatetipocompra() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.tccodigo = this.estadofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.tcnombre = this.estadofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.tcvalor = this.estadofrom.controls['valor'].value.toString().toUpperCase();
        this.model.tcestado = this.estadofrom.controls['estado'].value.toString().toUpperCase();
        this.mantenimientoService.updateTipoCompra(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarestado();
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
    guardarestado() {
        this.submitted = true;
        if (this.estadofrom.invalid) {
            return;
        } else {
            if (this.estadofrom.controls['tipo'].value === "I") {
                this.inserttipocompra();
            } else {
                this.updatetipocompra();
            }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaEstado(data: any) {
        this.estadofrom.controls['cocodigo'].setValue(data.co_codigo);
        this.estadofrom.controls['codigo'].setValue(data.tc_codigo);
        this.estadofrom.controls['descripcion'].setValue(data.tc_nombre);
        this.estadofrom.controls['valor'].setValue(data.tc_valor);
        this.estadofrom.controls['estado'].setValue(data.tc_estado);

        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarestado() {
        this.estadofrom.controls['cocodigo'].setValue("");
        this.estadofrom.controls['codigo'].setValue("");
        this.estadofrom.controls['descripcion'].setValue("");
        this.estadofrom.controls['valor'].setValue("");
        this.estadofrom.controls['estado'].setValue("");
        this.submitted = false;
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaTipoCompra();
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
    cierreEstado(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaEstado(JSON.parse(event))
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
        return this.estadofrom.controls;
    }
}
