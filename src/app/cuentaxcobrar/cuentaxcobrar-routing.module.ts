import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroPagoComponent } from '../cuentaxcobrar/registropago.component';
import { IngresoRetencionComponent } from '../cuentaxcobrar/registroretencion.component';
const routes: Routes = [
    {
        path: 'registropago',
        component: RegistroPagoComponent,
        data: {
            title: 'Registro Pago Cuenta x Cobrar'
        }
    },
    {
        path: 'registroretencion',
        component: IngresoRetencionComponent,
        data: {
            title: 'Ingreso Retencion'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CuentaxCobrarRoutingModule {
}
