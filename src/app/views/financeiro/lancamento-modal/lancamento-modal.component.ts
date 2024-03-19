import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfiguracaoFinanceira } from 'app/shared/models/configuracao-financeira.model';
import { Funcionario } from 'app/shared/models/funcionario.model';
import { Paciente } from 'app/shared/models/paciente.model';
import { SelectedModel } from 'app/shared/models/selected-model';
import { User } from 'app/shared/models/user.model';
import { FuncionarioService } from 'app/shared/services/app-models/funcionario.service';
import { PacienteService } from 'app/shared/services/app-models/paciente.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { EnumService } from 'app/shared/services/enum.service';
import { ConvenioService } from './../../../shared/services/app-models/convenio.service';

@Component({
  selector: 'app-lancamento-modal',
  templateUrl: './lancamento-modal.component.html',
  styleUrls: ['./lancamento-modal.component.scss']
})
export class LancamentoModalComponent implements OnInit {
  configuracaoFinanceira: ConfiguracaoFinanceira;
  paciente: Paciente;
  funcionario: Funcionario;
  tipoLancamento: string = 'Receita';

  user: User = {};
  lancamentoForm: UntypedFormGroup;
  tipos: { value: number; label: string }[] = [];

  listaPacientes: Array<SelectedModel> = [];
  pacienteSelected: SelectedModel;

  listaProfissionais: Array<SelectedModel>;
  profissionalSelected: SelectedModel;

  listaConvenios: Array<SelectedModel>;
  convenioSelected: SelectedModel;

  constructor(
    private enumService: EnumService,
    private pacienteService: PacienteService,
    private authService: JwtAuthService,
    private funcionarioService: FuncionarioService,
    private convenioService: ConvenioService,
    @Inject(MAT_DIALOG_DATA) public data: {
      configFinanceira?: ConfiguracaoFinanceira,
      paciente?: Paciente,
      funcionario?: Funcionario,
      tipoLancamento?: string
    }
  ) {
    this.configuracaoFinanceira = data.configFinanceira;
    this.tipoLancamento = data.tipoLancamento;
    this.paciente = data.paciente;
    this.funcionario = data.funcionario
  }

  ngOnInit(): void {
    this.tipos = this.enumService.getTipoLancamento();
    this.InicializaForm();
    this.ListPacientes();
    this.ListProfissional();
    this.ListConvenio();
  }

  InicializaForm() {
    this.lancamentoForm = new UntypedFormGroup({
      paciente: new UntypedFormControl('', []),
      profissional: new UntypedFormControl('', []),
      convenio: new UntypedFormControl('', []),
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
      })
  }

  ListProfissional() {
    this.user = this.authService.getUser();

    this.funcionarioService.ListarProfissionaisSaude(+this.user.idClinica)
      .subscribe((profissional) => {
        var listProfissional = [];
        profissional.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listProfissional.push(item);
        });

        this.listaProfissionais = listProfissional;
      })
  }

  
  ListConvenio() {
    this.user = this.authService.getUser();

    this.convenioService.ListarConveniosClinica(+this.user.idClinica)
      .subscribe((convenio) => {
        var listConvenio = [];
        convenio.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listConvenio.push(item);
        });

        this.listaConvenios = listConvenio;
      })
  }


  // Métodos Auxiliares

  dadosForm() {
    return this.lancamentoForm.controls;
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
