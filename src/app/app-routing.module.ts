import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from '../app/containers/master/master.component';
import { LoginComponent } from '../app/seguridad/login/login.component';
import { CambioClaveComponent } from './seguridad/cambioclave.component';
const routes: Routes = [{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
},
{
    path: 'login',
    component: LoginComponent,
    data: {
        title: 'Login'
    }
},
{
    path: 'cambioclave',
    component: CambioClaveComponent,
    data: {
        title: 'Cambio de Clave'
    }
},
{
    path: '',
    component: MasterComponent,
    data: {
        title: 'Home'
    },
    children: [
        {
            path: 'principal',
            loadChildren: () =>
                import('../app/principal/principal.module').then((m) => m.PrincipalModule)
        },
        {
            path: 'educativo',
            loadChildren: () =>
                import('../app/educativo/educativo.module').then((m) => m.EducativoModule)
        },
        {
            path: 'matenimiento',
            loadChildren: () =>
                import('../app/matenimiento/mantenimiento.module').then((m) => m.MantenimientoModule)
        },
        {
            path: 'ventas',
            loadChildren: () =>
                import('../app/ventas/ventas.module').then((m) => m.VentasModule)
        },
        {
            path: 'compras',
            loadChildren: () =>
                import('../app/compras/compras.module').then((m) => m.ComprasModule)
        },
        {
            path: 'boletos',
            loadChildren: () =>
                import('../app/boletos/boletos.module').then((m) => m.BoletosModule)
        },
        {
            path: 'reporte',
            loadChildren: () =>
                import('../app/reporte/reporte.module').then((m) => m.ReporteModule)
        },
        {
            path: 'cuentaxcobrar',
            loadChildren: () =>
                import('../app/cuentaxcobrar/cuentaxcobrar.module').then((m) => m.CuentaxCobrarModule)
        },
        {
            path: 'facturacion',
            loadChildren: () =>
                import('../app/facturacion/facturacion.module').then((m) => m.FacturacionModule)
        },
        {
            path: 'cuentaxpagar',
            loadChildren: () =>
                import('../app/cuentaxpagar/cuentaxpagar.module').then((m) => m.CuentaxPagarModule)
        },
        {
            path: 'ordencompra',
            loadChildren: () =>
                import('../app/ordencompra/ordencompra.module').then((m) => m.OrdenCompraModule)
        },
        {
            path: 'contabilidad',
            loadChildren: () =>
                import('../app/contabilidad/contabilidad.module').then((m) => m.ContabilidadModule)
        },
        {
            path: 'nomina',
            loadChildren: () =>
                import('../app/nomina/nomina.module').then((m) => m.NominaModule)
        },
        {
            path: 'seguridad',
            loadChildren: () =>
                import('../app/seguridad/seguridad.module').then((m) => m.SeguridadModule)
        },
        {
            path: 'bancos',
            loadChildren: () =>
                import('../app/bancos/bancos.module').then((m) => m.BancosModule)
        },
        {
            path: 'sri',
            loadChildren: () =>
                import('../app/sri/sri.module').then((m) => m.SriModule)
        }
    ]
}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
        initialNavigation: 'enabledBlocking',
        useHash: true
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
