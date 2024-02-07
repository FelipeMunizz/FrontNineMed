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
        data: { title: 'Session'}
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
        data: { title: 'Dashboard', breadcrumb: 'DASHBOARD'}
      },
      {
        path: 'cadastros',
        loadChildren: () => import('./views/cadastros/cadastros.module').then(m => m.CadastrosModule),
        data: { title: 'Cadastros', breadcrumb: 'Cadastros'}
      },
      {
        path: 'configuracoes',
        loadChildren: () => import('./views/configuracoes/configuracoes.module').then(m => m.ConfiguracoesModule),
        data: { title: 'Perfil', breadcrumb: 'Perfil'}
      }    
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

