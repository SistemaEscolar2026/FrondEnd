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
    templateUrl: './generaxml.component.html',
    styleUrls: ['./generaxml.component.scss']
})
export class GeneraXMLComponent {

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


    constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService, _router: Router, private funcionesService: FuncionesService, private modalService: BsModalService, private mantenimientoService: MantenimientoService, private comprasService: ComprasService, private bancosService: BancosService, private sriService: SriService) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Generacion Xml')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        var fecha = new Date();
        this.fechaservidor = moment(fecha).format("YYYY-MM-DD").toString();
        this.limpiar();
        this.listmes = Funcion.CargaMeses();
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

    configCiaSri() {
        this.spinner.show();
        this.mantenimientoService.getConfigCiaSri(globales.cia).subscribe(data => {
            try {
                this.iTipoId = data.root[0][0].tidcodigo;
                //this.iTipoEmpresa = data.root[0][0].ccstipoempresa;

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


    }

    procesar() {


        this.getInformacionXml();
    }
    getInformacionXml() {
        this.spinner.show();
        this.sriService.getInformacionXml(globales.cia, this.ddw_mes, this.ne_anio).subscribe(data => {
            try {
                this.informacion.compras = data.root[0];
                this.informacion.ventas = data.root[1];
                this.informacion.anulados = data.root[2];
                this.vtasEstab = data.root[3];
                this.spinner.hide();
                this.guardadofinal();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }

    uf_obtieneCodSriVtDS(tipoId: string) {
    }
    guardadofinal() {
        var info = this.uf_prepara(parseInt(this.ddw_mes), parseInt(this.ne_anio), this.iTipoId, this.informacion.compras, this.informacion.ventas, this.informacion.anulados, this.vtasEstab)

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
                            template = template.replace('${codRet}', c.codRet);
                            template = template.replace('${baseImpRet}', c.baseImpRet);
                            template = template.replace('${porcRet}', c.porcRet);
                            template = template.replace('${valRet}', c.valRet);
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

        let lsNombre = "AT-" + Funcion.zeroFill(this.ddw_mes, 2) + Funcion.zeroFill(this.ne_anio, 4) + ".xml";
        let lsArchivo = "";
        console.log(lsNombre);



        var blob = new Blob([general], { type: "text/xml" });
        FileSaver.saveAs(blob, lsNombre);
        //var url = window.URL.createObjectURL(blob);
        //window.open(url);

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
    uf_prepara(mes: number, anio: number, tipoId: string, compra: any[], venta: any[], anulados: any[], vtasEstab: any[]) {
        var retorno: any = {};
        var datodescrip: any = globales.ciaDescrip;
        retorno.tipoIdInf = tipoId;
        retorno.idInf = globales.ciaRuc;
        retorno.razonSocialInf = datodescrip.replaceAll(".", "");
        retorno.anio = anio;
        retorno.mes = Funcion.zeroFill(mes.toString(), 2);
        retorno.numEstabRuc = vtasEstab.length > 0 ? Funcion.zeroFill(vtasEstab.length.toString(), 3) : "001";
        retorno.totalVentas = vtasEstab.reduce((prev: any, next: any) => prev + parseFloat(next.ventas), 0).toString()
        try {
            if (retorno.compras === null || retorno.compras === undefined) {
                retorno.compras = [];
            }
        } catch (e) {
            retorno.compras = [];
        }

        if (compra != null) {
            compra.forEach((sC) => {
                var reem = this.uf_obtieneReembolsos(sC.tcxpcodigo, sC.ccxpnumero, sC.prcodigo)
                retorno.compras.push(this.uf_compras(sC, reem));
            });

        }
        try {
            if (retorno.venta === null || retorno.venta === undefined) {
                retorno.ventas = [];
            }
        } catch (e) {
            retorno.ventas = [];
        }

        try {
            if (retorno.ventasEstab === null || retorno.ventasEstab === undefined) {
                retorno.ventasEstab = [];
            }
        } catch (e) {
            retorno.ventasEstab = [];
        }

        if (venta != null) {
            venta.forEach((sV) => {
                retorno.ventas.push(this.uf_ventas(sV));
            });
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
            if (compra.trscodigo != null) {
                retorno.air.push(
                    {
                        codRet: compra.trscodigo,
                        baseImpRet: parseFloat(compra.scombaseimponiblerenta === null ? 0 : compra.scombaseimponiblerenta).toFixed(2),
                        porcRet: parseFloat(compra.trscodigoporcentaje === null ? 0 : compra.trscodigoporcentaje).toFixed(2),
                        valRet: parseFloat(compra.scomvalorretrenta === null ? 0 : compra.scomvalorretrenta).toFixed(2)
                    });
            }

            if (compra.trscodigo1 != null) {
                retorno.air.push(
                    {
                        codRet: compra.trscodigo1,
                        baseImpRet: parseFloat(compra.scombaseimponiblerenta1 === null ? 0 : compra.scombaseimponiblerenta1).toFixed(2),
                        porcRet: parseFloat(compra.trscodigoporcentaje1 === null ? 0 : compra.trscodigoporcentaje1).toFixed(2),
                        valRet: parseFloat(compra.scomvalorretrenta1 === null ? 0 : compra.scomvalorretrenta1).toFixed(2)
                    });
            }

            if (compra.trscodigo2 != null) {
                retorno.air.push(
                    {
                        codRet: compra.trscodigo2,
                        baseImpRet: parseFloat(compra.scombaseimponiblerenta2 === null ? 0 : compra.scombaseimponiblerenta2).toFixed(2),
                        porcRet: parseFloat(compra.trscodigoporcentaje2 === null ? 0 : compra.trscodigoporcentaje2).toFixed(2),
                        valRet: parseFloat(compra.scomvalorretrenta2 === null ? 0 : compra.scomvalorretrenta2).toFixed(2)
                    });
            }

            if (compra.trscodigo3 != null) {
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

                retorno.totBaseImpRee = totalreembolso.toFixed(2);
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
        this.llamarmodal = tipo + "|Generación de XML|" + mensaje + "|" + Funcion.Ramdon();
    }
}
