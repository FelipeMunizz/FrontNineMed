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
        ControleComponent
    ],
    exports: []
})
export class FinanceiroModule { }
