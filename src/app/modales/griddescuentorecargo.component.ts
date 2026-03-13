import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input,  Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import * as moment from 'moment';


/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  standalone: true,
  selector: 'app-griddescuentorecargo',
  templateUrl: './griddescuentorecargo.component.html',
  styleUrls: ['./griddescuentorecargo.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    CommonModule
  ]
})
export class GridDescuentoRecargoComponent  {
  /**
* DEFINICION DE VARIABLE SALIDA CON LOS VALORES DE DESCUENTO Y RECARGO
*/
  @Output() valorFormaModelo = new EventEmitter<any[]>()
  /**
* DEFINICION DE VARIABLE ENTRADA LIMPIAR GRID DE DESCUENTO Y RECARGO
*/
  @Input() set limpiagriddescuentorecarga(datos: string) {
    this.detgridescuentorecarga = [];
  }
  /**
* DEFINICION DE VARIABLE ENTRADA CON LINEA NUEVA DE DESCUENTO Y RECARGO
*/
  @Input() set lineanueva(datos: any[]) {
    this.detgridescuentorecarga = [];
    this.agregarlineapaso(datos);
  }
  /**
* DEFINICION DE VARIABLE ENTRADA PARA ACTUALIZAR DE DESCUENTO Y RECARGO
*/
  @Input() set actualizadescuetorecargo(datos: any[]) {
    this.listdescuentorecargo = datos;
  }
  /**
* DEFINICION DE VARIABLE ENTRADA PARA HABILITAR DE DESCUENTO Y RECARGO
*/
  @Input() set habilitarformapago(datos: boolean) {
    this.habilitabotones = datos;
    this.detgridescuentorecarga = [];
  }
  /**
* DEFINICION DE VARIABLE CON NOMBRE DE CAMPOS DE CABECERA DE DESCUENTO Y RECARGO
*/
  ColumnaDetalledescuentorecargo: any[] = ['Lin.', 'Tipo D/R', 'Descuento / Recargo','Valor','Total'];
  /**
* DEFINICION DE VARIABLE PARA INFORMACION DE DETALLE DE DE DESCUENTO Y RECARGO DEL GRID
*/
  detgridescuentorecarga: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LISTADO DE DE DESCUENTO Y RECARGO DE CAMBIO
*/
  listdescuentorecargo: any[] = [];
  /**
* DEFINICION DE VARIABLE PARA HABILITAR CAMPOS DE DESCUENTO Y RECARGO
*/
  habilitabotones: boolean = true;

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor() {

  }

  /**
* DEFINICION DE FUNCION SELECCIONA DESCUENTO Y RECARGO
*/
  selectdescuentorecargo(row: any) {
    const filtro = this.listdescuentorecargo.filter(function (data: { fpcodigo: any; }) {
      return data.fpcodigo === row.forma
    });
    var fecha = new Date();
    var formatoFecha = moment(fecha);
    formatoFecha.add("day", filtro[0].fpintervalo);
    row.fechavencimiento = formatoFecha.format("YYYY-MM-DD").toString();
  }
  /**
* DEFINICION DE FUNCION AGREGAR LINEA DE DESCUENTO Y RECARGO VACIA
*/
  agregarlinea() {
    this.detgridescuentorecarga.push({
      linea: "",
      tipo: "",
      codigoS: "",
      valor: 0,
      total:0
    });
  }
  /**
* DEFINICION DE FUNCION AGREGAR LINEA DESCUENTORECARGA
*/
  agregarlineapaso(dato: any) {
    if (dato != null && dato.length>0) {
      this.detgridescuentorecarga.push({
        linea: dato[0].dcodrlinea,
        tipo: dato[0].drtipodesrec,
        codigoS: dato[0].drtipodesrec + dato[0].drcodigo,
        valor: dato[0].dcodrvalordesrec,
        total: dato[0].dcodrtotaldesrec
      });
    }
  }
}
