import { Routes } from "@angular/router";
import { ControleComponent } from "./controle/controle.component";

export const FinanceiroRoutes: Routes = [
    {
      path: "controle",
      component: ControleComponent,
      data: { title: 'Controle Financeiro', breadcrumb: 'Controle'}
    }
  ];
  