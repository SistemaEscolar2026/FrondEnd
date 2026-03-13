import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Funcion } from '@funciones/funciones';
import { MustMatch } from '@utility/CustomvalidationService';
import { UsuarioModel } from '@modelo/usuario-model';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { SeguridadService } from '@services/seguridad-service';
import { MantenimientoService } from '@services/mantenimiento-service';
import { environment, token } from '../../environments/environment';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/

@Component({
    templateUrl: 'cambioclave.component.html',
    styleUrls: ['./cambioclave.component.scss']
})

export class CambioClaveComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE PARA SUBMITED
  */
    public submitted = false;
    /**
  * DEFINICION DE NUMORO DE VALOR PARA USUARIO
  */
    public nume: number = 0;
    /**
  * DEFINICION DE VARIABLE DE RUTA LA CUAL NOS PERMITA REDIRECCIONAR A OTRA PAGINA
  */
    router: Router;
    /**
  * DEFINICION DE VARIABLE DE MODELO DE USUARIO PARA CAMBIO DE CLAVE
  */
    modelo: any = {};
    /**
  * DEFINICION DE VARIABLE QUE ENVIA INFORMACION A MODAL DE MENSAJE
  */
    llamarmodal: string = "";
    /**
  * DEFINICION DE VARIABLE MODELO FROM PARA CAMBIO DE CLAVE
  */
    public formGroup: FormGroup = new FormGroup({
        usuario: new FormControl(''),
        clave_Usuario: new FormControl(''),
        clave_ConUsuario: new FormControl('')
    });
    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(private spinner: NgxSpinnerService, private formBuilder: FormBuilder, _router: Router, private seguridadservice: SeguridadService, private mantenimientoService: MantenimientoService) {
        this.router = _router;
        this.modelo.cocodigo = Funcion.ReturnUsuario().co_codigo;
        this.modelo.uscodigo = Funcion.ReturnUsuario().us_codigo;
        this.modelo.usdescrip = Funcion.ReturnUsuario().us_nombre;
        this.modelo.usclave = Funcion.ReturnUsuario().us_clave;
        this.modelo.usestado = Funcion.ReturnUsuario().us_estado;
        this.modelo.usclaveprovisional = Funcion.ReturnUsuario().us_clave_provisional;
        this.modelo.usfoto = Funcion.ReturnUsuario().us_foto;
        this.modelo.uscorreo = Funcion.ReturnUsuario().us_correo;


        //environment.API_URL = _datos.cia_rutabackend;
        //token.tokenglobal = _datos.cia_token;
        Funcion.cambiotoken();
    }
    /**
  * DEFINICION DE FUNCION INIT DE LA CLASE
  */
    ngOnInit() {
        this.initForm();
    }



    /**
  * DEFINICION DE FUNCION INICIALIZA EL FROM DE CAMBIO DE CLAVE
  */
    initForm() {
        this.formGroup = this.formBuilder.group({
            clave_Usuario: new FormControl('', [Validators.required, Validators.minLength(8)]),
            clave_ConUsuario: new FormControl('', [Validators.required, Validators.minLength(8)])
        }, { validators: MustMatch('clave_Usuario', 'clave_ConUsuario') });
        this.formGroup.controls['clave_Usuario'].setValue("");
        this.formGroup.controls['clave_ConUsuario'].setValue("");
    }

    /**
  * DEFINICION DE FUNCION QUE CAMBIA LA CLAVE DEL USUARIO
  */
    cambioclave() {
        var data: string = "";
        this.submitted = true;
        if (this.formGroup.invalid) {
            return;
        } else {
            this.spinner.show();
            this.modelo.usclave = Funcion.EncriptarMD5(this.formGroup.controls['clave_Usuario'].value.toString()) ;  
            this.mantenimientoService.updateUsuariosLogin(this.modelo).subscribe(data => {
                try {
                    if (data.success) {
                        this.spinner.hide();
                        this.llamarmodal = "3|Cambio de Clave|" + data.msgError + "|" + Funcion.Ramdon().toString();
                    }
                } catch (e) {
                    this.spinner.hide();
                }
            }, err => {
                this.llamarmodal = "1|Cambio de Clave|" + err.message + "|" + Funcion.Ramdon().toString();
                this.spinner.hide();
            });
        }
    }

    /**
  * DEFINICION DE FUNCION QUE RETORNA A LA PANTALLA DE INGRESO DE LOGIN
  */
    regresar() {
        this.router.navigate(['/']);
    }
    /**
  * DEFINICION DE FUNCION RETORNA A LA PANTALLA DE INGRESO DE LOGIN DESPUES DE LA CONFIRMACION DE OK
  */
    aceptarOk(event: boolean) {
        if (event) {
            this.regresar();
        }
    }
    /**
  * DEFINICION DE FUNCION DE VALIDACION DE CONTROL DE FROM
  */
    get f() { return this.formGroup.controls; }
}
