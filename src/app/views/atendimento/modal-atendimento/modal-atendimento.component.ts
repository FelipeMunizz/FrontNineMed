import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AtendimentoPaciente } from 'app/shared/models/atendimento.model';
import { ProntuarioPaciente } from 'app/shared/models/paciente.model';
import { PacienteService } from './../../../shared/services/app-models/paciente.service';
import { finalize, switchMap } from 'rxjs';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-modal-atendimento',
  templateUrl: './modal-atendimento.component.html',
  styleUrls: ['./modal-atendimento.component.scss']
})
export class ModalAtendimentoComponent implements OnInit {
  nomePaciente: string = '';
  idPaciente: number = 0;
  atendimentoForm: UntypedFormGroup;
  prontuario: ProntuarioPaciente = new ProntuarioPaciente();

  constructor(
    private pacienteService: PacienteService,
    private loader: AppLoaderService,
    private utilityService: UtilityService,
    @Inject(MAT_DIALOG_DATA) public data: {
      nomePaciente?: string,
      idPaciente: number
    }
  ) {
    this.nomePaciente = data.nomePaciente;
    this.idPaciente = data.idPaciente;
  }

  ngOnInit(): void {
    this.InicializaForm();
    this.LoadDadosProntuario();
  }

  InicializaForm() {
    this.atendimentoForm = new UntypedFormGroup({
      habitos: new UntypedFormControl(),
      alergias: new UntypedFormControl(),
      medicamentoUso: new UntypedFormControl(),
      antecedenteClinico: new UntypedFormControl(),
      antecedenteCirurgico: new UntypedFormControl(),
      antecedenteFamiliares: new UntypedFormControl()
    })
  }

  LoadDadosProntuario() {
    var dados = this.dadosForm();
    this.pacienteService.ObterPacienteProntuario(this.idPaciente)
      .subscribe((response) => {
        this.prontuario = response;
        dados['habitos'].setValue(this.prontuario.habitos);
        dados['alergias'].setValue(this.prontuario.alergias);
        dados['medicamentoUso'].setValue(this.prontuario.medicamentoUso);
        dados['antecedenteClinico'].setValue(this.prontuario.antecedenteClinico);
        dados['antecedenteCirurgico'].setValue(this.prontuario.antecedenteCirurgico);
        dados['antecedenteFamiliares'].setValue(this.prontuario.antecedenteFamiliares);
      });
  }

  SalvarClick() {
    this.loader.open();
    var dados = this.dadosForm();
    var prontuarioEdit = new ProntuarioPaciente();

    prontuarioEdit.id = this.prontuario.id;
    prontuarioEdit.idPaciente = this.idPaciente;
    prontuarioEdit.habitos = dados['habitos'].value
    prontuarioEdit.alergias = dados['alergias'].value
    prontuarioEdit.medicamentoUso = dados['medicamentoUso'].value
    prontuarioEdit.antecedenteClinico = dados['antecedenteClinico'].value
    prontuarioEdit.antecedenteCirurgico = dados['antecedenteCirurgico'].value
    prontuarioEdit.antecedenteFamiliares = dados['antecedenteFamiliares'].value

    this.pacienteService.AtualizarProntuarioPaciente(prontuarioEdit)
      .subscribe((response) => {
        this.loader.close();
        this.utilityService.MostraToastr('Sucesso', 'Prontuario atualizado com sucesso', 'sucesso');
      },
        (error) => {
          this.utilityService.MostraToastr('Erro', 'Erro ao atualizar prontuario', 'erro');
        })
  }

  private dadosForm() {
    return this.atendimentoForm.controls;
  }
}