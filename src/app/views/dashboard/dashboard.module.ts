import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DashboardRoutes } from "./dashboard.routing";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FileUploadModule } from "ng2-file-upload";
import { NgxMaskModule } from "ngx-mask";
import { QuillModule } from "ngx-quill";
import { ChamadaSenhaModalComponent } from './analytics/chamada-senha-modal/chamada-senha-modal.component';

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
    MatTooltipModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
    MatSelectModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [AnalyticsComponent, ChamadaSenhaModalComponent],
  exports: []
})
export class DashboardModule {}
