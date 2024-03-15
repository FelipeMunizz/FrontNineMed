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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { CustomPaginator } from 'app/shared/helpers/custom-paginator';
import { FileUploadModule } from 'ng2-file-upload';
import { QuillModule } from 'ngx-quill';
import { SubCategoriaComponent } from './categoria-financeira/sub-categoria/sub-categoria.component';
import { FormaPagamentoComponent } from './forma-pagamento/forma-pagamento.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatListModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatRadioModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        MatStepperModule,
        FlexLayoutModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        MatTableModule,
        QuillModule.forRoot(),
        FileUploadModule,
        RouterModule.forChild(FinanceiroRoutes),
        MatTooltipModule,
        MatDialogModule,
        NgxMaskModule.forRoot(),
        MatSelectModule,
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: CustomPaginator }
    ],
    declarations: [
        ControleComponent,
        BancoComponent,
        ContaBancariaComponent,
        CategoriaFinanceiraComponent,
        CentroCustoComponent,
        ConfiguracaoFinanceiraComponent,
        SubCategoriaComponent,
        FormaPagamentoComponent,
    ],
    exports: []
})
export class FinanceiroModule { }
