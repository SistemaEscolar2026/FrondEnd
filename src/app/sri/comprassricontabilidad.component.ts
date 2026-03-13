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
    selector: 'app-comprassricontabilidad',
    templateUrl: './comprassricontabilidad.component.html',
    styleUrls: ['./comprassricontabilidad.component.scss']
})
export class ComprassriContabilidadComponent {

    router: Router;
    openReport: string = "";
    llamarmodal: string = "";
    botones: BotonesModel = new BotonesModel();
    fechaservidor: string = "";
    dp_fechaIni: string = "";
    dp_fechaFin: string = "";
    rb_excel: string = "";

    constructor(private spinner: NgxSpinnerService, _router: Router, private funcionesService: FuncionesService, private modalService: BsModalService, private bancosService: BancosService, private mantenimientoService: MantenimientoService,  private sriService: SriService) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Comparativo de Retenciones: Compras-SRI-Contabilidad')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        var fecha = new Date();
        this.fechaservidor = moment(fecha).format("YYYY-MM-DD").toString();
        this.limpiar();
    }

    procesar() {
        this.generaReporte();

    }
    generaReporte() {
        let parametro = {
            cia: globales.cia,
            fechaIni: this.dp_fechaIni,
            fechaFin: this.dp_fechaFin,
            maquina: globales.nomMaquina,
            usuario: Funcion.ReturnUsuario().us_codigo
        };


        let iNombreRporte = "";


        if (this.rb_excel === "N") {
            iNombreRporte = "ComparativoRetenciones";
        }
        else {
            iNombreRporte = "ComparativoRetencionesCol";
        }


        this.openReport = "Compras-SRI-Contabilidad|" + environment.reportServerSRI + iNombreRporte + "|" + JSON.stringify(parametro) + "|" + Funcion.Ramdon();

    }



    limpiar() {
        var date = new Date();

        var primerDia = new Date(date.getFullYear(), 0, 1);
        var ultimoDia = new Date(date.getFullYear(), 11 + 1, 0);
        this.dp_fechaIni = moment(primerDia).format("YYYY-MM-DD").toString();
        this.dp_fechaFin = moment(ultimoDia).format("YYYY-MM-DD").toString();
        this.rb_excel = "N";


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
        this.llamarmodal = tipo + "|Compras-SRI-Contabilidad|" + mensaje + "|" + Funcion.Ramdon();
    }

}
