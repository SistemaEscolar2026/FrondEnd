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
    templateUrl: './comprasustento.component.html',
    styleUrls: ['./comprasustento.component.scss']
})
export class CompraSustentoComponent {

    router: Router;
    openReport: string = "";
    llamarmodal: string = "";
    ddw_sustento: string = "";
    ne_anioIni: string = "";
    ddw_mesIni: string = "";
    ne_anioFin: string = "";
    ddw_mesFin: string = "";
    rb_agrupado: string = "";
    botones: BotonesModel = new BotonesModel();
    fechaservidor: string = "";
    listmes: any[] = [];
    listsustento: any[] = [];
    cbx_todos: boolean = true;

    constructor(private spinner: NgxSpinnerService, _router: Router, private funcionesService: FuncionesService, private modalService: BsModalService, private bancosService: BancosService, private mantenimientoService: MantenimientoService,  private sriService: SriService) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Informe de Compras - Sustento Tributario')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listmes = Funcion.CargaMeses();
        var fecha = new Date();
        this.fechaservidor = moment(fecha).format("YYYY-MM-DD").toString();
        this.limpiar();
        this.cargaSustento();
    }
    cargaSustento() {
        this.spinner.show();
        this.mantenimientoService.getCreTrib().subscribe(data => {
            try {
                this.listsustento = [];
                this.listsustento.push({
                    ctcodigo: "",
                    presenta: ""
                });
                data.root[0].forEach((item:any) => {
                    this.listsustento.push({
                        ctcodigo: item.ctcodigo,
                        presenta: item.ctcodigo + " - " + item.ctdescripcion
                    });
                });
                this.ddw_sustento = "";
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cbx_todos_CheckedChanged() {
        if (this.cbx_todos) {
            this.ddw_sustento = "";
        }
    }
    uf_exporta() {
        switch (this.rb_agrupado) {

            case "S":
                this.spinner.show();
                this.sriService.exportaCompSustCredS(globales.cia, this.ne_anioIni, this.ne_anioFin, this.ddw_mesIni, this.ddw_mesFin, (this.cbx_todos) ? "T" : this.ddw_sustento).subscribe(data => {
                    try {
                        var exportaCompSustCredS = data;
                        Funcion.GeneraExcel(exportaCompSustCredS, "ComprasSusTribS");
                        this.spinner.hide();
                    } catch (e) {
                        this.spinner.hide();
                    }
                }, () => {
                    this.spinner.hide();
                });
                break;
            case "T":
                this.spinner.show();
                this.sriService.exportaCompSustCredSD(globales.cia, this.ne_anioIni, this.ne_anioFin, this.ddw_mesIni, this.ddw_mesFin, (this.cbx_todos) ? "T" : this.ddw_sustento).subscribe(data => {
                    try {
                        var exportaCompSusTriSD = data;
                        Funcion.GeneraExcel(exportaCompSusTriSD, "ComprasSusTribSD");
                        this.spinner.hide();
                    } catch (e) {
                        this.spinner.hide();
                    }
                }, () => {
                    this.spinner.hide();
                });
                break;
            case "D":
                this.spinner.show();
                this.sriService.exportaCompSustCredDS(globales.cia, this.ne_anioIni, this.ne_anioFin, this.ddw_mesIni, this.ddw_mesFin, (this.cbx_todos) ? "T" : this.ddw_sustento).subscribe(data => {
                    try {
                        var exportaCompSusTriDS = data;
                        Funcion.GeneraExcel(exportaCompSusTriDS, "ComprasSusTribDS");
                        this.spinner.hide();
                    } catch (e) {
                        this.spinner.hide();
                    }
                }, () => {
                    this.spinner.hide();
                });
                break;
        }

    }
    procesar() {
        if (this.cbx_todos === false) {
            if (this.ddw_sustento === "") {
                this.modalmensaje("1", "Debe selececionar un sustento tributario para el informe");
                return;
            }
        }
        var perIni = (parseInt(this.ne_anioIni) * 100) + parseInt(this.ddw_mesIni);
        var perFin = (parseInt(this.ne_anioFin) * 100) + parseInt(this.ddw_mesFin);
        if (perIni > perFin) {
            this.modalmensaje("1", "El periodo inicial debe ser menor al periodo final");
            return;
        }
        this.generaReporte();

    }
    generaReporte() {
        let parametro = {
            cia: globales.cia,
            anioIni: this.ne_anioIni,
            anioFin: this.ne_anioFin,
            mesIni: this.ddw_mesIni,
            mesFin: this.ddw_mesFin,
            susTrib: (this.cbx_todos) ? "T" : this.ddw_sustento,
            maquina: globales.nomMaquina,
            usuario: Funcion.ReturnUsuario().us_codigo
        };


        let iNombreRporte = "";

        switch (this.rb_agrupado) {
            case "S":
                iNombreRporte = "ComprasSusTribS";
                break;
            case "T":
                iNombreRporte = "ComprasSusTribSD";
                break;
            case "D":
                iNombreRporte = "ComprasSusTribDS";
                break;
        }


        this.openReport = "Compras Sustento Credito Tributario|" + environment.reportServerSRI + iNombreRporte + "|" + JSON.stringify(parametro) + "|" + Funcion.Ramdon();

    }


    buscar(ban: number) {

    }


    limpiar() {
        this.ddw_mesIni = "1";
        this.ne_anioIni = parseInt(this.fechaservidor.substr(0, 4)).toString();
        this.ddw_mesFin = "12";
        this.ne_anioFin = parseInt(this.fechaservidor.substr(0, 4)).toString();
        this.rb_agrupado = "S";
        this.cbx_todos = true;


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
