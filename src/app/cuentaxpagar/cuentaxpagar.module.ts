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
import { BusquedaItemComponent } from '@modales/busquedaitem.component';
import { BusquedaBoletochComponent } from '../modales/busquedaboletoch.component';
import { BusquedaFacturaPagarComponent } from '../modales/busquedafacturaPagar.component';
import { BusquedaAsientoContableComponent} from '../modales/busquedadocumentocxp.component';
import { BusquedaOrdenCompraComponent } from '../modales/busquedaordencompra.component';
import { GridDetalleComponent } from '@modales/griddetalle.component';
import { BusquedaGastosComponent } from '@modales/busquedagastos.component';
import { GridDetalleFormaPagoComponent } from '@modales/gridformapago.component';
import { BusquedaTransportistaComponent } from '@modales/busquedatransportista.component';
import { ProductoControlComponent } from '@modales/productocontrol.component';
import { ModalesComponent } from '@modales/modales.component';
import { ReportComponent } from '@modales/report.component';
import { OrdenCompraComponent } from '@modales/ordencompra.component';
import { CuentaxPagarRoutingModule } from './cuentaxpagar-routing.module';
import { BusquedaFacturaComponent } from '@modales/busquedafactura.component';
import { BusquedaPlanCuentaComponent } from '@modales/busquedaplancuenta.component';
import { RegistroFacturacionxPagarComponent } from '../cuentaxpagar/registrofacturacionxpagar.component';
import { ReporteCuentaxPagarComponent } from '../cuentaxpagar/reportecuentaxpagar.component';
import { ReporteCuentaxPagarRetComponent } from '../cuentaxpagar/reportecuentaxpagarret.component';
import { IngresoDocumentoCXPComponent } from '../cuentaxpagar/ingresodocumetocxp.component';
import { InputMaskModule } from '@ngneat/input-mask';



@NgModule({
    declarations: [
        RegistroFacturacionxPagarComponent,
        ReporteCuentaxPagarComponent,
        ReporteCuentaxPagarRetComponent,
        IngresoDocumentoCXPComponent
    ],
    imports: [
        GrdFilterPipe,
        NgSelect2Module,
        InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
        GridDetalleFormaPagoComponent,
        BusquedaAsientoContableComponent,
        BusquedaPlanCuentaComponent,
        BusquedaFacturaPagarComponent,
        BusquedaGastosComponent,
        GridDetalleComponent,
        ModalesComponent,
        ReportComponent,
        OrdenCompraComponent,
        BusquedaTransportistaComponent,
        BusquedaOrdenCompraComponent,
        BusquedaItemComponent,
        BusquedaBoletochComponent,
        BusquedaFacturaComponent,
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
        CuentaxPagarRoutingModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        BsModalRef
    ],
})
export class CuentaxPagarModule {
}
