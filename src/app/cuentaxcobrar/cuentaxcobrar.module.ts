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
import { NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';
import { NgSelect2Module } from 'ng-select2';
import { CommonModule } from '@angular/common';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal'
import { BusquedaProveedorComponent } from '@modales/busquedaproveedor.component';
import { BusquedaEntidadComponent } from '@modales/busquedaentidad.component';
import { BusquedaItemComponent } from '@modales/busquedaitem.component';
import { GridDetalleComponent } from '@modales/griddetalle.component';
import { GridDetalleFormaPagoComponent } from '@modales/gridformapago.component';
import { BusquedaTransportistaComponent } from '@modales/busquedatransportista.component';
import { ProductoControlComponent } from '@modales/productocontrol.component';
import { BusquedaRetencionesComponent } from '@modales/busquedaretenciones.component';
import { BusquedaFacturaComponent } from '@modales/busquedafactura.component';
import { ModalesComponent } from '@modales/modales.component';
import { ReportComponent } from '@modales/report.component';
import { OrdenCompraComponent } from '@modales/ordencompra.component';
import { CuentaxCobrarRoutingModule } from './cuentaxcobrar-routing.module';
import { RegistroPagoComponent } from '../cuentaxcobrar/registropago.component';
import { IngresoRetencionComponent } from '../cuentaxcobrar/registroretencion.component';


@NgModule({
    declarations: [
        RegistroPagoComponent,
        IngresoRetencionComponent
    ],
    imports: [
        GrdFilterPipe,
        NgSelect2Module,
        GridDetalleFormaPagoComponent,
        GridDetalleComponent,
        ModalesComponent,
        NgxMaskDirective,
        BusquedaFacturaComponent,
        ReportComponent,
        OrdenCompraComponent,
        BusquedaTransportistaComponent,
        BusquedaItemComponent,
        ProductoControlComponent,
        BusquedaEntidadComponent,
        BusquedaProveedorComponent,
        MatButtonModule,
        MatExpansionModule,
        MatSidenavModule,
        MatMenuModule,
        MatToolbarModule,
        BusquedaRetencionesComponent,
        MatIconModule,
        MatTabsModule,
        ModalModule.forRoot(),
        CommonModule,
        FormsModule,
        ModalModule,
        ReactiveFormsModule,
        CuentaxCobrarRoutingModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        provideEnvironmentNgxMask(),
        BsModalRef
    ],
})
export class CuentaxCobrarModule {
}
