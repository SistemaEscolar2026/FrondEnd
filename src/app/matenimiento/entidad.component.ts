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
    templateUrl: './entidad.component.html',
    styleUrls: ['./entidad.component.scss']
})
export class EntidadComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedaentidad') modalbusquedaentidad: any;
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
    listTipoCliente: any[] = [];
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listcliente: any[] = [];
    iAccion: string = "";
    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    clientefrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        tipocliente: new FormControl(''),
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
    cargaCliente() {
        this.spinner.show();
        this.mantenimientoService.manClientead(globales.cia).subscribe(data => {
            try {
                this.listcliente = data.root[0];
                this.openModal(this.modalbusquedaentidad);
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
                this.clientefrom.controls['tipocliente'].disable();
                this.clientefrom.controls['codigo'].disable();
                this.clientefrom.controls['nombre'].disable();
                this.clientefrom.controls['identificacion'].disable();
                this.clientefrom.controls['representante'].disable();
                this.clientefrom.controls['estado'].disable();
                this.clientefrom.controls['telefono'].disable();
                this.clientefrom.controls['correo'].disable();
                this.clientefrom.controls['direccion'].disable();

                break;
            case 2:
                this.iAccion = "I";
                this.clientefrom.controls['tipo'].setValue("I");
                this.clientefrom.controls['codigo'].enable();
                this.clientefrom.controls['tipocliente'].setValue(this.listTipoCliente[0].valor);
                this.clientefrom.controls['tipocliente'].enable();
                this.clientefrom.controls['nombre'].enable();
                this.clientefrom.controls['identificacion'].enable();
                this.clientefrom.controls['representante'].enable();
                this.clientefrom.controls['estado'].setValue("A");
                this.clientefrom.controls['estado'].enable();
                this.clientefrom.controls['telefono'].enable();
                this.clientefrom.controls['correo'].enable();
                this.clientefrom.controls['direccion'].enable();
                break;
            case 3:
                this.iAccion = "M";
                this.clientefrom.controls['tipo'].setValue("M");
                this.clientefrom.controls['codigo'].disable();
                this.clientefrom.controls['tipocliente'].disable();
                this.clientefrom.controls['nombre'].enable();
                this.clientefrom.controls['identificacion'].disable();
                this.clientefrom.controls['representante'].enable();
                this.clientefrom.controls['estado'].enable();
                this.clientefrom.controls['telefono'].enable();
                this.clientefrom.controls['correo'].enable();
                this.clientefrom.controls['direccion'].enable();
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
            if (!Funcion.ValidadPagina('Ingreso de Cliente')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listEstado = Funcion.Estado();
        this.listTipoCliente = Funcion.TipoCliente();
        this.notifier = this.injector.get(ServiceMensaje);
        this.habilitarfrom(1);
    }

    /**
  * DEFINICION DE FUNCION PARA BORRAR VENDEDOR
  */
    deletecliente() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.clcodigo = this.clientefrom.controls['codigo'].value.toString().toUpperCase();
        this.model.clestado = "D";
        this.mantenimientoService.deleteCliente(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarcliente();
                    this.habilitarfrom(1);
                }else{
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
    insertcliente() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.clnombre = this.clientefrom.controls['nombre'].value.toString().toUpperCase();
        this.model.cltipocliente = this.clientefrom.controls['tipocliente'].value.toString().toUpperCase();
        this.model.clestado = this.clientefrom.controls['estado'].value.toString().toUpperCase();
        this.model.cldireccion = this.clientefrom.controls['direccion'].value;
        this.model.clidentificacion = this.clientefrom.controls['identificacion'].value;
        this.model.clcorreo = this.clientefrom.controls['correo'].value;
        this.model.cltelefono = this.clientefrom.controls['telefono'].value;
        this.model.clrepresentantelegal = this.clientefrom.controls['representante'].value;
        this.mantenimientoService.insertCliente(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarcliente();
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
    updatecliente() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.clcodigo = this.clientefrom.controls['codigo'].value.toString().toUpperCase();
        this.model.clnombre = this.clientefrom.controls['nombre'].value.toString().toUpperCase();
        this.model.cltipocliente = this.clientefrom.controls['tipocliente'].value.toString().toUpperCase();
        this.model.clestado = this.clientefrom.controls['estado'].value.toString().toUpperCase();
        this.model.cldireccion = this.clientefrom.controls['direccion'].value;
        this.model.clidentificacion = this.clientefrom.controls['identificacion'].value;
        this.model.clcorreo = this.clientefrom.controls['correo'].value;
        this.model.cltelefono = this.clientefrom.controls['telefono'].value;
        this.model.clrepresentantelegal = this.clientefrom.controls['representante'].value;
        this.mantenimientoService.updateCliente(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarcliente();
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
    guardarcliente() {
        this.submitted = true;
        if (this.clientefrom.invalid) {
            return;
        } else {
            if (this.clientefrom.controls['tipo'].value === "I") {
                this.insertcliente();
            } else {
                this.updatecliente();
            }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaCliente(data: any) {

        this.clientefrom.controls['codigo'].setValue(data.cl_codigo);
        this.clientefrom.controls['nombre'].setValue(data.cl_nombre);
        this.clientefrom.controls['identificacion'].setValue(data.cl_identificacion);
        this.clientefrom.controls['tipocliente'].setValue(data.cl_tipo_cliente);
        this.clientefrom.controls['representante'].setValue(data.cl_representante_legal);
        this.clientefrom.controls['estado'].setValue(data.cl_estado);
        this.clientefrom.controls['telefono'].setValue(data.cl_telefono);
        this.clientefrom.controls['correo'].setValue(data.cl_correo);
        this.clientefrom.controls['direccion'].setValue(data.cl_direccion);
        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarcliente() {
        this.clientefrom.controls['codigo'].setValue("");
        this.clientefrom.controls['nombre'].setValue("");
        this.clientefrom.controls['identificacion'].setValue("");
        this.clientefrom.controls['representante'].setValue("");
        this.clientefrom.controls['estado'].setValue("");
        this.clientefrom.controls['telefono'].setValue("");
        this.clientefrom.controls['correo'].setValue("");
        this.clientefrom.controls['tipocliente'].setValue("");
        this.clientefrom.controls['direccion'].setValue("");

        this.submitted = false;
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaCliente();
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
    cierreCliente(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaCliente(JSON.parse(event))
        }
    }
    /**
  * DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
  */
    cierreModalcliente(event: any) {
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
        return this.clientefrom.controls;
    }
}
