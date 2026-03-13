import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Funcion } from '@funciones/funciones';
import { MantenimientoService } from '@services/mantenimiento-service';
import { NgxSpinnerService } from "ngx-spinner";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BotonesModel } from '@modelo/botones-model';
import { globales, environment } from 'src/environments/environment';
import { ServiceMensaje } from '@services/config/ServiceMensaje';
import { Options } from 'select2';
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './gastos.component.html',
    styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedagastos') modalbusquedagastos: any;


    @ViewChild('modalbusquedaretencion') modalbusquedaretencion: any;
    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    modalRef: any;
    /**
  * DEFINICION DE VARIABLE DE CONTROL DE ACCION SUBMIT DE PAGINA
  */
    submitted = false;
    /**
   * DEFINICION DE VARIABLE DE RUTA LA CUAL NOS PERMITA REDIRECCIONAR A OTRA PAGINA
   */
    router: Router;
    /**
  * DEFINICION DE VARIABLE MODAL DE MANEJO DE LA SECCION DE BOTONES
  */
    botones: BotonesModel = new BotonesModel();
    /**
  * DEFINICION DE VARIABLE NOTIFICACION TIPO TOAS
  */
    notifier: any;
    options: Options | any;
    /**
   * DEFINICION DE VARIABLE DE LISTADO DE OBJETO DE ESTADO
   */
    listEstado: any[] = [];
    listadogastos: any[] = [];
    /**
  * DEFINICION DE VARIABLE DE LISTADO DE PROPIO
  */
    listPropio: any[] = [];
    /**
  * DEFINICION DE VARIABLE DE LISTADO DE SUCURSAL
  */
    listsucursal: any[] = [];
    listcuenta: any[] = [];
    listipogasto: any[] = [];
    listtipoauxiliar: any[] = [];
    listauxiliar: any[] = [];
    listretenciones: any[] = [];
    isAccion: string = "";
    habilitaobjetofrom: boolean = true;
    /**
  * DEFINICION DE VARIABLE DE LLAMADO DE MODAL
  */
    llamarmodal: string = "";

    iGasto: any = {};
    lMensaje: string = "";

    /**
   * DEFINICION DE VARIABLE DE MODELO DE VENDEDOR
   */
    model: any = {};
    /**
  * DEFINICION DE FUNCION INIT DE LA CLASE
  */
    ngOnInit() {
        this.limpiabotones(1);
        this.cargarPlaCuenta();
        this.cargaTipoAuxiliar();
    }
    cargaAuxiliar() {
        //this.spinner.show();
        //this.mantenimientoService.getAuxiliar(globales.cia, this.iGasto.tpauxcodigo).subscribe(data => {
        //  try {
        //    this.listauxiliar = [
        //      {
        //        id: '',
        //        text: ''
        //      }
        //    ];
        //    data.forEach((pCD) => {
        //      this.listauxiliar.push({
        //        id: pCD.auxcodigo,
        //        text: pCD.auxdescripcion
        //      });
        //    });
        //    this.spinner.hide();
        //  } catch (e) {
        //    this.spinner.hide();
        //  }
        //}, () => {
        //  this.spinner.hide();
        //});
    }

    cambioauxiliar(event: string) {
        this.iGasto.planctacodigo = event;
        let _idenx = this.listcuenta.findIndex(k => k.id === this.iGasto.planctacodigo);
        this.iGasto.tpauxcodigo = this.listcuenta[_idenx].tpauxcodigo;
        this.cargaAuxiliar();
    }
    cargaTipoAuxiliar() {
        this.spinner.show();
        this.mantenimientoService.manTipoAuxiliar(globales.cia).subscribe(data => {
            try {
                this.listtipoauxiliar = data.root[0];;
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });
    }
    cambiotipo() {
        let _idenx = this.listcuenta.findIndex(k => k.id === parseInt(this.iGasto.cpc_codigo));
        this.iGasto.cta_codigo = this.listcuenta[_idenx].cta_codigo;

    }

    cargarPlaCuenta() {
        this.spinner.show();
        this.mantenimientoService.manPlanCuentaM(globales.cia).subscribe(data => {
            try {
                this.listcuenta = [
                    {
                        id: '',
                        text: ''
                    }
                ];
                var datos: [] = data.root[0];
                datos.forEach((pCD: any) => {
                    this.listcuenta.push({
                        id: pCD.cpc_codigo,
                        text: pCD.cpc_codigo_co + ' - ' + pCD.cpc_descripcion,
                        cta_codigo: pCD.cta_codigo
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

    buscarretencion() {
        this.cargaRetenciones();
    }
    cargaRetenciones() {
        //  this.spinner.show();
        //  this.mantenimientoService.getTiporetSriAplica("M").subscribe(data => {
        //    try {
        //      this.listretenciones = data;
        //      this.openModal(this.modalbusquedaretencion);
        //      this.spinner.hide();
        //    } catch (e) {
        //      this.spinner.hide();
        //    }
        //  }, () => {
        //    this.spinner.hide();
        //  });
    }

    cierreRetencion(event: string) {
        if (event !== "") {
            this.hideModal()
            var _datos = JSON.parse(event)

            this.iGasto.trscodigo = _datos.trscodigo;
            this.iGasto.trsdescripcion = _datos.trsdescripcion;
            this.iGasto.trscodigoporcentaje = _datos.trscodigoporcentaje;
        }
    }
    limpiar() {
        this.iGasto = {};
        this.iGasto.ga_codigo = "";
        this.iGasto.ga_cod_descripcion = "";
        this.iGasto.ga_descripcion = "";
        this.iGasto.ga_estado = "A";
        this.iGasto.cpc_codigo = "";
        this.iGasto.cta_codigo = "";
        this.iGasto.ga_afecta_liqui = "N";
        this.iGasto.ga_afecta_costeo = "N";
        this.iGasto.ga_tipo_gastos = "A";
    }
    /**
   * DEFINICION PARA HABILITAR EL FROM
   */
    habilitarfrom(val: Number) {

        if (val === 1) {
            this.habilitaobjetofrom = true;
            this.isAccion = "";
            this.limpiar();
        }
        if (val === 2) {
            this.habilitaobjetofrom = false;
            this.isAccion = "I";
            this.limpiar();
        }
        if (val === 3) {
            this.habilitaobjetofrom = false;
            this.isAccion = "M";
        }
    }
    /**
  * DEFINICION DE FUNCION PARA LIMPIAR LOS SECCION DE BOTONES
  */
    limpiabotones(_dato: Number) {
        switch (_dato) {
            case 1:
                this.botones.btnnuevo = false;
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
    constructor(private spinner: NgxSpinnerService, _router: Router, private modalService: BsModalService, private fb: FormBuilder, private mantenimientoService: MantenimientoService, private injector: Injector) {
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Gastos')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        //this.listPropio = Funcion.Propio();
        this.listEstado = Funcion.Estado();
        this.listipogasto = Funcion.TipoGasto();
        this.cargarSucursal();
        this.notifier = this.injector.get(ServiceMensaje);
        this.habilitarfrom(1);
        this.options = {
            multiple: false,
            allowClear: true,
            closeOnSelect: true,
            width: '100%'
        };
    }

    /**
  * DEFINICION DE FUNCION PARA CARGA SUCURSAL
  */
    cargarSucursal() {
        //this.spinner.show();
        //this.mantenimientoService.getSucursalescia(globales.cia).subscribe(async data => {
        //  try {
        //    if (data != null) {
        //      this.listsucursal = [];

        //      this.listsucursal = [{
        //        id: '',
        //        text: ''
        //      }];
        //      data.forEach((key: any) => {
        //        this.listsucursal.push({
        //          ciacodigo: key.ciacodigo,
        //          id: key.sucodigo,
        //          text: key.sudescripcion
        //        });
        //      });
        //    } else {
        //      this.modalmensaje("1", "No tiene sucursal relacionadas, no podrá aprobar los pedidos...");
        //    }
        //    this.spinner.hide();
        //  } catch (e) {
        //    this.spinner.hide();
        //  }
        //}, err => {
        //  this.modalmensaje("2", err.error.Message);
        //  this.spinner.hide();
        //});
    }

    /**
  * DEFINICION DE FUNCION PARA BORRAR VENDEDOR
  */
    deletegastos() {
        this.iGasto.ga_estado = 'D';
        this.spinner.show();
        this.mantenimientoService.deleteGastos(this.iGasto).subscribe(data => {
            try {

                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarbodega();
                    this.habilitarfrom(1);
                } else {
                    this.notifier.showError(data.msgError);
                }
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.notifier.showError(err.error.Message);
            this.spinner.hide();
        });
    }

    /**
  * DEFINICION DE FUNCION PARA INSERTAR UNA BODEGA
  */
    insertgastos() {
        this.spinner.show();
        this.mantenimientoService.insertGastos(this.iGasto).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarbodega();
                    this.habilitarfrom(1);
                } else {
                    this.notifier.showError(data.msgError);
                }


                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.notifier.showError(err.error.Message);
            this.spinner.hide();
        });
    }
    /**
  * DEFINICION DE FUNCION PARA ACTUALIZAR UNA BODEGA
  */
    updategastos() {
        this.spinner.show();
        this.model.ciacodigo = globales.cia;
        this.mantenimientoService.updateGastos(this.iGasto).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarbodega();
                    this.habilitarfrom(1);
                } else {
                    this.notifier.showError(data.msgError);
                }


                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.notifier.showError(err.error.Message);
            this.spinner.hide();
        });
    }
    validadFrom() {
        if (this.iGasto.gacodigo === "" || this.iGasto.gacodigo === null) {
            this.lMensaje = "Debe ingresar un codigo del gasto... Favor Verifique...";
            return false;
        }
        if (this.iGasto.gadescripcion === "" || this.iGasto.gadescripcion === null) {
            this.lMensaje = "Debe ingresar una descripcion del gasto... Favor Verifique...";
            return false;
        }
        if (this.iGasto.gaestado === "" || this.iGasto.gaestado === null) {
            this.lMensaje = "Debe seleccionar un estado del gasto... Favor Verifique...";
            return false;
        }
        if (this.iGasto.planctacodigo === "" || this.iGasto.planctacodigo === null) {
            this.lMensaje = "Debe seleccionar una cuenta del gastos... Favor Verifique...";
            return false;
        }
        return true;
    }
    /**
  * DEFINICION DE FUNCION PARA GUARDAR Y ACTUALIZAR BODEGA
  */
    guardargastos() {
        this.submitted = true;
        if (this.validadFrom()) {
            if (this.isAccion === "I") {

                this.iGasto.ciacodigo = globales.cia;
                this.iGasto.ga_cod_descripcion = this.iGasto.ga_cod_descripcion.toUpperCase()
                this.iGasto.ga_descripcion = this.iGasto.ga_descripcion.toUpperCase()
                this.insertgastos();
            } else {
                this.iGasto.ga_cod_descripcion = this.iGasto.ga_cod_descripcion.toUpperCase()
                this.iGasto.ga_descripcion = this.iGasto.ga_descripcion.toUpperCase()
                this.updategastos();
            }
        } else {
            if (this.lMensaje != "") {
                this.modalmensaje("1", this.lMensaje);
            }
        }
    }
    aceptarOk(event: any) {
        if (event) {
            this.limpiabotones(1);
            this.limpiarbodega();
            this.habilitarfrom(1);
        }
    }
    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE BODEGA
  */
    seteaGastos(data: any) {
        this.iGasto = data;
        this.cargaAuxiliar();
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE BODEGA
  */
    limpiarbodega() {
        //this.bodegafrom.controls['codigo'].setValue("");
        //this.bodegafrom.controls['descripcion'].setValue("");
        //this.bodegafrom.controls['direccion'].setValue("");
        //this.bodegafrom.controls['sucursal'].setValue("");
        //this.bodegafrom.controls['propio'].setValue("");
        //this.bodegafrom.controls['estado'].setValue("");
        //this.bodegafrom.controls['excluir'].setValue("");
        this.submitted = false;
    }


    /**
  * DEFINICION DE FUNCION LA FICHA COMPLETO DE UN BODEGA
  */
    buscargastos(codgastos: string) {

    }
    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD BODEGA
  */
    buscar() {

        this.spinner.show();
        this.mantenimientoService.getGastos(globales.cia).subscribe(data => {
            try {
                this.listadogastos = data.root[0];
                this.openModal(this.modalbusquedagastos);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, err => {
            this.notifier.showError(err.error.Message);
            this.spinner.hide();
        });

    }
    /**
  * DEFINICION DE FUNCION SALIR DE LA PANTALLA
  */
    salir() {
        this.router.navigate(['/principal/default'], {
            skipLocationChange: true,
        });
    }
    /**
  * DEFINICION DE FUNCION CIERRE MODAL DE BODEGA
  */
    cierreGastos(event: string) {
        if (event !== "") {
            this.hideModal()
            this.iGasto = JSON.parse(event);
            this.limpiabotones(3);
        }
    }
    /**
  * DEFINICION DE FUNCION CIERRE MODAL DE BODEGA
  */
    cierreModal(event: boolean) {
        if (event) {
            this.hideModal()
        }
    }
    /**
  * DEFINICION DE FUNCION CIERRE HIDE DE MODALES
  */
    hideModal() {
        if (this.modalRef != undefined) {
            this.modalRef.hide();
        }
    }
    /**
  * DEFINICION DE FUNCION APERTURA DE MODAL
  */
    openModal(content: string) {
        this.modalRef = this.modalService.show(
            content);
    }
    /**
  * DEFINICION DE FUNCION DE VALIDACION DE CONTROL DE FROM 
  */

    /**
  * @ignore
  */
    modalmensaje(tipo: string, mensaje: string) {
        this.llamarmodal = tipo + "|Mantenimiento Gastos|" + mensaje + "|" + Funcion.Ramdon();
    }
}
