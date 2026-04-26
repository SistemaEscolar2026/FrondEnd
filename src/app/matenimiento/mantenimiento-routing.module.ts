import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntidadComponent } from './entidad.component';
import { UsuarioComponent } from './usuario.component';
import { PasajeroComponent } from './pasajero.component';
import { ComisionComponent } from './comision.component';
import { FormaPagoComponent } from './formapago.component';
import { PaisComponent } from './pais.component';
import { IataComponent } from './iata.component';
import { ConsolidadorasComponent } from './consolidadoras.component';
import { ContratoComponent } from './contrato.component';
import { ProveedorComponent } from './proveedor.component';
import { TipoSeguroComponent } from './tiposeguro.component';
import { TipoAlojamientoComponent } from './tipoalojamiento.component';
import { RutaComponent } from './ruta.component';
import { EstadoComponent } from './estado.component';
import { ParametrosComponent } from './parametros.component';
import { AerolineaComponent } from './aerolinea.component';
import { PersonaEntidadComponent } from './personaentidad.component';
import { ServicioAdicionalComponent } from './servicioadicional.component';
import { RetencionFuenteComponent } from './retencionfuente.component';
import { PlanCuentaComponent } from './plancuenta.component';
import { RetencionIvaComponent } from './retencioniva.component';
import { GrupoComponent } from './grupo.component';
import { TipoDocumentoComponent } from './tipodocumento.component';
import { TipoCompraComponent } from './tipocompra.component';
import { SubGrupoComponent } from './subgrupo.component';
import { TipoAuxiliarComponent } from './tipoauxiliar.component';
import { AuxiliarComponent } from './auxiliar.component';
import { ClaseContableComponent } from './clasecontable.component';
import { GastosComponent } from './gastos.component';
import { CompaniComponent } from './compania.component';
import { TipoPrestamoComponent } from './tipoprestamo.component';
const routes: Routes = [
   
    {
        path: 'tipoprestamo',
        component: TipoPrestamoComponent,
        data: {
            title: 'Tipo Prestamo'
        }
    },
    {
        path: 'compania',
        component: CompaniComponent,
        data: {
            title: 'Compañia'
        }
    },
    {
        path: 'gastos',
        component: GastosComponent,
        data: {
            title: 'Gastos'
        }
    },
    {
        path: 'clasecontable',
        component: ClaseContableComponent,
        data: {
            title: 'Clase Contable'
        }
    },
    {
        path: 'auxiliar',
        component: AuxiliarComponent,
        data: {
            title: 'Auxiliar'
        }
    },
    {
        path: 'tipoauxiliar',
        component: TipoAuxiliarComponent,
        data: {
            title: 'Tipo Auxiliar'
        }
    },
    {
        path: 'tipocompra',
        component: TipoCompraComponent,
        data: {
            title: 'Tipo Compra'
        }
    },
    {
        path: 'tipodocumento',
        component: TipoDocumentoComponent,
        data: {
            title: 'Tipo Documento'
        }
    },
    {
        path: 'subgrupo',
        component: SubGrupoComponent,
        data: {
            title: 'SubGrupo'
        }
    },
    {
        path: 'entidad',
        component: EntidadComponent,
        data: {
            title: 'Entidades'
        }
    },
    {
        path: 'comision',
        component: ComisionComponent,
        data: {
            title: 'Comision'
        }
    },
    {
        path: 'formapago',
        component: FormaPagoComponent,
        data: {
            title: 'Forma de Pago'
        }
    },
    {
        path: 'pasajero',
        component: PasajeroComponent,
        data: {
            title: 'Pasajeros'
        }
    },
    {
        path: 'pais',
        component: PaisComponent,
        data: {
            title: 'Pais'
        }
    },
    {
        path: 'iata',
        component: IataComponent,
        data: {
            title: 'Iata'
        }
    },
    {
        path: 'consolidadoras',
        component: ConsolidadorasComponent,
        data: {
            title: 'Consolidadoras'
        }
    },
    {
        path: 'proveedor',
        component: ProveedorComponent,
        data: {
            title: 'Proveedor'
        }
    },
    {
        path: 'contrato',
        component: ContratoComponent,
        data: {
            title: 'Contrato'
        }
    },
    {
        path: 'tiposeguro',
        component: TipoSeguroComponent,
        data: {
            title: 'Tipo Seguro'
        }
    },
    {
        path: 'tipoalojamiento',
        component: TipoAlojamientoComponent,
        data: {
            title: 'Tipo Alojamiento'
        }
    },
    {
        path: 'ruta',
        component: RutaComponent,
        data: {
            title: 'Ruta'
        }
    },
    {
        path: 'usuario',
        component: UsuarioComponent,
        data: {
            title: 'Mantenimiento Usuario'
        }
    },
    {
        path: 'estado',
        component: EstadoComponent,
        data: {
            title: 'Mantenimiento Estado'
        }
    },
    {
        path: 'parametro',
        component: ParametrosComponent,
        data: {
            title: 'Mantenimiento Parametros'
        }
    },
    {
        path: 'aerolineas',
        component: AerolineaComponent,
        data: {
            title: 'Mantenimiento Aerolineas'
        }
    },
    {
        path: 'personaentidad',
        component: PersonaEntidadComponent,
        data: {
            title: 'Persona Autorizadas Entidad'
        }
    },
    {
        path: 'servicioadicional',
        component: ServicioAdicionalComponent,
        data: {
            title: 'Servicio Adicionales'
        }
    },
    {
        path: 'retencionfuente',
        component: RetencionFuenteComponent,
        data: {
            title: 'Retencion Fuente'
        }
    },
    {
        path: 'retencioniva',
        component: RetencionIvaComponent,
        data: {
            title: 'Retencion Iva'
        }
    },
    {
        path: 'plancuenta',
        component: PlanCuentaComponent,
        data: {
            title: 'Plan Cuenta'
        }
    },
    {
        path: 'grupo',
        component: GrupoComponent,
        data: {
            title: 'Grupo Contable'
        }
    }



];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MantenimientoRoutingModule {
}
