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

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    templateUrl: './plancuenta.component.html',
    styleUrls: ['./plancuenta.component.scss']
})
export class PlanCuentaComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedaplancuenta') modalbusquedaplancuenta: any;
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
    /**
   * DEFINICION DE VARIABLE DE LISTADO DE OBJETO DE ESTADO
   */
    listEstado: any[] = [];
    con_cod_grupo: string = "";
    con_cod_subgrupo: string = "";
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listparametro: any[] = [];
    listgrupocontable: any[] = [];
    listsubgrupocontable: any[] = [];
    listclasecontable: any[] = [];
    listtipocuenta: any[] = [];
    listsubgrupo: any[] = [];
    listclasecontablegen: any[] = [];
    listtipoauxliar: any[] = [];
    listnaturaleza: any[] = [];
    listcuentas: any[] = [];
    iAccion: string = "";
    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    parametrofrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        cocodigo: new FormControl(''),
        codigo: new FormControl(''),
        codigocuenta: new FormControl(''),
        codgrupocontable: new FormControl(''),
        codtipocuenta: new FormControl(''),
        codsubgrupo: new FormControl(''),
        codclasecontable: new FormControl(''),
        nivel2: new FormControl(''),
        nivel3: new FormControl(''),
        nivel4: new FormControl(''),
        nivel5: new FormControl(''),
        nivel6: new FormControl(''),
        naturaleza: new FormControl(''),
        descripcion: new FormControl(''),
        estado: new FormControl(''),
        codauxiliar: new FormControl('')
    });
    /**
   * DEFINICION DE VARIABLE DE MODELO DE VENDEDOR
   */
    model: any = {};
    /**
 * DEFINICION DE FUNCION INIT DE LA CLASE
 */
    ngOnInit() {
        this.limpiabotones(1);
    }
    /**
* DEFINICION DE FUNCION CARGA FORMA
*/

    /**
   * DEFINICION PARA HABILITAR EL FROM
   */
    habilitarfrom(val: Number) {
        switch (val) {
            case 1:
                this.iAccion = "";
                this.parametrofrom.controls['cocodigo'].disable();
                this.parametrofrom.controls['codigo'].disable();
                this.parametrofrom.controls['codigocuenta'].disable();
                this.parametrofrom.controls['codgrupocontable'].disable();
                this.parametrofrom.controls['codtipocuenta'].disable();

                this.parametrofrom.controls['codsubgrupo'].disable();
                this.parametrofrom.controls['codclasecontable'].disable();
                this.parametrofrom.controls['nivel2'].disable();
                this.parametrofrom.controls['nivel3'].disable();
                this.parametrofrom.controls['nivel4'].disable();
                this.parametrofrom.controls['nivel5'].disable();
                this.parametrofrom.controls['nivel6'].disable();
                this.parametrofrom.controls['naturaleza'].disable();

                this.parametrofrom.controls['descripcion'].disable();
                this.parametrofrom.controls['estado'].disable();
                this.parametrofrom.controls['codauxiliar'].disable();

                break;
            case 2:
                this.iAccion = "I";
                this.parametrofrom.controls['tipo'].setValue("I");
                this.parametrofrom.controls['codigo'].disable();
                this.parametrofrom.controls['cocodigo'].disable();
                this.parametrofrom.controls['codigocuenta'].disable();
                this.parametrofrom.controls['codgrupocontable'].enable();
                this.parametrofrom.controls['codtipocuenta'].enable();
                this.parametrofrom.controls['codsubgrupo'].enable();
                this.parametrofrom.controls['codclasecontable'].enable();
                this.parametrofrom.controls['nivel2'].enable();
                this.parametrofrom.controls['nivel3'].enable();
                this.parametrofrom.controls['nivel4'].enable();
                this.parametrofrom.controls['nivel5'].enable();
                this.parametrofrom.controls['nivel6'].enable();
                this.parametrofrom.controls['naturaleza'].enable();
                this.parametrofrom.controls['naturaleza'].setValue("D");
                this.parametrofrom.controls['descripcion'].enable();
                this.parametrofrom.controls['estado'].setValue("A");
                this.parametrofrom.controls['estado'].enable();
                this.parametrofrom.controls['codauxiliar'].enable();
                break;
            case 3:
                this.iAccion = "M";
                this.parametrofrom.controls['tipo'].setValue("M");
                this.parametrofrom.controls['codigo'].disable();
                this.parametrofrom.controls['cocodigo'].disable();
                this.parametrofrom.controls['codtipocuenta'].disable();
                this.parametrofrom.controls['codigocuenta'].disable();
                this.parametrofrom.controls['codgrupocontable'].enable();
                this.parametrofrom.controls['codsubgrupo'].enable();
                this.parametrofrom.controls['codclasecontable'].enable();
                this.parametrofrom.controls['nivel2'].disable();
                this.parametrofrom.controls['nivel3'].disable();
                this.parametrofrom.controls['nivel4'].disable();
                this.parametrofrom.controls['nivel5'].disable();
                this.parametrofrom.controls['nivel6'].disable();
                this.parametrofrom.controls['naturaleza'].enable();
                this.parametrofrom.controls['descripcion'].enable();
                this.parametrofrom.controls['estado'].setValue("A");
                this.parametrofrom.controls['estado'].enable();
                this.parametrofrom.controls['codauxiliar'].enable();
                break;
        }
    }
    cuenta() {

        //con_cod_grupo: string = "";
        //con_cod_subgrupo: string = "";
        this.parametrofrom.controls['codigocuenta'].setValue(this.con_cod_grupo + this.parametrofrom.controls['nivel2'].value + this.parametrofrom.controls['nivel3'].value + this.parametrofrom.controls['nivel4'].value + this.parametrofrom.controls['nivel5'].value + this.parametrofrom.controls['nivel6'].value);
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
            if (!Funcion.ValidadPagina('Plan de Cuenta')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.cargaGrupo();
        this.cargaSubGrupo();
        this.cargaClaseContable();
        this.cargaTipoAuxiliar();
        this.listnaturaleza = Funcion.ListNaturaleza();
        this.listtipocuenta = Funcion.ListTipoCuenta();
        this.listEstado = Funcion.Estado();
        this.notifier = this.injector.get(ServiceMensaje);
        this.habilitarfrom(1);
    }

    cargaParametro() {
        this.spinner.show();
        this.mantenimientoService.manPlanCuenta(globales.cia).subscribe(data => {
            try {
                this.listcuentas = data.root[0];
                this.openModal(this.modalbusquedaplancuenta);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }


    cargaTipoAuxiliar() {
        this.spinner.show();
        this.mantenimientoService.manAuxiliar(globales.cia).subscribe(data => {
            try {
                this.listtipoauxliar = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cargaGrupo() {
        this.spinner.show();
        this.mantenimientoService.manGrupo(globales.cia).subscribe(data => {
            try {
                this.listgrupocontable = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cargaClaseContable() {
        this.spinner.show();
        this.mantenimientoService.getClaseContable(globales.cia).subscribe(data => {
            try {
                this.listclasecontablegen = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cargaSubGrupo() {
        this.spinner.show();
        this.mantenimientoService.manSubGrupo(globales.cia).subscribe(data => {
            try {
                this.listsubgrupo = data.root[0];
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }
    cargaclasecontableselect() {
        this.listclasecontable = [];
        //var datos: any[] = this.listclasecontablegen.filter(k => k.cos_codigo === parseInt(this.parametrofrom.controls['codsubgrupo'].value.toString()));

      

        this.con_cod_subgrupo = this.parametrofrom.controls['codsubgrupo'].value.toString();
       //this.parametrofrom.controls['nivel2'].setValue(this.con_cod_subgrupo);
        var datos: any[] = this.listclasecontablegen;

        this.cuenta();
        this.listclasecontable.push({
            ccc_codigo: 0,
            cos_codigo: "",
            ccc_descripcion: ""
        });
        datos.forEach((k) => {
            this.listclasecontable.push({
                ccc_codigo: k.ccc_codigo,
                cos_codigo: k.cos_codigo,
                ccc_descripcion: k.ccc_descripcion
            });

        });
    }
    cargasubgruposelect(datospaso: string) {

        var _index = this.listgrupocontable.findIndex(k => k.con_codigo === parseInt(this.parametrofrom.controls['codgrupocontable'].value.toString()));
        this.con_cod_grupo = this.listgrupocontable[_index].con_cod_grupo;

        this.listsubgrupocontable = [];
        var datos: any[] = this.listsubgrupo.filter(k => k.con_codigo === parseInt(this.parametrofrom.controls['codgrupocontable'].value.toString()));
        this.cuenta();
        this.listsubgrupocontable.push({
            cos_codigo: 0,
            con_codigo: "",
            cos_descripcion: ""
        });
        datos.forEach((k) => {
            this.listsubgrupocontable.push({
                cos_codigo: k.cos_codigo,
                con_codigo: k.con_codigo,
                cos_descripcion: k.cos_descripcion
            });
        });

        this.parametrofrom.controls['codsubgrupo'].setValue(datospaso);
        this.listclasecontable = [];

    }
    /**
  * DEFINICION DE FUNCION PARA BORRAR VENDEDOR
  */
    deleteparametro() {
        this.spinner.show();
        this.model.cocodigo = this.parametrofrom.controls['cocodigo'].value.toString().toUpperCase();
        this.model.cpccodigo = this.parametrofrom.controls['codigo'].value.toString().toUpperCase();
        this.model.cpcestado = "D";
        this.mantenimientoService.deletePlanCuenta(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarparametro();
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
  * DEFINICION DE FUNCION PARA INSERTAR UN VENDEDOR
  */
    insertparametro() {
        this.spinner.show();


        this.model.cpccodigo = this.parametrofrom.controls['codigo'].value.toString().toUpperCase();;
        this.model.cocodigo = globales.cia;
        this.model.cpccodigoco = this.parametrofrom.controls['codigocuenta'].value.toString().toUpperCase();
        this.model.concodigo = this.parametrofrom.controls['codgrupocontable'].value.toString().toUpperCase();
        this.model.cpctipocuenta = this.parametrofrom.controls['codtipocuenta'].value.toString().toUpperCase();
        this.model.coscodigo = this.parametrofrom.controls['codsubgrupo'].value.toString().toUpperCase();
        this.model.clacodigo = this.parametrofrom.controls['codclasecontable'].value.toString().toUpperCase();
        this.model.cpcnivel2 = this.parametrofrom.controls['nivel2'].value.toString().toUpperCase();
        this.model.cpcnivel3 = this.parametrofrom.controls['nivel3'].value.toString().toUpperCase();
        this.model.cpcnivel4 = this.parametrofrom.controls['nivel4'].value.toString().toUpperCase();
        this.model.cpcnivel5 = this.parametrofrom.controls['nivel5'].value.toString().toUpperCase();
        this.model.cpcnivel6 = this.parametrofrom.controls['nivel6'].value.toString().toUpperCase();
        this.model.cpcnaturaleza = this.parametrofrom.controls['naturaleza'].value.toString().toUpperCase();
        this.model.cpcdescripcion = this.parametrofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.cpcestado = this.parametrofrom.controls['estado'].value.toString().toUpperCase();
        this.model.coacodigo = this.parametrofrom.controls['codauxiliar'].value.toString().toUpperCase();

        this.mantenimientoService.insertPlanCuenta(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarparametro();
                    this.habilitarfrom(1);
                    setTimeout(() =>
                        window.location.reload()


                        , 2000);

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
  * DEFINICION DE FUNCION PARA ACTUALIZAR UN VENDEDOR
  */
    updateparametro() {
        this.spinner.show();
        this.model.cpccodigo = this.parametrofrom.controls['codigo'].value.toString().toUpperCase();;
        this.model.cocodigo = globales.cia;
        this.model.cpccodigoco = this.parametrofrom.controls['codigocuenta'].value.toString().toUpperCase();
        this.model.concodigo = this.parametrofrom.controls['codgrupocontable'].value.toString().toUpperCase();
        this.model.coscodigo = this.parametrofrom.controls['codsubgrupo'].value.toString().toUpperCase();
        this.model.cpctipocuenta = this.parametrofrom.controls['codtipocuenta'].value.toString().toUpperCase();
        this.model.clacodigo = this.parametrofrom.controls['codclasecontable'].value.toString().toUpperCase();
        this.model.cpcnivel2 = this.parametrofrom.controls['nivel2'].value.toString().toUpperCase();
        this.model.cpcnivel3 = this.parametrofrom.controls['nivel3'].value.toString().toUpperCase();
        this.model.cpcnivel4 = this.parametrofrom.controls['nivel4'].value.toString().toUpperCase();
        this.model.cpcnivel5 = this.parametrofrom.controls['nivel5'].value.toString().toUpperCase();
        this.model.cpcnivel6 = this.parametrofrom.controls['nivel6'].value.toString().toUpperCase();
        this.model.cpcnaturaleza = this.parametrofrom.controls['naturaleza'].value.toString().toUpperCase();
        this.model.cpcdescripcion = this.parametrofrom.controls['descripcion'].value.toString().toUpperCase();
        this.model.cpcestado = this.parametrofrom.controls['estado'].value.toString().toUpperCase();
        this.model.coacodigo = this.parametrofrom.controls['codauxiliar'].value.toString().toUpperCase();
        this.mantenimientoService.updatePlanCuenta(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarparametro();
                    this.habilitarfrom(1);
                    setTimeout(() =>
                        window.location.reload()

                        , 2000);
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
  * DEFINICION DE FUNCION PARA GUARDAR Y ACTUALIZAR VENDEDOR
  */
    guardarparametro() {
        this.submitted = true;
        if (this.parametrofrom.invalid) {
            return;
        } else {
            if (this.parametrofrom.controls['tipo'].value === "I") {
                this.insertparametro();
            } else {
                this.updateparametro();
            }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaParametro(data: any) {
   
        this.limpiarparametro();

        this.parametrofrom.controls['codgrupocontable'].enable();
        this.parametrofrom.controls['codsubgrupo'].enable();
        this.parametrofrom.controls['codclasecontable'].enable();

        this.parametrofrom.controls['cocodigo'].setValue(data.co_codigo);
        this.parametrofrom.controls['codigo'].setValue(data.cpc_codigo);
        this.parametrofrom.controls['codigocuenta'].setValue(data.cpc_codigo_co);
        this.parametrofrom.controls['codgrupocontable'].setValue(data.con_codigo);
        this.parametrofrom.controls['codtipocuenta'].setValue(data.cpc_tipo_cuenta);
        this.cargasubgruposelect(data.cos_codigo);
        //   this.parametrofrom.controls['codsubgrupo'].setValue(data.cos_codigo);
        this.cargaclasecontableselect();
        this.parametrofrom.controls['codclasecontable'].setValue(data.cla_codigo);
        this.parametrofrom.controls['nivel2'].setValue(data.cpc_nivel2);
        this.parametrofrom.controls['nivel3'].setValue(data.cpc_nivel3);
        this.parametrofrom.controls['nivel4'].setValue(data.cpc_nivel4);
        this.parametrofrom.controls['nivel5'].setValue(data.cpc_nivel5);
        this.parametrofrom.controls['nivel6'].setValue(data.cpc_nivel6);
        this.parametrofrom.controls['naturaleza'].setValue(data.cpc_naturaleza);
        this.parametrofrom.controls['descripcion'].setValue(data.cpc_descripcion);
        this.parametrofrom.controls['estado'].setValue(data.cpc_estado);
        this.parametrofrom.controls['codauxiliar'].setValue(data.coa_codigo);

        this.parametrofrom.controls['codgrupocontable'].disable();
        this.parametrofrom.controls['codsubgrupo'].disable();
        this.parametrofrom.controls['codclasecontable'].disable();
        this.limpiabotones(3);
    }

    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarparametro() {
        this.parametrofrom.controls['cocodigo'].setValue("");
        this.parametrofrom.controls['codigo'].setValue("");
        this.parametrofrom.controls['codigocuenta'].setValue("");
        this.parametrofrom.controls['codgrupocontable'].setValue("");
        this.parametrofrom.controls['codsubgrupo'].setValue("");
        this.parametrofrom.controls['codtipocuenta'].setValue("");
        this.parametrofrom.controls['codclasecontable'].setValue("");
        this.parametrofrom.controls['nivel2'].setValue("");
        this.parametrofrom.controls['nivel3'].setValue("");
        this.parametrofrom.controls['nivel4'].setValue("");
        this.parametrofrom.controls['nivel5'].setValue("");
        this.parametrofrom.controls['nivel6'].setValue("");
        this.parametrofrom.controls['naturaleza'].setValue("");
        this.parametrofrom.controls['descripcion'].setValue("");
        this.parametrofrom.controls['estado'].setValue("");
        this.parametrofrom.controls['codauxiliar'].setValue("");

        this.submitted = false;
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaParametro();
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
  * DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
  */
    cierreParametro(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaParametro(JSON.parse(event))
        }
    }
    /**
  * DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
  */
    cierreModalforma(event: any) {
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
    get f(): { [key: string]: AbstractControl } {
        return this.parametrofrom.controls;
    }
}
