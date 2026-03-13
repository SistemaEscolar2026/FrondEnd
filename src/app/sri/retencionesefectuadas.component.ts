import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FuncionesService } from '@services/funciones-service';
import { SriService } from '@services/sri-service';
import { Funcion } from '@funciones/funciones';
import { BotonesModel } from '@modelo/botones-model';
import { MantenimientoService } from '@services/mantenimiento-service';
import { BancosService } from '@services/bancos-service';
import { NgxSpinnerService } from "ngx-spinner";
import { globales, environment } from 'src/environments/environment';
import * as moment from 'moment';
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './retencionesefectuadas.component.html',
    styleUrls: ['./retencionesefectuadas.component.scss']
})
export class RetencionesEfectuadasComponent {

    router: Router;
    openReport: string = "";
    llamarmodal: string = "";
    ne_anio: string = "";
    ddw_mes: string = "";
    botones: BotonesModel = new BotonesModel();
    fechaservidor: string = "";
    listmes: any[] = [];

    constructor(private spinner: NgxSpinnerService, _router: Router, private funcionesService: FuncionesService, private modalService: BsModalService, private bancosService: BancosService, private mantenimientoService: MantenimientoService, private sriService: SriService) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Informe de Retenciones Efectuadas')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        var fecha = new Date();
        this.listmes = Funcion.CargaMeses();
        this.fechaservidor = moment(fecha).format("YYYY-MM-DD").toString();
        this.limpiar();
    }


    uf_exporta() {
        this.spinner.show();
        this.sriService.exportaRetencionesEfectuadas(globales.cia, this.ne_anio, this.ddw_mes).subscribe(data => {
            try {
                var exportaCompSustCredS = data;
                Funcion.GeneraExcel(exportaCompSustCredS, "RetencionesEfectuadas");
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });


    }
    procesar() {
        this.generaReporte();

    }
    generaReporte() {
        let parametro = {
            cia: globales.cia,
            anio: this.ne_anio,
            mes: this.ddw_mes,
            maquina: globales.nomMaquina,
            usuario: Funcion.ReturnUsuario().us_codigo
        };


        let iNombreRporte = "RetencionesEfectuadas";




        this.openReport = "Informe de Retenciones Efectuadas|" + environment.reportServerSRI + iNombreRporte + "|" + JSON.stringify(parametro) + "|" + Funcion.Ramdon();

    }


    buscar(ban: number) {

    }


    limpiar() {
        this.ddw_mes = parseInt(this.fechaservidor.substr(5, 2)).toString();
        this.ne_anio = parseInt(this.fechaservidor.substr(0, 4)).toString();


    }



    salir() {
        this.router.navigate(['/principal/default'], {
            skipLocationChange: true,
        });
    }



    /**
  * DEFINICION DE FUNCION MENSAJE DE MODALES
  */
    modalmensaje(tipo: string, mensaje: string) {
        this.llamarmodal = tipo + "|Compras Sustento Credito Tributario|" + mensaje + "|" + Funcion.Ramdon();
    }

}
