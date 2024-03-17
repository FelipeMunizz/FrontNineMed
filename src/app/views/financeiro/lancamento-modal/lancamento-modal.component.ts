import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfiguracaoFinanceira } from 'app/shared/models/configuracao-financeira.model';
import { Funcionario } from 'app/shared/models/funcionario.model';
import { Paciente } from 'app/shared/models/paciente.model';
import { SelectedModel } from 'app/shared/models/selected-model';
import { User } from 'app/shared/models/user.model';
import { PacienteService } from 'app/shared/services/app-models/paciente.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { EnumService } from 'app/shared/services/enum.service';

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

  listaPacientes: Array<SelectedModel>;
  pacienteSelected: SelectedModel;


  constructor(
    private enumService: EnumService,
    private pacienteService: PacienteService,
    private authService: JwtAuthService,
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
  }

  InicializaForm() {
    this.lancamentoForm = new UntypedFormGroup({
      paciente: new UntypedFormControl('', [])
    })
  }

  ListPacientes() {
    this.user = this.authService.getUser();

    this.pacienteService.ListaPacientesClinica(+this.user.idClinica)
      .subscribe((pacientes) => {
        var listPaciente = [];
        pacientes.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listPaciente.push(item);
        });

        this.listaPacientes = listPaciente;
      })
  }

  // Métodos Auxiliares

  private dadosForm(){
    return this.lancamentoForm.controls;
  }
}
