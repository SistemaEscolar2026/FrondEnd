import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-busquedaretencion',
  templateUrl: './busquedaretencion.component.html',
  styleUrls: ['./busquedaretencion.component.scss'],
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
export class BusquedaRetencionComponent implements OnInit  {
  /**
* DEFINICION DE VARIABLE ENTRADA DE LISTADO DE ITEM
*/
  @Input() listretencion: any[] = [];
  /**
* DEFINICION DE VARIABLE ENTRADA DE CON ITEM DE BUSQUEDAD
*/
  @Input() set datoBusquedad(datos: string) {
    this.txtbusca = datos;
  }
  /**
* DEFINICION DE VARIABLE SALIDA DE CONFIRMACION DE CIERRE DE MODAL
*/
  @Output() confirmacionCierre = new EventEmitter<string>();
  /**
* DEFINICION DE VARIABLE SALIDA DE CIERRE DE MODAL
*/
  @Output() cierreModal = new EventEmitter<boolean>();
  /**
* DEFINICION DE VARIABLE CON NOMBRE DE CAMPOS DE CABECERA DE ITEM
*/
  ColumnaDetalle: any[] = ['Tipo Retención', 'Num. Retención', 'Tipo Doc. Cxp', 'Num.Doc. Cxp', 'Proveedor'];
  /**
* DEFINICION DE VARIABLE CON DATOS DE ITEM
*/
  retenciones: any[] = [];
  public paginacion: number = 1;
  /**
* DEFINICION DE VARIABLE SELECCION DE ITEM
*/
  selectedItem: string = "";
  /**
* DEFINICION DE VARIABLE PARA BUSQUEDAD
*/
  txtbusca: string = "";

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private toastr: ToastrService, _router: Router) {

  }
  /**
* DEFINICION DE FUNCION INIT DE LA CLASE
*/
  ngOnInit() {
    this.retenciones = this.listretencion;
    this.limpiarColor();
  }

  /**
* DEFINICION DE FUNCION DE CERRAR MODAL CON CONFIRMACION
*/
  cerrar() {
    this.confirmacionCierre.emit(this.selectedItem.toString());
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
    for (var i = 0; i < this.retenciones.length; i++) {
      this.retenciones[i].color = "";
    }
  }
  /**
* DEFINICION DE FUNCION DE SELECCIONAR ITEM
*/
  seleccionaItem() {
    this.cerrar();
  }
  /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
  clickGrid(row: any) {
    this.limpiarColor();
    this.selectedItem = JSON.stringify(row);
    row.color = "FT";
  }
  /**
* DEFINICION DE FUNCION DE DOBLE CLICK EN LINEA DE GRID
*/
  dblclickGrid(row: any) {
    this.limpiarColor();
    row.color = "FT";
    this.selectedItem = JSON.stringify(row);
    this.cerrar()
  }
  /**
* DEFINICION DE FUNCION ACEPTAR
*/
  aceptar() {
    if (this.selectedItem === "") {
      this.toastr.info("Debe seleccionar una retencion...", 'Busqueda Retenciones');
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
