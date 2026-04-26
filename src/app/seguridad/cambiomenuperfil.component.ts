import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Funcion } from '@funciones/funciones';
import { MantenimientoService } from '@services/mantenimiento-service';
import { BoletoService } from '@services/boleto-service';
import { NgxSpinnerService } from "ngx-spinner";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BotonesModel } from '@modelo/botones-model';
import { globales, environment } from 'src/environments/environment';
import { ServiceMensaje } from '@services/config/ServiceMensaje';
import { BoCabeceraModel } from '@modelo/bocabecera-model';
import { TotalModel } from '@modelo/total-model';
import * as moment from 'moment';
import { BoDetalleModel } from '@modelo/bodetalle-model';
import { BoSeguroModel } from '../modelo/boseguro-model';
import { BoAlojamientoModel } from '../modelo/boalojamiento-model';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './cambiomenuperfil.component.html',
    styleUrls: ['./cambiomenuperfil.component.scss']
})
export class CambioMenuPerfilComponent implements OnInit {
    /**
   * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
   */
    @ViewChild('modalbusquedaentidad') modalbusquedaentidad: any;




    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    impuestoporcentaje: number = 0;
    modalRef: any;
    llamarmodal: string = "";
    ColumnaDetalle: any[] = ['MODULO', 'OPCION DE MENU', 'ORDEN'];
    /**
  * DEFINICION DE VARIABLE DE CONTROL DE ACCION SUBMIT DE PAGINA
  */
    /**
   * DEFINICION DE VARIABLE DE RUTA LA CUAL NOS PERMITA REDIRECCIONAR A OTRA PAGINA
   */
    router: Router;
    /**
  * DEFINICION DE VARIABLE MODAL DE MANEJO DE LA SECCION DE BOTONES
  */
    botones: BotonesModel = new BotonesModel();
    totalmodel: TotalModel = new TotalModel();
    /**
  * DEFINICION DE VARIABLE NOTIFICACION TIPO TOAS
  */
    notifier: any;
    submitted = false;
    habilitaobjetofrom: boolean = true;
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    detallereporte: any[] = [];
    listaHasta: any[] = [];
    detallereportegeneral: any[] = [];
    detalleperfil: any[] = [];
    listcliente: any[] = [];
    iDocumento: BoCabeceraModel = new BoCabeceraModel();
    lineagrid: number = 0;
    lineagridse: number = 0;
    lineagridalo: number = 0;
    listmodulo: any[] = [];
    listperfil: any[] = [];
    selectmenu: string = "";
    select_desde: string = "";
    select_hasta: string = "";
    selectperfil: string = "";
    lineaseguro: BoSeguroModel = new BoSeguroModel();
    lineaalojamiento: BoAlojamientoModel = new BoAlojamientoModel();
    smensaje = "";
    isAccion: string = "";
    /**
   * DEFINICION DE VARIABLE DE MODELO DE VENDEDOR
   */
    model: any = {};
    /**
 * DEFINICION DE FUNCION INIT DE LA CLASE
 */
    ngOnInit() {
        this.limpiabotones(1);
        var _Datos: any[] = [];
        this.cancelar();

    }
    cancelar() {

        this.selectmenu = "";
        this.selectperfil = "";
        this.detallereporte = [];
        this.listaHasta = [];
        this.cargaModulo();
        this.cargaPerfil()
    }
    
    guardarmenu() {
        let modelo: any = {};
        modelo.detalle = [];
        modelo.me_codigo = this.selectmenu;
        this.listaHasta.forEach((x) => {
            modelo.detalle.push({
                pe_codigo: x.pe_codigo,
                sp_sec: this.selectperfil,
                me_codigo: this.selectmenu,
                spd_estado:"A"
            });
        });
        this.spinner.show();
        this.mantenimientoService.updateMenuPerfil(modelo).subscribe(data => {
            try {
                if (data.success) {
                    var mensaje: string = "";
                    mensaje = mensaje + data.msgError + "<br/>";
                    this.mensaje("3", mensaje);
                    this.cancelar();
                } else {
                    this.mensaje("2", data.msgError);
                }
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }

    pasar() {
        if (this.select_desde != "") {
            var _itemDesde = this.detallereporte;
            for (var i = 0; i <= _itemDesde.length; i++) {
                if (_itemDesde[i].pe_codigo == this.select_desde) {
                    var item = {
                        pe_codigo: _itemDesde[i].pe_codigo,
                        pe_nombre_pagina: _itemDesde[i].pe_nombre_pagina
                    };
                    this.listaHasta.push(item);
                    this.detallereporte.splice(i, 1);
                    break;
                }
            }

        }
    }
    devolver() {
        if (this.select_hasta != "") {
            var _itemHasta = this.listaHasta;
            for (var i = 0; i <= _itemHasta.length; i++) {
                if (_itemHasta[i].pe_codigo == this.select_hasta) {
                    var item = {
                        pe_codigo: _itemHasta[i].pe_codigo,
                        pe_nombre_pagina: _itemHasta[i].pe_nombre_pagina
                    };
                    this.detallereporte.push(item);
                    this.listaHasta.splice(i, 1);
                    break;
                }
            }

        }
    }
    cierreModalTipoSeguro(event: any) {
        if (event) {
            this.hideModal()
        }
    }
    cambioMenu() {
        this.detallereporte = this.detallereportegeneral.filter((x) => x.mo_codigo === parseInt(this.selectmenu)).sort((n1: any, n2: any) =>
        {
            if (n1.pe_orden > n2.pe_orden) {
                return 1;
            }

            if (n1.pe_orden < n2.pe_orden) {
                return -1;
            }

            return 0;
        });

        this.listaHasta = this.detalleperfil.filter((x) => x.sp_sec === parseInt(this.selectperfil) && x.me_codigo === parseInt(this.selectmenu));
        for (var j = 0; j < this.listaHasta.length; j++) {
          let _dexn:number=  this.detallereporte.findIndex((x) => x.pe_codigo === this.listaHasta[j].pe_codigo);
            if (_dexn>=0) {
                this.detallereporte.splice(_dexn, 1);
            }
            
        }
        
    }
    cargaModulo() {
        this.spinner.show();
        this.mantenimientoService.cargaMenu(globales.cia).subscribe(data => {
            try {
                this.listmodulo = [{
                    mo_codigo: "",
                    mo_descripcion: ""
                }];
                data.root[0].forEach((x: any) => {
                    this.listmodulo.push(x);
                });

                this.detallereportegeneral = data.root[1];
                this.selectmenu = "";
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }

    cargaPerfil() {
        this.spinner.show();
        this.mantenimientoService.manPerfil(globales.cia).subscribe(data => {
            try {
                this.listperfil = [{
                    sp_sec: "",
                    sp_nombre: ""
                }];
                data.root[0].forEach((x: any) => {
                    this.listperfil.push(x);
                });
                this.detalleperfil = data.root[1];
                this.selectperfil = "";
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

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
                this.botones.btnsalir = false
                this.iDocumento = new BoCabeceraModel();
                var fecha = new Date();
                var formatoFecha = moment(fecha);
                this.iDocumento.bc_fecha_inicio_viaje = formatoFecha.format("YYYY-MM-DD").toString();
                this.iDocumento.bc_fecha_fin_viaje = formatoFecha.format("YYYY-MM-DD").toString();
                this.submitted = false;
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
    habilitarfrom(val: Number) {
        switch (val) {
            case 1:
                this.isAccion = "I";
                this.habilitaobjetofrom = false;
                break;
            case 2:
                this.isAccion = "C";
                this.habilitaobjetofrom = true;
                break;
            case 3:
                this.isAccion = "M";
                this.habilitaobjetofrom = false;
                break;
            case 4:
                this.isAccion = "";
                this.habilitaobjetofrom = true;
                break;
        }
    }
    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private fb: FormBuilder, private mantenimientoService: MantenimientoService, private boletoService: BoletoService, private injector: Injector) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Mantenimiento Menu')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.notifier = this.injector.get(ServiceMensaje);
    }
    buscar() {
        this.guardarmenu();
    }
    salir() {
        this.router.navigate(['/principal/default'], {
            skipLocationChange: true,
        });
    }

    cierreCliente(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaCliente(JSON.parse(event))
        }
    }

    seteaCliente(_datos: any) {
        this.iDocumento.cl_codigo = _datos.cl_codigo;
        this.iDocumento.cl_nombre = _datos.cl_nombre;

    }
    limpiarColor() {
        for (var i = 0; i < this.iDocumento.detalle_bo.length; i++) {
            this.iDocumento.detalle_bo[i].color = "";
        }
    }
    /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
    clickGrid(row: BoDetalleModel) {
        this.lineagrid = row.sec;
        this.limpiarColor();
        row.color = "SG";
    }
    limpiarColorseg() {
        //for (var i = 0; i < this.iDocumento.seguro_bo.length; i++) {
        //    this.iDocumento.seguro_bo[i].color = "";
        //}
    }
    clickGridseg(row: BoSeguroModel) {
        this.lineagridse = row.sec;
        this.limpiarColorseg();
        row.color = "SG";
    }
    limpiarColoralo() {
        //for (var i = 0; i < this.iDocumento.alojamiento_bo.length; i++) {
        //    this.iDocumento.alojamiento_bo[i].color = "";
        //}
    }
    clickGridalo(row: BoAlojamientoModel) {
        this.lineagridalo = row.sec;
        this.limpiarColoralo();
        row.color = "SG";
    }

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
    openModalgr(content: string, tipo: string) {
        this.modalRef = this.modalService.show(
            content, { class: tipo });
    }
    mensaje(_tipo: string, _mensaje: string) {
        this.llamarmodal = _tipo + "|Ingreso de Menu Perfil|" + _mensaje + "|" + Funcion.Ramdon().toString();
    }
    aceptarOk(event: boolean) {
        if (event) {

        }
    }
}
