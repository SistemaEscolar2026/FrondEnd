import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroOrdenCompraComponent } from '../ordencompra/registroordencompra.component';
import { ReporteOrdenCompraComponent } from '../ordencompra/reporteordencompra.component';



const routes: Routes = [
    {
        path: 'registroordencompra',
        component: RegistroOrdenCompraComponent,
        data: {
            title: 'Registro Orden Compra'
        }
    },
    {
        path: 'reporteordencompra',
        component: ReporteOrdenCompraComponent,
        data: {
            title: 'Reporte Orden Compra'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdenCompraRoutingModule {
}
