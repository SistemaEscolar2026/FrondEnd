import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Funcion } from '@funciones/funciones';
import { MantenimientoService } from '@services/mantenimiento-service';
import { NgxSpinnerService } from "ngx-spinner";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BotonesModel } from '@modelo/botones-model';
import { globales, environment } from 'src/environments/environment';
import { FuncionesService } from '@services/funciones-service';
import { ServiceMensaje } from '@services/config/ServiceMensaje';
import { AsyncSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE 
*/
export interface SelectedFiles {
    /**
  * DEFINICION DE VARIABLE DE NOMBRE
  */
    name: string;
    /**
  * DEFINICION DE VARIABLE DE ARCHIVO
  */
    file: any;
    /**
  * DEFINICION DE VARIABLE DE ARCHIVO EN BASE64
  */
    base64?: string;
}
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './empleadosconfig.component.html',
    styleUrls: ['./empleadosconfig.component.scss']
})
export class EmpleadosConfigComponent implements OnInit {
    /**
  * @ignore
  */
    fileToUpload?: File;
    /**
  * @ignore
  */
    selectedFiles: SelectedFiles[] = [];
    /**
  * @ignore
  */
    blanco: string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAzMAAAHMCAIAAABukmEEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAguSURBVHhe7dYxAQAADMOg+Tfd2cgBKrgBANBgZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAAFWYGAFBhZgAADdsDLQyux3VMIggAAAAASUVORK5CYII="
    /**
  * @ignore
  */
    imagen?: string = this.blanco;
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedaitem') modalbusquedaitem: any;
    @ViewChild('modalbusquedaempleado') modalbusquedaempleado: any;
    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    modalRef: any;
    indextab: number = 0;
    /**
  * DEFINICION DE VARIABLE DE FECHA SERVIDOR
  */
    fechaservidor: string = "";
    /**
  * DEFINICION DE VARIABLE DE CONTROL DE ACCION SUBMIT DE PAGINA
  */
    submitted = false;
    /**
   * DEFINICION DE VARIABLE DE RUTA LA CUAL NOS PERMITA REDIRECCIONAR A OTRA PAGINA
   */
    router: Router;
    ban: number = 0;
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
    ColumnaDetalle: any[] = ['Medida', 'Base', 'Factor'];
    /**
  * DEFINICION DE VARIABLE DE LLOMAR MODAL 
  */
    llamarmodal: string = "";
    /**
  * DEFINICION DE VARIABLE DE LISTADO DE CONTROL
  */
    listControl: any[] = [];
    /**
  * @ignore
  */
    datoscla: string = "2702202401099299703600110010020000000151234567815";
    /**
  * @ignore
  */
    selectedlineagrid: string = "";
    selectedlineagridest: string = "";
    selectedlineagriddep: string = "";
    /**
  * @ignore
  */
    iEmpleado: any = {};
    /**
  * @ignore
  */
    items: any[] = [];
    /**
  * DEFINICION DE VARIABLE DE LISTADO DE GRUPO
  */
    listtipoidentificacion: any[] = [];
    listtipocontrato: any[] = [];
    listtipogenero: any[] = [];
    listtipoestadocivil: any[] = [];
    listtipodiscapacidad: any[] = [];
    listtipocontratodefinitivo: any[] = [];
    listtipotrabajo: any[] = [];

    listtipopais: any[] = [];
    listtipoprovincia: any[] = [];
    listtipocanton: any[] = [];
    listtipocantoncon: any[] = [];
    listtiponacionalidad: any[] = [];
    listtipovivienda: any[] = [];
    listsucursal: any[] = [];
    listtipoempleado: any[] = [];
    listcentrocosto: any[] = [];
    listtipocargo: any[] = [];
    listtiporol: any[] = [];
    listtipobanco: any[] = [];
    listnivelacademico: any[] = [];
    listtipocuenta: any[] = [];
    listtipoprofesion: any[] = [];
    listtipoturno: any[] = [];
    listplancuenta: any[] = [];
    listtipoauxiliar: any[] = [];
    listtipodocumento: any[] = [];
    listtipo: any = [];
    listnivel: any = [];
    listollevodisca: any = [];
    listipodependencia: any = [];
    listadoempleado: any = [];
    /**
  * DEFINICION DE VARIABLE DE MENSAJE DE PAGINA
  */
    mensaje: string = "";

    /**
  * @ignore
  */
    isAccion: string = "";
    alto: string = "";
    /**
  * DEFINICION DE VARIABLE PARA HABILITA COMPONETENTE DEL FROM
  */
    habilitaobjetofrom: boolean = true;
    /**
  * DEFINICION DE VARIABLE PARA HABILITA COMPONETENTE DEL BUSQUEDA
  */
    habilitaobjetobuscar: boolean = true;
    /**
  * DEFINICION DE FUNCION INIT DE LA CLASE
  */
    ngOnInit() {
        this.limpiabotones(1);
        this.listtipogenero = Funcion.TipoGenero();
        this.listtipoestadocivil = Funcion.TipoEstadoCivil();
        this.listtipotrabajo = Funcion.Propio();
        this.listtipovivienda = Funcion.Vivienda();
        this.listtipo = Funcion.TipoEducacion();
        this.listollevodisca = Funcion.Propio();
        this.listtipoidentificacion = Funcion.TipoIdentificacion();
        this.listtipodiscapacidad = Funcion.Discapacida();
        this.listtipocontrato = Funcion.TipoContrato();
        this.listtipocontratodefinitivo = Funcion.TipoContrato();
        this.listtiponacionalidad = Funcion.Nacionalidad();

        this.cargatipopais();
        this.limpiaritem();

    }
    
    cargaEmpleado() {
        this.spinner.show();
        this.mantenimientoService.manConfigEmpleado(globales.cia).subscribe(data => {
            try {
                this.spinner.hide();
                this.listadoempleado = data.root[0];
                this.openModal(this.modalbusquedaempleado);
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }


    cierreEmpleado(event: any) {
        if (event != "") {
           this.cierreModal(true);
            //codigo
            var _dato: any = JSON.parse(event);
            this.cargaempleadoselect(_dato);
        }
    }
    cargaempleadoselect(codigo: any) {
     

        if (this.ban === 1) {
            this.iEmpleado = codigo;
        
            this.limpiabotones(3);
        } else {
            this.iEmpleado.empsec = codigo.empsec;
            this.iEmpleado.empcodigo = codigo.empcodigo;
            this.iEmpleado.empnombres = codigo.empnombres;
            this.iEmpleado.empapellidopaterno = codigo.empapellidopaterno;
            this.iEmpleado.empapellidomaterno = codigo.empapellidomaterno;
        }

    }


    codempleado() {
        this.iEmpleado.empcodigo = (this.iEmpleado.empcodigolegal.length > 10) ? this.iEmpleado.empcodigolegal.substr(0, 10) : this.iEmpleado.empcodigolegal;
    }


    selectplan() {
        let _idx = this.listplancuenta.findIndex(key => key.planctacodigo === this.iEmpleado.planctacodigo);
        this.iEmpleado.tpauxcodigo = this.listplancuenta[_idx].tpauxcodigo;
    }



    cargatipopais() {
        this.spinner.show();
        this.mantenimientoService.manPais(globales.cia).subscribe(data => {
            try {
                this.listtipopais = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }



    /**
  * @ignore
  */
    private convertBase64ToBlob(Base64Image: any) {
        // SPLIT INTO TWO PARTS
        const parts = Base64Image.split(';base64,');
        // HOLD THE CONTENT TYPE
        const imageType = parts[0].split(':')[1];
        // DECODE BASE64 STRING
        const decodedData = window.atob(parts[1]);
        // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
        const uInt8Array = new Uint8Array(decodedData.length);
        // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
        for (let i = 0; i < decodedData.length; ++i) {
            uInt8Array[i] = decodedData.charCodeAt(i);
        }
        // RETURN BLOB IMAGE AFTER CONVERSION
        return new Blob([uInt8Array], { type: imageType });
    }
    tabevent(numero: any) {
        this.indextab = numero.index;
    }
    /**
   * DEFINICION PARA HABILITAR EL FROM
   */
    habilitarfrom(val: Number) {
        switch (val) {
            case 1:
                this.limpiaritem();
                this.items = [];
                this.habilitaobjetofrom = true;
                this.habilitaobjetobuscar = true;
                break;
            case 2:
                this.isAccion = "I";
                this.limpiaritem();
                this.habilitaobjetofrom = false;
                this.habilitaobjetobuscar = false;
                break;
            case 3:
                this.isAccion = "M";
                this.habilitaobjetobuscar = true;
                this.habilitaobjetofrom = false;

                break;
        }
    }
    /**
  * @ignore
  */
    limpiarColordep() {
        for (var i = 0; i < this.iEmpleado.empleadodependencias.length; i++) {
            this.iEmpleado.empleadodependencias[i].color = "";
        }
    }
    limpiarColor() {
        for (var i = 0; i < this.iEmpleado.empleadodocumentos.length; i++) {
            this.iEmpleado.empleadodocumentos[i].color = "";
        }
    }
    limpiarColorest() {
        for (var i = 0; i < this.iEmpleado.empleadoestudios.length; i++) {
            this.iEmpleado.empleadoestudios[i].color = "";
        }
    }
    /**
  * @ignore
  */
    clickGriddep(row: any) {
        this.limpiarColordep();
        this.selectedlineagriddep = row.edelinea
        row.color = "SG";
    }
    clickGrid(row: any) {
        this.limpiarColor();
        this.selectedlineagrid = row.sec
        row.color = "SG";
    }

    clickGridest(row: any) {
        this.limpiarColorest();
        this.selectedlineagridest = row.eeslinea
        row.color = "SG";
    }
    /**
  * DEFINICION DE FUNCION DE ELIMINAR LINEA EN GRID
  */
    borrarlinea() {
        let i = this.iEmpleado.empleadodocumentos.findIndex((key: any) => key.sec === this.selectedlineagrid);
        this.iEmpleado.empleadodocumentos.splice(i, 1);
    }
    borrarlineaestudio() {
        let i = this.iEmpleado.empleadoestudios.findIndex((key: any) => key.eeslinea === this.selectedlineagridest);
        this.iEmpleado.empleadoestudios.splice(i, 1);
    }
    borrarlineadep() {
        let i = this.iEmpleado.empleadodependencias.findIndex((key: any) => key.edelinea === this.selectedlineagriddep);
        this.iEmpleado.empleadodependencias.splice(i, 1);
    }
 
    /**
  * DEFINICION DE FUNCION DE DOBLE CLICK EN LINEA DE GRID
  */
    dblclickGrid(row: any) {
        this.limpiarColor();
        row.color = "SG";
        this.selectedlineagrid = row.sec;
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
    constructor(private sanitizer: DomSanitizer, private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private funcionesService: FuncionesService, private fb: FormBuilder, private mantenimientoService: MantenimientoService, private injector: Injector) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Ingreso Empleado')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.notifier = this.injector.get(ServiceMensaje);
        // this.fechaservidor = moment(this.funcionesService.fechaservidorNO()).format("YYYY-MM-DD").toString();
        this.habilitarfrom(1);
        // this.cargagrupo();
        this.alto = Funcion.pantalla();
    }

    /**
  * DEFINICION DE FUNCION PARA CARGAR EVENTO DE CARGA ARCHIVO 
  */
    handleFileInput(event: any) {
        this.fileToUpload = event.target.files[0] ?? null;
        this.selectedFiles = [];
        this.toFilesBase64(event.target.files, this.selectedFiles).subscribe((res: SelectedFiles[]) => {
            this.selectedFiles = res;
            this.iEmpleado.empfoto = this.selectedFiles[0].base64;
            this.imagen = this.selectedFiles[0].base64;
        });

    }
    /**
  * DEFINICION DE FUNCION PARA DEVOLVER ARRAY ARCHIVO EN BASE 64
  */
    toFilesBase64(files: File[], selectedFiles: SelectedFiles[]): Observable<SelectedFiles[]> {
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
  * @ignore
  */
    aceptarOk(event: boolean) {
        if (event) {
            this.limpiabotones(1);
            this.limpiaritem();
            this.habilitarfrom(1);
        }
    }
    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE ITEM
  */
    limpiaritem() {
        this.imagen = this.blanco;
        this.submitted = false;
        this.iEmpleado.cocodigo = globales.cia;
        this.iEmpleado.empcodigo = "";
        this.iEmpleado.empnombres = "";
        this.iEmpleado.empapellidopaterno = "";
        this.iEmpleado.empapellidomaterno = "";
        this.iEmpleado.confsalario = "";
        this.iEmpleado.confiess = false;
        this.iEmpleado.confalimentacion = "N";
        this.iEmpleado.confmovilizacion = "N";

        this.iEmpleado.confdecicmo13 = false;
        this.iEmpleado.confdecicmo13_pago = "";

        this.iEmpleado.confdecicmo14 = false;
        this.iEmpleado.confdecicmo14_pago = "";

        this.iEmpleado.conffondoreserva = false;
        this.iEmpleado.conffondoreserva_pago = "";

        this.iEmpleado.confquincena = true;

        this.iEmpleado.confpestado = "A";

        
    }
    /**
  * DEFINICION DE FUNCION PARA BORRAR GRUPO
  */
    deleteempleado() {
        this.iEmpleado.confpestado = 'I';
        this.spinner.show();
        this.mantenimientoService.deleteConfigEmpleados( this.iEmpleado).subscribe(data => {
            try {
                let isMensajeS = data.msgError;
                this.modalmensaje("3", isMensajeS);
                this.limpiabotones(1);
                this.limpiaritem();
                this.habilitarfrom(1);
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
  * DEFINICION DE FUNCION PARA INSERTAR UN EMPLEADO
  */
    insertempleado() {
        this.spinner.show();
        this.iEmpleado.cocodigo = globales.cia;
        this.mantenimientoService.insertConfigEmpleados(this.iEmpleado).subscribe(data => {
            try {
                this.spinner.hide();
                let isMensajeS = data.msgError;
                this.modalmensaje("3", isMensajeS);
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.notifier.showError(err.error.Message);
            this.spinner.hide();
        });
    }
    /**
  * DEFINICION DE FUNCION PARA ACTUALIZAR UN EMPLEADO
  */
    updateempleado() {
        this.spinner.show();
        this.mantenimientoService.updateConfigEmpleados(this.iEmpleado).subscribe(data => {
            try {
                this.spinner.hide();
                let isMensajeS = data.msgError;
                this.modalmensaje("3", isMensajeS);
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.notifier.showError(err.error.Message);
            this.spinner.hide();
        });
    }

    /**
  * DEFINICION DE FUNCION PARA GUARDAR Y ACTUALIZAR GRUPO
  */
    valida() {
        if (this.iEmpleado.empnombres === "" || this.iEmpleado.empnombres === undefined) {
            this.mensaje = "No ha Seleccionado ningun empleado...";
            return false;
        }
       

        if (this.iEmpleado.confsalario === "" || this.iEmpleado.confsalario === undefined) {
            this.mensaje = "Debe ingresar un salario...";
            return false;
        }


        return true;
    }
    /**
  * DEFINICION DE FUNCION PARA GUARDAR GRUPO
  */
    guardarempleado() {
        this.submitted = true;
        if (!this.valida()) {
            this.modalmensaje("1", this.mensaje);
        } else {


            if (this.isAccion === "I") {
                this.iEmpleado.ciacodigo = globales.cia;
                this.iEmpleado.empusuario = Funcion.ReturnUsuario().us_codigo;
                this.iEmpleado.empfechasistema = this.fechaservidor;

            } else {
                this.iEmpleado.empusuarioultmodif = Funcion.ReturnUsuario().us_codigo;
                this.iEmpleado.empfecultmodif = this.fechaservidor;
            }
          

            if (this.isAccion === "I") {
                this.insertempleado();
            } else {
                this.updateempleado();
            }
        }
    }


    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar(ban: number) {
        this.ban = ban;
        this.cargaEmpleado();
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
    cierreModal(event: boolean) {
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
  * DEFINICION DE FUNCION MENSAJE DE MODALES
  */
    modalmensaje(tipo: string, mensaje: string) {
        this.llamarmodal = tipo + "|Configuracion Empleado|" + mensaje + "|" + Funcion.Ramdon().toString();
    }
}
