import { Routes } from "@angular/router";
import { ControleComponent } from "./controle/controle.component";
import { CadastroFinanceiroComponent } from "./cadastro-financeiro/cadastro-financeiro.component";

export const FinanceiroRoutes: Routes = [
    {
      path: "controle",
      component: ControleComponent,
      data: { title: 'Controle Financeiro', breadcrumb: 'Controle'}
    },
    {
      path: "cadastro-financeiro",
      component: CadastroFinanceiroComponent,
      data: { title: 'Cadastro Financeiro', breadcrumb: 'Cadastro'}
    }
  ];
  