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
    templateUrl: './libroventacliente.component.html',
    styleUrls: ['./libroventacliente.component.scss']
})
export class LibroVentaClienteComponent {
    @ViewChild('modalbusquedacliente') modalbusquedacliente: any;
    router: Router;
    openReport: string = "";
    llamarmodal: string = "";
    ne_anioIni: string = "";
    ddw_mesIni: string = "";
    ne_anioFin: string = "";
    ddw_mesFin: string = "";
    txt_codCli: string = "";
    modalRef: any; txt_nomCli: string = "";
    botones: BotonesModel = new BotonesModel();
    fechaservidor: string = "";
    listmes: any[] = [];
    listadocliente: any[] = [];
    cbx_todos: boolean = true;

    constructor(private spinner: NgxSpinnerService, _router: Router, private funcionesService: FuncionesService, private modalService: BsModalService, private bancosService: BancosService, private mantenimientoService: MantenimientoService, private sriService: SriService) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Libro Ventas por Cliente')) {
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
    cierreModal(event: boolean) {
        if (event) {
            this.hideModal()
        }
    }
    cargaCliente() {
        this.spinner.show();
        this.mantenimientoService.getClientescia(globales.cia).subscribe(data => {
            try {
                this.listadocliente = data;
                this.openModal(this.modalbusquedacliente, "modal-lg modal-primary");
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cargaClientesele() {
        this.spinner.show();
        this.mantenimientoService.getClienteseleccionado(globales.cia, this.txt_codCli).subscribe(data => {
            try {
                var aux = data;

                if (aux === "" || aux === null) {
                    this.cargaCliente();
                } else {
                    this.txt_codCli = aux.clcodigo;
                    this.txt_nomCli = aux.clnombre;
                }
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
            this.txt_codCli = "";
            this.txt_nomCli = "";
        }
    }
    buscarcliente() {
        if (this.txt_codCli != "") {
            this.cargaClientesele();
        } else {
            this.txt_codCli = "";
            this.txt_nomCli = "";
        }
    }

    uf_exporta() {
        this.spinner.show();
        this.sriService.exportaLibroVentasCliente(globales.cia, this.ne_anioIni, this.ne_anioFin, this.ddw_mesIni, this.ddw_mesFin, (this.cbx_todos) ? "T" : this.txt_codCli).subscribe(data => {
            try {
                var exportaCompSustCredS = data;
                Funcion.GeneraExcel(exportaCompSustCredS, "LibroVentas");
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });


    }
    procesar() {
        if (this.cbx_todos === false) {
            if (this.txt_codCli === "") {
                this.modalmensaje("1", "Debe selececionar un cliente para el informe");
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
            cliente: (this.cbx_todos) ? "T" : this.txt_codCli,
            maquina: globales.nomMaquina,
            usuario: Funcion.ReturnUsuario().us_codigo
        };


        let iNombreRporte = "LibroVentas";

        this.openReport = "Libro Ventas por Cliente|" + environment.reportServerSRI + iNombreRporte + "|" + JSON.stringify(parametro) + "|" + Funcion.Ramdon();

    }


    limpiar() {
        this.ddw_mesIni = "1";
        this.ne_anioIni = parseInt(this.fechaservidor.substr(0, 4)).toString();
        this.ddw_mesFin = "12";
        this.ne_anioFin = parseInt(this.fechaservidor.substr(0, 4)).toString();
        this.txt_codCli = "";
        this.txt_nomCli = "";
        this.cbx_todos = true;


    }


    cierreCliente(event: string) {
        if (event !== "") {
            this.hideModal()
            var _datos = JSON.parse(event)
            this.txt_codCli = _datos.clcodigo;
            this.txt_nomCli = _datos.clnombre;
        }
    }


    salir() {
        this.router.navigate(['/principal/default'], {
            skipLocationChange: true,
        });
    }

    hideModal() {
        if (this.modalRef != undefined) {
            this.modalRef.hide();
        }
    }
    /**
  * DEFINICION DE FUNCION PARA ABRIR CUALQUIER MODAL
  */
    openModal(content: string, tipo: string) {
        this.modalRef = this.modalService.show(
            content, { class: tipo });
    }

    /**
  * DEFINICION DE FUNCION MENSAJE DE MODALES
  */
    modalmensaje(tipo: string, mensaje: string) {
        this.llamarmodal = tipo + "|Compras Sustento Credito Tributario|" + mensaje + "|" + Funcion.Ramdon();
    }

}
