import { Routes } from '@angular/router';
import { AutoAtendimentoComponent } from './auto-atendimento/auto-atendimento.component';
import { ListaChamadaComponent } from './lista-chamada/lista-chamada.component';

export const TotenRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auto-atendimento',
        component: AutoAtendimentoComponent,
        data: { title: 'Auto Atendimento', breadcrumb: 'Auto Atendimento' }
      },
      {
        path: 'lista-chamada',
        component: ListaChamadaComponent,
        data: { title: 'Lista Chamadas', breadcrumb: 'Auto Atendimento' }
      }
    ]
  }
];