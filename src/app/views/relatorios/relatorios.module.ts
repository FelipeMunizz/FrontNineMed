import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { CustomPaginator } from "app/shared/helpers/custom-paginator";
import { QrCodeModule } from "ng-qrcode";
import { FileUploadModule } from "ng2-file-upload";
import { NgxMaskModule } from "ngx-mask";
import { QuillModule } from "ngx-quill";
import { RelatoriosRoutes } from "./relatorios.routing";
import { AtestadoReportComponent } from './atestado-report/atestado-report.component';

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
    RouterModule.forChild(RelatoriosRoutes),
    MatTooltipModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
    MatSelectModule,
    QrCodeModule,
    MatAutocompleteModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ],
  declarations: [      
    AtestadoReportComponent
  ],
})

export class RelatoriosModule { }