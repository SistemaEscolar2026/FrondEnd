import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GrdFilterPipe } from '../pipe/filterGrid';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { CommonModule } from '@angular/common';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal'
import { BusquedaProveedorComponent } from '@modales/busquedaproveedor.component';
import { BusquedaEntidadComponent } from '@modales/busquedaentidad.component';
import { BusquedaFacturaComponent } from '@modales/busquedafactura.component';
import { BusquedaNotaCreditoComponent } from '@modales/busquedanotacredito.component';
import { BusquedaItemComponent } from '@modales/busquedaitem.component';
import { GridDetalleComponent } from '@modales/griddetalle.component';
import { BusquedaBoletoComponent } from '../modales/busquedaboleto.component';
import { BusquedaBoletochComponent } from '../modales/busquedaboletoch.component';
import { GridDetalleFormaPagoComponent } from '@modales/gridformapago.component';
import { BusquedaTransportistaComponent } from '@modales/busquedatransportista.component';
import { ProductoControlComponent } from '@modales/productocontrol.component';
import { ModalesComponent } from '@modales/modales.component';
import { ReportComponent } from '@modales/report.component';
import { OrdenCompraComponent } from '@modales/ordencompra.component';
import { FacturacionRoutingModule } from './facturacion-routing.module';
import { RegistroFacturacionComponent } from '../facturacion/registrofacturacion.component';
import { RegistroNotaCreditoComponent } from '../facturacion/registronotacredito.component';
import { ProcesoFacturacionComponent } from '../facturacion/procesofacturacion.component';
import { ProcesoNotaCreditocomponent } from '../facturacion/procesonotacredito.component';
import { ProcesoFacturacionAnuComponent } from '../facturacion/procesofacturacionanu.component';
import { NgxBarcode6Module } from 'ngx-barcode6';


@NgModule({
    declarations: [
        RegistroFacturacionComponent,
        ProcesoFacturacionComponent,
        ProcesoFacturacionAnuComponent,
        RegistroNotaCreditoComponent,
        ProcesoNotaCreditocomponent
    ],
    imports: [
        NgxBarcode6Module,
        GrdFilterPipe,
        NgSelect2Module,
        GridDetalleFormaPagoComponent,
        GridDetalleComponent,
        BusquedaNotaCreditoComponent,
        ModalesComponent,
        ReportComponent,
        OrdenCompraComponent,
        BusquedaBoletoComponent,
        BusquedaBoletochComponent,
        BusquedaFacturaComponent,
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
        MatIconModule,
        MatTabsModule,
        ModalModule.forRoot(),
        CommonModule,
        FormsModule,
        ModalModule,
        ReactiveFormsModule,
        FacturacionRoutingModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        BsModalRef
    ],
})
export class FacturacionModule {
}
