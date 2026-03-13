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
import { Funcion } from '@funciones/funciones';
/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    standalone: true,
    selector: 'app-busquedatiposeguro',
    templateUrl: './busquedatiposeguro.component.html',
    styleUrls: ['./busquedatiposeguro.component.scss'],
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
export class BusquedaTipoSeguroComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE ENTRADA DE LISTADO DE CLIENTE
  */
    @Input() listadotiposeguro: any[] = [];
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
  * DEFINICION DE VARIABLE CON NOMBRE DE CAMPOS DE CABECERA DE FORMA PAGO
  */
    ColumnaDetalle: any[] = ['Codigo', 'Descripcion'];
    /**
  * DEFINICION DE VARIABLE CON DATOS DE CLIENTE
  */
    formatiposeguro: any[] = [];
    /**
  * DEFINICION DE VARIABLE SELECCION DE CLIENTE
  */
    selectedTiposeguro: any = [];
    /**
  * DEFINICION DE VARIABLE PARA BUSQUEDAD
  */
    txtbusca: string = "";
    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(private toastr: ToastrService) {
        this.cargaFormaTipoSeguro();
       
    }
    /**
  * DEFINICION DE FUNCION INIT DE LA CLASE
  */
    ngOnInit() {
        this.formatiposeguro = this.listadotiposeguro;
    }
    /**
  * DEFINICION DE FUNCION DE CARGA DE COMISION
  */
    cargaFormaTipoSeguro() {

        this.formatiposeguro = this.listadotiposeguro;
        this.limpiarColor();
    }

    /**
  * DEFINICION DE FUNCION DE CERRAR MODAL CON CONFIRMACION
  */
    cerrar() {
        this.confirmacionCierre.emit(this.selectedTiposeguro.toString());
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
        for (var i = 0; i < this.formatiposeguro.length; i++) {
            this.formatiposeguro[i].color = "";
        }
    }
    /**
  * DEFINICION DE FUNCION DE SELECCIONAR CLIENTE
  */
    seleccionaComision() {
        this.cerrar();
    }
    /**
  * DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
  */
    clickGrid(row: any) {
        this.limpiarColor();
        this.selectedTiposeguro = JSON.stringify(row)
        row.color = "FT";
    }
    /**
  * DEFINICION DE FUNCION DE DOBLE CLICK EN LINEA DE GRID
  */
    dblclickGrid(row: any) {
        this.limpiarColor();
        row.color = "FT";
        this.selectedTiposeguro = JSON.stringify(row);
        this.cerrar()
    }
    /**
  * DEFINICION DE FUNCION ACEPTAR
  */
    aceptar() {
        if (this.selectedTiposeguro === "") {
            this.toastr.info("Debe seleccionar un Tipo Seguro...", 'Busqueda Tipo Seguro');
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
