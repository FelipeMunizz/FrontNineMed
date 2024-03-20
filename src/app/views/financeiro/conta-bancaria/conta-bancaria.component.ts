import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Banco } from 'app/shared/models/banco.model';
import { ContaBancaria } from 'app/shared/models/conta-bancaria.model';
import { SelectedModel } from 'app/shared/models/selected-model';
import { User } from 'app/shared/models/user.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { BancoService } from 'app/shared/services/app-models/banco.service';
import { ContaBancariaService } from 'app/shared/services/app-models/conta-bancaria.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-conta-bancaria',
  templateUrl: './conta-bancaria.component.html',
  styleUrls: ['./conta-bancaria.component.scss']
})
export class ContaBancariaComponent implements OnInit {
  user: User = {}
  tipoTela: number = 1;
  contaBancariaForm: UntypedFormGroup;
  dispplayColuns: string[] = ['id', 'nome', 'idBanco', 'acoes'];
  dataSource: MatTableDataSource<ContaBancaria> = new MatTableDataSource<ContaBancaria>();

  listaBancos: Array<SelectedModel>;
  bancoSelected: SelectedModel;

  contaBancariaEdicao: ContaBancaria;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private contaBancariaService: ContaBancariaService,
    private bancoService: BancoService,
    private authService: JwtAuthService,
    private utility: UtilityService,
    private modal: AppConfirmService
  ) { }

  ngOnInit(): void {
    this.ListaBancos();
    this.InicializaForm();
    this.ListarContasBancarias();
  }

  InicializaForm() {
    this.contaBancariaForm = new UntypedFormGroup({
      id: new UntypedFormControl('', []),
      nome: new UntypedFormControl('', [Validators.required]),
      saldoInicial: new UntypedFormControl('', []),
      agencia: new UntypedFormControl('', []),
      conta: new UntypedFormControl('', []),
      idBanco: new UntypedFormControl('', [Validators.required]),
    })
  }

  TelaCadastro() {
    this.tipoTela = 2;
    this.contaBancariaForm.reset();
  }

  DeletarToten(idContaBancaria: number) {
    this.modal.confirm({ title: 'Confirme', message: 'Tem certeza que deseja deletar a conta bancaria?' })
      .subscribe((retorno) => {
        if (retorno) {
          this.contaBancariaService.DeletarContaBancaria(idContaBancaria)
            .subscribe((response) => {
              this.utility.MostraToastr('Sucesso', response.message, 'sucesso');
              this.ListarContasBancarias();
            },
              (response) => {
                this.utility.MostraToastr('Erro', response.message, 'erro')
              })
        }
      })

    this.ListarContasBancarias();
  }

  SalvarClick() {
    if (this.contaBancariaForm.invalid) {
      this.utility.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
      return;
    }

    var dados = this.dadosForm();
    var contaBancaria = new ContaBancaria;
    this.user = this.authService.getUser();

    contaBancaria.nome = dados['nome'].value;
    contaBancaria.saldoInicial = dados['saldoInicial'].value;
    contaBancaria.dataSaldo = new Date();
    contaBancaria.agencia = dados['agencia'].value;
    contaBancaria.conta = dados['conta'].value;
    contaBancaria.idBanco = dados['idBanco'].value;

    if (this.contaBancariaEdicao) {
      contaBancaria.id = this.contaBancariaEdicao.id;

      this.contaBancariaService.AtualizarContaBancaria(contaBancaria)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', 'Conta Bancaria atualizado com sucesso', 'sucesso')
          this.ListarContasBancarias();
        },
          () => {
            this.utility.MostraToastr('Erro', 'Erro ao atualizar o Conta Bancaria', 'erro')
          })
    } else {
      this.contaBancariaService.AdicionarContaBancaria(contaBancaria)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', response.message, 'sucesso')
          this.ListarContasBancarias();
        },
          (response) => {
            this.utility.MostraToastr('Erro', response.message, 'erro')
          })
    }
  }

  ListarContasBancarias() {
    this.tipoTela = 1;
    this.user = this.authService.getUser();

    this.contaBancariaService.ListaContasBancariaBanco(1)
      .subscribe((ContaBancarias) => {
        this.dataSource = new MatTableDataSource(ContaBancarias);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  ListaBancos() {
    this.user = this.authService.getUser();

    this.bancoService.ListarBancosClinica(+this.user.idClinica)
      .subscribe((bancos: Array<Banco>) => {
        var listBancos = [];
        bancos.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listBancos.push(item);
        });

        this.listaBancos = listBancos;
      })
  }

  LoadDadosForm(idContaBancaria: number) {
    var dados = this.dadosForm();
    this.contaBancariaService.ObterContaBancaria(idContaBancaria)
      .subscribe((conta) => {
        this.contaBancariaEdicao = conta;
        dados['nome'].setValue(conta.nome);
        dados['saldoInicial'].setValue(conta.saldoInicial);
        dados['agencia'].setValue(conta.agencia);
        dados['conta'].setValue(conta.conta);
        dados['idBanco'].setValue(conta.idBanco);
      })

    this.tipoTela = 2
  }

  //Metodos Auxiliares
  AplicaFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private dadosForm() {
    return this.contaBancariaForm.controls;
  }
}