import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AtendimentoPaciente } from 'app/shared/models/atendimento.model';
import { Paciente, ProntuarioPaciente } from 'app/shared/models/paciente.model';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { PacienteService } from 'app/shared/services/app-models/paciente.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { UtilityService } from 'app/shared/services/utility.service';
import { ModalAtendimentoComponent } from '../modal-atendimento/modal-atendimento.component';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent implements OnInit {
  idPaciente: number;
  prontuario: ProntuarioPaciente;
  paciente: AtendimentoPaciente = new AtendimentoPaciente();
  atendimentoFrom: UntypedFormGroup;

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private authService: JwtAuthService,
    private utilityService: UtilityService,
    private loaderService: AppLoaderService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => this.idPaciente = +param['cd']);
    this.LoadDadosProntuario(this.idPaciente);
  }

  LoadDadosProntuario(idPaciente: number) {
    this.loaderService.open('aguarde...')

    this.pacienteService.ObtemProntuarioTelaAtendimento(idPaciente).subscribe(
      (response) => {
        this.paciente = response;
        console.log(response)
      }
    );

    this.loaderService.close();
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
        atendimentoPaciente: atendimento,
        idPaciente: this.idPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        //this.LoadDadosIniciais();
    });
  }
}
