import { Routes } from '@angular/router';
import { EditarClinicaComponent } from './editar-clinica/editar-clinica.component';


export const EditarRoutes: Routes = [
  {
    path: '',
    children: [
        {
          path: 'clinica',
          component: EditarClinicaComponent,
          data: { title: 'Clinica', breadcrumb: 'Clinica' }
        },
      ]
  }
];