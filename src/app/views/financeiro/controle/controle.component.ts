import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { LancamentoService } from 'app/shared/services/app-models/lancamento.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { ContaBancariaService } from 'app/shared/services/app-models/conta-bancaria.service';
import { ConfiguracaoFinanceiraService } from 'app/shared/services/app-models/configuracao-financeira.service';
import { ConfiguracaoFinanceira } from 'app/shared/models/configuracao-financeira.model';
import { User } from 'app/shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { LancamentoModalComponent } from '../lancamento-modal/lancamento-modal.component';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.scss']
})
export class ControleComponent implements OnInit {

  user: User = {}
  color: string;
  valorSadoGeral: number = 0;
  contaBancaria: string = '';  tipos: { value: number; label: string }[] = [];
  configFinanceira: ConfiguracaoFinanceira;

  constructor(
    private router: Router,
    private authService: JwtAuthService,
    private loader: AppLoaderService,
    private lancamentoService: LancamentoService,
    private contaBancariaService: ContaBancariaService,
    private configFinanceiraService: ConfiguracaoFinanceiraService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.LoadDadosIniciais();
  }

  openLancamentoModal(tipo: string) {
    const dialogRef = this.dialog.open(LancamentoModalComponent, {
      width: '50%',
      height: 'auto',
      data: { 
        tipoLancamento: tipo,
        configFinanceira: this.configFinanceira
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.LoadDadosIniciais();
    });
  }

  TelaCadastro(path: string) {
    this.router.navigateByUrl(`financeiro/${path}`)
  }

  LoadDadosIniciais() {
    this.loader.open('Aguarde');

    this.user = this.authService.getUser();

    this.configFinanceiraService.ListarConfiguracaoFinanceirasClinica(+this.user.idClinica)
      .subscribe((configuracao) => {
        this.configFinanceira = configuracao[0];
        this.lancamentoService.RetornoSaldoGeral(configuracao[0].idContaBancaria)
          .subscribe((valor) => {
            this.valorSadoGeral = valor.result;
            if (this.valorSadoGeral >= 0) {
              this.color = 'blue';
            }
            else
              this.color = 'danger';
          });

        this.contaBancariaService.ObterContaBancaria(configuracao[0].idContaBancaria)
          .subscribe((conta) => {
            this.contaBancaria = conta.nome
          });
      })

    this.loader.close();
  }
}
