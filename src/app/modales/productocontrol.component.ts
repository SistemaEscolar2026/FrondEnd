import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { GrdFilterPipe } from '../pipe/filterGrid';
import { ModalesComponent } from '@modales/modales.component';
import { Funcion } from '@funciones/funciones';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  standalone: true,
  selector: 'app-productocontrol',
  templateUrl: './productocontrol.component.html',
  styleUrls: ['./productocontrol.component.scss'],
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
    ModalesComponent
  ]

})
export class ProductoControlComponent implements OnInit {
  /**
* DEFINICION DE VARIABLE ENTRADA CON LISTADO DE PRODUCTO CONTROLADOS
*/
  @Input() listadoControl: any[] = [];
  /**
* DEFINICION DE VARIABLE PARA HABILITAR CAMPOS
*/
  @Input() set habilitar(datos: boolean) {
    this.habilitabotones = datos;
  }
  /**
* DEFINICION DE VARIABLE SALIDA PARA RETORNAR INFORMACION DE MODAL
*/
  @Output() retornoGrid = new EventEmitter<any[]>();
  /**
* DEFINICION DE VARIABLE SALIDA PARA CERRAR MODAL
*/
  @Output() cierreModal = new EventEmitter<boolean>();

  /**
* DEFINICION DE VARIABLE PARA HABILITAR CAMPOS
*/
  habilitabotones: boolean = false;
  /**
* DEFINICION DE VARIABLE PARA ABRIR MODAL
*/
  llamarmodal: string = "";
  /**
* DEFINICION DE VARIABLE CON NOMBRE DE CAMPOS CABECERA DE GRID
*/
  ColumnaDetalle: any[] = ['Sel.', 'Certificado', 'Número', 'Cupo', 'Cantidad'];
  /**
* DEFINICION DE VARIABLE CON INFORMACION DE PRODUCTO CONTROLADOS
*/
  listacontrol: any[] = [];
  /**
* DEFINICION DE FUNCION INIT DE LA CLASE
*/
  ngOnInit() {
    this.listacontrol = this.listadoControl;
    this.limpiarColor();

  }


  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor() {
  }

  /**
* DEFINICION DE FUNCION DE CERRAR MODALES
*/
  cerrarmodal() {
    this.cierreModal.emit(true);
  }

  /**
* DEFINICION DE FUNCION DE LIMPIAR COLOR
*/
  limpiarColor() {
    for (var i = 0; i < this.listacontrol.length; i++) {
      for (var j = 0; j < this.listacontrol[i].items.length; j++) {
        this.listacontrol[i].items[j].color = "";
      }
    }
  }
  /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
  clickGrid(row: any) {
    this.limpiarColor();
    row.color = "SG";
  }
  /**
* DEFINICION DE FUNCION DE DOBLE CLICK EN LINEA DE GRID
*/
  dblclickGrid(row: any) {
    this.limpiarColor();
    row.color = "SG";
  }
  /**
* DEFINICION DE FUNCION ACEPTAR 
*/
  aceptar() {
    if (this.validarControl()) {
      this.retornoGrid.emit(this.listacontrol);
    }
  }
  /**
* DEFINICION DE FUNCION DE CALCULO DE TOTALES
*/
  sumtotales(row: any[], ban: number) {
    let total = 0;
    if (ban === 1) {
      total = row.reduce((prev, next) => prev + next.cupo, 0);
    } else if (ban === 2) {
      total = row.reduce((prev, next) => prev + next.cantidad, 0);
    }
    return total;
  }

  /**
* DEFINICION DE FUNCION PARA HABILITAR CAMPO DE CANTIDAD
*/
  habilitarcantitdad(row: any, productocantidad: number) {
    row.cantidad = parseFloat((row.sel) ? ((productocantidad > row.cupo) ? row.cupo : productocantidad) : 0).toFixed(4);
  }

  /**
* DEFINICION DE FUNCION DE VALIDAR INFORMACION DE PRODUCTO CONTROLADOS
*/
  validarControl() {
    const random = Funcion.Ramdon();
    let rotorno = true;
    for (var i = 0; i < this.listacontrol.length; i++) {
      for (var j = 0; j < this.listacontrol[i].items.length; j++) {
        if (this.listacontrol[i].items[j].sel) {
          if (parseFloat(this.listacontrol[i].items[j].cantidad) < parseFloat(this.listacontrol[i].productocantidad)) {
            this.llamarmodal = "1|Ingreso de Pedidos de Ventas|Las cantidades ingresadas no son iguales a las solicitadas en el " + this.listacontrol[i].producto + " Favor verifique...|" + random.toString();
            rotorno = false;
            break;
          }
        } else {
          this.llamarmodal = "1|Ingreso de Pedidos de Ventas|	Debe seleccionar un certificado para cada producto controlado. Favor verifique...|" + Funcion.Ramdon().toString();
          rotorno = false;
          break;
        }

      }
    }
    return rotorno;
  }
  /**
* DEFINICION DE FUNCION DE CANCELAR
*/
  cancelar() {
    this.cerrarmodal();
  }
}
