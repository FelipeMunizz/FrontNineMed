import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfiguracaoClinicaService } from './../../../shared/services/app-models/configuracao-clinica.service';
import { UtilityService } from 'app/shared/services/utility.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { User } from 'app/shared/models/user.model';
import { ConfiguracaoClinica } from 'app/shared/models/configuracao-clinica.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracao-clinica',
  templateUrl: './configuracao-clinica.component.html',
  styleUrls: ['./configuracao-clinica.component.scss']
})
export class ConfiguracaoClinicaComponent implements OnInit {
  configClinicaForm: UntypedFormGroup;
  configuracaoClinica: ConfiguracaoClinica;
  user: User = {}

  constructor(
    private cfgClinicaService: ConfiguracaoClinicaService,
    private utility: UtilityService,
    private auth: JwtAuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.IniciaForm();
    this.LoadDadosForm();
  }

  IniciaForm() {
    this.configClinicaForm = new UntypedFormGroup({
      horarioAbertura: new UntypedFormControl('', Validators.required),
      horarioFechamento: new UntypedFormControl('', Validators.required),
      intervaloAgendaPadrao: new UntypedFormControl('', []),
      funcionaFeriados: new UntypedFormControl(false, []),
      controlaEstoque: new UntypedFormControl(false, []),
      numeroNota: new UntypedFormControl('', []),
      cnae: new UntypedFormControl('', [])
    })
  }

  LoadDadosForm() {
    this.user = this.auth.getUser();
    this.cfgClinicaService.ObterConfiguracaoIdClinica(+this.user.idClinica)
      .subscribe((cfg) => {
        this.configuracaoClinica = cfg;
        var dados = this.dadosForm();
        dados['horarioAbertura'].setValue(this.configuracaoClinica.horarioAbertura);
        dados['horarioFechamento'].setValue(this.configuracaoClinica.horarioFechamento);
        dados['intervaloAgendaPadrao'].setValue(this.configuracaoClinica.intervaloAgendaPadrao);
        dados['funcionaFeriados'].setValue(this.configuracaoClinica.funcionaFeriados);
        dados['controlaEstoque'].setValue(this.configuracaoClinica.controlaEstoque);
        dados['numeroNota'].setValue(this.configuracaoClinica.numeroNota);
        dados['cnae'].setValue(this.configuracaoClinica.cnae);
      },
      (error) => {
        this.utility.MostraToastr('Aviso', 'Nenhuma configuração encontrada', 'aviso')
        this.router.navigateByUrl('dashboard/analytics');
      })
  }

  SalvarClick() {
    if (this.configClinicaForm.invalid) {
      this.utility.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
      return;
    }
    var dados = this.dadosForm();
    this.configuracaoClinica.horarioAbertura = dados['horarioAbertura'].value;
    this.configuracaoClinica.horarioFechamento = dados['horarioFechamento'].value;
    this.configuracaoClinica.intervaloAgendaPadrao = dados['intervaloAgendaPadrao'].value;
    this.configuracaoClinica.funcionaFeriados = dados['funcionaFeriados'].value;
    this.configuracaoClinica.controlaEstoque = dados['controlaEstoque'].value;
    this.configuracaoClinica.numeroNota = dados['numeroNota'].value;
    this.configuracaoClinica.cnae = dados['cnae'].value;

    this.cfgClinicaService.AtualizarConfiguracaoClinica(this.configuracaoClinica)
    .subscribe((response) =>{
      this.utility.MostraToastr('Sucesso', 'Configuracao atualizada', 'sucesso');
      this.LoadDadosForm();
    })
  }

  //Metodos Auxiliares
  private dadosForm() {
    return this.configClinicaForm.controls;
  }
}
