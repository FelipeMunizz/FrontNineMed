import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

@Component({
  selector: 'app-lancamento-modal',
  templateUrl: './lancamento-modal.component.html',
  styleUrls: ['./lancamento-modal.component.scss']
})
export class LancamentoModalComponent implements OnInit {
  configuracaoFinanceira: ConfiguracaoFinanceira;
  paciente: Paciente;
  funcionario: Funcionario;
  tipoLancamento: string = 'Receita';

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
    private loader: AppLoaderService,
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
      conta: new UntypedFormControl('', []),      
      formaPagamento: new UntypedFormControl('', Validators.required),
      centroCusto: new UntypedFormControl('', []),
      dataVencimento: new UntypedFormControl('', [])
    })
  }

  InicializaListas(){    
    this.loader.open('Aguarde');
    this.ListPacientes();
    this.ListProfissional();
    this.ListConvenio();
    this.ListProcedimento();
    this.ListCategoria();
    this.ListCentroCusto();
    this.ListForma();
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

  ProcedimentoSelecionado(idProcedimento: number){
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
