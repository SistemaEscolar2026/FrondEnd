import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Funcion } from '@funciones/funciones';
import { MantenimientoService } from '@services/mantenimiento-service';
import { FuncionesService } from '@services/funciones-service';
import { NgxSpinnerService } from "ngx-spinner";
import { SriService } from '@services/sri-service';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BotonesModel } from '@modelo/botones-model';
import { globales, environment } from 'src/environments/environment';
import { ServiceMensaje } from '@services/config/ServiceMensaje';
import * as moment from 'moment';
//import * as fs from 'fs';
import { TabuladoresModel } from '../modelo/TabuladoresModel';
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './sriventas.component.html',
    styleUrls: ['./sriventas.component.scss']
})
export class SriVentasComponent implements OnInit {

    @ViewChild('modalbusquedacliente') modalbusquedacliente: any;
    @ViewChild('modalbusquedaretencion') modalbusquedaretencion: any;

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
    iSriVentas: any = {};
    iReembolsos: any[] = [];
    iReembolsoshijo: any = {};
    listmes: any[] = [];
    ddw_parteRel: any[] = [];
    dg_ventas: any[] = [];
    ddw_tipoComprobante: any[] = [];
    listretencionsri: any[] = [];
    iVentas: any[] = [];
    listadocliente: any[] = [];
    ddw_sustento: any[] = [];
    ddw_tipoProv: any[] = [];
    ddw_tipoIdent: any[] = [];
    modalRef: any;
    lineacompras: string = "";
    txtbusca: string = "";
    lineareembolso: string = "";
    /**
  * DEFINICION DE VARIABLE DE CONTROL DE ACCION SUBMIT DE PAGINA
  */
    submitted = false;
    isAccion: string = "";
    ColumnaDetalle: any[] = ['Sec.', 'Id Cliente', 'Descripción Comprobante', 'Facturas', 'Base Cero', 'Base Iva', 'IVA', '', ''];
    router: Router;
    /**
  * DEFINICION DE VARIABLE MODAL DE MANEJO DE LA SECCION DE BOTONES
  */
    botones: BotonesModel = new BotonesModel();
    /**
  * DEFINICION DE VARIABLE NOTIFICACION TIPO TOAS
  */
    notifier: any;
    /**
   * DEFINICION DE VARIABLE DE LISTADO DE OBJETO DE ESTADO
   */

    /**
  * DEFINICION DE VARIABLE DE LISTADO DE PROPIO
  */
    habilitabuscar: boolean = true;
    habilitabotones: boolean = true;
    habilitaobjetofrom: boolean = true;
    habilitarvalores: boolean = true;
    tipocompro: boolean = true;
    reembolso: boolean = true;
    tab: TabuladoresModel = new TabuladoresModel();
    llamarmodal: string = "";

    inicio: string = "";
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
    fechaservidor: string = "";
    iNumRef: string = "";
    selectedlineagrid: any = {};
    iNovedades: any[] = [];
    fpago: any[] = [];
    ddw_tipoEmi: any[] = [];
    ddw_tipoPago: any[] = [];
    listipoidentificacion: any[] = [];
    ddw_pais: any[] = [];
    sriVentasSec: any[] = [];
    ddw_fPago: any[] = [];
    ddw_retIvaBie: any[] = [];
    ddw_retIvaSer: any[] = [];
    ddw_codIce: any[] = [];
    ddw_tipodocSri: any[] = [];
    listreposanble: any[] = [];
    listtiponovedad: any[] = [];
    parametros: any[] = [];
    ddw_mes: string = "";
    ne_anio: string = "";
    txt_identificacion: string = "";
    iTipoId: string = "";
    bandera: number = 0;
    banderaprv: number = 0;
    cbx_error: boolean = false;
    /**
   * DEFINICION DE VARIABLE DE MODELO DE VENDEDOR
   */

    /**
  * DEFINICION DE FUNCION INIT DE LA CLASE
  */
    ngOnInit() {
        var fechdato = new Date();
        this.fechaservidor = moment(fechdato).format("YYYY-MM-DD").toString();

        this.limpiabotones(1);

    }
    nuevo() {
        this.iSriVentas = {};

        this.iSriVentas.scomfechacmbtevta = this.fechaservidor;
        this.iSriVentas.scomfechacmbtectble = this.fechaservidor;

        this.habilitarvalores = true;


        this.iSriVentas.svecantfacemitidas = 0;
        this.iSriVentas.svevalorbaseiva = 0;
        this.iSriVentas.svebasecero = 0;
        this.iSriVentas.svebasenoobjetoiva = 0;
        this.iSriVentas.svevaloriva = 0;
        this.iSriVentas.svevmivaretenido = 0;
        this.iSriVentas.svevmrentasretenido = 0;
        this.iSriVentas.svetipoemision = "F";

        this.iSriVentas.sveanio = this.ne_anio;
        this.iSriVentas.svemes = this.ddw_mes;
        this.maxSriVentas();
        this.iSriVentas.tcocodigo = this.ddw_tipodocSri[0].tcocodigo;
        this.ddw_tipoComprobante_SelectionChanged();
        this.ddw_tipoEmi_SelectionChanged();

        this.habilitaobjetofrom = false;
        this.botones.btnnuevo = true;
        this.botones.btngrabar = false;
        this.isAccion = "I";

    }

    cancelar() {
        this.limpiabotones(1);
        this.limpiarpantalla();
    }

    aceptarOk(event: any) {
        if (event) {

            this.limpiabotones(1);
            this.limpiarpantalla2();
            this.iSriVentas = {};
            this.isAccion = "";
            this.botones.btnnuevo = false;
            this.botones.btngrabar = true;
            this.tipocompro = true
            this.habilitaobjetofrom = true;
            this.iSriVentas.compras = [];
            this.iSriVentas.air = [];
            this.iSriVentas.ventas = [];
            this.iSriVentas.ventasEstab = [];

            this.btn_cargar_Click();
            this.cbx_error = false;
        }
    }

    aceptarConfi(event: boolean) {
        if (event) {

        }
    }

    limpiatab(_dato: number) {
        switch (_dato) {
            case 1:
                this.tab.tab1 = false;
                this.tab.tab2 = false;
                this.tab.tab3 = true;
                this.tab.tab4 = false;
                this.tab.tab5 = false;
                this.tab.tab6 = false;
                this.tab.tab7 = false;
                break;
            case 2:
                this.tab.tab1 = false;
                this.tab.tab2 = false;
                this.tab.tab3 = false;
                this.tab.tab4 = false;
                this.tab.tab5 = false;
                this.tab.tab6 = false;
                this.tab.tab7 = false;
                break;
        }
    }
    limpiabotones(_dato: Number) {
        switch (_dato) {
            case 1:
                this.botones.btnnuevo = true;
                this.botones.btnmodificar = true;
                this.botones.btngrabar = true
                this.botones.btneliminar = true;
                this.botones.btncancelar = false;
                this.botones.btnbuscar = false;
                this.botones.btnsalir = false;
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

    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private fb: FormBuilder, private mantenimientoService: MantenimientoService, private injector: Injector, private funcionesService: FuncionesService, private sriService: SriService) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Ingreso Compras')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        var fecha = new Date();
        this.fechaservidor = moment(fecha).format("YYYY-MM-DD").toString();

        this.notifier = this.injector.get(ServiceMensaje);
        this.listmes = Funcion.CargaMeses();
        this.ddw_parteRel = Funcion.Propio();
        this.ddw_tipoEmi = Funcion.TipoEmision();
        this.limpiarpantalla();
        this.cargaTiposustento();
        this.cargaTipoIdenti();
        this.cargaTipoDoc();
        this.cargaIce();
        this.cargaRetIva();
        this.cargaRetIvaSer();

        this.cargatipoidentificacion();
        this.configCiaSri();
        this.cargaTemplates();
    }

    uf_obtieneFPagoSri() {

        this.spinner.show();
        this.sriService.obtieneFPagoSri2(globales.cia, this.iSriVentas.sveanio, this.iSriVentas.svemes).subscribe(data => {
            try {
                this.fpago = data.root[0];

                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }

    maxSriVentas() {

        this.spinner.show();
        this.sriService.getMaxSriVentasSecuencial(globales.cia, this.iSriVentas.sveanio, this.iSriVentas.svemes).subscribe(data => {
            try {
                this.sriVentasSec = data.root[0];

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

                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cargatipoidentificacion() {
        this.spinner.show();
        this.mantenimientoService.getTipoIdentificacion().subscribe(data => {
            try {
                this.listipoidentificacion = data.root[0];

                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }

    modificar() {
        this.habilitaobjetofrom = false;
        this.botones.btngrabar = false;
        this.botones.btnmodificar = true;
        this.botones.btneliminar = true;
    }

    cargaTemplates() {

        this.httpClient.get("../assets/Templates/inicio.ftl").subscribe((data) => {
            this.inicio = data.toString();
            console.log(this.inicio);
        }, error => {
            this.inicio = error.error.text;
            console.log(this.inicio);
        });

        this.httpClient.get("../assets/Templates/ventas/vta_inicio.ftl").subscribe((data) => {
            this.vta_inicio = data.toString();
            console.log(this.vta_inicio);
        }, error => {
            this.vta_inicio = error.error.text;
            console.log(this.vta_inicio);
        });

        this.httpClient.get("../assets/Templates/ventas/vta_inicioSinDeno.ftl").subscribe((data) => {
            this.vta_inicioSinDeno = data.toString();
            console.log(this.vta_inicioSinDeno);
        }, error => {
            this.vta_inicioSinDeno = error.error.text;
            console.log(this.vta_inicioSinDeno);
        });
        this.httpClient.get("../assets/Templates/ventas/vta_inicioSinFP.ftl").subscribe((data) => {
            this.vta_inicioSinFP = data.toString();
            console.log(this.vta_inicioSinFP);
        }, error => {
            this.vta_inicioSinFP = error.error.text;
            console.log(this.vta_inicioSinFP);
        });
        this.httpClient.get("../assets/Templates/ventas/vta_inicioSinDenoSinFP.ftl").subscribe((data) => {
            this.vta_inicioSinDenoSinFP = data.toString();
            console.log(this.vta_inicioSinDenoSinFP);
        }, error => {
            this.vta_inicioSinDenoSinFP = error.error.text;
            console.log(this.vta_inicioSinDenoSinFP);
        });

        this.httpClient.get("../assets/Templates/ventas/vta_inicio2.ftl").subscribe((data) => {
            this.vta_inicio2 = data.toString();
            console.log(this.vta_inicio2);
        }, error => {
            this.vta_inicio2 = error.error.text;
            console.log(this.vta_inicio2);
        });
        this.httpClient.get("../assets/Templates/ventas/vta_inicioSinDeno2.ftl").subscribe((data) => {
            this.vta_inicioSinDeno2 = data.toString();
            console.log(this.vta_inicioSinDeno2);
        }, error => {
            this.vta_inicioSinDeno2 = error.error.text;
            console.log(this.vta_inicioSinDeno2);
        });
        this.httpClient.get("../assets/Templates/ventas/vta_inicio2SinFP.ftl").subscribe((data) => {
            this.vta_inicio2SinFP = data.toString();
            console.log(this.vta_inicio2SinFP);
        }, error => {
            this.vta_inicio2SinFP = error.error.text;
            console.log(this.vta_inicio2SinFP);
        });
        this.httpClient.get("../assets/Templates/ventas/vta_inicioSinDeno2SinFP.ftl").subscribe((data) => {
            this.vta_inicioSinDeno2SinFP = data.toString();
            console.log(this.vta_inicioSinDeno2SinFP);
        }, error => {
            this.vta_inicioSinDeno2SinFP = error.error.text;
            console.log(this.vta_inicioSinDeno2SinFP);
        });
        this.httpClient.get("../assets/Templates/ventas/vta_fin.ftl").subscribe((data) => {
            this.vta_fin = data.toString();
            console.log(this.vta_fin);
        }, error => {
            this.vta_fin = error.error.text;
            console.log(this.vta_fin);
        });
        this.httpClient.get("../assets/Templates/ventas/vta_estab.ftl").subscribe((data) => {
            this.vta_estab = data.toString();
            console.log(this.vta_estab);
        }, error => {
            this.vta_estab = error.error.text;
            console.log(this.vta_estab);
        });
        this.httpClient.get("../assets/Templates/ventas/vta_estab2.ftl").subscribe((data) => {
            this.vta_estab2 = data.toString();
            console.log(this.vta_estab2);
        }, error => {
            this.vta_estab2 = error.error.text;
            console.log(this.vta_estab2);
        });
        this.httpClient.get("../assets/Templates/ventas/vta_fin_estab.ftl").subscribe((data) => {
            this.vta_fin_estab = data.toString();
            console.log(this.vta_fin_estab);
        }, error => {
            this.vta_fin_estab = error.error.text;
            console.log(this.vta_fin_estab);
        });

        this.httpClient.get("../assets/Templates/fin.ftl").subscribe((data) => {
            this.fin = data.toString();
            console.log(this.fin);
        }, error => {
            this.fin = error.error.text;
            console.log(this.fin);
        });

    }
    calcula_secuencial() {
        let MaxSecuencial: number = 0;
        if (this.sriVentasSec.length != 0) {
            MaxSecuencial = this.sriVentasSec[0].sve_secuncia + 1;
        }
        else {
            MaxSecuencial = MaxSecuencial + 1;
        }
        return MaxSecuencial;
    }
    guardar() {


        let lsXML: string = "";

        let lsArchivo: string = "";
        let lsError: string = "";

        if (this.isAccion == "I") {
            this.iSriVentas.ciacodigo = globales.cia;
            this.iSriVentas.svesecuncia = this.calcula_secuencial();
            this.iSriVentas.svenomcliente = this.iSriVentas.clnombre;
        } else {
            this.iSriVentas.ciacodigo = globales.cia;
            this.iSriVentas.svenomcliente = this.iSriVentas.clnombre;
        }



        this.iSriVentas.svevalorice = 0;




        let ventasEsab: any[] = [];

        ventasEsab.push({
            estab: "001",
            ventas: parseFloat(this.iSriVentas.svebasecero) + parseFloat(this.iSriVentas.svevalorbaseiva) + parseFloat(this.iSriVentas.svebasenoobjetoiva)
        });

        var info = this.uf_prepara(parseInt(this.iSriVentas.svemes), parseInt(this.iSriVentas.sveanio), this.iTipoId, null, this.iSriVentas, ventasEsab, []);

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

        lsArchivo = this.iSriVentas.tcocodigo + "_" + this.iSriVentas.clcodigo + ".xml";

        this.spinner.show();
        this.mantenimientoService.validarEsquema(general, lsArchivo).subscribe(data => {
            try {
                this.iSriVentas.errores = [];
                var esquema: string = "";
                if (data.msgError !== null) {
                    esquema = data.msgError;
                }

                if (esquema.length > 0) {
                    this.iSriVentas.errores.push(esquema);
                }
                this.spinner.hide();
                this.grabarfinal();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }

    validaxml(general: string, lsArchivo: string) {
        this.spinner.show();
        this.mantenimientoService.validarXML(general, lsArchivo).subscribe(data => {
            try {
                var valida: string = data;

                if (valida != null) {
                    if (valida.length > 0) {
                        this.iSriVentas.errores.push(valida);
                    }
                }
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }

    grabarfinal() {
        let iError: any = {};
        var lsError: string = "";
        this.iSriVentas.errores.forEach((s: any) => {
            if (this.iSriVentas.errores.indexOf(s) === this.iSriVentas.errores.length - 1) {
                lsError += s;
            }
            else {
                lsError += s;
            }
        });




        if (lsError.length > 0) {
            lsError = lsError.replace("\r\n", "<br />");
            lsError = lsError.replace("\n", "<br />");
            lsError = lsError.replace("'", "");


            if (lsError.toLowerCase().includes("error")) {
                // this.modalmensaje("2", lsError);
            }
            else if (lsError.toLowerCase().includes("advertencia")) {
                //this.modalmensaje("2", lsError);
            }

            iError.ciacodigo = this.iSriVentas.ciacodigo;
            iError.eiianio = this.iSriVentas.sveanio;
            iError.eiimes = this.iSriVentas.svemes;
            iError.eiisecuencial = this.iSriVentas.svesecuncia;
            iError.eiitabla = "V";
            iError.eiierrtext = lsError;

        }

        iError.ciacodigo = this.iSriVentas.cocodigo;
        iError.eiianio = this.iSriVentas.sveanio;
        iError.eiimes = this.iSriVentas.svemes;
        iError.eiisecuencial = this.iSriVentas.svesecuncia;
        iError.eiitabla = "V";
        iError.eiierrtext = lsError;

        var ling: any = {};
        ling.ventas = this.iSriVentas;
        ling.error = iError;

        if (this.isAccion === "I") {
            this.spinner.show();
            this.sriService.insertSriVentas(Funcion.Auditoria() + environment.modActivoFijo + ',010000002', Funcion.Complemento(), ling).subscribe(data => {
                try {

                    let isMensajeS = data.msgError;
                    this.modalmensaje("3", isMensajeS);
                    this.spinner.hide();
                } catch (e) {
                    this.spinner.hide();
                }
            }, err => {
                this.modalmensaje("2", err.error.Message);
                this.spinner.hide();
            });

        } else {
            this.spinner.show();
            this.sriService.updateSriVentas(ling).subscribe(data => {
                try {

                    let isMensajeS = data.msgError;
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

    }

    eliminar() {
        this.spinner.show();
        this.sriService.deleteSriVentas( globales.cia, this.iSriVentas.sveanio, this.iSriVentas.svemes, this.iSriVentas.svesecuncia).subscribe(data => {
            try {

                let isMensajeS = data.msgError;
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
        retorno.totalVentas = vtasEstab.reduce((prev: any, next: any) => prev + parseFloat(next.ventas), 0).toString()
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
        retorno.baseNoGrava = venta.svebasecero;
        retorno.baseImpo = venta.svebasenoobjetoiva;
        retorno.baseImpoGrava = venta.svevalorbaseiva;
        retorno.montoIva = venta.svevaloriva;
        retorno.montoIce = venta.svevalorice;
        retorno.valRetIva = venta.svevmivaretenido;
        retorno.valRetRen = venta.svevmrentasretenido;
        retorno.fPago = this.uf_obtieneFPagoSrisele(venta.clcodigo);
        return retorno;
    }
    uf_obtieneFPagoSrisele(codCli: string) {
        var filter: any[] = this.fpago.filter((x) => x.cl_codigo === codCli);
        if (filter.length > 0) {
            return filter[0].resultado;
        } else {
            return "20";
        }
    }

    uf_ventasEstab(ventaEstab: any) {
        var retorno: any = {};
        retorno.estabTot = ventaEstab.estab;
        retorno.totVtas = ventaEstab.ventas;
        return retorno;
    }
    uf_obtieneCodSriId(tipoId: string) {
        let ident: any = this.listipoidentificacion.find((x) => x.tidcodigo === tipoId);
        return ident.tidcodigosrico;
    }
    uf_obtieneCodSriIdVta(tipoId: string) {
        let ident: any = this.listipoidentificacion.find((x) => x.tidcodigo === tipoId);
        return ident.tidcodigosri;
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
        retorno.baseNoIva = compra.scombasenoobjetoiva;
        retorno.baseImpo = compra.scombasecero;
        retorno.baseImpoGrav = compra.scombaseiva;
        retorno.baseImpoExe = "0.00";
        retorno.montoIce = compra.scomvalorice;
        retorno.montoIva = compra.scomvaloriva;

        if (compra.scomvalorretiva100 > 0) {
            retorno.valRetBi10 = "0.00";
            retorno.valRetSe20 = "0.00";
            retorno.valRetBi = "0.00";
            retorno.valRetSe = "0.00";
            retorno.valRetSe100 = compra.scomvalorretiva100;
        }
        else {
            if (compra.rivcodigobienes === "4") {
                retorno.valRetBi10 = compra.scomvalorretivabienes;
            }
            else {
                retorno.valRetBi10 = "0.00";
            }

            if (compra.rivcodigobienes2 === "4") {
                retorno.valRetBi10 = retorno.valRetBi10 + compra.scomvalorretivabienes2;
            }

            if (compra.rivcodigoservicios === "5") {
                retorno.valRetSe20 = compra.scomvalorretivaservicios;
            }
            else {
                retorno.valRetSe20 = "0.00";
            }

            if (compra.rivcodigobienes === "1") {
                retorno.valRetBi = compra.scomvalorretivabienes;
            }
            else {
                retorno.valRetBi = "0.00";
            }

            if (compra.rivcodigobienes2 === "1") {
                retorno.valRetBi = retorno.valRetBi + compra.scomvalorretivabienes2;
            }

            if (compra.rivcodigoservicios === "2") {
                retorno.valRetSe = compra.scomvalorretivaservicios;
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
            retorno.fecEmiRet = compra.scomfeccmbteret;
        }

        retorno.estabRet1 = compra.scomseriecmbteret1;
        retorno.puntoRet1 = compra.scompuntocmbteret1;
        retorno.numRet1 = compra.scomnumcmbteret1;
        retorno.autRet1 = (compra.scomautocmbteret1 === null ? null : compra.scomautocmbteret1);
        if (compra.scomfeccmbteret1 != null) {
            retorno.fecEmiRet1 = compra.scomfeccmbteret1;
        }

        if (compra.tcocodigo === "04" || compra.tcocodigo === "05") {
            retorno.tipoCompMod = compra.tcocodigomodif;
            retorno.serieMod = compra.scomseriecmbtemodif;
            retorno.puntoMod = compra.scompuntocmbtemodif;
            retorno.numMod = compra.scomnumcbtemodif;
            retorno.autMod = compra.scomnumautocmbtemodif;
        }

        if (reembolsos === null || reembolsos.length == 0) {
            //Detalle Air
            if (compra.trscodigo != null) {
                retorno.air.Add.push(
                    {
                        codRet: compra.trscodigo,
                        baseImpRet: (compra.scombaseimponiblerenta === null ? 0 : compra.scombaseimponiblerenta),
                        porcRet: (compra.trscodigoporcentaje === null ? 0 : compra.trscodigoporcentaje),
                        valRet: (compra.scomvalorretrenta === null ? 0 : compra.scomvalorretrenta)
                    });
            }

            if (compra.trscodigo1 != null) {
                retorno.air.push(
                    {
                        codRet: compra.trscodigo1,
                        baseImpRet: (compra.scombaseimponiblerenta1 === null ? 0 : compra.scombaseimponiblerenta1),
                        porcRet: (compra.trscodigoporcentaje1 === null ? 0 : compra.trscodigoporcentaje1),
                        valRet: (compra.scomvalorretrenta1 === null ? 0 : compra.scomvalorretrenta1)
                    });
            }

            if (compra.trscodigo2 != null) {
                retorno.air.push(
                    {
                        codRet: compra.trscodigo2,
                        baseImpRet: (compra.scombaseimponiblerenta2 === null ? 0 : compra.scombaseimponiblerenta2),
                        porcRet: (compra.trscodigoporcentaje2 === null ? 0 : compra.trscodigoporcentaje2),
                        valRet: (compra.scomvalorretrenta2 === null ? 0 : compra.scomvalorretrenta2)
                    });
            }

            if (compra.trscodigo3 != null) {
                retorno.air.push(
                    {
                        codRet: compra.trscodigo3,
                        baseImpRet: (compra.scombaseimponiblerenta3 === null ? 0 : compra.scombaseimponiblerenta3),
                        porcRet: (compra.trscodigoporcentaje3 === null ? 0 : compra.trscodigoporcentaje3),
                        valRet: (compra.scomvalorretrenta3 === null ? 0 : compra.scomvalorretrenta3)
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
                            fecEmiRe: r.rscfechadoc,
                            autRe: r.rscautorizacion,
                            baseImpRe: r.rscexento,
                            baseImpGravRe: r.rscbaseobjetoiva,
                            baseNoGravRe: r.rscbaseiva0,
                            baseImpExeRe: r.rscbaseiva0,
                            totBasesRe: (r.rscexento + r.rscbaseobjetoiva + r.rscbaseiva0),
                            montoIceRe: r.rscvalice,
                            montoIvaRe: r.rsctotalimp
                        });

                    totalreembolso += (parseFloat(r.rscexento) + parseFloat(r.rscbaseobjetoiva) + parseFloat(r.rscbaseiva0));
                });

                retorno.totBaseImpRee = totalreembolso;
            }
        }

        return retorno;
    }
    regresar() {
        this.iSriVentas = {};
        this.isAccion = "";
        this.botones.btnnuevo = false;
        this.botones.btngrabar = true;
        this.tipocompro = true
        this.habilitaobjetofrom = true;
        //this.iSriVentas.compras = [];
        //this.iSriVentas.air = [];
        //this.iSriVentas.ventas = [];
        //this.iSriVentas.ventasEstab = [];

    }
    ddw_tipoEmi_SelectionChanged() {
        if (this.iSriVentas.svetipoemision === "F") {
            this.habilitarvalores = false;
        } else {
            this.habilitarvalores = true;
            this.iSriVentas.svevalorbaseiva = "0";
            this.iSriVentas.svebasecero = "0";
            this.iSriVentas.svebasenoobjetoiva = "0";
            this.iSriVentas.svevaloriva = "0";
        }
    }
    ddw_retIvaBie_SelectionChanged() {
        if (this.iSriVentas.rivcodigobienes != "" && this.iSriVentas.rivcodigobienes != undefined) {
            try {
                let porce: number = this.ddw_retIvaBie.find((x) => x.rivcodigo === ((this.iSriVentas.rivcodigobienes === "" || this.iSriVentas.rivcodigobienes === undefined) ? "0" : this.iSriVentas.rivcodigobienes)).rivporcentaje;

                this.iSriVentas.scomvalorretivabienes = ((parseFloat(this.iSriVentas.scomvaloriva) * porce) / 100).toFixed(2);
                this.iSriVentas.scomvalorivabienes = this.iSriVentas.scomvaloriva
            } catch (e) {
                this.iSriVentas.scomvalorivabienes = 0;
                this.iSriVentas.scomvalorretivabienes = 0;
            }
        } else {
            this.iSriVentas.scomvalorivabienes = 0;
            this.iSriVentas.scomvalorretivabienes = 0;
        }

    }
    ddw_retIvaBie_SelectionChanged2() {
        if (this.iSriVentas.rivcodigobienes2 != "" && this.iSriVentas.rivcodigobienes2 != undefined) {
            try {
                let porce: number = this.ddw_retIvaBie.find((x) => x.rivcodigo === ((this.iSriVentas.rivcodigobienes2 === "" || this.iSriVentas.rivcodigobienes2 === undefined) ? "0" : this.iSriVentas.rivcodigobienes2)).rivporcentaje;

                this.iSriVentas.scomvalorretivabienes2 = ((parseFloat(this.iSriVentas.scomvaloriva) * porce) / 100).toFixed(2);
                this.iSriVentas.scomvalorivabienes2 = this.iSriVentas.scomvaloriva
            } catch (e) {
                this.iSriVentas.scomvalorivabienes2 = 0;
                this.iSriVentas.scomvalorretivabienes2 = 0;
            }
        } else {
            this.iSriVentas.scomvalorivabienes2 = 0;
            this.iSriVentas.scomvalorretivabienes2 = 0;
        }
    }
    dblclickGrid(row: any) {

    }
    ddw_retIvaSer_SelectionChanged() {
        if (this.iSriVentas.rivcodigoservicios != "" && this.iSriVentas.rivcodigoservicios != undefined) {
            try {
                let porce: number = this.ddw_retIvaSer.find((x) => x.rivcodigo === ((this.iSriVentas.rivcodigoservicios === "" || this.iSriVentas.rivcodigoservicios === undefined) ? "0" : this.iSriVentas.rivcodigoservicios)).rivporcentaje;

                this.iSriVentas.scomvalorretivaservicios = ((parseFloat(this.iSriVentas.scomvaloriva) * porce) / 100).toFixed(2);
                this.iSriVentas.scomvalorivaservicios = this.iSriVentas.scomvaloriva
            } catch (e) {
                this.iSriVentas.scomvalorivaservicios = 0;
                this.iSriVentas.scomvalorretivaservicios = 0;
            }
        } else {
            this.iSriVentas.scomvalorivaservicios = 0;
            this.iSriVentas.scomvalorretivaservicios = 0;
        }
    }
    cargaRetIva() {
        this.spinner.show();
        this.mantenimientoService.getRetencionIvATipo("B").subscribe(data => {
            try {
                this.ddw_retIvaBie = [];
                this.ddw_retIvaBie.push({
                    rivcodigo: "",
                    rivdescripcion: ""
                });
                data.root[0].forEach((x: any) => {
                    this.ddw_retIvaBie.push(x);
                });
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cargaRetIvaSer() {
        this.spinner.show();
        this.mantenimientoService.getRetencionIvATipo("S").subscribe(data => {
            try {
                this.ddw_retIvaSer = [];
                this.ddw_retIvaSer.push({
                    rivcodigo: "",
                    rivdescripcion: ""
                });
                data.root[0].forEach((x: any) => {
                    this.ddw_retIvaSer.push(x);
                });
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }

    limpiarColorre() {
        this.iReembolsos.forEach((e) => {
            e.color = "";
        });
    }
    clickGridre(row: any) {
        this.limpiarColor();
        this.lineareembolso = row.rsclinea;
        row.color = "SG";
    }
    agregarreembolso() {
        this.iReembolsoshijo = {};
        this.iReembolsoshijo.rscfechadoc = globales.fechaModuComp;
        this.iReembolsoshijo.rsclinea = 0;
        this.reembolso = true;
    }

    vereditreem(row: any) {
        this.iReembolsoshijo = this.iReembolsos.find((x) => x.rsclinea === row.rsclinea);

        this.iReembolsoshijo.rscfechadoc = Funcion.FormatoFecha(this.iReembolsoshijo.rscfechadoc);
        this.reembolso = true;
    }
    btn_grabaReem_Click() {

        if (this.iReembolsoshijo.prcodigosoporte === "" || this.iReembolsoshijo.prcodigosoporte === null || this.iReembolsoshijo.prcodigosoporte === undefined) {
            this.modalmensaje("1", "Debe seleccionar un proveedor...");
            return;
        }

        if (this.iReembolsoshijo.tcocodigo == "" || this.iReembolsoshijo.tcocodigo === null || this.iReembolsoshijo.tcocodigo === undefined) {
            this.modalmensaje("1", "Debe seleccionar un tipo de comprobanre...");
            return;
        }

        if (this.iReembolsoshijo.rscserie == "" || this.iReembolsoshijo.rscserie === null || this.iReembolsoshijo.rscserie === undefined) {
            this.modalmensaje("1", "Debe digitar el establecimiento...");
            return;
        }

        if (this.iReembolsoshijo.rscpntoemision == "" || this.iReembolsoshijo.rscpntoemision === null || this.iReembolsoshijo.rscpntoemision === undefined) {
            this.modalmensaje("1", "Debe digitar el punto de emisión...");
            return;
        }

        if (this.iReembolsoshijo.rscsecuencial == "0" || this.iReembolsoshijo.rscsecuencial == "" || this.iReembolsoshijo.rscsecuencial === null || this.iReembolsoshijo.rscsecuencial === undefined) {
            this.modalmensaje("1", "Debe digitar el secuencial...");
            return;
        }

        if (this.iReembolsoshijo.rscautorizacion == "" || this.iReembolsoshijo.rscautorizacion === null || this.iReembolsoshijo.rscautorizacion === undefined) {
            this.modalmensaje("1", "Debe digitar la autorizacion...");
            return;
        }

        if (!(this.iReembolsoshijo.rscautorizacion.length == 10 || this.iReembolsoshijo.rscautorizacion.length == 37 || this.iReembolsoshijo.rscautorizacion.length == 49)) {
            this.modalmensaje("1", "La autorización debe tener 10, 37 o 49 dígitos...");
            return;
        }

        if (this.iReembolsoshijo.rscfechadoc > this.iSriVentas.scomfechacmbtevta) {
            this.modalmensaje("1", "La fecha de emisión del comprobante debe ser menor o igual de la del reembolso...");
            return;
        }

        let ne_tarifa0: number = (this.iReembolsoshijo.rscexento === "" || this.iReembolsoshijo.rscexento === undefined) ? 0 : parseFloat(this.iReembolsoshijo.rscexento);
        let ne_objIva: number = (this.iReembolsoshijo.rscbaseobjetoiva === "" || this.iReembolsoshijo.rscbaseobjetoiva === undefined) ? 0 : parseFloat(this.iReembolsoshijo.rscbaseobjetoiva);
        let ne_noObjIva: number = (this.iReembolsoshijo.rscbaseiva0 === "" || this.iReembolsoshijo.rscbaseiva0 === undefined) ? 0 : parseFloat(this.iReembolsoshijo.rscbaseiva0);

        if ((ne_tarifa0 + ne_objIva + ne_noObjIva) <= 0) {
            this.modalmensaje("1", "No ha ingresado los valores del comprobante...");
            return;
        }


        this.iReembolsoshijo.valorBase = ne_tarifa0 + ne_objIva + ne_noObjIva;

        if (this.iReembolsoshijo.rsclinea === 0) {
            this.iReembolsoshijo.rsclinea = this.iReembolsos.length + 1;

            this.iReembolsos.push(this.iReembolsoshijo);
        }

        this.cancelarreem();


    }
    cancelarreem() {
        this.iReembolsoshijo = {};
        this.reembolso = false;
    }
    deletereemblso() {
        let i = this.iReembolsos.findIndex((key: any) => key.rsclinea === this.lineareembolso);
        this.iReembolsos.splice(i, 1);
    }


    cargaIce() {
        this.spinner.show();
        this.mantenimientoService.getIce().subscribe(data => {
            try {
                this.ddw_codIce = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }

    cargaTipoDoc() {
        this.spinner.show();
        this.mantenimientoService.getTipocompSriVtas().subscribe(data => {
            try {
                this.ddw_tipodocSri = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cargaTiposustento() {
        this.spinner.show();
        this.mantenimientoService.getCreTrib().subscribe(data => {
            try {
                this.ddw_sustento = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cargaTipoIdenti() {
        this.spinner.show();
        this.mantenimientoService.getTipoIdentificacion().subscribe(data => {
            try {
                this.ddw_tipoIdent = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }


    ddw_tipoComprobante_SelectionChanged() {
        this.uf_obtieneFPagoSri();
    }
    calculo(ban: number) {
        var calculo: number = 0;
        if (ban === 1) {
            let valor1 = (this.iSriVentas.scombaseimponiblerenta === "" || this.iSriVentas.scombaseimponiblerenta === undefined) ? 0 : parseFloat(this.iSriVentas.scombaseimponiblerenta);
            let valor2 = (this.iSriVentas.trscodigoporcentaje === "" || this.iSriVentas.trscodigoporcentaje === undefined) ? 0 : parseFloat(this.iSriVentas.trscodigoporcentaje);
            calculo = (valor1 * valor2) / 100;
            this.iSriVentas.scomvalorretrenta = calculo.toFixed(2);
        }
        if (ban === 2) {
            let valor1 = (this.iSriVentas.scombaseimponiblerenta1 === "" || this.iSriVentas.scombaseimponiblerenta1 === undefined) ? 0 : parseFloat(this.iSriVentas.scombaseimponiblerenta1);
            let valor2 = (this.iSriVentas.trscodigoporcentaje1 === "" || this.iSriVentas.trscodigoporcentaje1 === undefined) ? 0 : parseFloat(this.iSriVentas.trscodigoporcentaje1);
            calculo = (valor1 * valor2) / 100;
            this.iSriVentas.scomvalorretrenta1 = calculo.toFixed(2);
        }
        if (ban === 3) {
            let valor1 = (this.iSriVentas.scombaseimponiblerenta2 === "" || this.iSriVentas.scombaseimponiblerenta2 === undefined) ? 0 : parseFloat(this.iSriVentas.scombaseimponiblerenta2);
            let valor2 = (this.iSriVentas.trscodigoporcentaje2 === "" || this.iSriVentas.trscodigoporcentaje2 === undefined) ? 0 : parseFloat(this.iSriVentas.trscodigoporcentaje2);
            calculo = (valor1 * valor2) / 100;
            this.iSriVentas.scomvalorretrenta2 = calculo.toFixed(2);
        }
        if (ban === 4) {
            let valor1 = (this.iSriVentas.scombaseimponiblerenta3 === "" || this.iSriVentas.scombaseimponiblerenta3 === undefined) ? 0 : parseFloat(this.iSriVentas.scombaseimponiblerenta3);
            let valor2 = (this.iSriVentas.trscodigoporcentaje3 === "" || this.iSriVentas.trscodigoporcentaje3 === undefined) ? 0 : parseFloat(this.iSriVentas.trscodigoporcentaje3);
            calculo = (valor1 * valor2) / 100;
            this.iSriVentas.scomvalorretrenta3 = calculo.toFixed(2);
        }
    }
    cierreCliente(event: any) {
        if (event.length > 0) {
            this.hideModal()
            this.setdatosfromProveedor(JSON.parse(event));
        }
    }

    cierreRetencion(event: string) {
        if (event !== "") {
            this.hideModal()
            var datos = JSON.parse(event);
            if (this.bandera === 1) {
                this.iSriVentas.trscodigo = datos.trscodigo;
                this.iSriVentas.trsdescripcion = datos.trsdescripcion;
                this.iSriVentas.trscodigoporcentaje = datos.trscodigoporcentaje;
            }
            if (this.bandera === 2) {
                this.iSriVentas.trscodigo1 = datos.trscodigo;
                this.iSriVentas.trsdescripcion1 = datos.trsdescripcion;
                this.iSriVentas.trscodigoporcentaje1 = datos.trscodigoporcentaje;
            }
            if (this.bandera === 3) {
                this.iSriVentas.trscodigo2 = datos.trscodigo;
                this.iSriVentas.trsdescripcion2 = datos.trsdescripcion;
                this.iSriVentas.trscodigoporcentaje2 = datos.trscodigoporcentaje;
            }
            if (this.bandera === 4) {
                this.iSriVentas.trscodigo3 = datos.trscodigo;
                this.iSriVentas.trsdescripcion3 = datos.trsdescripcion;
                this.iSriVentas.trscodigoporcentaje3 = datos.trscodigoporcentaje;
            }
        }
    }

    setdatosfromProveedor(_datos: any) {
        if (this.banderaprv === 0) {
            this.iSriVentas.clcodigo = _datos.cl_codigo;
            this.iSriVentas.svenumidcliente = _datos.cl_identificacion;
            this.iSriVentas.clnombre = _datos.cl_nombre;
            if (_datos.cl_identificacion === '9999999999999') {
                this.iSriVentas.tidcodigo = "F";
            } else if (_datos.cl_identificacion.toString().length === 10) {
                this.iSriVentas.tidcodigo = "C";
            } else if (_datos.cl_identificacion.toString().length === 13) {
                this.iSriVentas.tidcodigo = "R";
            } else {
                this.iSriVentas.tidcodigo = "P";
            }
        }
    }
    buscar(ban: number) {
        this.banderaprv = ban;
        this.cargarCliente();
    }
    cargarCliente() {

        this.spinner.show();
        this.mantenimientoService.manCliente(globales.cia).subscribe(data => {
            try {
                this.listadocliente = data.root[0];
                this.openModal(this.modalbusquedacliente, "");
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

        //this.spinner.show();
        //this.mantenimientoService.getClientescia(globales.cia).subscribe(data => {
        //    try {
        //        this.listadocliente = data;
        //        this.openModal(this.modalbusquedacliente, "");
        //        this.spinner.hide();
        //    } catch (e) {
        //        this.spinner.hide();
        //    }
        //}, () => {
        //    this.spinner.hide();
        //});
    }
    limpia(ban: number) {
        if (ban === 1) {
            this.iSriVentas.trscodigo = "";
            this.iSriVentas.trsdescripcion = "";
            this.iSriVentas.scombaseimponiblerenta = "";
            this.iSriVentas.trscodigoporcentaje = "";
            this.iSriVentas.scomvalorretrenta = "";
        }
        if (ban === 2) {
            this.iSriVentas.trscodigo1 = "";
            this.iSriVentas.trsdescripcion1 = "";
            this.iSriVentas.scombaseimponiblerenta1 = "";
            this.iSriVentas.trscodigoporcentaje1 = "";
            this.iSriVentas.scomvalorretrenta1 = "";
        }
        if (ban === 3) {
            this.iSriVentas.trscodigo2 = "";
            this.iSriVentas.trsdescripcion2 = "";
            this.iSriVentas.scombaseimponiblerenta2 = "";
            this.iSriVentas.trscodigoporcentaje2 = "";
            this.iSriVentas.scomvalorretrenta2 = "";
        }
        if (ban === 4) {
            this.iSriVentas.trscodigo3 = "";
            this.iSriVentas.trsdescripcion3 = "";
            this.iSriVentas.scombaseimponiblerenta3 = "";
            this.iSriVentas.trscodigoporcentaje3 = "";
            this.iSriVentas.scomvalorretrenta3 = "";
        }
    }
    btn_cargar_Click() {
        this.spinner.show();
        this.sriService.getSriVentasDocs(globales.cia, this.ne_anio, this.ddw_mes).subscribe(async datos => {
            try {
                this.spinner.hide();
                this.iVentas = datos.root[0];
                this.dg_ventas = Funcion.cloneObjetoarray(this.iVentas);

                if (this.dg_ventas.length > 0) {
                    this.habilitabuscar = true;
                    this.botones.btnnuevo = false;
                }
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cbx_error_CheckedChanged() {
        this.spinner.show();
        if (this.cbx_error) {
            var info: any[] = this.iVentas.filter((x) => x.error > 0);
            this.dg_ventas = Funcion.cloneObjetoarray(info);
        } else {
            this.dg_ventas = Funcion.cloneObjetoarray(this.iVentas);
        }
        this.spinner.hide();
    }

    limpiarColor() {
        this.dg_ventas.forEach((e) => {
            e.color = "";
        });
    }
    veredit(row: any) {
        let lSec: number = row.sve_secuncia;
        this.spinner.show();
        this.sriService.getSriVentas(globales.cia, this.ne_anio, this.ddw_mes, lSec.toString()).subscribe(async datos => {
            try {
                this.spinner.hide();
                var lCon = datos.table1[0];
                this.iSriVentas = lCon;

                this.isAccion = "M";
                this.botones.btnnuevo = true;
                this.botones.btnmodificar = false;
                this.botones.btneliminar = false;
                this.ddw_tipoComprobante_SelectionChanged();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    vererror(row: any) {
        let lSec: number = row.scom_secuencia;
        var datos: string = "";
        datos.toLowerCase().includes("")
        if (this.iVentas.find((x) => x.scom_secuencia === lSec).menErr != "" && this.iVentas.find((x) => x.scom_secuencia === lSec).menErr != null) {
            if (this.iVentas.find((x) => x.scom_secuencia === lSec).menErr.length > 0) {
                this.iVentas.find((x) => x.scom_secuencia === lSec).menErr = this.iVentas.find((x) => x.scom_secuencia === lSec).menErr.replace("\r\n", "<br />");
                this.iVentas.find((x) => x.scom_secuencia === lSec).menErr = this.iVentas.find((x) => x.scom_secuencia === lSec).menErr.replace("\n", "<br />");
                if (this.iVentas.find((x) => x.scom_secuencia === lSec).menErr.toLowerCase().includes("error")) {
                    this.modalmensaje("2", this.iVentas.find((x) => x.scom_secuencia === lSec).menErr);
                } else if (this.iVentas.find((x) => x.scom_secuencia === lSec).menErr.toLowerCase().includes("advertencia")) {
                    this.modalmensaje("2", this.iVentas.find((x) => x.scom_secuencia === lSec).menErr);
                }
            }
        }
    }
    clickGrid(row: any) {
        this.limpiarColor();
        this.lineacompras = row.sve_secuncia;
        row.color = "SG";
    }
    limpiarpantalla() {
        this.iSriVentas = {};
        this.iSriVentas.scomconvdobtrib = "N";
        this.iSriVentas.scompagextsujret = "N";
        this.ddw_mes = parseInt(this.fechaservidor.substr(5, 2)).toString();
        this.ne_anio = parseInt(this.fechaservidor.substr(0, 4)).toString();
        this.txt_identificacion = "";
        this.cbx_error = false;
        this.habilitabuscar = false;
        this.habilitaobjetofrom = true;
        this.submitted = false;
        this.banderaprv = 0;
        this.dg_ventas = [];
        this.isAccion = "";
        this.limpiatab(1);
    }
    limpiarpantalla2() {
        this.iSriVentas = {};
        this.iSriVentas.scomconvdobtrib = "N";
        this.iSriVentas.scompagextsujret = "N";
        //this.ddw_mes = parseInt(this.fechaservidor.substr(5, 2)).toString();
        //this.ne_anio = parseInt(this.fechaservidor.substr(0, 4)).toString();
        //this.cbx_error = false;
        //this.habilitabuscar = false;
        //this.habilitaobjetofrom = true;
        //this.submitted = false;
        //this.banderaprv = 0;
        //this.dg_ventas = [];
        this.isAccion = "";
        this.limpiatab(1);
    }


    salir() {
        this.router.navigate(['/principal/default'], {
            skipLocationChange: true,
        });
    }

    cierreModal(event: boolean) {
        if (event) {
            this.hideModal()
        }
    }

    hideModal() {
        if (this.modalRef != undefined) {
            this.modalRef.hide();
        }
    }

    openModal(content: string, tipo: string) {
        this.modalRef = this.modalService.show(
            content, { class: tipo });
    }

    modalmensaje(tipo: string, mensaje: string) {
        this.llamarmodal = tipo + "|Ingreso de Ventas SRI|" + mensaje + "|" + Funcion.Ramdon();
    }
}
