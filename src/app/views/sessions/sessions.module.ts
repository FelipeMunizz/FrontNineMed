import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { SharedMaterialModule } from 'app/shared/shared-material.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { SigninComponent } from './signin/signin.component';
import { SessionsRoutes } from "./sessions.routing";
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(SessionsRoutes)
  ],
  declarations: [SigninComponent, NotFoundComponent]
})
export class SessionsModule { }