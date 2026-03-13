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
import * as moment from 'moment';
import { ArchivosModel } from '@modelo/archivo-model';
import { AsyncSubject, Observable, ReplaySubject } from 'rxjs';
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
export interface SelectedFiles {
    name: string;
    file: any;
    base64?: string;
}
@Component({
    templateUrl: './contrato.component.html',
    styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit {
    fileToUpload?: File;
    public selectedFiles: SelectedFiles[] = [];
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedacontrato') modalbusquedacontrato: any;
    @ViewChild('modalbusquedacliente') modalbusquedacliente: any;
    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    habilitabotones: boolean = false;
    modalRef: any;
    habilita: boolean = false;
    ColumnaDetalle: any[] = ['Descripcion', 'Nombre Archivo', ' '];
    /**
  * DEFINICION DE VARIABLE DE CONTROL DE ACCION SUBMIT DE PAGINA
  */
    submitted = false;
    iAccion: string = "";
    /**
   * DEFINICION DE VARIABLE DE RUTA LA CUAL NOS PERMITA REDIRECCIONAR A OTRA PAGINA
   */
    router: Router;
    selectedlineagrid: string = "";
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
    detallearchivo: any[] = [];

    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listcontrato: any[] = [];

    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listcliente: any[] = [];

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    contratofrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        codigo: new FormControl(''),
        descripcion: new FormControl(''),
        valor: new FormControl(''),
        fechaini: new FormControl(''),
        fechafin: new FormControl(''),
        clcodigo: new FormControl(''),
        clnombre: new FormControl(''),
        admcontrato: new FormControl(''),
        valorutilizado: new FormControl(''),
        valorfaltante: new FormControl(''),
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
    cargaCliente() {
        this.spinner.show();
        this.mantenimientoService.manCliente(globales.cia).subscribe(data => {
            try {
                this.listcliente = data.root[0];
                this.openModal(this.modalbusquedacliente);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }

    cargaContrato() {
        this.spinner.show();
        this.mantenimientoService.manContraro(globales.cia).subscribe(data => {
            try {
                this.listcontrato = data.root[0];
                var _detalle = [];
                _detalle = data.root[1];
                for (var i = 0; i < this.listcontrato.length; i++) {
                    this.listcontrato[i].detalle = [];
                    this.listcontrato[i].detalle = _detalle.filter((key: any) => {
                        return key.ct_codigo === this.listcontrato[i].ct_codigo
                    });
                }


                this.openModal(this.modalbusquedacontrato);
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
                this.contratofrom.controls['codigo'].disable();
                this.contratofrom.controls['descripcion'].disable();
                this.contratofrom.controls['valor'].disable();
                this.contratofrom.controls['fechaini'].disable();
                this.contratofrom.controls['fechafin'].disable();
                this.contratofrom.controls['estado'].disable();
                this.contratofrom.controls['clcodigo'].disable();
                this.contratofrom.controls['clnombre'].disable();
                this.contratofrom.controls['admcontrato'].disable();
                this.contratofrom.controls['valorutilizado'].disable();
                this.contratofrom.controls['valorfaltante'].disable();
                this.habilita = true;
                break;
            case 2:
                this.iAccion = "I";
                var fecha = new Date();
                var formatoFecha = moment(fecha);
                this.habilitabotones = false;
                this.contratofrom.controls['tipo'].setValue("I");
                this.contratofrom.controls['codigo'].enable();
                this.contratofrom.controls['descripcion'].enable();
                this.contratofrom.controls['valor'].enable();
                this.contratofrom.controls['fechaini'].setValue(formatoFecha.format("YYYY-MM-DD").toString());
                this.contratofrom.controls['fechaini'].enable();
                this.contratofrom.controls['fechafin'].setValue(formatoFecha.format("YYYY-MM-DD").toString());
                this.contratofrom.controls['fechafin'].enable();
                this.contratofrom.controls['clcodigo'].disable();
                this.contratofrom.controls['clnombre'].disable();
                this.contratofrom.controls['admcontrato'].enable();
                this.contratofrom.controls['valorutilizado'].disable();
                this.contratofrom.controls['valorfaltante'].disable();
                this.contratofrom.controls['estado'].setValue("A");
                this.contratofrom.controls['estado'].enable();
                this.habilita = false;
                break;
            case 3:
                this.iAccion = "M";
                this.contratofrom.controls['tipo'].setValue("M");
                this.contratofrom.controls['codigo'].disable();
                this.contratofrom.controls['descripcion'].enable();
                this.contratofrom.controls['valor'].enable();
                this.contratofrom.controls['fechaini'].enable();
                this.contratofrom.controls['fechafin'].enable();
                this.contratofrom.controls['estado'].enable();
                this.contratofrom.controls['clcodigo'].disable();
                this.contratofrom.controls['clnombre'].disable();
                this.contratofrom.controls['admcontrato'].enable();
                this.contratofrom.controls['valorutilizado'].disable();
                this.contratofrom.controls['valorfaltante'].disable();
                this.habilita = false;
                this.habilitabotones = false;
                break;
        }
    }
    limpiarColor() {
        for (var i = 0; i < this.detallearchivo.length; i++) {
            this.detallearchivo[i].color = "";
        }
    }
    /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
    clickGrid(row: any) {
        this.limpiarColor();
        row.color = "SG";
        this.selectedlineagrid = row.linea
    }
    handleFileInput(event: any, row: ArchivosModel) {
        this.fileToUpload = event.target.files[0] ?? null;
        row.nombrearchivo = this.fileToUpload?.name;
        this.selectedFiles = [];
        this.toFilesBase64(event.target.files, this.selectedFiles).subscribe((res: SelectedFiles[]) => {
            this.selectedFiles = res;
            row.archivo = this.selectedFiles[0].base64;
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
* DEFINICION DE FUNCION QUE AGREGA UNA LINEA EN DETALLE DE PEDIDO
*/
    agregarlinea() {
        var linea = new ArchivosModel();
        linea.linea = this.detallearchivo.length + 1;
        this.detallearchivo.push(linea);
        this.selectedlineagrid = "";
    }
    /**
  * DEFINICION DE FUNCION QUE BORRA UNA LINEA EN EL DETALLE DE PEDIDO
  */
    borrarlinea() {
        for (var i = 0; i < this.detallearchivo.length; i++) {
            if (this.detallearchivo[i].linea === this.selectedlineagrid) {
                this.detallearchivo.splice(i, 1);
                this.selectedlineagrid = "";
                break;
            }
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
            if (!Funcion.ValidadPagina('Ingreso de Contrato')) {
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
    deletecontrato() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.ctcodigo = this.contratofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.ctestado = "D";
        this.mantenimientoService.deleteContrato(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarcontrato();
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
    insertcontrato() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.ctcodigo = this.contratofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.ctdescripcion = this.contratofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.ctvalor = this.contratofrom.controls['valor'].value.toString().toUpperCase();
        this.model.ctestado = this.contratofrom.controls['estado'].value.toString().toUpperCase();
        this.model.clcodigo = this.contratofrom.controls['clcodigo'].value;
        this.model.admcontrato = this.contratofrom.controls['admcontrato'].value;
        this.model.fechaini = this.contratofrom.controls['fechaini'].value;
        this.model.fechafin = this.contratofrom.controls['fechafin'].value;
        this.model.valorutilizado = this.contratofrom.controls['valorutilizado'].value;
        this.model.valorfaltante = this.contratofrom.controls['valorfaltante'].value;


        this.mantenimientoService.insertContrato(this.model, this.detallearchivo).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarcontrato();
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
    updatecontrato() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.ctcodigo = this.contratofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.ctdescripcion = this.contratofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.ctvalor = this.contratofrom.controls['valor'].value.toString().toUpperCase();
        this.model.ctestado = this.contratofrom.controls['estado'].value.toString().toUpperCase();
        this.model.clcodigo = this.contratofrom.controls['clcodigo'].value;
        this.model.admcontrato = this.contratofrom.controls['admcontrato'].value;
        this.model.fechaini = this.contratofrom.controls['fechaini'].value;
        this.model.fechafin = this.contratofrom.controls['fechafin'].value;
        this.model.valorutilizado = this.contratofrom.controls['valorutilizado'].value;
        this.model.valorfaltante = this.contratofrom.controls['valorfaltante'].value;

  

        this.mantenimientoService.updateContrato(this.model, this.detallearchivo).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarcontrato();
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
    guardarcontrato() {
        this.submitted = true;
        if (this.contratofrom.invalid) {
            return;
        } else {
            if (this.contratofrom.controls['clnombre'].value === "") {
                this.notifier.showSuccess("Cliente es Requerido", "");
            } else {

                var fechaini = new Date(this.contratofrom.controls['fechaini'].value);
                var fechafin = new Date(this.contratofrom.controls['fechafin'].value);


                if (fechaini > fechafin) {
                    this.notifier.showSuccess("La Fecha inicial del contrato no puede ser mayor a la Fecha Final", "");
                } else
                    if (this.contratofrom.controls['tipo'].value === "I") {
                        this.insertcontrato();
                    } else {
                        this.updatecontrato();
                    }
            }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaContrato(data: any) {

        var formatoFechaIni = moment(data.ct_fecha_ini);
        var formatoFechaFin = moment(data.ct_fecha_fin);

        this.contratofrom.controls['codigo'].setValue(data.ct_codigo);
        this.contratofrom.controls['descripcion'].setValue(data.ct_descripcion);
        this.contratofrom.controls['valor'].setValue(data.ct_valor);
        this.contratofrom.controls['fechaini'].setValue(formatoFechaIni.format("YYYY-MM-DD").toString());
        this.contratofrom.controls['fechafin'].setValue(formatoFechaFin.format("YYYY-MM-DD").toString());
        this.contratofrom.controls['clcodigo'].setValue(data.cl_codigo);
        this.contratofrom.controls['clnombre'].setValue(data.cl_nombre);
        this.contratofrom.controls['admcontrato'].setValue(data.ct_administrador_contrato);
        this.contratofrom.controls['valorutilizado'].setValue(data.ct_valor_utilizado);
        this.contratofrom.controls['valorfaltante'].setValue(data.ct_valor_faltante);
        this.contratofrom.controls['estado'].setValue(data.ct_estado);

        this.detallearchivo = data.detalle;

       
        this.limpiabotones(3);
    }


    seteaCliente(data: any) {

        this.contratofrom.controls['clcodigo'].setValue(data.cl_codigo);
        this.contratofrom.controls['clnombre'].setValue(data.cl_nombre);

    }
    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarcontrato() {
        this.contratofrom.controls['codigo'].setValue("");
        this.contratofrom.controls['descripcion'].setValue("");
        this.contratofrom.controls['valor'].setValue("");
        this.contratofrom.controls['fechaini'].setValue("");
        this.contratofrom.controls['fechafin'].setValue("");
        this.contratofrom.controls['clcodigo'].setValue("");
        this.contratofrom.controls['clnombre'].setValue("");
        this.contratofrom.controls['admcontrato'].setValue("");
        this.contratofrom.controls['valorutilizado'].setValue("");
        this.contratofrom.controls['valorfaltante'].setValue("");
        this.contratofrom.controls['estado'].setValue("");
        this.detallearchivo = [];
        this.submitted = false;
        
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaContrato();
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
    cierreContrato(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaContrato(JSON.parse(event))
        }
    }
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
  * DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
  */
    cierreModalcontrato(event: any) {
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
        return this.contratofrom.controls;
    }
}
