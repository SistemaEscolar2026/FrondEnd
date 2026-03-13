import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AprobarComprasComponent } from '../compras/aprobarcompras.component';
import { EstadoCuentaCXPComponent } from '../compras/estadocuentacxp.component';

const routes: Routes = [
  {
    path: 'aprobarordencompra',
    component: AprobarComprasComponent,
    data: {
      title: 'Aprobar Órdenes Compra'
    }
  },
  {
    path: 'estadocuenta',
    component: EstadoCuentaCXPComponent,
    data: {
      title: 'Estado de Cuenta CXP'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule {
}
