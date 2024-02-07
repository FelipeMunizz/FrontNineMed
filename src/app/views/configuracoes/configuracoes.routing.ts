import { Routes } from "@angular/router";
import { PerfilComponent } from "./perfil/perfil.component";

export const ConfiguracoesRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'perfil',
          component: PerfilComponent,
          data: { title: 'Perfil', breadcrumb: 'Perfil' }
        }]
    }
  ];