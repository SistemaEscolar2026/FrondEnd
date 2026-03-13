import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AprobarPreDespachoComponent } from '../operativo/aprobarpredespacho.component';


const routes: Routes = [
  {
    path: 'aprobacionpredespacho',
    component: AprobarPreDespachoComponent,
    data: {
      title: 'Aprobación Predespacho'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperativoRoutingModule {
}
