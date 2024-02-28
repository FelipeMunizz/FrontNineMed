import { Routes } from '@angular/router';

import { ClinicaComponent } from './clinica/clinica.component';
import { PacienteComponent } from './paciente/paciente.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { ConvenioComponent } from './convenio/convenio.component';
import { ProcedimentoComponent } from './procedimento/procedimento.component';
import { TotenComponent } from './toten/toten.component';

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
        data: { title: 'Pacientes', breadcrump: 'Paciente' }
      },
      {
        path: 'funcionario',
        component: FuncionarioComponent,
        data: { title: 'Funcionarios', breadcrump: 'Funcionario' }
      },
      {
        path: 'convenio',
        component: ConvenioComponent,
        data: { title: 'Convenios', breadcrump: 'Convenios' }
      },
      {
        path: 'procedimento',
        component: ProcedimentoComponent,
        data: { title: 'Procedimentos', breadcrump: 'Procedimentos' }
      },
      {
        path: 'toten',
        component: TotenComponent,
        data: { title: 'Totens', breadcrump: 'Totens' }
      }]
  }
];