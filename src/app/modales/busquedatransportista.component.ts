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
  selector: 'app-busquedatransportista',
  templateUrl: './busquedatransportista.component.html',
  styleUrls: ['./busquedatransportista.component.scss'],
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
export class BusquedaTransportistaComponent implements OnInit  {
  /**
* DEFINICION DE VARIABLE ENTRADA DE LISTADO DE TRANSPORTISTA
*/
  @Input() listadotransportista: any[] = [];
  /**
* DEFINICION DE VARIABLE SALIDA DE CONFIRMACION DE CIERRE DE MODAL
*/
  @Output() confirmacionCierre = new EventEmitter<any>();
  /**
* DEFINICION DE VARIABLE SALIDA DE CIERRE DE MODAL
*/
  @Output() cierreModal = new EventEmitter<boolean>();
  /**
* DEFINICION DE VARIABLE DE PAGINACION DE GRID
*/
  paginacion: number = 1;
  /**
* DEFINICION DE VARIABLE CON NOMBRE DE CAMPOS DE CABECERA DE VENDEDORES
*/
  ColumnaDetalle: any[] = ['Código', 'Descripción'];
  /**
* DEFINICION DE VARIABLE CON DATOS DE TRANSPORTISTA
*/
  transportista: any[] = [];
  /**
* DEFINICION DE VARIABLE SELECCION DE TRANSPORTISTA
*/
  selectedTransportista: any = [];
  /**
* DEFINICION DE VARIABLE PARA BUSQUEDAD
*/
  txtbusca: string = "";

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private toastr: ToastrService) {
    this.cargaTranspotista();
  }
  /**
* DEFINICION DE FUNCION INIT DE LA CLASE
*/
  ngOnInit() {
    this.transportista = this.listadotransportista;
  }
  /**
* DEFINICION DE FUNCION CARGA DE TRANSPORTISTA
*/
  cargaTranspotista() {
    this.transportista = this.listadotransportista;
    this.limpiarColor();
  }
  /**
* DEFINICION DE FUNCION DE CERRAR MODAL CON CONFIRMACION
*/
  cerrar() {
    this.confirmacionCierre.emit(this.selectedTransportista);
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
    for (var i = 0; i < this.transportista.length; i++) {
      this.transportista[i].color = "";
    }
  }
  /**
* DEFINICION DE FUNCION DE SELECCIONAR TRANSPORTISTA
*/
  seleccionaTransportista() {
    this.cerrar();
  }
  /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
  clickGrid(row: any) {
    this.limpiarColor();
    this.selectedTransportista = row.vecodigo
    row.color = "FT";
  }
  /**
* DEFINICION DE FUNCION DE DOBLE CLICK EN LINEA DE GRID
*/
  dblclickGrid(row: any) {
    this.limpiarColor();
    row.color = "FT";
    this.selectedTransportista = JSON.stringify(row);
    this.cerrar()
  }
  /**
* DEFINICION DE FUNCION ACEPTAR
*/
  aceptar() {
    if (this.selectedTransportista === "") {
      this.toastr.info("Debe seleccionar un Transportista...", 'Busqueda Transportista');
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
