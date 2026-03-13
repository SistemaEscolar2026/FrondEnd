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
  selector: 'app-busquedaproveedorlbl',
  templateUrl: './busquedaproveedorlbl.component.html',
  styleUrls: ['./busquedaproveedorlbl.component.scss'],
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
export class BusquedaProveedorlblComponent implements OnInit {
  /**
* DEFINICION DE VARIABLE ENTRADA PARA SELECCION MULTIPLE
*/
  @Input() set controlmultiple(datos: boolean) {
    this.multiple = datos;
    if (datos) {
      this.ColumnaDetalle = ['', 'Código', 'Descripción'];
    } else {
      this.ColumnaDetalle = ['Código', 'Descripción'];
    }
  }

  /**
* DEFINICION DE VARIABLE ENTRADA DE LISTADO DE CLIENTE
*/
  @Input() listadoproveedor: any[] = [];

  @Input() titulo: string = "";
  /**
* DEFINICION DE VARIABLE SALIDA DE CONFIRMACION DE CIERRE DE MODAL
*/
  @Output() confirmacionCierre = new EventEmitter<string>();

  /**
* DEFINICION DE VARIABLE SALIDA DE CONFIRMACION DE CIERRE DE MODAL ARRAY
*/
  @Output() cierreProveedorarray = new EventEmitter<any>();

  /**
* DEFINICION DE VARIABLE SALIDA DE CIERRE DE MODAL
*/
  @Output() cierreModal = new EventEmitter<boolean>();
  /**
* @ignore
*/
  multiple: boolean = false;
  /**
* DEFINICION DE VARIABLE PAGINACION DE GRID
*/
  public paginacion: number = 1;
  /**
* DEFINICION DE VARIABLE CON NOMBRE DE CAMPOS DE CABECERA DE PROVEEDOR
*/
  ColumnaDetalle: any[] = ['Código', 'Descripción'];
  /**
* DEFINICION DE VARIABLE CON DATOS DE PROVEEDOR
*/
  proveedores: any[] = [];
  /**
* DEFINICION DE VARIABLE SELECCION DE PROVEEDOR
*/
  selectedProveedor: any = [];

  label: string = "";
  /**
* DEFINICION DE VARIABLE PARA BUSQUEDAD
*/
  txtbusca: string = "";
  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private toastr: ToastrService) {
    this.cargaProveedor();
  }
  /**
* DEFINICION DE FUNCION INIT DE LA CLASE
*/
  ngOnInit() {
    this.proveedores = this.listadoproveedor;
    this.label = this.titulo;
  }
  /**
* DEFINICION DE FUNCION DE CARGA DE PROVEEDORES
*/
  cargaProveedor() {

    this.proveedores = this.listadoproveedor;
    this.limpiarColor();
  }
  /**
* DEFINICION DE FUNCION DE CERRAR MODAL CON CONFIRMACION
*/
  cerrar() {
    this.confirmacionCierre.emit(this.selectedProveedor.toString());
  }
  /**
* DEFINICION DE FUNCION DE CERRAR MODAL CON CONFIRMACION ARRAY
*/
  cerrararray() {
    this.cierreProveedorarray.emit(this.selectedProveedor);
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
    for (var i = 0; i < this.proveedores.length; i++) {
      this.proveedores[i].color = "";
    }
  }
  /**
* DEFINICION DE FUNCION PARA QUITAR ELEMENTO SELECCIONADOS
*/
  quitar() {
    this.proveedores.forEach((key: any) => {
      key.sel = false;
    });
    this.limpiarColor();
    this.selectedProveedor = [];
  }
  /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
  clickGrid(row: any) {
    this.limpiarColor();
    this.selectedProveedor = JSON.stringify(row);
    row.color = "FT";
  }
  /**
* DEFINICION DE FUNCION DE DOBLE CLICK EN LINEA DE GRID
*/
  dblclickGrid(row: any) {
    this.limpiarColor();
    row.color = "FT";
    this.selectedProveedor = JSON.stringify(row);
    if (this.multiple === false) {
      this.cerrar()
    }

  }
  /**
* DEFINICION DE FUNCION ACEPTAR
*/
  aceptar() {
    if (this.selectedProveedor === "" || this.selectedProveedor.length <= 0) {
      this.toastr.info("Debe seleccionar un Proveedor...", 'Busqueda Proveedor');
    } else {
      if (this.multiple === true) {
        this.selectedProveedor = this.proveedores.filter(function (data2) {
          return data2.sel === true
        });
        this.cerrararray();
      } else {
        this.cerrar();
      }

    }
  }
  /**
* DEFINICION DE FUNCION DE CANCELAR
*/
  cancelar() {
    this.cerrarmodal();
  }
}
