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
import { EducativoRoutingModule } from '../educativo/educativo-routing.module';

import { NivelComponent } from './nivel.component';
import { MateriaComponent } from './materia.component';
import { CursoComponent } from './curso.component';
import { ParaleloComponent } from './paralelo.component';
import { DocenteComponent } from './docente.component';
//import { SeparatorDirective } from '../../environments/SeparatorDirective';
import { PeriodoComponent } from './periodo.component';
import { HorarioClaseComponent } from './horarioclase.component';
import { CursoMateriaComponent } from './cursomateria.component';
@NgModule({
    declarations: [
       // SeparatorDirective,
        HorarioClaseComponent,
        PeriodoComponent,
        DocenteComponent,
        NivelComponent,
        CursoComponent,
        CursoMateriaComponent,
        MateriaComponent,
        ParaleloComponent
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
        EducativoRoutingModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        BsModalRef
    ],
})
export class EducativoModule {
}
