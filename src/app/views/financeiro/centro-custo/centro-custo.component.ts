import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CentroCusto } from 'app/shared/models/centro-custo';
import { User } from 'app/shared/models/user.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { CentroCustoService } from 'app/shared/services/app-models/centro-custo.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-centro-custo',
  templateUrl: './centro-custo.component.html',
  styleUrls: ['./centro-custo.component.scss']
})
export class CentroCustoComponent implements OnInit {
  user: User = {}
  tipoTela: number = 1;
  centroCustoForm: UntypedFormGroup;
  dispplayColuns: string[] = ['id', 'nome', 'idClinica', 'acoes'];
  dataSource: MatTableDataSource<CentroCusto> = new MatTableDataSource<CentroCusto>();

  centroCustoEdicao: CentroCusto;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private centroCustoService: CentroCustoService,
    private utility: UtilityService,
    private authService: JwtAuthService,
    private modal: AppConfirmService
  ) { }

  ngOnInit(): void {
    this.InicializaForm();
  }

  InicializaForm() {
    this.centroCustoForm = new UntypedFormGroup({
      nome: new UntypedFormControl('', [Validators.required])
    })
  }

  ListarCentroCusto() {
    this.tipoTela = 1;
    this.user = this.authService.getUser();

    this.centroCustoService.ListarCentroCustosClinica(+this.user.idClinica)
      .subscribe((centroCusto) => {
        this.dataSource = new MatTableDataSource(centroCusto);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  SalvarClick() {
    if (this.centroCustoForm.invalid) {
      this.utility.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
      return;
    }

    var dados = this.dadosForm();
    var centroCusto = new CentroCusto;
    this.user = this.authService.getUser();

    centroCusto.nome = dados['nome'].value;
    centroCusto.idClinica = +this.user.idClinica;

    if (this.centroCustoEdicao) {
      centroCusto.id = this.centroCustoEdicao.id;

      this.centroCustoService.AtualizarCentroCusto(centroCusto)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', 'Banco atualizado com sucesso', 'sucesso')
          this.ListarCentroCusto();
        },
          () => {
            this.utility.MostraToastr('Erro', 'Erro ao atualizar o banco', 'erro')
          })
    } else {
      this.centroCustoService.AdicionarCentroCusto(centroCusto)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', response.message, 'sucesso')
          this.ListarCentroCusto();
        },
          (response) => {
            debugger
            this.utility.MostraToastr('Erro', response.message, 'erro')
          })
    }
  }

  TelaCadastro() {
    this.tipoTela = 2;
    this.centroCustoForm.reset();
  }

  LoadDadosForm(idCentroCusto: number) {
    var dados = this.dadosForm();
    this.centroCustoService.ObterCentroCusto(idCentroCusto)
      .subscribe((centroCusto) => {
        this.centroCustoEdicao = centroCusto;
        dados['nome'].setValue(centroCusto.nome);
      })

    this.tipoTela = 2
  }

  DeletarCentroCusto(idCentroCusto: number) {
    this.modal.confirm({ title: 'Confirme', message: 'Tem certeza que deseja deletar o centro custo?' })
      .subscribe((retorno) => {
        if (retorno) {
          this.centroCustoService.DeletarCentroCusto(idCentroCusto)
            .subscribe((response) => {
              this.utility.MostraToastr('Sucesso', response.message, 'sucesso');
              this.ListarCentroCusto();
            },
              (response) => {
                this.utility.MostraToastr('Erro', response.message, 'erro')
              })
        }
      })

    this.ListarCentroCusto();
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
    return this.centroCustoForm.controls;
  }
}
