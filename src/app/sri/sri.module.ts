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
import { BusquedaTipoRetencionComponent } from '@modales/busquedatiporetencion.component';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal'
import { BusquedaProveedorComponent } from '@modales/busquedaproveedor.component';
import { BusquedaProveedorlblComponent } from '@modales/busquedaproveedorlbl.component';
import { BusquedaClienteComponent } from '@modales/busquedacliente.component';
import { BusquedaAuxiliaresComponent } from '@modales/busquedaauxiliares.component';
import { BusquedaRetencionComponent } from '@modales/busquedaretencion.component';
import { BusquedaAutorizacionComponent } from '@modales/busquedaautorizacion.component';
import { BusquedaActivoFijoComponent } from '@modales/busquedaactivofijo.component';
import { BusquedaEntidadComponent } from '@modales/busquedaentidad.component';
import { BusquedaActivoFijoModalComponent } from '@modales/busquedaactivofijomodal.component';
import { BusquedaRetencionSriComponent } from '@modales/busquedaretencionsri.component';

import { BusquedaItemComponent } from '@modales/busquedaitem.component';

import { GridDetalleComponent } from '@modales/griddetalle.component';
import { GridDetalleFormaPagoComponent } from '@modales/gridformapago.component';
import { BusquedaTransportistaComponent } from '@modales/busquedatransportista.component';
import { ProductoControlComponent } from '@modales/productocontrol.component';
import { ModalesComponent } from '@modales/modales.component';
import { ReportComponent } from '@modales/report.component';

import { TotalesComponent } from '@modales/totales.component';
import { OrdenCompraComponent } from '@modales/ordencompra.component';
import { SriRoutingModule } from './sri-routing.module';
import { ReportViewerModule } from 'ngx-ssrs-reportviewer-v2';
import { MatSelectModule } from '@angular/material/select';
import { SriComprasComponent } from './sricompras.component';
import { SriVentasComponent } from './sriventas.component';
import { GeneraXMLComponent } from './generaxml.component';
import { ImportacionInformacionComponent } from './importainformacion.component';
import { ReversaInformacionComponent } from './reversainformacion.component';
import { CompraSustentoComponent } from './comprasustento.component';
import { RetencionesEfectuadasComponent } from './retencionesefectuadas.component';
import { LibroVentaClienteComponent } from './libroventacliente.component';
import { ComprassriContabilidadComponent } from './comprassricontabilidad.component';
import { ContabilidadNominaComponent } from './contabilidadnomina.component';
import { BaseComprasBaseRetencionComponent } from './basecomprasbaseretencion.component';
import { LiquidacionIvaComponent } from './liquidacioniva.component';
import { CuadraturaIvaComponent } from './cuadraturaiva.component';
import { CuadraturaComprasSriContabilidadComponent } from './cuadraturacomprasriconta.component';
import { CuadraturaVentasSriContabilidadComponent } from './cuadraturaventasriconta.component';
import { CuadraturaVentaContaFechaComponent } from './cuadraturaventacontafecha.component';
import { GastoIvaComponent } from './gastoiva.component';
import { CuadraturaRetencionesCarteraContabilidadComponent } from './cuadraturaretcarconta.component';
import { RetencionDividendosComponent } from './retenciondividendos.component';
import { SriReporteComponent } from './srireporte.component';


@NgModule({
    declarations: [
        SriComprasComponent,
        SriVentasComponent,
        GeneraXMLComponent,
        SriReporteComponent,
        ImportacionInformacionComponent,
        ReversaInformacionComponent,
        CompraSustentoComponent,
        RetencionesEfectuadasComponent,
        LibroVentaClienteComponent,
        ComprassriContabilidadComponent,
        ContabilidadNominaComponent,
        BaseComprasBaseRetencionComponent,
        LiquidacionIvaComponent,
        CuadraturaIvaComponent,
        CuadraturaComprasSriContabilidadComponent,
        CuadraturaVentasSriContabilidadComponent,
        CuadraturaVentaContaFechaComponent,
        GastoIvaComponent,
        CuadraturaRetencionesCarteraContabilidadComponent,
        RetencionDividendosComponent
    ],
    imports: [
        MatProgressBarModule,
        GrdFilterPipe,
        NgSelect2Module,
        MatSelectModule,
        ReportViewerModule,
        BusquedaEntidadComponent,
        BusquedaActivoFijoModalComponent,
        GridDetalleFormaPagoComponent,
        BusquedaAutorizacionComponent,
        BusquedaActivoFijoComponent,
        BusquedaRetencionComponent,
        BusquedaRetencionSriComponent,
        BusquedaProveedorlblComponent,
        BusquedaTipoRetencionComponent,
        GridDetalleComponent,
        ModalesComponent,
        TotalesComponent,
        ReportComponent,
        OrdenCompraComponent,
        BusquedaTransportistaComponent,
        BusquedaItemComponent,
        ProductoControlComponent,
        BusquedaClienteComponent,
        BusquedaAuxiliaresComponent,
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
        SriRoutingModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        BsModalRef
    ],
})
export class SriModule {
}
