import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../shared-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchModule } from '../search/search.module';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

// ONLY REQUIRED FOR **SIDE** NAVIGATION LAYOUT
import { HeaderSideComponent } from './header-side/header-side.component';
import { SidebarSideComponent } from './sidebar-side/sidebar-side.component';

// ALWAYS REQUIRED 
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AppComfirmComponent } from '../services/app-confirm/app-confirm.component';
import { AppLoaderComponent } from '../services/app-loader/app-loader.component';
import { ButtonLoadingComponent } from './button-loading/button-loading.component';
import { MatxSidebarComponent, MatxSidebarTogglerDirective } from './matx-sidebar/matx-sidebar.component';


const components = [
  SidenavComponent,
  SidebarSideComponent,
  HeaderSideComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  BreadcrumbComponent,
  AppComfirmComponent,
  AppLoaderComponent,
  ButtonLoadingComponent,
  MatxSidebarComponent,
  FooterComponent,
  MatxSidebarTogglerDirective,
]

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    FlexLayoutModule,
    SearchModule,
    SharedPipesModule,
    SharedDirectivesModule,
    SharedMaterialModule
  ],
  declarations: components,
  exports: components
})
export class SharedComponentsModule {}