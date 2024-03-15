import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormaPagamento } from 'app/shared/models/forma-pagamento.model';
import { User } from 'app/shared/models/user.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { FormaPagamentoService } from 'app/shared/services/app-models/forma-pagamento.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.scss']
})
export class FormaPagamentoComponent implements OnInit {
  user: User = {}
  tipoTela: number = 1;
  formaPagamentoForm: UntypedFormGroup;
  dispplayColuns: string[] = ['id', 'nome', 'tipoValor', 'acoes'];
  dataSource: MatTableDataSource<FormaPagamento> = new MatTableDataSource<FormaPagamento>();

  formaPagamentoEdicao: FormaPagamento;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private utility: UtilityService,
    private authService: JwtAuthService,
    private modal: AppConfirmService
  ) { }

  ngOnInit(): void {
    this.IniciaForm();
    this.ListarFormaPagamentos();
  }

  ListarFormaPagamentos() {
    this.tipoTela = 1;
    this.user = this.authService.getUser();

    this.formaPagamentoService.ListarFormaPagamentosClinica(+this.user.idClinica)
      .subscribe((formaPagamentos) => {
        this.dataSource = new MatTableDataSource(formaPagamentos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  IniciaForm() {
    this.formaPagamentoForm = new UntypedFormGroup({
      nome: new UntypedFormControl('', Validators.required),
      tipoValor: new UntypedFormControl('',[Validators.required])
    })
  }

  SalvarClick() {
    if (this.formaPagamentoForm.invalid) {
      this.utility.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
      return;
    }

    var dados = this.dadosForm();
    var formaPagamento = new FormaPagamento;
    this.user = this.authService.getUser();

    formaPagamento.nome = dados['nome'].value;
    formaPagamento.tipoValor = dados['tipoValor'].value;
    formaPagamento.idClinica = +this.user.idClinica;

    if (this.formaPagamentoEdicao) {
      formaPagamento.id = this.formaPagamentoEdicao.id;

      this.formaPagamentoService.AtualizarFormaPagamento(formaPagamento)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', 'FormaPagamento atualizado com sucesso', 'sucesso')
          this.ListarFormaPagamentos();
        },
          () => {
            this.utility.MostraToastr('Erro', 'Erro ao atualizar o formaPagamento', 'erro')
          })
    } else {
      this.formaPagamentoService.AdicionarFormaPagamento(formaPagamento)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', response.message, 'sucesso')
          this.ListarFormaPagamentos();
        },
          (response) => {
            debugger
            this.utility.MostraToastr('Erro', response.message, 'erro')
          })
    }
  }

  TelaCadastro() {
    this.tipoTela = 2;
    this.formaPagamentoForm.reset();
  }

  LoadDadosForm(idFormaPagamento: number) {
    var dados = this.dadosForm();
    this.formaPagamentoService.ObterFormaPagamento(idFormaPagamento)
      .subscribe((formaPagamento) => {
        this.formaPagamentoEdicao = formaPagamento;
        dados['nome'].setValue(formaPagamento.nome);
        dados['codFormaPagamento'].setValue(formaPagamento.codFormaPagamento);
      })

    this.tipoTela = 2
  }

  DeletarFormaPagamento(idFormaPagamento: number) {
    this.modal.confirm({ title: 'Confirme', message: 'Tem certeza que deseja deletar o formaPagamento?' })
      .subscribe((retorno) => {
        if (retorno) {
          this.formaPagamentoService.DeletarFormaPagamento(idFormaPagamento)
            .subscribe((response) => {
              this.utility.MostraToastr('Sucesso', response.message, 'sucesso');
              this.ListarFormaPagamentos();
            },
              (response) => {
                this.utility.MostraToastr('Erro', response.message, 'erro')
              })
        }
      })

    this.ListarFormaPagamentos();
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
    return this.formaPagamentoForm.controls;
  }
}
