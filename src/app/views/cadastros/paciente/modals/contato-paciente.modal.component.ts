import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ContatoPaciente } from "app/shared/models/paciente.model";
import { PacienteService } from "app/shared/services/app-models/paciente.service";
import { EnumService } from "app/shared/services/enum.service";
import { UtilityService } from "app/shared/services/utility.service";

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

export class ContatoPacienteModalComponent implements OnInit {
    idPaciente = this.data.idPaciente;
    contatoEdicao = this.data.contato;
    contatoForm: UntypedFormGroup;
    tipoContato: { value: number; label: string }[] = [];
    constructor(
        private pacienteService: PacienteService,
        private enumService: EnumService,
        private utilityService: UtilityService,
        @Inject(MAT_DIALOG_DATA) public data: { idPaciente?: number, contato?: ContatoPaciente }) {
        this.contatoEdicao = data.contato;
        this.idPaciente = data.idPaciente;
    }
    ngOnInit(): void {
        this.IniciaForm();
        this.tipoContato = this.enumService.getTipoContato();
        if (this.contatoEdicao)
            this.LoadDadosForm(this.contatoEdicao);
    }

    IniciaForm() {

        this.contatoForm = new UntypedFormGroup({
            nomeContato: new UntypedFormControl('', [
                Validators.required
            ]),
            numeroContato: new UntypedFormControl('', [
                Validators.required
            ]),
            tipoContato: new UntypedFormControl(0, [
                Validators.required
            ]),
            email: new UntypedFormControl('', [
                Validators.email,
                Validators.required
            ]),
            horarioComercial: new UntypedFormControl(false, []),
            lembretes: new UntypedFormControl(true, []),
        })
    }

    LoadDadosForm(contato?: ContatoPaciente) {
        var dados = this.dadosForm();
        dados['nomeContato'].setValue(contato.nome);
        dados['numeroContato'].setValue(contato.numeroContato);
        dados['email'].setValue(contato.email);
        dados['tipoContato'].setValue(contato.tipoContato);
        dados['horarioComercial'].setValue(contato.horarioComercial);
        dados['lembretes'].setValue(contato.lembretes);
    }

    SalvarClick() {
        if (this.contatoForm.invalid) {
            this.utilityService.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
            return;
        }
        var dados = this.dadosForm();
        var item = new ContatoPaciente;
        item.nome = dados['nomeContato'].value;
        item.numeroContato = dados['numeroContato'].value;
        item.email = dados['email'].value;
        item.tipoContato = parseInt(dados['tipoContato'].value);
        item.horarioComercial = dados['horarioComercial'].value;
        item.lembretes = dados['lembretes'].value;

        if (this.contatoEdicao) {
            item.id = this.contatoEdicao.id;
            item.idPaciente = this.contatoEdicao.idPaciente;

            this.pacienteService.AtualizarContatoPaciente(item)
                .subscribe((response) => {
                    this.utilityService.MostraToastr('Sucesso', 'Contato atualizado com sucesso', 'sucesso');
                },
                    (error) => {
                        this.utilityService.MostraToastr('Erro', 'Erro ao atualizar contato', 'erro');
                    })
        } else {
            item.idPaciente = this.idPaciente;
            this.pacienteService.AdicionarContatoPaciente(item)
                .subscribe((response) => {
                    this.utilityService.MostraToastr('Sucesso', response.message, 'sucesso');
                },
                    (error) => {
                        this.utilityService.MostraToastr('Erro', 'Erro ao adicionar contato', 'erro');
                    })
        }

    }

    //Metodos Auxiliares   
    dadosForm() {
        return this.contatoForm.controls;
    }
}