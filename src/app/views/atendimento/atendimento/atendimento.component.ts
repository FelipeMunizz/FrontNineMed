import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Atendimento, AtendimentoPaciente } from 'app/shared/models/atendimento.model';
import { Paciente, ProntuarioPaciente } from 'app/shared/models/paciente.model';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { PacienteService } from 'app/shared/services/app-models/paciente.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { UtilityService } from 'app/shared/services/utility.service';
import { ModalAtendimentoComponent } from '../modal-atendimento/modal-atendimento.component';
import { AtendimentoService } from 'app/shared/services/app-models/atendimento.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent implements OnInit {
  idPaciente: number;
  idAtendimento: number;
  prontuario: ProntuarioPaciente;
  paciente: AtendimentoPaciente = new AtendimentoPaciente();
  atendimentoFrom: UntypedFormGroup;
  atendimentoEdit: Atendimento = new Atendimento();

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private authService: JwtAuthService,
    private utilityService: UtilityService,
    private loaderService: AppLoaderService,
    private dialog: MatDialog,
    private atendimentoService: AtendimentoService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.idPaciente = +param['cd'];
      this.idAtendimento = +param['cdAtend'];
    });
    this.IniciaForm();
    this.LoadDadosProntuario(this.idPaciente);
    this.LoadDadosAtendimento();
  }

  IniciaForm() {
    this.atendimentoFrom = new FormGroup({
      queixaPrincipal: new FormControl(),
      historiaMolestiaAtual: new FormControl(),
      historicoAntecedentes: new FormControl(),
      exameFisico: new FormControl(),
      peso: new FormControl(),
      altura: new FormControl(),
      imc: new FormControl(),
      diagnostico: new FormControl(),
      finalizado: new FormControl()
    })
  }

  LoadDadosProntuario(idPaciente: number) {
    this.loaderService.open('aguarde...')

    this.pacienteService.ObtemProntuarioTelaAtendimento(idPaciente).subscribe(
      (response) => {
        this.paciente = response;
      }
    );

    this.loaderService.close();
  }

  SalvarClick(finalizado: boolean) {
    var dados = this.dadosForm();
    this.atendimentoEdit.queixaPrincipal = dados['queixaPrincipal']?.value;
    this.atendimentoEdit.historiaMolestiaAtual = dados['historiaMolestiaAtual']?.value;
    this.atendimentoEdit.historicoAntecedentes = dados['historicoAntecedentes']?.value;
    this.atendimentoEdit.exameFisico = dados['exameFisico']?.value;
    this.atendimentoEdit.finalizado = finalizado;
    this.atendimentoEdit.diagnostico = dados['diagnostico']?.value;
    if (dados['peso'].value && dados['altura'].value)
      this.atendimentoEdit.iMC = +dados['peso'].value / (+dados['altura'].value * +dados['altura'].value);
    this.atendimentoService.AtualizarAtendimento(this.atendimentoEdit)
      .subscribe((result) => {
        this.LoadDadosAtendimento()
        this.utilityService.MostraToastr('Sucesso', finalizado ? 'Atendimento finalizado com sucesso' : 'Salvo com sucesso', 'sucesso')
      })
  }

  LoadDadosAtendimento() {
    var dados = this.dadosForm();

      this.atendimentoService.ObterAtendimento(this.idAtendimento)
      .subscribe((result) => {
        this.atendimentoEdit = result
        dados['queixaPrincipal'].setValue[this.atendimentoEdit.queixaPrincipal];
        dados['historiaMolestiaAtual'].setValue[this.atendimentoEdit.historiaMolestiaAtual];
        dados['historicoAntecedentes'].setValue[this.atendimentoEdit.historicoAntecedentes];
        dados['exameFisico'].setValue[this.atendimentoEdit.exameFisico];
        dados['diagnostico'].setValue[this.atendimentoEdit.diagnostico];
      })

  }

  CalculoImc() {
    debugger
    var dados = this.dadosForm();

    var altura = parseFloat(dados["altura"].value);
    var peso = parseFloat(dados["peso"].value);

    var imc = peso / (altura * altura)

    dados["imc"].setValue(imc);
  }

  CalcularIdade(dataNascimento: string): number {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }

  openLancamentoModal(atendimento: AtendimentoPaciente) {
    const dialogRef = this.dialog.open(ModalAtendimentoComponent, {
      width: '50%',
      height: 'auto',
      data: {
        nomePaciente: atendimento.nome,
        idPaciente: this.idPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }


  private dadosForm() {
    return this.atendimentoFrom.controls;
  }
}
