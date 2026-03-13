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
import { GridDetalleComponent } from '@modales/griddetalle.component';
import { GridDetalleFormaPagoComponent } from '@modales/gridformapago.component';
import { BusquedaTransportistaComponent } from '@modales/busquedatransportista.component';
import { ProductoControlComponent } from '@modales/productocontrol.component';
import { ModalesComponent } from '@modales/modales.component';
import { ReportComponent } from '@modales/report.component';
import { OrdenCompraComponent } from '@modales/ordencompra.component';
import { wizardComponent } from '@modales/wizard.component';
import { BusquedaPlacaComponent } from '@modales/busquedaplaca.component';
import { OperativoRoutingModule } from './operativo-routing.module';
import { AprobarPreDespachoComponent } from '../operativo/aprobarpredespacho.component';
import { MatStepperModule } from '@angular/material/stepper';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { LoteControlComponent } from '@modales/lotecontrol.component';
/**
* DEFINICION DE VARIABLE CONFIGURACION PARA WIZARD
*/
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};
@NgModule({
  declarations: [
    AprobarPreDespachoComponent
  ],
  imports: [
    wizardComponent,
    LoteControlComponent,
    BusquedaPlacaComponent,
    NgWizardModule.forRoot(ngWizardConfig),
    GrdFilterPipe,
    MatStepperModule,
    NgSelect2Module,
    GridDetalleFormaPagoComponent,
    GridDetalleComponent,
    ModalesComponent,
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
    MatIconModule,
    MatTabsModule,
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
    OperativoRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    BsModalRef
  ],
})
export class OperativoModule {
}
