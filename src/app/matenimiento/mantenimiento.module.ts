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
import { BusquedaTipoAuxiliarComponent } from '@modales/busquedatipoauxiliar.component';
import { BusquedaSubGrupoComponent } from '@modales/busquedasubgrupo.component';
import { BusquedaConsolidadoraComponent } from '@modales/busquedaconsolidadora.component';
import { BusquedaContratoComponent } from '@modales/busquedacontrato.component';
import { BusquedaProveedorComponent } from '@modales/busquedaproveedor.component';
import { BusquedaRutaComponent } from '@modales/busquedaruta.component';
import { BusquedaNivelComponent } from '@modales/busquedanivel.component';
import { BusquedaMateriaComponent } from '@modales/busquedamateria.component';
import { BusquedaDocenteComponent } from '@modales/busquedadocente.component';
import { BusquedaCursoComponent } from '@modales/busquedacurso.component';
import { BusquedaParaleloComponent } from '@modales/busquedaparalelo.component';
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
import { BusquedaTipoPrestamoComponent } from '@modales/busquedatipoprestamo.component';
import { BusquedaPerioroComponent } from '@modales/busquedaperiodo.component';
import { GrdFilterPipe } from '../pipe/filterGrid';
import { MantenimientoRoutingModule } from '../matenimiento/mantenimiento-routing.module';
import { EntidadComponent } from './entidad.component';
import { EstadoComponent } from './estado.component';
import { RetencionFuenteComponent } from './retencionfuente.component';
import { RetencionIvaComponent } from './retencioniva.component';
import { ParametrosComponent } from './parametros.component';
import { UsuarioComponent } from './usuario.component';
import { PasajeroComponent } from './pasajero.component';
import { ComisionComponent } from './comision.component';
import { FormaPagoComponent } from './formapago.component';
import { PaisComponent } from './pais.component';
import { IataComponent } from './iata.component';
import { RutaComponent } from './ruta.component';
import { ConsolidadorasComponent } from './consolidadoras.component';
import { ContratoComponent } from './contrato.component';
import { ProveedorComponent } from './proveedor.component';
import { AerolineaComponent } from './aerolinea.component';
import { TipoSeguroComponent } from './tiposeguro.component';
import { TipoAlojamientoComponent } from './tipoalojamiento.component';
import { PersonaEntidadComponent } from './personaentidad.component';
import { ServicioAdicionalComponent } from './servicioadicional.component';
import { PlanCuentaComponent } from './plancuenta.component';
import { GrupoComponent } from './grupo.component';
import { SubGrupoComponent } from './subgrupo.component';
import { TipoDocumentoComponent } from './tipodocumento.component';
import { TipoAuxiliarComponent } from './tipoauxiliar.component';
import { AuxiliarComponent } from './auxiliar.component';
import { TipoCompraComponent } from './tipocompra.component';
import { ClaseContableComponent } from './clasecontable.component';
import { GastosComponent } from './gastos.component';
import { CompaniComponent } from './compania.component';
import { TipoPrestamoComponent } from './tipoprestamo.component';
import { SeparatorDirective } from '../../environments/SeparatorDirective';
@NgModule({
    declarations: [
        SeparatorDirective,
        TipoAuxiliarComponent,
        TipoPrestamoComponent,
        AuxiliarComponent,
        EntidadComponent,
        UsuarioComponent,
        AerolineaComponent,
        EstadoComponent,
        TipoDocumentoComponent,
        TipoCompraComponent,
        ParametrosComponent,
        PasajeroComponent,
        GastosComponent,
        ComisionComponent,
        FormaPagoComponent,
        RetencionFuenteComponent,
        RetencionIvaComponent,
        PaisComponent,
        CompaniComponent,
        RutaComponent,
        IataComponent,
        GrupoComponent,
        ConsolidadorasComponent,
        ContratoComponent,
        PersonaEntidadComponent,
        ProveedorComponent,
        ServicioAdicionalComponent,
        TipoSeguroComponent,
        TipoAlojamientoComponent,
        PlanCuentaComponent,
        SubGrupoComponent,
        ClaseContableComponent
    ],
    imports: [
        FullCalendarModule,
        GrdFilterPipe,
        BusquedaCompaniaComponent,
        BusquedaFormaComponent,
        BusquedaMateriaComponent,
        BusquedaGrupoComponent,
        BusquedaDocenteComponent,
        BusquedaPerioroComponent,
        BusquedaSubGrupoComponent,
        BusquedaCursoComponent,
        BusquedaNivelComponent,
        BusquedaParaleloComponent,
        BusquedaTipoPrestamoComponent,
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
        MantenimientoRoutingModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        BsModalRef
    ],
})
export class MantenimientoModule {
}
