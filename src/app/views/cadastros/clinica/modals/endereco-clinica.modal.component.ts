import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EnderecoClinica } from "app/shared/models/clinica.model";
import { ClinicaService } from "app/shared/services/app-models/clinica.service";
import { EnumService } from "app/shared/services/enum.service";
import { UtilityService } from "app/shared/services/utility.service";

@Component({
    template: `
<h2 mat-dialog-title>Endereço Clinica</h2>
<form [formGroup]="enderecoForm" (ngSubmit)="SalvarClick()">
  <mat-dialog-content class="mat-dialog-content">
    <div class="row">
      <div class="col col-lg-3 col-md-3 col-sm-12">
        <mat-form-field class="full-width">
          <input matInput name="cep" formControlName="cep" placeholder="CEP (apenas texto)"
            value="" #cepInput (blur)="BuscaEndereco(cepInput.value)" (keypress)="onKeyPress($event)">
        </mat-form-field>
        <small *ngIf="enderecoForm.controls['cep'].hasError('maxlength') && enderecoForm.controls['cep'].touched"
          class="form-error-msg">
          O CEP deve conter no máximo: {{clinicaForm.controls['cep'].errors.maxlength.requiredLength}} caracteres
        </small>
      </div>
    </div>

    <div class="row">
      <div class="col col-lg-6 col-md-6 col-sm-12">
        <mat-form-field class="full-width">
          <input matInput name="logradouro" formControlName="logradouro" placeholder="Endereço" value="">
        </mat-form-field>
        <small *ngIf="enderecoForm.controls['logradouro'].touched" class="form-error-msg"> </small>
      </div>

      <div class="col col-lg-2 col-md-2 col-sm-12">
        <mat-form-field class="full-width">
          <input matInput name="numero" formControlName="numero" placeholder="Número" value="">
        </mat-form-field>
        <small *ngIf="enderecoForm.controls['numero'].touched" class="form-error-msg"> </small>
      </div>
      <div class="col col-lg-4 col-md-4 col-sm-12">
        <mat-form-field class="full-width">
          <input matInput name="complemento" formControlName="complemento" placeholder="Complemento" value="">
        </mat-form-field>
      </div>
    </div>

    <div class="row">
      <div class="col col-lg-4 col-md-4 col-sm-2">
        <mat-form-field class="full-width">
          <input matInput name="bairro" formControlName="bairro" placeholder="Bairro" value="">
        </mat-form-field>
        <small *ngIf="enderecoForm.controls['bairro'].touched" class="form-error-msg"> </small>
      </div>

      <div class="col col-lg-4 col-md-4 col-sm-2">
        <mat-form-field class="full-width">
          <input matInput name="cidade" formControlName="cidade" placeholder="Cidade" value="">
        </mat-form-field>
        <small *ngIf="enderecoForm.controls['cidade'].touched" class="form-error-msg"> </small>
      </div>

      <div class="col col-lg-4 col-md-4 col-sm-2">
        <mat-form-field class="full-width">
          <mat-label>Estado</mat-label>
          <select matNativeControl formControlName="uf" class="form-select">
            <option class="dropdown-item" *ngFor="let estado of estados" [value]="estado.value">
              {{ estado.label }}
            </option>
          </select>
        </mat-form-field>
        <small *ngIf="enderecoForm.controls['uf'].touched" class="form-error-msg"> </small>
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

export class EnderecoClinicaModalComponent implements OnInit {
    idClinica = this.data.idClinica;
    enderecoEdicao = this.data.endereco;
    enderecoForm: UntypedFormGroup;
    estados: { value: number; label: string }[] = [];
    constructor(
        private clinicaService: ClinicaService,
        private enumService: EnumService,
        private utilityService: UtilityService,
        @Inject(MAT_DIALOG_DATA) public data: {  idClinica?: number, endereco?: EnderecoClinica }) {
            this.enderecoEdicao = data.endereco;
            this.idClinica = data.idClinica;
          }
    ngOnInit(): void {
        this.IniciaForm();
        this.estados = this.enumService.getEstados();
        if(this.enderecoEdicao)
            this.LoadDadosEdicao(this.enderecoEdicao);
    }

    private IniciaForm() {
        this.enderecoForm = new UntypedFormGroup({
            cep: new UntypedFormControl('', [
                Validators.required,
                Validators.maxLength(11)
            ]),
            logradouro: new UntypedFormControl('', [
                Validators.required
            ]),
            complemento: new UntypedFormControl('', [
            ]),
            numero: new UntypedFormControl('', [
                Validators.required
            ]),
            bairro: new UntypedFormControl('', [
                Validators.required
            ]),
            cidade: new UntypedFormControl('', [
                Validators.required
            ]),
            uf: new UntypedFormControl(null, [
                Validators.required
            ])
        });
    }

    LoadDadosEdicao(endereco?: EnderecoClinica){
        var dados = this.dadosForm();
        dados['logradouro'].setValue(endereco.logradouro);
        dados['numero'].setValue(endereco.numero);
        dados['complemento'].setValue(endereco.complemento);
        dados['bairro'].setValue(endereco.bairro);
        dados['cep'].setValue(endereco.cep);
        dados['uf'].setValue(endereco.estado);
        dados['cidade'].setValue(endereco.cidade);
    }

    SalvarClick() {
      if (this.enderecoForm.invalid) {
        this.utilityService.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
        return;
      }
        var dados = this.dadosForm();
        var item = new EnderecoClinica;
        item.logradouro = dados['logradouro'].value;
        item.numero = dados['numero'].value;
        item.complemento = dados['complemento'].value;
        item.bairro = dados['bairro'].value;
        item.cep = dados['cep'].value;
        item.estado = dados['uf'].value;
        item.cidade = dados['cidade'].value;

        if(this.enderecoEdicao){
            item.id = this.enderecoEdicao.id;
            item.idClinica = this.enderecoEdicao.idClinica;

            this.clinicaService.AtualizarEnderecoClinica(item)
            .subscribe((response) => {
                this.utilityService.MostraToastr('Sucesso','Endereço atualizado com sucesso', 'sucesso');
             },
             (error) => {
                this.utilityService.MostraToastr('Erro','Erro ao atualizar endereço', 'erro');
             })
        }else{
            item.idClinica = this.idClinica;
            this.clinicaService.AtualizarEnderecoClinica(item)
            .subscribe((response) => {
                this.utilityService.MostraToastr('Sucesso',response.message, 'sucesso');
             },
             (error) => {
                this.utilityService.MostraToastr('Erro','Erro ao adicionar endereço', 'erro');
             })
        }
    }

    //Metodos Auxiliares   
    dadosForm(){
        return this.enderecoForm.controls;
    } 

    onKeyPress(event: any): void {
        const keyCode = event.keyCode;
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
            event.preventDefault();
        }
    }

    BuscaEndereco(cep: string) {
        this.utilityService.BuscaEndereco(cep).subscribe(
            (endereco) => {
                this.enderecoForm.get('logradouro')?.setValue(endereco.logradouro);
                this.enderecoForm.get('bairro')?.setValue(endereco.bairro);
                this.enderecoForm.get('cidade')?.setValue(endereco.localidade);
                const estadoRetornado = this.estados.find((estado) => estado.label === endereco.uf);
                if (estadoRetornado)
                    this.enderecoForm.get('uf')?.setValue(estadoRetornado.value);

            },
            (error) => {
                this.enderecoForm.get('logradouro')?.setValue('');
                this.enderecoForm.get('bairro')?.setValue('');
                this.enderecoForm.get('cidade')?.setValue('');
                this.enderecoForm.get('uf')?.setValue(null);
                this.utilityService.MostraToastr('Erro ao buscar endereço', error.message, 'erro');
            }
        )
    };
}