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
import { BusquedaIataComponent } from '../modales/busquedaiata.component';
import { BusquedaConsolidadoraComponent } from '../modales/busquedaconsolidadora.component';
import { BusquedaContratoComponent } from '../modales/busquedacontrato.component';
import { BusquedaProveedorComponent } from '../modales/busquedaproveedor.component';
import { BusquedaRutaComponent } from '../modales/busquedaruta.component';
import { BusquedaTipoSeguroComponent } from '../modales/busquedatiposeguro.component';
import { BusquedaTipoAlojamientoComponent } from '../modales/busquedatipoalojamiento.component';
import { GrdFilterPipe } from '../pipe/filterGrid';
import { BoletosRoutingModule } from '../boletos/boletos-routing.module';
import { IngresoBoletosComponent } from './ingresoboletos.component';
import { CambioBoletosComponent } from './cambioboletos.component';
import { RecuperaBoletosComponent } from './recuperaboletos.component';
import { ModalesComponent } from '@modales/modales.component';


import { SeparatorDirective } from '../../environments/SeparatorDirective';

@NgModule({
    declarations: [
        IngresoBoletosComponent,
        RecuperaBoletosComponent,
        CambioBoletosComponent
       // SeparatorDirective

    ],
    imports: [
        GrdFilterPipe,
        BusquedaFormaComponent,
        ModalesComponent,
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
        ModalModule,
        ReactiveFormsModule,
        BoletosRoutingModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        BsModalRef
    ],
})
export class BoletosModule {
}
