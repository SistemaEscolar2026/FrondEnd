import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Funcion } from '@funciones/funciones';
import { MantenimientoService } from '@services/mantenimiento-service';
import { ComprasService } from '@services/compras-service';
import { FuncionesService } from '@services/funciones-service';
import { NgxSpinnerService } from "ngx-spinner";
import { SriService } from '@services/sri-service';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BotonesModel } from '@modelo/botones-model';
import { globales, environment } from 'src/environments/environment';
import { ServiceMensaje } from '@services/config/ServiceMensaje';
import * as moment from 'moment';
import { Options } from 'select2';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './retenciondividendos.component.html',
    styleUrls: ['./retenciondividendos.component.scss']
})
export class RetencionDividendosComponent implements OnInit {

    @ViewChild('modalbusquedaproveedor') modalbusquedaproveedor: any;
    @ViewChild('modalbusquedaretencion') modalbusquedaretencion: any;

    /**
  * DEFINICION DE VARIABLE NOTIFICACION TIPO TOAS
  */
    openReport: string = "";
    listtipodocret: any = {};
    iDocumentoRet: any = {};
    dg_retenciones: any[] = [];
    listproveedor: any[] = [];
    listcredito: any[] = [];
    listtipodocumento: any[] = [];
    listretencionsri: any[] = [];
    listipoidentificacion: any[] = [];
    claves: any[] = [];
    modalRef: any;
    submitted = false;
    isAccion: string = "";
    iImpresion: number = 0;
    ColumnaDetalle: any[] = ['Lin.', 'Credito Tributario', 'Tipo Retención', '', '%', 'Base', 'Valor'];
    router: Router;
    /**
  * DEFINICION DE VARIABLE MODAL DE MANEJO DE LA SECCION DE BOTONES
  */
    botones: BotonesModel = new BotonesModel();

    notifier: any;

    listopciones: any[] = [];
    options: Options | any;
    habilitabuscar: boolean = true;
    habilitabotones: boolean = true;
    habilitaobjetofrom: boolean = true;
    habilitarvalores: boolean = true;

    llamarmodal: string = "";

    cmbopcion: string = "";
    fechaservidor: string = "";
    iNumRef: string = "";
    selectedlineagrid: string = "";
    txtbusca: string = "";
    bandera: number = 0;
    banderaprv: number = 0;
    cbx_error: boolean = false;
    lMensaje: string = "";

    /**
  * DEFINICION DE FUNCION INIT DE LA CLASE
  */
    ngOnInit() {
        var fecha = new Date();
        this.fechaservidor = moment(fecha).format("YYYY-MM-DD").toString();

        this.limpiabotones(1);

    }
    nuevo() {
        this.iDocumentoRet = {};



        this.habilitaobjetofrom = false;
        this.botones.btnnuevo = true;
        this.botones.btngrabar = false;
        this.isAccion = "I";

    }

    cancelar() {
        this.limpiabotones(1);
        this.habilitarfrom(3);

        this.limpiarpantalla();
    }

    aceptarOk(event: boolean) {
        if (event) {
            if (this.iImpresion === 1) {
                this.imprimir();
            } else {
                this.cancelar();
            }
        }
    }
    imprimir() {
        let parametro = {
            cia: globales.cia,
            tipo: this.claves.find(c => c.nombre == "tipoRet").valor,
            numero: this.claves.find(c => c.nombre == "numeroRet").valor
        };
        let isNombreReporte = "";
        if (this.listtipodocret.tretelectronico === "S") {
            isNombreReporte = "RetencioElectResi";
        } else {
            isNombreReporte = "RetencionResi";
        }


        this.openReport = "IMPRIMIÓ RETENCION DIVIDENDOS|" + environment.FICompCxP + isNombreReporte + "|" + JSON.stringify(parametro) + "|" + Funcion.Ramdon();
        this.cancelar();
    }
    aceptarConfi(event: boolean) {
        if (event) {

        }
    }
    habilitarfrom(val: Number) {
        switch (val) {
            case 1:
                this.habilitaobjetofrom = false;
                this.habilitabuscar = true;
                break;
            case 2:
                this.habilitaobjetofrom = true;
                this.habilitabuscar = false;
                break;
            case 3:
                this.habilitaobjetofrom = true;
                this.habilitabuscar = true;
                break;
        }

    }
    selectopcionpanel() {
        switch (this.cmbopcion) {
            case "I":
                this.isAccion = "I";
                this.limpiabotones(2);
                this.habilitarfrom(1)
                break;
            case "M":
                this.isAccion = "M";
                this.limpiabotones(3);
                this.habilitarfrom(2)
                break;
            case "C":
                this.isAccion = "C";
                this.limpiabotones(4);
                this.habilitarfrom(2)
                break;
        }
    }

    limpiabotones(_dato: Number) {
        switch (_dato) {
            case 1:
                this.botones.btnnuevo = false;
                this.botones.btnmodificar = true;
                this.botones.btngrabar = true
                this.botones.btnanular = true
                this.botones.btneliminar = true;
                this.botones.btncancelar = false;
                this.botones.btnbuscar = false;
                this.botones.btnimprimir = true
                this.botones.btnprocontrolados = true
                this.botones.btnsalir = false;
                break;
            case 2:
                this.botones.btnnuevo = true;
                this.botones.btnmodificar = true;
                this.botones.btngrabar = false
                this.botones.btnanular = true
                this.botones.btneliminar = true;
                this.botones.btncancelar = false;
                this.botones.btnbuscar = true;
                this.botones.btnimprimir = false
                this.botones.btnprocontrolados = false
                this.botones.btnsalir = false;
                break;
            case 3:
                this.botones.btnnuevo = true;
                this.botones.btnmodificar = false;
                this.botones.btngrabar = false
                this.botones.btnanular = false
                this.botones.btneliminar = false;
                this.botones.btncancelar = false;
                this.botones.btnbuscar = false;
                this.botones.btnimprimir = false
                this.botones.btnprocontrolados = false
                this.botones.btnsalir = false;
                break;
            case 4:
                this.botones.btnnuevo = true;
                this.botones.btnmodificar = true;
                this.botones.btngrabar = true
                this.botones.btnanular = true
                this.botones.btneliminar = true;
                this.botones.btncancelar = false;
                this.botones.btnbuscar = true;
                this.botones.btnimprimir = false
                this.botones.btnprocontrolados = false
                this.botones.btnsalir = false;
                break;
        }
    }

    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private fb: FormBuilder, private mantenimientoService: MantenimientoService, private injector: Injector,  private funcionesService: FuncionesService, private comprasService: ComprasService, private sriService: SriService) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Ingreso Retenciones Dividendos')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.options = {
            multiple: false,
            allowClear: true,
            closeOnSelect: true,
            width: '100%'
        };
        this.cargaTipoDocumento();
        this.cargaCreditoTributario();
        this.cargaTipoIdentificacion();
        var fecha = new Date();
        this.fechaservidor = moment(fecha).format("YYYY-MM-DD").toString();
        this.listopciones = Funcion.Opciones3();
        this.cmbopcion = "0";
        this.notifier = this.injector.get(ServiceMensaje);
        this.limpiarpantalla();

    }
    cargaCreditoTributario() {
        this.spinner.show();
        this.mantenimientoService.getCreTrib().subscribe(data => {
            try {
                this.listcredito = data;

                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    calculo(row: any) {
        row.dretvalor = (((row.dretvalornominal === undefined || row.dretvalornominal === "") ? 0 : parseFloat(row.dretvalornominal)) * ((row.dretporim === undefined || row.dretporim === "") ? 0 : parseFloat(row.dretporim))) / 100;
    }
    btn_datos_Click() {
        this.spinner.show();
        this.mantenimientoService.GetParametro2(globales.cia, environment.modSri).subscribe(data => {
            try {
                var parametros: any[] = data;
                this.iDocumentoRet.telefonoret = parametros.find(x => x.panombre === "telefono_dividendos").pavalorvarchar;
                this.iDocumentoRet.direccionret = parametros.find(x => x.panombre === "direccion_dividendos").pavalorvarchar;
                this.iDocumentoRet.mailret = parametros.find(x => x.panombre === "email_dividendos").pavalorvarchar;

                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }

    buscarRetencion() {
        if (this.iDocumentoRet.tretcodig != "") {
            if ((!(this.iDocumentoRet.cretnumero === "0") && !(this.iDocumentoRet.cretnumero === "") && this.iDocumentoRet.cretnumero != null) && this.isAccion != "I") {
                this.uf_consulta();
            }
        } else {
            this.modalmensaje("1", "Debe selecciona un tipo de retención... Favor Verifique...");
        }
    }
    uf_consulta() {
        this.spinner.show();
        this.comprasService.getRetenciones3p(Funcion.Complemento(), Funcion.Auditoria() + environment.modCompCxP + ',010000001', globales.cia, this.iDocumentoRet.tretcodigo, this.iDocumentoRet.cretnumero).subscribe(data => {
            try {
                this.spinner.hide();
                this.iDocumentoRet = data;

                var formatoFecha = moment(data.cretfecha);
                this.iDocumentoRet.cretfecha = formatoFecha.format("YYYY-MM-DD").toString();

                this.iDocumentoRet.txt_nomPro = this.iDocumentoRet.prnombre;

                this.iDocumentoRet.ddw_tipoId = this.listipoidentificacion.find((x) => x.tidcodigosri === this.iDocumentoRet.tipoidret).id;

                this.dg_retenciones = this.iDocumentoRet.detalleRet;

                this.cargaseleccionproveedorconsu(this.iDocumentoRet.prcodigo);


                this.claves = [];
                this.claves.push({ nombre: "tipoRet", valor: this.iDocumentoRet.tretcodigo });
                this.claves.push({ nombre: "numeroRet", valor: this.iDocumentoRet.cretnumero });

                this.habilitabuscar = true;


            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cargaTipoIdentificacion() {
        this.spinner.show();
        this.mantenimientoService.getTipoIdentificacion().subscribe(data => {
            try {
                this.listipoidentificacion = [{
                    id: "",
                    text: ""
                }];
                data.root[0].forEach((i:any) => {
                    this.listipoidentificacion.push({
                        id: i.tidcodigo,
                        text: i.tiddescripcion,
                        tidcodigosri: i.tidcodigosri,
                        tidcodigosrico: i.tidcodigosrico
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
    cargaTipoDocumento() {
        this.spinner.show();
        this.mantenimientoService.getTipodocRetElect(globales.cia).subscribe(data => {
            try {
                this.listtipodocumento = [{
                    id: "",
                    text: ""
                }];
                data.forEach((i) => {
                    this.listtipodocumento.push({
                        id: i.tretcodigo,
                        text: i.tretdescripcion
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

    modificar() {
        this.habilitaobjetofrom = false;
        this.botones.btngrabar = false;
        this.botones.btnmodificar = true;
        this.botones.btneliminar = true;
    }

    validar() {
        if (this.iDocumentoRet.tretcodigo === "" || this.iDocumentoRet.tretcodigo === undefined) {
            this.lMensaje = "Debe seleccionar un tipo documento Retencion...";
            return false;
        }
        if (this.iDocumentoRet.prcodigo === "" || this.iDocumentoRet.prcodigo === undefined) {
            this.lMensaje = "Debe seleccionar un proveedor para el documento...";
            return false;
        }
        if (this.dg_retenciones.length <= 0) {
            this.lMensaje = "Debe ingresar al menos una línea en la retención... Favor Verifique...";
            return false;
        }
        if (this.iDocumentoRet.ddw_tipoId === "C") {
            if (this.iDocumentoRet.numidret.length != 10) {
                this.lMensaje = "El número de identificación debe tener 10 dígitos para el tipo cédula... Favor Verifique...";
                return false;
            }
        }
        if (this.iDocumentoRet.ddw_tipoId === "R") {
            if (this.iDocumentoRet.numidret.length != 13) {
                this.lMensaje = "El número de identificación debe tener 13 dígitos para el tipo R.U.C... Favor Verifique...";
                return false;
            }
        }
        return true;
    }

    cargarTipoDocRet(codigo: string) {
        if (codigo != "") {
            this.spinner.show();
            this.mantenimientoService.getTipodocRet2p(globales.cia, codigo).subscribe(data => {
                try {
                    this.listtipodocret = data;
                    this.spinner.hide();
                } catch (e) {
                    this.spinner.hide();
                }
            }, () => {
                this.spinner.hide();
            });
        }

    }
    uf_obtieneNumeroRet() {
        let liNumero: number = 0;
        this.iDocumentoRet.tipodocRet = this.listtipodocret;
        liNumero = parseInt(this.iDocumentoRet.tipodocRet.tretfolio);
        liNumero += 1;

        this.iDocumentoRet.tipodocRet.tretfolio = liNumero;

        return liNumero;
    }

    guardar(datoimp: number) {
        this.iImpresion = datoimp;
        if (this.isAccion === "C" && this.iImpresion === 1) {
            this.aceptarOk(true);
        } else {
            if (this.validar()) {

                this.iDocumentoRet.ciacodigo = globales.cia;
                this.iDocumentoRet.cretnumero = this.habilitabuscar == true ? this.uf_obtieneNumeroRet() : this.iDocumentoRet.cretnumero;

                this.iDocumentoRet.cretobservacion = "NO TIENE";
                this.iDocumentoRet.cretusuario = Funcion.ReturnUsuario().us_codigo;
                this.iDocumentoRet.cretfechasistema = this.fechaservidor;
                this.iDocumentoRet.cretestado = "A";
                this.iDocumentoRet.tcxpcodigohist = null;
                this.iDocumentoRet.ccxpnumerohist = null;
                this.iDocumentoRet.prcodigohist = this.iDocumentoRet.prcodigo;
                this.iDocumentoRet.tipoidret = this.listipoidentificacion.find((x) => x.id == this.iDocumentoRet.ddw_tipoId).tidcodigosri;

                this.iDocumentoRet.detalleRet = Funcion.cloneObjetoarray(this.dg_retenciones);

                this.iDocumentoRet.detalleRet.forEach((dR: any) => {
                    dR.ciacodigo = this.iDocumentoRet.ciacodigo;
                    dR.tretcodigo = this.iDocumentoRet.tretcodigo;
                    dR.cretnumero = this.iDocumentoRet.cretnumero;
                });


                this.claves = [];
                this.claves.push({ nombre: "tipoRet", valor: this.iDocumentoRet.tretcodigo });
                // this.claves.push({ nombre: "numeroRet", valor: this.iDocumentoRet.cretnumero });


                this.spinner.show();
                this.comprasService.insertRetencionCompra(Funcion.Complemento(), Funcion.Auditoria() + environment.modCompCxP + ',010000001', this.iDocumentoRet).subscribe(async data => {
                    try {
                        let isMensajeS = data.split('|')[0];
                        this.claves.push({
                            nombre: "numeroRet",
                            valor: data.split('|')[1]
                        });
                        this.iDocumentoRet.cretnumero = data.split('|')[1];

                        if (this.isAccion === "I") {

                            let _index = this.listtipodocumento.findIndex((x: any) => x.id === this.iDocumentoRet.tretcodigo);
                            let _dato = this.listtipodocumento[_index].text;
                            isMensajeS = isMensajeS + "<br />Se generó la retención " + _dato + " No. " + this.iDocumentoRet.cretnumero;
                        }
                        this.modalmensaje("3", isMensajeS);
                        this.spinner.hide();
                    } catch (e) {
                        this.spinner.hide();
                    }
                }, err => {
                    //if (err.Message === globales.mensajePK) {
                    //    this.modalmensaje("2", "No se ha podido grabar la retención de compra, favor volver a grabar...");
                    //}
                    this.spinner.hide();
                });

            }
            else {
                if (this.lMensaje != "") {
                    this.modalmensaje("1", this.lMensaje);
                }
            }
        }


    }


    cierreProveedor(event: string) {
        if (event !== "") {
            this.hideModal()
            var _datos = JSON.parse(event)
            this.setdatosfromProveedor(_datos);
        }
    }

    cierreRetencion(event: string) {
        if (event !== "") {
            this.hideModal()
            var datos = JSON.parse(event);

            let _index = this.dg_retenciones.findIndex((x) => x.dretlinea === this.selectedlineagrid);
            this.dg_retenciones[_index].trscodigo = datos.trscodigo;
            this.dg_retenciones[_index].trscodigoporcentaje = datos.trscodigoporcentaje;
            this.dg_retenciones[_index].dretporim = datos.trscodigoporcentaje;

        }
    }

    setdatosfromProveedor(_datos: any) {
        this.iDocumentoRet.prcodigo = _datos.prcodigo;
        this.iDocumentoRet.txt_nomPro = _datos.prnombre;
        this.cargaseleccionproveedor(_datos.prcodigo);
    }
    cargaseleccionproveedor(codproveedor: string) {
        this.spinner.show();
        this.mantenimientoService.getGetProveedorseleccionado(globales.cia, codproveedor).subscribe(pro => {
            try {
                this.listproveedor = pro;
                if (pro === null) {
                    this.cargarProveedor();
                } else {
                    this.iDocumentoRet.prcodigo = pro.prcodigo;
                    this.iDocumentoRet.txt_nomPro = pro.prnombre;
                    this.iDocumentoRet.direccionret = pro.prdireccion;
                    this.iDocumentoRet.telefonoret = pro.prtelefono;
                    this.iDocumentoRet.mailret = pro.premailelect;
                    this.iDocumentoRet.ddw_tipoId = pro.tidcodigo;
                    this.iDocumentoRet.numidret = pro.prcodlegal;
                }
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cargaseleccionproveedorconsu(codproveedor: string) {
        this.spinner.show();
        this.mantenimientoService.getGetProveedorseleccionado(globales.cia, codproveedor).subscribe(pro => {
            try {
                this.listproveedor = pro;
                this.iDocumentoRet.prcodigo = pro.prcodigo;
                this.iDocumentoRet.txt_nomPro = pro.prnombre;
                //this.iDocumentoRet.direccionret = pro.prdireccion;
                //this.iDocumentoRet.telefonoret = pro.prtelefono;
                //this.iDocumentoRet.mailret = pro.premailelect;
                //this.iDocumentoRet.ddw_tipoId = pro.tidcodigo;
                //this.iDocumentoRet.numidret = pro.prcodlegal;
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    buscar(ban: number) {
        this.banderaprv = ban;
        this.cargarProveedor();
    }

    cargarProveedor() {
        this.spinner.show();
        this.mantenimientoService.getProveedor(globales.cia).subscribe(data => {
            try {
                this.listproveedor = data;
                this.openModal(this.modalbusquedaproveedor, "");
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }

    limpiarColor() {
        this.dg_retenciones.forEach((e) => {
            e.color = "";
        });
    }

    clickGrid(row: any) {
        this.limpiarColor();
        this.selectedlineagrid = row.dretlinea;
        row.color = "SG";
    }
    cargaRetencion(row: any) {
        this.selectedlineagrid = row.dretlinea;
        this.spinner.show();
        this.mantenimientoService.getTiporetSriAplicaDiv("S").subscribe(data => {
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
    dblclickGrid(row:any) {

    }
    agregarlinea() {
        var lDet: any = {};
        lDet.dretlinea = this.dg_retenciones.length + 1;
        if (this.dg_retenciones.length > 0) {
            lDet.iccodigo = this.dg_retenciones[0].iccodigo;
            lDet.ctcodigo = this.dg_retenciones[0].ctcodigo;
            lDet.dretporim = 0;
            lDet.dretvalornominal = 0;
            lDet.dretvalor = 0;
            lDet.drettpmovgasto = "S";
            lDet.habilita = true;
        } else {
            lDet.iccodigo = "11";
            lDet.ctcodigo = "10";
            lDet.dretporim = 0;
            lDet.dretvalornominal = 0;
            lDet.dretvalor = 0;
            lDet.drettpmovgasto = "S";
            lDet.habilita = true;
        }

        this.dg_retenciones.push(lDet);
        this.selectedlineagrid = "";
    }
    /**
  * DEFINICION DE FUNCION QUE BORRA UNA LINEA EN EL DETALLE DE PEDIDO
  */
    borrarlinea() {
        for (var i = 0; i < this.dg_retenciones.length; i++) {
            if (this.dg_retenciones[i].dretlinea === this.selectedlineagrid) {
                this.dg_retenciones.splice(i, 1);
                this.selectedlineagrid = "";
                break;
            }
        }
    }

    limpiarpantalla() {
        this.cmbopcion = "0";
        this.iDocumentoRet = {};
        this.iDocumentoRet.prcodigo = "";
        this.iDocumentoRet.txt_nomPro = "";
        this.iDocumentoRet.cretfecha = this.fechaservidor;
        this.iDocumentoRet.tretcodigo = "";
        this.iDocumentoRet.cretnumero = "";

        this.iDocumentoRet.ddw_tipoId = "";

        this.cbx_error = false;
        this.submitted = false;
        this.banderaprv = 0;
        this.dg_retenciones = [];
        this.isAccion = "";
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
        this.llamarmodal = tipo + "|Ingreso Retenciones (Dividendos)|" + mensaje + "|" + Funcion.Ramdon();
    }
}
