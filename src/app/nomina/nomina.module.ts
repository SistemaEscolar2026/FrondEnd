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
import { BusquedaTipoAuxiliarComponent } from '@modales/busquedatipoauxiliar.component';
import { BusquedaFaltasComponent } from '@modales/busquedafaltas.component';
import { BusquedaSubGrupoComponent } from '@modales/busquedasubgrupo.component';
import { BusquedaConsolidadoraComponent } from '@modales/busquedaconsolidadora.component';
import { BusquedaContratoComponent } from '@modales/busquedacontrato.component';
import { BusquedaPermisoiessComponent } from '@modales/busquedapermisoiess.component';
import { BusquedaEmpleadoComponent } from '@modales/busquedaempleado.component';
import { BusquedaAnticipoComponent } from '@modales/busquedaanticipo.component';
import { BusquedaPrestamoComponent } from '@modales/busquedaprestamo.component';
import { BusquedaProveedorComponent } from '@modales/busquedaproveedor.component';
import { BusquedaRutaComponent } from '@modales/busquedaruta.component';
import { BusquedaTipoSeguroComponent } from '@modales/busquedatiposeguro.component';
import { BusquedaTipoAlojamientoComponent } from '@modales/busquedatipoalojamiento.component';
import { BusquedaServicioAdicionalComponent } from '@modales/busquedaservicioadicional.component';
import { BusquedaPersonaAutorizadaComponent } from '@modales/busquedapersona.component';
import { BusquedaClaseContableComponent } from '@modales/busquedaclasecontable.component';
import { BusquedaTipoDocumentoComponent } from '@modales/busquedatipodocumento.component';
import { BusquedaGastosComponent } from '@modales/busquedagastos.component';
import { BusquedaDecimoComponent } from '@modales/busquedadecimo.component'
import { BusquedaTipoCompraComponent } from '@modales/busquedatipocompra.component';
import { BusquedaPlanCuentaComponent } from '@modales/busquedaplancuenta.component';
import { BusquedaRubroComponent } from '@modales/busquedarubro.component';
import { BusquedaAuxiliarComponent } from '@modales/busquedaauxiliar.component';
import { BusquedaRetencionFuenteComponent } from '@modales/busquedaretencionfuente.component';
import { BusquedaRetencionIvaComponent } from '@modales/busquedaretencioniva.component';
import { BusquedaServicioComponent } from '@modales/busquedaservicio.component';
import { BusquedaQuincenaComponent } from '@modales/busquedaquincena.component';
import { BusquedaNominaMesComponent } from '@modales/busquedanominames.component';
import { GrdFilterPipe } from '../pipe/filterGrid';
import { NominaRoutingModule } from '../nomina/nomina-routing.module';
import { EmpleadosComponent } from './empleados.component';
import { EmpleadosConfigComponent } from './empleadosconfig.component';
import { FaltaComponent } from './falta.component';
import { NominaRubroComponent } from './nominarubro.component';
import { PermisoIESSComponent } from './permisoiess.component';
import { AnticipoComponent } from './anticipo.component';
import { AnticipoQuincenaComponent } from './anticipoquincena.component';
import { PrestamoComponent } from './prestamo.component';
import { NominaFinMesComponent } from './nominafinmes.component';
import { VacacionesComponent } from './vacaciones.component';
import { PagoDecimo14Component } from './pagodecimo14.component';
import { PagoDecimo13Component } from './pagodecimo13.component';
import { FiniquitoComponent } from './finiquito.component';
import { EstadoCuentaEmpleadoComponent } from './estadocuenta.component';
import { ModalesComponent } from '@modales/modales.component';
import { BusquedaVacacionesComponent } from '@modales/busquedavacaciones.component';
import { SeparatorDirective } from '../../environments/SeparatorDirective';



@NgModule({
    declarations: [
        //SeparatorDirective,
        EmpleadosComponent,
        EmpleadosConfigComponent,
        FaltaComponent,
        NominaRubroComponent,
        PermisoIESSComponent,
        AnticipoComponent,
        PrestamoComponent,
        EstadoCuentaEmpleadoComponent,
        AnticipoQuincenaComponent,
        NominaFinMesComponent,
        VacacionesComponent,
        PagoDecimo14Component,
        PagoDecimo13Component,
        FiniquitoComponent
    ],
    imports: [
        GrdFilterPipe,
        ModalesComponent,
        BusquedaFormaComponent,
        BusquedaGrupoComponent,
        BusquedaNominaMesComponent,
        BusquedaAnticipoComponent,
        BusquedaVacacionesComponent,
        BusquedaFaltasComponent,
        BusquedaDecimoComponent,
        BusquedaEmpleadoComponent,
        BusquedaQuincenaComponent,
        BusquedaPermisoiessComponent,
        BusquedaSubGrupoComponent,
        BusquedaPrestamoComponent,
        BusquedaRubroComponent,
        BusquedaServicioAdicionalComponent,
        BusquedaTipoDocumentoComponent,
        BusquedaClaseContableComponent,
        BusquedaGastosComponent,
        BusquedaPersonaAutorizadaComponent,
        BusquedaTipoAuxiliarComponent,
        BusquedaRetencionFuenteComponent,
        BusquedaRetencionIvaComponent,
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
        NominaRoutingModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        BsModalRef
    ],
})
export class NominaModule {
}
