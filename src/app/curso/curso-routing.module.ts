import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarUsuarioComponent } from './componente/agregar-usuario/agregar-usuario.component';
import { CrearCursoComponent } from './componente/crear-curso/crear-curso.component';
import { CursoComponent } from './componente/curso/curso.component';

const routes: Routes = [
  {
    path: '',
    component: CursoComponent,
  },
  /*  {
    path: 'agregar-usuario',
    component: AgregarUsuarioComponent,
  }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoRoutingModule {}
