import { Component, EventEmitter,  Injector, Output } from '@angular/core';
import { Router } from '@angular/router';
import { globales, environment } from 'src/environments/environment';
import { MantenimientoService } from '@services/mantenimiento-service';
import { ServiceMensaje } from '@services/config/ServiceMensaje';
import { Funcion } from '@funciones/funciones';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  selector: 'app-busquedad',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent {
  /**
* DEFINICION DE VARIABLE SALIDA CONFIRMACION DE CIERRE
*/
  @Output() confirmacionCierre = new EventEmitter<boolean>();
  /**
* DEFINICION DE VARIABLE SALIDA CONFIRMACION CARGA
*/
  @Output() confirmacionCarga = new EventEmitter<boolean>();
   /**
* DEFINICION DE VARIABLE SELECCION DE OPCIONES MULTIPLE DE IMPORTACION
*/
  selectopt: string = "";
  /**
* DEFINICION DE VARIABLE LISTADO DE OPCIONES DE IMPORTACIONES
*/
  rbOpBus: any[] = [];

  /**
* DEFINICION DE VARIABLE  BUSQUEDA DE PRODUCTO
*/
  busProducto: string = "";
  /**
* DEFINICION DE VARIABLE  BUSQUEDA DE PRODUCTO IMPORTACION
*/
  busProductoimp: string = "";

  /**
* DEFINICION DE VARIABLE NOTIFICACION TIPO TOAS
*/
  toastr: any;
  /**
* DEFINICION DE VARIABLE PARA REPORTE
*/
  openReport: string = "";
  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(_router: Router, private mantenimientoService: MantenimientoService, private injector: Injector) {
    this.rbOpBus = Funcion.OrdenBusqueda();
    this.selectopt = "D";
    this.toastr = this.injector.get(ServiceMensaje);
  }
  /**
* DEFINICION DE FUNCION DE CARGA DE REPORTE
*/
  cargarReporte(dato:string) {
    let parametro = {
      cia: globales.cia,
      bus: dato
    };
    this.openReport = "Busqueda Productos|" + environment.reportServerMantenimientos + "BusquedaItems|" + JSON.stringify(parametro) + "|" + Funcion.Ramdon().toString();
  }
  /**
* DEFINICION DE FUNCION DE BUSQUEDA DE PRODUCTO
*/
  buscarProducto() {
    this.confirmacionCarga.emit(true);
    this.mantenimientoService.getBusProd(globales.cia, this.busProducto).subscribe(data => {
      try {
        if (data.length <= 0) {
          this.toastr.showSuccess("No existe información con los datos digitados...", 'Busqueda Productos');
        } else {
          this.cargarReporte(data[0].resultado);
        }
        this.confirmacionCarga.emit(false);
      } catch (e) {
        this.confirmacionCarga.emit(false);
      }
    }, () => {
      this.confirmacionCarga.emit(false);
    });
  }
  /**
* DEFINICION DE FUNCION DE BUSQUEDA DE PRODUCTO IMPORTACIONES
*/
  buscarProductoimp() {
    this.confirmacionCarga.emit(true);
    this.mantenimientoService.busqueda(globales.cia,this.selectopt, this.busProductoimp).subscribe(data => {
      try {
        if (data.length <= 0) {
          this.toastr.showSuccess("No existe importación con los datos digitados...", 'Busqueda Importaciones');
        } else {
          this.toastr.showSuccess("En construcción...", 'Busqueda Importaciones');
        }
        this.confirmacionCarga.emit(false);
      } catch (e) {
        this.confirmacionCarga.emit(false);
      }
    }, () => {
      this.confirmacionCarga.emit(false);
    });
  }
  /**
* DEFINICION DE FUNCION DE SELECCION DE COMPAÑIA
*/
  seleccionaCompania() {

  }
}
