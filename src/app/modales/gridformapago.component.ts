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
  selector: 'app-gridformapago',
  templateUrl: './gridformapago.component.html',
  styleUrls: ['./gridformapago.component.scss'],
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
export class GridDetalleFormaPagoComponent  {
  /**
* DEFINICION DE VARIABLE SALIDA CON LOS VALORES DE FORMA DE PAGO
*/
  @Output() valorFormaModelo = new EventEmitter<any[]>()
  /**
* DEFINICION DE VARIABLE ENTRADA LIMPIAR GRID FORMA DE PAGO
*/
  @Input() set limpiagridforma(datos: string) {
    this.detgriformapago = [];
  }
  /**
* DEFINICION DE VARIABLE ENTRADA PARA CARGA ITEM DE FORMA DE PAGO
*/
  @Input() set cargaitemespago(datos: any[]) {
    if (datos.length > 0) {
      datos.forEach((key: any) => {
        this.detgriformapago.push({
          fpago: key.fpcodigo,
          pago: key.dpftotalapagar,
          vencimiento: key.dpffecvenc,
          porcPrecio: key.dpfporcprecio
        });
      });
    }
  }
  /**
* DEFINICION DE VARIABLE ENTRADA CON VALORES BASE 0 O BASE IVA PARA FORMA DE PAGO
*/
  @Input() set basecerobaseivatotalforma(datos: string) {
    if (datos!="") {
      let _base0 = parseFloat(datos.split('|')[0].toString());
      let _baseiva = parseFloat(datos.split('|')[1].toString());
      let _iva = parseFloat(datos.split('|')[2].toString());
      if (this.detgriformapago.length>0) {
        this.detgriformapago[this.detgriformapago.length - 1].pago = _base0 + _baseiva + _iva;
        this.valorFormaModelo.emit(this.detgriformapago);
      }
    }
  }
  /**
* DEFINICION DE VARIABLE ENTRADA CON LINEA NUEVA DE FORMA DE PAGO
*/
  @Input() set lineanueva(datos: any[]) {
    this.detgriformapago = [];
    this.agregarlineapaso(datos);
  }
  /**
* DEFINICION DE VARIABLE ENTRADA PARA ACTUALIZAR FORMA DE PAGO
*/
  @Input() set actualizaformapago(datos: any[]) {
    this.listformapago = datos;
  }
  /**
* DEFINICION DE VARIABLE ENTRADA PARA HABILITAR FORMA DE PAGO
*/
  @Input() set habilitarformapago(datos: boolean) {
    this.habilitabotones = datos;
    this.detgriformapago = [];
  }
  /**
* DEFINICION DE VARIABLE CON NOMBRE DE CAMPOS DE CABECERA FORMA DE PAGO
*/
  ColumnaDetalleformapago: any[] = ['Forma de Pago', 'Pago', 'Vencimiento'];
  /**
* DEFINICION DE VARIABLE PARA INFORMACION DE DETALLE DE FORMA DE PAGO DEL GRID
*/
  detgriformapago: any[] = [];
  /**
* DEFINICION DE VARIABLE CON LISTADO DE FORMA DE PAGO DE CAMBO 
*/
  listformapago: any[] = [];
  /**
* DEFINICION DE VARIABLE PARA HABILITAR CAMPOS DE FORMA DE PAGO
*/
  habilitabotones: boolean = true;

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor() {

  }

  /**
* DEFINICION DE FUNCION SELECCIONA FORMA DE PAGO
*/
  selectformapago(row: any) {
    const filtro = this.listformapago.filter(function (data: { fpcodigo: any; }) {
      return data.fpcodigo === row.forma
    });
    var fecha = new Date();
    var formatoFecha = moment(fecha);
    formatoFecha.add("day", filtro[0].fpintervalo);
    row.fechavencimiento = formatoFecha.format("YYYY-MM-DD").toString();
  }
  /**
* DEFINICION DE FUNCION AGREGAR LINEA PAGO VACIA
*/
  agregarlinea() {
    this.detgriformapago.push({
      fpago: "",
      pago: 0,
      vencimiento: "",
      porcPrecio: 0
    });
  }
  /**
* DEFINICION DE FUNCION AGREGAR LINEA PAGO
*/
  agregarlineapaso(dato: any) {
    if (dato != null && dato.length>0) {
      this.detgriformapago.push({
        fpago: dato[0].fpago,
        pago: dato[0].pago,
        vencimiento: dato[0].vencimiento,
        porcPrecio: dato[0].porcPrecio
      });
    }
  }
}
