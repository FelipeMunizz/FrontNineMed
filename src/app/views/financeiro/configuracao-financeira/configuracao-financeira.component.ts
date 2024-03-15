import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Banco } from 'app/shared/models/banco.model';
import { CentroCusto } from 'app/shared/models/centro-custo';
import { ConfiguracaoFinanceira } from 'app/shared/models/configuracao-financeira.model';
import { ContaBancaria } from 'app/shared/models/conta-bancaria.model';
import { SelectedModel } from 'app/shared/models/selected-model';
import { User } from 'app/shared/models/user.model';
import { BancoService } from 'app/shared/services/app-models/banco.service';
import { CentroCustoService } from 'app/shared/services/app-models/centro-custo.service';
import { ConfiguracaoFinanceiraService } from 'app/shared/services/app-models/configuracao-financeira.service';
import { ContaBancariaService } from 'app/shared/services/app-models/conta-bancaria.service';
import { FormaPagamentoService } from 'app/shared/services/app-models/forma-pagamento.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-configuracao-financeira',
  templateUrl: './configuracao-financeira.component.html',
  styleUrls: ['./configuracao-financeira.component.scss']
})
export class ConfiguracaoFinanceiraComponent implements OnInit {
  user: User = {}
  configForm: UntypedFormGroup;
  configEdicao: ConfiguracaoFinanceira;

  listaBancos: Array<SelectedModel>;
  bancoSelected: SelectedModel;

  listaContaBancaria: Array<SelectedModel>;
  contaBancariaSelected: SelectedModel;

  listaCentroCusto: Array<SelectedModel>;
  centroCustoSelected: SelectedModel;

  listaFormaPagamento: Array<SelectedModel>;
  formaPagamentoSelected: SelectedModel;

  constructor(
    private configService: ConfiguracaoFinanceiraService,
    private bancoService: BancoService,
    private contaBancariaService: ContaBancariaService,
    private centroCustoService: CentroCustoService,
    private formaPagamentoService: FormaPagamentoService,
    private utility: UtilityService,
    private authService: JwtAuthService,
  ) { }

  ngOnInit(): void {
    this.InicializaForm();
    this.CarregaListas();
    this.LoadDadosForm();
  }

  InicializaForm() {
    this.configForm = new UntypedFormGroup({
      idBanco: new UntypedFormControl('', [Validators.required]),
      idContaBancaria: new UntypedFormControl('', [Validators.required]),
      idCentroCusto: new UntypedFormControl('', [Validators.required]),
      idFormaPagamento: new UntypedFormControl('', [Validators.required])
    })
  }

  CarregaListas() {
    this.user = this.authService.getUser();
    var idClinica = +this.user.idClinica;

    this.bancoService.ListarBancosClinica(idClinica)
      .subscribe((bancos: Array<Banco>) => {
        var listBancos = [];
        bancos.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listBancos.push(item);


          this.contaBancariaService.ListaContasBancariaBanco(x.id)
            .subscribe((contas: Array<ContaBancaria>) => {
              var listContas = [];
              contas.forEach(x => {
                var item = new SelectedModel();
                item.id = x.id;
                item.name = x.nome;

                listContas.push(item);
              });

              this.listaContaBancaria = listContas;
            })
        });

        this.listaBancos = listBancos;
      })

    this.centroCustoService.ListarCentroCustosClinica(idClinica)
      .subscribe((centroCustos: Array<CentroCusto>) => {
        var listCentroCusto = [];
        centroCustos.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listCentroCusto.push(item);
        });

        this.listaCentroCusto = listCentroCusto;
      })

    this.formaPagamentoService.ListarFormaPagamentosClinica(idClinica)
      .subscribe((formas: Array<CentroCusto>) => {
        var listFormas = [];
        formas.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listFormas.push(item);
        });

        this.listaFormaPagamento = listFormas;
      })
  }

  LoadDadosForm() {
    this.user = this.authService.getUser();
    var dados = this.dadosForm();

    this.configService.ListarConfiguracaoFinanceirasClinica(+this.user.idClinica)
      .subscribe((configuracao) => {
        if (configuracao.length > 0) {
          this.configEdicao = configuracao[0];
          dados['idBanco'].setValue(configuracao[0].idBanco);
          dados['idContaBancaria'].setValue(configuracao[0].idContaBancaria);
          dados['idCentroCusto'].setValue(configuracao[0].idCentroCusto);
          dados['idFormaPagamento'].setValue(configuracao[0].idFormaPagamento);
        }
      })
  }

  SalvarClick() {
    if (this.configForm.invalid) {
      this.utility.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
      return;
    }

    var dados = this.dadosForm();
    var config = new ConfiguracaoFinanceira;
    this.user = this.authService.getUser();

    config.idBanco = dados['idBanco'].value;
    config.idCentroCusto = dados['idCentroCusto'].value;
    config.idContaBancaria = dados['idContaBancaria'].value;
    config.idFormaPagamento = dados['idFormaPagamento'].value;
    config.idClinica = +this.user.idClinica

    if (this.configEdicao) {
      config.id = this.configEdicao.id;

      this.configService.AtualizarConfiguracaoFinanceira(config)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', 'Configuração atualizada com sucesso', 'sucesso')
          this.LoadDadosForm();
        },
          () => {
            this.utility.MostraToastr('Erro', 'Erro ao atualizar a configuração', 'erro')
          })
    } else {
      this.configService.AdicionarConfiguracaoFinanceira(config)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', response.message, 'sucesso')
          this.LoadDadosForm();
        },
          (response) => {
            debugger
            this.utility.MostraToastr('Erro', response.message, 'erro')
          })
    }
  }

  private dadosForm() {
    return this.configForm.controls;
  }
}
