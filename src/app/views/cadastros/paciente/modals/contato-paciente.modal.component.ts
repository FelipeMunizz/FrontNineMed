import { Component, OnInit } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";

@Component({
    template: `
<h2 mat-dialog-title>Contato Clinica</h2> 
<form [formGroup]="contatoForm">
    <mat-dialog-content>
        <div class="row">
            <div class="col col-lg-4 col-md-4 col-sm-12">
                <mat-form-field class="full-width">
                    <input matInput name="nomeContato" formControlName="nomeContato" placeholder="Nome Contato" value="">
                </mat-form-field>
                <small *ngIf="contatoForm.controls['nomeContato'].touched" class="form-error-msg"> </small>
            </div>
            <div class="col col-lg-4 col-md-4 col-sm-12">
                <mat-form-field class="full-width">
                    <input matInput name="numeroContato" formControlName="numeroContato" placeholder="Número Contato" value="" mask="(00) 00000-0000">
                </mat-form-field>
                <small *ngIf="contatoForm.controls['numeroContato'].touched" class="form-error-msg">
                </small>
            </div>
            <div class="col col-lg-4 col-md-4 col-sm-12">
                <mat-form-field class="full-width">
                    <mat-label>Tipo de Contato</mat-label>
                    <mat-select matNativeControl formControlName="tipoContato" class="dropdown-menu">
                        <mat-option class="dropdown-item" *ngFor="let tpContato of tipoContato" [value]="tpContato.value">
                            {{ tpContato.label }}
                        </mat-option>
                    </mat-select>
                </mat-form-field>
                <small *ngIf="contatoForm.controls['tipoContato'].touched" class="form-error-msg"> </small>
            </div>
        </div>
        <div class="row">
            <div class="col col-lg-6 col-md-6 col-sm-12">
                <mat-form-field class="full-width">
                    <input matInput name="email" formControlName="email" placeholder="Email" value="">
                </mat-form-field>
                <small *ngIf="contatoForm.controls['email'].touched" class="form-error-msg"> </small>
            </div>
            <div class="col col-lg-3 col-md-3 col-sm-12">
                <mat-checkbox name="horarioComercial" formControlName="horarioComercial" class="pb-16">Horário Comercial</mat-checkbox>
            </div>
            <div class="col col-lg-3 col-md-3 col-sm-12">
                <mat-checkbox name="lembretes" formControlName="lembretes" class="pb-16">Lembretes</mat-checkbox>
            </div>
        </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button type="button" mat-button [mat-dialog-close]="false">Cancelar</button> 
      <span fxFlex></span>
      <button class="btn btn-primary" [mat-dialog-close]="true" (click)="SalvarClick()" cdkFocusInitial>Salvar</button>
    </mat-dialog-actions>
</form>

    `
})

export class ContatoPacienteModalComponent implements OnInit{
    contatoForm: UntypedFormGroup;
    tipoContato: { value: number; label: string }[] = [];

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    SalvarClick(){

    }
}