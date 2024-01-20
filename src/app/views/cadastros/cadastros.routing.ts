import { Routes } from '@angular/router';

import { ClinicaComponent } from './clinica/clinica.component';

export const CadastrosRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'clinica',
        component: ClinicaComponent,
        data: { title: 'Clinica', breadcrumb: 'Clinica' }
      }]
  }
];