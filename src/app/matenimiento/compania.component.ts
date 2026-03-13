import { Component, Inject, Injector, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Funcion } from '@funciones/funciones';
import { MantenimientoService } from '@services/mantenimiento-service';
import { NgxSpinnerService } from "ngx-spinner";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BotonesModel } from '@modelo/botones-model';
import { globales, environment } from 'src/environments/environment';
import { ServiceMensaje } from '@services/config/ServiceMensaje';
import { AsyncSubject, Observable } from 'rxjs';
import { TotalModel } from '@modelo/total-model';
import * as moment from 'moment';
import { DOCUMENT } from '@angular/common';
export interface SelectedFiles {
    name: string;
    file: any;
    base64?: string;
}

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './compania.component.html',
    styleUrls: ['./compania.component.scss']
})
export class CompaniComponent implements OnInit {
    fileToUpload?: File;
    public selectedFiles: SelectedFiles[] = [];
    imagen?: string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAzMAAAHMCAIAAABukmEEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAguSURBVHhe7dYxAQAADMOg+Tfd2cgBKrgBANBgZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAADdsDLQyux3VMIggAAAAASUVORK5CYII=";
    habilitabotones: boolean = false;
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedacompania') modalbusquedacompania: any;
    iAccion: string = "";
    llamarmodal: string = "";
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
    listacompania: any[] = [];

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    usuariofrom: FormGroup = new FormGroup({
        tipo:new FormControl(''),
        co_codigo: new FormControl(''),
        co_nombre: new FormControl(''),
        co_ruc: new FormControl(''),
        co_representante_legal: new FormControl(''),
        co_direccion: new FormControl(''),
        co_estado: new FormControl(''),
        co_telefono: new FormControl(''),
        imagen: new FormControl('')
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
    cargaCompania() {
        this.spinner.show();
        this.mantenimientoService.manCompania().subscribe(data => {
            try {
                this.listacompania = data.root[0];
                this.openModal(this.modalbusquedacompania);
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
                this.habilitabotones = true;
                this.usuariofrom.controls['co_nombre'].disable();
                this.usuariofrom.controls['co_ruc'].disable();
                this.usuariofrom.controls['co_representante_legal'].disable();
                this.usuariofrom.controls['co_estado'].disable();
                this.usuariofrom.controls['co_telefono'].disable();
                this.usuariofrom.controls['co_direccion'].disable();

                break;
            case 2:
                this.habilitabotones = false;
                this.iAccion = "I";
                this.usuariofrom.controls['tipo'].setValue("I");
                this.usuariofrom.controls['co_codigo'].enable();
                this.usuariofrom.controls['co_nombre'].enable();
                this.usuariofrom.controls['co_ruc'].enable();
                this.usuariofrom.controls['co_representante_legal'].enable();
                this.usuariofrom.controls['co_estado'].setValue("A");
                this.usuariofrom.controls['co_estado'].enable();
                this.usuariofrom.controls['co_telefono'].enable();
                this.usuariofrom.controls['co_direccion'].enable();
                break;
            case 3:
                this.habilitabotones = false;
                this.iAccion = "M";
                this.usuariofrom.controls['tipo'].setValue("M");
                this.usuariofrom.controls['co_codigo'].disable();
                this.usuariofrom.controls['co_nombre'].enable();
                this.usuariofrom.controls['co_ruc'].disable();
                this.usuariofrom.controls['co_representante_legal'].enable();
                this.usuariofrom.controls['co_estado'].enable();
                this.usuariofrom.controls['co_telefono'].enable();
                this.usuariofrom.controls['co_direccion'].enable();
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
            if (!Funcion.ValidadPagina('Agencia')) {
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
    handleFileInput(event: any) {
        this.fileToUpload = event.target.files[0] ?? null;
/*        row.nombrearchivo = this.fileToUpload?.name;*/
        this.selectedFiles = [];
        this.toFilesBase64(event.target.files, this.selectedFiles).subscribe((res: SelectedFiles[]) => {
            this.selectedFiles = res;
            this.usuariofrom.controls['imagen'].setValue(this.selectedFiles[0].base64);
            this.imagen = this.selectedFiles[0].base64;
        });

    }
    public toFilesBase64(files: File[], selectedFiles: SelectedFiles[]): Observable<SelectedFiles[]> {
        const result = new AsyncSubject<SelectedFiles[]>();
        if (files?.length) {
            Object.keys(files)?.forEach(async (file, i) => {
                const reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onload = (e) => {
                    selectedFiles = selectedFiles?.filter(f => f?.name != files[i]?.name)
                    selectedFiles.push({ name: files[i]?.name, file: files[i], base64: reader?.result as string })
                    result.next(selectedFiles);
                    if (files?.length === (i + 1)) {
                        result.complete();
                    }
                };
            });
            return result;
        } else {
            result.next([]);
            result.complete();
            return result;
        }
    }
    /**
  * DEFINICION DE FUNCION PARA BORRAR VENDEDOR
  */
    deleteusuario() {
        this.spinner.show();
     //   this.model.cocodigo = globales.cia;
        this.model.co_codigo = this.usuariofrom.controls['co_codigo'].value.toString().toUpperCase();
        this.model.co_estado = "D"
     
        this.mantenimientoService.deleteCompania(this.model).subscribe(data => {
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

    confirmarguardar() {
        if (this.iAccion === "I") {
            this.mensaje("4", "Esta seguro de guardar la Agencia");
        } else if (this.iAccion === "M") {
            this.mensaje("4", "Esta seguro de modificar la Agencia");
        }

    }
    cancelar() {
        this.limpiabotones(1);
        this.limpiarcliente();
        this.habilitarfrom(1);
    }
    aceptarOk(event: any) {
        if (event) {
            this.cancelar();
        }
    }
    aceptarConfi(event: any) {
        if (event) {
            this.guardarusuario();
        }
    }
    insertusuario() {
        this.spinner.show();
        this.model.co_nombre = this.usuariofrom.controls['co_nombre'].value.toString().toUpperCase();
        this.model.co_ruc = this.usuariofrom.controls['co_ruc'].value.toString().toUpperCase();
        this.model.co_representante_legal = this.usuariofrom.controls['co_representante_legal'].value; 
        this.model.co_estado = this.usuariofrom.controls['co_estado'].value;
        this.model.co_direccion = this.usuariofrom.controls['co_direccion'].value;
        this.model.co_telefono = this.usuariofrom.controls['co_telefono'].value;
        this.model.co_logo = this.usuariofrom.controls['imagen'].value;
        this.mantenimientoService.insertCompania(this.model).subscribe(data => {
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
    updateusuario() {
        this.spinner.show();
        this.model.co_codigo = this.usuariofrom.controls['co_codigo'].value.toString().toUpperCase();
        this.model.co_nombre = this.usuariofrom.controls['co_nombre'].value.toString().toUpperCase();
        this.model.co_ruc = this.usuariofrom.controls['co_ruc'].value.toString().toUpperCase();
        this.model.co_representante_legal = this.usuariofrom.controls['co_representante_legal'].value;
        this.model.co_estado = this.usuariofrom.controls['co_estado'].value;
        this.model.co_direccion = this.usuariofrom.controls['co_direccion'].value === null ? "" : this.usuariofrom.controls['co_direccion'].value;
        this.model.co_telefono = this.usuariofrom.controls['co_telefono'].value === null ? "" : this.usuariofrom.controls['co_telefono'].value;
        this.model.co_logo = this.usuariofrom.controls['imagen'].value;


        this.mantenimientoService.updateCompania(this.model).subscribe(data => {
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
    guardarusuario() {
        this.submitted = true;
        if (this.usuariofrom.invalid) {
            return;
        } else {
            if (this.usuariofrom.controls['tipo'].value === "I") {
                this.insertusuario();
            } else {
                this.updateusuario();
            }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaUsuario(data: any) {



        this.usuariofrom.controls['co_codigo'].setValue(data.co_codigo);
        this.usuariofrom.controls['co_nombre'].setValue(data.co_nombre);
        this.usuariofrom.controls['co_ruc'].setValue(data.co_ruc);
        this.usuariofrom.controls['co_representante_legal'].setValue(data.co_representante_legal);
        this.usuariofrom.controls['co_estado'].setValue(data.co_estado);
        this.usuariofrom.controls['co_telefono'].setValue(data.co_telefono);
        this.usuariofrom.controls['co_direccion'].setValue(data.co_direccion);
        this.usuariofrom.controls['imagen'].setValue(data.co_logo);
        this.imagen = data.co_logo;
        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarcliente() {
        this.usuariofrom.controls['co_codigo'].setValue("");
        this.usuariofrom.controls['co_nombre'].setValue("");
        this.usuariofrom.controls['co_ruc'].setValue("");
        this.usuariofrom.controls['co_representante_legal'].setValue("");
        this.usuariofrom.controls['co_estado'].setValue("");
        this.usuariofrom.controls['co_telefono'].setValue("");
        this.usuariofrom.controls['co_direccion'].setValue("");
        this.usuariofrom.controls['imagen'].setValue("");
        this.imagen = "";
        this.submitted = false;
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaCompania();
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
    cierreUsuario(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaUsuario(JSON.parse(event))
        }
    }
    /**
  * DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
  */
    cierreModalusuario(event: any) {
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
    mensaje(_tipo: string, _mensaje: string) {
        this.llamarmodal = _tipo + "|Registro Agencia|" + _mensaje + "|" + Funcion.Ramdon().toString();
    }
    get f(): { [key: string]: AbstractControl } {
        return this.usuariofrom.controls;
    }
}
