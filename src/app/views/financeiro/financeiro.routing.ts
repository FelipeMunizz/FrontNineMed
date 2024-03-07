import { Routes } from "@angular/router";
import { ControleComponent } from "./controle/controle.component";
import { BancoComponent } from "./banco/banco.component";
import { CategoriaFinanceiraComponent } from "./categoria-financeira/categoria-financeira.component";
import { CentroCustoComponent } from "./centro-custo/centro-custo.component";
import { ConfiguracaoFinanceiraComponent } from "./configuracao-financeira/configuracao-financeira.component";
import { ContaBancariaComponent } from "./conta-bancaria/conta-bancaria.component";

export const FinanceiroRoutes: Routes = [
    {
      path: "controle",
      component: ControleComponent,
      data: { title: 'Controle Financeiro', breadcrumb: 'Controle'}
    },
    {
      path: "banco",
      component: BancoComponent,
      data: { title: 'Bancos', breadcrumb: 'Banco'}
    },
    {
      path: "categoria-financeira",
      component: CategoriaFinanceiraComponent,
      data: { title: 'Categoria Financeira', breadcrumb: 'Controle'}
    },
    {
      path: "centro-custo",
      component: CentroCustoComponent,
      data: { title: 'Centro Custo', breadcrumb: 'Controle'}
    },
    {
      path: "configuracao-financeira",
      component: ConfiguracaoFinanceiraComponent,
      data: { title: 'Configuração Financeira', breadcrumb: 'Controle'}
    },
    {
      path: "conta-bancaria",
      component: ContaBancariaComponent,
      data: { title: 'Conta Bancária', breadcrumb: 'Controle'}
    }
    
  ];
  