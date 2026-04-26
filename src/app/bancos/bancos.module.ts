import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular';


import { CommonModule } from '@angular/common';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal'
import { BusquedaCompaniaComponent } from '@modales/busquedacompania.component';
import { BusquedaEntidadComponent } from '@modales/busquedaentidad.component';
import { BusquedaUsuarioComponent } from '@modales/busquedausuario.component';
import { BusquedaPasajeroComponent } from '@modales/busquedapasajero.component';
import { BusquedaComisionComponent } from '@modales/busquedacomision.component';
import { BusquedaFormaComponent } from '@modales/busquedaforma.component';
import { BusquedaPaisComponent } from '@modales/busquedapais.component';
import { BusquedaEstadoComponent } from '@modales/busquedaestado.component';
import { BusquedaParametroComponent } from '@modales/busquedaparametro.component';
import { BusquedaAerolineaComponent } from '@modales/busquedaaerolinea.component';
import { BusquedaIataComponent } from '@modales/busquedaiata.component';
import { BusquedaGrupoComponent } from '@modales/busquedagrupo.component';
import { BusquedaOrdenPagoComponent } from '@modales/busquedadoordenpago.component';
import { BusquedaTipoAuxiliarComponent } from '@modales/busquedatipoauxiliar.component';
import { BusquedaSubGrupoComponent } from '@modales/busquedasubgrupo.component';
import { BusquedaConsolidadoraComponent } from '@modales/busquedaconsolidadora.component';
import { BusquedaContratoComponent } from '@modales/busquedacontrato.component';
import { BusquedaProveedorComponent } from '@modales/busquedaproveedor.component';
import { BusquedaRutaComponent } from '@modales/busquedaruta.component';
import { BusquedaTipoSeguroComponent } from '@modales/busquedatiposeguro.component';
import { BusquedaTipoAlojamientoComponent } from '@modales/busquedatipoalojamiento.component';
import { BusquedaServicioAdicionalComponent } from '@modales/busquedaservicioadicional.component';
import { BusquedaPersonaAutorizadaComponent } from '@modales/busquedapersona.component';
import { BusquedaClaseContableComponent } from '@modales/busquedaclasecontable.component';
import { BusquedaTipoDocumentoComponent } from '@modales/busquedatipodocumento.component';
import { BusquedaGastosComponent } from '@modales/busquedagastos.component';
import { BusquedaTipoCompraComponent } from '@modales/busquedatipocompra.component';
import { BusquedaPlanCuentaComponent } from '@modales/busquedaplancuenta.component';
import { BusquedaAuxiliarComponent } from '@modales/busquedaauxiliar.component';
import { BusquedaRetencionFuenteComponent } from '@modales/busquedaretencionfuente.component';
import { BusquedaRetencionIvaComponent } from '@modales/busquedaretencioniva.component';
import { BusquedaServicioComponent } from '@modales/busquedaservicio.component';
import { BusquedaBancosComponent } from '@modales/busquedabancos.component';
import { BusquedaCuentaBancariaComponent } from '@modales/busquedacuentabancaria.component';
import { BusquedaTipDocumentoComponent } from '@modales/busquedatipdocumento.component';
import { BusquedaNumeroCuentaComponent } from '@modales/busquedanumerocuenta.component';
import { BusquedaDocBancarioComponent } from '@modales/busquedadocbancario.component';
import { BusquedaConciliacionComponent } from '@modales/busquedadoconciliacion.component';
import { ModalesComponent } from '@modales/modales.component';
import { GrdFilterPipe } from '../pipe/filterGrid';
import { BancosRoutingModule } from '../bancos/bancos-routing.module';
import { MantenimientoBancosComponent } from './mantenimientobancos.component';
import { MantenimientoCuentaBancariaComponent } from './mantenimientocuentabancaria.component';
import { MantenimientoTipoDocumentoComponent } from './mantenimientotipodocumento.component';
import { MantenimientoNumeroCuentaComponent } from './mantenimientonumerocuenta.component';
import { IngresoDocumentoComponent } from './ingresodocumento.component';
import { ConciliacionBancariaComponent } from './conciliacionbancaria.component';
import { CierreBancariaComponent } from './cierrebancaria.component';
import { ReversoCierreBancariaComponent } from './revercocierrebancaria.component';
import { OrdenPagoComponent } from './ordenpago.component';
import { AprobarOrdenPagoComponent } from './aprobarordenpago.component';
import { ReversoOrdenPagoComponent } from './reversoordenpago.component';
import { ReporteConciliacionComponent } from './reporteconciliacion.component';
import { ReporteOrdenPagoComponent } from './reporteordenpago.component';
import { ReporteDocumentoBancarioComponent } from './reportedocumentobancario.component';


import { SeparatorDirective } from '../../environments/SeparatorDirective';

@NgModule({
    declarations: [
        MantenimientoNumeroCuentaComponent,
        MantenimientoBancosComponent,
        AprobarOrdenPagoComponent,
        MantenimientoCuentaBancariaComponent,
        MantenimientoTipoDocumentoComponent,
        IngresoDocumentoComponent,
        ConciliacionBancariaComponent,
        CierreBancariaComponent,
        ReversoCierreBancariaComponent,
        OrdenPagoComponent,
        ReversoOrdenPagoComponent,
        ReporteConciliacionComponent,
        ReporteOrdenPagoComponent,
        ReporteDocumentoBancarioComponent
    ],
    imports: [
        FullCalendarModule,
        GrdFilterPipe,
        BusquedaCompaniaComponent,
        BusquedaFormaComponent,
        BusquedaGrupoComponent,
        BusquedaBancosComponent,
        BusquedaSubGrupoComponent,
        BusquedaOrdenPagoComponent,
        BusquedaNumeroCuentaComponent,
        BusquedaTipDocumentoComponent,
        BusquedaDocBancarioComponent,
        BusquedaCuentaBancariaComponent,
        BusquedaServicioAdicionalComponent,
        BusquedaTipoDocumentoComponent,
        BusquedaClaseContableComponent,
        BusquedaGastosComponent,
        ModalesComponent,
        BusquedaPersonaAutorizadaComponent,
        BusquedaTipoAuxiliarComponent,
        BusquedaRetencionFuenteComponent,
        BusquedaRetencionIvaComponent,
        BusquedaConciliacionComponent,
        BusquedaPlanCuentaComponent,
        BusquedaTipoCompraComponent,
        BusquedaAuxiliarComponent,
        BusquedaTipoAlojamientoComponent,
        BusquedaServicioComponent,
        BusquedaTipoSeguroComponent,
        BusquedaAerolineaComponent,
        BusquedaComisionComponent,
        BusquedaParametroComponent,
        BusquedaEntidadComponent,
        BusquedaEstadoComponent,
        BusquedaUsuarioComponent,
        BusquedaRutaComponent,
        BusquedaPasajeroComponent,
        BusquedaPaisComponent,
        BusquedaIataComponent,
        BusquedaProveedorComponent,
        BusquedaConsolidadoraComponent,
        BusquedaContratoComponent,
        MatButtonModule,
        MatExpansionModule,
        MatSidenavModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        ModalModule.forRoot(),
        CommonModule,
        FormsModule,
        ModalModule,
        ReactiveFormsModule,
        BancosRoutingModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        BsModalRef
    ],
})
export class BancosModule {
}
