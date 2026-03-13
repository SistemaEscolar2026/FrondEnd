import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteBoletosComponent } from './reporteboletos.component';
import { ReporteContratoComponent } from './reportecontrato.component';
import { ReporteCuentaxCobrarComponent } from './reportecuentaxcobrar.component';
import { ReporteMargueComponent } from './reportemargue.component';
import { ReporteValoresPagadoComponent } from './reportevalorespagado.component';
import { ReportePagoComponent } from './reportepago.component';
import { ReporteFacturacionComponent } from './reportefacturacion.component';
import { ReporteAsientoContableComponent } from './reporteasientocontable.component';
import { ReportePlanCuentaComponent } from './reporteplancuenta.component';
import { ReporteBalanceGeneralComponent } from './reportebalancegeneral.component';
import { ReportePerdidaGanaciaComponent } from './reporteperdidaganacia.component';
import { ReporteProveedorComponent } from './reporteproveedor.component';
import { ReporteEntidadComponent } from './reporteentidad.component';
import { ReporteAnticipoQuincenaComponent } from './reporteanticipoquincena.component';
import { GeneraSobrePagoComponent } from './generarsobrepago.component';
import { GeneraSobrePagoTMPComponent } from './generarsobrepagotmp.component';
import { ReporteFinMesComponent } from './reportefinmes.component';
import { ReporteFaltaComponent } from './reportefalta.component';
import { ReporteAntQuincenaComponent } from './reporteantquincena.component';
import { ReportePrestamoComponent } from './reporteprestamo.component';
import { ReporteVacacionesComponent } from './reportevacaciones.component';
import { ReporteDecimosComponent } from './reportedecimos.component';
import { ReporteBoletosTipoComponent } from './reporteboletostipo.component';
import { ReporteGananciaComponent } from './reporteganacia.component';
import { ReporteBoletosGeneralComponent } from './reporteboletosgeneral.component';
import { ReporteEstadoCuentaComponent } from './reporteestadocuenta.component';
const routes: Routes = [
    {
        path: 'estadocuenta',
        component: ReporteEstadoCuentaComponent,
        data: {
            title: 'Reporte Estado Cuenta'
        }
    },
    {
        path: 'reporteboletogeneral',
        component: ReporteBoletosGeneralComponent,
        data: {
            title: 'Reporte de Boletos General'
        }
    },
    {
        path: 'reporteganancia',
        component: ReporteGananciaComponent,
        data: {
            title: 'Reporte de Ganancia'
        }
    },
    {
        path: 'reporteboletostipo',
        component: ReporteBoletosTipoComponent,
        data: {
            title: 'Reporte de Boleto Tipo'
        }
    },
    {
        path: 'reportedecimos',
        component: ReporteDecimosComponent,
        data: {
            title: 'Reporte de Decimos'
        }
    },
    {
        path: 'reportevacaciones',
        component: ReporteVacacionesComponent,
        data: {
            title: 'Reporte de Vacaciones'
        }
    },
    {
        path: 'reporteprestamo',
        component: ReportePrestamoComponent,
        data: {
            title: 'Reporte de Prestamo Empleado'
        }
    },
    {
        path: 'reporteantquincena',
        component: ReporteAntQuincenaComponent,
        data: {
            title: 'Reporte de Adelanto Quincena'
        }
    },
    {
        path: 'reportefalta',
        component: ReporteFaltaComponent,
        data: {
            title: 'Reporte Falta'
        }
    },
    {
        path: 'reportefinmes',
        component: ReporteFinMesComponent,
        data: {
            title: 'Reporte Fin Mes'
        }
    },
    {
        path: 'generasobrepagotmp',
        component: GeneraSobrePagoTMPComponent,
        data: {
            title: 'Genera Sobre Pago Temporal'
        }
    },
    {
        path: 'generasobrepago',
        component: GeneraSobrePagoComponent,
        data: {
            title: 'Genera Sobre Pago'
        }
    },
    {
        path: 'reportequincena',
        component: ReporteAnticipoQuincenaComponent,
        data: {
            title: 'Reporte Anticipo Quincena'
        }
    },
    {
        path: 'reporteproveedor',
        component: ReporteProveedorComponent,
        data: {
            title: 'Reporte Proveedor'
        }
    },
    {
        path: 'reporteentidad',
        component: ReporteEntidadComponent,
        data: {
            title: 'Reporte Entidad'
        }
    },
    {
        path: 'reporteperdidaganacia',
        component: ReportePerdidaGanaciaComponent,
        data: {
            title: 'Estado Perdida y Ganancia'
        }
    },
    {
        path: 'reportebalancegeneral',
        component: ReporteBalanceGeneralComponent,
        data: {
            title: 'Balance General'
        }
    },
    {
        path: 'reporteplancuenta',
        component: ReportePlanCuentaComponent,
        data: {
            title: 'Reporte Plan Cuenta'
        }
    },
    {
        path: 'reportecomprobante',
        component: ReporteAsientoContableComponent,
        data: {
            title: 'Reporte Comprobante Contable'
        }
    },
    {
        path: 'reporteboletos',
        component: ReporteBoletosComponent,
        data: {
            title: 'Reporte Boletos'
        }
    },
    {
        path: 'reportecontrato',
        component: ReporteContratoComponent,
        data: {
            title: 'Reporte Contrato'
        }
    },
    {
        path: 'reportecuentaxcobrar',
        component: ReporteCuentaxCobrarComponent,
        data: {
            title: 'Reporte Cuenta x Cobrar'
        }
    },
    {
        path: 'reportemargue',
        component: ReporteMargueComponent,
        data: {
            title: 'Reporte Marguen'
        }
    },
    {
        path: 'reportevalorespagados',
        component: ReporteValoresPagadoComponent,
        data: {
            title: 'Reporte Valores Pagados'
        }
    },
    {
        path: 'reportepago',
        component: ReportePagoComponent,
        data: {
            title: 'Reporte Pagos'
        }
    },
    {
        path: 'reportefactura',
        component: ReporteFacturacionComponent,
        data: {
            title: 'Reporte Facturacion'
        }
    }


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReporteRoutingModule {
}
