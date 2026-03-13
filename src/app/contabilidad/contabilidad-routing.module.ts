import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsientoContableComponent } from '../contabilidad/asientocontable.component';
import { InterfazContableComponent } from '../contabilidad/interfazcontable.component';
import { ProcesoContabilizacionComponent } from '../contabilidad/procesocontabilizacion.component';
import { CierreModuloComponent } from '../contabilidad/cierremodulo.component';
import { ReversoModuloComponent } from '../contabilidad/reversomodulo.component';
import { AsientoAperturaComponent } from '../contabilidad/asientoapertura.component';


const routes: Routes = [
    {
        path: 'aseintoapertura',
        component: AsientoAperturaComponent,
        data: {
            title: 'Asiento Apertura'
        }
    },
    {
        path: 'reversocierremodulo',
        component: ReversoModuloComponent,
        data: {
            title: 'Reverso Modulo'
        }
    },
    {
        path: 'cierremodulo',
        component: CierreModuloComponent,
        data: {
            title: 'Cierre Modulo'
        }
    },
    {
        path: 'procesarcontabilizacion',
        component: ProcesoContabilizacionComponent,
        data: {
            title: 'Procesar Comprobantes'
        }
    },
    {
        path: 'asientocontable',
        component: AsientoContableComponent,
        data: {
            title: 'Ingreso Comprobantes'
        }
    },
    {
        path: 'intefazcontable',
        component: InterfazContableComponent,
        data: {
            title: 'Interfaz Contable'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContabilidadRoutingModule {
}
