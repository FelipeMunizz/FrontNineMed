import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Banco } from 'app/shared/models/banco.model';
import { User } from 'app/shared/models/user.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { BancoService } from 'app/shared/services/app-models/banco.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.scss']
})
export class BancoComponent implements OnInit {
  user: User = {}
  tipoTela: number = 1;
  bancoForm: UntypedFormGroup;
  dispplayColuns: string[] = ['id', 'nome', 'codBanco', 'acoes'];
  dataSource: MatTableDataSource<Banco> = new MatTableDataSource<Banco>();

  bancoEdicao: Banco;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private bancoService: BancoService,
    private authService: JwtAuthService,
    private utility: UtilityService,
    private modal: AppConfirmService
  ) { }

  ngOnInit(): void {
    this.IniciaForm();
    this.ListarBancos();
  }

  ListarBancos() {
    this.tipoTela = 1;
    this.user = this.authService.getUser();

    this.bancoService.ListarBancosClinica(+this.user.idClinica)
      .subscribe((bancos) => {
        this.dataSource = new MatTableDataSource(bancos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  IniciaForm() {
    this.bancoForm = new UntypedFormGroup({
      nome: new UntypedFormControl('', Validators.required),
      codBanco: new UntypedFormControl('',[])
    })
  }

  SalvarClick() {
    if (this.bancoForm.invalid) {
      this.utility.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
      return;
    }

    var dados = this.dadosForm();
    var banco = new Banco;
    this.user = this.authService.getUser();

    banco.nome = dados['nome'].value;
    banco.codBanco = dados['codBanco'].value;
    banco.idClinica = +this.user.idClinica;

    if (this.bancoEdicao) {
      banco.id = this.bancoEdicao.id;

      this.bancoService.AtualizarBanco(banco)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', 'Banco atualizado com sucesso', 'sucesso')
          this.ListarBancos();
        },
          () => {
            this.utility.MostraToastr('Erro', 'Erro ao atualizar o banco', 'erro')
          })
    } else {
      this.bancoService.AdicionarBanco(banco)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', response.message, 'sucesso')
          this.ListarBancos();
        },
          (response) => {
            debugger
            this.utility.MostraToastr('Erro', response.message, 'erro')
          })
    }
  }

  TelaCadastro() {
    this.tipoTela = 2;
    this.bancoForm.reset();
  }

  LoadDadosForm(idBanco: number) {
    var dados = this.dadosForm();
    this.bancoService.ObterBanco(idBanco)
      .subscribe((banco) => {
        this.bancoEdicao = banco;
        dados['nome'].setValue(banco.nome);
        dados['codBanco'].setValue(banco.codBanco);
      })

    this.tipoTela = 2
  }

  DeletarToten(idBanco: number) {
    this.modal.confirm({ title: 'Confirme', message: 'Tem certeza que deseja deletar o banco?' })
      .subscribe((retorno) => {
        if (retorno) {
          this.bancoService.DeletarBanco(idBanco)
            .subscribe((response) => {
              this.utility.MostraToastr('Sucesso', response.message, 'sucesso');
              this.ListarBancos();
            },
              (response) => {
                this.utility.MostraToastr('Erro', response.message, 'erro')
              })
        }
      })

    this.ListarBancos();
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
    return this.bancoForm.controls;
  }
}
