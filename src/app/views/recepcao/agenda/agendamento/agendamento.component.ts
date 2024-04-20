import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Agendamento } from 'app/shared/models/agendamento.model';
import { Procedimento } from 'app/shared/models/procedimento.model';
import { SelectedModel } from 'app/shared/models/selected-model';
import { User } from 'app/shared/models/user.model';
import { AgendamentoService } from 'app/shared/services/app-models/agendamento.service';
import { ConvenioService } from 'app/shared/services/app-models/convenio.service';
import { FuncionarioService } from 'app/shared/services/app-models/funcionario.service';
import { PacienteService } from 'app/shared/services/app-models/paciente.service';
import { ProcedimentoService } from 'app/shared/services/app-models/procedimento.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { EnumService } from 'app/shared/services/enum.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {
  user: User = {}
  agendamentoForm: UntypedFormGroup;
  repeticoesAgendamentos: { value: number, label: string }[] = [];
  situacoesAgendamentos: { value: number, label: string }[] = [];
  procedimentos: Array<Procedimento>
  agendamentoEdicao: Agendamento;

  listaPacientes: Array<SelectedModel> = [];
  pacienteSelected: SelectedModel;

  listaConvenios: Array<SelectedModel>;
  convenioSelected: SelectedModel;

  listaFuncionarios: Array<SelectedModel>;
  funcionarioSelected: SelectedModel;

  constructor(
    private enumService: EnumService,
    private pacienteService: PacienteService,
    private procedimentoService: ProcedimentoService,
    private funcionarioService: FuncionarioService,
    private convenioService: ConvenioService,
    private utility: UtilityService,
    private authService: JwtAuthService,
    private agendamentoService: AgendamentoService,
    @Inject(MAT_DIALOG_DATA) public data: { agendamento?: Agendamento }
  ) {
    this.agendamentoEdicao = data.agendamento
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.InicializaForm();
    this.repeticoesAgendamentos = this.enumService.getRepeticaoAgendamento();
    this.situacoesAgendamentos = this.enumService.getSituacaoAgendamento();
    this.ListaFuncionarios();
    this.ListaProcedimentos();
    this.ListaConvenios();
    this.ListPacientes();
  }

  InicializaForm() {
    this.agendamentoForm = new UntypedFormGroup({
      paciente: new UntypedFormControl(0, [Validators.required]),
      dataAgendamento: new UntypedFormControl(new Date(), Validators.required),
      horaAgendamento: new UntypedFormControl('', [Validators.required]),
      repeticao: new UntypedFormControl(0, []),
      situacaoAgendamento: new UntypedFormControl(0, []),
      lembretes: new UntypedFormControl(false, []),
      observacao: new UntypedFormControl(''),
      procedimento: new UntypedFormControl(),
      convenio: new UntypedFormControl(0, []),
      funcionario: new UntypedFormControl(0, [Validators.required])
    })
  }

  CarregaDados(agendamento?: Agendamento) {
    const dados = this.dadosForm();
    this.pacienteSelected = this.listaPacientes.find(paciente => paciente.id === agendamento.idPaciente);

    dados['paciente'].setValue(this.pacienteSelected);
    dados['convenio'].setValue(agendamento.idConvenio);
    dados['funcionario'].setValue(agendamento.idFuncionario);
    dados['dataAgendamento'].setValue(agendamento.dataAgendamento);
    dados['horaAgendamento'].setValue(agendamento.horaAgendamento);
    dados['repeticao'].setValue(agendamento.repeticao);
    dados['situacaoAgendamento'].setValue(agendamento.situacaoAgendamento);
    dados['lembretes'].setValue(agendamento.lembrete);
    dados['observacao'].setValue(agendamento.observacao);
    dados['procedimento'].setValue(agendamento.idsProcedimento);
  }

  ListaProcedimentos() {
    this.procedimentoService.ListaProcedimentoClinica(+this.user.idClinica)
      .subscribe((contas: Array<Procedimento>) => {
        this.procedimentos = contas
      })
  }


  ListPacientes() {
    this.user = this.authService.getUser();

    this.pacienteService.ListaPacientesClinica(+this.user.idClinica)
      .subscribe((paciente) => {
        var listPaciente = [];
        paciente.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listPaciente.push(item);
        });

        this.listaPacientes = listPaciente;
        if (this.agendamentoEdicao)
          this.CarregaDados(this.agendamentoEdicao);
      })
  }

  ListaConvenios() {
    this.user = this.authService.getUser();

    this.convenioService.ListarConveniosClinica(+this.user.idClinica)
      .subscribe((convenios) => {
        var listConvenio = [];
        convenios.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listConvenio.push(item);
        });

        this.listaConvenios = listConvenio;
      })
  }

  ListaFuncionarios() {
    this.user = this.authService.getUser();

    this.funcionarioService.ListarProfissionaisSaude(+this.user.idClinica)
      .subscribe((funcs) => {
        var listFuncs = [];
        funcs.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listFuncs.push(item);
        });

        this.listaFuncionarios = listFuncs;
      })
  }

  SalvarClick() {
    if (this.agendamentoForm.invalid) {
      this.utility.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
      return;
    }
    this.user = this.authService.getUser();
    var dados = this.dadosForm();
    var item = new Agendamento;
    item.dataAgendamento = dados['dataAgendamento'].value;

    const hora = dados['horaAgendamento'].value.substring(0, 2);
    const minutos = dados['horaAgendamento'].value.substring(3, 5);
    var segundos = '00';
    // Formatar e atribuir a horaAgendamento
    item.horaAgendamento = `${hora}:${minutos}:${segundos}`;
    item.repeticao = dados['repeticao'].value;
    item.situacaoAgendamento = dados['situacaoAgendamento'].value;
    item.lembrete = dados['lembretes'].value;
    item.observacao = dados['observacao'].value;
    item.idsProcedimento = dados['procedimento'].value;
    item.idClinica = +this.user.idClinica;

    this.pacienteSelected = dados['paciente'].value;
    item.idPaciente = this.pacienteSelected.id;

    item.idConvenio = dados['convenio'].value;
    item.idFuncionario = dados['funcionario'].value;

    if (this.agendamentoEdicao) {
      item.id = this.agendamentoEdicao.id;

      this.agendamentoService.AtualizarAgendamento(item)
        .subscribe((respose) => {
          this.utility.MostraToastr('Atualizado', 'Agendamento atualizado com sucesso', 'sucesso');
        },
          (error) => {
            this.utility.MostraToastr('Erro', 'Erro ao atualizar o agendamento', 'erro');
          })
    } else {
      this.agendamentoService.AdicionarAgendamento(item)
      .subscribe((response) => {
        this.utility.MostraToastr('Sucesso', response.message, 'sucesso');
      },
      (error) => {
        this.utility.MostraToastr('Erro', error.message, 'erro');
      })
    }
  }

  dadosForm() {
    return this.agendamentoForm.controls;
  }

  filterPacientes(value: any) {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
    return this.listaPacientes.filter(paciente => {
      if (typeof paciente.name === 'string') {
        return paciente.name.toLowerCase().includes(filterValue);
      }
      return false;
    });
  }

  displayFn(paciente: SelectedModel): string {
    return paciente && paciente.id ? `${paciente.id.toString()} - ${paciente.name}` : '';
  }

}
