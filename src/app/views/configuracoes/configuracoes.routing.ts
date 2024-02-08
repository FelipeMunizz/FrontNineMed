import { Routes } from "@angular/router";
import { PerfilComponent } from "./perfil/perfil.component";
import { ConfiguracaoClinicaComponent } from "./configuracao-clinica/configuracao-clinica.component";

export const ConfiguracoesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { title: 'Perfil', breadcrumb: 'Perfil' }
      },
      {
        path: 'configuracao-clinica',
        component: ConfiguracaoClinicaComponent,
        data: {title: 'Configuracao Clinica', breadcrumb: 'Configuracao Clinica'}
      }]
  }
];