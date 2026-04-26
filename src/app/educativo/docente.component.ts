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
import { AsyncSubject, Observable } from 'rxjs';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es'; // 1. Importar español
export interface SelectedFiles {
    name: string;
    file: any;
    base64?: string;
}

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './docente.component.html',
    styleUrls: ['./docente.component.scss']
})
export class DocenteComponent implements OnInit {

    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        locale: esLocale, // 2. Asignar idioma
        dateClick: (arg) => this.handleDateClick(arg),
        initialView: 'timeGridWeek', // Vista semanal por horas
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek'
        },
        weekends: true,
        editable: true,
        selectable: true
    };
    handleDateClick(arg: any) {
        alert('date click! ' + arg.dateStr)
    }

    fileToUpload?: File;
    public selectedFiles: SelectedFiles[] = [];
    imagen?: string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAzMAAAHMCAIAAABukmEEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAguSURBVHhe7dYxAQAADMOg+Tfd2cgBKrgBANBgZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAADdsDLQyux3VMIggAAAAASUVORK5CYII=";
    habilitabotones: boolean = false;
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedadocente') modalbusquedadocente: any;
    iAccion: string = "";
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
    listperfil: any[] = [];
    /**
   * DEFINICION DE VARIABLE DE LISTADO DE OBJETO DE ESTADO
   */
    listTipoCliente: any[] = [];
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listdocente: any[] = [];

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    usuariofrom: FormGroup = new FormGroup({
        tipo:new FormControl(''),
        codigo: new FormControl(''),
        nombre: new FormControl(''),
        apellido: new FormControl(''),
        direccion: new FormControl(''),
        estado: new FormControl(''),
        telefono: new FormControl(''),
        correo: new FormControl(''),
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
    cargaDocente() {
        this.spinner.show();
        this.mantenimientoService.manDocente(globales.cia).subscribe(data => {
            try {
                this.listdocente = data.root[0];
                this.openModal(this.modalbusquedadocente);
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
                this.usuariofrom.controls['nombre'].disable();
                this.usuariofrom.controls['apellido'].disable();
                this.usuariofrom.controls['estado'].disable();
                this.usuariofrom.controls['telefono'].disable();
                this.usuariofrom.controls['correo'].disable();
                this.usuariofrom.controls['direccion'].disable();

                break;
            case 2:
                this.habilitabotones = false;
                this.iAccion = "I";
                this.usuariofrom.controls['tipo'].setValue("I");
                this.usuariofrom.controls['codigo'].enable();
                this.usuariofrom.controls['nombre'].enable();
                this.usuariofrom.controls['apellido'].enable();
                this.usuariofrom.controls['estado'].setValue("A");
                this.usuariofrom.controls['estado'].enable();
                this.usuariofrom.controls['telefono'].enable();
                this.usuariofrom.controls['correo'].enable();
                this.usuariofrom.controls['direccion'].enable();
                break;
            case 3:
                this.habilitabotones = false;
                this.iAccion = "M";
                this.usuariofrom.controls['tipo'].setValue("M");
                this.usuariofrom.controls['codigo'].disable();
                this.usuariofrom.controls['nombre'].enable();
                this.usuariofrom.controls['apellido'].enable();
                this.usuariofrom.controls['estado'].enable();
                this.usuariofrom.controls['telefono'].enable();
                this.usuariofrom.controls['correo'].enable();
                this.usuariofrom.controls['direccion'].enable();
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
            if (!Funcion.ValidadPagina('Docente')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listEstado = Funcion.Estado();
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
        this.model.cocodigo = globales.cia;
        this.model.docodigo = this.usuariofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.doestado = "D"
        this.mantenimientoService.deleteDocente(this.model).subscribe(data => {
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
    insertusuario() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.docodigo = "";
        this.model.donombre = this.usuariofrom.controls['nombre'].value.toString().toUpperCase();
        this.model.doapellido = this.usuariofrom.controls['apellido'].value.toString().toUpperCase();
        this.model.docorreo = this.usuariofrom.controls['correo'].value;
        this.model.doestado = this.usuariofrom.controls['estado'].value;
        this.model.dodireccion = this.usuariofrom.controls['direccion'].value;
        this.model.dotelefono = this.usuariofrom.controls['telefono'].value;
        this.model.dofoto = this.usuariofrom.controls['imagen'].value;
        this.mantenimientoService.insertDocente(this.model).subscribe(data => {
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
        this.model.cocodigo = globales.cia;
        this.model.docodigo = this.usuariofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.donombre = this.usuariofrom.controls['nombre'].value.toString().toUpperCase();
        this.model.doapellido = this.usuariofrom.controls['apellido'].value.toString().toUpperCase();
        this.model.docorreo = this.usuariofrom.controls['correo'].value;
        this.model.doestado = this.usuariofrom.controls['estado'].value;
        this.model.dodireccion = this.usuariofrom.controls['direccion'].value;
        this.model.dotelefono = this.usuariofrom.controls['telefono'].value;
        this.model.dofoto = this.usuariofrom.controls['imagen'].value;


        this.mantenimientoService.updateDocente(this.model).subscribe(data => {
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
    seteaDocente(data: any) {



        this.usuariofrom.controls['codigo'].setValue(data.do_codigo);
        this.usuariofrom.controls['nombre'].setValue(data.do_nombre);
        this.usuariofrom.controls['apellido'].setValue(data.do_apellido);
        this.usuariofrom.controls['estado'].setValue(data.do_estado);
        this.usuariofrom.controls['telefono'].setValue(data.do_telefono);
        this.usuariofrom.controls['correo'].setValue(data.do_correo);
        this.usuariofrom.controls['direccion'].setValue(data.do_direccion);
        this.usuariofrom.controls['imagen'].setValue(data.do_foto);
        this.imagen = data.do_foto;
        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarcliente() {
        this.usuariofrom.controls['codigo'].setValue("");
        this.usuariofrom.controls['nombre'].setValue("");
        this.usuariofrom.controls['apellido'].setValue("");
        this.usuariofrom.controls['estado'].setValue("");
        this.usuariofrom.controls['telefono'].setValue("");
        this.usuariofrom.controls['correo'].setValue("");
        this.usuariofrom.controls['direccion'].setValue("");
        this.usuariofrom.controls['imagen'].setValue("");
        this.imagen = "";
        this.submitted = false;
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaDocente();
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
    cierreDocente(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaDocente(JSON.parse(event))
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
    /**
  * DEFINICION DE FUNCION DE VALIDACION DE CONTROL DE FROM 
  */
    get f(): { [key: string]: AbstractControl } {
        return this.usuariofrom.controls;
    }
}
