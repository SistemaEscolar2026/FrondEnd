import { Component, DebugElement, Injector } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceMensaje } from '@services/config/ServiceMensaje';
import { MantenimientoService } from '@services/mantenimiento-service';
import { SeguridadService } from '@services/seguridad-service';
import { Funcion } from '@funciones/funciones';
import { globales, environment, token } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /**
* DEFINICION DE VARIABLE PARA SUBMITED
*/
  public submitted = false;
  /**
 * DEFINICION DE VARIABLE DE RUTA LA CUAL NOS PERMITA REDIRECCIONAR A OTRA PAGINA
 */
  router: Router;
  /**
* DEFINICION DE VARIABLE NOTIFICACION TIPO TOAS
*/
  toastr: any;
  /**
* DEFINICION DE VARIABLE MODELO LOGIN
*/
  _modellogin: any;
  /**
* DEFINICION DE VARIABLE LISTA DE COMPAÑIAS
*/
  compania: any[] = [];
  /**
* DEFINICION DE VARIABLE SELECCION DE COMPAÑIA
*/
  selectedCompa: string = "";
  /**
* DEFINICION DE VARIABLE MODELO FROM PARA LOGIN
*/
  usuariologin: FormGroup = new FormGroup({
    usuario: new FormControl(''),
    clave: new FormControl('')
  });
  /**
 * CONSTRUCTOR DE LA CLASE
 */
  constructor(private spinner: NgxSpinnerService, private seguridadservice: SeguridadService, _router: Router, private fb: FormBuilder, private injector: Injector, private mantenimientoService: MantenimientoService) {
    Funcion.RemoverSession();
    this.router = _router;
    this.creacionFrom();
    this.toastr = this.injector.get(ServiceMensaje);
    this.cargaCompania();
  }
  /**
* DEFINICION DE CREACION VALIDACION DE FROM
*/
  creacionFrom() {
    this.usuariologin = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  /**
* DEFINICION DE CARGA EL MENU DEL USUARIO
*/
  cargaMenu() {
    this.submitted = true;
    if (this.usuariologin.invalid) {
      return;
    } else {
      this.spinner.show();
        this.seguridadservice.getMenuUsuario(this.usuariologin.controls['usuario'].value, this.selectedCompa).subscribe(data => {
        try {
          if (data.codError == "0") {

            sessionStorage.setItem("menupri", Funcion.EncriptarAES(JSON.stringify(data.root[0])));
            sessionStorage.setItem("menusec", Funcion.EncriptarAES(JSON.stringify(data.root[1])));
            sessionStorage.setItem("menufilter", Funcion.EncriptarAES(JSON.stringify(data.root[2])));
/*            globales.sucursalPrin = (data.root[3][0].su_codigo === "" || data.root[3][0].su_codigo === null) ? '01' : data.root[3][0].su_codigo;*/
            this.router.navigate(['/principal/default']);
            sessionStorage.setItem("footer", "1");
          } else {
            this.toastr.showError(data.msgError, 'Alerta');
          }
          this.spinner.hide();

        } catch (e) {
          this.spinner.hide();
          this.toastr.showError("Error en inicio de session", 'Alerta');
        }
      }, () => {
        this.spinner.hide();
        this.toastr.showError("Error en inicio de session", 'Alerta');
      });
    }
  }

  /**
* DEFINICION DE SELECCION DE COMPAÑIA
*/
  seleccionaCompania() {
    globales.cia = this.selectedCompa;
    sessionStorage.setItem("compania", Funcion.EncriptarAES(JSON.stringify(this.getdatoscompania()[0])));
    //environment.API_URL = this.getdatoscompania()[0].cia_rutabackend;
    //token.tokenglobal = this.getdatoscompania()[0].cia_token;
    //Funcion.cambiotoken();
  }

  /**
* DEFINICION DE SELECCION DE DATOS DE COMPAÑIA
*/
  getdatoscompania() {
    var _cia = this.selectedCompa;
      return this.compania.filter(function (data: { co_codigo: any; }) {
          return data.co_codigo === parseInt(_cia)
    });
  }

  /**
* DEFINICION DE CARGA DE COMPAÑIAS
*/
  cargaCompania() {
    this.spinner.show();
    this.mantenimientoService.getCompanias().subscribe(data => {
        try {
            if (data.success) {
                this.compania = data.root[0];
                sessionStorage.clear();
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
* DEFINICION DE LOGIN DE USUARIO
*/
  login() {
    this.submitted = true;
    if (this.usuariologin.invalid) {
      return;
    } else {
      this.spinner.show();
        this.seguridadservice.getUsuarios(this.usuariologin.controls['usuario'].value, this.selectedCompa).subscribe(data => {
            try {
            if (data.success) {
                this._modellogin = data.root[1];
                globales.cia = this._modellogin[0].co_codigo
                 const md5 = Funcion.EncriptarMD5(this.usuariologin.controls['clave'].value);
                token.tokenglobal = data.root[0];
                Funcion.cambiotoken();
                sessionStorage.setItem("usuario", Funcion.EncriptarAES(JSON.stringify(this._modellogin[0])));
                if (this._modellogin[0].us_clave_provisional === "S") {
                    this.router.navigate(['/cambioclave']);
                } else {
                    if (md5 == this._modellogin[0].us_clave) {
                        sessionStorage.setItem("autoriza", Funcion.EncriptarAES("true"));
                        sessionStorage.setItem("usuario", Funcion.EncriptarAES(JSON.stringify(this._modellogin[0])));
                        sessionStorage.setItem("cierremodulo", Funcion.EncriptarAES(JSON.stringify(data.root[2])));

                       
                        //this.router.navigate(['/principal/default']);
                        sessionStorage.setItem("footer", "1");
                        this.cargaMenu();
                    } else {
                        this.toastr.showError("Error en inicio de session", 'Alerta');
                    }
                }
            } else {
                this.toastr.showError("Error en inicio de session", 'Alerta');
            }
          this.spinner.hide();

        } catch (e) {
          this.spinner.hide();
          this.toastr.showError("Error en inicio de session", 'Alerta');
        }
      }, err => {
        this.spinner.hide();
        this.toastr.showError(err.error.Message);
      });
    }
  }
  /**
* DEFINICION DE FUNCION DE VALIDACION DE CONTROL DE FROM
*/
  get f(): { [key: string]: AbstractControl } {
    return this.usuariologin.controls;
  }
}

