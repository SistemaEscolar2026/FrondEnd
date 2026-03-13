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
    templateUrl: './comision.component.html',
    styleUrls: ['./comision.component.scss']
})
export class ComisionComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedacomision') modalbusquedacomision: any;
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
    iAccion: string = "";
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listcomision: any[] = [];
    

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    comisionfrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        tipocomision: new FormControl(''),
        codigo: new FormControl(''),
        porcentaje: new FormControl(''),
        valor: new FormControl(''),
        entidad: new FormControl(''),
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
* DEFINICION DE FUNCION CARGA VENDEDORES
*/
    cargaComision() {
        this.spinner.show();
        this.mantenimientoService.manComision(globales.cia).subscribe(data => {
            try {
                this.listcomision = data.root[0];
                this.openModal(this.modalbusquedacomision);
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
                this.comisionfrom.controls['codigo'].disable();
                this.comisionfrom.controls['porcentaje'].disable();
                this.comisionfrom.controls['valor'].disable();
                this.comisionfrom.controls['entidad'].disable();
                this.comisionfrom.controls['estado'].disable();
                this.comisionfrom.controls['tipocomision'].disable();
              

                break;
            case 2:
                this.iAccion = "I";
                this.comisionfrom.controls['tipo'].setValue("I");
                this.comisionfrom.controls['tipocomision'].enable();
                this.comisionfrom.controls['tipocomision'].setValue("P");
                this.comisionfrom.controls['codigo'].disable();
                this.comisionfrom.controls['porcentaje'].enable();
                this.comisionfrom.controls['valor'].enable();
                this.comisionfrom.controls['entidad'].enable();
                this.comisionfrom.controls['estado'].setValue("A");
                this.comisionfrom.controls['estado'].enable();
                this.comisionfrom.controls['valor'].disable();
                this.comisionfrom.controls['porcentaje'].enable();
                break;
            case 3:
                this.iAccion = "M";
                this.comisionfrom.controls['tipo'].setValue("M");
                this.comisionfrom.controls['tipocomision'].enable();
                this.comisionfrom.controls['codigo'].disable();
                this.comisionfrom.controls['porcentaje'].enable();
                this.comisionfrom.controls['valor'].enable();
                this.comisionfrom.controls['entidad'].enable();
                this.comisionfrom.controls['estado'].enable();
                this.cambiotipo();
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
            if (!Funcion.ValidadPagina('Ingreso de Comision')) {
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
    deletecomision() {
        this.spinner.show();
        this.model.copcodigo = globales.cia;
        this.model.cocodigo = this.comisionfrom.controls['codigo'].value.toString().toUpperCase();
        this.model.coestado = "D";
        this.mantenimientoService.deleteComision(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarcomision();
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
    insertcomision() {
        this.spinner.show();
        this.model.copcodigo = globales.cia;
        this.model.coporcentaje = this.comisionfrom.controls['porcentaje'].value.toString().toUpperCase();
        this.model.cotipo = this.comisionfrom.controls['tipocomision'].value.toString().toUpperCase();
        this.model.covalor = this.comisionfrom.controls['valor'].value.toString().toUpperCase();
        this.model.coentidad = this.comisionfrom.controls['entidad'].value.toString().toUpperCase();
        this.model.coestado = this.comisionfrom.controls['estado'].value.toString().toUpperCase();
        this.mantenimientoService.insertComision(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarcomision();
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
    updatecomision() {
        this.spinner.show();
        this.model.copcodigo = globales.cia;
        this.model.cocodigo = this.comisionfrom.controls['codigo'].value.toString().toUpperCase();
        this.model.coporcentaje = this.comisionfrom.controls['porcentaje'].value.toString().toUpperCase();
        this.model.covalor = this.comisionfrom.controls['valor'].value.toString().toUpperCase();
        this.model.coentidad = this.comisionfrom.controls['entidad'].value.toString().toUpperCase();
        this.model.coestado = this.comisionfrom.controls['estado'].value.toString().toUpperCase();
        this.model.cotipo = this.comisionfrom.controls['tipocomision'].value.toString().toUpperCase();
        this.mantenimientoService.updateComision(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarcomision();
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
    guardarcomision() {
        this.submitted = true;
        if (this.comisionfrom.invalid) {
            return;
        } else {
            if (this.comisionfrom.controls['tipo'].value === "I") {
                this.insertcomision();
            } else {
                this.updatecomision();
            }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaComision(data: any) {

        this.comisionfrom.controls['codigo'].setValue(data.co_codigo);
        this.comisionfrom.controls['porcentaje'].setValue(data.co_porcentaje);
        this.comisionfrom.controls['valor'].setValue(data.co_valor);
        this.comisionfrom.controls['entidad'].setValue(data.co_entidad);
        this.comisionfrom.controls['estado'].setValue(data.co_estado);
        this.comisionfrom.controls['tipocomision'].setValue(data.co_tipo);

        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarcomision() {
        this.comisionfrom.controls['codigo'].setValue("");
        this.comisionfrom.controls['porcentaje'].setValue("");
        this.comisionfrom.controls['valor'].setValue("");
        this.comisionfrom.controls['entidad'].setValue("");
        this.comisionfrom.controls['estado'].setValue("");
        this.comisionfrom.controls['tipocomision'].setValue("");
        this.submitted = false;
    }


    cambiotipo() {
        if (this.comisionfrom.controls['tipocomision'].value.toString() === "P") {
            this.comisionfrom.controls['valor'].disable();
            this.comisionfrom.controls['porcentaje'].enable();
         
            this.comisionfrom.controls['valor'].setValue("");
        } else {
            this.comisionfrom.controls['valor'].enable();
            this.comisionfrom.controls['porcentaje'].disable();
            this.comisionfrom.controls['porcentaje'].setValue("");
        }
       
    }
    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaComision();
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
            this.seteaComision(JSON.parse(event))
        }
    }
    /**
  * DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
  */
    cierreModalcomision(event: any) {
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
        return this.comisionfrom.controls;
    }
}
