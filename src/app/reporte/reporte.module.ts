import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal'
import { BusquedaEntidadComponent } from '../modales/busquedaentidad.component';
import { BusquedaUsuarioComponent } from '../modales/busquedausuario.component';
import { BusquedaPasajeroComponent } from '../modales/busquedapasajero.component';
import { BusquedaComisionComponent } from '../modales/busquedacomision.component';
import { BusquedaFormaComponent } from '../modales/busquedaforma.component';
import { BusquedaPaisComponent } from '../modales/busquedapais.component';
import { BusquedaBoletoComponent } from '../modales/busquedaboleto.component';
import { BusquedaEmpleadoComponent } from '../modales/busquedaempleado.component';
import { BusquedaIataComponent } from '../modales/busquedaiata.component';
import { BusquedaConsolidadoraComponent } from '../modales/busquedaconsolidadora.component';
import { BusquedaContratoComponent } from '../modales/busquedacontrato.component';
import { BusquedaProveedorComponent } from '../modales/busquedaproveedor.component';
import { BusquedaRutaComponent } from '../modales/busquedaruta.component';
import { BusquedaTipoSeguroComponent } from '../modales/busquedatiposeguro.component';
import { BusquedaTipoAlojamientoComponent } from '../modales/busquedatipoalojamiento.component';
import { GrdFilterPipe } from '../pipe/filterGrid';
import { ReporteRoutingModule } from '../reporte/reporte-routing.module';
import { ReporteBoletosComponent } from './reporteboletos.component';
import { ReporteBoletosTipoComponent } from './reporteboletostipo.component';
import { ReporteFacturacionComponent } from './reportefacturacion.component';
import { ReporteContratoComponent } from './reportecontrato.component';
import { ReportePagoComponent } from './reportepago.component';
import { ReporteCuentaxCobrarComponent } from './reportecuentaxcobrar.component';
import { ReporteMargueComponent } from './reportemargue.component';
import { ReporteValoresPagadoComponent } from './reportevalorespagado.component';
import { ReporteAsientoContableComponent } from './reporteasientocontable.component';
import { ReportePlanCuentaComponent } from './reporteplancuenta.component';
import { ReporteBalanceGeneralComponent } from './reportebalancegeneral.component';
import { ReportePerdidaGanaciaComponent } from './reporteperdidaganacia.component';
import { ModalesComponent } from '@modales/modales.component';
import { MatSelectModule } from '@angular/material/select';
import { ReporteProveedorComponent } from './reporteproveedor.component';
import { ReporteEntidadComponent } from './reporteentidad.component';
import { ReporteAnticipoQuincenaComponent } from './reporteanticipoquincena.component';
import { GeneraSobrePagoComponent } from './generarsobrepago.component';
import { GeneraSobrePagoTMPComponent } from './generarsobrepagotmp.component';
import { ReporteFinMesComponent } from './reportefinmes.component';
import { ReporteFaltaComponent } from './reportefalta.component';
import { ReporteAntQuincenaComponent } from './reporteantquincena.component';
import { ReportePrestamoComponent } from './reporteprestamo.component';
import { ReporteVacacionesComponent } from './reportevacaciones.component';
import { ReporteDecimosComponent } from './reportedecimos.component';
import { ReporteGananciaComponent } from './reporteganacia.component';
import { ReporteBoletosGeneralComponent } from './reporteboletosgeneral.component';
import { ReporteEstadoCuentaComponent } from './reporteestadocuenta.component';
import { SeparatorDirective } from '../../environments/SeparatorDirective';


@NgModule({
    declarations: [
        ReporteBoletosComponent,
        ReporteContratoComponent,
        ReporteCuentaxCobrarComponent,
        ReporteMargueComponent,
        ReporteValoresPagadoComponent,
        ReportePagoComponent,
        ReporteEstadoCuentaComponent,
        ReporteFacturacionComponent,
        ReporteAsientoContableComponent,
        ReportePlanCuentaComponent,
        ReporteBalanceGeneralComponent,
        ReportePerdidaGanaciaComponent,
        ReporteGananciaComponent,
        ReporteProveedorComponent,
        ReporteEntidadComponent,
        ReporteAnticipoQuincenaComponent,
        GeneraSobrePagoComponent,
        ReporteFinMesComponent,
        ReporteFaltaComponent,
        ReporteAntQuincenaComponent,
        ReportePrestamoComponent,
        ReporteVacacionesComponent,
        ReporteDecimosComponent,
        GeneraSobrePagoTMPComponent,
        ReporteBoletosTipoComponent,
        ReporteBoletosGeneralComponent
    ],
    imports: [
        MatSelectModule,
        GrdFilterPipe,
        BusquedaFormaComponent,
        ModalesComponent,
        BusquedaEmpleadoComponent,
        BusquedaTipoAlojamientoComponent,
        BusquedaTipoSeguroComponent,
        BusquedaComisionComponent,
        BusquedaBoletoComponent,
        BusquedaEntidadComponent,
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
        ReactiveFormsModule,
        ReporteRoutingModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        BsModalRef
    ],
})
export class ReporteModule {
}
