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
    selector: 'app-busquedagastos',
    templateUrl: './busquedagastos.component.html',
    styleUrls: ['./busquedagastos.component.scss'],
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
export class BusquedaGastosComponent implements OnInit  {
  /**
* DEFINICION DE VARIABLE ENTRADA DE LISTADO DE CLIENTE
*/
  @Input() listadogastos: any[] = [];
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
  ColumnaDetalle: any[] = ['Código', 'Descripción'];
  /**
* DEFINICION DE VARIABLE CON DATOS DE CLIENTE
*/
  gastos: any[] = [];
  /**
* DEFINICION DE VARIABLE SELECCION DE CLIENTE
*/
  selectedCliente: any = [];
  /**
* DEFINICION DE VARIABLE PARA BUSQUEDAD
*/
  txtbusca: string = "";
  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private toastr: ToastrService) {
    this.cargaClientes();
  }
  /**
* DEFINICION DE FUNCION INIT DE LA CLASE
*/
  ngOnInit() {
      this.gastos = this.listadogastos;
  }
  /**
* DEFINICION DE FUNCION DE CARGA DE CLIENTES
*/
  cargaClientes() {

      this.gastos = this.listadogastos;
    this.limpiarColor();
    }
  
  /**
* DEFINICION DE FUNCION DE CERRAR MODAL CON CONFIRMACION
*/
  cerrar() {
    this.confirmacionCierre.emit(this.selectedCliente.toString());
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
      for (var i = 0; i < this.gastos.length; i++) {
          this.gastos[i].color = "";
    }
  }
  /**
* DEFINICION DE FUNCION DE SELECCIONAR CLIENTE
*/
  seleccionaCliente() {
    this.cerrar();
  }
  /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
  clickGrid(row: any) {
    this.limpiarColor();
    this.selectedCliente = JSON.stringify(row)
    row.color = "FT";
  }
  /**
* DEFINICION DE FUNCION DE DOBLE CLICK EN LINEA DE GRID
*/
  dblclickGrid(row: any) {
    this.limpiarColor();
    row.color = "FT";
    this.selectedCliente = JSON.stringify(row);
    this.cerrar()
  }
  /**
* DEFINICION DE FUNCION ACEPTAR
*/
  aceptar() {
    if (this.selectedCliente === "") {
      this.toastr.info("Debe seleccionar un Gastos...", 'Busqueda Gastos');
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
