import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TotalModel } from '@modelo/total-model';
import { MantenimientoService } from '@services/mantenimiento-service';
import { globales } from 'src/environments/environment';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  standalone: true,
  selector: 'app-totales',
  templateUrl: './totales.component.html',
  styleUrls: ['./totales.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class TotalesComponent {
  /**
* DEFINICION DE VARIABLE SALIDA VALORIVA
*/
  @Output() valorIvan = new EventEmitter<number>();
  /**
* DEFINICION DE VARIABLE SALIDA MODELO TOTAL
*/
  @Output() valorTotalModelo = new EventEmitter<TotalModel>();
  /**
* DEFINICION DE VARIABLE ENTRADA VALOR BASE CERO O BASE IVA
*/
  @Input() set basecerobaseivatotaltotales(datos: string) {
    if (datos === "") {
      this.calcularTotales(parseFloat("0"), parseFloat("0"));
    } else {
      this.calcularTotales(parseFloat(datos.split('|')[0]), parseFloat(datos.split('|')[1]));
    }
  }
  /**
* DEFINICION DE VARIABLE ENTRADA PARA HABILITAR FROM
*/
  @Input() set habilitar(datos: boolean) {
    this.habilitacombo = datos;
    this.limpiar();
  }
  /**
* DEFINICION DE VARIABLE PARA LIMPIAR TOTALES
*/
  @Input() set limpiartotales(datos: string) {
    this.limpiar();
  }
  /**
* DEFINICION DE VARIABLE ENTRADA PARA COD IMPUESTO
*/
  @Input() set impuesto(datos: string) {
    this.totalmodel.opcionimp1 = datos.split('|')[0];
    this.totalmodel.opcionimp2 = datos.split('|')[1];
    this.totalmodel.opcionimp3 = datos.split('|')[2];
    var _dtos = this.listaimpuesto.filter(function (data2) {
      return data2.imcodigo === datos.split('|')[0];
    });
    _dtos.forEach((key: any) => {
      this.valorIvan.emit(key.imporc);
    });
    this.selectopcion();
  }
  /**
* DEFINICION DE MODELO TOTAL
*/
  totalmodel: TotalModel = new TotalModel();
  /**
* DEFINICION DE VARIABLE PARA HABILITAR CAMPOS
*/
  habilitacombo: boolean = true;
  /**
* DEFINICION DE VARIABLE LISTADO DE IMPUESTOS
*/
  listaimpuesto: any[] = [];
  /**
* DEFINICION DE VARIABLE PARA EFECTO DE LOADING
*/
  loading = false;

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(_router: Router, private mantenimientoService: MantenimientoService) {
    const _dato = sessionStorage.getItem("variablecontrol");
    if (_dato) {
      if (_dato.toString() === "S") {
        this.cargarImpuesto();
      }
    }
  }
  /**
* DEFINICION DE FUNCION PARA LIMPIAR CAMPOS
*/
  limpiar() {
    this.totalmodel.opcionimp2 = "";
    this.totalmodel.opcionimp3 = "";
    this.totalmodel.subtotal = (0).toFixed(2);
    this.totalmodel.subtotaldescuento = (0).toFixed(2);
    this.totalmodel.subtotalrecargos = (0).toFixed(2);
    this.totalmodel.subtotalexento = (0).toFixed(2);
    this.totalmodel.subtotaliva = (0).toFixed(2);
    this.totalmodel.iva1 = (0).toFixed(2);
    this.totalmodel.iva2 = (0).toFixed(2);
    this.totalmodel.iva3 = (0).toFixed(2);
    this.totalmodel.total = (0).toFixed(2);
  }
  /**
* DEFINICION DE FUNCION PARA CALCULAR TOTALES CON PARAMETROS
*/
  caculavalores(base0: number, baseiva: number) {
    this.totalmodel.subtotal = (base0 + baseiva).toFixed(2);
    this.totalmodel.subtotalexento = (base0).toFixed(2);
    this.totalmodel.subtotaliva = (baseiva).toFixed(2);
    var valoriva = this.retornoPor(1);
    this.totalmodel.poriva1 = valoriva.toString();
    this.totalmodel.iva1 = ((parseFloat(this.totalmodel.subtotaliva) * valoriva) / 100).toFixed(2);
    this.totalmodel.total = (base0 + baseiva + parseFloat(this.totalmodel.iva1)).toFixed(2);

    this.valorTotalModelo.emit(this.totalmodel);
  }
  /**
* DEFINICION DE FUNCION PARA CALCULAR TOTALES
*/
  calcularTotales(base0: number, baseiva: number) {
     if (this.listaimpuesto.length > 0) {
      this.caculavalores(base0, baseiva);
    } else {
      this.cargarImpuesto2(base0, baseiva);
    }
  }
  /**
* DEFINICION DE FUNCION PARA CARGA DE IMPUESTOS 2
*/
  cargarImpuesto2(base0: number, baseiva: number) {
    this.loading = true;
    this.mantenimientoService.getImpuesto(globales.cia).subscribe(data => {
      try {
        this.listaimpuesto = [
          {
            imcodigo: '',
            imnombre: '',
            ciacodigo: '',
            imcodelectsri: null,
            imcodimpsri: '',
            imporc: 0,
            imtipovalporc: '',
            imvalor: 0,
            imvigente: ''
          }
        ];


        data.forEach((key: any) => {
          this.listaimpuesto.push({
            imcodigo: key.imcodigo,
            imnombre: key.imnombre,
            ciacodigo: key.ciacodigo,
            imcodelectsri: key.imcodelectsri,
            imcodimpsri: key.imcodimpsri,
            imporc: key.imporc,
            imtipovalporc: key.imtipovalporc,
            imvalor: key.imvalor,
            imvigente: key.imvigente
          });
        });

        this.caculavalores(base0, baseiva);
        this.selectopcion();
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    }, () => {
      this.loading = false;
    });
  }
  /**
* DEFINICION DE FUNCION PARA CARGA DE IMPUESTOS
*/
  cargarImpuesto() {
    this.loading = true;
    this.mantenimientoService.getImpuesto(globales.cia).subscribe(data => {
      try {
        this.listaimpuesto = [
          {
            imcodigo: '',
            imnombre: '',
            ciacodigo: '',
            imcodelectsri: null,
            imcodimpsri: '',
            imporc: 0,
            imtipovalporc: '',
            imvalor: 0,
            imvigente: ''
          }
        ];


        data.forEach((key: any) => {
          this.listaimpuesto.push({
            imcodigo: key.imcodigo,
            imnombre: key.imnombre,
            ciacodigo: key.ciacodigo,
            imcodelectsri: key.imcodelectsri,
            imcodimpsri: key.imcodimpsri,
            imporc: key.imporc,
            imtipovalporc: key.imtipovalporc,
            imvalor: key.imvalor,
            imvigente: key.imvigente
          });
        });


        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    }, () => {
      this.loading = false;
    });
  }

  /**
* DEFINICION DE FUNCION SELECCION DE IMPUESTO DE COMBO
*/
  selectopcion() {
    var datos = this.totalmodel.opcionimp1;
    var _dtos = this.listaimpuesto.filter(function (data2) {
      return data2.imcodigo === datos;
    });
    _dtos.forEach((key: any) => {
      this.valorIvan.emit(key.imporc);
    });
  }
  /**
* DEFINICION DE FUNCION PARA RETORNAR EL VALOR IVA
*/
  retornoPor(op: number) {
    var datos = "";
    var _dtos: any[] = [];
    switch (op) {
      case 1:
        datos = this.totalmodel.opcionimp1;
        _dtos = this.listaimpuesto.filter(function (data2) {
          return data2.imcodigo === datos;
        });
        break;
      case 2:
        datos = this.totalmodel.opcionimp2;
        _dtos = this.listaimpuesto.filter(function (data2) {
          return data2.imcodigo2 === datos;
        });
        break;
      case 3:
        datos = this.totalmodel.opcionimp3;
        _dtos = this.listaimpuesto.filter(function (data2) {
          return data2.imcodigo3 === datos;
        });
        break;
    }
    var _retorno = 0;
    _dtos.forEach((key: any) => {
      _retorno = key.imporc
    });
    return _retorno;
  }
}
