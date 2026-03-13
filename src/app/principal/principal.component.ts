import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Funcion } from '@funciones/funciones';
import { FuncionesService } from '@services/funciones-service';
import { globales, environment } from 'src/environments/environment';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],

})
export class PrincipalComponent implements OnInit {
  /**
* DEFINICION DE VARIABLE DE RUTA LA CUAL NOS PERMITA REDIRECCIONAR A OTRA PAGINA
*/
  router: Router;


  /**
 * DEFINICION DE FUNCION INIT DE LA CLASE
 */
  ngOnInit() {
    this.cargafechainicial();
  }
  /**
 * DEFINICION DE CARGA INICIALE DE FECHA VARIAS
 */
  async cargafechainicial() {


  }


  /**
 * CONSTRUCTOR DE LA CLASE
 */
  constructor(_router: Router, private funcionesService: FuncionesService) {
    this.router = _router;
    if (!Funcion.ValidadAutorizado()) {
      this.router.navigate(['/'], {
        skipLocationChange: true,
      });
    }
  }

}
