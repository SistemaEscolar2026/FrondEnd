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
    templateUrl: './sricompras.component.html',
    styleUrls: ['./sricompras.component.scss']
})
export class SriComprasComponent implements OnInit {

    @ViewChild('modalbusquedaproveedor') modalbusquedaproveedor: any;
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
    iDocumento: any = {};
    iReembolsos: any[] = [];
    iReembolsoshijo: any = {};
    listmes: any[] = [];
    ddw_parteRel: any[] = [];
    dg_listCompras: any[] = [];
    ddw_tipoComprobante: any[] = [];
    listretencionsri: any[] = [];
    iCompras: any[] = [];
    listproveedor: any[] = [];
    ddw_sustento: any[] = [];
    ddw_tipoProv: any[] = [];
    ddw_tipoIdent: any[] = [];
    modalRef: any;
    indextabh: number = 0;
    lineacompras: string = "";
    txtbusca: string = "";
    lineareembolso: string = "";
    /**
  * DEFINICION DE VARIABLE DE CONTROL DE ACCION SUBMIT DE PAGINA
  */
    submitted = false;
    isAccion: string = "";
    ColumnaDetalle: any[] = ['Sec.', 'Sustento', 'Id. Proveedor', 'Tipo Comprobante', 'Serie', 'Sec. Comp.', 'Autorización Comp.', '', ''];
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
    tipocompro: boolean = true;
    reembolso: boolean = true;
    tab: TabuladoresModel = new TabuladoresModel();
    llamarmodal: string = "";

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
    fin: string = "";
    fechaservidor: string = "";
    iNumRef: string = "";
    selectedlineagrid: any = {};
    iNovedades: any[] = [];
    ddw_codIva: any[] = [];
    ddw_tipoPago: any[] = [];
    listipoidentificacion: any[] = [];
    ddw_pais: any[] = [];
    ddw_fPago: any[] = [];
    ddw_retIvaBie: any[] = [];
    ddw_retIvaSer: any[] = [];
    ddw_codIce: any[] = [];
    listreposanble: any[] = [];
    listtiponovedad: any[] = [];
    parametros: any[] = [];
    ddw_mes: string = "";
    ne_anio: string = "";
    iTipoId: string = "";
    bandera: number = 0;
    banderaprv: number = 0;
    cbx_error: boolean = false;

    ngOnInit() {
        var fecha = new Date();
        this.fechaservidor = moment(fecha).format("YYYY-MM-DD").toString();

        this.limpiabotones(1);

    }
    dblclickGrid(row: any) {

    }
    nuevo() {
        this.iDocumento = {};

        this.iDocumento.scomfechacmbtevta = this.fechaservidor;
        this.iDocumento.scomfechacmbtectble = this.fechaservidor;

        this.iDocumento.scomidproveedor = "";

        this.iDocumento.scombasecero = 0;
        this.iDocumento.scombaseiva = 0;
        this.iDocumento.scomvaloriva = 0;
        this.iDocumento.scombasenoobjetoiva = 0;
        this.iDocumento.scomvalorice = 0;
        this.iDocumento.scomvalorivabienes = 0;
        this.iDocumento.scomvalorretivabienes = 0;
        this.iDocumento.scomvalorivaservicios = 0;
        this.iDocumento.scomvalorretivaservicios = 0;
        this.iDocumento.scomvalorretiva100 = 0;
        this.iDocumento.scombaseimponiblerenta = 0;
        this.iDocumento.scomvalorretrenta = 0;
        this.iDocumento.scombaseimponiblerenta1 = 0;
        this.iDocumento.scomvalorretrenta1 = 0;
        this.iDocumento.scombaseimponiblerenta2 = 0;
        this.iDocumento.scomvalorretrenta2 = 0;
        this.iDocumento.scombaseimponiblerenta3 = 0;
        this.iDocumento.scomvalorretrenta3 = 0;

        this.iDocumento.scomconvdobtrib = "N";
        this.iDocumento.scompagextsujret = "N";


        this.iDocumento.compras = [];
        this.iDocumento.ventas = [];
        this.iDocumento.ventasEstab = [];
        this.iDocumento.air = [];
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
            this.iDocumento = {};
            this.isAccion = "";
            this.botones.btnnuevo = false;
            this.botones.btngrabar = true;
            this.tipocompro = true
            this.habilitaobjetofrom = true;
            this.iDocumento.compras = [];
            this.iDocumento.air = [];
            this.iDocumento.ventas = [];
            this.iDocumento.ventasEstab = [];

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
        this.limpiarpantalla();
        this.cargaTiposustento();
        this.cargaTipoCompra();
        this.cargaTipoIdenti();
        this.cargaTipoProveedor();
        this.cargaIva();
        this.cargaIce();
        this.cargaRetIva();
        this.cargaRetIvaSer();
        this.cargaTipoPago();
        this.cargaPais();
        this.cargaFormaPago();
        this.cargatipoidentificacion();
        this.configCiaSri();
        this.cargaTemplates();
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
    cargaTipoPago() {
        this.spinner.show();
        this.mantenimientoService.getTipopagoSri().subscribe(data => {
            try {
                this.ddw_tipoPago = [];
                this.ddw_tipoPago.push({
                    tppcodigo: "",
                    tppnombre: ""
                });
                data.root[0].forEach((x: any) => {
                    this.ddw_tipoPago.push(x);
                });
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
    cargaPais() {
        this.spinner.show();
        this.mantenimientoService.getPaisSri().subscribe(data => {
            try {
                this.ddw_pais = [];
                this.ddw_pais.push({
                    pscodigo: "",
                    psnombre: ""
                });
                data.root[0].forEach((x: any) => {
                    this.ddw_pais.push(x);
                });
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }

    cargaFormaPago() {
        this.spinner.show();
        this.mantenimientoService.getFPagoSriAll().subscribe(data => {
            try {
                this.ddw_fPago = [];
                this.ddw_fPago.push({
                    fpscodigo: "",
                    fpsnombre: ""
                });
                data.root[0].forEach((x: any) => {
                    this.ddw_fPago.push(x);
                });
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cargaTemplates() {

        this.httpClient.get("../assets/Templates/inicio.ftl").subscribe((data) => {
            this.inicio = data.toString();
            console.log(this.inicio);
        }, error => {
            this.inicio = error.error.text;
            console.log(this.inicio);
        });

        this.httpClient.get("../assets/Templates/compras/com_inicioNP.ftl").subscribe((data) => {
            this.com_inicioNP = data.toString();
            console.log(this.com_inicioNP);
        }, error => {
            this.com_inicioNP = error.error.text;
            console.log(this.com_inicioNP);
        });

        this.httpClient.get("../assets/Templates/compras/com_inicio.ftl").subscribe((data) => {
            this.com_inicio = data.toString();
            console.log(this.com_inicio);
        }, error => {
            this.com_inicio = error.error.text;
            console.log(this.com_inicio);
        });
        this.httpClient.get("../assets/Templates/compras/com_inicio2NP.ftl").subscribe((data) => {
            this.com_inicio2NP = data.toString();
            console.log(this.com_inicio2NP);
        }, error => {
            this.com_inicio2NP = error.error.text;
            console.log(this.com_inicio2NP);
        });
        this.httpClient.get("../assets/Templates/compras/com_inicio2.ftl").subscribe((data) => {
            this.com_inicio2 = data.toString();
            console.log(this.com_inicio2);
        }, error => {
            this.com_inicio2 = error.error.text;
            console.log(this.com_inicio2);
        });

        this.httpClient.get("../assets/Templates/compras/com_fpagos5.ftl").subscribe((data) => {
            this.com_fpagos5 = data.toString();
            console.log(this.com_fpagos5);
        }, error => {
            this.com_fpagos5 = error.error.text;
            console.log(this.com_fpagos5);
        });
        this.httpClient.get("../assets/Templates/compras/com_fpagos4.ftl").subscribe((data) => {
            this.com_fpagos4 = data.toString();
            console.log(this.com_fpagos4);
        }, error => {
            this.com_fpagos4 = error.error.text;
            console.log(this.com_fpagos4);
        });
        this.httpClient.get("../assets/Templates/compras/com_fpagos3.ftl").subscribe((data) => {
            this.com_fpagos3 = data.toString();
            console.log(this.com_fpagos3);
        }, error => {
            this.com_fpagos3 = error.error.text;
            console.log(this.com_fpagos3);
        });
        this.httpClient.get("../assets/Templates/compras/com_fpagos2.ftl").subscribe((data) => {
            this.com_fpagos2 = data.toString();
            console.log(this.com_fpagos2);
        }, error => {
            this.com_fpagos2 = error.error.text;
            console.log(this.com_fpagos2);
        });
        this.httpClient.get("../assets/Templates/compras/com_fpagos.ftl").subscribe((data) => {
            this.com_fpagos = data.toString();
            console.log(this.com_fpagos);
        }, error => {
            this.com_fpagos = error.error.text;
            console.log(this.com_fpagos);
        });
        this.httpClient.get("../assets/Templates/compras/com_air.ftl").subscribe((data) => {
            this.com_air = data.toString();
            console.log(this.com_air);
        }, error => {
            this.com_air = error.error.text;
            console.log(this.com_air);
        });
        this.httpClient.get("../assets/Templates/compras/com_air2.ftl").subscribe((data) => {
            this.com_air2 = data.toString();
            console.log(this.com_air2);
        }, error => {
            this.com_air2 = error.error.text;
            console.log(this.com_air2);
        });
        this.httpClient.get("../assets/Templates/compras/com_fin_air.ftl").subscribe((data) => {
            this.com_fin_air = data.toString();
            console.log(this.com_fin_air);
        }, error => {
            this.com_fin_air = error.error.text;
            console.log(this.com_fin_air);
        });
        this.httpClient.get("../assets/Templates/compras/com_sinair.ftl").subscribe((data) => {
            this.com_sinair = data.toString();
            console.log(this.com_sinair);
        }, error => {
            this.com_sinair = error.error.text;
            console.log(this.com_sinair);
        });
        this.httpClient.get("../assets/Templates/compras/com_rete.ftl").subscribe((data) => {
            this.com_rete = data.toString();
            console.log(this.com_rete);
        }, error => {
            this.com_rete = error.error.text;
            console.log(this.com_rete);
        });
        this.httpClient.get("../assets/Templates/compras/com_rete2.ftl").subscribe((data) => {
            this.com_rete2 = data.toString();
            console.log(this.com_rete2);
        }, error => {
            this.com_rete2 = error.error.text;
            console.log(this.com_rete2);
        });
        this.httpClient.get("../assets/Templates/compras/com_docModif.ftl").subscribe((data) => {
            this.com_docModif = data.toString();
            console.log(this.com_docModif);
        }, error => {
            this.com_docModif = error.error.text;
            console.log(this.com_docModif);
        });
        this.httpClient.get("../assets/Templates/compras/com_reembolso.ftl").subscribe((data) => {
            this.com_reembolso = data.toString();
            console.log(this.com_reembolso);
        }, error => {
            this.com_reembolso = error.error.text;
            console.log(this.com_reembolso);
        });
        this.httpClient.get("../assets/Templates/compras/com_reembolso2.ftl").subscribe((data) => {
            this.com_reembolso2 = data.toString();
            console.log(this.com_reembolso2);
        }, error => {
            this.com_reembolso2 = error.error.text;
            console.log(this.com_reembolso2);
        });
        this.httpClient.get("../assets/Templates/compras/com_fin_reembolso.ftl").subscribe((data) => {
            this.com_fin_reembolso = data.toString();
            console.log(this.com_fin_reembolso);
        }, error => {
            this.com_fin_reembolso = error.error.text;
            console.log(this.com_fin_reembolso);
        });
        this.httpClient.get("../assets/Templates/compras/com_fin_detCom.ftl").subscribe((data) => {
            this.com_fin_detCom = data.toString();
            console.log(this.com_fin_detCom);
        }, error => {
            this.com_fin_detCom = error.error.text;
            console.log(this.com_fin_detCom);
        });
        this.httpClient.get("../assets/Templates/compras/com_fin.ftl").subscribe((data) => {
            this.com_fin = data.toString();
            console.log(this.com_fin);
        }, error => {
            this.com_fin = error.error.text;
            console.log(this.com_fin);
        });
        this.httpClient.get("../assets/Templates/fin.ftl").subscribe((data) => {
            this.fin = data.toString();
            console.log(this.fin);
        }, error => {
            this.fin = error.error.text;
            console.log(this.fin);
        });

    }
    guardar() {


        let lsXML: string = "";

        let lsArchivo: string = "";
        let lsError: string = "";

        //Valido los combos para que tengan seleccionado un dato valido
        if (this.iDocumento.ctcodigo === null || this.iDocumento.ctcodigo === "" || this.iDocumento.ctcodigo === undefined) {
            this.modalmensaje("1", "Ha digitado un texto que no existe como sustento tributario. Favor Revisar...");
            return;
        }

        if (this.iDocumento.tcocodigo === null || this.iDocumento.tcocodigo === "" || this.iDocumento.tcocodigo === undefined) {
            this.modalmensaje("1", "Ha digitado un texto que no existe como tipo de comprobante. Favor Revisar...");
            return;
        }

        if (this.iDocumento.ivacodigo === null || this.iDocumento.ivacodigo === "" || this.iDocumento.ivacodigo === undefined) {
            this.modalmensaje("1", "Ha digitado un texto que no existe como código IVA. Favor Revisar...");
            return;
        }


        //if (this.iDocumento.icecodigo === null || this.iDocumento.icecodigo === "" || this.iDocumento.icecodigo === undefined) {
        //  this.modalmensaje("1", "Ha digitado un texto que no existe como código ICE. Favor Revisar...");
        //  return;
        //}
        if (this.iDocumento.rivcodigobienes === null || this.iDocumento.rivcodigobienes === "" || this.iDocumento.rivcodigobienes === undefined) {
            this.modalmensaje("1", "Ha digitado un texto que no existe como retención IVA Bienes. Favor Revisar...");
            return;
        }

        //if (this.iDocumento.rivcodigobienes2 === null || this.iDocumento.rivcodigobienes2 === "" || this.iDocumento.rivcodigobienes2 === undefined) {
        //  this.modalmensaje("1", "Ha digitado un texto que no existe como retención IVA Bienes. Favor Revisar...");
        //  return;
        //}


        //if (this.iDocumento.rivcodigoservicios === null || this.iDocumento.rivcodigoservicios === "" || this.iDocumento.rivcodigoservicios === undefined) {
        //  this.modalmensaje("1", "Ha digitado un texto que no existe como retención IVA Servicios. Favor Revisar...");
        //  return;
        //}

        if (this.iDocumento.tcocodigo === "04" || this.iDocumento.tcocodigo === "05") {
            if (this.iDocumento.tcocodigomodif === null || this.iDocumento.tcocodigomodif === "" || this.iDocumento.tcocodigomodif === undefined) {
                this.modalmensaje("1", "Ha digitado un texto que no existe como tipo de comprobante relacionado. Favor Revisar...");
                return;
            }
        }



        if (this.iDocumento.tppcodigo === null || this.iDocumento.tppcodigo === "" || this.iDocumento.tppcodigo === undefined) {
            this.modalmensaje("1", "Ha digitado un texto que no existe como tipo de pago. Favor Revisar...");
            return;
        }

        if (this.iDocumento.pscodigo === null || this.iDocumento.pscodigo === "" || this.iDocumento.pscodigo === undefined) {
            this.modalmensaje("1", "Ha digitado un texto que no existe como país. Favor Revisar...");
            return;
        }


        if (this.iDocumento.fpscodigo1 === null || this.iDocumento.fpscodigo1 === "" || this.iDocumento.fpscodigo1 === undefined) {
            this.modalmensaje("1", "Ha digitado un texto que no existe como forma de pago 1. Favor Revisar...");
            return;
        }

        var dato: number[] = [];

        this.iCompras.forEach((x) => {
            dato.push(x.scom_secuencia);
        });


        if (this.isAccion == "I") {
            this.iDocumento.ciacodigo = globales.cia;
            this.iDocumento.scomanio = this.ne_anio;
            this.iDocumento.scommes = this.ddw_mes;
            this.iDocumento.scomsecuencia = this.iCompras.length > 0 ? dato.reduce((w: any, o: any, r: any, k: any, s = Math) => s.max.apply(0, k)) + 1 : 1;
        } else {
            this.iDocumento.ciacodigo = globales.cia;
        }
        this.iDocumento.tpscodigo = this.iDocumento.tpscodigo === "" ? null : this.iDocumento.tpscodigo;
        this.iDocumento.scomparterel = this.iDocumento.scomparterel === "" ? null : this.iDocumento.scomparterel;

        this.iDocumento.ccxpnumero = this.iDocumento.scomnumfac;
        this.iDocumento.ivacodigo = this.iDocumento.ivacodigo === "" ? null : this.iDocumento.ivacodigo;
        this.iDocumento.icecodigo = this.iDocumento.icecodigo === "" ? null : this.iDocumento.icecodigo;
        this.iDocumento.rivcodigobienes = this.iDocumento.rivcodigobienes === "" ? null : this.iDocumento.rivcodigobienes;
        this.iDocumento.rivcodigobienes2 = this.iDocumento.rivcodigobienes2 === "" ? null : this.iDocumento.rivcodigobienes2;
        this.iDocumento.rivcodigoservicios = this.iDocumento.rivcodigoservicios === "" ? null : this.iDocumento.rivcodigoservicios;

        if (this.iDocumento.trscodigo === null || this.iDocumento.trscodigo === "" || this.iDocumento.trscodigo === undefined) {
            this.iDocumento.trscodigo = null;
            this.iDocumento.trscodigoporcentaje = null;
        }

        if (this.iDocumento.trscodigo1 === null || this.iDocumento.trscodigo1 === "" || this.iDocumento.trscodigo1 === undefined) {
            this.iDocumento.trscodigo1 = null;
            this.iDocumento.trscodigoporcentaje1 = null;
        }


        if (this.iDocumento.trscodigo2 === null || this.iDocumento.trscodigo2 === "" || this.iDocumento.trscodigo2 === undefined) {
            this.iDocumento.trscodigo2 = null;
            this.iDocumento.trscodigoporcentaje2 = null;
        }

        if (this.iDocumento.trscodigo3 === null || this.iDocumento.trscodigo3 === "" || this.iDocumento.trscodigo3 === undefined) {
            this.iDocumento.trscodigo3 = null;
            this.iDocumento.trscodigoporcentaje3 = null;
        }


        this.iDocumento.scomseriecmbte = this.iDocumento.scomseriecmbte === "" || this.iDocumento.scomseriecmbte === undefined ? null : this.iDocumento.scomseriecmbte;
        this.iDocumento.scompuntocmbte = this.iDocumento.scompuntocmbte === "" || this.iDocumento.scompuntocmbte === undefined ? null : this.iDocumento.scompuntocmbte;
        this.iDocumento.scomnumfac = this.iDocumento.scomnumfac === "" || this.iDocumento.scomnumfac === undefined ? null : this.iDocumento.scomnumfac;
        this.iDocumento.scomnumautcmbte = this.iDocumento.scomnumautcmbte === "" || this.iDocumento.scomnumautcmbte === undefined ? null : this.iDocumento.scomnumautcmbte;

        this.iDocumento.scomseriecmbteret = this.iDocumento.scomseriecmbteret === "" || this.iDocumento.scomseriecmbteret === undefined ? null : this.iDocumento.scomseriecmbteret;
        this.iDocumento.scompuntocmbteret = this.iDocumento.scompuntocmbteret === "" || this.iDocumento.scompuntocmbteret === undefined ? null : this.iDocumento.scompuntocmbteret;
        this.iDocumento.scomnumcmbteret = this.iDocumento.scomnumcmbteret === "" || this.iDocumento.scomnumcmbteret === undefined ? null : this.iDocumento.scomnumcmbteret;
        this.iDocumento.scomautocmbteret = this.iDocumento.scomautocmbteret === "" || this.iDocumento.scomautocmbteret === undefined ? null : this.iDocumento.scomautocmbteret;
        this.iDocumento.scomfeccmbteret = this.iDocumento.scomfeccmbteret === "" || this.iDocumento.scomfeccmbteret === undefined ? null : this.iDocumento.scomfeccmbteret;
        this.iDocumento.scomseriecmbteret1 = this.iDocumento.scomseriecmbteret1 === "" || this.iDocumento.scomseriecmbteret1 === undefined ? null : this.iDocumento.scomseriecmbteret1;
        this.iDocumento.scompuntocmbteret1 = this.iDocumento.scompuntocmbteret1 === "" || this.iDocumento.scompuntocmbteret1 === undefined ? null : this.iDocumento.scompuntocmbteret1;
        this.iDocumento.scomnumcmbteret1 = this.iDocumento.scomnumcmbteret1 === "" || this.iDocumento.scomnumcmbteret1 === undefined ? null : this.iDocumento.scomnumcmbteret1;

        this.iDocumento.scomautocmbteret1 = this.iDocumento.scomautocmbteret1 === "" || this.iDocumento.scomautocmbteret1 === undefined ? null : this.iDocumento.scomautocmbteret1;
        this.iDocumento.scomfeccmbteret1 = this.iDocumento.scomfeccmbteret1 === "" || this.iDocumento.scomfeccmbteret1 === undefined ? null : this.iDocumento.scomfeccmbteret1;
        this.iDocumento.tcocodigomodif = this.iDocumento.tcocodigomodif === "" || this.iDocumento.tcocodigomodif === undefined ? null : this.iDocumento.tcocodigomodif;
        this.iDocumento.scomseriecmbtemodif = this.iDocumento.scomseriecmbtemodif === "" || this.iDocumento.scomseriecmbtemodif === undefined ? null : this.iDocumento.scomseriecmbtemodif;
        this.iDocumento.scompuntocmbtemodif = this.iDocumento.scompuntocmbtemodif === "" || this.iDocumento.scompuntocmbtemodif === undefined ? null : this.iDocumento.scompuntocmbtemodif;
        this.iDocumento.scomnumcbtemodif = this.iDocumento.scomnumcbtemodif === "" || this.iDocumento.scomnumcbtemodif === undefined ? null : this.iDocumento.scomnumcbtemodif;
        this.iDocumento.scomnumautocmbtemodif = this.iDocumento.scomnumautocmbtemodif === "" || this.iDocumento.scomnumautocmbtemodif === undefined ? null : this.iDocumento.scomnumautocmbtemodif;
        this.iDocumento.pscodigo = this.iDocumento.pscodigo === "" || this.iDocumento.pscodigo === undefined ? null : this.iDocumento.pscodigo;
        this.iDocumento.fpscodigo1 = this.iDocumento.fpscodigo1 === "" || this.iDocumento.fpscodigo1 === undefined ? null : this.iDocumento.fpscodigo1;
        this.iDocumento.fpscodigo2 = this.iDocumento.fpscodigo2 === "" || this.iDocumento.fpscodigo2 === undefined ? null : this.iDocumento.fpscodigo2;
        this.iDocumento.fpscodigo3 = this.iDocumento.fpscodigo3 === "" || this.iDocumento.fpscodigo3 === undefined ? null : this.iDocumento.fpscodigo3;
        this.iDocumento.fpscodigo4 = this.iDocumento.fpscodigo4 === "" || this.iDocumento.fpscodigo4 === undefined ? null : this.iDocumento.fpscodigo4;
        this.iDocumento.fpscodigo5 = this.iDocumento.fpscodigo5 === "" || this.iDocumento.fpscodigo5 === undefined ? null : this.iDocumento.fpscodigo5;

        if (this.iReembolsos != null) {
            if (this.iReembolsos.length > 0) {
                this.iReembolsos.forEach((rS) => {
                    rS.ciacodigo = this.iDocumento.ciacodigo;
                    rS.tcxpcodigo = this.iDocumento.tcxpcodigo === null ? "" : this.iDocumento.tcxpcodigo;
                    rS.ccxpnumero = this.iDocumento.ccxpnumero;
                    rS.prcodigo = this.iDocumento.prcodigo;
                });

            }
            else {
                this.iReembolsos = [];
            }
        }

        let SriExtraeTotVtasEstab: any[] = [];

        var info = this.uf_prepara(parseInt(this.ddw_mes), parseInt(this.ne_anio), this.iTipoId, this.iDocumento, null, SriExtraeTotVtasEstab, this.iReembolsos)

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

        lsArchivo = (this.iDocumento.tcxpcodigo === null || this.iDocumento.tcxpcodigo === undefined ? this.iDocumento.tcocodigo : this.iDocumento.tcxpcodigo) + "_" + this.iDocumento.ccxpnumero + "_" + this.iDocumento.prcodigo + ".xml";


        this.spinner.show();
        this.mantenimientoService.validarEsquema(general, lsArchivo).subscribe(data => {
            try {
                this.iDocumento.errores = [];
                var esquema: string = "";
                if (data.msgError !== null) {
                    esquema = data.msgError;
                }

                if (esquema.length > 0) {
                    this.iDocumento.errores.push(esquema);
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
                        this.iDocumento.errores.push(valida);
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
        this.iDocumento.errores.forEach((s: any) => {
            if (this.iDocumento.errores.indexOf(s) === this.iDocumento.errores.length - 1) {
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

            iError.ciacodigo = this.iDocumento.ciacodigo;
            iError.eiianio = this.iDocumento.scomanio;
            iError.eiimes = this.iDocumento.scommes;
            iError.eiisecuencial = this.iDocumento.scomsecuencia;
            iError.eiitabla = "C";
            iError.eiierrtext = lsError;

        }

        iError.ciacodigo = this.iDocumento.ciacodigo;
        iError.eiianio = this.iDocumento.scomanio;
        iError.eiimes = this.iDocumento.scommes;
        iError.eiisecuencial = this.iDocumento.scomsecuencia;
        iError.eiitabla = "C";
        iError.eiierrtext = lsError;
        let dateObj = new Date(this.iDocumento.scomfeccmbteret);

        if (Number.isNaN(dateObj.valueOf())) {
            this.iDocumento.scomfeccmbteret = null;
        }



        var ling: any = {};
        ling.compras = this.iDocumento;
        ling.reembolsos = this.iReembolsos;
        ling.error = iError;

        if (this.isAccion === "I") {
            this.spinner.show();
            this.sriService.insertCompras(ling).subscribe(data => {
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
            this.sriService.updateCompras(ling).subscribe(data => {
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
        this.sriService.deleteCompras(globales.cia, this.iDocumento.scomanio, this.iDocumento.scommes, this.iDocumento.scomsecuencia).subscribe(data => {
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
            if (retorno.venta === null || retorno.venta === undefined) {
                retorno.venta = [];
            }
        } catch (e) {
            retorno.venta = [];
        }
        if (venta != null) {
            retorno.ventas.push(this.uf_ventas(venta));
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
        retorno.fPago = venta.fps_codigo;
        return retorno;
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
        this.iDocumento = {};
        this.isAccion = "";
        this.botones.btnnuevo = false;
        this.botones.btngrabar = true;
        this.tipocompro = true
        this.habilitaobjetofrom = true;
        this.iDocumento.compras = [];
        this.iDocumento.air = [];
        this.iDocumento.ventas = [];
        this.iDocumento.ventasEstab = [];

    }
    ne_baseImpIva_ValueChanged() {
        try {
            let porce: number = this.ddw_codIva.find((x) => x.ivacodigo === ((this.iDocumento.ivacodigo === "" || this.iDocumento.ivacodigo === undefined) ? "0" : this.iDocumento.ivacodigo)).ivaporcentaje;

            this.iDocumento.scomvaloriva = ((parseFloat(this.iDocumento.scombaseiva) * porce) / 100).toFixed(2);
        } catch (e) {
            this.iDocumento.scomvaloriva = 0;
        }
    }
    ddw_retIvaBie_SelectionChanged() {
        if (this.iDocumento.rivcodigobienes != "" && this.iDocumento.rivcodigobienes != undefined) {
            try {
                let porce: number = this.ddw_retIvaBie.find((x) => x.rivcodigo === ((this.iDocumento.rivcodigobienes === "" || this.iDocumento.rivcodigobienes === undefined) ? "0" : this.iDocumento.rivcodigobienes)).rivporcentaje;

                this.iDocumento.scomvalorretivabienes = ((parseFloat(this.iDocumento.scomvaloriva) * porce) / 100).toFixed(2);
                this.iDocumento.scomvalorivabienes = this.iDocumento.scomvaloriva
            } catch (e) {
                this.iDocumento.scomvalorivabienes = 0;
                this.iDocumento.scomvalorretivabienes = 0;
            }
        } else {
            this.iDocumento.scomvalorivabienes = 0;
            this.iDocumento.scomvalorretivabienes = 0;
        }

    }
    ddw_retIvaBie_SelectionChanged2() {
        if (this.iDocumento.rivcodigobienes2 != "" && this.iDocumento.rivcodigobienes2 != undefined) {
            try {
                let porce: number = this.ddw_retIvaBie.find((x) => x.rivcodigo === ((this.iDocumento.rivcodigobienes2 === "" || this.iDocumento.rivcodigobienes2 === undefined) ? "0" : this.iDocumento.rivcodigobienes2)).rivporcentaje;

                this.iDocumento.scomvalorretivabienes2 = ((parseFloat(this.iDocumento.scomvaloriva) * porce) / 100).toFixed(2);
                this.iDocumento.scomvalorivabienes2 = this.iDocumento.scomvaloriva
            } catch (e) {
                this.iDocumento.scomvalorivabienes2 = 0;
                this.iDocumento.scomvalorretivabienes2 = 0;
            }
        } else {
            this.iDocumento.scomvalorivabienes2 = 0;
            this.iDocumento.scomvalorretivabienes2 = 0;
        }
    }
    ddw_retIvaSer_SelectionChanged() {
        if (this.iDocumento.rivcodigoservicios != "" && this.iDocumento.rivcodigoservicios != undefined) {
            try {
                let porce: number = this.ddw_retIvaSer.find((x) => x.rivcodigo === ((this.iDocumento.rivcodigoservicios === "" || this.iDocumento.rivcodigoservicios === undefined) ? "0" : this.iDocumento.rivcodigoservicios)).rivporcentaje;

                this.iDocumento.scomvalorretivaservicios = ((parseFloat(this.iDocumento.scomvaloriva) * porce) / 100).toFixed(2);
                this.iDocumento.scomvalorivaservicios = this.iDocumento.scomvaloriva
            } catch (e) {
                this.iDocumento.scomvalorivaservicios = 0;
                this.iDocumento.scomvalorretivaservicios = 0;
            }
        } else {
            this.iDocumento.scomvalorivaservicios = 0;
            this.iDocumento.scomvalorretivaservicios = 0;
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

        if (this.iReembolsoshijo.rscfechadoc > this.iDocumento.scomfechacmbtevta) {
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

    cargaIva() {
        this.spinner.show();
        this.mantenimientoService.getIva().subscribe(data => {
            try {
                this.ddw_codIva = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
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

    cargaTipoProveedor() {
        this.spinner.show();
        this.mantenimientoService.getTipoproveSri().subscribe(data => {
            try {
                this.ddw_tipoProv = [];

                data.root[0].forEach((x: any) => {
                    this.ddw_tipoProv.push({
                        cocodigo: x.co_codigo,
                        tpscodigo: x.tps_codigo,
                        tpsnombre: x.tps_nombre
                    });
                });
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
    cargaTipoCompra() {
        this.spinner.show();
        this.mantenimientoService.getTipocompSriCom().subscribe(data => {
            try {
                this.ddw_tipoComprobante = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cargaRetencion(ban: number) {
        this.bandera = ban;
        this.spinner.show();
        this.mantenimientoService.getTiporetSri().subscribe(data => {
            try {
                this.listretencionsri = data;
                this.openModal(this.modalbusquedaretencion, "");
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    ddw_tipoComprobante_SelectionChanged() {
        if (this.iDocumento.tcocodigo != "" && this.iDocumento.tcocodigo != undefined) {
            if (this.iDocumento.tcocodigo === "41") {
                this.tab.tab3 = false;
                this.reembolso = false;
            } else {
                this.tab.tab3 = true;
                this.reembolso = true;
                if (this.iReembolsos != null) {
                    this.iReembolsos = [];
                }
                if (this.iDocumento.tcocodigo === "04" || this.iDocumento.tcocodigo === "05") {
                    this.tipocompro = false;
                } else {
                    this.iDocumento.tcocodigomodif = null;
                    this.iDocumento.scomseriecmbtemodif = null;
                    this.iDocumento.scompuntocmbtemodif = null;
                    this.iDocumento.scomnumcbtemodif = null;
                    this.iDocumento.scomnumautocmbtemodif = null;
                    this.tipocompro = true;
                }
            }
        }
    }
    calculo(ban: number) {
        var calculo: number = 0;
        if (ban === 1) {
            let valor1 = (this.iDocumento.scombaseimponiblerenta === "" || this.iDocumento.scombaseimponiblerenta === undefined) ? 0 : parseFloat(this.iDocumento.scombaseimponiblerenta);
            let valor2 = (this.iDocumento.trscodigoporcentaje === "" || this.iDocumento.trscodigoporcentaje === undefined) ? 0 : parseFloat(this.iDocumento.trscodigoporcentaje);
            calculo = (valor1 * valor2) / 100;
            this.iDocumento.scomvalorretrenta = calculo.toFixed(2);
        }
        if (ban === 2) {
            let valor1 = (this.iDocumento.scombaseimponiblerenta1 === "" || this.iDocumento.scombaseimponiblerenta1 === undefined) ? 0 : parseFloat(this.iDocumento.scombaseimponiblerenta1);
            let valor2 = (this.iDocumento.trscodigoporcentaje1 === "" || this.iDocumento.trscodigoporcentaje1 === undefined) ? 0 : parseFloat(this.iDocumento.trscodigoporcentaje1);
            calculo = (valor1 * valor2) / 100;
            this.iDocumento.scomvalorretrenta1 = calculo.toFixed(2);
        }
        if (ban === 3) {
            let valor1 = (this.iDocumento.scombaseimponiblerenta2 === "" || this.iDocumento.scombaseimponiblerenta2 === undefined) ? 0 : parseFloat(this.iDocumento.scombaseimponiblerenta2);
            let valor2 = (this.iDocumento.trscodigoporcentaje2 === "" || this.iDocumento.trscodigoporcentaje2 === undefined) ? 0 : parseFloat(this.iDocumento.trscodigoporcentaje2);
            calculo = (valor1 * valor2) / 100;
            this.iDocumento.scomvalorretrenta2 = calculo.toFixed(2);
        }
        if (ban === 4) {
            let valor1 = (this.iDocumento.scombaseimponiblerenta3 === "" || this.iDocumento.scombaseimponiblerenta3 === undefined) ? 0 : parseFloat(this.iDocumento.scombaseimponiblerenta3);
            let valor2 = (this.iDocumento.trscodigoporcentaje3 === "" || this.iDocumento.trscodigoporcentaje3 === undefined) ? 0 : parseFloat(this.iDocumento.trscodigoporcentaje3);
            calculo = (valor1 * valor2) / 100;
            this.iDocumento.scomvalorretrenta3 = calculo.toFixed(2);
        }
    }
    cierreProveedorarray(event: any) {
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
                this.iDocumento.trscodigo = datos.trscodigo;
                this.iDocumento.trsdescripcion = datos.trsdescripcion;
                this.iDocumento.trscodigoporcentaje = datos.trscodigoporcentaje;
            }
            if (this.bandera === 2) {
                this.iDocumento.trscodigo1 = datos.trscodigo;
                this.iDocumento.trsdescripcion1 = datos.trsdescripcion;
                this.iDocumento.trscodigoporcentaje1 = datos.trscodigoporcentaje;
            }
            if (this.bandera === 3) {
                this.iDocumento.trscodigo2 = datos.trscodigo;
                this.iDocumento.trsdescripcion2 = datos.trsdescripcion;
                this.iDocumento.trscodigoporcentaje2 = datos.trscodigoporcentaje;
            }
            if (this.bandera === 4) {
                this.iDocumento.trscodigo3 = datos.trscodigo;
                this.iDocumento.trsdescripcion3 = datos.trsdescripcion;
                this.iDocumento.trscodigoporcentaje3 = datos.trscodigoporcentaje;
            }
        }
    }

    setdatosfromProveedor(_datos: any) {
        if (this.banderaprv === 0) {
            this.iDocumento.prcodigo = _datos.prcodigo;
            this.iDocumento.txt_nomPro = _datos.prnombre;

            this.iDocumento.tidcodigo = _datos.tidcodigo;
            this.iDocumento.scomidproveedor = _datos.prcodlegal;
            this.iDocumento.tpscodigo = _datos.tpscodigo;
            this.iDocumento.scomparterel = _datos.prparterel === null ? "N" : _datos.prparterel;


            //this.spinner.show();
            //this.mantenimientoService.getGetProveedorseleccionado(globales.cia, this.iDocumento.prcodigo).subscribe(proveedor => {
            //    try {
            //        this.iDocumento.tidcodigo = proveedor.tidcodigo;
            //        this.iDocumento.scomidproveedor = proveedor.prcodlegal;
            //        this.iDocumento.tpscodigo = proveedor.tpscodigo;
            //        this.iDocumento.scomparterel = proveedor.prparterel === null ? "N" : proveedor.prparterel;
            //        this.spinner.hide();
            //    } catch (e) {
            //        this.spinner.hide();
            //    }
            //}, () => {
            //    this.spinner.hide();
            //});
        } else {
            this.iReembolsoshijo.prcodigosoporte = _datos.prcodigo;
            this.iReembolsoshijo.prnombre = _datos.prnombre;
            this.spinner.show();
            this.mantenimientoService.getGetProveedorseleccionado(globales.cia, this.iReembolsoshijo.prcodigosoporte).subscribe(proveedor => {
                try {
                    this.iReembolsoshijo.tidcodigo = proveedor.tidcodigo;
                    this.iReembolsoshijo.rsccodlegal = proveedor.prcodlegal;
                    this.spinner.hide();
                } catch (e) {
                    this.spinner.hide();
                }
            }, () => {
                this.spinner.hide();
            });
        }


    }
    buscar(ban: number) {
        this.banderaprv = ban;
        this.cargarProveedor();
    }
    cargarProveedor() {
        this.spinner.show();
        this.mantenimientoService.getProveedor(globales.cia).subscribe(data => {
            try {
                this.listproveedor = data.root[0];
                this.openModal(this.modalbusquedaproveedor, "");
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    limpia(ban: number) {
        if (ban === 1) {
            this.iDocumento.trscodigo = "";
            this.iDocumento.trsdescripcion = "";
            this.iDocumento.scombaseimponiblerenta = "";
            this.iDocumento.trscodigoporcentaje = "";
            this.iDocumento.scomvalorretrenta = "";
        }
        if (ban === 2) {
            this.iDocumento.trscodigo1 = "";
            this.iDocumento.trsdescripcion1 = "";
            this.iDocumento.scombaseimponiblerenta1 = "";
            this.iDocumento.trscodigoporcentaje1 = "";
            this.iDocumento.scomvalorretrenta1 = "";
        }
        if (ban === 3) {
            this.iDocumento.trscodigo2 = "";
            this.iDocumento.trsdescripcion2 = "";
            this.iDocumento.scombaseimponiblerenta2 = "";
            this.iDocumento.trscodigoporcentaje2 = "";
            this.iDocumento.scomvalorretrenta2 = "";
        }
        if (ban === 4) {
            this.iDocumento.trscodigo3 = "";
            this.iDocumento.trsdescripcion3 = "";
            this.iDocumento.scombaseimponiblerenta3 = "";
            this.iDocumento.trscodigoporcentaje3 = "";
            this.iDocumento.scomvalorretrenta3 = "";
        }
    }
    btn_cargar_Click() {
        this.spinner.show();
        this.sriService.getSriComprasDocs(globales.cia, this.ne_anio, this.ddw_mes).subscribe(async datos => {
            try {
                this.spinner.hide();
                this.iCompras = datos.root[0];
                this.dg_listCompras = Funcion.cloneObjetoarray(this.iCompras);
                if (this.dg_listCompras.length > 0) {
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
            var info: any[] = this.iCompras.filter((x) => x.error > 0 && x.menErr != null);
            this.dg_listCompras = Funcion.cloneObjetoarray(info);
        } else {
            this.dg_listCompras = Funcion.cloneObjetoarray(this.iCompras);
        }
        this.spinner.hide();
    }

    limpiarColor() {
        this.dg_listCompras.forEach((e) => {
            e.color = "";
        });
    }
    veredit(row: any) {
        let lSec: number = row.scom_secuencia;
        this.spinner.show();
        this.sriService.getSriCompra(globales.cia, this.ne_anio, this.ddw_mes, lSec.toString()).subscribe(async datos => {
            try {
                this.spinner.hide();
                var lCon = datos.table1[0];
                this.iDocumento = lCon;
                this.iReembolsos = [];
                this.iDocumento.scomparterel = this.iDocumento.scomparterel === null ? "N" : this.iDocumento.scomparterel;
                if (this.iDocumento.scombasenoobjetoiva === null) {
                    this.iDocumento.scombasenoobjetoiva = 0;
                }

                if (this.iDocumento.scomvalorretiva100 === null) {
                    this.iDocumento.scomvalorretiva100 = 0;
                }

                if (this.iDocumento.scombaseimponiblerenta === null) {
                    this.iDocumento.scombaseimponiblerenta = 0;
                }

                if (this.iDocumento.scomvalorretrenta === null) {
                    this.iDocumento.scomvalorretrenta = 0;
                }

                if (this.iDocumento.scombaseimponiblerenta1 === null) {
                    this.iDocumento.scombaseimponiblerenta1 = 0;
                }

                if (this.iDocumento.scomvalorretrenta1 === null) {
                    this.iDocumento.scomvalorretrenta1 = 0;
                }

                if (this.iDocumento.scombaseimponiblerenta2 === null) {
                    this.iDocumento.scombaseimponiblerenta2 = 0;
                }

                if (this.iDocumento.scomvalorretrenta2 === null) {
                    this.iDocumento.scomvalorretrenta2 = 0;
                }

                if (this.iDocumento.scombaseimponiblerenta3 === null) {
                    this.iDocumento.scombaseimponiblerenta3 = 0;
                }

                if (this.iDocumento.scomvalorretrenta3 === null) {
                    this.iDocumento.scomvalorretrenta3 = 0;
                }

                this.iDocumento.txt_nomPro = lCon.prnombre;

                this.iDocumento.scomfechacmbtevta = Funcion.FormatoFecha(this.iDocumento.scomfechacmbtevta);
                this.iDocumento.scomfechacmbtectble = Funcion.FormatoFecha(this.iDocumento.scomfechacmbtectble);
                this.iDocumento.scomfeccmbteret = Funcion.FormatoFecha(this.iDocumento.scomfeccmbteret);
                this.isAccion = "M";
                this.botones.btnnuevo = true;
                this.botones.btnmodificar = false;
                this.botones.btneliminar = false;

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
        if (this.iCompras.find((x) => x.scom_secuencia === lSec).menErr != "" && this.iCompras.find((x) => x.scom_secuencia === lSec).menErr != null) {
            if (this.iCompras.find((x) => x.scom_secuencia === lSec).menErr.length > 0) {
                this.iCompras.find((x) => x.scom_secuencia === lSec).menErr = this.iCompras.find((x) => x.scom_secuencia === lSec).menErr.replace("\r\n", "<br />");
                this.iCompras.find((x) => x.scom_secuencia === lSec).menErr = this.iCompras.find((x) => x.scom_secuencia === lSec).menErr.replace("\n", "<br />");
                if (this.iCompras.find((x) => x.scom_secuencia === lSec).menErr.toLowerCase().includes("error")) {
                    this.modalmensaje("2", this.iCompras.find((x) => x.scom_secuencia === lSec).menErr);
                } else if (this.iCompras.find((x) => x.scom_secuencia === lSec).menErr.toLowerCase().includes("advertencia")) {
                    this.modalmensaje("2", this.iCompras.find((x) => x.scom_secuencia === lSec).menErr);
                }
            }
        }
    }
    clickGrid(row: any) {
        this.limpiarColor();
        this.lineacompras = row.scom_secuencia;
        row.color = "SG";
    }
    limpiarpantalla() {

        this.iDocumento = {};

        this.iDocumento.scomfechacmbtevta = this.fechaservidor;
        this.iDocumento.scomfechacmbtectble = this.fechaservidor;

        this.iDocumento.scomidproveedor = "";

        this.iDocumento.scombasecero = 0;
        this.iDocumento.scombaseiva = 0;
        this.iDocumento.scomvaloriva = 0;
        this.iDocumento.scombasenoobjetoiva = 0;
        this.iDocumento.scomvalorice = 0;
        this.iDocumento.scomvalorivabienes = 0;
        this.iDocumento.scomvalorretivabienes = 0;
        this.iDocumento.scomvalorivaservicios = 0;
        this.iDocumento.scomvalorretivaservicios = 0;
        this.iDocumento.scomvalorretiva100 = 0;
        this.iDocumento.scombaseimponiblerenta = 0;
        this.iDocumento.scomvalorretrenta = 0;
        this.iDocumento.scombaseimponiblerenta1 = 0;
        this.iDocumento.scomvalorretrenta1 = 0;
        this.iDocumento.scombaseimponiblerenta2 = 0;
        this.iDocumento.scomvalorretrenta2 = 0;
        this.iDocumento.scombaseimponiblerenta3 = 0;
        this.iDocumento.scomvalorretrenta3 = 0;

        this.iDocumento.scomconvdobtrib = "N";
        this.iDocumento.scompagextsujret = "N";


        this.iDocumento.compras = [];
        this.iDocumento.ventas = [];
        this.iDocumento.ventasEstab = [];
        this.iDocumento.air = [];

        this.ddw_mes = parseInt(this.fechaservidor.substr(5, 2)).toString();
        this.ne_anio = parseInt(this.fechaservidor.substr(0, 4)).toString();
        this.cbx_error = false;
        this.habilitabuscar = false;
        this.habilitaobjetofrom = true;
        this.submitted = false;
        this.banderaprv = 0;
        this.dg_listCompras = [];
        this.isAccion = "";
        this.limpiatab(1);
    }
    limpiarpantalla2() {
        this.iDocumento = {};
        this.iDocumento.scomconvdobtrib = "N";
        this.iDocumento.scompagextsujret = "N";
        //this.ddw_mes = parseInt(this.fechaservidor.substr(5, 2)).toString();
        //this.ne_anio = parseInt(this.fechaservidor.substr(0, 4)).toString();
        //this.cbx_error = false;
        //this.habilitabuscar = false;
        //this.habilitaobjetofrom = true;
        //this.submitted = false;
        //this.banderaprv = 0;
        //this.dg_listCompras = [];
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
        this.llamarmodal = tipo + "|Ingreso de Compras SRI|" + mensaje + "|" + Funcion.Ramdon();
    }
}
