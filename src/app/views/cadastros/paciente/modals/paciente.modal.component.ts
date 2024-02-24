import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Paciente } from "app/shared/models/paciente.model";
import { PacienteService } from "app/shared/services/app-models/paciente.service";
import { EnumService } from "app/shared/services/enum.service";
import { UtilityService } from "app/shared/services/utility.service";

@Component({
    template: `
    <h2 mat-dialog-title>Dados Paciente</h2>
    <form [formGroup]="pacienteForm">
        <mat-dialog-content>
        <div class="row">
            <div class="col col-lg-6 col-md-6 col-sm-12">
                <mat-form-field class="full-width">
                    <input matInput name="nome" formControlName="nome" placeholder="Nome" value=""
                        class="p-16">
                </mat-form-field>
                <small *ngIf="pacienteForm.controls['nome'].touched" class="form-error-msg"> </small>
            </div>
            <div class="col col-lg-6 col-md-6 col-sm-12">
                <mat-form-field class="full-width">
                    <mat-datepicker-toggle matIconSuffix [for]="picker" style="display: flex; align-items: end; justify-content: end;"></mat-datepicker-toggle>
                    <mat-datepicker #picker></mat-datepicker>
                    <input matInput [matDatepicker]="picker" formControlName="dataNascimento"
                        placeholder="Data de Nascimento">
                </mat-form-field>
            </div>
            </div>
            <div class="row">
                <div class="col col-lg-6 col-md-6 col-sm-12">
                    <mat-form-field class="full-width">
                        <mat-label>Estado Civil</mat-label>
                        <mat-select matNativeControl formControlName="estadoCivil" class="dorpdown-menu">
                            <mat-option class="dropdown-item" *ngFor="let estadoCivil of estadosCivil"
                                [value]="estadoCivil.value">
                                {{ estadoCivil.label }}</mat-option>
                        </mat-select>
                    </mat-form-field>
                </div>
                <div class="col col-lg-6 col-md-6 col-sm-12">
                    <mat-form-field class="full-width">
                        <input matInput name="profissao" formControlName="profissao" placeholder="Profissao"
                            value="">
                    </mat-form-field>
                    <small *ngIf="pacienteForm.controls['profissao'].touched" class="form-error-msg">
                    </small>
                </div>
            </div>
            <div class="row">
                <div class="col col-lg-6 col-md-6 col-sm-12">
                    <mat-form-field class="full-width">
                        <input matInput name="rg" formControlName="rg" placeholder="RG" value=""
                            mask="00.000.000-0">
                    </mat-form-field>
                    <small *ngIf="pacienteForm.controls['rg'].touched" class="form-error-msg"> </small>
                </div>
                <div class="col col-lg-6 col-md-6 col-sm-12">
                    <mat-form-field class="full-width">
                        <input matInput name="cpf" formControlName="cpf" placeholder="CPF" value=""
                            mask="000.000.000-00">
                    </mat-form-field>
                    <small *ngIf="pacienteForm.controls['cpf'].touched" class="form-error-msg"> </small>
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

export class PacienteModalComponent implements OnInit {
    pacienteForm: UntypedFormGroup;
    pacienteEdicao: Paciente;
    estadosCivil: { value: number, label: string }[] = [];

    constructor(
        private pacienteService: PacienteService,
        private utilityService: UtilityService,
        private enumService: EnumService,
        @Inject(MAT_DIALOG_DATA) public data: { paciente?: Paciente }) {
        this.pacienteEdicao = data.paciente;
    }

    ngOnInit() {
        this.LoadForm();
        this.estadosCivil = this.enumService.getEstadoCivil();
        this.LoadDadosForm(this.pacienteEdicao);
    }

    LoadForm() {
        this.pacienteForm = new UntypedFormGroup({
            nome: new UntypedFormControl('', [
                Validators.required
            ]),
            dataNascimento: new UntypedFormControl('', [
                Validators.required
            ]),
            estadoCivil: new UntypedFormControl('', [
                Validators.required
            ]),
            rg: new UntypedFormControl('', [
                Validators.required
            ]),
            cpf: new UntypedFormControl('', [
                Validators.required
            ]),
            profissao: new UntypedFormControl('', [
                Validators.required
            ])
        })
    }

    LoadDadosForm(paciente: Paciente) {
        var dados = this.dadosForm();

        dados['nome'].setValue(paciente.nome);
        dados['dataNascimento'].setValue(paciente.dataNascimento);
        dados['estadoCivil'].setValue(paciente.estadoCivil);
        dados['rg'].setValue(paciente.rg);
        dados['cpf'].setValue(paciente.cpf);
        dados['profissao'].setValue(paciente.profissao);
    }

    SalvarClick() {
        console.log(this.pacienteEdicao)

    }

    //Metodos Auxiliares
    dadosForm() {
        return this.pacienteForm.controls;
    }
}