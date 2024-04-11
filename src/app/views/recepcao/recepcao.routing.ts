import { Routes } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';

export const RecepcaoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'agenda',
        component: AgendaComponent,
        data: { title: 'Augenda', breadcrumb: 'Agenda' }
      }
    ]
  }
];