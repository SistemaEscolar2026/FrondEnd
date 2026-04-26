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
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent } from "@fullcalendar/angular";
import esLocale from '@fullcalendar/core/locales/es'; // 1. Importar español
import * as moment from 'moment';
export interface SelectedFiles {
    name: string;
    file: any;
    base64?: string;
}

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './horarioclase.component.html',
    styleUrls: ['./horarioclase.component.scss']
})
export class HorarioClaseComponent implements OnInit {

    @ViewChild("calendar", { static: true })
    calendarComponent: FullCalendarComponent | undefined;
    @ViewChild("external", { static: true }) external: any;
    calendarOptions: any = {
        initialView: 'timeGridWeek', // Vista semanal por horas
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek'
        },
        weekends: true,
        dayHeaderFormat: { weekday: 'long' }, 
        slotDuration: '00:15:00',
        // Optional: set the snap interval for dragging/resizing events
        snapDuration: '00:15:00',
        // Optional: set the interval for the text labels on the left axis
        slotLabelInterval: '01:00',
        editable: true,
        selectable: true,
        hiddenDays: [0, 6],
        height: 600,
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        locale: esLocale, // 2. Asignar idioma
        dayMaxEventRows: false,
        dayMaxEvents: false,
        events: this.getEvents(),
        displayEventEnd: true,
        displayEventTime: true,
        allDaySlot: false,
        droppable: true,
        eventResizableFromStart: true,
        eventOverlap: false,
        selectAllow: (selectInfo: any) => {
            // Return false if selection overlaps with blocked hours
            return false;// !isSlotBlocked(selectInfo.start, selectInfo.end);
        },
        eventDidMount: (info: any) => {
            info.el.addEventListener('dblclick', () => {
                this.handleEventDoubleClick(info.event, info);
            });
        }
    };
    draggableEvents: any;
    dummy: string = "";
    listcurso: any[] = [];
    loading = false;
    mensaje: string = "";
    habilitabotones: boolean = false;
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedadocente') modalbusquedadocente: any;
    @ViewChild('modalEvent') modalEvent: any;
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
    iDocumento: any = {};
    event: any = {};
    info: any = {};
    listperfil: any[] = [];
    listClase: any[] = [];
    /**
   * DEFINICION DE VARIABLE DE LISTADO DE OBJETO DE ESTADO
   */
    listperiodo: any[] = [];
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listdocente: any[] = [];

    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    usuariofrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        tipoperiodo: new FormControl(''),
        curso: new FormControl(''),
        hccodigo: new FormControl('')

    });
    /**
   * DEFINICION DE VARIABLE DE MODELO DE VENDEDOR
   */
    model: any = {};

    limpiar(fecha: string) {

        this.calendarOptions = {
            initialView: 'timeGridWeek', // Vista semanal por horas
            headerToolbar: {
                left: '',
                center: '',
                right: ''
            },
            weekends: true,
            height: 600,
            dayHeaderFormat: { weekday: 'long' }, 
            slotDuration: '00:15:00',
            // Optional: set the snap interval for dragging/resizing events
            snapDuration: '00:15:00',
            // Optional: set the interval for the text labels on the left axis
            slotLabelInterval: '01:00',
            editable: true,
            selectable: true,
            plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
            locale: esLocale, // 2. Asignar idioma
            dayMaxEventRows: false,
            dayMaxEvents: false,
            initialDate: fecha,
            events: this.getEvents(),
            displayEventEnd: true,
            displayEventTime: true,
            allDaySlot: false,
            hiddenDays: [0, 6],
            droppable: true,
            eventResizableFromStart: true,
            eventOverlap: false,
            selectAllow: (selectInfo: any) => {
                // Return false if selection overlaps with blocked hours
                return false;// !isSlotBlocked(selectInfo.start, selectInfo.end);
            },
            eventDidMount: (info: any) => {
                info.el.addEventListener('dblclick', () => {
                    this.handleEventDoubleClick(info.event, info);
                });
            }
        };

    }
    /**
 * DEFINICION DE FUNCION INIT DE LA CLASE
 */
    ngOnInit() {
        var _fecha = new Date();
        // this.draggableEvents = this.getDraggableEvents();
        this.limpiar(moment(_fecha).format("YYYY-MM-DD").toString());
        this.setDragItems();
        this.cargaCurso();
        this.cargaPeriodo(); -
            this.limpiabotones(1);
    }

    cargaCurso() {
        this.spinner.show();
        this.mantenimientoService.manCurso(globales.cia).subscribe(data => {
            try {
                this.listcurso = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    onDurationChanged(ev: any) {
        console.log(ev);
    }

    setDragItems(): void {
        const dragCallback = (eventEl: any) => {
            const targetEvent = this.draggableEvents.find((x: any) => x.id === eventEl.id);
            if (!targetEvent) {
                return { title: "error" };
            }
            return { ...targetEvent };
        };
        new Draggable(this.external.nativeElement, {
            itemSelector: ".fc-event",
            eventData: dragCallback.bind(this)
        });
    }

    eventDropped(ev: any): void {
        // const targetEvent = this.draggableEvents.find(
        //   (x:any) => x.id === ev.draggedEl.id
        // );
        //this.draggableEvents = this.draggableEvents.filter((x:any) => x !== targetEvent);
    }

    getResources(): any[] {
        return [
            {
                id: "a",
                title: "Room A"
            },
            {
                id: "b",
                title: "Room B"
            },
            {
                id: "c",
                title: "Room C"
            }
        ];
    }
    getDraggableEvents(): any[] {
        return [
            {
                id: "abc",
                title: "Event request 1",
                backgroundColor: "pink",
                textColor: "black",
                editable: false,
                duration: "00:45",
                resourceId: "a"
            },
            {
                id: "zxc",
                title: "Event request 2",
                backgroundColor: "pink",
                textColor: "black",
                editable: false,
                start: new Date("2021-04-20T05:00:00"),
                end: new Date("2021-04-20T06:00:00"),
                duration: "00:45",
                resourceId: "a"
            }
        ];
    }
    llenarMateriaCurso(tipo_pagina: string, tipo: string): any {

        if (true) {
            this.loading = true;
            this.mantenimientoService.getCursoMateria(tipo_pagina).subscribe((results) => {
                try {
                    if (results.codError.toString() === "0") {
                        sessionStorage.setItem("PaginaDesde", results.root[0]);
                        sessionStorage.setItem("PaginaHasta", results.root[1]);
                        var _tmp: any[] = results.root[1];
                        //for (var i = 0; i < results.root[0].length; i++) {
                        //    var item = {
                        //        codigo: results.root[0][i].codigo,
                        //        descripcion: results.root[0][i].descripcion
                        //    };
                        //    this.listaDesde.push(item);
                        //}
                        //for (var i = 0; i < results.root[1].length; i++) {
                        //    var item = {
                        //        codigo: results.root[1][i].codigo,
                        //        descripcion: results.root[1][i].descripcion
                        //    };
                        //    this.listaHasta.push(item);
                        //}


                        var _numer: string = (parseInt(tipo) === 60 ? "01:00" : "00:" + tipo)
                        var datos: any[] = [];
                        var _aux: number = 0;
                        _tmp.forEach((x) => {

                            var _fecha = new Date();
                            _aux = parseFloat(moment(_fecha).format("HHmmss").toString());
                            datos.push({
                                id: parseInt(x.codigo).toString(),
                                title: x.descripcion,
                                backgroundColor: "pink",
                                textColor: "black",
                                editable: false,
                                duration: _numer,
                                resourceId: x.codigo
                            });
                            _aux = _aux + 1;
                        });
                        this.draggableEvents = datos;
                        this.loading = false;
                    } else {
                        this.loading = false;
                        this.mensaje = results.msgError.toString();

                    }
                } catch (e) {
                    this.loading = false;
                }
            }, err => {
                this.loading = false;
            });
        }

    }
    imprimirCalendario() {
        window.print();
    }
    cargaConsulta() {

        this.spinner.show();
        this.mantenimientoService.cargaHorarioClase(globales.cia, this.usuariofrom.controls['tipoperiodo'].value.toString(), this.usuariofrom.controls['curso'].value.toString()).subscribe(data => {
            try {
                var _datos: any[] = data.root[0];
                if (_datos.length>0) {
                    _datos.forEach((x) => {
                        var _linea: any = {};
                        _linea = {
                            id: parseInt(x.codigo).toString(),
                            title: x.descripcion,
                            backgroundColor: "pink",
                            textColor: "black",
                            editable: false,
                            start: new Date(x.fechadesde),
                            end: new Date(x.fechahasta),
                            resourceId: x.codigo
                        };
                        this.calendarOptions.events = [...(this.calendarOptions.events as any[]), _linea];
                    });
                }
               
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });


      
    }

    cargaDia() {
        var _linea: any = this.listperiodo.find((x: any) => parseInt(x.pe_codigo) === parseInt(this.usuariofrom.controls['tipoperiodo'].value.toString()));
        var _datos: any[] = [];

        var fechadesde = new Date(_linea.pe_inicioperiodo);
        var fechahasta = new Date(_linea.pe_inicioperiodo);
        this.limpiar(moment(fechadesde).format("YYYY-MM-DD").toString());

        var _hora: string = _linea.pe_horafinal.replace(':', '.');
        _hora = _hora.replace(':', '');

        var _fechahora = new Date(fechahasta);
        _fechahora.setHours(_fechahora.getHours() + parseInt(_hora));
        _fechahora.setMinutes(_fechahora.getMinutes() + (parseFloat((parseFloat(_hora) - parseInt(_hora)).toFixed(2)) * 100));
        _fechahora.setMinutes(_fechahora.getMinutes() + 5);

        this.llenarMateriaCurso(this.usuariofrom.controls['curso'].value.toString(), _linea.pe_duracionhoraclase);

        this.calendarOptions.slotMinTime = _linea.pe_horainicio;
        this.calendarOptions.slotMaxTime = moment(_fechahora).format("HH:mm:ss").toString();
        this.calendarOptions.scrollTime = _linea.pe_horainicio;
        let calendarApi = this.calendarComponent?.getApi();
        calendarApi?.gotoDate(moment(fechadesde).format("YYYY-MM-DD").toString()); // Cambia a una fecha específica

        var _dias: number = Funcion.calcularDias(fechadesde, new Date(_linea.pe_finperiodo));
        for (var i = 0; i < _dias; i++) {
            fechahasta = Funcion.addDays(fechadesde, i);
            var _lineaevet: any = {};
            if (Funcion.esFinDeSemana(fechahasta)) {
                _lineaevet = {
                    title: "FINSEMANA",
                    backgroundColor: "#b8b8b8",
                    start: new Date(moment(fechahasta).format("YYYY-MM-DD").toString() + "T00:00:00.00"),
                    end: new Date(moment(fechahasta).format("YYYY-MM-DD").toString() + "T24:00:00.00"),
                    editable: false,
                    resourceIds: ["a", "b", "c"]
                };
                this.calendarOptions.events = [...(this.calendarOptions.events as any[]), _lineaevet];
            } else {
                if (parseInt(_linea.pe_tipohorario) === 1) {
                    var _fechahasta = new Date();
                    var _hora: string = _linea.pe_horainicio.replace(':', '.');
                    _hora = _hora.replace(':', '');

                    _fechahasta = new Date(fechahasta.getTime()); // Clonación correcta
                    _fechahasta.setHours(_fechahasta.getHours() + parseInt(_hora));
                    _fechahasta.setMinutes(_fechahasta.getMinutes() + (parseFloat((parseFloat(_hora) - parseInt(_hora)).toFixed(2)) * 100));
                    for (var j = 0; j < 4; j++) {
                        _fechahasta.setMinutes(_fechahasta.getMinutes() + 45);
                    }
                    var _fechahastarecero = new Date();
                    _fechahastarecero = new Date(_fechahasta.getTime()); // Clonación correcta
                    _fechahastarecero.setMinutes(_fechahastarecero.getMinutes() + parseInt(_linea.pe_duracionrecreo));
                    _lineaevet = {
                        title: "RECREO",
                        backgroundColor: "#b8b8b8",
                        start: new Date(moment(_fechahasta).format("YYYY-MM-DD").toString() + "T" + moment(_fechahasta).format("HH:mm:ss").toString() + ".00"),
                        end: new Date(moment(_fechahastarecero).format("YYYY-MM-DD").toString() + "T" + moment(_fechahastarecero).format("HH:mm:ss").toString() + ".00"),
                        editable: false,
                        resourceIds: ["a", "b", "c"]
                    };
                    this.calendarOptions.events = [...(this.calendarOptions.events as any[]), _lineaevet];
                }
                if (parseInt(_linea.pe_tipohorario) === 2) {
                    var _fechahasta = new Date();
                    var _hora: string = _linea.pe_horainicio.replace(':', '.');
                    _hora = _hora.replace(':', '');

                    _fechahasta = new Date(fechahasta.getTime()); // Clonación correcta
                    _fechahasta.setHours(_fechahasta.getHours() + parseInt(_hora));
                    _fechahasta.setMinutes(_fechahasta.getMinutes() + (parseFloat((parseFloat(_hora) - parseInt(_hora)).toFixed(2)) * 100));
                    for (var j = 0; j < 3; j++) {
                        _fechahasta.setMinutes(_fechahasta.getMinutes() + 45);
                    }
                    var _fechahastarecero = new Date();
                    _fechahastarecero = new Date(_fechahasta.getTime()); // Clonación correcta
                    _fechahastarecero.setMinutes(_fechahastarecero.getMinutes() + parseInt(_linea.pe_duracionrecreo));
                    _lineaevet = {
                        title: "RECREO",
                        backgroundColor: "#b8b8b8",
                        start: new Date(moment(_fechahasta).format("YYYY-MM-DD").toString() + "T" + moment(_fechahasta).format("HH:mm:ss").toString() + ".00"),
                        end: new Date(moment(_fechahastarecero).format("YYYY-MM-DD").toString() + "T" + moment(_fechahastarecero).format("HH:mm:ss").toString() + ".00"),
                        editable: false,
                        resourceIds: ["a", "b", "c"]
                    };
                    this.calendarOptions.events = [...(this.calendarOptions.events as any[]), _lineaevet];
                    _fechahasta = new Date(_fechahasta.getTime()); // Clonación correcta
                    _fechahasta.setMinutes(_fechahasta.getMinutes() + parseInt(_linea.pe_duracionrecreo));
                    for (var j = 0; j < 2; j++) {
                        _fechahasta.setMinutes(_fechahasta.getMinutes() + 45);
                    }
                    var _fechahastarecero = new Date();
                    _fechahastarecero = new Date(_fechahasta.getTime()); // Clonación correcta
                    _fechahastarecero.setMinutes(_fechahastarecero.getMinutes() + parseInt(_linea.pe_duracionrecreo));
                    _lineaevet = {
                        title: "RECREO",
                        backgroundColor: "#b8b8b8",
                        start: new Date(moment(_fechahasta).format("YYYY-MM-DD").toString() + "T" + moment(_fechahasta).format("HH:mm:ss").toString() + ".00"),
                        end: new Date(moment(_fechahastarecero).format("YYYY-MM-DD").toString() + "T" + moment(_fechahastarecero).format("HH:mm:ss").toString() + ".00"),
                        editable: false,
                        resourceIds: ["a", "b", "c"]
                    };
                    this.calendarOptions.events = [...(this.calendarOptions.events as any[]), _lineaevet];
                }
                // Sumar 3 horas


            }
            //else {
            //    _lineaevet = {
            //        title: "",
            //        backgroundColor: "#b8b8b8",
            //        start: new Date(moment(fechahasta).format("YYYY-MM-DD").toString() + "T00:00:00.00"),
            //        end: new Date(moment(fechahasta).format("YYYY-MM-DD").toString() + "T" + _linea.pe_horainicio + ".00"),
            //        editable: false,
            //        resourceIds: ["a", "b", "c"]
            //    };
            //    this.calendarOptions.events = [...(this.calendarOptions.events as any[]), _lineaevet];
            //    _lineaevet = {
            //        title: "",
            //        backgroundColor: "#b8b8b8",
            //        start: new Date(moment(fechahasta).format("YYYY-MM-DD").toString() + "T" + _linea.pe_horafinal + ".00"),
            //        end: new Date(moment(fechahasta).format("YYYY-MM-DD").toString() + "T23:59:00.00"),
            //        editable: false,
            //        resourceIds: ["a", "b", "c"]
            //    };
            //    this.calendarOptions.events = [...(this.calendarOptions.events as any[]), _lineaevet];
            //}

        }
        this.cargaConsulta();
    }
    getEvents(): any[] {
        //return [
        //    {
        //        title: "",
        //        backgroundColor: "#b8b8b8",
        //        start: new Date("2026-04-19T13:30:00.00"),
        //        end: new Date("2026-04-19T24:00:00.00"),
        //        editable:false,
        //        resourceIds: ["a", "b", "c"]
        //    }
        //];
        return [];
    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }
    /**
* DEFINICION DE FUNCION CARGA VENDEDORES
*/
    cargaPeriodo() {
        this.spinner.show();
        this.mantenimientoService.manPeriodo(globales.cia).subscribe(data => {
            try {
                this.listperiodo = data.root[0];
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
                this.usuariofrom.controls['tipoperiodo'].disable();
                this.usuariofrom.controls['curso'].disable();
                this.usuariofrom.controls['hccodigo'].disable();

                break;
            case 2:
                this.habilitabotones = false;
                this.iAccion = "I";
                this.usuariofrom.controls['tipo'].setValue("I");
                this.usuariofrom.controls['tipoperiodo'].enable();
                this.usuariofrom.controls['curso'].enable();
                this.usuariofrom.controls['hccodigo'].enable();
                break;
            case 3:
                this.habilitabotones = false;
                this.iAccion = "M";
                this.usuariofrom.controls['tipo'].setValue("M");
                this.usuariofrom.controls['tipoperiodo'].disable();
                this.usuariofrom.controls['curso'].enable();
                this.usuariofrom.controls['hccodigo'].enable();
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
            if (!Funcion.ValidadPagina('Horario Clase')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listEstado = Funcion.Estado();
        this.notifier = this.injector.get(ServiceMensaje);
        this.listClase = Funcion.TipoCalses();
        this.habilitarfrom(1);
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
    insertusuario() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.docodigo = "";
        this.model.hccodigo = this.usuariofrom.controls['hccodigo'].value.toString().toUpperCase();
        this.model.pecodigo = this.usuariofrom.controls['tipoperiodo'].value.toString().toUpperCase();
        this.model.cucodigo = this.usuariofrom.controls['curso'].value;
        this.model.lista = [];


        var _event = this.calendarComponent?.getApi();

        var _lineas = _event?.getEvents();

        var eventfinal = _lineas?.filter((x) => x.title !== "RECREO" && x.title !== "FINSEMANA");
        eventfinal?.forEach((x:any) => {

            const fecha = new Date(x.start);
            const diaNumero = fecha.getDay(); // 0-6

            var _linea: any = {};
            _linea.codigo = x.id;
            _linea.fechadesde = moment(x.start).format("YYYY-MM-DD").toString();
            _linea.fechahasta = moment(x.end).format("YYYY-MM-DD").toString();
            _linea.horadesde = moment(x.start).format("HH:mm:ss").toString();
            _linea.horahasta = moment(x.end).format("HH:mm:ss").toString();
            _linea.duracionhora = ((x.end.getTime() - x.start.getTime()) / 60000).toString();
            _linea.diasemana = diaNumero;
            this.model.lista.push(_linea);
        });
        this.mantenimientoService.insertHorarioClase(this.model).subscribe(data => {
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
        this.model.hccodigo = this.usuariofrom.controls['hccodigo'].value.toString().toUpperCase();
        this.model.pecodigo = this.usuariofrom.controls['tipoperiodo'].value.toString().toUpperCase();
        this.model.cucodigo = this.usuariofrom.controls['curso'].value;


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



        this.usuariofrom.controls['hccodigo'].setValue(data.hc_codigo);
        this.usuariofrom.controls['tipoperiodo'].setValue(data.pe_codigo);
        this.usuariofrom.controls['curso'].setValue(data.cu_codigo);

        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarcliente() {
        this.usuariofrom.controls['tipoperiodo'].setValue("");
        this.usuariofrom.controls['curso'].setValue("");
        this.draggableEvents = [];
        this.submitted = false;
        var _fecha = new Date();
        this.limpiar(moment(_fecha).format("YYYY-MM-DD").toString());

    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {

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
    cancelarmodal() {
        this.hideModal()
    }
    handleEventDoubleClick(event: any, info: any) {
        if (event.title !== "RECREO") {
            this.event = event;
            this.info = info;
            this.iDocumento = {};
            this.iDocumento.materia = this.event.title;
            this.iDocumento.fechainicio = Funcion.FormatoFecha(this.event.start);
            this.iDocumento.fechafin = Funcion.FormatoFecha(this.event.end);
            this.iDocumento.horainicio = moment(this.event.start).format("HH:mm").toString();
            this.iDocumento.horafin = moment(this.event.end).format("HH:mm").toString();
            this.openModal(this.modalEvent);
        }

    }
    eliminarevento() {
        this.info.event.remove();
        this.cancelarmodal();
        //let calendarApi = this.calendarComponent?.getApi();
        //let eventToRemove = calendarApi?.getEventSources().find(this.event);

        //if (eventToRemove) {
        //    eventToRemove.remove(); // Elimina del calendario y UI
        //    this.cancelarmodal();
        //}
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
