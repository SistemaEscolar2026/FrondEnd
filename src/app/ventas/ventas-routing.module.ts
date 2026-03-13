import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoPedidoComponent } from '../ventas/ingresopedido.component';

const routes: Routes = [
  {
    path: 'ingresopedido',
    component: IngresoPedidoComponent,
    data: {
      title: 'Ingreso Pedido'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule {
}
