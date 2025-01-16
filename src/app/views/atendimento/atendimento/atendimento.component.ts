import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Atendimento, AtendimentoPaciente } from 'app/shared/models/atendimento.model';
import { ProntuarioPaciente } from 'app/shared/models/paciente.model';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { PacienteService } from 'app/shared/services/app-models/paciente.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { UtilityService } from 'app/shared/services/utility.service';
import { ModalAtendimentoComponent } from '../modal-atendimento/modal-atendimento.component';
import { AtendimentoService } from 'app/shared/services/app-models/atendimento.service';
import { EvolucaoPaciente } from 'app/shared/models/evolucao.paciente';
import { ModalAtestadoComponent } from '../modal-atestado/modal-atestado.component';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtendimentoComponent implements OnInit {
  idPaciente: number;
  idAtendimento: number;
  prontuario: ProntuarioPaciente;
  paciente: AtendimentoPaciente = new AtendimentoPaciente();
  atendimentoFrom: UntypedFormGroup;
  atendimentoEdit: Atendimento = new Atendimento();
  tipoTela: number = 1;
  listEvolucaoPaciente: Array<EvolucaoPaciente> = new Array<EvolucaoPaciente>();

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private utilityService: UtilityService,
    private loaderService: AppLoaderService,
    private dialog: MatDialog,
    private atendimentoService: AtendimentoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.idPaciente = +param['cd'];
      this.idAtendimento = +param['cdAtend'];
    });
    this.IniciaForm();
    this.LoadDadosProntuario(this.idPaciente);
    this.LoadDadosAtendimento();
    this.LoadEvolucaoPaciente(this.idPaciente);
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

  LoadEvolucaoPaciente(idPaciente: number) {
    this.loaderService.open('Carregando evolução de prontuário do paciente');
    this.atendimentoService.EvolucaoProntuarioByIdPaciente(idPaciente)
      .subscribe((response) => {
        if (response.success) {
          this.listEvolucaoPaciente = response.result;
          this.cdr.detectChanges();
        }
      })
    this.loaderService.close();
  }

  AlterPages() {

    if (this.tipoTela == 1) {
      this.tipoTela = 2;
      this.atendimentoFrom.reset();
    } else {
      this.tipoTela = 1
      this.ngOnInit()
    }
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
        dados['queixaPrincipal'].setValue(this.atendimentoEdit.queixaPrincipal);
        dados['historiaMolestiaAtual'].setValue(this.atendimentoEdit.historiaMolestiaAtual);
        dados['historicoAntecedentes'].setValue(this.atendimentoEdit.historicoAntecedentes);
        dados['exameFisico'].setValue(this.atendimentoEdit.exameFisico);
        dados['diagnostico'].setValue(this.atendimentoEdit.diagnostico);
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

  openHistoricoModal(atendimento: AtendimentoPaciente) {
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

  openAtestadoModal() {
    const dialogRef = this.dialog.open(ModalAtestadoComponent, {
      width: '50%',
      height: 'auto',
      data: {
        idAtendimento: this.idAtendimento,
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

  public formatDate(dateString: string): string {

    const cleanDateString = dateString.split('.')[0];

    return cleanDateString
  }

  downloadBase64Pdf(base64String: string, fileName: string): void {
    const isBase64Pdf = (base64: string): boolean => {
      try {
        const regex = /^[A-Za-z0-9+/=]+$/;
        return regex.test(base64) && base64.length % 4 === 0;
      } catch {
        return false;
      }
    };

    if (isBase64Pdf(base64String)) {
      // Converte Base64 para Blob
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      // Cria um link para download
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = fileName || 'arquivo.pdf';
      link.click();

      // Libera o objeto criado
      URL.revokeObjectURL(url);
    } else {
      console.warn('A string fornecida não é um Base64 válido.');
    }
  }

  isBase64(base64String: string): boolean {
    const regex = /^[A-Za-z0-9+/=]+$/; // Verifica caracteres válidos de Base64
    try {
      return regex.test(base64String) && base64String.length % 4 === 0;
    } catch {
      return false;
    }
  }
}
