import { NgModule } from '@angular/core';
import { FinanceiroRoutes } from './financeiro.routing';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { NgChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskModule } from 'ngx-mask';
import { ControleComponent } from './controle/controle.component';
import { BancoComponent } from './banco/banco.component';
import { ContaBancariaComponent } from './conta-bancaria/conta-bancaria.component';
import { CategoriaFinanceiraComponent } from './categoria-financeira/categoria-financeira.component';
import { CentroCustoComponent } from './centro-custo/centro-custo.component';
import { ConfiguracaoFinanceiraComponent } from './configuracao-financeira/configuracao-financeira.component';

@NgModule({
    imports: [
        CommonModule,
        SharedMaterialModule,
        FlexLayoutModule,
        NgChartsModule,
        SharedPipesModule,
        RouterModule.forChild(FinanceiroRoutes),
        MatTooltipModule,
        MatDialogModule,
        NgxMaskModule.forRoot(),
        MatSelectModule,
    ],
    declarations: [
        ControleComponent,
        BancoComponent,
        ContaBancariaComponent,
        CategoriaFinanceiraComponent,
        CentroCustoComponent,
        ConfiguracaoFinanceiraComponent,
    ],
    exports: []
})
export class FinanceiroModule { }
