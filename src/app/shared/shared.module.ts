import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// SERVICES
import { ThemeService } from './services/theme.service';
import { NavigationService } from "./services/navigation.service";
import { RoutePartsService } from './services/route-parts.service';
import { AuthGuard } from './guards/auth.guard';
import { UserRoleGuard } from './guards/user-role.guard';
import { AppConfirmService } from './services/app-confirm/app-confirm.service';
import { AppLoaderService } from './services/app-loader/app-loader.service';

import { SharedComponentsModule } from './components/shared-components.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { BancoService } from './services/app-models/banco.service';
import { CategoriaFinanceiraService } from './services/app-models/categoria-financeira.service';
import { CentroCustoService } from './services/app-models/centro-custo.service';
import { ClinicaService } from './services/app-models/clinica.service';
import { ConfiguracaoClinicaService } from './services/app-models/configuracao-clinica.service';
import { ConfiguracaoFinanceiraService } from './services/app-models/configuracao-financeira.service';
import { ContaBancariaService } from './services/app-models/conta-bancaria.service';
import { ConvenioService } from './services/app-models/convenio.service';
import { FormaPagamentoService } from './services/app-models/forma-pagamento.service';
import { LancamentoService } from './services/app-models/lancamento.service';
import { PacienteService } from './services/app-models/paciente.service';
import { ProcedimentoService } from './services/app-models/procedimento.service';
import { SubCategoriaFinanceiraService } from './services/app-models/sub-categoria.service';
import { TotenService } from './services/app-models/toten.service';
import { UtilityService } from './services/utility.service';
import { EnumService } from './services/enum.service';
import { AgendamentoService } from './services/app-models/agendamento.service';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule
  ],
  providers: [
    ThemeService,
    NavigationService,
    RoutePartsService,
    AuthGuard,
    UserRoleGuard,
    AppConfirmService,
    AppLoaderService,
    BancoService,
    CategoriaFinanceiraService,
    CentroCustoService,
    ClinicaService,
    ConfiguracaoClinicaService,
    ConfiguracaoFinanceiraService,
    ContaBancariaService,
    ConvenioService,
    FormaPagamentoService,
    LancamentoService,
    PacienteService,
    ProcedimentoService,
    SubCategoriaFinanceiraService,
    TotenService,
    UtilityService,
    EnumService,
    AgendamentoService
  ],
  exports: [
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule
  ]
})
export class SharedModule { }
