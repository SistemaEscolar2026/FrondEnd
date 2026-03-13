import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GrdFilterPipe } from '../pipe/filterGrid';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { CommonModule } from '@angular/common';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal'
import { BusquedaProveedorComponent } from '@modales/busquedaproveedor.component';
import { BusquedaEntidadComponent } from '@modales/busquedaentidad.component';
import { BusquedaItemComponent } from '@modales/busquedaitem.component';
import { BusquedaAsientoContableComponent } from '@modales/busquedaasientocontable.component';
import { BusquedaInterfazContableComponent } from '@modales/busquedainterfazcontable.component';
import { BusquedaPlanCuentaComponent } from '@modales/busquedaplancuenta.component';
import { GridDetalleComponent } from '@modales/griddetalle.component';
import { GridDetalleFormaPagoComponent } from '@modales/gridformapago.component';
import { BusquedaTransportistaComponent } from '@modales/busquedatransportista.component';
import { ProductoControlComponent } from '@modales/productocontrol.component';
import { ModalesComponent } from '@modales/modales.component';
import { ReportComponent } from '@modales/report.component';
import { OrdenCompraComponent } from '@modales/ordencompra.component';
import { ContabilidadRoutingModule } from './contabilidad-routing.module';
import { AsientoContableComponent } from '../contabilidad/asientocontable.component';
import { InterfazContableComponent } from '../contabilidad/interfazcontable.component';
import { ProcesoContabilizacionComponent } from '../contabilidad/procesocontabilizacion.component';
import { CierreModuloComponent } from '../contabilidad/cierremodulo.component';
import { ReversoModuloComponent } from '../contabilidad/reversomodulo.component';
import { AsientoAperturaComponent } from '../contabilidad/asientoapertura.component';


@NgModule({
    declarations: [
        AsientoContableComponent,
        InterfazContableComponent,
        ProcesoContabilizacionComponent,
        CierreModuloComponent,
        ReversoModuloComponent,
        AsientoAperturaComponent
    ],
    imports: [
        GrdFilterPipe,
        NgSelect2Module,
        GridDetalleFormaPagoComponent,
        GridDetalleComponent,
        BusquedaAsientoContableComponent,
        BusquedaInterfazContableComponent,
        ModalesComponent,
        ReportComponent,
        OrdenCompraComponent,
        BusquedaTransportistaComponent,
        BusquedaItemComponent,
        ProductoControlComponent,
        BusquedaPlanCuentaComponent,
        BusquedaEntidadComponent,
        BusquedaProveedorComponent,
        MatButtonModule,
        MatExpansionModule,
        MatSidenavModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        ModalModule.forRoot(),
        CommonModule,
        FormsModule,
        ModalModule,
        ReactiveFormsModule,
        ContabilidadRoutingModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        BsModalRef
    ],
})
export class ContabilidadModule {
}
