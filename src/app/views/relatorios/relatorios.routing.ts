import { Routes } from "@angular/router";
import { AtestadoReportComponent } from "./atestado-report/atestado-report.component";

export const RelatoriosRoutes: Routes = [
  {
    path: '',
    children: [
      {
        
        path: 'atestado',
        component: AtestadoReportComponent,
        data: { title: 'Atestado', breadcrumb: 'Atestado' }
      }
    ]
  }
];