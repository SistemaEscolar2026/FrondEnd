import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados.component';
import { EmpleadosConfigComponent } from './empleadosconfig.component';
import { FaltaComponent } from './falta.component';
import { NominaRubroComponent } from './nominarubro.component';
import { PermisoIESSComponent } from './permisoiess.component';
import { AnticipoComponent } from './anticipo.component';
import { AnticipoQuincenaComponent } from './anticipoquincena.component';
import { PrestamoComponent } from './prestamo.component';
import { NominaFinMesComponent } from './nominafinmes.component';
import { VacacionesComponent } from './vacaciones.component';
import { PagoDecimo14Component } from './pagodecimo14.component';
import { PagoDecimo13Component } from './pagodecimo13.component';
import { FiniquitoComponent } from './finiquito.component';
import { EstadoCuentaEmpleadoComponent } from './estadocuenta.component';
const routes: Routes = [
    {
        path: 'estadocuenta',
        component: EstadoCuentaEmpleadoComponent,
        data: {
            title: 'NOMINA - Estado Cuenta Empleado'
        }
    },
    {
        path: 'finiquito',
        component: FiniquitoComponent,
        data: {
            title: 'NOMINA - Finiquito'
        }
    },
    {
        path: 'decimos14',
        component: PagoDecimo14Component,
        data: {
            title: 'NOMINA - Pago Decimo 14'
        }
    },
    {
        path: 'decimos13',
        component: PagoDecimo13Component,
        data: {
            title: 'NOMINA - Pago Decimo 13'
        }
    },
    {
        path: 'vacaciones',
        component: VacacionesComponent,
        data: {
            title: 'NOMINA - Vacaciones'
        }
    },
    {
        path: 'nominafinmes',
        component: NominaFinMesComponent,
        data: {
            title: 'NOMINA - Fin Mes'
        }
    },
    {
        path: 'anticipoquincena',
        component: AnticipoQuincenaComponent,
        data: {
            title: 'NOMINA - Anticipo Quincena'
        }
    },
    {
        path: 'prestamo',
        component: PrestamoComponent,
        data: {
            title: 'NOMINA - Prestamo'
        }
    },
    {
        path: 'anticipo',
        component: AnticipoComponent,
        data: {
            title: 'NOMINA - Anticipo'
        }
    },
    {
        path: 'permisoiess',
        component: PermisoIESSComponent,
        data: {
            title: 'NOMINA - Permiso IESS'
        }
    },
    {
        path: 'nominarubro',
        component: NominaRubroComponent,
        data: {
            title: 'NOMINA - Rubro'
        }
    },
    {
        path: 'faltas',
        component: FaltaComponent,
        data: {
            title: 'NOMINA - Falta'
        }
    },
    {
        path: 'ingresoempleado',
        component: EmpleadosComponent,
        data: {
            title: 'Ingreso Empleado'
        }
    },
    {
        path: 'empleadoconfig',
        component: EmpleadosConfigComponent,
        data: {
            title: 'Configuracion Empleado'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NominaRoutingModule {
}
