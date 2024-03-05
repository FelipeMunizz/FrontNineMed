import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { LancamentoService } from 'app/shared/services/app-models/lancamento.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.scss']
})
export class ControleComponent implements OnInit {

  color: string;
  valorSadoGeral: number;

  constructor(
    private router: Router,
    private atuhService: JwtAuthService,
    private loader: AppLoaderService,
    private lancamentoService: LancamentoService
  ) { }

  ngOnInit(): void {
    this.SaldoGeral();
  }

  TelaCadastro(){
    this.router.navigateByUrl('financeiro/cadastro-financeiro')
  }

  SaldoGeral(){
    this.lancamentoService.RetornoSaldoGeral(1)
    .subscribe((valor) => {
      this.valorSadoGeral = valor.result;
      if(this.valorSadoGeral >= 0.00)
        this.color = 'blue';
      else
        this.color = 'danger';
    });
  }

}
