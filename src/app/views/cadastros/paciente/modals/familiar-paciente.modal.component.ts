import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FamiliarPaciente } from "app/shared/models/paciente.model";
import { PacienteService } from "app/shared/services/app-models/paciente.service";
import { UtilityService } from "app/shared/services/utility.service";

@Component({
    template: `
    <h2 mat-dialog-title>Dados Familiar</h2>
    <form [formGroup]="familiarForm">
        <mat-dialog-content>
        <div class="row">
            <div class="col col-lg-6 col-md-6 col-sm-12">
                <mat-form-field class="full-width">
                    <input matInput name="nomeFamiliar" formControlName="nomeFamiliar"
                        placeholder="Nome" value="">
                </mat-form-field>
            </div>
            <div class="col col-lg-6 col-md-6 col-sm-12">
                <mat-form-field class="full-width">
                    <input matInput name="grauParentesco" formControlName="grauParentesco"
                        placeholder="Grau de Parentesco" value="">
                </mat-form-field>
            </div>
        </div>
        <div class="row">
            <div class="col col-lg-4 col-md-4 col-sm-12">
                <mat-form-field class="full-width">
                    <input matInput name="telefoneFamiliar" formControlName="telefoneFamiliar"
                        placeholder="Telefone" value="" mask="(00) 00000-0000">
                </mat-form-field>
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

export class FamiliarPacienteModalComponent implements OnInit {
    familiarForm: UntypedFormGroup;
    familiarEdicao: FamiliarPaciente;
    idPaciente: number;

    constructor(
        private utility: UtilityService,
        private pacienteService: PacienteService,
        @Inject(MAT_DIALOG_DATA) public data: { idPaciente?: number, familiar?: FamiliarPaciente }) {
        this.familiarEdicao = data.familiar;
        this.idPaciente = data.idPaciente;
    }

    ngOnInit(): void {
        this.LoadForm();
        if (this.familiarEdicao)
            this.LoadDadosForm(this.familiarEdicao)

    }

    LoadForm() {
        this.familiarForm = new UntypedFormGroup({
            nomeFamiliar: new UntypedFormControl('', []),
            grauParentesco: new UntypedFormControl('', []),
            telefoneFamiliar: new UntypedFormControl('', [])
        })
    }

    LoadDadosForm(familiar?: FamiliarPaciente) {
        var dados = this.dadosForm();
        dados['nomeFamiliar'].setValue(familiar.nome);
        dados['grauParentesco'].setValue(familiar.grauParentesco);
        dados['telefoneFamiliar'].setValue(familiar.telefone);
    }

    SalvarClick() {
        debugger
        if (this.familiarForm.invalid) {
            this.utility.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
            return;
        }
        var dados = this.dadosForm();
        var item = new FamiliarPaciente;
        item.nome = dados['nomeFamiliar'].value;
        item.grauParentesco = dados['grauParentesco'].value;
        item.telefone = dados['telefoneFamiliar'].value;

        if (this.familiarEdicao) {
            item.id = this.familiarEdicao.id;
            item.idPaciente = this.familiarEdicao.idPaciente;

            this.pacienteService.AtualizarFamiliarPaciente(item)
                .subscribe((response) => {
                    this.utility.MostraToastr('Sucesso', 'Familiar atualizado com sucesso', 'sucesso');
                },
                    (error) => {
                        this.utility.MostraToastr('Erro', 'Erro ao atualizar familiar', 'erro');
                    })
        } else {
            item.idPaciente = this.idPaciente;
            this.pacienteService.AdicionarFamiliarPaciente(item)
                .subscribe((response) => {
                    this.utility.MostraToastr('Sucesso', response.message, 'sucesso');
                },
                    (error) => {
                        this.utility.MostraToastr('Erro', 'Erro ao adicionar familiar', 'erro');
                    })
        }

    }

    //Metodos Auxiliares
    dadosForm() {
        return this.familiarForm.controls;
    }
}