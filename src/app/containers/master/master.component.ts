import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { menuglobal } from '../nav';
import { Router } from '@angular/router';
import { Funcion } from '@funciones/funciones';
import { MantenimientoService } from '@services/mantenimiento-service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IdleService } from '@services/IdleService';
import { globales, environment, } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    selector: 'app-master',
    templateUrl: './master.component.html',
    styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
    /**
    * DEFINICION DE VARIABLE DE MODAL DE CADUCIDAD DE SESSION
    */
    @ViewChild('oksession') oksession: any;
    /**
    * DEFINICION DE VARIABLE DE MODAL DE COMPAÑIA
    */
    @ViewChild('modalcompania') modalcompania: any;
    /**
    * DEFINICION DE VARIABLE DE MODAL DE BUQUEDA VARIAS
    */
    @ViewChild('modalbusqueda') modalbusqueda: any;
    /**
    * DEFINICION DE VARIABLE DE REFERENCIA A MODALES
    */
    modalRef: any;
    /**
    * DEFINICION DE VARIABLE DE TITULO DE MODAL DE SESSION CADUCADA
    */
    titulo: string = "";
    /**
    * DEFINICION DE VARIABLE DE MENSAJE DE MODAL DE SESSION CADUCADA
    */
    mensaje: string = "";
    /**
   * DEFINICION DE VARIABLE DE BUQUEDAD DE SESSION DE MENU
   */
    txtbusca: string = "";
    /**
  * DEFINICION DE VARIABLE DE MODEL USER DONDE ESTARA LA INFORMACION DEL USUARIO 
  */
    modeluser: any;
    compania: any[] = [];
    selectedCompa: string = "";
    /**
  * DEFINICION DE VARIABLE DE DEL MENU
  */
    menuList: Observable<any[]> | undefined;
    /**
  * DEFINICION DE VARIABLE DE RUTA LA CUAL NOS PERMITA REDIRECCIONAR A OTRA PAGINA
  */
    router: Router;
    /**
  * DEFINICION DE VARIABLE DE QUE NOS VALIDAD VER O NO LA SESSION FOOTER DEL PORTAL
  */
    footer: boolean = true;

    /**
  * DEFINICION DE FUNCION INIT DE LA CLASE
  */
    ngOnInit() {
        this.menuList = of(menuglobal.navItems);
        this.inicializacionCaducidadPortal();
    }

    /**
  * DEFINICION DE CONSTRUCTOR DE LA CLASE
  */
    constructor(private mantenimientoService: MantenimientoService, private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private idleService: IdleService) {
        Funcion.cambiogeneral();
        menuglobal.navItemsfilter = Funcion.returdatosession("menufilter");
        menuglobal.navItems = Funcion.retornamenugeneral();
        //globales.sucursalPrin = Funcion.returdatosession("sucursalPrin").toString();

        //globales.fechaModuConta = Funcion.returdatosession("fechaModuConta").toString();
        //globales.fechaModuInv = Funcion.returdatosession("fechaModuInv").toString();
        //globales.fechaModuVta = Funcion.returdatosession("fechaModuVta").toString();
        //globales.fechaModuCar = Funcion.returdatosession("fechaModuCar").toString();
        //globales.fechaModuComp = Funcion.returdatosession("fechaModuComp").toString();
        //globales.fechaModuBco = Funcion.returdatosession("fechaModuBco").toString();

        this.footer = (sessionStorage.getItem("footer")?.toString() === "1" ? true : false);

        this.menuList = of(menuglobal.navItems);
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            Funcion.RemoverSession();
            this.router.navigate(['/']);
        }
        this.modeluser = Funcion.ReturnUsuario();
        this.cargaCompania();
    }
    seleccionaCompania() {
        globales.cia = this.selectedCompa;
        sessionStorage.setItem("compania", Funcion.EncriptarAES(JSON.stringify(this.getdatoscompania()[0])));
        //environment.API_URL = this.getdatoscompania()[0].cia_rutabackend;
        //token.tokenglobal = this.getdatoscompania()[0].cia_token;
        //Funcion.cambiotoken();
    }
    getdatoscompania() {
        var _cia = this.selectedCompa;
        return this.compania.filter(function (data: { co_codigo: any; }) {
            return data.co_codigo === parseInt(_cia)
        });
    }
    cargaCompania() {
        this.spinner.show();
        this.mantenimientoService.getCompanias().subscribe(data => {
            try {
                if (data.success) {
                    this.compania = data.root[0];
                    sessionStorage.setItem("parametro", Funcion.EncriptarAES(JSON.stringify(data.root[1])));
                    this.selectedCompa = globales.cia;
                }

                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    /**
  * FUNCIONES DE LLAMADO DE MODAL COMPAÑIA
  */
    openDialogCompa() {
        this.openModal(this.modalcompania);
    }
    /**
  * FUNCIONES DE LLAMADO DE MODAL BUSQUEDA VARIAS
  */
    openDialogBusquedad() {
        this.openModal(this.modalbusqueda);
    }
    /**
  * FUNCIONES DE LLAMADO DE MODAL GENERAL
  */
    openModal(content: string) {
        this.modalRef = this.modalService.show(
            content);
    }
    /**
  * FUNCIONES DE LLAMADO DE MODAL GENERAL ESTATICO
  */
    openModalStatic(content: string, tipo: string) {
        this.modalRef = this.modalService.show(
            content, { class: tipo, backdrop: 'static' });
    }
    /**
  * FUNCIONES DE HIDE DE MODAL 
  */
    hideModal() {
        if (this.modalRef != undefined) {
            this.modalRef.hide();
        }
    }
    /**
  * FUNCIONES DE CIERRE DE MODAL
  */
    cierreModal(event: boolean) {
        if (event) {
            this.hideModal()
        }
    }
    /**
  * FUNCIONES DE CIERRE DE LOADING DE CARGA
  */
    cierreCarga(event: boolean) {
        if (event) {
            this.spinner.show();
        } else {
            this.spinner.hide();
        }

    }


    /**
  * FUNCIONES DE SALIR DEL PORTAL POR CADUCIDAD DE SESSION
  */
    salir() {
        Funcion.RemoverSession();
        this.hideModal()
        this.router.navigate(['/']);

    }
    /**
  * FUNCIONES DE SALIR DEL PORTAL POR LA OPCION DE SALIR
  */
    salirPortal() {
        Funcion.RemoverSession();
        this.router.navigate(['/']);
    }

    /**
  * FUNCIONES DE BUQUEDA DE PANTALLA EN EL MENU
  */
    buscar() {
        if (this.txtbusca != "") {
            var _dato = this.txtbusca;
            var _filtro = menuglobal.navItemsfilter.filter(function (data) {
                return data.text.toUpperCase().includes(_dato.toUpperCase())
            });
            this.menuList = of(_filtro);
        }
        else {
            this.menuList = of(menuglobal.navItems);
        }
    }

    /**
  * FUNCIONES DE OCULTAR LA SESSION FOOTER DEL PORTAL
  */
    footerclick() {
        sessionStorage.setItem("footer", "0");
        this.footer = false;
    }

    /**
  * FUNCIONES DE LLAMAR PAGINA DEL MENU
  */
    menuclick(ruta: string) {
        this.router.navigate([ruta], {
            skipLocationChange: false,
        });
    }
    /**
  * FUNCIONES DE CONFIGURACION DE CADUCIDAD DE PORTAL 
  */
    private inicializacionCaducidadPortal() {
        const idleTimeoutInSeconds: number = environment.idleTimeInMinutes * 60;
        this.idleService.startWatching(idleTimeoutInSeconds).subscribe((isTimeOut: boolean) => {
            if (isTimeOut) {
                this.idleService.stopTimer();
                this.titulo = "Sesión Caducada";
                this.mensaje = "Sesión Caducada por inactividad.";
                this.openModalStatic(this.oksession, "modal-md modal-primary");
                setTimeout(() => {
                    this.salir();
                }, 5000);
            }
        });
    }
}

