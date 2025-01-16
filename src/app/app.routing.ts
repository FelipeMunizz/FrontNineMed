import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/analytics',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session' }
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' }
      },
      {
        path: 'cadastros',
        loadChildren: () => import('./views/cadastros/cadastros.module').then(m => m.CadastrosModule),
        data: { title: 'Cadastros', breadcrumb: 'Cadastros' }
      },
      {
        path: 'recepcao',
        loadChildren: () => import('./views/recepcao/recepcao.module').then(m => m.RecepcaoModule),
        data: { title: 'Recepção', breadcrumb: 'Recepção' }
      },
      {
        path: 'configuracoes',
        loadChildren: () => import('./views/configuracoes/configuracoes.module').then(m => m.ConfiguracoesModule),
        data: { title: 'Perfil', breadcrumb: 'Perfil' }
      },
      {
        path: 'financeiro',
        loadChildren: () => import('./views/financeiro/financeiro.module').then(m => m.FinanceiroModule),
        data: { title: 'Financeiro', breadcrumb: 'Financeiro' }
      },
      {
        path: 'toten',
        loadChildren: () => import('./views/toten/toten.module').then(m => m.TotenModule),
        data: { title: 'Toten', breadcrumb: 'Toten' }
      },
      {
        path: 'atendimento',
        loadChildren: () => import('./views/atendimento/atendimento.module').then(m => m.AtendimentoModule),
        data: {title: 'Atendimento', breadcrumb: 'Atendimento'}
      },
      {
        path: 'relatorios',
        loadChildren: () => import('./views/relatorios/relatorios.module').then(m => m.RelatoriosModule),
        data: { title: 'Relatórios', breadcrumb: 'Relatórios' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

