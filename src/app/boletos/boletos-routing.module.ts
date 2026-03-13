import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoBoletosComponent } from './ingresoboletos.component';
import { RecuperaBoletosComponent } from './recuperaboletos.component';
import { CambioBoletosComponent } from './cambioboletos.component';
const routes: Routes = [
    {
        path: 'autovaloresboleto',
        component: CambioBoletosComponent,
        data: {
            title: 'Autorizacion Cambio Valores Boleto'
        }
    },
    {
        path: 'recuperarboleto',
        component: RecuperaBoletosComponent,
        data: {
            title: 'Recuperar Boletos'
        }
    } ,
    {
        path: 'ingresoboletos',
        component: IngresoBoletosComponent,
        data: {
            title: 'Ingreso Boletos'
        }
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BoletosRoutingModule {
}
