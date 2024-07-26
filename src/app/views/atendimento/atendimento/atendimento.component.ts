import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProntuarioPaciente } from 'app/shared/models/paciente.model';
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
      }
    );

    this.loaderService.close();
  }

}
