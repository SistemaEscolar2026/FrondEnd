import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoComponent } from './curso.component';
import { NivelComponent } from './nivel.component';
import { ParaleloComponent } from './paralelo.component';
import { DocenteComponent } from './docente.component';
import { MateriaComponent } from './materia.component';
import { PeriodoComponent } from './periodo.component';
import { HorarioClaseComponent } from './horarioclase.component';
import { CursoMateriaComponent } from './cursomateria.component';
const routes: Routes = [
    {
        path: 'cursomateria',
        component: CursoMateriaComponent,
        data: {
            title: 'Curso Materia'
        }
    },
    {
        path: 'horario',
        component: HorarioClaseComponent,
        data: {
            title: 'Horario Clase'
        }
    },
    {
        path: 'periodo',
        component: PeriodoComponent,
        data: {
            title: 'Periodo Electivo'
        }
    },
    {
        path: 'docente',
        component: DocenteComponent,
        data: {
            title: 'Docente'
        }
    },
    {
        path: 'curso',
        component: CursoComponent,
        data: {
            title: 'Curso'
        }
    },
    {
        path: 'materia',
        component: MateriaComponent,
        data: {
            title: 'Materia'
        }
    },
    {
        path: 'nivel',
        component: NivelComponent,
        data: {
            title: 'Nivel'
        }
    },
    {
        path: 'paralelo',
        component: ParaleloComponent,
        data: {
            title: 'Paralelo'
        }
    }



];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EducativoRoutingModule {
}
