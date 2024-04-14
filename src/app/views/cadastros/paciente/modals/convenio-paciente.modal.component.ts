import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Convenio } from "app/shared/models/convenio.model";
import { ConvenioPaciente } from "app/shared/models/paciente.model";
import { SelectedModel } from "app/shared/models/selected-model";
import { User } from "app/shared/models/user.model";
import { ConvenioService } from "app/shared/services/app-models/convenio.service";
import { PacienteService } from "app/shared/services/app-models/paciente.service";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { UtilityService } from "app/shared/services/utility.service";

@Component({
    template: `
    <h2 mat-dialog-title>Dados Convênio</h2>
    <form [formGroup]="convenioForm">
        <mat-dialog-content>
            <div class="row">
                <div class="col col-lg-4 col-md-4 col-sm-12">
                    <mat-form-field class="full-width">
                        <mat-label>Convenio</mat-label>
                        <mat-select matNativeControl formControlName="idConvenio"
                            class="dorpdown-menu p-16">
                            <mat-option *ngFor="let convenio of listaConvenios"
                                [value]="convenio.id">{{convenio.name}}</mat-option>
                        </mat-select>
                    </mat-form-field>
                </div>
                <div class="col col-lg-6 col-md-6 col-sm-12">
                    <mat-form-field class="full-width">
                        <input matInput name="numeroCarteirinha" formControlName="numeroCarterinha"
                            placeholder="Número Carteirinha" value="" class="p-16">
                    </mat-form-field>
                </div>            
            </div>
            <div class="row">
                <div class="col col-lg-5 col-md-5 col-sm-12">
                    <mat-form-field class="full-width">
                    <input matInput [matDatepicker]="picker" placeholder="Validade" name="validade">
                    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                    <mat-datepicker touchUi #picker></mat-datepicker>
                    </mat-form-field>
                </div>
            </div>
            <div class="row">
                <div class="col col-lg-6 col-md-6 col-sm-12">
                    <mat-form-field class="full-width">
                        <input matInput name="observacoes" formControlName="observacoes"
                            placeholder="Observações" value="">
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

export class ConvenioPacienteModalComponent implements OnInit {
    convenioForm: UntypedFormGroup;
    user: User = {};
    convenioEdicao: ConvenioPaciente;
    idPaciente: number;

    listaConvenios: Array<SelectedModel>;
    convenioSelected: SelectedModel;

    constructor(
        private convenioService: ConvenioService,
        private authService: JwtAuthService,
        private utility: UtilityService,
        private pacienteService: PacienteService,
        @Inject(MAT_DIALOG_DATA) public data: { idPaciente?: number, convenio?: ConvenioPaciente }) {
            this.convenioEdicao = data.convenio;
            this.idPaciente = data.idPaciente;
        }

    ngOnInit(): void {
        this.LoadForm();
        this.ListaConvenios();
        if(this.convenioEdicao)
            this.LoadDadosForm(this.convenioEdicao)
    }

    LoadForm() {
        this.convenioForm = new UntypedFormGroup({
            validade: new UntypedFormControl('', []),
            contratoPlano: new UntypedFormControl('', []),
            observacoes: new UntypedFormControl('', []),
            idConvenio: new UntypedFormControl('', []), 
            numeroCarterinha: new UntypedFormControl('',[])
        })
    }

    ListaConvenios() {
        this.user = this.authService.getUser();

        this.convenioService.ListarConveniosClinica(+this.user.idClinica)
            .subscribe((convenios: Array<Convenio>) => {
                var listConvenios = [];
                convenios.forEach(x => {
                    var item = new SelectedModel();
                    item.id = x.id;
                    item.name = x.nome;

                    listConvenios.push(item);
                });

                this.listaConvenios = listConvenios;
            })
    }

    LoadDadosForm(convenio?: ConvenioPaciente){
        var dados = this.dadosForm();
        dados['validade'].setValue(convenio.validade);
        dados['contratoPlano'].setValue(convenio.contratoPlano);
        dados['observacoes'].setValue(convenio.observacoes);
        dados['idConvenio'].setValue(convenio.idConvenio);
        dados['numeroCarterinha'].setValue(convenio.numeroCarterinha);
    }               

    SalvarClick() {
        if (this.convenioForm.invalid) {
            this.utility.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
            return;
        }
        var dados = this.dadosForm();
        var item = new ConvenioPaciente;
        item.idConvenio = dados['idConvenio'].value;
        item.contratoPlano = dados['contratoPlano'].value;
        item.numeroCarterinha = dados['numeroCarterinha'].value;
        item.validade = dados['validade'].value;
        item.observacoes = dados['observacoes'].value;

        if (this.convenioEdicao) {
            item.id = this.convenioEdicao.id;
            item.idPaciente = this.convenioEdicao.idPaciente;

            this.pacienteService.AtualizarConvenioPaciente(item)
                .subscribe((response) => {
                    this.utility.MostraToastr('Sucesso', 'convênio atualizado com sucesso', 'sucesso');
                },
                    (error) => {
                        this.utility.MostraToastr('Erro', 'Erro ao atualizar convênio', 'erro');
                    })
        } else {
            item.idPaciente = this.idPaciente;
            this.pacienteService.AdicionarConvenioPaciente(item)
                .subscribe((response) => {
                    this.utility.MostraToastr('Sucesso', response.message, 'sucesso');
                },
                    (error) => {
                        this.utility.MostraToastr('Erro', 'Erro ao adicionar convênio', 'erro');
                    })
        }

    }


    //Metodos auxiliares
    dadosForm(){
        return this.convenioForm.controls
    }
}