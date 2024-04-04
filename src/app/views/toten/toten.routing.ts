import { Routes } from '@angular/router';
import { AutoAtendimentoComponent } from './auto-atendimento/auto-atendimento.component';

export const TotenRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auto-atendimento',
        component: AutoAtendimentoComponent,
        data: { title: 'Auto Atendimenot', breadcrumb: 'Auto Atendimento' }
      }
    ]
  }
];