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
    templateUrl: './ruta.component.html',
    styleUrls: ['./ruta.component.scss']
})
export class RutaComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE DE MODAL DE BUSQUEDA DE VENDEDOR
  */
    @ViewChild('modalbusquedaruta') modalbusquedaruta: any;
    @ViewChild('modalbusquedaiata') modalbusquedaiata: any;

    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    modalRef: any;
    habilita: boolean = false;
    /**
  * DEFINICION DE VARIABLE DE CONTROL DE ACCION SUBMIT DE PAGINA
  */
    submitted = false;
    ColumnaDetalle: any[] = ['IATA', 'COD. IATA', ' '];
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
    detalleruta: any[] = [];
    selectlinea: any;
    listiata: any[] = [];
    txtbusca: string = "";
    iAccion: string = "";
    /**
* DEFINICION DE VARIABLE CON LA LISTADO DE CLIENTE
*/
    listrutas: any[] = [];



    /**
   * DEFINICION DE VARIABLE DE VENDEDOR FROM GROUP 
   */
    rutafrom: FormGroup = new FormGroup({
        tipo: new FormControl(''),
        codigo: new FormControl(''),
        ruta: new FormControl(''),
        rutanombre: new FormControl(''),
        cocodigo: new FormControl(''),
        estado: new FormControl('')
    });
    /**
   * DEFINICION DE VARIABLE DE MODELO DE VENDEDOR
   */
    model: any = {};
    modeldet: any[] = [];
    /**
 * DEFINICION DE FUNCION INIT DE LA CLASE
 */
    ngOnInit() {
        this.limpiabotones(1);
    }
    cierreModalforma(event: any) {
        if (event) {
            this.hideModal()
        }
    }
    /**
* DEFINICION DE FUNCION CARGA VENDEDORES
*/
    cargaRuta() {
        this.spinner.show();
        this.mantenimientoService.manRutas(globales.cia).subscribe(data => {
            try {
                this.listrutas = data.root[0];
                var _detalle: [];
                _detalle = data.root[1];
                for (var i = 0; i < this.listrutas.length; i++) {
                    this.listrutas[i].detalle = [];
                    this.listrutas[i].detalle = _detalle.filter((key: any) => {
                        return key.rut_codigo === this.listrutas[i].rut_codigo
                    });
                }
                this.openModal(this.modalbusquedaruta);
                this.spinner.hide();
            } catch (e) {
                this.spinner.hide();
            }
        }, () => {
            this.spinner.hide();
        });

    }

    /**
   * DEFINICION PARA HABILITAR EL FROM
   */
    habilitarfrom(val: Number) {
        switch (val) {
            case 1:
                this.iAccion = "";
                this.rutafrom.controls['codigo'].disable();
                this.rutafrom.controls['cocodigo'].disable();
                this.rutafrom.controls['ruta'].disable();
                this.rutafrom.controls['rutanombre'].disable();
                this.rutafrom.controls['estado'].disable();
                this.habilita = true;
                break;
            case 2:
                this.iAccion = "I";
                this.rutafrom.controls['tipo'].setValue("I");
                this.rutafrom.controls['codigo'].disable();
                this.rutafrom.controls['ruta'].disable();
                this.rutafrom.controls['cocodigo'].disable();
                this.rutafrom.controls['rutanombre'].enable();
                this.rutafrom.controls['estado'].setValue("A");
                this.rutafrom.controls['estado'].enable();

                for (var i = 0; i < 10; i++) {
                    this.detalleruta.push({
                        sec: (i + 1),
                        iata: "IATA" + (i + 1),
                        codiata: "",
                        codnomiata: ""
                    });
                }

                this.habilita = false;
                break;
            case 3:
                this.iAccion = "M";
                this.rutafrom.controls['tipo'].setValue("M");
                this.rutafrom.controls['codigo'].disable();
                this.rutafrom.controls['ruta'].disable();
                this.rutafrom.controls['cocodigo'].disable();
                this.rutafrom.controls['rutanombre'].enable();
                this.rutafrom.controls['estado'].enable();
                this.habilita = true;

                break;
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
            if (!Funcion.ValidadPagina('Ingreso de Ruta')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }
        this.listEstado = Funcion.Estado();
        this.notifier = this.injector.get(ServiceMensaje);
        this.habilitarfrom(1);
    }

    /**
  * DEFINICION DE FUNCION PARA BORRAR RUTA
  */
    deleteruta() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.codigo = this.rutafrom.controls['codigo'].value.toString().toUpperCase();
        this.model.ruta = this.rutafrom.controls['ruta'].value.toString().toUpperCase();
        this.model.rutanombre = this.rutafrom.controls['rutanombre'].value.toString().toUpperCase();
        this.model.estado = "D";
        this.mantenimientoService.deleteRuta(this.model).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarruta();
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
* DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
*/
    cierreCiudad(event: any) {
        if (event !== "") {
            let dato = JSON.parse(event);
            var cant = this.detalleruta.findIndex((key) => {
                return key.codiata === dato.ci_codigo;
            });
            if (true) {
                this.detalleruta.forEach((key) => {
                    if (key.sec === this.selectlinea.sec) {
                        key.codiata = dato.ci_codigo;
                        key.codnomiata = dato.ci_nombre
                    }
                });
                if (this.rutafrom.controls['ruta'].value === "") {
                    this.rutafrom.controls['ruta'].setValue(dato.ci_nombre);
                } else {
                    this.rutafrom.controls['ruta'].setValue(this.rutafrom.controls['ruta'].value+"-"+dato.ci_nombre);
                }
            } else {
                this.notifier.showSuccess("El codigo IATA ya existe");
            }
            this.hideModal()
        }
    }
    openRuta(dato: any) {
        let _sec = dato.sec - 1
        if (_sec >= 0) {
            var _filtro = this.detalleruta.filter((key: any) => {
                return key.sec === dato.sec - 1 && key.codnomiata === ""
            });
            if (_filtro.length <= 0) {
                this.selectlinea = dato;
                this.spinner.show();
                this.mantenimientoService.manCiudad(globales.cia).subscribe(data => {
                    try {
                        this.listiata = data.root[0];
                        this.openModal(this.modalbusquedaiata);
                        this.spinner.hide();
                    } catch (e) {
                        this.spinner.hide();
                    }
                }, () => {
                    this.spinner.hide();
                });
            } else {
                this.notifier.showSuccess("Debe seleccionar un codigo IATA en la linea superior");
            }
        }
    }
    /**
  * DEFINICION DE FUNCION PARA INSERTAR UN VENDEDOR
  */
    insertruta() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.codigo = this.rutafrom.controls['codigo'].value.toString().toUpperCase();
        this.model.ruta = this.rutafrom.controls['ruta'].value.toString().toUpperCase();
        this.model.rutanombre = this.rutafrom.controls['rutanombre'].value.toString().toUpperCase();
        this.model.estado = this.rutafrom.controls['estado'].value.toString().toUpperCase();
        this.modeldet = [];
        this.detalleruta.forEach((key) => {
            if (key.codiata!="") {
                this.modeldet.push({
                    sec: key.sec,
                    iata: key.iata,
                    codiata: key.codiata,
                    codnomiata: key.codnomiata
                });
            }
        });

        this.mantenimientoService.insertRuta(this.model, this.modeldet).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarruta();
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
* DEFINICION DE FUNCION DE LIMPIAR COLOR
*/
    limpiarColor() {
        for (var i = 0; i < this.detalleruta.length; i++) {
            this.detalleruta[i].color = "";
        }
    }
    /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
    clickGrid(row: any) {
        this.limpiarColor();
        row.color = "SG";
    }
    /**
  * DEFINICION DE FUNCION PARA ACTUALIZAR UN VENDEDOR
  */
    updaterutas() {
        this.spinner.show();
        this.model.cocodigo = globales.cia;
        this.model.codigo = this.rutafrom.controls['codigo'].value.toString().toUpperCase();
        this.model.ruta = this.rutafrom.controls['ruta'].value.toString().toUpperCase();
        this.model.rutanombre = this.rutafrom.controls['rutanombre'].value.toString().toUpperCase();
        this.model.estado = this.rutafrom.controls['estado'].value.toString().toUpperCase();
        this.modeldet = [];
        this.detalleruta.forEach((key) => {
            if (key.codiata != "") {
                this.modeldet.push({
                    sec: key.sec,
                    iata: key.iata,
                    codiata: key.codiata,
                    codnomiata: key.codnomiata
                });
            }
        });

        this.mantenimientoService.updateRuta(this.model, this.modeldet).subscribe(data => {
            try {
                if (data.success) {
                    this.notifier.showok(data.msgError, "")
                    this.limpiabotones(1);
                    this.limpiarruta();
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
  * DEFINICION DE FUNCION PARA GUARDAR Y ACTUALIZAR VENDEDOR
  */
    guardarconsolidador() {
        this.submitted = true;
        if (this.rutafrom.invalid) {
            return;
        } else {
            if (this.rutafrom.controls['ruta'].value === "") {
                this.notifier.showSuccess("Ruta es Requerido", "");
            } else
                if (this.rutafrom.controls['tipo'].value === "I") {
                    this.insertruta();
                } else {
                    this.updaterutas();
                }
        }
    }

    /**
  * DEFINICION DE FUNCION PARA SETEAR INFORMACION DE MODAL A PANTALLA DE CLIENTE
  */
    seteaRuta(data: any) {


        this.rutafrom.controls['codigo'].setValue(data.rut_codigo);
        this.rutafrom.controls['ruta'].setValue(data.rut_ruta);
        this.rutafrom.controls['cocodigo'].setValue(data.co_codigo);
        this.rutafrom.controls['rutanombre'].setValue(data.rut_descripcion);
        this.rutafrom.controls['estado'].setValue(data.rut_estado);

        for (var i = 0; i < 10; i++) {
            this.detalleruta.push({
                sec: (i + 1),
                iata: "IATA" + (i + 1),
                codiata: "",
                codnomiata: ""
            });
        }
        for (var i = 0; i < data.detalle.length; i++) {
            for (var j = 0; j < this.detalleruta.length; j++) {
                if (data.detalle[i].sec === this.detalleruta[j].sec) {
                    this.detalleruta[j].codiata = data.detalle[i].codiata;
                    this.detalleruta[j].codnomiata = data.detalle[i].codnomiata;
                }
            }
        }
       



        this.limpiabotones(3);
    }


    /**
  * DEFINICION DE FUNCION PARA LIMPIAR CONTROLES DE PANTALLA DE VENDEDOR
  */
    limpiarruta() {
        this.rutafrom.controls['codigo'].setValue("");
        this.rutafrom.controls['ruta'].setValue("");
        this.rutafrom.controls['cocodigo'].setValue("");
        this.rutafrom.controls['rutanombre'].setValue("");
        this.rutafrom.controls['estado'].setValue("");
        this.submitted = false;
        this.detalleruta = [];
    }



    /**
  * DEFINICION DE FUNCION ABRIR MODAL DE BUSQUEDAD VENDEDOR
  */
    buscar() {
        this.cargaRuta();
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
    cierreRutas(event: any) {
        if (event !== "") {
            this.hideModal()
            this.seteaRuta(JSON.parse(event))
        }
    }

    /**
  * DEFINICION DE FUNCION CIERRE MODAL DE VENDEDOR
  */
    cierreModalrutas(event: any) {
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
        return this.rutafrom.controls;
    }
}
