import { Routes } from '@angular/router';

import { ClinicaComponent } from './clinica/clinica.component';
import { PacienteComponent } from './paciente/paciente.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';

export const CadastrosRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'clinica',
        component: ClinicaComponent,
        data: { title: 'Clinica', breadcrumb: 'Clinica' }
      },
      {
        path: 'paciente',
        component: PacienteComponent,
        data: {title: 'Paciente', breadcrump: 'Paciente'}
      },
      {
        path: 'funcionario',
        component: FuncionarioComponent,
        data: {title: 'Funcionario', breadcrump: 'Funcionario'}
      }]
  }
];