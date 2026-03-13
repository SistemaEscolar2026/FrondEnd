import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from '../principal/principal.component';

const routes: Routes = [
  {
    path: 'default',
    component: PrincipalComponent,
    data: {
      title: 'Principal'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule {
}
