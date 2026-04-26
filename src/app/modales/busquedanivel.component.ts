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
    selector: 'app-busquedanivel',
    templateUrl: './busquedanivel.component.html',
    styleUrls: ['./busquedanivel.component.scss'],
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
export class BusquedaNivelComponent implements OnInit {
    /**
  * DEFINICION DE VARIABLE ENTRADA DE LISTADO DE CLIENTE
  */
    @Input() listadonivel: any[] = [];
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
    formanivel: any[] = [];
    /**
  * DEFINICION DE VARIABLE SELECCION DE CLIENTE
  */
    selectedComision: any = [];
    /**
  * DEFINICION DE VARIABLE PARA BUSQUEDAD
  */
    txtbusca: string = "";
    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(private toastr: ToastrService) {
        this.cargaFormaPais();
       
    }
    /**
  * DEFINICION DE FUNCION INIT DE LA CLASE
  */
    ngOnInit() {
        this.formanivel = this.listadonivel;
    }
    /**
  * DEFINICION DE FUNCION DE CARGA DE COMISION
  */
    cargaFormaPais() {

        this.formanivel = this.listadonivel;
        this.limpiarColor();
    }

    /**
  * DEFINICION DE FUNCION DE CERRAR MODAL CON CONFIRMACION
  */
    cerrar() {
        this.confirmacionCierre.emit(this.selectedComision.toString());
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
        for (var i = 0; i < this.formanivel.length; i++) {
            this.formanivel[i].color = "";
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
        this.selectedComision = JSON.stringify(row)
        row.color = "FT";
    }
    /**
  * DEFINICION DE FUNCION DE DOBLE CLICK EN LINEA DE GRID
  */
    dblclickGrid(row: any) {
        this.limpiarColor();
        row.color = "FT";
        this.selectedComision = JSON.stringify(row);
        this.cerrar()
    }
    /**
  * DEFINICION DE FUNCION ACEPTAR
  */
    aceptar() {
        if (this.selectedComision === "") {
            this.toastr.info("Debe seleccionar un Nivel...", 'Busqueda Nivel');
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
