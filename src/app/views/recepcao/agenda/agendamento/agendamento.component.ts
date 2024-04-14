import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Procedimento } from 'app/shared/models/procedimento.model';
import { SelectedModel } from 'app/shared/models/selected-model';
import { User } from 'app/shared/models/user.model';
import { ProcedimentoService } from 'app/shared/services/app-models/procedimento.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { EnumService } from 'app/shared/services/enum.service';

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
  constructor(
    private enumService: EnumService,
    private procedimentoService: ProcedimentoService,
    private authService: JwtAuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.InicializaForm();
    this.repeticoesAgendamentos = this.enumService.getRepeticaoAgendamento();
    this.situacoesAgendamentos = this.enumService.getSituacaoAgendamento();
    this.ListaProcedimentos();
  }

  InicializaForm() {
    this.agendamentoForm = new UntypedFormGroup({
      dataAgendamento: new UntypedFormControl('', Validators.required),
      repeticao: new UntypedFormControl(0, []),
      situacaoAgendamento: new UntypedFormControl(0, []),
      lembretes: new UntypedFormControl(false, []),
      observacao: new UntypedFormControl(''),
      procedimento: new UntypedFormControl('')
    })
  }

  ListaProcedimentos() {
    this.procedimentoService.ListaProcedimentoClinica(+this.user.idClinica)
      .subscribe((contas: Array<Procedimento>) => {
        var listProcedimentos = [];
        contas.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listProcedimentos.push(item);
        });

        this.procedimentos = listProcedimentos;
      })
  }

}
