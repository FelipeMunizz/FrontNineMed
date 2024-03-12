import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { LancamentoService } from 'app/shared/services/app-models/lancamento.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { ContaBancariaService } from 'app/shared/services/app-models/conta-bancaria.service';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.scss']
})
export class ControleComponent implements OnInit {

  color: string;
  valorSadoGeral: number = 0;
  contaBancaria: string = '';

  constructor(
    private router: Router,
    private atuhService: JwtAuthService,
    private loader: AppLoaderService,
    private lancamentoService: LancamentoService,
    private contaBancariaService: ContaBancariaService
  ) { }

  ngOnInit(): void {
    this.LoadDadosIniciais();
  }

  TelaCadastro(path: string){
    this.router.navigateByUrl(`financeiro/${path}`)
  }

  LoadDadosIniciais(){
    this.SaldoGeral();
    this.ContaBancariaPadrao();
  }

  SaldoGeral(){
    //Ajustar o parametro apos criar as telas de cadastro e configuracao, 
    //o idContaBancaria deve ser o cadastrado nas configurações do financeiro
    
    this.lancamentoService.RetornoSaldoGeral(1)
    .subscribe((valor) => {      
      this.valorSadoGeral = valor.result;
      if(this.valorSadoGeral >= 0){
        this.color = 'blue';
      }
      else
        this.color = 'danger';
    });
  }

  ContaBancariaPadrao(){
    //Ajustar o parametro apos criar as telas de cadastro e configuracao, 
    //o idContaBancaria deve ser o cadastrado nas configurações do financeiro
    
    this.contaBancariaService.ObterContaBancaria(1)
    .subscribe((conta) => {
      this.contaBancaria = conta.nome
    })
  }

}
