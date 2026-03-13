import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfiComponent } from '../seguridad/perfil.component';
import { CambioMenuPerfilComponent } from '../seguridad/cambiomenuperfil.component';
import { CambioMenuComponent } from '../seguridad/cambiomenu.component';

const routes: Routes = [
    {
        path: 'cambiomenu',
        component: CambioMenuComponent,
        data: {
            title: 'Cambio Menu'
        }
    },
    {
        path: 'cambiomenuperfil',
        component: CambioMenuPerfilComponent,
        data: {
            title: 'Cambio Menu Perfil'
        }
    },
    {
        path: 'perfilusuario',
        component: PerfiComponent,
        data: {
            title: 'Perfil Usuario'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeguridadRoutingModule {
}
