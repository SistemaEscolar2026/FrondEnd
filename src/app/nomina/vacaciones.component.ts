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
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './vacaciones.component.html',
    styleUrls: ['./vacaciones.component.scss']
})
export class VacacionesComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedavacaciones') modalbusquedavacaciones: any;
    @ViewChild('modalbusquedaempleado') modalbusquedaempleado: any;
    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    modalRef: any;
    /**
  * DEFINICION DE VARIABLE DE CONTROL DE ACCION SUBMIT DE PAGINA
  */
    submitted = false;
    isAccion: string = "";
    llamarmodal: string = "";
    smensaje: string = "";
    /**
   * DEFINICION DE VARIABLE DE RUTA LA CUAL NOS PERMITA REDIRECCIONAR A OTRA PAGINA
   */
    router: Router;
    ban: number = 0;
    ColumnaDetalle: any[] = ['N° Cuota', 'Valor Cuota', 'Fecha Cuota'];
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
    selectedlineagrid: string = "";
    listEstado: any[] = [];
    detalleprestamo: any[] = [];
    listadoempleado: any[] = [];
    listperiodo: any[] = [];
    iVacaciones: any = {};
    habilitaobjetofrom: boolean = true;
    habilitaobjetobuscar: boolean = true;

    iAccion: string = ""
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listvacaciones: any[] = [];
    listdetalle: any[] = [];
    listipofalta: any[] = [];

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    parametrofrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        cocodigo: new FormControl(''),
        codigo: new FormControl(''),
        ruc: new FormControl(''),
        descripcion: new FormControl(''),
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
        this.cancelar();
    }
    /**
* DEFINICION DE FUNCION CARGA FORMA
*/
    cargaVacaciones() {
        this.spinner.show();
        this.mantenimientoService.buscaVacaciones(globales.cia).subscribe(data => {
            try {
                this.listvacaciones = data.root[0];
                this.openModal(this.modalbusquedavacaciones);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    limpiarColor() {
        for (var i = 0; i < this.detalleprestamo.length; i++) {
            this.detalleprestamo[i].color = "";
        }
    }
    /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
    clickGrid(row: any) {
        this.limpiarColor();
        row.color = "SG";
        this.selectedlineagrid = row.npd_linea
    }
    habilitarfrom(val: Number) {
        switch (val) {
            case 1:
                this.habilitaobjetofrom = true;
                this.habilitaobjetobuscar = true;
                break;
            case 2:
                this.isAccion = "I";
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
    buscaremp(ban: number) {
        this.ban = ban;
        this.cargaEmpleado();
    }
    calcularcuota() {
        if (this.iVacaciones.nop_numerocuota === "" || this.iVacaciones.nop_numerocuota === "0" || this.iVacaciones.nop_numerocuota === undefined) {
            this.smensaje = "No a ingresado el numero de cuota para calcular el prestamo ...Por Favor Revisar"
            this.mensaje("1", this.smensaje);
            return;
        }
        if (parseInt(this.iVacaciones.nop_numerocuota) <= 0) {
            this.smensaje = "El numero de cuota debe ser mayor a cero...Por Favor Revisar"
            this.mensaje("1", this.smensaje);
            return;
        }
        if (this.iVacaciones.nop_valorprestamo === "" || this.iVacaciones.nop_valorprestamo === "0" || this.iVacaciones.nop_valorprestamo === undefined) {
            this.smensaje = "No a ingresado el valor del prestamo...Por Favor Revisar"
            this.mensaje("1", this.smensaje);
            return;
        }

        let valorcuota: number = parseFloat(this.iVacaciones.nop_valorprestamo) / parseInt(this.iVacaciones.nop_numerocuota);

        var olddate = new Date(this.iVacaciones.nop_fechaprestamo);

        this.detalleprestamo = [];
        for (var i = 1; i <= parseInt(this.iVacaciones.nop_numerocuota); i++) {

            var newDate = new Date(olddate.setMonth(olddate.getMonth() + 1));
            this.detalleprestamo.push({
                npd_linea: i,
                npd_valorcuota: valorcuota,
                npd_estadocuota: "A",
                npd_fechacuota: moment(newDate).format("YYYY-MM-DD").toString()
            });

            olddate = newDate;
        }
    }
    agregarlinea() {
        var linea: any = {};
        linea.linea = this.detalleprestamo.length + 1;
        this.detalleprestamo.push(linea);
        this.selectedlineagrid = "";
    }
    /**
  * DEFINICION DE FUNCION QUE BORRA UNA LINEA EN EL DETALLE DE PEDIDO
  */
    borrarlinea() {
        for (var i = 0; i < this.detalleprestamo.length; i++) {
            if (this.detalleprestamo[i].npd_linea === this.selectedlineagrid) {
                this.detalleprestamo.splice(i, 1);
                this.selectedlineagrid = "";
                break;
            }
        }
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
            this.iVacaciones = codigo;

            this.limpiabotones(3);
        } else {
            this.iVacaciones.nom_sec = codigo.empsec;
            this.iVacaciones.empsec = codigo.empsec;
            this.iVacaciones.empcodigo = codigo.empcodigo;
            this.iVacaciones.empnombres = codigo.empnombres;
            this.iVacaciones.empsueldo = codigo.confsalario;
            this.iVacaciones.empapellidopaterno = codigo.empapellidopaterno;
            this.iVacaciones.empapellidomaterno = codigo.empapellidomaterno;
            this.cargaPeriodo();
        }

    }
    cargaPeriodoconsu() {
        this.spinner.show();
        this.mantenimientoService.cargaperiodovacaciones(globales.cia, this.iVacaciones.nom_sec).subscribe(data => {
            try {
                this.spinner.hide();
                this.listperiodo = data.root[0];
                this.cargaDia();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cargaPeriodo() {
        this.spinner.show();
        this.mantenimientoService.cargaperiodovacaciones(globales.cia, this.iVacaciones.nom_sec).subscribe(data => {
            try {
                this.spinner.hide();
                this.listperiodo = data.root[0];
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cargaDia() {
        let _index = this.listperiodo.findIndex((x) => x.nve_codigo === parseInt(this.iVacaciones.nve_codigo));
        this.iVacaciones.nva_dias_vacacionespe = this.listperiodo[_index].nva_dias_vacaciones;
    }
    cierreModal(event: boolean) {
        if (event) {
            this.hideModal()
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
            if (!Funcion.ValidadPagina('Ingreso de Aerolineas')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listEstado = Funcion.Estado();
        this.listipofalta = Funcion.TipoFalta();
        this.notifier = this.injector.get(ServiceMensaje);
        this.habilitarfrom(1);
    }

    aceptarOk(event: boolean) {
        if (event) {
            this.cancelar();
        }
    }
    delete() {
        this.spinner.show();
        this.iVacaciones.nva_estado = "D";
        this.mantenimientoService.deleteVacaciones(this.iVacaciones).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarparametro();
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

    aceptarConfi(event: boolean) {
        if (event) {

        }
    }
    aceptarConfiEli(event: boolean) {
        if (event) {

        }
    }

    /**
  * DEFINICION DE FUNCION PARA GUARDAR Y ACTUALIZAR VENDEDOR
  */
    guardarprestamo() {
        this.validar();
        if (this.smensaje != "") {
            this.mensaje("1", this.smensaje);
            return
        } else {
            if (this.isAccion === "I") {
                this.insertPrestamo();
            }
            if (this.isAccion === "M") {
                this.updatePrestamo();
            }
        }
    }
    updatePrestamo() {
        this.spinner.show();
        this.iVacaciones.detalle = this.detalleprestamo;
        this.mantenimientoService.updatePrestamo(this.iVacaciones).subscribe(data => {
            try {
                if (data.success) {
                    var mensaje: string = "";
                    mensaje = mensaje + data.msgError + "<br/>";
                    this.mensaje("3", mensaje);
                    this.limpiabotones(1);
                    this.habilitarfrom(1);
                } else {
                    this.mensaje("2", data.msgError);
                }
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.mensaje("2", err.message);
            this.spinner.hide();
        });

    }
    insertPrestamo() {
        this.spinner.show();
        this.iVacaciones.nva_estado = "A";
        this.iVacaciones.co_codigo = globales.cia;
        this.mantenimientoService.insertVacaciones(this.iVacaciones).subscribe(data => {
            try {
                if (data.success) {
                    var mensaje: string = "";
                    mensaje = mensaje + data.msgError + "<br/>";
                    this.mensaje("3", mensaje);
                    this.limpiabotones(1);
                    this.habilitarfrom(1);
                } else {
                    this.mensaje("2", data.msgError);
                }
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.mensaje("2", err.message);
            this.spinner.hide();
        });

    }
    validar() {
        this.smensaje = "";

        if (this.iVacaciones.empcodigo === "") {
            this.smensaje = "No Tiene seleccionado ninguna empleado ...Por Favor Revisar"
            return;
        }



        if (this.iVacaciones.nve_codigo === "" || this.iVacaciones.nve_codigo === undefined) {
            this.smensaje = "No ha seleccionado un periodo de vacaciones valido...Por Favor Revisar"
            return;
        }

        if (this.iVacaciones.nva_dias_vacacionespe === "" || this.iVacaciones.nva_dias_vacacionespe === undefined || parseInt(this.iVacaciones.nva_dias_vacacionespe) <=0) {
            this.smensaje = "El Periodo seleccionado no tiene dias pendiente por tomar...Por Favor Revisar"
            return;
        }

        if (parseInt(this.iVacaciones.nva_dias_vacaciones) <=0 ) {
            this.smensaje = "Debe ingresar un rango de vacaciones valido...Por Favor Revisar"
            return;
        }
        if (parseInt(this.iVacaciones.nva_dias_vacaciones) > parseInt(this.iVacaciones.nva_dias_vacacionespe)) {
            this.smensaje = "Ha ingresado mas vacaciones de lo disponible...Por Favor Revisar"
            return;
        }


    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaParametro(data: any) {
        this.iVacaciones = data;

        this.iVacaciones.nva_inicio_vacaciones = moment(data.nva_inicio_vacaciones).format("YYYY-MM-DD").toString();
        this.iVacaciones.nva_fin_vacaciones = moment(data.nva_fin_vacaciones).format("YYYY-MM-DD").toString();
        this.cargaPeriodoconsu();
        this.diastomados();
        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarparametro() {
        this.iVacaciones = {};
        this.iVacaciones.empcodigo = "";
        this.iVacaciones.empnombres = "";
        this.iVacaciones.nva_inicio_vacaciones = moment(new Date()).format("YYYY-MM-DD").toString()
        this.iVacaciones.nva_fin_vacaciones = moment(new Date()).format("YYYY-MM-DD").toString()
        this.iVacaciones.nva_estado = "A";
        this.iVacaciones.nve_codigo = "";
        this.iVacaciones.nva_dias_vacacionespe = "";
        this.diastomados();
     
    }
    diastomados() {
        var fechaInicio = new Date(this.iVacaciones.nva_inicio_vacaciones).getTime();
        var fechaFin = new Date(this.iVacaciones.nva_fin_vacaciones).getTime();
        var diff = fechaFin - fechaInicio;
        this.iVacaciones.nva_dias_vacaciones = diff / (1000 * 60 * 60 * 24);
    }
    guardar() {

    }
    cancelar() {
        this.limpiabotones(1);
        this.limpiarparametro();
        this.habilitarfrom(1);
    }

    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaVacaciones();
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
    cierreVacaciones(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaParametro(JSON.parse(event))
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
        return this.parametrofrom.controls;
    }

    mensaje(_tipo: string, _mensaje: string) {
        this.llamarmodal = _tipo + "|Registro Vacaciones|" + _mensaje + "|" + Funcion.Ramdon().toString();
    }
}
