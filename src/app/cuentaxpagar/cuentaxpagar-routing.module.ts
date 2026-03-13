import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroFacturacionxPagarComponent } from '../cuentaxpagar/registrofacturacionxpagar.component';
import { ReporteCuentaxPagarComponent } from '../cuentaxpagar/reportecuentaxpagar.component';
import { ReporteCuentaxPagarRetComponent } from '../cuentaxpagar/reportecuentaxpagarret.component';
import { IngresoDocumentoCXPComponent } from '../cuentaxpagar/ingresodocumetocxp.component';



const routes: Routes = [
    {
        path: 'ingresodocumentocxp',
        component: IngresoDocumentoCXPComponent,
        data: {
            title: 'Ingreso Documento CXP'
        }
    },
    {
        path: 'registrofactura',
        component: RegistroFacturacionxPagarComponent,
        data: {
            title: 'Registro Factura Cuenta x Pagar'
        }
    },
    {
        path: 'reportecuentaxpagar',
        component: ReporteCuentaxPagarComponent,
        data: {
            title: 'Reporte Cuenta x Pagar'
        }
    },
    {
        path: 'reportecuentaxpagarret',
        component: ReporteCuentaxPagarRetComponent,
        data: {
            title: 'Reporte Cuenta x Pagar - Retencion'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CuentaxPagarRoutingModule {
}
