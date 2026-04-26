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
    templateUrl: './periodo.component.html',
    styleUrls: ['./periodo.component.scss']
})
export class PeriodoComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedamateria') modalbusquedamateria: any;
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
    listPeriodo: any[] = [];
    listClase: any[] = [];
    listAniElectivo: any[] = [];
    iAccion: string = "";

    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listmateria: any[] = [];

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    paisfrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        codigo: new FormControl(''),
        descripcion: new FormControl(''),
        valormatricula: new FormControl(''),
        valorpension: new FormControl(''),
        tipoperiodo: new FormControl(''),
        tipohorario: new FormControl(''),
        duracionrecreo: new FormControl(''),
        duracionhoraclase: new FormControl(''),
        anioelectivo: new FormControl(''),
        inicioperiodo: new FormControl(''),
        finperiodo: new FormControl(''),
        horainicio: new FormControl(''),
        horafin: new FormControl(''),
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
    cargaNivel() {
        this.spinner.show();
        this.mantenimientoService.manPeriodo(globales.cia).subscribe(data => {
            try {
                this.listmateria = data.root[0];
                this.openModal(this.modalbusquedamateria);
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
                this.paisfrom.controls['codigo'].disable();
                this.paisfrom.controls['descripcion'].disable();
                this.paisfrom.controls['estado'].disable();
                this.paisfrom.controls['valormatricula'].disable();
                this.paisfrom.controls['valorpension'].disable();
                this.paisfrom.controls['tipoperiodo'].disable();
                this.paisfrom.controls['tipohorario'].disable();
                this.paisfrom.controls['anioelectivo'].disable();
                this.paisfrom.controls['duracionrecreo'].disable();
                this.paisfrom.controls['duracionhoraclase'].disable();
                this.paisfrom.controls['inicioperiodo'].disable();
                this.paisfrom.controls['finperiodo'].disable();
                this.paisfrom.controls['horainicio'].disable();
                this.paisfrom.controls['horafin'].disable();
                break;
            case 2:
                this.iAccion = "I";
                this.paisfrom.controls['tipo'].setValue("I");
                this.paisfrom.controls['codigo'].enable();
                this.paisfrom.controls['descripcion'].enable();
                this.paisfrom.controls['estado'].setValue("A");
                this.paisfrom.controls['valormatricula'].enable();
                this.paisfrom.controls['valorpension'].enable();
                this.paisfrom.controls['tipoperiodo'].enable();
                this.paisfrom.controls['tipohorario'].enable();
                this.paisfrom.controls['anioelectivo'].enable();
                this.paisfrom.controls['inicioperiodo'].enable();
                this.paisfrom.controls['finperiodo'].enable();
                this.paisfrom.controls['duracionrecreo'].enable();
                this.paisfrom.controls['duracionhoraclase'].enable();
                this.paisfrom.controls['horainicio'].enable();
                this.paisfrom.controls['horafin'].enable();
                break;
            case 3:
                this.iAccion = "M";
                this.paisfrom.controls['tipo'].setValue("M");
                this.paisfrom.controls['codigo'].disable();
                this.paisfrom.controls['descripcion'].enable();
                this.paisfrom.controls['estado'].enable();
                this.paisfrom.controls['valormatricula'].enable();
                this.paisfrom.controls['valorpension'].enable();
                this.paisfrom.controls['tipoperiodo'].enable();
                this.paisfrom.controls['tipohorario'].enable();
                this.paisfrom.controls['anioelectivo'].enable();
                this.paisfrom.controls['duracionrecreo'].enable();
                this.paisfrom.controls['inicioperiodo'].disable();
                this.paisfrom.controls['finperiodo'].disable();
                this.paisfrom.controls['horainicio'].disable();
                this.paisfrom.controls['horafin'].disable();
                this.paisfrom.controls['duracionhoraclase'].enable();
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
            if (!Funcion.ValidadPagina('Periodo')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listEstado = Funcion.Estado();
        this.listPeriodo = Funcion.TipoPeriodo();
        this.listClase = Funcion.TipoCalses();
        this.listAniElectivo = Funcion.AnioElectivo();
        this.notifier = this.injector.get(ServiceMensaje);
        this.habilitarfrom(1);
    }

    /**
  * DEFINICION DE FUNCION PARA BORRAR VENDEDOR
  */
    deletepais() {
        this.spinner.show();
        this.model.pecodigo = this.paisfrom.controls['codigo'].value.toString().toUpperCase();
        this.model.peestado = "D";
        this.mantenimientoService.deletePeriodo(this.model).subscribe(data => {
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
    insertpais() {
        this.spinner.show();
        this.model.pecodigo = this.paisfrom.controls['codigo'].value.toString().toUpperCase();
        this.model.penombre = this.paisfrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.peestado = this.paisfrom.controls['estado'].value.toString().toUpperCase();
        this.model.pevalormatricula = this.paisfrom.controls['valormatricula'].value.toString().toUpperCase();
        this.model.pevalorpension = this.paisfrom.controls['valorpension'].value.toString().toUpperCase();
        this.model.petipoperiodo = this.paisfrom.controls['tipoperiodo'].value.toString().toUpperCase();
        this.model.petipohorario = this.paisfrom.controls['tipohorario'].value.toString().toUpperCase();
        this.model.peduracionrecreo = this.paisfrom.controls['duracionrecreo'].value.toString().toUpperCase();
        this.model.peduracionhoraclase = this.paisfrom.controls['duracionhoraclase'].value.toString().toUpperCase();
        this.model.petipoanioelectivo = this.paisfrom.controls['anioelectivo'].value.toString().toUpperCase();
        this.model.peinicioperiodo = this.paisfrom.controls['inicioperiodo'].value.toString().toUpperCase();
        this.model.pefinperiodo = this.paisfrom.controls['finperiodo'].value.toString().toUpperCase();
        this.model.pehorainicio = this.paisfrom.controls['horainicio'].value.toString().toUpperCase();
        this.model.pehorafinal = this.paisfrom.controls['horafin'].value.toString().toUpperCase();


        this.mantenimientoService.insertPeriodo(this.model).subscribe(data => {
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
    updatepais() {
        this.spinner.show();
        this.model.pecodigo = this.paisfrom.controls['codigo'].value.toString().toUpperCase();
        this.model.penombre = this.paisfrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.peestado = this.paisfrom.controls['estado'].value.toString().toUpperCase();
        this.model.pevalormatricula = this.paisfrom.controls['valormatricula'].value.toString().toUpperCase();
        this.model.pevalorpension = this.paisfrom.controls['valorpension'].value.toString().toUpperCase();
        this.model.petipoperiodo = this.paisfrom.controls['tipoperiodo'].value.toString().toUpperCase();
        this.model.petipohorario = this.paisfrom.controls['tipohorario'].value.toString().toUpperCase();
        this.model.peduracionrecreo = this.paisfrom.controls['duracionrecreo'].value.toString().toUpperCase();
        this.model.peduracionhoraclase = this.paisfrom.controls['duracionhoraclase'].value.toString().toUpperCase();
        this.model.petipoanioelectivo = this.paisfrom.controls['anioelectivo'].value.toString().toUpperCase();
        this.model.peinicioperiodo = this.paisfrom.controls['inicioperiodo'].value.toString().toUpperCase();
        this.model.pefinperiodo = this.paisfrom.controls['finperiodo'].value.toString().toUpperCase();
        this.model.pehorainicio = this.paisfrom.controls['horainicio'].value.toString().toUpperCase();
        this.model.pehorafinal = this.paisfrom.controls['horafin'].value.toString().toUpperCase();


        this.mantenimientoService.updatePeriodo(this.model).subscribe(data => {
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
    validar() {

        if (this.paisfrom.controls['tipohorario'].value.toString() === "") {
            this.notifier.showSuccess("Debe seleccionar un tipo de Horario");
            return true;
        }
        if (this.paisfrom.controls['tipoperiodo'].value.toString() === "") {
            this.notifier.showSuccess("Debe seleccionar un tipo de Periodo");
            return true;
        }
        if (this.paisfrom.controls['anioelectivo'].value.toString() === "") {
            this.notifier.showSuccess("Debe seleccionar un tipo de Año Electivo");
            return true;
        }
        return false;
    }
    /**
  * DEFINICION DE FUNCION PARA GUARDAR Y ACTUALIZAR VENDEDOR
  */
    guardarpais() {
        this.submitted = true;
        if (this.paisfrom.invalid) {
            return;
        } else {
            if (this.validar()) {
                return;
            } else {
                if (this.paisfrom.controls['tipo'].value === "I") {
                    this.insertpais();
                } else {
                    this.updatepais();
                }
            }

        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaNivel(data: any) {
        this.paisfrom.controls['codigo'].setValue(data.pe_codigo);
        this.paisfrom.controls['descripcion'].setValue(data.pe_nombre);
        this.paisfrom.controls['estado'].setValue(data.pe_estado);
        this.paisfrom.controls['valormatricula'].setValue(data.pe_valormatricula);
        this.paisfrom.controls['valorpension'].setValue(data.pe_valorpension);
        this.paisfrom.controls['tipoperiodo'].setValue(data.pe_tipoperiodo);
        this.paisfrom.controls['tipohorario'].setValue(data.pe_tipohorario);
        this.paisfrom.controls['duracionrecreo'].setValue(data.pe_duracionrecreo);
        this.paisfrom.controls['duracionhoraclase'].setValue(data.pe_duracionhoraclase);
        this.paisfrom.controls['anioelectivo'].setValue(data.pe_tipoanioelectivo);
        this.paisfrom.controls['inicioperiodo'].setValue(Funcion.FormatoFecha(data.pe_inicioperiodo));
        this.paisfrom.controls['finperiodo'].setValue(Funcion.FormatoFecha(data.pe_finperiodo));
        this.paisfrom.controls['horainicio'].setValue(data.pe_horainicio);
        this.paisfrom.controls['horafin'].setValue(data.pe_horafinal);
        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarpais() {

        this.paisfrom.controls['codigo'].setValue("");
        this.paisfrom.controls['descripcion'].setValue("");
        this.paisfrom.controls['estado'].setValue("");
        this.paisfrom.controls['valormatricula'].setValue("");
        this.paisfrom.controls['valorpension'].setValue("");
        this.paisfrom.controls['tipoperiodo'].setValue("");
        this.paisfrom.controls['tipohorario'].setValue("");
        this.paisfrom.controls['duracionrecreo'].setValue("");
        this.paisfrom.controls['duracionhoraclase'].setValue("");
        this.paisfrom.controls['anioelectivo'].setValue("");
        this.paisfrom.controls['inicioperiodo'].setValue("");
        this.paisfrom.controls['finperiodo'].setValue("");
        this.paisfrom.controls['horainicio'].setValue("");
        this.paisfrom.controls['horafin'].setValue("");

        this.submitted = false;
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaNivel();
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
    cierreMateria(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaNivel(JSON.parse(event))
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
        return this.paisfrom.controls;
    }
}
