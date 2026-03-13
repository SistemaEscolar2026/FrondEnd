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
    templateUrl: './proveedor.component.html',
    styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedaproveedor') modalbusquedaproveedor: any;
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
   * DEFINICION DE VARIABLE DE LISTADO DE OBJETO DE ESTADO
   */
    listTipoProveedor: any[] = [];
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listproveedor: any[] = [];
    iAccion: string = "";
    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    proveedorfrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        tipoproveedor: new FormControl(''),
        codigo: new FormControl(''),
        nombre: new FormControl(''),
        identificacion: new FormControl(''),
        representante: new FormControl(''),
        direccion: new FormControl(''),
        estado: new FormControl(''),
        telefono: new FormControl(''),
        correo: new FormControl('')
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
* DEFINICION DE FUNCION CARGA VENDEDORES
*/
    cargaProveedor() {
        this.spinner.show();
        this.mantenimientoService.manProveedor(globales.cia).subscribe(data => {
            try {
                this.listproveedor = data.root[0];
                this.openModal(this.modalbusquedaproveedor);
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
                this.proveedorfrom.controls['tipoproveedor'].disable();
                this.proveedorfrom.controls['codigo'].disable();
                this.proveedorfrom.controls['nombre'].disable();
                this.proveedorfrom.controls['identificacion'].disable();
                this.proveedorfrom.controls['estado'].disable();
                this.proveedorfrom.controls['telefono'].disable();
                this.proveedorfrom.controls['correo'].disable();
                this.proveedorfrom.controls['direccion'].disable();

                break;
            case 2:
                this.iAccion = "I";
                this.proveedorfrom.controls['tipo'].setValue("I");
                this.proveedorfrom.controls['codigo'].enable();
                this.proveedorfrom.controls['tipoproveedor'].setValue(this.listTipoProveedor[0].valor);
                this.proveedorfrom.controls['tipoproveedor'].enable();
                this.proveedorfrom.controls['nombre'].enable();
                this.proveedorfrom.controls['identificacion'].enable();
                this.proveedorfrom.controls['estado'].setValue("A");
                this.proveedorfrom.controls['estado'].enable();
                this.proveedorfrom.controls['telefono'].enable();
                this.proveedorfrom.controls['correo'].enable();
                this.proveedorfrom.controls['direccion'].enable();
                break;
            case 3:
                this.iAccion = "M";
                this.proveedorfrom.controls['tipo'].setValue("M");
                this.proveedorfrom.controls['codigo'].disable();
                this.proveedorfrom.controls['tipoproveedor'].disable();
                this.proveedorfrom.controls['nombre'].enable();
                this.proveedorfrom.controls['identificacion'].disable();
                this.proveedorfrom.controls['estado'].enable();
                this.proveedorfrom.controls['telefono'].enable();
                this.proveedorfrom.controls['correo'].enable();
                this.proveedorfrom.controls['direccion'].enable();
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
            if (!Funcion.ValidadPagina('Ingreso de Proveedor')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listEstado = Funcion.Estado();
        this.listTipoProveedor = Funcion.TipoProveedor();
        this.notifier = this.injector.get(ServiceMensaje);
        this.habilitarfrom(1);
    }

    /**
  * DEFINICION DE FUNCION PARA BORRAR VENDEDOR
  */
    deleteproveedor() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.prcodigo = this.proveedorfrom.controls['codigo'].value.toString().toUpperCase();
        this.model.prestado = "D";
        this.mantenimientoService.deleteProveedor(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarproveedor();
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
  * DEFINICION DE FUNCION PARA INSERTAR UN PROVEEDOR
  */
    insertproveedor() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.prnombre = this.proveedorfrom.controls['nombre'].value.toString().toUpperCase();
        this.model.prtipoproveedor = this.proveedorfrom.controls['tipoproveedor'].value.toString().toUpperCase();
        this.model.prestado = this.proveedorfrom.controls['estado'].value.toString().toUpperCase();
        this.model.prdireccion = this.proveedorfrom.controls['direccion'].value;
        this.model.pridentificacion = this.proveedorfrom.controls['identificacion'].value;
        this.model.prcorreo = this.proveedorfrom.controls['correo'].value;
        this.model.prtelefono = this.proveedorfrom.controls['telefono'].value;
        this.mantenimientoService.insertProveedor(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarproveedor();
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
  * DEFINICION DE FUNCION PARA ACTUALIZAR UN PROVEEDOR
  */
    updateproveedor() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.prcodigo = this.proveedorfrom.controls['codigo'].value.toString().toUpperCase();
        this.model.prnombre = this.proveedorfrom.controls['nombre'].value.toString().toUpperCase();
        this.model.prtipoproveedor = this.proveedorfrom.controls['tipoproveedor'].value.toString().toUpperCase();
        this.model.prestado = this.proveedorfrom.controls['estado'].value.toString().toUpperCase();
        this.model.prdireccion = this.proveedorfrom.controls['direccion'].value;
        this.model.pridentificacion = this.proveedorfrom.controls['identificacion'].value;
        this.model.prcorreo = this.proveedorfrom.controls['correo'].value;
        this.model.prtelefono = this.proveedorfrom.controls['telefono'].value;
        this.mantenimientoService.updateProveedor(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarproveedor();
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
    guardarproveedor() {
        this.submitted = true;
        if (this.proveedorfrom.invalid) {
            return;
        } else {
            if (this.proveedorfrom.controls['tipo'].value === "I") {
                this.insertproveedor();
            } else {
                this.updateproveedor();
            }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaCliente(data: any) {

        this.proveedorfrom.controls['codigo'].setValue(data.pr_codigo);
        this.proveedorfrom.controls['nombre'].setValue(data.pr_nombre);
        this.proveedorfrom.controls['identificacion'].setValue(data.pr_identificacion);
        this.proveedorfrom.controls['tipoproveedor'].setValue(data.pr_tipo_proveedor);
        this.proveedorfrom.controls['estado'].setValue(data.pr_estado);
        this.proveedorfrom.controls['telefono'].setValue(data.pr_telefono);
        this.proveedorfrom.controls['correo'].setValue(data.pr_correo);
        this.proveedorfrom.controls['direccion'].setValue(data.pr_direccion);
        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarproveedor() {
        this.proveedorfrom.controls['codigo'].setValue("");
        this.proveedorfrom.controls['nombre'].setValue("");
        this.proveedorfrom.controls['identificacion'].setValue("");
        this.proveedorfrom.controls['estado'].setValue("");
        this.proveedorfrom.controls['telefono'].setValue("");
        this.proveedorfrom.controls['correo'].setValue("");
        this.proveedorfrom.controls['tipoproveedor'].setValue("");
        this.proveedorfrom.controls['direccion'].setValue("");

        this.submitted = false;
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaProveedor();
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
    cierreProveedor(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaCliente(JSON.parse(event))
        }
    }
    /**
  * DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
  */
    cierreModalproveedor(event: any) {
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
        return this.proveedorfrom.controls;
    }
}
