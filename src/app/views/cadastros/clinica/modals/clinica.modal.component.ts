import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Clinica } from "app/shared/models/clinica.model";
import { ClinicaService } from "app/shared/services/app-models/clinica.service";
import { UtilityService } from "app/shared/services/utility.service";
@Component({
    template: `
    <h2 mat-dialog-title>Endereço Clinica</h2>
    <form [formGroup]="clinicaForm">
        <mat-dialog-content class="mat-dialog-content">
        <div class="row">
                        <div class="col col-lg-6 col-md-6 col-sm-6">
                            <mat-form-field class="full-width">
                                <input matInput name="nome" formControlName="nome" placeholder="Razão Social" value="">
                            </mat-form-field>
                            <small
                                *ngIf="clinicaForm.controls['nome'].hasError('minlength') && clinicaForm.controls['nome'].touched"
                                class="form-error-msg"> A razão social deve conter no minimo:
                                {{basicForm.controls['nome'].errors.minlength.requiredLength}} caracteres </small>
                            <small
                                *ngIf="clinicaForm.controls['nome'].hasError('maxlength') && clinicaForm.controls['nome'].touched"
                                class="form-error-msg"> A razão social deve conter no maximo:
                                {{clinicaForm.controls['nome'].errors.maxlength.requiredLength}} caracteres </small>
                        </div>
                        <div class="col col-lg-6 col-md-6 col-sm-6">
                            <mat-form-field class="full-width">
                                <input matInput name="fantasia" formControlName="fantasia" placeholder="Nome Fantasia"
                                    value="">
                            </mat-form-field>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col col-lg-4 col-md-4 col-sm-12">
                            <mat-form-field class="full-width">
                                <input matInput name="cnpj" formControlName="cnpj" placeholder="CNPJ" value="" #cnpj
                                    (keypress)="onKeyPress($event)" (blur)="BuscaCnpj(cnpj.value)">
                            </mat-form-field>
                            <small
                                *ngIf="clinicaForm.controls['cnpj'].hasError('maxlength') && clinicaForm.controls['cnpj'].touched"
                                class="form-error-msg"> A Inscrição Municipal deve conter no maximo:
                                {{clinicaForm.controls['cnpj'].errors.maxlength.requiredLength}} caracteres </small>
                        </div>
                        <div class="col col-lg-4 col-md-4 col-sm-12">
                            <mat-form-field class="full-width">
                                <input matInput name="inscricaoMunicipal" formControlName="inscricaoMunicipal"
                                    placeholder="Inscrição Municipal" value="" (keypress)="onKeyPress($event)">
                            </mat-form-field>
                            <small
                                *ngIf="clinicaForm.controls['inscricaoMunicipal'].hasError('maxlength') && clinicaForm.controls['inscricaoMunicipal'].touched"
                                class="form-error-msg"> A Inscrição Municipal deve conter no maximo:
                                {{clinicaForm.controls['inscricaoMunicipal'].errors.maxlength.requiredLength}}
                                caracteres </small>
                        </div>
                        <div class="col col-lg-4 col-md-4 col-sm-12">
                            <mat-form-field class="full-width">
                                <input matInput name="inscricaoEstadual" formControlName="inscricaoEstadual"
                                    placeholder="Inscrição Estadual" value="" (keypress)="onKeyPress($event)">
                            </mat-form-field>
                            <small
                                *ngIf="clinicaForm.controls['inscricaoEstadual'].hasError('maxlength') && clinicaForm.controls['inscricaoEstadual'].touched"
                                class="form-error-msg"> A Inscrição Estadual deve conter no maximo:
                                {{clinicaForm.controls['inscricaoEstadual'].errors.maxlength.requiredLength}} caracteres
                            </small>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col col-lg-12 col-md-12 col-sm-12">
                            <mat-checkbox name="simplesNacional" formControlName="simplesNacional" class="pb-16">Simples
                                Nacional
                            </mat-checkbox>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-lg-12 col-md-12 col-sm-12">
                            <mat-label>Envie seu Logo &nbsp;</mat-label>
                            <input type="file" class="margin-toggle" (change)="onFileSelected($event)">
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

export class ClinicaModalComponent implements OnInit {
    clinicaForm: UntypedFormGroup;
    clinicaEdicao?: Clinica;
    logoBase64: string | undefined;

    constructor(
        private clinicaService: ClinicaService,
        private utilityService: UtilityService,
        @Inject(MAT_DIALOG_DATA) public data: { clinica?: Clinica }) {
        this.clinicaEdicao = data.clinica;
    }

    ngOnInit(): void {
        this.IniciaForm();
        this.LoadDadosClinica(this.clinicaEdicao);
    }

    IniciaForm() {
        this.clinicaForm = new UntypedFormGroup({
            nome: new UntypedFormControl('', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(50)
            ]),
            cnpj: new UntypedFormControl('', [
                Validators.required,
                Validators.maxLength(14)
            ]),
            inscricaoMunicipal: new UntypedFormControl('', [
                Validators.required,
                Validators.maxLength(11)
            ]),
            inscricaoEstadual: new UntypedFormControl('', [
                Validators.maxLength(9)
            ]),
            fantasia: new UntypedFormControl('', []),
            simplesNacional: new UntypedFormControl(false, []),
        })
    }

    LoadDadosClinica(clinica: Clinica) {
        var dados = this.dadosForm();
        dados['cnpj'].setValue(clinica.cnpj);
        dados['nome'].setValue(clinica.razaoSocial);
        dados['fantasia'].setValue(clinica.fantasia);
        dados['inscricaoEstadual'].setValue(clinica.inscricaoEstadual);
        dados['inscricaoMunicipal'].setValue(clinica.inscricaoMunicipal);
        dados['simplesNacional'].setValue(clinica.simplesNacional);
    }

    SalvarClick() {
        if (this.clinicaForm.invalid) {
            this.utilityService.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
            return;
        }
        var dados = this.dadosForm();
        var item = new Clinica;
        item.id = this.clinicaEdicao.id;
        item.cnpj = dados['cnpj'].value;
        item.razaoSocial = dados['nome'].value;
        item.nome = dados['nome'].value;
        item.fantasia = dados['fantasia'].value;
        item.inscricaoEstadual = dados['inscricaoEstadual'].value;
        item.inscricaoMunicipal = dados['inscricaoMunicipal'].value;
        item.simplesNacional = dados['simplesNacional'].value;
        item.logo = this.logoBase64;

        this.clinicaService.AtualizarClinica(item)
            .subscribe((response) => {
                this.utilityService.MostraToastr('Sucesso', 'Clinica atualizada com sucesso', 'sucesso');
            },
                (error) => {
                    this.utilityService.MostraToastr('Erro', 'Erro ao atualizar clinica', 'erro');
                })
    }

    //Metodos Auxiliares
    onFileSelected(event: any): void {
        const file: File = event.target.files[0];

        if (file) {
            if (this.isImageFile(file)) {
                const reader = new FileReader();

                reader.onloadend = () => {
                    this.logoBase64 = reader.result as string;
                };

                reader.readAsDataURL(file);
            } else {
            }
        }
    }

    private isImageFile(file: File): boolean {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const fileType = file.type;

        return allowedTypes.includes(fileType);
    }


    onKeyPress(event: any): void {
        const keyCode = event.keyCode;
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
            event.preventDefault();
        }
    }

    BuscaCnpj(cnpj: string) {
        this.utilityService.BuscaCnpj(cnpj).subscribe(
            (cadastro) => {
                this.clinicaForm.get('nome')?.setValue(cadastro.razao_social);
                this.clinicaForm.get('fantasia')?.setValue(cadastro.nome_fantasia);
                if (cadastro.simples.optante_simples === 'S')
                    this.clinicaForm.get('simplesNacional')?.setValue(true);
                else
                    this.clinicaForm.get('simplesNacional')?.setValue(false);
            }
        )
    }

    dadosForm() {
        return this.clinicaForm.controls;
    }
}