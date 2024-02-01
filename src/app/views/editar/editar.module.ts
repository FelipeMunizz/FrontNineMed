import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatRadioModule } from "@angular/material/radio";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { FileUploadModule } from "ng2-file-upload";
import { QuillModule } from "ngx-quill";
import { EditarRoutes } from "./editar.routing";
import { EditarClinicaComponent } from './editar-clinica/editar-clinica.component';

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
      RouterModule.forChild(EditarRoutes),
      MatTooltipModule
    ],
    declarations: [
    EditarClinicaComponent
  ],
  })
  export class EditarModule {}
  