import { Component, ViewChild } from '@angular/core';
import { FuncionesService } from '@services/funciones-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SriService } from '@services/sri-service';
import { Funcion } from '@funciones/funciones';
import { BotonesModel } from '@modelo/botones-model';
import { ComCabeceraModel } from '@modelo/comCabecera-model';
import { MantenimientoService } from '@services/mantenimiento-service';
import { BancosService } from '@services/bancos-service';
import { ComprasService } from '@services/compras-service';
import { NgxSpinnerService } from "ngx-spinner";
import { globales, environment } from 'src/environments/environment';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './reversainformacion.component.html',
    styleUrls: ['./reversainformacion.component.scss']
})
export class ReversaInformacionComponent {

    labelprogress: string = "";
    fechaservidor: string = "";
    anio: string = "";
    mes: string = "";
    ne_anio: string = "";
    ddw_mes: string = "";
    llamarmodal: string = "";
    informacion: any = {};
    vtasEstab: any[] = [];
    iTipoId: string = "";
    secuanu: number = 0;
    iTipoEmpresa: string = "";
    listmes: any[] = [];
    router: Router;
    progress: number = 0;
    botones: BotonesModel = new BotonesModel();
    datosIvas: any = {};
    cbx_compra: boolean = true;
    cbx_venta: boolean = true;
    inicio: string = "";


    constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService, _router: Router, private funcionesService: FuncionesService, private modalService: BsModalService, private mantenimientoService: MantenimientoService, private comprasService: ComprasService, private bancosService: BancosService, private sriService: SriService) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Reverso Importacion')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        var fecha = new Date();
        this.fechaservidor = moment(fecha).format("YYYY-MM-DD").toString();
        this.limpiar();
        this.listmes = Funcion.CargaMeses();

    }



    salir() {
        this.router.navigate(['/principal/default'], {
            skipLocationChange: true,
        });
    }
    /**
  * DEFINICION DE FUNCION LIMPIAR PANTALLA
  */
    limpiar() {
        this.ddw_mes = parseInt(this.fechaservidor.substr(5, 2)).toString();
        this.ne_anio = parseInt(this.fechaservidor.substr(0, 4)).toString();
        this.cbx_compra = true;
        this.cbx_venta = true;

    }


    procesar() {

        if (this.cbx_compra === false && this.cbx_venta === false) {
            this.modalmensaje("1", "Se debe seleccionar al menos un Módulo para la ejecución del Proceso");
            return;
        }

        if (this.cbx_compra === true && this.cbx_venta === false) {
            this.spinner.show();
            this.sriService.deleteInformacion("DCOM", globales.cia, this.ne_anio, this.ddw_mes).subscribe(data => {
                try {
                    this.informacion = data;
                    this.spinner.hide();
                    this.modalmensaje("3", data.msgError);
                } catch (e) {
                    this.spinner.hide();
                }
            }, () => {
                this.spinner.hide();
            });
        }
        if (this.cbx_compra === false && this.cbx_venta === true) {
            this.spinner.show();
            this.sriService.deleteInformacion("DVEN", globales.cia, this.ne_anio, this.ddw_mes).subscribe(data => {
                try {
                    this.informacion = data;
                    this.spinner.hide();
                    this.modalmensaje("3", data.msgError);
                } catch (e) {
                    this.spinner.hide();
                }
            }, () => {
                this.spinner.hide();
            });
        }
        if (this.cbx_compra === true && this.cbx_venta === true) {
            this.spinner.show();
            this.sriService.deleteInformacion("DALL", globales.cia, this.ne_anio, this.ddw_mes).subscribe(data => {
                try {
                    this.informacion = data;
                    this.spinner.hide();
                    this.modalmensaje("3", data.msgError);
                } catch (e) {
                    this.spinner.hide();
                }
            }, () => {
                this.spinner.hide();
            });
        }
    }



    aceptarOk(event: boolean) {
        if (event) {

        }
    }

    modalmensaje(tipo: string, mensaje: string) {
        this.llamarmodal = tipo + "|Reverso Información |" + mensaje + "|" + Funcion.Ramdon();
    }
}
