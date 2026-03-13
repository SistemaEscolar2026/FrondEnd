import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input,  Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MantenimientoService } from '@services/mantenimiento-service';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { globales } from 'src/environments/environment';
import { DetallePed } from '@modelo/detallePed-model';
import { ModalesComponent } from '@modales/modales.component';
import { Funcion } from '@funciones/funciones';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  standalone: true,
  selector: 'app-gridetalle',
  templateUrl: './griddetalle.component.html',
  styleUrls: ['./griddetalle.component.scss'],
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
    ModalesComponent
  ]
})

export class GridDetalleComponent  {
  /**
* DEFINICION DE VARIABLE SALIDA PARA BASE 0 O BASE IVA
*/
  @Output() basecerobaseiva = new EventEmitter<string>();
  /**
* DEFINICION DE VARIABLE SALIDA PARA BUSCAR PARA CARGA MODAL DE ITEM
*/
  @Output() buscaritem = new EventEmitter<string>();
  /**
* DEFINICION DE VARIABLE SALIDA PARA DEVOLVER PRODUCTO CONTROLADO
*/
  @Output() devuelvecontrolpro = new EventEmitter<any[]>();
  /**
* DEFINICION DE VARIABLE SALIDA PARA DEVOLVER MODELO DE DETALLE DE PEDIDO
*/
  @Output() valorDetalleModelo = new EventEmitter<any[]>();
  /**
* DEFINICION DE VARIABLE ENTRADA PARA PRODUCTO CONTROLADO
*/
  @Input() set prodControl(datos: string) {
    if (JSON.parse(datos.split('|')[0])) {
      this.productocontrol();
    }
  }
  /**
* DEFINICION DE VARIABLE ENTRADA DE EXENTO IVA
*/
  @Input() set iCliExento(datos: string) {
    this.iCliExentodato = datos
  }
  /**
* DEFINICION DE VARIABLE ENTRADA DE VALOR DE IVA
*/
  @Input() set valorIva(datos: number) {
    this.valoriva = datos
    this.calcularGlobal();
  }
  /**
* DEFINICION DE VARIABLE ENTRADA PRECIO
*/
  @Input() set valorPrecio(datos: string) {
    this.valorprecio = datos
  }
  /**
* DEFINICION DE VARIABLE ENTRADA PARA LIMPIAR GRID DETALLE DE PEDIDO
*/
  @Input() set limpiagrid(datos: string) {
    if ((datos.split('|')[0].toString() === "true") ? true : false) {
      this.detgrid = [];
      this.basecerobaseiva.emit( "0|0|0");
    }
  }
  /**
* DEFINICION DE VARIABLE ENTRADA PARA HABILITAR CAMPO DETALLE DE PEDIDO
*/
  @Input() set habilitar(datos: string) {
    this.habilitabotones = (datos.split('|')[0].toString() === "true") ? true:false;
  }
  /**
* DEFINICION DE VARIABLE ENTRADA PARA INGRESO DE ITEM SELECCIONADO
*/
  @Input() set pasoitem(datos: any) {
    var datafiltro = this.detgrid.filter(function (data2) {
      return data2.bocodigo === datos.bo_codigo && data2.itcodigo===datos.it_codigo;
    });
    if (datafiltro.length > 0) {
      this.llamarmodal = "1|Ingreso de Pedidos de Ventas|No puede ingresar el ítem en la misma bodega ya seleccionada. Favor Verifique...|" + Funcion.Ramdon.toString();
    } else if (parseFloat(datos.saldo)<=0) {
      this.llamarmodal = "1|Ingreso de Pedidos de Ventas|No puede seleccionar ítem con saldo disponible menor o igual a cero. Favor Verifique...|" + Funcion.Ramdon.toString();
    } else {
      this.actualizalinea(datos, -1);
    }
  }
  /**
* DEFINICION DE VARIABLE ENTRADA PARA CARGA DE DETALLE PEDIDO 
*/
  @Input() set cargaitemes(datos: any[]) {
    if (datos.length > 0) {
      this.detgrid = datos;
      this.detgrid.forEach((key: any) => {
        key.depiva = (key.depiva === "S") ? true : false;
      });
      this.calcularGlobal()
    }
  }
  /**
* DEFINICION DE VARIABLE CON DATOS DE MODAL
*/
  llamarmodal: string = "";
  /**
* DEFINICION DE VARIABLE CON VALOR DE PRECIO
*/
  valorprecio: string = "";
  /**
* DEFINICION DE VARIABLE CON VALOR DE IVA
*/
  valoriva: number = 0;
  /**
* DEFINICION DE VARIABLE CON DATO DE EXENTO IVA
*/
  iCliExentodato: string = "";
  /**
* DEFINICION DE VARIABLE CON FILA SELECCIONADA DEL GRID DE DETALLE DE PEDIDO
*/
  selectedlineagrid: string = "";
  /**
* DEFINICION DE VARIABLE CON DATOS DE DETALLE DE PEDIDO
*/
  detgrid: any[] = [];
  /**
* DEFINICION DE VARIABLE CON NOMBRE DE COLUMNA DE CABECERA DE DETALLE DE PEDIDO
*/
  ColumnaDetalle: any[] = ['Bodega', 'Medida', '', 'Cantidad', 'Precio', 'Total', 'IVA', 'Valor IVA'];
  /**
* DEFINICION DE VARIABLE QUE PERMITE HABILITAR CAMPOS DE DETALLE DE PEDIDO
*/
  habilitabotones: boolean = false;
  

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private mantenimientoService: MantenimientoService) {

  }
  /**
* DEFINICION DE FUNCION QUE LLAMA AL MODAL DE BUQUEDA DE ITEMS
*/
  buscaritems(row: any) {
    if (!this.habilitabotones) {
      if (row === "0")
        this.buscaritem.emit("0");
      else
        this.buscaritem.emit(row);
    }
  }
  /**
* DEFINICION DE FUNCION QUE BUSCA LA UNIDAD DE MEDIDA
*/
  buscarmedida(row: any) {

  }
  /**
* DEFINICION DE FUNCION QUE REALZIA CALCULO DEL GRID DETALLE DE PEDIDO
*/
  calculo(row: any) {
    this.calculoivadet(row);
  }
  /**
* DEFINICION DE FUNCION QUE REALIZAR CALCULI LINEA A LINEA DE IMPUESTO
*/
  calculoivadet(row: any) {
    row.total = (row.depcantmedalter * row.deppreciomedalter).toFixed(4);
    if (row.depiva) {
      row.depivalin = ((row.total * this.valoriva) / 100).toFixed(4);
    } else {
      row.depivalin = (0.0000).toFixed(4);
    }
    this.datosBaseCeroBaseIva();
    this.valorDetalleModelo.emit(this.detgrid);
  }
  /**
* DEFINICION DE FUNCION QUE REALIZA CALCULO GOBAL DE IMPUESTO
*/
  calcularGlobal() {
    for (var i = 0; i < this.detgrid.length; i++) {
      this.detgrid[i].depporiva = this.valoriva;
      this.calculoivadet(this.detgrid[i]);
    }
  }
  /**
* DEFINICION DE FUNCION DONDE CARGA LA INFORMACION DE BASE 0 O BASE IVA
*/
  datosBaseCeroBaseIva() {
    let _base0 = 0;
    let _baseiva = 0;
    let _valoriva = 0;
    for (var i = 0; i < this.detgrid.length; i++) {
      if (this.detgrid[i].depiva) {
        _baseiva = _baseiva + parseFloat(this.detgrid[i].total);
      } else {
        _base0 = _base0 + parseFloat(this.detgrid[i].total);
      }
      _valoriva = _valoriva + parseFloat(this.detgrid[i].depivalin);
    }
    this.basecerobaseiva.emit(_base0.toString() + "|" + _baseiva.toString() + "|" + _valoriva.toString());
  }

  /**
* DEFINICION DE FUNCION DE LIMPIAR COLOR
*/
  limpiarColor() {
    for (var i = 0; i < this.detgrid.length; i++) {
      this.detgrid[i].color = "";
    }
  }
  /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
  clickGrid(row: any) {
    this.limpiarColor();
    this.selectedlineagrid = row.deplinea
    row.color = "SG";
  }
  /**
* DEFINICION DE FUNCION DE DOBLE CLICK EN LINEA DE GRID
*/
  dblclickGrid(row: any) {
    this.limpiarColor();
    row.color = "SG";
    this.selectedlineagrid = row.deplinea;
  }
  /**
* DEFINICION DE FUNCION DE PASO DE INFORMACION AL GRID DE DETALLE DE PEDIDO
*/
  pasodatoGrid(row: any, data: any, fila: number) {
    this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].itcodigo = data.itcodigo;
    this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].itdescripcion = data.itdescripcion;
    if (data.itemsprecio.length > 0) {
      let _tmp = data.itemsprecio.find((x: { lpcodigo: string; }) => x.lpcodigo == this.valorprecio)
      if (_tmp.ipprecio != null) {
        if (_tmp.ipprecio > 0) {
          this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].deppreciomedalter = (_tmp.ipprecio).toFixed(4);
          this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].deppreclista = (_tmp.ipprecio).toFixed(4);
        } else {
          if (_tmp.ipprecio.ippreciopreasignado != null) {
            this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].deppreciomedalter = (_tmp.ipprecio.ippreciopreasignado).toFixed(4);
            this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].deppreclista = (_tmp.ipprecio.ippreciopreasignado).toFixed(4);
          }
          else {
            this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].deppreciomedalter = (0).toFixed(4);
            this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].deppreclista = (0).toFixed(4);
          }
        }
      } else {
        if (_tmp.ipprecio.ippreciopreasignado != null) {
          this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].deppreciomedalter = (_tmp.ipprecio.ippreciopreasignado).toFixed(4);
          this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].deppreclista = (_tmp.ipprecio.ippreciopreasignado).toFixed(4);
        }
        else {
          this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].deppreciomedalter = (0).toFixed(4);
          this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].deppreclista = (0).toFixed(4);
        }
      }
    } else {
      this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].deppreciomedalter = (0).toFixed(4);
      this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].deppreclista = (0).toFixed(4);
    }


    this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].itexento = data.itexento;
    this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].itpermitepreciocerovta = data.itpermitepreciocerovta;
    this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].clexento = this.iCliExentodato;
    this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].bocodigo = row.bo_codigo;
    this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].bocodigodes = row.bo_nombre;

    let _tmp = data.itemsmedida.find((x: { immedidabase: string; }) => x.immedidabase == "S")
    this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].mecodigo = _tmp.mecodigo;
    this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].medida = _tmp.menombre;
    this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].depfactor = _tmp.imfactor;

    this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].depcantmedalter = (0.0000).toFixed(4);
    this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].depiva = (data.itexento === "S" || this.iCliExentodato === "S") ? false : true;
    this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].depivalin = (0.0000).toFixed(4);
    this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].control = row.control;
    this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].prccodigo = row.prc_codigo;
    this.detgrid[(fila === -1) ? this.detgrid.length - 1 : fila].pfacodigo = row.pfa_codigo;
  }
  /**
* DEFINICION DE FUNCION QUE ACTUALIZA INFORMACION EN UNA LINEA DE DETALLE DE PEDIDO
*/
  actualizalinea(row: any, fila: number) {
    this.mantenimientoService.getItems(globales.cia, row.it_codigo).subscribe(data => {
      try {
        if (data != null) {
          this.pasodatoGrid(row, data, fila)
          this.calcularGlobal()
        }
      } catch (e) {
      }
    }, () => {
    });
  }
  /**
* DEFINICION DE FUNCION QUE AGREGA UNA LINEA EN DETALLE DE PEDIDO
*/
  agregarlinea() {
    var linea = new DetallePed();
    linea.deplinea = this.detgrid.length + 1;
    this.detgrid.push(linea);
    this.buscaritems("0");
    this.selectedlineagrid = "";
  }
  /**
* DEFINICION DE FUNCION QUE BORRA UNA LINEA EN EL DETALLE DE PEDIDO
*/
  borrarlinea() {
    for (var i = 0; i < this.detgrid.length; i++) {
      if (this.detgrid[i].deplinea === this.selectedlineagrid) {
        this.detgrid.splice(i, 1);
        this.selectedlineagrid = "";
        break;
      }
    }
    this.datosBaseCeroBaseIva();
    this.valorDetalleModelo.emit(this.detgrid);
  }
  /**
* DEFINICION DE FUNCION DE PRODUCTO CONTROLADOS
*/
  productocontrol() {
    var datafiltro = this.detgrid.filter(function (data2) {
      return data2.control >= 1;
    });
    this.devuelvecontrolpro.emit(datafiltro);
  }

}
