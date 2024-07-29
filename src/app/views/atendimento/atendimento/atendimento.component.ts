import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paciente, ProntuarioPaciente } from 'app/shared/models/paciente.model';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { PacienteService } from 'app/shared/services/app-models/paciente.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent implements OnInit {
  idPaciente: number;
  prontuario: ProntuarioPaciente;
  paciente: Paciente = new Paciente();

  constructor(    
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private authService: JwtAuthService,
    private utilityService: UtilityService,
    private loaderService: AppLoaderService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => this.idPaciente = +param['cd']);
    this.LoadDadosProntuario(this.idPaciente);
  }

  LoadDadosProntuario(idPaciente: number){
    this.loaderService.open('aguarde...')

    this.pacienteService.ObterPacienteProntuario(idPaciente).subscribe(
      (response) => {
        this.prontuario = response;
        this.pacienteService.ObterPaciente(idPaciente).subscribe(
          (response) => {
            this.paciente = response
          }
        )
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

}
