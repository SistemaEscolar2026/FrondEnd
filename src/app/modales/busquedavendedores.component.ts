import { Component, EventEmitter, Output } from '@angular/core';
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
  selector: 'app-busquedavendedores',
  templateUrl: './busquedavendedores.component.html',
  styleUrls: ['./busquedavendedores.component.scss'],
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
export class BusquedaVendedoresComponent {
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
  vendedores: any[] = [];
  /**
* DEFINICION DE VARIABLE SELECCION DE VENDEDOR
*/
  selectedVendedor: string = "";
  /**
* DEFINICION DE VARIABLE PARA BUSQUEDAD
*/
  txtbusca: string = "";

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private toastr: ToastrService, private mantenimientoService: MantenimientoService) {
    this.cargaVendedores();
  }
  /**
* DEFINICION DE FUNCION CARGA VENDEDORES
*/
  cargaVendedores() {
    this.loading = true;
    this.mantenimientoService.getVendedor(globales.cia).subscribe(data => {
      try {
        this.vendedores = data;
        this.limpiarColor();
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    }, () => {
      this.loading = false;
    });

  }
  /**
* DEFINICION DE FUNCION CERRAR MODAL CON CONFIRMACION
*/
  cerrar() {
    this.confirmacionCierre.emit(this.selectedVendedor.toString());
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
    for (var i = 0; i < this.vendedores.length; i++) {
      this.vendedores[i].color = "";
    }
  }
  /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
  clickGrid(row: any) {
    this.limpiarColor();
    this.selectedVendedor = row.vecodigo
    row.color = "FT";
  }
  /**
* DEFINICION DE FUNCION DE DOBLE CLICK EN LINEA DE GRID
*/
  dblclickGrid(row: any) {
    this.limpiarColor();
    row.color = "FT";
    this.selectedVendedor = row.vecodigo;
    this.cerrar()
  }
  /**
* DEFINICION DE FUNCION ACEPTAR
*/
  aceptar() {
    if (this.selectedVendedor === "") {
      this.toastr.info("Debe seleccionar un vendedor...", 'Busqueda Vendedor');
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
