import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { MantenimientoService } from '@services/mantenimiento-service';
import { globales } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { GrdFilterPipe } from '../pipe/filterGrid';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  standalone: true,
  selector: 'app-busquedaactivofijomodal',
  templateUrl: './busquedaactivofijomodal.component.html',
  styleUrls: ['./busquedaactivofijomodal.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    CommonModule,
    GrdFilterPipe
  ]

})
export class BusquedaActivoFijoModalComponent implements OnInit {
  /**
* DEFINICION DE VARIABLE ENTRADA DE LISTADO DE CLIENTE
*/
  @Input() listadoactivo: any[] = [];
  /**
* DEFINICION DE VARIABLE SALIDA DE CONFIRMACION DE CIERRE DE MODAL
*/
  @Output() confirmacionCierre = new EventEmitter<string>();
  /**
* DEFINICION DE VARIABLE  DE CIERRE DE MODAL
*/
  @Output() cierreModal = new EventEmitter<boolean>();
  /**
* DEFINICION DE VARIABLE PARA EFECTO DE LOADING
*/
  public loading = false;
  /**
* DEFINICION DE VARIABLE CON NOMBRE DE CAMPOS DE CABECERA DE VENDEDORES
*/
  ColumnaDetalle: any[] = ['Código', 'Nombre'];
  /**
* DEFINICION DE VARIABLE CON DATOS DE VENDEDORES
*/
  activofijos: any[] = [];
  /**
* DEFINICION DE VARIABLE SELECCION DE VENDEDOR
*/
  selectedActivoFijo: string = "";
  /**
* DEFINICION DE VARIABLE PARA BUSQUEDAD
*/
  txtbusca: string = "";

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private toastr: ToastrService, private mantenimientoService: MantenimientoService) {
    this.cargaActivoFijo();
  }
  ngOnInit() {
    this.activofijos = this.listadoactivo;
  }
  cargaActivoFijo() {
    this.activofijos = this.listadoactivo;
    this.limpiarColor();
  }
  /**
* DEFINICION DE FUNCION CARGA VENDEDORES
*/

  /**
* DEFINICION DE FUNCION CERRAR MODAL CON CONFIRMACION
*/
  cerrar() {
    this.confirmacionCierre.emit(this.selectedActivoFijo.toString());
  }
  /**
* DEFINICION DE FUNCION CERRAR MODAL
*/
  cerrarmodal() {
    this.cierreModal.emit(true);
  }

  /**
 * DEFINICION DE FUNCION PARA LIMPIAR COLOR
 */
  limpiarColor() {
    for (var i = 0; i < this.activofijos.length; i++) {
      this.activofijos[i].color = "";
    }
  }
  /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
  clickGrid(row: any) {
    this.limpiarColor();
    this.selectedActivoFijo = JSON.stringify(row);
    row.color = "FT";
  }
  /**
* DEFINICION DE FUNCION DE DOBLE CLICK EN LINEA DE GRID
*/
  dblclickGrid(row: any) {
    this.limpiarColor();
    row.color = "FT";
    this.selectedActivoFijo = JSON.stringify(row);
    this.cerrar()
  }
  /**
* DEFINICION DE FUNCION ACEPTAR
*/
  aceptar() {
    if (this.selectedActivoFijo === "") {
      this.toastr.info("Debe seleccionar un Activo Fijo...", 'Busqueda Activo Fijo');
    } else {
      this.cerrar();
    }
  }
  /**
* DEFINICION DE FUNCION DE CANCELAR
*/
  cancelar() {
    this.cerrarmodal();
  }
}
