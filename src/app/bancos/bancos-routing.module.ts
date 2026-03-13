import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoBancosComponent } from './mantenimientobancos.component';
import { MantenimientoCuentaBancariaComponent } from './mantenimientocuentabancaria.component';
import { MantenimientoTipoDocumentoComponent } from './mantenimientotipodocumento.component';
import { MantenimientoNumeroCuentaComponent } from './mantenimientonumerocuenta.component';
import { IngresoDocumentoComponent } from './ingresodocumento.component';
import { CierreBancariaComponent } from './cierrebancaria.component';
import { ReversoCierreBancariaComponent } from './revercocierrebancaria.component';
import { ConciliacionBancariaComponent } from './conciliacionbancaria.component';
import { OrdenPagoComponent } from './ordenpago.component';
import { AprobarOrdenPagoComponent } from './aprobarordenpago.component';
import { ReversoOrdenPagoComponent } from './reversoordenpago.component';
import { ReporteConciliacionComponent } from './reporteconciliacion.component';
import { ReporteOrdenPagoComponent } from './reporteordenpago.component';
import { ReporteDocumentoBancarioComponent } from './reportedocumentobancario.component';


const routes: Routes = [
    {
        path: 'reportedocumentobancario',
        component: ReporteDocumentoBancarioComponent,
        data: {
            title: 'Reporte Documento Bancario'
        }
    },
    {
        path: 'reporteordenpago',
        component: ReporteOrdenPagoComponent,
        data: {
            title: 'Reporte Orden Pago'
        }
    },
    {
        path: 'reporteconciliacion',
        component: ReporteConciliacionComponent,
        data: {
            title: 'Reporte Conciliacion'
        }
    },
    {
        path: 'reversoordenpago',
        component: ReversoOrdenPagoComponent,
        data: {
            title: 'Reverso Orden Pago'
        }
    },
    {
        path: 'aprobarordenpago',
        component: AprobarOrdenPagoComponent,
        data: {
            title: 'Aprobar Orden Pago'
        }
    },
    {
        path: 'ordenpago',
        component: OrdenPagoComponent,
        data: {
            title: 'Ingreso Orden Pago'
        }
    },
    {
        path: 'reversoconciliacionbancaria',
        component: ReversoCierreBancariaComponent,
        data: {
            title: 'Reverso Cierre Conciliacion Bancaria'
        }
    },
    {
        path: 'cierreconciliacionbancaria',
        component: CierreBancariaComponent,
        data: {
            title: 'Cierre Conciliacion Bancaria'
        }
    },
    {
        path: 'conciliacionbancaria',
        component: ConciliacionBancariaComponent,
        data: {
            title: 'Conciliacion Bancaria'
        }
    },
    {
        path: 'ingresodocumento',
        component: IngresoDocumentoComponent,
        data: {
            title: 'Ingreso Documento'
        }
    },
    {
        path: 'numerocuenta',
        component: MantenimientoNumeroCuentaComponent,
        data: {
            title: 'Numero Cuenta Bancaria'
        }
    },
    {
        path: 'tipodocumentobancario',
        component: MantenimientoTipoDocumentoComponent,
        data: {
            title: 'Tipo Documento Bancario'
        }
    },
    {
        path: 'cuentabancaria',
        component: MantenimientoCuentaBancariaComponent,
        data: {
            title: 'Cuenta Bancaria'
        }
    },
    {
        path: 'bancos',
        component: MantenimientoBancosComponent,
        data: {
            title: 'Bancos'
        }
    }


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BancosRoutingModule {
}
