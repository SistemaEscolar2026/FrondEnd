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
    templateUrl: './importainformacion.component.html',
    styleUrls: ['./importainformacion.component.scss']
})
export class ImportacionInformacionComponent {

    labelprogress: string = "";
    fechaservidor: string = "";
    caracteres: any[] = [
        "Á", "A",
        "À", "A",
        "Â", "A",
        "Ä", "A",
        "Ã", "A",
        "Å", "A",
        "á", "a",
        "à", "a",
        "â", "a",
        "ä", "a",
        "ã", "a",
        "å", "a",
        "É", "E",
        "È", "E",
        "Ê", "E",
        "Ë", "E",
        "é", "e",
        "è", "e",
        "ê", "e",
        "ë", "e",
        "Í", "I",
        "Ì", "I",
        "Î", "I",
        "Ï", "I",
        "í", "i",
        "ì", "i",
        "î", "i",
        "ï", "i",
        "Ó", "O",
        "Ò", "O",
        "Ô", "O",
        "Ö", "O",
        "Õ", "O",
        "ó", "o",
        "ò", "o",
        "ô", "o",
        "ö", "o",
        "õ", "o",
        "Ú", "U",
        "Ù", "U",
        "Û", "U",
        "Ü", "U",
        "ú", "u",
        "ù", "u",
        "û", "u",
        "ü", "u",
        "Ý", "Y",
        "ý", "y",
        "ÿ", "y",
        "ñ", "n",
        "Ñ", "N",
        "Ç", "C",
        "ç", "c",
        "¡", "",
        "¿", "",
        "´", "",
        "·", "",
        "¸", "",
        ".", "",
        "«", "",
        "»", "",
        "¨", "",
        "Æ", "",
        "æ", "",
        "ß", "",
        "µ", "",
        "Ð", "",
        "ð", "",
        "Þ", "",
        "þ", "",
        "¢", "",
        "£", "",
        "¤", "",
        "¥", "",
        "€", "",
        "$", "",
        "¹", "1",
        "²", "2",
        "³", "3",
        "×", "x",
        "÷", "/",
        "±", "",
        "¼", "1/4",
        "½", "1/2",
        "¾", "3/4",
        "Ø", "",
        "ø", "",
        "¬", "",
        "<", "",
        ">", "",
        "&", "&amp;",
        "\"", "",
        "º", "o",
        "ª", "",
        "©", "",
        "®", "",
        "°", "o",
        "¦", "",
        "§", "",
        "¶", "",
        "¯", "",
        "\n", "",
        "\t", "",
        "\r", ""
    ];
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

    inicio: string = "";
    com_inicioNP: string = "";
    com_inicio: string = "";
    com_inicio2NP: string = "";
    com_inicio2: string = "";
    com_fpagos5: string = "";
    com_fpagos4: string = "";
    com_fpagos3: string = "";
    com_fpagos2: string = "";
    com_fpagos: string = "";
    com_air: string = "";
    com_air2: string = "";
    com_fin_air: string = "";
    com_sinair: string = "";
    com_rete: string = "";
    com_rete2: string = "";
    com_docModif: string = "";
    com_reembolso: string = "";
    com_reembolso2: string = "";
    com_fin_reembolso: string = "";
    com_fin_detCom: string = "";
    com_fin: string = "";
    vta_inicio: string = "";
    vta_inicioSinDeno: string = "";
    vta_inicioSinFP: string = "";
    vta_inicioSinDenoSinFP: string = "";
    vta_inicio2: string = "";
    vta_inicioSinDeno2: string = "";
    vta_inicio2SinFP: string = "";
    vta_inicioSinDeno2SinFP: string = "";
    vta_fin: string = "";
    vta_estab: string = "";
    vta_estab2: string = "";
    vta_fin_estab: string = "";
    fin: string = "";
    cbx_compra: boolean = true;
    cbx_venta: boolean = true;

    constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService, _router: Router, private funcionesService: FuncionesService, private modalService: BsModalService, private mantenimientoService: MantenimientoService, private comprasService: ComprasService, private bancosService: BancosService, private sriService: SriService) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Importar Informacion')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        var fecha = new Date();
        this.fechaservidor = moment(fecha).format("YYYY-MM-DD").toString();
        this.limpiar();
        this.listmes = Funcion.CargaMeses();
        //this.cargasecuencianau();
        this.configCiaSri();
        this.cargaCodigoIva();
        this.cargaTemplates();
    }

    cargaTemplates() {

        this.httpClient.get("../assets/Templates/inicio.ftl").subscribe((data) => {
            this.inicio = data.toString();
        }, error => {
            this.inicio = error.error.text;
        });

        this.httpClient.get("../assets/Templates/ventas/vta_inicio.ftl").subscribe((data) => {
            this.vta_inicio = data.toString();
        }, error => {
            this.vta_inicio = error.error.text;
        });

        this.httpClient.get("../assets/Templates/ventas/vta_inicioSinDeno.ftl").subscribe((data) => {
            this.vta_inicioSinDeno = data.toString();
        }, error => {
            this.vta_inicioSinDeno = error.error.text;
        });
        this.httpClient.get("../assets/Templates/ventas/vta_inicioSinFP.ftl").subscribe((data) => {
            this.vta_inicioSinFP = data.toString();
        }, error => {
            this.vta_inicioSinFP = error.error.text;
        });
        this.httpClient.get("../assets/Templates/ventas/vta_inicioSinDenoSinFP.ftl").subscribe((data) => {
            this.vta_inicioSinDenoSinFP = data.toString();
        }, error => {
            this.vta_inicioSinDenoSinFP = error.error.text;
        });

        this.httpClient.get("../assets/Templates/ventas/vta_inicio2.ftl").subscribe((data) => {
            this.vta_inicio2 = data.toString();
        }, error => {
            this.vta_inicio2 = error.error.text;
        });
        this.httpClient.get("../assets/Templates/ventas/vta_inicioSinDeno2.ftl").subscribe((data) => {
            this.vta_inicioSinDeno2 = data.toString();
        }, error => {
            this.vta_inicioSinDeno2 = error.error.text;
        });
        this.httpClient.get("../assets/Templates/ventas/vta_inicio2SinFP.ftl").subscribe((data) => {
            this.vta_inicio2SinFP = data.toString();
        }, error => {
            this.vta_inicio2SinFP = error.error.text;
        });
        this.httpClient.get("../assets/Templates/ventas/vta_inicioSinDeno2SinFP.ftl").subscribe((data) => {
            this.vta_inicioSinDeno2SinFP = data.toString();
        }, error => {
            this.vta_inicioSinDeno2SinFP = error.error.text;
        });
        this.httpClient.get("../assets/Templates/ventas/vta_fin.ftl").subscribe((data) => {
            this.vta_fin = data.toString();
        }, error => {
            this.vta_fin = error.error.text;
        });
        this.httpClient.get("../assets/Templates/ventas/vta_estab.ftl").subscribe((data) => {
            this.vta_estab = data.toString();
        }, error => {
            this.vta_estab = error.error.text;
        });
        this.httpClient.get("../assets/Templates/ventas/vta_estab2.ftl").subscribe((data) => {
            this.vta_estab2 = data.toString();
        }, error => {
            this.vta_estab2 = error.error.text;
        });
        this.httpClient.get("../assets/Templates/ventas/vta_fin_estab.ftl").subscribe((data) => {
            this.vta_fin_estab = data.toString();
        }, error => {
            this.vta_fin_estab = error.error.text;
        });


        this.httpClient.get("../assets/Templates/compras/com_inicioNP.ftl").subscribe((data) => {
            this.com_inicioNP = data.toString();
        }, error => {
            this.com_inicioNP = error.error.text;
        });

        this.httpClient.get("../assets/Templates/compras/com_inicio.ftl").subscribe((data) => {
            this.com_inicio = data.toString();
        }, error => {
            this.com_inicio = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_inicio2NP.ftl").subscribe((data) => {
            this.com_inicio2NP = data.toString();
        }, error => {
            this.com_inicio2NP = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_inicio2.ftl").subscribe((data) => {
            this.com_inicio2 = data.toString();
        }, error => {
            this.com_inicio2 = error.error.text;
        });

        this.httpClient.get("../assets/Templates/compras/com_fpagos5.ftl").subscribe((data) => {
            this.com_fpagos5 = data.toString();
        }, error => {
            this.com_fpagos5 = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_fpagos4.ftl").subscribe((data) => {
            this.com_fpagos4 = data.toString();
        }, error => {
            this.com_fpagos4 = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_fpagos3.ftl").subscribe((data) => {
            this.com_fpagos3 = data.toString();
        }, error => {
            this.com_fpagos3 = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_fpagos2.ftl").subscribe((data) => {
            this.com_fpagos2 = data.toString();
        }, error => {
            this.com_fpagos2 = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_fpagos.ftl").subscribe((data) => {
            this.com_fpagos = data.toString();
        }, error => {
            this.com_fpagos = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_air.ftl").subscribe((data) => {
            this.com_air = data.toString();
        }, error => {
            this.com_air = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_air2.ftl").subscribe((data) => {
            this.com_air2 = data.toString();
        }, error => {
            this.com_air2 = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_fin_air.ftl").subscribe((data) => {
            this.com_fin_air = data.toString();
        }, error => {
            this.com_fin_air = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_sinair.ftl").subscribe((data) => {
            this.com_sinair = data.toString();
        }, error => {
            this.com_sinair = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_rete.ftl").subscribe((data) => {
            this.com_rete = data.toString();
        }, error => {
            this.com_rete = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_rete2.ftl").subscribe((data) => {
            this.com_rete2 = data.toString();
        }, error => {
            this.com_rete2 = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_docModif.ftl").subscribe((data) => {
            this.com_docModif = data.toString();
        }, error => {
            this.com_docModif = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_reembolso.ftl").subscribe((data) => {
            this.com_reembolso = data.toString();
        }, error => {
            this.com_reembolso = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_reembolso2.ftl").subscribe((data) => {
            this.com_reembolso2 = data.toString();
        }, error => {
            this.com_reembolso2 = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_fin_reembolso.ftl").subscribe((data) => {
            this.com_fin_reembolso = data.toString();
        }, error => {
            this.com_fin_reembolso = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_fin_detCom.ftl").subscribe((data) => {
            this.com_fin_detCom = data.toString();
        }, error => {
            this.com_fin_detCom = error.error.text;
        });
        this.httpClient.get("../assets/Templates/compras/com_fin.ftl").subscribe((data) => {
            this.com_fin = data.toString();
        }, error => {
            this.com_fin = error.error.text;
        });
        this.httpClient.get("../assets/Templates/fin.ftl").subscribe((data) => {
            this.fin = data.toString();
        }, error => {
            this.fin = error.error.text;
        });

    }

    cargasecuencianau() {
        this.spinner.show();
        this.sriService.getSecuanciaAnul(globales.cia, this.ne_anio, this.ddw_mes).subscribe(lValida => {
            try {
                this.secuanu = lValida[0].resultado === null ? 0 : lValida[0].resultado;
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    configCiaSri() {
        this.spinner.show();
        this.mantenimientoService.getConfigCiaSri(globales.cia).subscribe(data => {
            try {
                this.iTipoId = data.root[0][0].tidcodigo;
                this.iTipoEmpresa = data.root[0][0].ccstipoempresa;
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cargaCodigoIva() {
        this.spinner.show();
        this.mantenimientoService.obtieneIvaCodigos().subscribe(data => {
            try {
                this.datosIvas.Table = data.table1;
                this.datosIvas.Table1 = data.table2;
                this.datosIvas.Table2 = data.table3;
                this.datosIvas.Table3 = data.table4;
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
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
    validaDatos() {
        this.spinner.show();
        let datomodulo: string = "";
        if (this.cbx_compra === true && this.cbx_venta === true) {
            datomodulo = "T";
        } else if (this.cbx_venta === true) {
            datomodulo = "V";
        } else if (this.cbx_compra === true) {
            datomodulo = "C";
        }
        this.sriService.validaComprasVentas(globales.cia, this.ddw_mes, this.ne_anio, datomodulo).subscribe(data => {
            try {
                this.informacion = data.root[0];
                this.spinner.hide();
                if (this.cbx_compra === true && this.cbx_venta === true) {
                    if (this.informacion[0].resultado > 0) {
                        this.modalmensaje("1", "Existe información en las tablas de compras del SRI, favor ejecutar proceso de reversion de informacion...");
                        return;
                    }
                    if (this.informacion[1].resultado > 0) {
                        this.modalmensaje("1", "Existe información en las tablas de ventas del SRI, favor ejecutar proceso de reversion de informacion...");
                        return;
                    }
                } else if (this.cbx_compra === true) {
                    if (this.informacion[0].resultado > 0) {
                        this.modalmensaje("1", "Existe información en las tablas de compras del SRI, favor ejecutar proceso de reversion de informacion...");
                        return;
                    }
                } else if (this.cbx_venta === true) {
                    if (this.informacion[0].resultado > 0) {
                        this.modalmensaje("1", "Existe información en las tablas de ventas del SRI, favor ejecutar proceso de reversion de informacion...");
                        return;
                    }
                }
                this.procesar2();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    procesar2() {

        var lE: any = {};
        var lEV: any = {};


        if (this.cbx_compra === true && this.cbx_venta === true) {
            this.spinner.show();
            this.sriService.getInformacionall(globales.cia, this.ddw_mes, this.ne_anio, "A", Funcion.ReturnUsuario().us_codigo).subscribe(data => {
                try {
                    lEV.ventas = data.root[0];
                    lEV.retVentas = [];
                    lEV.ventasAnul = data.root[1];
                    lEV.totEstab = data.root[2];

                    lE.comprasCab = data.root[3];
                    lE.comprasNC = [];
                    lE.loadRetenc = [];
                    lE.retIva = [];
                    this.spinner.hide();
                    this.guardadofinal(lE, lEV);
                } catch (e) {
                    this.spinner.hide();
                }
            }, () => {
                this.spinner.hide();
            });
        } else if (this.cbx_compra === true) {
            this.spinner.show();
            this.sriService.getInformacioncompras(globales.cia, this.ddw_mes, this.ne_anio, "A", Funcion.ReturnUsuario().us_codigo).subscribe(data => {
                try {
                    this.spinner.hide();
                    lE.comprasCab = data.root[0];
                    lE.comprasNC = [];
                    lE.loadRetenc = [];
                    lE.retIva = [];

                    lEV.totEstab = data.root[1];

                    if (lE.comprasCab === null) {
                        this.labelprogress = "No hay datos a importar de Compras...";
                    }
                    else {
                        if (lE.comprasCab.length <= 0) {
                            this.labelprogress = "No hay datos a importar de Compras...";
                        }
                        else {
                            this.labelprogress = "Se Obtuvo datos de Compras...";
                        }
                    }
                    this.guardadofinal(lE, lEV);
                } catch (e) {
                    this.spinner.hide();
                }
            }, () => {
                this.spinner.hide();
            });
        } else if (this.cbx_venta === true) {
            this.spinner.show();
            this.sriService.getInformacionventas(globales.cia, this.ddw_mes, this.ne_anio).subscribe(data => {
                try {
            
                    this.spinner.hide();
                    lEV.ventas = data.root[0];
                    lEV.retVentas = [];
                    lEV.ventasAnul = data.root[1];
                    lEV.totEstab = data.root[2];
                    if (lEV.ventas === null) {
                        this.labelprogress = "No hay datos a importar de Ventas...";
                    }
                    else {
                        if (lEV.ventas.Count <= 0) {
                            this.labelprogress = "No hay datos a importar de Ventas...";
                        }
                        else {
                            this.labelprogress = "Se Obtuvo datos de Ventas...";
                        }
                    }
                    this.guardadofinal(lE, lEV);
                } catch (e) {
                    this.spinner.hide();
                }
            }, () => {
                this.spinner.hide();
            });
        } else if (this.cbx_venta === false) {
            this.spinner.show();
            this.sriService.obtienEVentasEstab(globales.cia, this.ddw_mes, this.ne_anio).subscribe(data => {
                try {
                    this.spinner.hide();
                    lEV.totEstab = data;
                    this.guardadofinal(lE, lEV);
                } catch (e) {
                    this.spinner.hide();
                }
            }, () => {
                this.spinner.hide();
            });
        }
    }

    procesar() {

        if (this.cbx_compra === false && this.cbx_venta === false) {
            this.modalmensaje("1", "Se debe seleccionar al menos un Módulo para la ejecución del Proceso");
            return;
        }
        this.validaDatos();

    }

    uf_obtieneCodSriVtDS(tipoId: string) {
    }
    guardadofinal(lE: any, lEV: any) {

        let lsError: string = "";
        let liLineaC: number = 0;
        let liLineaV: number = 0;
        let liLineaA: number = 0;
        var compra: any = {};
        var anulado: any = {};
        var venta: any = {};
        //----

        let lsArchivo: string = "";
        var errores: any = {};
        //----
        var ling: any = {};

        var general: string = "";

        var linggeneral: any[] = [];
        if (lE.comprasCab != null) {
            if (lE.comprasCab.length > 0) {
                lE.comprasCab.forEach((cC: any) => {
                    compra = {};
                    compra.errores = [];
                    lsError = "";
                    liLineaC += 1;

                    if (cC.sri_valor_credito_trib_1 === 0 && cC.sri_valor_credito_trib_2 === 0) {
                        cC.sri_valor_credito_trib_1 = cC.subtotal - cC.ccxp_total_desc + cC.ccxp_total_rec;
                    }

                    if (!this.uf_registraCompra(compra, liLineaC, cC, lE.loadRetenc, lE.retIva)) {
                        this.modalmensaje("1", "Error al momento de Procesar el Registro de Compras");
                        return;
                    }

                    var reem = this.uf_obtieneReembolsos(compra.tcxpcodigo, compra.ccxpnumero, compra.prcodigo);
                    var info = this.uf_prepara(parseInt(this.ddw_mes), parseInt(this.ne_anio), this.iTipoId, compra, null, lEV.totEstab, reem);

                    lsArchivo = compra.tcxpcodigo + "_" + compra.ccxpnumero + "_" + compra.prcodigo + ".xml";
                    general = this.generaXMLCompra(info);

                    compra.lsarchivo = lsArchivo;
                    compra.contenidoarchivo = general;

                    ling.compras = compra;
                    ling.ventas = null;
                    ling.anulados = null;
                    ling.error = null;
                    linggeneral.push(Funcion.cloneObjeto(ling));

                });
            }
        }


        if (lE.comprasNC != null) {
            if (lE.comprasNC.length > 0) {
                lE.comprasNC.forEach((cN: any) => {
                    compra = {};
                    compra.errores = [];
                    lsError = "";
                    liLineaC += 1;

                    if (cN.sri_valor_credito_trib_1 === 0 && cN.sri_valor_credito_trib_2 === 0) {
                        cN.sri_valor_credito_trib_1 = cN.subtotal - cN + cN.ccxp_total_rec;
                    }

                    if (!this.uf_registraCompraNC(compra, liLineaC, cN, lE.comprasNCCru, lE.loadRetenc, lE.retIva)) {
                        this.modalmensaje("1", "Error al momento de Procesar el Registro de Nota de Crédito");
                        return;
                    }

                    var info = this.uf_prepara(parseInt(this.ddw_mes), parseInt(this.ne_anio), this.iTipoId, compra, null, lEV.totEstab, []);

                    lsArchivo = compra.tcxpcodigo + "_" + compra.ccxpnumero + "_" + compra.prcodigo + ".xml";
                    general = this.generaXMLCompra(info);

                    compra.lsarchivo = lsArchivo;
                    compra.contenidoarchivo = general;

                    ling.compras = compra;
                    ling.ventas = null;
                    ling.anulados = null;
                    ling.error = null;
                    linggeneral.push(Funcion.cloneObjeto(ling));

                });
            }

        }

        if (lEV.ventas != null) {
            if (lEV.ventas.length > 0) {
                lEV.ventas.forEach((eV: any) => {
                    venta = {};
                    venta.errores = [];
                    lsError = "";
                    liLineaV += 1;



                    if (!this.uf_registraVenta(venta, liLineaV, eV, lEV.retVentas)) {
                        this.modalmensaje("1", "Error al momento de Procesar el Registro de Venta");
                        return;
                    }

                    var info = this.uf_prepara(parseInt(this.ddw_mes), parseInt(this.ne_anio), this.iTipoId, null, venta, lEV.totEstab, []);

                    lsArchivo = venta.tcocodigo + "_" + venta.clcodigo + ".xml";
                    general = this.generaXMLVentas(info);


                    venta.lsarchivo = lsArchivo;
                    venta.contenidoarchivo = general;


                    ling.compras = null;
                    ling.ventas = venta;
                    ling.anulados = null;
                    ling.error = null;

                    linggeneral.push(Funcion.cloneObjeto(ling));

                });
            }
        }
        liLineaA = this.secuanu;
        if (lE.retAnul != null && this.cbx_compra === true) {
            if (lE.retAnul.length > 0) {
                lE.retAnul.forEach((rA: any) => {
                    liLineaA += 1;
                    anulado = {};
                    anulado.ciacodigo = globales.cia;
                    anulado.canuanio = this.ne_anio;
                    anulado.canumes = this.ddw_mes;
                    anulado.canusecuencia = liLineaA;
                    anulado.tcocodigo = "07";
                    anulado.canuseriecmbte = rA.serie;
                    anulado.canupuntocmbte = rA.punto;
                    anulado.canunumfacdesde = rA.cret_numero;
                    anulado.canunumfachasta = rA.cret_numero;
                    anulado.canunumautocmbte = rA.autorizacion === null || rA.autorizacion === "" ? "0" : rA.autorizacion;
                    anulado.canufecanulcmbte = rA.cret_fecha;

                    ling.compras = null;
                    ling.ventas = null;
                    ling.anulados = anulado;
                    ling.error = null;

                    linggeneral.push(Funcion.cloneObjeto(ling));
                });
            }
        }

        if (lEV.ventasAnul != null && this.cbx_venta === true) {
            if (lEV.ventasAnul.length > 0) {
                lEV.ventasAnul.forEach((vA: any) => {
                    liLineaA += 1;
                    anulado = {};
                    anulado.ciacodigo = globales.cia;
                    anulado.canuanio = this.ne_anio;
                    anulado.canumes = this.ddw_mes;
                    anulado.canusecuencia = liLineaA;
                    anulado.tcocodigo = vA.tco_codigo;
                    anulado.canuseriecmbte = vA.cav_serie_emi;
                    anulado.canupuntocmbte = vA.cav_punto_emi;
                    anulado.canunumfacdesde = vA.num_ini;
                    anulado.canunumfachasta = vA.num_fin;
                    anulado.canunumautocmbte = vA.cav_autorizacion;
                    anulado.canufecanulcmbte = vA.cav_fecha_doc;

                    ling.compras = null;
                    ling.ventas = null;
                    ling.anulados = anulado;
                    ling.error = null;

                    linggeneral.push(Funcion.cloneObjeto(ling));
                });
            }
        }

        this.spinner.show();
        this.sriService.insertDatosAll(linggeneral).subscribe(data => {
            try {

                let isMensajeS = data.table[0].mensaje;
                this.modalmensaje("3", isMensajeS);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.modalmensaje("2", err.error.Message);
            this.spinner.hide();
        });

    }
    generaXMLCompra(info: any) {
        var general: string = "";
        var template: string = this.inicio;
        template = template.replace('${tipoIdInf}', info.tipoIdInf);
        template = template.replace('${idInf}', info.idInf);
        template = template.replace('${razonSocialInf}', info.razonSocialInf);
        template = template.replace('${anio}', info.anio);
        template = template.replace('${mes}', info.mes);
        template = template.replace('${numEstabRuc}', info.numEstabRuc);
        template = template.replace('${totalVentas}', info.totalVentas);

        general = general + template;

        if (info.compras.length > 0) {
            template = "";
            info.compras.forEach((c: any) => {
                if (info.compras.indexOf(c) === 0) {
                    if (c.denoProv != null) {
                        template = this.com_inicioNP;
                    } else {
                        template = this.com_inicio;
                    }
                } else {
                    if (c.denoProv != null) {
                        template = this.com_inicio2NP;
                    } else {
                        template = this.com_inicio2;
                    }
                }
                template = template.replace('${codSus}', c.codSus);
                template = template.replace('${tipoId}', c.tipoId);
                template = template.replace('${identificaion}', c.identificaion);
                template = template.replace('${tipoComp}', c.tipoComp);
                if (c.denoProv != null) {
                    template = template.replace('${tipoProv}', c.tipoProv);
                    template = template.replace('${denoProv}', this.uf_reemplazarCaracteresEspeciales(c.denoProv));
                }
                template = template.replace('${parteRel}', c.parteRel);
                template = template.replace('${fecRegistro}', c.fecRegistro);
                template = template.replace('${estab}', c.estab);
                template = template.replace('${punto}', c.punto);
                template = template.replace('${numero}', c.numero);
                template = template.replace('${fecEmi}', c.fecEmi);
                template = template.replace('${auto}', c.auto);
                template = template.replace('${baseNoIva}', c.baseNoIva);
                template = template.replace('${baseImpo}', c.baseImpo);
                template = template.replace('${baseImpoGrav}', c.baseImpoGrav);
                template = template.replace('${baseImpoExe}', c.baseImpoExe);
                template = template.replace('${montoIce}', c.montoIce);
                template = template.replace('${montoIva}', c.montoIva);
                template = template.replace('${valRetBi10}', c.valRetBi10);
                template = template.replace('${valRetSe20}', c.valRetSe20);
                template = template.replace('${valRetBi}', c.valRetBi);
                template = template.replace('${valRetSe}', c.valRetSe);
                template = template.replace('${valRetSe100}', c.valRetSe100);
                template = template.replace('${totBaseImpRee}', c.totBaseImpRee);
                template = template.replace('${pagoLocExt}', c.pagoLocExt);
                template = template.replace('${pais}', c.pais);
                template = template.replace('${aplicaConv}', c.aplicaConv);
                template = template.replace('${pagoExtSuj}', c.pagoExtSuj);
                template = template.replace('${pagoRegFis}', c.pagoRegFis);
                general = general + template;

                if (c.fPago1 != null && c.fPago2 != null && c.fPago3 != null && c.fPago4 != null && c.fPago5 != null) {
                    template = this.com_fpagos5;
                    template = template.replace('${fPago1}', c.fPago1);
                    template = template.replace('${fPago2}', c.fPago2);
                    template = template.replace('${fPago2}', c.fPago3);
                    template = template.replace('${fPago4}', c.fPago4);
                    template = template.replace('${fPago5}', c.fPago5);
                    general = general + template;
                } else
                    if (c.fPago1 != null && c.fPago2 != null && c.fPago3 != null && c.fPago4 != null) {
                        template = this.com_fpagos4;
                        template = template.replace('${fPago1}', c.fPago1);
                        template = template.replace('${fPago2}', c.fPago2);
                        template = template.replace('${fPago2}', c.fPago3);
                        template = template.replace('${fPago4}', c.fPago4);
                        general = general + template;
                    } else
                        if (c.fPago1 != null && c.fPago2 != null && c.fPago3 != null) {
                            template = this.com_fpagos3;
                            template = template.replace('${fPago1}', c.fPago1);
                            template = template.replace('${fPago2}', c.fPago2);
                            template = template.replace('${fPago2}', c.fPago3);
                            general = general + template;
                        } else
                            if (c.fPago1 != null && c.fPago2 != null) {
                                template = this.com_fpagos2;
                                template = template.replace('${fPago1}', c.fPago1);
                                template = template.replace('${fPago2}', c.fPago2);
                                general = general + template;
                            } else
                                if (c.fPago1 != null) {
                                    template = this.com_fpagos;
                                    template = template.replace('${fPago1}', c.fPago1);
                                    general = general + template;
                                }
                try {
                    if (c.air.length > 0 && c.air != undefined) {
                        c.air.forEach((a: any) => {
                            if (c.air.indexOf(a) === 0) {
                                template = this.com_air;
                            }
                            else {
                                template = this.com_air2;
                            }
                            template = template.replace('${codRet}', a.codRet);
                            template = template.replace('${baseImpRet}', a.baseImpRet);
                            template = template.replace('${porcRet}', a.porcRet);
                            template = template.replace('${valRet}', a.valRet);
                            general = general + template;
                        });
                        template = this.com_fin_air;
                        general = general + template;
                    } else {
                        template = this.com_sinair;
                        general = general + template;
                    }
                } catch (e) {
                    template = this.com_sinair;
                    general = general + template;
                }


                if (c.estabRet != null) {
                    template = this.com_rete;

                    template = template.replace('${estabRet}', c.estabRet);
                    template = template.replace('${puntoRet}', c.puntoRet);
                    template = template.replace('${numRet}', c.numRet);
                    template = template.replace('${autRet}', c.autRet);
                    template = template.replace('${fecEmiRet}', c.fecEmiRet);

                    general = general + template;
                }

                if (c.estabRet1 != null) {
                    template = this.com_rete2;

                    template = template.replace('${estabRet1}', c.estabRet1);
                    template = template.replace('${puntoRet1}', c.puntoRet1);
                    template = template.replace('${numRet1}', c.numRet1);
                    template = template.replace('${autRet1}', c.autRet1);
                    template = template.replace('${fecEmiRet1}', c.fecEmiRet1);

                    general = general + template;
                }

                if (c.tipoComp === "04" || c.tipoComp === "05") {
                    template = this.com_docModif;

                    template = template.replace('${tipoCompMod}', c.tipoCompMod);
                    template = template.replace('${serieMod}', c.serieMod);
                    template = template.replace('${puntoMod}', c.puntoMod);
                    template = template.replace('${numMod}', c.numMod);
                    template = template.replace('${autMod}', c.autMod);

                    general = general + template;

                }

                if (c.reembolso.length > 0) {
                    c.reembolso.forEach((r: any) => {


                        if (c.reembolso.indexOf(r) === 0) {
                            template = this.com_reembolso;
                        }
                        else {
                            template = this.com_reembolso2;
                        }

                        template = template.replace('${tipoCompRe}', r.tipoCompRe);
                        template = template.replace('${tipoIdRe}', r.tipoIdRe);
                        template = template.replace('${identRe}', r.identRe);
                        template = template.replace('${estabRe}', r.estabRe);
                        template = template.replace('${puntoRe}', r.puntoRe);
                        template = template.replace('${numRe}', r.numRe);
                        template = template.replace('${fecEmiRe}', r.fecEmiRe);
                        template = template.replace('${autRe}', r.autRe);
                        template = template.replace('${baseImpRe}', r.baseImpRe);
                        template = template.replace('${baseImpGravRe}', r.baseImpGravRe);
                        template = template.replace('${baseNoGravRe}', r.baseNoGravRe);
                        template = template.replace('${baseImpExeRe}', r.baseImpExeRe);
                        template = template.replace('${montoIceRe}', r.montoIceRe);
                        template = template.replace('${montoIvaRe}', r.montoIvaRe);

                        general = general + template;
                    });
                    template = this.com_fin_reembolso;
                    general = general + template;
                }
                template = this.com_fin_detCom;
                general = general + template;
            });
            template = this.com_fin;
            general = general + template;
        }

        template = this.fin;
        general = general + template;

        return general;
    }

    generaXMLVentas(info: any) {
        var general: string = "";
        var template: string = this.inicio;
        template = template.replace('${tipoIdInf}', info.tipoIdInf);
        template = template.replace('${idInf}', info.idInf);
        template = template.replace('${razonSocialInf}', info.razonSocialInf);
        template = template.replace('${anio}', info.anio);
        template = template.replace('${mes}', (info.mes.toString().length === 1) ? "0" + info.mes.toString():info.mes.toString());
        template = template.replace('${numEstabRuc}', info.numEstabRuc);
        template = template.replace('${totalVentas}', info.totalVentas);

        general = general + template;

        if (info.ventas.length > 0) {
            info.ventas.forEach((v: any) => {
                if (info.ventas.indexOf(v) === 0) {
                    if (v.tipoCompVta === "18" || v.tipoCompVta === "05") {
                        if (v.denoCli != null) {
                            template = this.vta_inicio;
                        }
                        else {
                            template = this.vta_inicioSinDeno;
                        }
                    }
                    else {
                        if (v.denoCli != null) {
                            template = this.vta_inicioSinFP;
                        }
                        else {
                            template = this.vta_inicioSinDenoSinFP;
                        }
                    }
                } else {
                    if (v.tipoCompVta === "18" || v.tipoCompVta === "05") {
                        if (v.denoCli != null) {
                            template = this.vta_inicio2;
                        }
                        else {
                            template = this.vta_inicioSinDeno2;
                        }
                    }
                    else {
                        if (v.denoCli != null) {
                            template = this.vta_inicio2SinFP;
                        }
                        else {
                            template = this.vta_inicioSinDeno2SinFP;
                        }
                    }
                }

                template = template.replace('${tipoIdCli}', v.tipoIdCli);
                template = template.replace('${identCli}', v.identCli);
                if (v.denoCli != null) {
                    template = template.replace('${denoCli}', v.denoCli);
                }
                template = template.replace('${tipoCompVta}', v.tipoCompVta);
                template = template.replace('${tipoEmi}', v.tipoEmi);
                template = template.replace('${numComp}', v.numComp);
                template = template.replace('${baseNoGrava}', v.baseNoGrava);
                template = template.replace('${baseImpo}', v.baseImpo);
                template = template.replace('${baseImpoGrava}', v.baseImpoGrava);
                template = template.replace('${montoIva}', v.montoIva);
                template = template.replace('${montoIce}', v.montoIce);
                template = template.replace('${valRetIva}', v.valRetIva);
                template = template.replace('${valRetRen}', v.valRetRen);
                template = template.replace('${fPago}', v.fPago);
                general = general + template;

            });
            template = this.vta_fin;
            general = general + template;

            if (info.ventasEstab.length > 0) {
                info.ventasEstab.forEach((ve: any) => {

                    if (info.ventasEstab.indexOf(ve) === 0) {
                        template = this.vta_estab;
                    }
                    else {
                        template = this.vta_estab2;
                    }
                    template = template.replace('${estabTot}', ve.estabTot);
                    template = template.replace('${totVtas}', ve.totVtas);
                    general = general + template;

                });

                template = this.vta_fin_estab;
                general = general + template;

            }
        }
        template = this.fin;
        general = general + template;

        return general;
    }
    uf_registraCompra(compra: any, linea: number, cC: any, ret: any[], retIva: any[]) {
        compra.ciacodigo = globales.cia;
        compra.scomanio = this.ne_anio;
        compra.scommes = this.ddw_mes;
        compra.scomsecuencia = linea;
        compra.ctcodigo = cC.sri_id_credito_trib;
        compra.tidcodigo = cC.pro_tipo_id;
        compra.tpscodigo = cC.tps_codigo;
        compra.scomparterel = cC.pr_parte_rel;
        compra.scomidproveedor = this.uf_reemplazarCaracteresEspeciales(cC.pro_cod_legal);
        compra.tcxpcodigo = cC.tcxp_codigo;
        compra.ccxpnumero = cC.ccxp_numero;
        compra.prcodigo = cC.pr_codigo;
        compra.prnombre = cC.pr_nombre;
        compra.scomseriecmbte = cC.sri_num_serie;
        compra.scompuntocmbte = cC.sri_num_serie_pnt;
        compra.scomnumfac = cC.ccxp_numero;
        compra.scomfechacmbtectble = cC.ccxp_fecha_docum;
        compra.scomfechacmbtevta = cC.sri_fechavtaprove;
        compra.scomnumautcmbte = cC.sri_num_autoriza;
        compra.scomfechacaducacmbte = cC.sri_fechacaducacmbte;

        var rete: any[] = ret.filter((x: any) => x.sri_id_credito_trib === compra.ctcodigo && x.op_tip_doc_ref === compra.tcxpcodigo && x.op_num_doc_ref === compra.ccxpnumero && x.codpro === compra.prcodigo);
        compra.tcocodigo = cC.tco_codigoSel === null ? cC.tco_codigo : cC.tco_codigoSel;
        if (compra.tcocodigo === null || compra.tcocodigo === "") {
            compra.tcocodigo = null;
            compra.errores.Add("Advertencia: Movimiento sin Tipo de Comprobante.");
        }

        if (this.iTipoEmpresa === "C") {
            compra.scombasecero = cC.basecero;
            compra.scombaseiva = cC.gravable;
            compra.scomvalorretiva100 = cC.retiva100;
            compra.scombasenoobjetoiva = cC.exento;
        }

        if (cC.total_imp1 === 0) {
            compra.scomvaloriva = 0;
            compra.scombaseiva = 0;
        }
        else {
            compra.scomvaloriva = cC.total_imp1;
        }
        var iva = "";

        if (cC.ccxp_por_impuesto === 0) {

            var datos: any[] = this.datosIvas.Table;

            iva = datos[0][0].ToString();
        }
        else {
            var datos: any[] = this.datosIvas.Table1;
            var aux = datos.filter((x) => x.iva_porcentaje === cC.ccxp_por_impuesto);
            iva = aux[0].resultado;
        }

        compra.ivacodigo = iva;

        if (rete.length > 0) {
            compra.scombaseimponiblerenta = 0;
            compra.scomvalorretrenta = 0;
            compra.scombaseimponiblerenta1 = 0;
            compra.scomvalorretrenta1 = 0;
            compra.scombaseimponiblerenta2 = 0;
            compra.scomvalorretrenta2 = 0;
            compra.scombaseimponiblerenta3 = 0;
            compra.scomvalorretrenta3 = 0;

            if (this.iTipoEmpresa != "C") {
                compra.scombasecero = 0;
                compra.scombaseiva = 0;
                compra.scombasenoobjetoiva = 0;
                compra.scombasecero1 = 0;
                compra.scombaseiva1 = 0;
                compra.scombasenoobjetoiva1 = 0;
                compra.scombasecero2 = 0;
                compra.scombaseiva2 = 0;
                compra.scombasenoobjetoiva2 = 0;
                compra.scombasecero3 = 0;
                compra.scombaseiva3 = 0;
                compra.scombasenoobjetoiva3 = 0;
            }

            rete.forEach((t) => {
                if (compra.trscodigo === null || compra.trscodigo === "" || compra.trscodigo === undefined) {
                    if (this.iTipoEmpresa === "C") {
                        compra.trscodigo = t.tre_codigo;
                        compra.trscodigoporcentaje = t.por_im;
                        compra.scombaseimponiblerenta += t.valor_nominal;
                        compra.scomvalorretrenta += t.imp_valor;
                    }
                    else {
                        compra.trscodigo = t.tre_codigo;
                        compra.trscodigoporcentaje = t.por_im;
                        compra.scombaseimponiblerenta += t.valor_nominal;
                        compra.scomvalorretrenta += t.imp_valor;
                        compra.scombasecero += t.sri_coml_base_iva_0 === null ? 0 : t.sri_coml_base_iva_0.Value;
                        compra.scombaseiva += t.sri_coml_base_objeto_iva === null ? 0 : t.sri_coml_base_objeto_iva.Value;
                        compra.scombasenoobjetoiva += t.sri_coml_base_noobjeto_iva === null ? 0 : t.sri_coml_base_noobjeto_iva.Value;
                    }
                }

                if (compra.trscodigo1 === null || compra.trscodigo1 === "" || compra.trscodigo1 === undefined) {
                    if (this.iTipoEmpresa === "C") {
                        compra.trscodigo1 = t.tre_codigo1;
                        compra.trscodigoporcentaje1 = t.por_im1;
                        compra.scombaseimponiblerenta1 += t.valor_nomi1;
                        compra.scomvalorretrenta1 += t.imp_valor1;
                    }
                    else {
                        compra.trscodigo1 = t.tre_codigo1;
                        compra.trscodigoporcentaje1 = t.por_im1;
                        compra.scombaseimponiblerenta1 += t.valor_nomi1;
                        compra.scomvalorretrenta1 += t.imp_valor1;
                        compra.scombasecero1 += t.sri_coml_base_iva_0_1 === null ? 0 : t.sri_coml_base_iva_0_1.Value;
                        compra.scombaseiva1 += t.sri_coml_base_objeto_iva_1 === null ? 0 : t.sri_coml_base_objeto_iva_1.Value;
                        compra.scombasenoobjetoiva1 += t.sri_coml_base_noobjeto_iva_1 === null ? 0 : t.sri_coml_base_noobjeto_iva_1.Value;
                    }
                }

                if (compra.trscodigo2 === null || compra.trscodigo2 === "" || compra.trscodigo2 === undefined) {
                    if (this.iTipoEmpresa === "C") {
                        compra.trscodigo2 = t.tre_codigo2;
                        compra.trscodigoporcentaje2 = t.por_im2;
                        compra.scombaseimponiblerenta2 += t.valor_nomi2;
                        compra.scomvalorretrenta2 += t.imp_valor2;
                    }
                    else {
                        compra.trscodigo2 = t.tre_codigo2;
                        compra.trscodigoporcentaje2 = t.por_im2;
                        compra.scombaseimponiblerenta2 += t.valor_nomi2;
                        compra.scomvalorretrenta2 += t.imp_valor2;
                        compra.scombasecero2 += t.sri_coml_base_iva_0_2 === null ? 0 : t.sri_coml_base_iva_0_2.Value;
                        compra.scombaseiva2 += t.sri_coml_base_objeto_iva_2 === null ? 0 : t.sri_coml_base_objeto_iva_2.Value;
                        compra.scombasenoobjetoiva2 += t.sri_coml_base_noobjeto_iva_2 === null ? 0 : t.sri_coml_base_noobjeto_iva_2.Value;
                    }
                }

                if (compra.trscodigo3 === null || compra.trscodigo3 === "" || compra.trscodigo3 === undefined) {
                    if (this.iTipoEmpresa === "C") {
                        compra.trscodigo3 = t.tre_codigo3;
                        compra.trscodigoporcentaje3 = t.por_im3;
                        compra.scombaseimponiblerenta3 += t.valor_nomi3;
                        compra.scomvalorretrenta3 += t.imp_valor3;
                    }
                    else {
                        compra.trscodigo3 = t.tre_codigo3;
                        compra.trscodigoporcentaje3 = t.por_im3;
                        compra.scombaseimponiblerenta3 += t.valor_nomi3;
                        compra.scomvalorretrenta3 += t.imp_valor3;
                        compra.scombasecero3 += t.sri_coml_base_iva_0_3 === null ? 0 : t.sri_coml_base_iva_0_3.Value;
                        compra.scombaseiva3 += t.sri_coml_base_objeto_iva_3 === null ? 0 : t.sri_coml_base_objeto_iva_3.Value;
                        compra.scombasenoobjetoiva3 += t.sri_coml_base_noobjeto_iva_3 === null ? 0 : t.sri_coml_base_noobjeto_iva_3.Value;
                    }
                }

                //limpio los campos
                if (t.tre_codigo === null || t.tre_codigo === "" || t.tre_codigo === undefined) {
                    compra.trscodigo = null;
                    compra.trscodigoporcentaje = null;
                    compra.scombaseimponiblerenta = null;
                    compra.scomvalorretrenta = null;
                    compra.scombasecero = 0;
                    compra.scombaseiva = 0;
                    compra.scombasenoobjetoiva = null;
                }

                if (t.tre_codigo1 === null || t.tre_codigo1 === "" || t.tre_codigo1 === undefined) {
                    compra.trscodigo1 = null;
                    compra.trscodigoporcentaje1 = null;
                    compra.scombaseimponiblerenta1 = null;
                    compra.scomvalorretrenta1 = null;
                    compra.scombasecero1 = 0;
                    compra.scombaseiva1 = 0;
                    compra.scombasenoobjetoiva1 = null;
                }

                if (t.tre_codigo2 === null || t.tre_codigo2 === "" || t.tre_codigo2 === undefined) {
                    compra.trscodigo2 = null;
                    compra.trscodigoporcentaje2 = null;
                    compra.scombaseimponiblerenta2 = null;
                    compra.scomvalorretrenta2 = null;
                    compra.scombasecero2 = 0;
                    compra.scombaseiva2 = 0;
                    compra.scombasenoobjetoiva2 = null;
                }

                if (t.tre_codigo3 === null || t.tre_codigo3 === "" || t.tre_codigo3 === undefined) {
                    compra.trscodigo3 = null;
                    compra.trscodigoporcentaje3 = null;
                    compra.scombaseimponiblerenta3 = null;
                    compra.scomvalorretrenta3 = null;
                    compra.scombasecero3 = 0;
                    compra.scombaseiva3 = 0;
                    compra.scombasenoobjetoiva3 = null;
                }
            });

        }

        if (compra.ctcodigo === null) {
            compra.ctcodigo = "";
        }
        var retenIva: any[] = retIva.filter((x) => x.tcxp_codigo === compra.tcxpcodigo && x.ccxp_numero === compra.ccxpnumero && x.pr_codigo === compra.prcodigo);

        if (retenIva.length > 0) {
            var bandera: number = 0;

            retenIva.forEach((rI) => {
                if (rI.dret_por_im != 100) {
                    if (rI.ic_tipo != "S") {
                        if (bandera === 0) {
                            compra.scomvalorivabienes = rI.dret_valor_nominal;
                            compra.scomvalorretivabienes = rI.dret_valor;
                            compra.rivcodigobienes = rI.riv_codigo;
                            bandera = bandera + 1;
                        }
                        else {
                            compra.scomvalorivabienes2 = rI.dret_valor_nominal;
                            compra.scomvalorretivabienes2 = rI.dret_valor;
                            compra.rivcodigobienes2 = rI.riv_codigo;
                        }
                    }
                    else {
                        compra.scomvalorivaservicios = rI.dret_valor_nominal;
                        compra.scomvalorretivaservicios = rI.dret_valor;
                        compra.rivcodigoservicios = rI.riv_codigo;
                    }
                }
                else {
                    if (rI.ic_tipo != "S") {
                        compra.scomvalorivabienes = rI.dret_valor_nominal;
                        compra.scomvalorretivabienes = rI.dret_valor;
                        compra.rivcodigobienes = rI.riv_codigo;
                    }
                    else {
                        compra.scomvalorivaservicios = rI.dret_valor_nominal;
                        compra.scomvalorretivaservicios = rI.dret_valor;
                        compra.rivcodigoservicios = rI.riv_codigo;
                    }
                    compra.scomvalorretiva100 = rI.dret_valor;
                }
            });
        }
        if ((compra.trscodigo != null || compra.trscodigo != "") && compra.trscodigo === "332" && (compra.trscodigo1 === null || compra.trscodigo1 === "") && (compra.rivcodigobienes === null || compra.rivcodigobienes === "") && (compra.rivcodigoservicios === null || compra.rivcodigoservicios === "") && cC.sri_numcbte_ret === null) {
            compra.scomseriecmbteret = null;
            compra.scompuntocmbteret = null;
            compra.scomnumcmbteret = null;
            compra.scomautocmbteret = null;
            compra.scomfeccmbteret = null;
        }
        else {
            compra.scomseriecmbteret = cC.sri_serie_cmbte_ret;
            compra.scompuntocmbteret = cC.sri_serie_cmbte_ret_pnt;
            compra.scomnumcmbteret = cC.sri_numcbte_ret;
            compra.scomautocmbteret = cC.sri_autocombte_ret;
            compra.scomfeccmbteret = cC.sri_fecemicbte_ret;
        }

        compra.tppcodigo = cC.tpp_codigo === null ? "01" : cC.tpp_codigo;
        compra.pscodigo = cC.ps_codigo;
        compra.scomconvdobtrib = cC.dsc_conve_dobletrib;
        compra.scompagextsujret = cC.dsc_pagoext_sujetoret;
        compra.fpscodigo1 = cC.fps_codigo1;
        compra.fpscodigo2 = cC.fps_codigo2;
        compra.fpscodigo3 = cC.fps_codigo3;
        compra.fpscodigo4 = cC.fps_codigo4;
        compra.fpscodigo5 = cC.fps_codigo5;

        compra.icecodigo = "0";
        compra.scombaseice = 0;
        compra.scomvalorice = 0;

        return true;


    }


    uf_registraCompraNC(compra: any, linea: number, cN: any, cruce: any[], ret: any[], retIva: any[]) {
        compra.ciacodigo = globales.cia;
        compra.scomanio = this.ne_anio;
        compra.scommes = this.ddw_mes;
        compra.scomsecuencia = linea;
        compra.ctcodigo = (cN.sri_id_credito_trib === null ? (cN.sri_id_credito_trib_gastos === null ? "01" : cN.sri_id_credito_trib_gastos) : cN.sri_id_credito_trib);
        compra.tidcodigo = cN.pro_tipo_id;
        compra.tpscodigo = cN.tps_codigo;
        compra.scomparterel = cN.pr_parte_rel;
        compra.scomidproveedor = this.uf_reemplazarCaracteresEspeciales(cN.pro_cod_legal);
        compra.tcxpcodigo = cN.tcxp_codigo;
        compra.ccxpnumero = cN.ccxp_numero;
        compra.prcodigo = cN.pr_codigo;
        compra.scomseriecmbte = cN.sri_num_serie;
        compra.scompuntocmbte = cN.sri_num_serie_pnt;
        compra.scomnumfac = cN.ccxp_numero;
        compra.scomfechacmbtectble = cN.ccxp_fecha_docum;
        compra.scomfechacmbtevta = cN.sri_fechavtaprove.Value;
        compra.scomnumautcmbte = cN.sri_num_autoriza;
        compra.scomfechacaducacmbte = cN.sri_fechacaducacmbte;


        var rete: any[] = ret.filter((x: any) => x.sri_id_credito_trib === compra.ctcodigo && x.op_tip_doc_ref === compra.tcxpcodigo && x.op_num_doc_ref === compra.ccxpnumero && x.codpro === compra.prcodigo);
        compra.tcocodigo = cN.tco_codigoSel === null ? cN.tco_codigo : cN.tco_codigoSel;
        if (compra.tcocodigo === null || compra.tcocodigo === "") {
            compra.tcocodigo = null;
            compra.errores.Add("Advertencia: Movimiento sin Tipo de Comprobante.");
        }

        if (this.iTipoEmpresa === "C") {
            compra.scombasecero = cN.basecero;
            compra.scombaseiva = cN.gravable;
            compra.scomvalorretiva100 = cN.retiva100;
            compra.scombasenoobjetoiva = cN.exento;
        }

        if (cN.total_imp1 == 0) {
            compra.scomvaloriva = 0;
            compra.scombaseiva = 0;
        }
        else {
            compra.scomvaloriva = cN.total_imp1;
        }
        var iva = "";

        if (cN.ccxp_por_impuesto === 0) {

            var datos: any[] = this.datosIvas.Table;

            iva = datos[0][0].ToString();
        }
        else {
            var datos: any[] = this.datosIvas.Table1;
            var aux = datos.filter((x) => x.iva_porcentaje === cN.ccxp_por_impuesto);
            iva = aux[0].resultado;
        }


        compra.ivacodigo = iva;

        if (rete.length > 0) {
            compra.scombaseimponiblerenta = 0;
            compra.scomvalorretrenta = 0;
            compra.scombaseimponiblerenta1 = 0;
            compra.scomvalorretrenta1 = 0;
            compra.scombaseimponiblerenta2 = 0;
            compra.scomvalorretrenta2 = 0;
            compra.scombaseimponiblerenta3 = 0;
            compra.scomvalorretrenta3 = 0;

            if (this.iTipoEmpresa != "C") {
                compra.scombasecero = 0;
                compra.scombaseiva = 0;
                compra.scombasenoobjetoiva = 0;
                compra.scombasecero1 = 0;
                compra.scombaseiva1 = 0;
                compra.scombasenoobjetoiva1 = 0;
                compra.scombasecero2 = 0;
                compra.scombaseiva2 = 0;
                compra.scombasenoobjetoiva2 = 0;
                compra.scombasecero3 = 0;
                compra.scombaseiva3 = 0;
                compra.scombasenoobjetoiva3 = 0;
            }

            rete.forEach((t) => {
                if (compra.trscodigo === null || compra.trscodigo === "" || compra.trscodigo === undefined) {
                    if (this.iTipoEmpresa === "C") {
                        compra.trscodigo = t.tre_codigo;
                        compra.trscodigoporcentaje = t.por_im;
                        compra.scombaseimponiblerenta += t.valor_nominal;
                        compra.scomvalorretrenta += t.imp_valor;
                    }
                    else {
                        compra.trscodigo = t.tre_codigo;
                        compra.trscodigoporcentaje = t.por_im;
                        compra.scombaseimponiblerenta += t.valor_nominal;
                        compra.scomvalorretrenta += t.imp_valor;
                        compra.scombasecero += t.sri_coml_base_iva_0 === null ? 0 : t.sri_coml_base_iva_0.Value;
                        compra.scombaseiva += t.sri_coml_base_objeto_iva === null ? 0 : t.sri_coml_base_objeto_iva.Value;
                        compra.scombasenoobjetoiva += t.sri_coml_base_noobjeto_iva === null ? 0 : t.sri_coml_base_noobjeto_iva.Value;
                    }
                }

                if (compra.trscodigo1 === null || compra.trscodigo1 === "" || compra.trscodigo1 === undefined) {
                    if (this.iTipoEmpresa === "C") {
                        compra.trscodigo1 = t.tre_codigo1;
                        compra.trscodigoporcentaje1 = t.por_im1;
                        compra.scombaseimponiblerenta1 += t.valor_nomi1;
                        compra.scomvalorretrenta1 += t.imp_valor1;
                    }
                    else {
                        compra.trscodigo1 = t.tre_codigo1;
                        compra.trscodigoporcentaje1 = t.por_im1;
                        compra.scombaseimponiblerenta1 += t.valor_nomi1;
                        compra.scomvalorretrenta1 += t.imp_valor1;
                        compra.scombasecero1 += t.sri_coml_base_iva_0_1 === null ? 0 : t.sri_coml_base_iva_0_1.Value;
                        compra.scombaseiva1 += t.sri_coml_base_objeto_iva_1 === null ? 0 : t.sri_coml_base_objeto_iva_1.Value;
                        compra.scombasenoobjetoiva1 += t.sri_coml_base_noobjeto_iva_1 === null ? 0 : t.sri_coml_base_noobjeto_iva_1.Value;
                    }
                }

                if (compra.trscodigo2 === null || compra.trscodigo2 === "" || compra.trscodigo2 === undefined) {
                    if (this.iTipoEmpresa == "C") {
                        compra.trscodigo2 = t.tre_codigo2;
                        compra.trscodigoporcentaje2 = t.por_im2;
                        compra.scombaseimponiblerenta2 += t.valor_nomi2;
                        compra.scomvalorretrenta2 += t.imp_valor2;
                    }
                    else {
                        compra.trscodigo2 = t.tre_codigo2;
                        compra.trscodigoporcentaje2 = t.por_im2;
                        compra.scombaseimponiblerenta2 += t.valor_nomi2;
                        compra.scomvalorretrenta2 += t.imp_valor2;
                        compra.scombasecero2 += t.sri_coml_base_iva_0_2 === null ? 0 : t.sri_coml_base_iva_0_2.Value;
                        compra.scombaseiva2 += t.sri_coml_base_objeto_iva_2 === null ? 0 : t.sri_coml_base_objeto_iva_2.Value;
                        compra.scombasenoobjetoiva2 += t.sri_coml_base_noobjeto_iva_2 === null ? 0 : t.sri_coml_base_noobjeto_iva_2.Value;
                    }
                }

                if (compra.trscodigo3 === null || compra.trscodigo3 === "" || compra.trscodigo3 === undefined) {
                    if (this.iTipoEmpresa == "C") {
                        compra.trscodigo3 = t.tre_codigo3;
                        compra.trscodigoporcentaje3 = t.por_im3;
                        compra.scombaseimponiblerenta3 += t.valor_nomi3;
                        compra.scomvalorretrenta3 += t.imp_valor3;
                    }
                    else {
                        compra.trscodigo3 = t.tre_codigo3;
                        compra.trscodigoporcentaje3 = t.por_im3;
                        compra.scombaseimponiblerenta3 += t.valor_nomi3;
                        compra.scomvalorretrenta3 += t.imp_valor3;
                        compra.scombasecero3 += t.sri_coml_base_iva_0_3 === null ? 0 : t.sri_coml_base_iva_0_3.Value;
                        compra.scombaseiva3 += t.sri_coml_base_objeto_iva_3 === null ? 0 : t.sri_coml_base_objeto_iva_3.Value;
                        compra.scombasenoobjetoiva3 += t.sri_coml_base_noobjeto_iva_3 === null ? 0 : t.sri_coml_base_noobjeto_iva_3.Value;
                    }
                }

                //limpio los campos
                if (t.tre_codigo === null || t.tre_codigo === "" || t.tre_codigo === undefined) {
                    compra.trscodigo = null;
                    compra.trscodigoporcentaje = null;
                    compra.scombaseimponiblerenta = null;
                    compra.scomvalorretrenta = null;
                    compra.scombasecero = 0;
                    compra.scombaseiva = 0;
                    compra.scombasenoobjetoiva = null;
                }

                if (t.tre_codigo1 === null || t.tre_codigo1 === "" || t.tre_codigo1 === undefined) {
                    compra.trscodigo1 = null;
                    compra.trscodigoporcentaje1 = null;
                    compra.scombaseimponiblerenta1 = null;
                    compra.scomvalorretrenta1 = null;
                    compra.scombasecero1 = 0;
                    compra.scombaseiva1 = 0;
                    compra.scombasenoobjetoiva1 = null;
                }

                if (t.tre_codigo2 === null || t.tre_codigo2 === "" || t.tre_codigo2 === undefined) {
                    compra.trscodigo2 = null;
                    compra.trscodigoporcentaje2 = null;
                    compra.scombaseimponiblerenta2 = null;
                    compra.scomvalorretrenta2 = null;
                    compra.scombasecero2 = 0;
                    compra.scombaseiva2 = 0;
                    compra.scombasenoobjetoiva2 = null;
                }

                if (t.tre_codigo3 === null || t.tre_codigo3 === "" || t.tre_codigo3 === undefined) {
                    compra.trscodigo3 = null;
                    compra.trscodigoporcentaje3 = null;
                    compra.scombaseimponiblerenta3 = null;
                    compra.scomvalorretrenta3 = null;
                    compra.scombasecero3 = 0;
                    compra.scombaseiva3 = 0;
                    compra.scombasenoobjetoiva3 = null;
                }
            });
        }

        if (compra.ctcodigo === null) {
            compra.ctcodigo = "";
        }

        var retenIva: any[] = retIva.filter((x) => x.tcxp_codigo === compra.tcxpcodigo && x.ccxp_numero === compra.ccxpnumero && x.pr_codigo === compra.prcodigo && x.id_credito_trib === compra.ctcodigo);

        if (retenIva.length > 0) {
            retenIva.forEach((rI) => {
                if (rI.dret_por_im != 100) {
                    if (rI.ic_tipo != "S") {
                        compra.scomvalorivabienes = rI.dret_valor_nominal;
                        compra.scomvalorretivabienes = rI.dret_valor;
                        compra.rivcodigobienes = rI.riv_codigo;
                    }
                    else {
                        compra.scomvalorivaservicios = rI.dret_valor_nominal;
                        compra.scomvalorretivaservicios = rI.dret_valor;
                        compra.rivcodigoservicios = rI.riv_codigo;
                    }
                }
                else {
                    if (rI.ic_tipo != "S") {
                        compra.scomvalorivabienes = rI.dret_valor_nominal;
                        compra.scomvalorretivabienes = rI.dret_valor;
                        compra.rivcodigobienes = rI.riv_codigo;
                    }
                    else {
                        compra.scomvalorivaservicios = rI.dret_valor_nominal;
                        compra.scomvalorretivaservicios = rI.dret_valor;
                        compra.rivcodigoservicios = rI.riv_codigo;
                    }
                    compra.scomvalorretiva100 = rI.dret_valor;
                }
            });
        }

        if ((compra.trscodigo != null || compra.trscodigo != "") && compra.trscodigo === "332" && (compra.trscodigo1 === null || compra.trscodigo1 === "") && (compra.rivcodigobienes === null || compra.rivcodigobienes === "") && (compra.rivcodigoservicios === null || compra.rivcodigoservicios === "")) {
            compra.scomseriecmbteret = null;
            compra.scompuntocmbteret = null;
            compra.scomnumcmbteret = null;
            compra.scomautocmbteret = null;
            compra.scomfeccmbteret = null;
        }
        else {
            compra.scomseriecmbteret = cN.sri_serie_cmbte_ret;
            compra.scompuntocmbteret = cN.sri_serie_cmbte_ret_pnt;
            compra.scomnumcmbteret = cN.sri_numcbte_ret;
            compra.scomautocmbteret = cN.sri_autocombte_ret;
            compra.scomfeccmbteret = cN.sri_fecemicbte_ret;
        }

        compra.tppcodigo = cN.tpp_codigo === null ? "01" : cN.tpp_codigo;
        compra.pscodigo = cN.ps_codigo;
        compra.scomconvdobtrib = cN.dsc_conve_dobletrib;
        compra.scompagextsujret = cN.dsc_pagoext_sujetoret;
        compra.fpscodigo1 = cN.fps_codigo1;
        compra.fpscodigo2 = cN.fps_codigo2;
        compra.fpscodigo3 = cN.fps_codigo3;
        compra.fpscodigo4 = cN.fps_codigo4;
        compra.fpscodigo5 = cN.fps_codigo5;

        compra.icecodigo = "0";
        compra.scombaseice = 0;
        compra.scomvalorice = 0;

        //Datos de documento relacionado
        compra.tcocodigomodif = cN.srifa_tipo_cmbte;
        compra.tcxpcodigomodif = (cN.ccxp_tip_doc_rel === "" ? null : cN.ccxp_tip_doc_rel);
        compra.ccxpnumeromodif = (cN.ccxp_num_doc_rel === "" ? null : cN.ccxp_num_doc_rel);
        compra.scomseriecmbtemodif = cN.srifa_num_serie;
        compra.scompuntocmbtemodif = cN.srifa_num_punto;
        compra.scomnumautocmbtemodif = cN.srifa_num_autoriza;
        if (cN.ccxp_num_doc_rel != null) {
            compra.scomnumcbtemodif = cN.ccxp_num_doc_rel;
        }

        if (compra.ctcodigo == null || compra.ctcodigo == "") {
            compra.ctcodigo = cN.trib == null ? cN.trib_gasto : cN.trib;
        }

        if (compra.tcxpcodigomodif == null || compra.tcxpcodigomodif == "") {
            var liIndex: number = cruce.findIndex((x) => x.tcxp_codigo === compra.tcxpcodigo && x.ccxp_numero === compra.ccxpnumero && x.aux_codigo === compra.prcodigo);

            if (liIndex > 0) {
                compra.tcocodigomodif = cruce[liIndex].srifa_tipo_cmbte;
                compra.tcxpcodigomodif = cruce[liIndex].tcxp_codigo_cr;
                compra.ccxpnumeromodif = cruce[liIndex].ccxp_numero_cr;
                compra.scomseriecmbtemodif = cruce[liIndex].srifa_num_serie;
                compra.scompuntocmbtemodif = cruce[liIndex].srifa_num_punto;
                compra.scomnumautocmbtemodif = cruce[liIndex].srifa_num_autoriza;
                compra.scomnumcbtemodif = cruce[liIndex].ccxp_numero_cr;

                if (compra.ctcodigo === null || compra.ctcodigo === "") {
                    compra.ctcodigo = cruce[liIndex].trib == null ? cruce[liIndex].trib_gasto : cruce[liIndex].trib;
                }
            }
        }

        if (compra.tcocodigomodif === null || compra.tcocodigomodif === "") {
            compra.tcocodigomodif = null;

            compra.errores.push("Advertencia: Movimiento Relacionado sin Tipo de Comprobante.");
        }

        return true;
    }

    uf_registraVenta(venta: any, linea: number, eV: any, ret: any[]) {

        venta.ciacodigo = globales.cia;
        venta.sveanio = this.ne_anio;
        venta.svemes = this.ddw_mes;
        venta.svesecuncia = linea;
        venta.tidcodigo = eV.tid_codigo;
        venta.tcocodigo = eV.tco_codigo;
        venta.svetipoemision = eV.emision;
        venta.svefpago = eV.fps_codigo;

        var iva = "";
        var datos: any[] = this.datosIvas.Table1;
        var aux = datos.filter((x) => x.iva_porcentaje === eV.cav_porc_impuesto1);
        iva = aux[0].resultado;

        venta.ivacodigo = iva;
        venta.clcodigo = eV.cl_codigo;
        venta.fpcodigo = eV.fps_codigo;
        venta.svenumidcliente = eV.cl_cod_legal;
        venta.svecantfacemitidas = eV.num_docs;
        venta.svebasecero = eV.exento;
        venta.svevalorbaseiva = eV.base_objeto_iva;
        venta.svevaloriva = eV.monto_iva;
        venta.svevalorbaseice = 0;
        venta.svevalorice = 0;
        venta.svevalorivabienes = 0;
        venta.svevalorivaservicios = 0;
        venta.svevalorretivabienes = 0;
        venta.svevalorretivaservicios = 0;
        venta.svebaserenta = 0;
        venta.svevalorretrenta = 0;
        venta.svenomcliente = eV.nom_cli.length > 80 ? eV.nom_cli.substr(0, 80) : eV.nom_cli;
        venta.svebaserenta1 = 0;
        venta.svevalorretrenta1 = 0;
        venta.svebaserenta2 = 0;
        venta.svevalorretrenta2 = 0;
        venta.svebaserenta3 = 0;
        venta.svevalorretrenta3 = 0;
        venta.svebasenoobjetoiva = eV.base_iva_0;
        venta.svevmrentasretenido = 0;
        venta.svevmivaretenido = 0;


        var reten: any[] = ret.filter((x) => x.cl_cod_legal === venta.svenumidcliente && x.tco_codigo === venta.tcocodigo);

        if (reten != null) {
            if (reten.length > 0) {
                reten.forEach((v) => {
                    if (v.ic_aplica == "M") {
                        venta.svevmrentasretenido += v.vm_nominal;
                    }
                    else {
                        venta.svevmivaretenido += v.vm_nominal;
                    }
                });
            }
        }

        return true;
    }


    uf_reemplazarCaracteresEspeciales(origen: string) {


        var destino: string = "";
        var listCaracteres: string[] = [];
        for (var i = 0; i < origen.length; i++) {
            listCaracteres.push(origen[i].toString());
        }

        for (var i = 0; i < listCaracteres.length; i++) {
            for (var j = 0; j < this.caracteres.length; j = j + 2) {
                if (listCaracteres[i] === this.caracteres[j]) {
                    listCaracteres[i] = listCaracteres[i].replace(listCaracteres[i], this.caracteres[j + 1]);
                    j = this.caracteres.length + 1;
                }
            }
        }

        for (var i = 0; i < listCaracteres.length; i++) {
            destino = destino + listCaracteres[i];
        }

        return destino;
    }


    uf_prepara(mes: number, anio: number, tipoId: string, compra: any, venta: any, vtasEstab: any[], reembolsos: any[]) {
        var retorno: any = {};
        var datodescrip: any = globales.ciaDescrip;
        retorno.tipoIdInf = tipoId;
        retorno.idInf = globales.ciaRuc;
        retorno.razonSocialInf = datodescrip.replaceAll(".", "");
        retorno.anio = anio;
        retorno.mes = Funcion.zeroFill(mes.toString(), 2); 
        try {
            retorno.numEstabRuc = vtasEstab[0].estab;
        } catch (e) {
            retorno.numEstabRuc = "001";
        }
        try {
            retorno.totalVentas = vtasEstab.reduce((prev: any, next: any) => prev + parseFloat(next.ventas), 0).toString()
        } catch (e) {
            retorno.totalVentas = "0.00";
        }
        
        try {
            if (retorno.compras === null || retorno.compras === undefined) {
                retorno.compras = [];
            }
        } catch (e) {
            retorno.compras = [];
        }

        if (compra != null) {
            retorno.compras.push(this.uf_compras(compra, reembolsos));
        }
        try {
            if (retorno.ventas === null || retorno.ventas === undefined) {
                retorno.ventas = [];
            }
        } catch (e) {
            retorno.ventas = [];
        }
        if (venta != null) {
            retorno.ventas.push(this.uf_ventas(venta));
            try {
                if (retorno.ventasEstab === null || retorno.ventasEstab === undefined) {
                    retorno.ventasEstab = [];
                }
            } catch (e) {
                retorno.ventasEstab = [];
            }
            vtasEstab.forEach((tV) => {
                retorno.ventasEstab.push(this.uf_ventasEstab(tV))
            });
        }
        return retorno;
    }
    uf_obtieneReembolsos(tipoDoc: string, numDoc: string, prove: string) {
        var response: any[] = [];
        var datos: any[] = this.datosIvas.Table2;
        try {
            response = datos.filter((x) => x.ciacodigo === globales.cia && x.tcxpcodigo === (tipoDoc === null ? "" : tipoDoc) && x.ccxpnumero === (numDoc == null ? "" : numDoc) && x.prcodigo === prove);
        } catch (e) {
            response = [];
        }
        if (response.length === 0) {
            return [];
        }
        var model: any[] = [];
        if (response != null) {
            model = this.createListFromTable2(response);
        }
        var reem = model;
        return reem;
    }
    createListFromTable2(response: any[]) {
        let retorno: any[] = [];

        response.forEach((item) => {
            let linea: any = {};
            linea.ciacodigo = item.ciacodigo;
            linea.tcxpcodigo = item.tcxpcodigo;
            linea.ccxpnumero = item.ccxpnumero;
            linea.prcodigo = item.prcodigo;
            linea.rsclinea = parseInt(item.rsclinea);
            linea.prcodigosoporte = item.prcodigosoporte;
            linea.tidcodigo = item.tidcodigo;
            linea.rsccodlegal = item.rsccodlegal;
            linea.tcocodigo = item.tcocodigo;
            linea.rscserie = item.rscserie;
            linea.rscpntoemision = item.rscpntoemision;
            linea.rscsecuencial = parseInt(item.rscsecuencial);
            linea.rscautorizacion = item.rscautorizacion;
            linea.rscfechadoc = item.rscfechadoc;
            linea.rscexento = parseFloat(item.rscexento);
            linea.rscbaseiva0 = parseFloat(item.rscbaseiva0);
            linea.rscbaseobjetoiva = parseFloat(item.rscbaseobjetoiva);
            linea.rsctotalimp = parseFloat(item.rsctotalimp);
            linea.rscvalice = parseFloat(item.rscvalice);
            linea.prnombre = item.prnombre;
            retorno.push(linea);
        });

        return retorno;
    }
    uf_compras(compra: any, reembolsos: any[]) {
        var retorno: any = {};
        retorno.reembolso = [];
        let totalreembolso: number = 0;

        retorno.codSus = compra.ctcodigo;
        retorno.tipoId = this.uf_obtieneCodSriId(compra.tidcodigo);
        retorno.identificaion = compra.scomidproveedor;
        retorno.tipoComp = compra.tcocodigo;

        if (compra.tidcodigo == "P") {
            retorno.tipoProv = compra.tpscodigo;
            retorno.denoProv = compra.txt_nomPro;
        }

        retorno.parteRel = compra.scomparterel === "S" ? "SI" : "NO";
        retorno.fecRegistro = Funcion.FormatoFecha2(compra.scomfechacmbtectble);
        retorno.estab = (compra.scomseriecmbte === null ? null : compra.scomseriecmbte);
        retorno.punto = (compra.scompuntocmbte === null ? null : compra.scompuntocmbte);
        retorno.numero = compra.scomnumfac;
        retorno.fecEmi = Funcion.FormatoFecha2(compra.scomfechacmbtevta);
        retorno.auto = (compra.scomnumautcmbte === null ? null : compra.scomnumautcmbte);
        retorno.baseNoIva = parseFloat(compra.scombasenoobjetoiva).toFixed(2);
        retorno.baseImpo = parseFloat(compra.scombasecero).toFixed(2);
        retorno.baseImpoGrav = parseFloat(compra.scombaseiva).toFixed(2);
        retorno.baseImpoExe = "0.00";
        retorno.montoIce = parseFloat(compra.scomvalorice).toFixed(2);
        retorno.montoIva = parseFloat(compra.scomvaloriva).toFixed(2);

        if (compra.scomvalorretiva100 > 0) {
            retorno.valRetBi10 = "0.00";
            retorno.valRetSe20 = "0.00";
            retorno.valRetBi = "0.00";
            retorno.valRetSe = "0.00";
            retorno.valRetSe100 = parseFloat(compra.scomvalorretiva100).toFixed(2);
        }
        else {
            if (compra.rivcodigobienes === "4") {
                retorno.valRetBi10 = parseFloat(compra.scomvalorretivabienes).toFixed(2);
            }
            else {
                retorno.valRetBi10 = "0.00";
            }

            if (compra.rivcodigobienes2 === "4") {
                retorno.valRetBi10 = parseFloat(retorno.valRetBi10 + compra.scomvalorretivabienes2).toFixed(2);
            }

            if (compra.rivcodigoservicios === "5") {
                retorno.valRetSe20 = parseFloat(compra.scomvalorretivaservicios).toFixed(2);
            }
            else {
                retorno.valRetSe20 = "0.00";
            }

            if (compra.rivcodigobienes === "1") {
                retorno.valRetBi = parseFloat(compra.scomvalorretivabienes).toFixed(2);
            }
            else {
                retorno.valRetBi = "0.00";
            }

            if (compra.rivcodigobienes2 === "1") {
                retorno.valRetBi = parseFloat(retorno.valRetBi + compra.scomvalorretivabienes2).toFixed(2);
            }

            if (compra.rivcodigoservicios === "2") {
                retorno.valRetSe = parseFloat(compra.scomvalorretivaservicios).toFixed(2);
            }
            else {
                retorno.valRetSe = "0.00";
            }

            retorno.valRetSe100 = "0.00";
        }


        retorno.totBaseImpRee = "0.00";

        retorno.pagoLocExt = compra.tppcodigo;

        if (compra.tppcodigo === "01") {
            retorno.pais = "NA";
            retorno.aplicaConv = "NA";
            retorno.pagoExtSuj = "NA";
        }
        else {
            retorno.pais = compra.pscodigo;

            if (compra.scomconvdobtrib === "S") {
                retorno.aplicaConv = "SI";
            }
            else {
                retorno.aplicaConv = "NO";
            }

            if (compra.scompagextsujret === "S") {
                retorno.pagoExtSuj = "SI";
            }
            else {
                retorno.pagoExtSuj = "NO";
            }
        }

        retorno.pagoRegFis = "NA";

        retorno.fPago1 = compra.fpscodigo1;
        retorno.fPago2 = compra.fpscodigo2;
        retorno.fPago3 = compra.fpscodigo3;
        retorno.fPago4 = compra.fpscodigo4;
        retorno.fPago5 = compra.fpscodigo5;

        retorno.estabRet = compra.scomseriecmbteret;
        retorno.puntoRet = compra.scompuntocmbteret;
        retorno.numRet = compra.scomnumcmbteret;
        retorno.autRet = (compra.scomautocmbteret === null ? null : compra.scomautocmbteret);
        if (compra.scomfeccmbteret != null) {
            retorno.fecEmiRet = Funcion.FormatoFecha2(compra.scomfeccmbteret);
        }

        retorno.estabRet1 = compra.scomseriecmbteret1;
        retorno.puntoRet1 = compra.scompuntocmbteret1;
        retorno.numRet1 = compra.scomnumcmbteret1;
        retorno.autRet1 = (compra.scomautocmbteret1 === null ? null : compra.scomautocmbteret1);
        if (compra.scomfeccmbteret1 != null) {
            retorno.fecEmiRet1 = Funcion.FormatoFecha2(compra.scomfeccmbteret1);
        }

        if (compra.tcocodigo === "04" || compra.tcocodigo === "05") {
            retorno.tipoCompMod = compra.tcocodigomodif;
            retorno.serieMod = compra.scomseriecmbtemodif;
            retorno.puntoMod = compra.scompuntocmbtemodif;
            retorno.numMod = compra.scomnumcbtemodif;
            retorno.autMod = compra.scomnumautocmbtemodif;
        }
        try {
            if (retorno.air === null || retorno.air === undefined) {
                retorno.air = [];
            }
        } catch (e) {
            retorno.air = [];
        }


        if (reembolsos === null || reembolsos.length == 0) {
            //Detalle Air
            if (compra.trscodigo != null && compra.trscodigo != undefined) {
                retorno.air.push(
                    {
                        codRet: compra.trscodigo,
                        baseImpRet: parseFloat(compra.scombaseimponiblerenta === null ? 0 : compra.scombaseimponiblerenta).toFixed(2),
                        porcRet: parseFloat(compra.trscodigoporcentaje === null ? 0 : compra.trscodigoporcentaje).toFixed(2),
                        valRet: parseFloat(compra.scomvalorretrenta === null ? 0 : compra.scomvalorretrenta).toFixed(2)
                    });
            }

            if (compra.trscodigo1 != null && compra.trscodigo1 != undefined) {
                retorno.air.push(
                    {
                        codRet: compra.trscodigo1,
                        baseImpRet: parseFloat(compra.scombaseimponiblerenta1 === null ? 0 : compra.scombaseimponiblerenta1).toFixed(2),
                        porcRet: parseFloat(compra.trscodigoporcentaje1 === null ? 0 : compra.trscodigoporcentaje1).toFixed(2),
                        valRet: parseFloat(compra.scomvalorretrenta1 === null ? 0 : compra.scomvalorretrenta1).toFixed(2)
                    });
            }

            if (compra.trscodigo2 != null && compra.trscodigo2 != undefined) {
                retorno.air.push(
                    {
                        codRet: compra.trscodigo2,
                        baseImpRet: parseFloat(compra.scombaseimponiblerenta2 === null ? 0 : compra.scombaseimponiblerenta2).toFixed(2),
                        porcRet: parseFloat(compra.trscodigoporcentaje2 === null ? 0 : compra.trscodigoporcentaje2).toFixed(2),
                        valRet: parseFloat(compra.scomvalorretrenta2 === null ? 0 : compra.scomvalorretrenta2).toFixed(2)
                    });
            }

            if (compra.trscodigo3 != null && compra.trscodigo3 != undefined) {
                retorno.air.push(
                    {
                        codRet: compra.trscodigo3,
                        baseImpRet: parseFloat(compra.scombaseimponiblerenta3 === null ? 0 : compra.scombaseimponiblerenta3).toFixed(2),
                        porcRet: parseFloat(compra.trscodigoporcentaje3 === null ? 0 : compra.trscodigoporcentaje3).toFixed(2),
                        valRet: parseFloat(compra.scomvalorretrenta3 === null ? 0 : compra.scomvalorretrenta3).toFixed(2)
                    });
            }
        }

        //Reembolsos
        if (reembolsos != null) {
            if (reembolsos.length > 0) {
                reembolsos.forEach((r) => {
                    retorno.reembolso.push(
                        {
                            tipoCompRe: r.tcocodigo,
                            tipoIdRe: this.uf_obtieneCodSriId(r.tidcodigo),
                            identRe: r.rsccodlegal,
                            estabRe: r.rscserie,
                            puntoRe: r.rscpntoemision,
                            numRe: r.rscsecuencial,
                            fecEmiRe: Funcion.FormatoFecha2(r.rscfechadoc),
                            autRe: r.rscautorizacion,
                            baseImpRe: parseFloat(r.rscexento).toFixed(2),
                            baseImpGravRe: parseFloat(r.rscbaseobjetoiva).toFixed(2),
                            baseNoGravRe: parseFloat(r.rscbaseiva0).toFixed(2),
                            baseImpExeRe: parseFloat(r.rscbaseiva0).toFixed(2),
                            totBasesRe: parseFloat(r.rscexento + r.rscbaseobjetoiva + r.rscbaseiva0).toFixed(2),
                            montoIceRe: parseFloat(r.rscvalice).toFixed(2),
                            montoIvaRe: parseFloat(r.rsctotalimp).toFixed(2)
                        });

                    totalreembolso += (parseFloat(r.rscexento) + parseFloat(r.rscbaseobjetoiva) + parseFloat(r.rscbaseiva0));
                });

                retorno.totBaseImpRee = parseFloat(totalreembolso.toString()).toFixed(2);
            }
        }

        return retorno;
    }
    uf_ventas(venta: any) {
        var retorno: any = {};

        retorno.tipoIdCli = this.uf_obtieneCodSriIdVta(venta.tidcodigo);
        retorno.identCli = venta.svenumidcliente;

        if (venta.tidcodigo === "P") {
            retorno.denoCli = venta.svenomcliente;
        }

        retorno.tipoCompVta = venta.tcocodigo;
        retorno.tipoEmi = venta.svetipoemision;
        retorno.numComp = venta.svecantfacemitidas;
        retorno.baseNoGrava = parseFloat(venta.svebasecero).toFixed(2);
        retorno.baseImpo = parseFloat(venta.svebasenoobjetoiva).toFixed(2);
        retorno.baseImpoGrava = parseFloat(venta.svevalorbaseiva).toFixed(2);
        retorno.montoIva = parseFloat(venta.svevaloriva).toFixed(2);
        retorno.montoIce = parseFloat(venta.svevalorice).toFixed(2);
        retorno.valRetIva = parseFloat(venta.svevmivaretenido).toFixed(2);
        retorno.valRetRen = parseFloat(venta.svevmrentasretenido).toFixed(2);
        retorno.fPago = venta.svefpago == "" || venta.svefpago == null ? "20" : venta.svefpago;
        return retorno;
    }
    uf_ventasEstab(ventaEstab: any) {
        var retorno: any = {};
        retorno.estabTot = ventaEstab.estab;
        retorno.totVtas = ventaEstab.ventas;
        return retorno;
    }
    uf_obtieneCodSriId(tipoId: string) {
        var datos: any[] = this.datosIvas.Table3;
        var aux: any[] = datos.filter((x) => x.tidcodigo === tipoId);
        return aux[0].tidcodigosrico;

    }
    uf_obtieneCodSriIdVta(tipoId: string) {
        var datos: any[] = this.datosIvas.Table3;
        var aux: any[] = datos.filter((x) => x.tidcodigo === tipoId);
        return aux[0].tidcodigosri;
    }
    aceptarOk(event: boolean) {
        if (event) {

        }
    }

    modalmensaje(tipo: string, mensaje: string) {
        this.llamarmodal = tipo + "|Importacion Información |" + mensaje + "|" + Funcion.Ramdon();
    }
}
