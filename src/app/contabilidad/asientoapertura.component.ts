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
    selector: 'app-asientoapertura',
    templateUrl: './asientoapertura.component.html',
    styleUrls: ['./asientoapertura.component.scss']
})
export class AsientoAperturaComponent {

    cierremodulo: any = {};
    router: Router;
    openReport: string = "";
    llamarmodal: string = "";
    botones: BotonesModel = new BotonesModel();
    fechaservidor: string = "";
    dp_fechaIni: string = "";
    dp_fechaFin: string = "";
    rb_facturacion: boolean = false;
    rb_boleto: boolean = false;
    rb_cxc: boolean = false;
    rb_cxp: boolean = false;
    rb_ordencompra: boolean = false;
    rb_contabilidad: boolean = false;
    rb_nomina: boolean = false;
    rb_banco: boolean = false;
    ne_anio: string = "";
    constructor(private spinner: NgxSpinnerService, _router: Router, private boletoService: BoletoService, private funcionesService: FuncionesService, private modalService: BsModalService, private bancosService: BancosService, private mantenimientoService: MantenimientoService, private sriService: SriService) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Cuadratura de Iva')) {
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
        var cierrermodulo: any = {};
        cierrermodulo.cocodigo = globales.cia;
        cierrermodulo.ccmanio = this.ne_anio;
        this.spinner.show();
        this.boletoService.asientoApertura(cierrermodulo).subscribe(data => {
            try {
                if (data.success) {
                    this.modalmensaje("3", data.msgError);
         
                    this.limpiar();
                } else {
                    this.modalmensaje("2", data.msgError);
                }
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.modalmensaje("2", err.message);
            this.spinner.hide();
        });
    }
    buscarexcel() {
        this.spinner.show();
        this.boletoService.repoteImportacionSri("EXC", globales.cia, this.dp_fechaIni, this.dp_fechaFin, "", globales.nomMaquina, Funcion.ReturnUsuario().us_login).subscribe((results) => {
            try {

                var file = new Blob([(results)], { type: 'application/xlsx' });
                var fileURL = window.URL.createObjectURL(file);
                const a = document.createElement('a');
                a.setAttribute('style', 'display:none;');
                document.body.appendChild(a);
                a.href = fileURL;
                a.download = "ReporteImportacionSRI.xlsx";
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
        this.boletoService.repoteImportacionSri("PDF", globales.cia, this.dp_fechaIni, this.dp_fechaFin, "", globales.nomMaquina, Funcion.ReturnUsuario().us_login).subscribe((results) => {
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




        this.openReport = "Cuadratura de Iva|" + environment.reportServerSRI + iNombreRporte + "|" + JSON.stringify(parametro) + "|" + Funcion.Ramdon();

    }



    limpiar() {
        this.cierremodulo = Funcion.returdatosession("cierremodulo")[0];


        var date = new Date();
        this.ne_anio = this.cierremodulo.ccm_anio;
        var primerDia = new Date(date.getFullYear(), 0, 1);
        var ultimoDia = new Date(date.getFullYear(), 11 + 1, 0);
        this.dp_fechaIni = moment(primerDia).format("YYYY-MM-DD").toString();
        this.dp_fechaFin = moment(ultimoDia).format("YYYY-MM-DD").toString();


        this.rb_facturacion = (this.cierremodulo.ccm_facturacion === "A") ? false : true;
        this.rb_boleto = (this.cierremodulo.ccm_boleto === "A") ? false : true;
        this.rb_cxc = (this.cierremodulo.ccm_cuenta_cobrar === "A") ? false : true;
        this.rb_cxp = (this.cierremodulo.ccm_cuenta_pagar === "A") ? false : true;
        this.rb_ordencompra = (this.cierremodulo.ccm_orden_compra === "A") ? false : true;
        this.rb_contabilidad = (this.cierremodulo.ccm_contabilidad === "A") ? false : true;
        this.rb_nomina = (this.cierremodulo.ccm_nomina === "A") ? false : true;
        this.rb_banco = (this.cierremodulo.ccm_banco === "A") ? false : true;

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
        this.llamarmodal = tipo + "|Cierre Modulo|" + mensaje + "|" + Funcion.Ramdon();
    }

}
