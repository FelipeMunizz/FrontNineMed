import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { FileUploadModule } from 'ng2-file-upload';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskModule } from 'ngx-mask';
import { CustomPaginator } from 'app/shared/helpers/custom-paginator';
import { MatSelectModule } from '@angular/material/select';
import { TotenRoutes } from './toten.routing';
import { ListaChamadaComponent } from './lista-chamada/lista-chamada.component';
import { AutoAtendimentoComponent } from './auto-atendimento/auto-atendimento.component';
import { QrCodeModule } from 'ng-qrcode';



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
    RouterModule.forChild(TotenRoutes),
    MatTooltipModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
    MatSelectModule,
    QrCodeModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ],
  declarations: [  
    ListaChamadaComponent,
    AutoAtendimentoComponent
  ],
})
export class TotenModule {}
