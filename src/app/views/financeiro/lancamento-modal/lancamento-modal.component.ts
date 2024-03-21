import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfiguracaoFinanceira } from 'app/shared/models/configuracao-financeira.model';
import { Funcionario } from 'app/shared/models/funcionario.model';
import { Paciente } from 'app/shared/models/paciente.model';
import { SelectedModel } from 'app/shared/models/selected-model';
import { User } from 'app/shared/models/user.model';
import { FuncionarioService } from 'app/shared/services/app-models/funcionario.service';
import { PacienteService } from 'app/shared/services/app-models/paciente.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { EnumService } from 'app/shared/services/enum.service';
import { ConvenioService } from './../../../shared/services/app-models/convenio.service';
import { ProcedimentoService } from 'app/shared/services/app-models/procedimento.service';
import { SubCategoriaFinanceiraService } from 'app/shared/services/app-models/sub-categoria.service';
import { CentroCustoService } from 'app/shared/services/app-models/centro-custo.service';
import { FormaPagamentoService } from 'app/shared/services/app-models/forma-pagamento.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { UtilityService } from 'app/shared/services/utility.service';
import { Lancamento } from 'app/shared/models/lancamento.model';
import { ContaBancariaService } from 'app/shared/services/app-models/conta-bancaria.service';
import { LancamentoService } from 'app/shared/services/app-models/lancamento.service';

@Component({
  selector: 'app-lancamento-modal',
  templateUrl: './lancamento-modal.component.html',
  styleUrls: ['./lancamento-modal.component.scss']
})
export class LancamentoModalComponent implements OnInit {
  configuracaoFinanceira: ConfiguracaoFinanceira;
  paciente: Paciente;
  funcionario: Funcionario;
  tipoLancamento: string;

  user: User = {};
  lancamentoForm: UntypedFormGroup;
  tipos: { value: number; label: string }[] = [];

  listaPacientes: Array<SelectedModel> = [];
  pacienteSelected: SelectedModel;

  listaProfissionais: Array<SelectedModel>;
  profissionalSelected: SelectedModel;

  listaConvenios: Array<SelectedModel>;
  convenioSelected: SelectedModel;

  listaProcedimentos: Array<SelectedModel>;
  procedimentoSelected: SelectedModel;

  listaCategorias: Array<SelectedModel>;
  categoriaSelected: SelectedModel;

  listaCentroCusto: Array<SelectedModel>;
  centroCustoSelected: SelectedModel;

  listaForma: Array<SelectedModel>;
  formaSelected: SelectedModel;

  listaConta: Array<SelectedModel>;
  contaSelected: SelectedModel;

  constructor(
    private enumService: EnumService,
    private pacienteService: PacienteService,
    private authService: JwtAuthService,
    private funcionarioService: FuncionarioService,
    private convenioService: ConvenioService,
    private procedimentoService: ProcedimentoService,
    private categoriaService: SubCategoriaFinanceiraService,
    private centroCustoService: CentroCustoService,
    private formaPagamentoService: FormaPagamentoService,
    private contaService: ContaBancariaService,
    private lancamentoService: LancamentoService,
    private utility: UtilityService,
    private loader: AppLoaderService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      configFinanceira?: ConfiguracaoFinanceira,
      paciente?: Paciente,
      funcionario?: Funcionario,
      tipoLancamento?: string
    }
  ) {
    this.configuracaoFinanceira = data.configFinanceira;
    this.tipoLancamento = data.tipoLancamento;
    this.paciente = data.paciente;
    this.funcionario = data.funcionario
  }

  ngOnInit(): void {
    this.tipos = this.enumService.getTipoLancamento();
    this.InicializaForm();
    this.InicializaListas();
    this.SetValoresPadroes();
  }

  InicializaForm() {
    this.lancamentoForm = new UntypedFormGroup({
      paciente: new UntypedFormControl('', []),
      profissional: new UntypedFormControl('', []),
      convenio: new UntypedFormControl('', []),
      procedimento: new UntypedFormControl("", []),
      valor: new UntypedFormControl('', Validators.required),
      descricao: new UntypedFormControl("", []),
      categoria: new UntypedFormControl('', []),
      conta: new UntypedFormControl('', [Validators.required]),
      formaPagamento: new UntypedFormControl('', Validators.required),
      centroCusto: new UntypedFormControl('', []),
      dataVencimento: new UntypedFormControl('', [])
    })
  }

  SetValoresPadroes() {
    var dados = this.dadosForm();

    dados['conta'].setValue(this.configuracaoFinanceira.idContaBancaria);
    dados['formaPagamento'].setValue(this.configuracaoFinanceira.idFormaPagamento);
    dados['centroCusto'].setValue(this.configuracaoFinanceira.idCentroCusto);
  }

  SalvarClick() {
    this.loader.open('Aguarde...');

    debugger
    var dados = this.dadosForm();
    var item = new Lancamento;
    this.user = this.authService.getUser();
    
    var tipo = this.tipoLancamento === 'Receita' ? 0 : 1;

    item.IdClinica = +this.user.idClinica;

    var paciente = dados['paciente'].value;
    item.IdPaciente = paciente.id;
    item.IdProcedimento = dados['procedimento'].value? dados['procedimento'].value : null;
    item.IdConvenio = dados['convenio'].value? dados['convenio'].value : null;
    item.Valor = dados['valor'].value;
    item.Descricao = dados['descricao'].value;
    item.IdCentroCusto = dados['centroCusto'].value;
    item.DataVencimento = dados['dataVencimento'].value;
    item.DataLancamento = new Date;
    
    item.IdFuncionario = dados['profissional'].value;
    item.IdSubCategoria = dados['categoria'].value;
    item.IdContaBancaria = dados['conta'].value;
    item.IdFormaPagamento = dados['formaPagamento'].value;
    item.Tipo = tipo;
    
    this.lancamentoService.AdicionarLancamento(item)
      .subscribe((response) => {
        if (response.success) {          
          this.utility.MostraToastr('sucesso', response.message, 'sucesso');
          this.dialog.closeAll()
        }
      })
  }

  InicializaListas() {
    this.loader.open('Aguarde');
    this.ListPacientes();
    this.ListProfissional();
    this.ListConvenio();
    this.ListProcedimento();
    this.ListCategoria();
    this.ListCentroCusto();
    this.ListForma();
    this.ListConta();
    this.loader.close();
  }

  ListPacientes() {
    this.user = this.authService.getUser();

    this.pacienteService.ListaPacientesClinica(+this.user.idClinica)
      .subscribe((paciente) => {
        var listPaciente = [];
        paciente.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listPaciente.push(item);
        });

        this.listaPacientes = listPaciente;
      })
  }

  ListProfissional() {
    this.user = this.authService.getUser();

    this.funcionarioService.ListarProfissionaisSaude(+this.user.idClinica)
      .subscribe((profissional) => {
        var listProfissional = [];
        profissional.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listProfissional.push(item);
        });

        this.listaProfissionais = listProfissional;
      })
  }

  ListConvenio() {
    this.user = this.authService.getUser();

    this.convenioService.ListarConveniosClinica(+this.user.idClinica)
      .subscribe((convenio) => {
        var listConvenio = [];
        convenio.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listConvenio.push(item);
        });

        this.listaConvenios = listConvenio;
      })
  }

  ListProcedimento() {
    this.user = this.authService.getUser();

    this.procedimentoService.ListaProcedimentoClinica(+this.user.idClinica)
      .subscribe((procedimento) => {
        var listProcedimento = [];
        procedimento.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listProcedimento.push(item);
        });

        this.listaProcedimentos = listProcedimento;
      })
  }

  ListCategoria() {
    this.user = this.authService.getUser();

    var tipo = this.tipoLancamento === 'Receita' ? 0 : 1;

    this.categoriaService.ListaSubCategoriaTipo(+this.user.idClinica, tipo)
      .subscribe((categorias) => {
        var listCategorias = [];
        categorias.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listCategorias.push(item);
        });

        this.listaCategorias = listCategorias;
      })
  }

  ListCentroCusto() {
    this.user = this.authService.getUser();

    this.centroCustoService.ListarCentroCustosClinica(+this.user.idClinica)
      .subscribe((centro) => {
        var listCentros = [];
        centro.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listCentros.push(item);
        });

        this.listaCentroCusto = listCentros;
      })
  }

  ListForma() {
    this.user = this.authService.getUser();

    this.formaPagamentoService.ListarFormaPagamentosClinica(+this.user.idClinica)
      .subscribe((forma) => {
        var listFormas = [];
        forma.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listFormas.push(item);
        });

        this.listaForma = listFormas;
      })
  }

  ListConta() {
    this.contaService.ListaContasBancariaBanco(this.configuracaoFinanceira.idBanco)
      .subscribe((contas) => {
        var listContas = [];
        contas.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listContas.push(item);
        });

        this.listaConta = listContas;
      })
  }

  ProcedimentoSelecionado(idProcedimento: number) {
    this.procedimentoService.ObterProcedimento(idProcedimento)
      .subscribe((procedimento) => {
        var dados = this.dadosForm();
        dados['valor'].setValue(procedimento.preco);
      })
  }


  // Métodos Auxiliares

  dadosForm() {
    return this.lancamentoForm.controls;
  }

  filterPacientes(value: any) {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
    return this.listaPacientes.filter(paciente => {
      if (typeof paciente.name === 'string') {
        return paciente.name.toLowerCase().includes(filterValue);
      }
      return false;
    });
  }

  displayFn(paciente: SelectedModel): string {
    return paciente && paciente.id ? `${paciente.id.toString()} - ${paciente.name}` : '';
  }
}
