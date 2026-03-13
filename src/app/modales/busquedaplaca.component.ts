import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { GrdFilterPipe } from '../pipe/filterGrid';
import { NgxPaginationModule } from 'ngx-pagination';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  standalone: true,
  selector: 'app-busquedaplaca',
  templateUrl: './busquedaplaca.component.html',
  styleUrls: ['./busquedaplaca.component.scss'],
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
    GrdFilterPipe,
    NgxPaginationModule
  ]

})
export class BusquedaPlacaComponent implements OnInit  {
  /**
* DEFINICION DE VARIABLE ENTRADA DE LISTADO DE PLACA
*/
  @Input() listadoplaca: any[] = [];
  /**
* DEFINICION DE VARIABLE SALIDA DE CONFIRMACION DE CIERRE DE MODAL
*/
  @Output() confirmacionCierre = new EventEmitter<string>();
  /**
* DEFINICION DE VARIABLE SALIDA DE CIERRE DE MODAL
*/
  @Output() cierreModal = new EventEmitter<boolean>();
  /**
* DEFINICION DE VARIABLE PAGINACION DE GRID
*/
  public paginacion: number = 1;
  /**
* DEFINICION DE VARIABLE CON NOMBRE DE CAMPOS DE CABECERA DE CLIENTE
*/
  ColumnaDetalle: any[] = ['Placa'];
  /**
* DEFINICION DE VARIABLE CON DATOS DE CLIENTE
*/
  placas: any[] = [];
  /**
* DEFINICION DE VARIABLE SELECCION DE CLIENTE
*/
  selectedPlaca: any = [];
  /**
* DEFINICION DE VARIABLE PARA BUSQUEDAD
*/
  txtbusca: string = "";
  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private toastr: ToastrService) {
    this.cargaPlacas();
  }
  /**
* DEFINICION DE FUNCION INIT DE LA CLASE
*/
  ngOnInit() {
    this.placas = this.listadoplaca;
  }
  /**
* DEFINICION DE FUNCION DE CARGA DE PLACAS
*/
  cargaPlacas() {
    this.placas = this.listadoplaca;
    this.limpiarColor();
  }
  /**
* DEFINICION DE FUNCION DE CERRAR MODAL CON CONFIRMACION
*/
  cerrar() {
    this.confirmacionCierre.emit(this.selectedPlaca.toString());
  }
  /**
* DEFINICION DE FUNCION DE CERRAR MODAL
*/
  cerrarmodal() {
    this.cierreModal.emit(true);
  }
  /**
* DEFINICION DE FUNCION DE LIMPIAR COLOR
*/
  limpiarColor() {
    for (var i = 0; i < this.placas.length; i++) {
      this.placas[i].color = "";
    }
  }
  /**
* DEFINICION DE FUNCION DE SELECCIONAR PLACA
*/
  seleccionaCliente() {
    this.cerrar();
  }
  /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
  clickGrid(row: any) {
    this.limpiarColor();
    this.selectedPlaca = JSON.stringify(row)
    row.color = "FT";
  }
  /**
* DEFINICION DE FUNCION DE DOBLE CLICK EN LINEA DE GRID
*/
  dblclickGrid(row: any) {
    this.limpiarColor();
    row.color = "FT";
    this.selectedPlaca = JSON.stringify(row);
    this.cerrar()
  }
  /**
* DEFINICION DE FUNCION ACEPTAR
*/
  aceptar() {
    if (this.selectedPlaca === "") {
      this.toastr.info("Debe seleccionar una Placa...", 'Busqueda Placa');
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
