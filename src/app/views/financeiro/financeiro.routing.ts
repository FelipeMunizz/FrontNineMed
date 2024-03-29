import { Routes } from "@angular/router";
import { ControleComponent } from "./controle/controle.component";
import { BancoComponent } from "./banco/banco.component";
import { CategoriaFinanceiraComponent } from "./categoria-financeira/categoria-financeira.component";
import { CentroCustoComponent } from "./centro-custo/centro-custo.component";
import { ConfiguracaoFinanceiraComponent } from "./configuracao-financeira/configuracao-financeira.component";
import { ContaBancariaComponent } from "./conta-bancaria/conta-bancaria.component";
import { SubCategoriaComponent } from "./categoria-financeira/sub-categoria/sub-categoria.component";
import { FormaPagamentoComponent } from "./forma-pagamento/forma-pagamento.component";

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
      data: { title: 'Categoria Financeira', breadcrumb: 'Categorias'}
    },
    {
      path: "centro-custo",
      component: CentroCustoComponent,
      data: { title: 'Centro Custo', breadcrumb: 'CentroCusto'}
    },
    {
      path: "configuracao-financeira",
      component: ConfiguracaoFinanceiraComponent,
      data: { title: 'Configuração Financeira', breadcrumb: 'Config'}
    },
    {
      path: "conta-bancaria",
      component: ContaBancariaComponent,
      data: { title: 'Conta Bancária', breadcrumb: 'Conta'}
    },
    {
      path: "sub-categoria",
      component: SubCategoriaComponent,
      data: { title: 'Sub Categoria', breadcrumb: 'Sub Categoria'}
    } ,
    {
      path: "forma-pagamento",
      component: FormaPagamentoComponent,
      data: { title: 'Formas de Pagamento', breadcrumb: 'Formas de Pagamento'}
    }    
  ];
  