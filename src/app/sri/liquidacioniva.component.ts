import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FuncionesService } from '@services/funciones-service';
import { SriService } from '@services/sri-service';
import { Funcion } from '@funciones/funciones';
import { BoletoService } from '@services/boleto-service';
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
    selector: 'app-liquidacioniva',
    templateUrl: './liquidacioniva.component.html',
    styleUrls: ['./liquidacioniva.component.scss']
})
export class LiquidacionIvaComponent {

    router: Router;
    openReport: string = "";
    llamarmodal: string = "";
    botones: BotonesModel = new BotonesModel();
    fechaservidor: string = "";
    dp_fechaIni: string = "";
    dp_fechaFin: string = "";
    rb_excel: string = "";

    constructor(private spinner: NgxSpinnerService, _router: Router, private boletoService: BoletoService, private funcionesService: FuncionesService, private modalService: BsModalService, private bancosService: BancosService, private mantenimientoService: MantenimientoService,  private sriService: SriService) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Liquidación Iva')) {
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
        if (this.rb_excel === "N") {
            this.buscarpdf();
        }
        else {
            this.buscarexcel();
        }

    }
    buscarexcel() {
        this.spinner.show();
        this.boletoService.repoteLiquidacioniva("EXC", globales.cia, this.dp_fechaIni, this.dp_fechaFin, "", globales.nomMaquina, Funcion.ReturnUsuario().us_login).subscribe((results) => {
            try {

                var file = new Blob([(results)], { type: 'application/xlsx' });
                var fileURL = window.URL.createObjectURL(file);
                const a = document.createElement('a');
                a.setAttribute('style', 'display:none;');
                document.body.appendChild(a);
                a.href = fileURL;
                a.download = "ReporteLiquidacionIva.xlsx";
                a.click();
                this.spinner.hide();
                // window.open(fileURL, '_blank', '');
            } catch (e) {
                this.spinner.hide();
            }

        }, () => {
            this.spinner.hide();
        });
    }
    buscarpdf() {
        this.spinner.show();
        this.boletoService.repoteLiquidacioniva("PDF", globales.cia, this.dp_fechaIni, this.dp_fechaFin,"", globales.nomMaquina, Funcion.ReturnUsuario().us_login).subscribe((results) => {
            try {
                try {
                    var file = new Blob([results], { type: 'application/pdf' });
                    var fileURL = window.URL.createObjectURL(file);
                    window.open(fileURL, '_blank', '');
                    this.spinner.hide();
                } catch (e) {
                    this.spinner.hide();
                }

            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
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
            iNombreRporte = "LiquidacionIva";
        }
        else {
            iNombreRporte = "LiquidacionIvaCol";
        }


        this.openReport = "Liquidación De Iva|" + environment.reportServerSRI + iNombreRporte + "|" + JSON.stringify(parametro) + "|" + Funcion.Ramdon();

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
        this.llamarmodal = tipo + "|Liquidación De Iva|" + mensaje + "|" + Funcion.Ramdon();
    }

}
