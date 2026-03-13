import { Component, EventEmitter, Output } from '@angular/core';
import { MantenimientoService } from '@services/mantenimiento-service';
import { globales } from 'src/environments/environment';
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  selector: 'app-compania',
  templateUrl: './compania.component.html',
  styleUrls: ['./compania.component.scss']
})
export class CompaniaComponent {
  /**
* DEFINICION DE VARIABLE SALIDA DE CONFIRMACION DE CIERRE DE MODAL
*/
  @Output() confirmacionCierre = new EventEmitter<boolean>();
  /**
* DEFINICION DE VARIABLE PARA EFECTO DE LOADING
*/
  loading = false;
  /**
* DEFINICION DE VARIABLE DE LISTADO DE COMPAÑIAS
*/
  compania: any[] = [];
  /**
* DEFINICION DE VARIABLE DE SELECCION DE COMPAÑIA
*/
  selectedCompa: string = "";

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private mantenimientoService: MantenimientoService) {
    this.cargaCompania();
  }
  /**
* DEFINICION DE FUNCION CARGA COMPAÑIAS
*/
  cargaCompania() {
    this.loading = true;
    this.mantenimientoService.getCompanias(globales.cia).subscribe(data => {
      try {

        this.compania = data;
        this.selectedCompa = globales.cia;
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    }, () => {
      this.loading = false;
    });

  }
  /**
* DEFINICION DE FUNCION CERRAR MODAL
*/
  cerrar() {
    this.confirmacionCierre.emit(true);
  }
  /**
* DEFINICION DE FUNCION SELECCIONA COMPAÑIA
*/
  seleccionaCompania() {
    this.cerrar();
  }
}
