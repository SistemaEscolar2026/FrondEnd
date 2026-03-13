import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroFacturacionComponent } from '../facturacion/registrofacturacion.component';
import { ProcesoFacturacionComponent } from '../facturacion/procesofacturacion.component';
import { ProcesoFacturacionAnuComponent } from '../facturacion/procesofacturacionanu.component';
import { RegistroNotaCreditoComponent } from '../facturacion/registronotacredito.component';
import { ProcesoNotaCreditocomponent } from '../facturacion/procesonotacredito.component';
const routes: Routes = [

    {
        path: 'procesonotacredito',
        component: ProcesoNotaCreditocomponent,
        data: {
            title: 'Proceso Nota Credito'
        }
    },
    {
        path: 'notacredito',
        component: RegistroNotaCreditoComponent,
        data: {
            title: 'Registro Nota Credito'
        }
    },
    {
        path: 'registroreversofactura',
        component: ProcesoFacturacionAnuComponent,
        data: {
            title: 'Proceso Reverso Facturacion'
        }
    },
    {
        path: 'registrofactura',
        component: RegistroFacturacionComponent,
        data: {
            title: 'Registro Facturacion'
        }
    },

    {
        path: 'procesofactura',
        component: ProcesoFacturacionComponent,
        data: {
            title: 'Proceso Facturacion'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FacturacionRoutingModule {
}
